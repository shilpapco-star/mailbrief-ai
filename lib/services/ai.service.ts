import { GoogleGenAI, Type } from "@google/genai";

export type EmailAnalysis = {
  summary: string;
  keyPoints: string[];
  actionItems: string[];
  importantDates: {
    date: string;
    description: string;
  }[];
  priority: "LOW" | "MEDIUM" | "HIGH" | "URGENT";
  sentiment: "POSITIVE" | "NEUTRAL" | "NEGATIVE";
  category: string;
  suggestedReply: string;
};

const apiKey = process.env.GEMINI_API_KEY;

if (!apiKey) {
  throw new Error("GEMINI_API_KEY is not configured.");
}

const ai = new GoogleGenAI({
  apiKey,
});

export async function analyzeEmail(
  emailText: string
): Promise<EmailAnalysis> {
  const prompt = `
You are MailBrief AI, an intelligent email analysis assistant.

Analyze the email below and return a concise, useful analysis.

EMAIL:
${emailText}

Your tasks:

1. Write a short summary of the email.
2. Extract the most important key points.
3. Identify specific action items the recipient needs to take.
4. Identify important dates or deadlines mentioned in the email.
5. Classify the email priority as LOW, MEDIUM, HIGH, or URGENT.
6. Classify the sentiment as POSITIVE, NEUTRAL, or NEGATIVE.
7. Classify the email into a useful category such as Work, Finance, HR, Personal, Meeting, Marketing, Support, or Other.
8. Write a short professional suggested reply.

Rules:
- Do not invent information that is not present in the email.
- If there are no action items, return an empty array.
- If there are no important dates, return an empty array.
- Keep the summary concise.
- Keep key points useful and specific.
- Keep the suggested reply professional and natural.
`;

  const response = await ai.models.generateContent({
   model: "gemini-3.5-flash-lite",
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          summary: {
            type: Type.STRING,
            description: "A concise summary of the email.",
          },
          keyPoints: {
            type: Type.ARRAY,
            items: {
              type: Type.STRING,
            },
            description: "The most important points from the email.",
          },
          actionItems: {
            type: Type.ARRAY,
            items: {
              type: Type.STRING,
            },
            description: "Actions the recipient needs to take.",
          },
          importantDates: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                date: {
                  type: Type.STRING,
                },
                description: {
                  type: Type.STRING,
                },
              },
              required: ["date", "description"],
            },
            description: "Important dates or deadlines from the email.",
          },
          priority: {
            type: Type.STRING,
            enum: ["LOW", "MEDIUM", "HIGH", "URGENT"],
          },
          sentiment: {
            type: Type.STRING,
            enum: ["POSITIVE", "NEUTRAL", "NEGATIVE"],
          },
          category: {
            type: Type.STRING,
            description: "The most appropriate email category.",
          },
          suggestedReply: {
            type: Type.STRING,
            description: "A short professional reply to the email.",
          },
        },
        required: [
          "summary",
          "keyPoints",
          "actionItems",
          "importantDates",
          "priority",
          "sentiment",
          "category",
          "suggestedReply",
        ],
      },
    },
  });

  if (!response.text) {
    throw new Error("Gemini returned an empty response.");
  }

  try {
    return JSON.parse(response.text) as EmailAnalysis;
  } catch {
    throw new Error("Gemini returned an invalid analysis format.");
  }
}