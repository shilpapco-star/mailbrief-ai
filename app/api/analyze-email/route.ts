import { NextResponse } from "next/server";
import { createClient } from "../../../lib/supabase/server";
import { analyzeEmail } from "../../../lib/services/ai.service";

function parseEmail(emailText: string) {
  const text = emailText.trim();

  let sender = "";
  let subject = "";
  let body = text;

  // Detect "From:" line
  const fromMatch = text.match(/^From:\s*(.+)$/im);

  if (fromMatch) {
    sender = fromMatch[1].trim();
  }

  // Detect "Subject:" line
  const subjectMatch = text.match(/^Subject:\s*(.+)$/im);

  if (subjectMatch) {
    subject = subjectMatch[1].trim();
  }

  // Remove header lines from the body
  const lines = text.split(/\r?\n/);

  const bodyLines = lines.filter((line) => {
    const trimmed = line.trim();

    return (
      !/^From:\s*/i.test(trimmed) &&
      !/^Subject:\s*/i.test(trimmed) &&
      !/^To:\s*/i.test(trimmed) &&
      !/^Cc:\s*/i.test(trimmed) &&
      !/^Date:\s*/i.test(trimmed)
    );
  });

  body = bodyLines.join("\n").trim();

  // If no subject was detected, create a simple fallback
  if (!subject) {
    subject = "Email Analysis";
  }

  // If no sender was detected, use a neutral fallback
  if (!sender) {
    sender = "Unknown Sender";
  }

  return {
    sender,
    subject,
    body,
  };
}

export async function POST(request: Request) {
  try {
    const supabase = await createClient();

    // Check logged-in user
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) {
      return NextResponse.json(
        {
          error: "You must be logged in to analyze an email.",
        },
        { status: 401 }
      );
    }

    const payload = await request.json();

    const emailText =
      typeof payload?.emailText === "string"
        ? payload.emailText.trim()
        : "";

    if (!emailText) {
      return NextResponse.json(
        {
          error: "Please paste an email before analyzing.",
        },
        { status: 400 }
      );
    }

    if (emailText.length < 20) {
      return NextResponse.json(
        {
          error: "The email is too short to analyze.",
        },
        { status: 400 }
      );
    }

    // Extract sender, subject and body automatically
    const parsedEmail = parseEmail(emailText);

    // Send the complete email to Gemini
   const analysis = await analyzeEmail(
  `From: ${parsedEmail.sender}

Subject: ${parsedEmail.subject}

${parsedEmail.body}`
);

    // Save main email
    const { data: savedEmail, error: emailError } = await supabase
      .from("emails")
      .insert({
        user_id: user.id,
        sender: parsedEmail.sender,
        subject: parsedEmail.subject,
        body: parsedEmail.body,
        summary: analysis.summary,
        priority: analysis.priority,
        sender_intent: analysis.category,
      })
      .select("id")
      .single();

    if (emailError || !savedEmail) {
      console.error("Email insert error:", emailError);

      return NextResponse.json(
        {
          error: "The analysis was completed, but the email could not be saved.",
          details: emailError?.message,
        },
        { status: 500 }
      );
    }

    const emailId = savedEmail.id;

    // Save key points
    if (analysis.keyPoints?.length > 0) {
      const keyPointRows = analysis.keyPoints.map((point) => ({
        email_id: emailId,
        point,
      }));

      const { error } = await supabase
        .from("email_key_points")
        .insert(keyPointRows);

      if (error) {
        console.error("Key points insert error:", error);
      }
    }

    // Save action items
    if (analysis.actionItems?.length > 0) {
      const actionItemRows = analysis.actionItems.map((item) => ({
        email_id: emailId,
        item,
        completed: false,
      }));

      const { error } = await supabase
        .from("email_action_items")
        .insert(actionItemRows);

      if (error) {
        console.error("Action items insert error:", error);
      }
    }

    // Save important dates
    if (analysis.importantDates?.length > 0) {
      const dateRows = analysis.importantDates.map((item) => ({
        email_id: emailId,
        date: item.date,
        description: item.description,
      }));

      const { error } = await supabase
        .from("email_dates")
        .insert(dateRows);

      if (error) {
        console.error("Important dates insert error:", error);
      }
    }

    // Save suggested reply
    if (analysis.suggestedReply) {
      const { error } = await supabase
        .from("suggested_replies")
        .insert({
          email_id: emailId,
          reply: analysis.suggestedReply,
        });

      if (error) {
        console.error("Suggested reply insert error:", error);
      }
    }

    return NextResponse.json({
      success: true,
      emailId,
      analysis,
      parsedEmail: {
        sender: parsedEmail.sender,
        subject: parsedEmail.subject,
      },
    });
  } catch (error) {
    console.error("Analyze email error:", error);

    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Something went wrong while analyzing the email.",
      },
      { status: 500 }
    );
  }
}