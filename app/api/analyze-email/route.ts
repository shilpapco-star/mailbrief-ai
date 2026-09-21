import { NextResponse } from "next/server";
import { analyzeEmail } from "@/lib/services/ai.service";
import { createClient } from "@/lib/supabase/server";

export async function POST(request: Request) {
  try {
    // 1. Get logged-in user
    const supabase = await createClient();

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

    // 2. Read request body
    const body = await request.json();

   const sender = body?.sender || "Unknown";
const subject = body?.subject || "No subject";
const emailText = body?.emailText;

    if (!emailText || typeof emailText !== "string") {
      return NextResponse.json(
        {
          error: "Email content is required.",
        },
        { status: 400 }
      );
    }

    if (emailText.trim().length < 10) {
      return NextResponse.json(
        {
          error: "Please provide a longer email to analyze.",
        },
        { status: 400 }
      );
    }

    // 3. Analyze email with Gemini
    const analysis = await analyzeEmail(emailText.trim());

    // 4. Save the main email analysis
    const { data: savedEmail, error: emailError } = await supabase
  .from("emails")
  .insert({
    user_id: user.id,
    sender,
    subject,
    body: emailText.trim(),
    summary: analysis.summary,
    priority: analysis.priority,
    sender_intent: analysis.category,
  })
  .select()
  .single();
    if (emailError) {
      console.error("Email save error:", emailError);

      return NextResponse.json(
        {
          error: `AI analysis worked, but saving the email failed: ${emailError.message}`,
        },
        { status: 500 }
      );
    }

    // 5. Save key points
    if (analysis.keyPoints.length > 0) {
      const { error: keyPointsError } = await supabase
        .from("email_key_points")
        .insert(
          analysis.keyPoints.map((point) => ({
            email_id: savedEmail.id,
            point,
          }))
        );

      if (keyPointsError) {
        console.error("Key points save error:", keyPointsError);
      }
    }

    // 6. Save action items
    if (analysis.actionItems.length > 0) {
  const { error: actionItemsError } = await supabase
    .from("email_action_items")
    .insert(
      analysis.actionItems.map((item) => ({
        email_id: savedEmail.id,
        task: item,
        deadline: null,
        completed: false,
      }))
    );

  if (actionItemsError) {
    console.error("Action items save error:", actionItemsError);
  }
}

    // 7. Save important dates
    if (analysis.importantDates.length > 0) {
  const { error: datesError } = await supabase
    .from("email_dates")
    .insert(
      analysis.importantDates.map((date) => ({
        email_id: savedEmail.id,
        date_text: date.date,
        date_value: null,
        description: date.description,
      }))
    );

  if (datesError) {
    console.error("Dates save error:", datesError);
  }
}

    // 8. Save suggested reply
    if (analysis.suggestedReply) {
      const { error: replyError } = await supabase
        .from("suggested_replies")
        .insert({
          email_id: savedEmail.id,
          reply: analysis.suggestedReply,
        });

      if (replyError) {
        console.error("Suggested reply save error:", replyError);
      }
    }

    // 9. Return result to Analyzer UI
    return NextResponse.json(
      {
        success: true,
        analysis,
        emailId: savedEmail.id,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Email analysis error:", error);

    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Failed to analyze the email.",
      },
      { status: 500 }
    );
  }
}