import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

// Only allow base64-encoded data URLs for common image types, capped at ~8MB of base64.
const DATA_URL_RE = /^data:image\/(png|jpeg|jpg|webp);base64,[A-Za-z0-9+/=]+$/;
const MAX_DATA_URL_LEN = 8 * 1024 * 1024;

const InputSchema = z.object({
  text: z.string().max(20000).optional(),
  imageDataUrl: z
    .string()
    .max(MAX_DATA_URL_LEN, "Image is too large.")
    .regex(DATA_URL_RE, "Image must be an uploaded PNG, JPEG, or WebP file.")
    .optional(),
  notes: z.string().max(2000).optional(),
});

export const analyzeReport = createServerFn({ method: "POST" })
  .validator((input: unknown) => InputSchema.parse(input))
  .handler(async ({ data }) => {
    const key = process.env.GEMINI_API_KEY;
    if (!key) throw new Error("Missing GEMINI_API_KEY");
    if (!data.text && !data.imageDataUrl) {
      throw new Error("Provide report text or an image of the report.");
    }

    const userContent: Array<Record<string, unknown>> = [
      {
        type: "text",
        text: `You are a nutrition assistant for a premium dry fruit brand "By the Handful". Based on the following medical report${data.notes ? ` and user notes: "${data.notes}"` : ""}, suggest 4-6 dry fruits/nuts from this catalogue that would suit the person's health profile: 
        Dry fruits 
        1) Kaju 
        2) Badam 
        3) Kishmish 
        4). Akrot 
        5). Pista 
        6). Medjoul dates 

        Flavoured 
        1). Breakfast khatta meetha 
        2) mix vegetables masala 
        3). Almond Thai puff 
        4)  Trail mix 
        5). Per peri kaju 
        6). Nutcracker 
        7). Paan kishmish 
        8). Blueberry Almond 
        9).  Paan shots
        10).  Paan dates

        Return STRICT JSON only, no markdown, with this shape:
        {
          "summary": "1-2 sentence plain-language summary of key health signals",
          "recommendations": [
            { "name": "...", "reason": "1 sentence why", "serving": "e.g. 25g / 5-6 pieces a day" }
          ],
          "avoid": ["short list of things to limit, if any"],
          "disclaimer": "Educational suggestion, not medical advice. Consult your doctor."
        }

        Report:
${data.text || "(see attached image)"}`,
      },
    ];

    if (data.imageDataUrl) {
      userContent.push({
        type: "image_url",
        image_url: { url: data.imageDataUrl },
      });
    }

    const res = await fetch(
      "https://generativelanguage.googleapis.com/v1beta/openai/chat/completions",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${key}`,
        },
        body: JSON.stringify({
          model: "gemini-flash-latest",
          messages: [
            {
              role: "system",
              content:
                "You are a careful nutrition assistant. Always respond with valid JSON only.",
            },
            { role: "user", content: userContent },
          ],
        }),
      },
    );

    if (!res.ok) {
      const errText = await res.text();
      if (res.status === 429) throw new Error("Rate limit reached. Please try again in a moment.");
      if (res.status === 402)
        throw new Error("AI credits exhausted. Please add credits in your workspace.");
      throw new Error(`AI request failed: ${errText.slice(0, 200)}`);
    }

    const json = await res.json();
    const raw: string = json.choices?.[0]?.message?.content ?? "";
    const cleaned = raw.replace(/```json\s*|\s*```/g, "").trim();
    try {
      return JSON.parse(cleaned);
    } catch {
      return { summary: raw, recommendations: [], avoid: [], disclaimer: "" };
    }
  });
