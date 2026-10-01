import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

// Only allow base64-encoded data URLs for common image types, capped at ~8MB of base64.
const DATA_URL_RE = /^data:image\/(png|jpeg|jpg|webp);base64,[A-Za-z0-9+/=]+$/;
const MAX_DATA_URL_LEN = 8 * 1024 * 1024;

const InputSchema = z
  .object({
    text: z.string().max(20000).optional(),
    imageDataUrl: z
      .string()
      .max(MAX_DATA_URL_LEN, "Image is too large.")
      .regex(DATA_URL_RE, "Image must be an uploaded PNG, JPEG, or WebP file.")
      .optional(),
    notes: z.string().max(2000).optional(),
  })
  .strict();

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
        text: `You are a nutrition assistant for a premium dry fruit brand "By the Handful". Based on the following medical report${data.notes ? ` and user notes: "${data.notes}"` : ""}, suggest 4-6 products from our catalogue that best suit the person's health profile.

CATALOGUE:

ALMONDS (plain)
- California Almonds (standard grade, versatile)
- Sanora Almonds (larger California variety)
- Mamra Almonds (Indian, high oil content, superior nutrition)
- Gurbandi Almonds (wild Afghan, small & nutrient-dense)
- Roasted Almonds (dry-roasted, no oil)

FLAVOURED ALMONDS
- Blueberry Almonds, Chocolate Almonds, Paan Almonds
- Almond Thai Puff, Rainbow Almonds, Barbeque Almonds
- Rose Almonds, Pudina Almonds, Kulfi Almonds
- Kali Mirch (Black Pepper) Almonds

PISTACHIO
- Roasted Salted Pistachio (in shell)

CASHEW NUT (plain)
- Cashew W-320 (standard whole), W-240, W-210, 2-Tukda (split)
- Roasted Salted Cashew

FLAVOURED CASHEW
- Peri Peri Cashew, Nut Cracker Cashew, Kaju Thai Puff
- Breakfast Khatta Meetha, Panchratna Mixture, Paan Cashew
- Pudina Cashew, Kali Mirch Cashew, Korean Chilli Cashew
- Masala Cashew, Peri Peri Kaju (extra spicy)

WALNUT
- Walnut Chille (in shell, Kashmiri Kagzi — high Omega-3)

RAISINS / KISHMISH
- Raisins Plain (golden, sun-dried)
- Paan Flavour Raisins, Kala Khatta Raisins
- Rose Malai Kishmish, Munakka (large medicinal raisins — good for iron & digestion)
- Black Raisin - Kaali Darak (seedless black grapes, antioxidant-rich, blood purification), Mango Raisin

DATES
- Medjoul Dates (large, premium — natural sugar, potassium-rich)
- Medjoul Dates Jumbo
- Fard Dates (smaller, fibre-rich)
- Paan Medjoul Dates (flavoured)

DRIED / DEHYDRATED FRUITS
- Dried Blueberry (antioxidants), Dried Cranberry (urinary health)
- Dried Cherry, Dried Strawberry, Dried Apricot (iron, beta-carotene)
- Prunes (digestion, bone health), Black Currant (Vitamin C)
- Mango Slices, Pineapple Coin, Kiwi Coin
- Mixed Berries, Fruit Cocktail, Mix Fruit Chatpata
- Mix Fruit Milk Choco Dip, Fruit & Nut Muesli

EXOTIC NUTS
- Brazil Nuts (selenium — thyroid health), Macadamia Nuts (heart health)
- Pecan Nuts (antioxidants), Pecan Vanilla (flavoured)
- Pine Nuts (pine-ka-beja — weight management), Hazelnut (Vitamin E)

SEEDS
- Chia Seeds (Omega-3, fibre, calcium), Flax Seeds (lignans, Omega-3)
- Pumpkin Seeds (zinc, magnesium), Sunflower Seeds (Vitamin E)
- Melon Seeds (cooling, light protein), Mixed Seeds with Berries

SPECIAL / UNIQUE
- Anjeer / Dried Figs (iron, calcium, fibre — good for constipation & bone health)
- Paan Shots (digestive, mouth-freshening blend)
- Dry Fruit Laddoo (energy-dense, no refined sugar)

Return STRICT JSON only, no markdown, with this shape:
{
  "summary": "1-2 sentence plain-language summary of key health signals",
  "recommendations": [
    { "name": "...", "reason": "1 sentence why this product suits their health profile", "serving": "e.g. 25g / 5-6 pieces a day" }
  ],
  "avoid": ["short list of products or ingredients to limit, if any"],
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
      console.error("[HealthAdvisor] AI API Error:", res.status, errText);
      if (res.status === 429) throw new Error("Rate limit reached. Please try again in a moment.");
      if (res.status === 402)
        throw new Error("AI credits exhausted. Please add credits in your workspace.");
      throw new Error("AI analysis is currently unavailable. Please try again later.");
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
