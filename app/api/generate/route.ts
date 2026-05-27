import { z } from "zod";

import { getGeminiClient } from "@/lib/gemini";

const GenerateRequestSchema = z.object({
  prompt: z.string().min(1).max(2000),
});

const MODEL_CANDIDATES = [
  // Current stable Gemini API model ids (2026). We try in order.
  "gemini-2.5-flash",
  "gemini-3.5-flash",
] as const;

function buildSystemPrompt(userPrompt: string) {
  return [
    "You are an expert senior UI engineer.",
    "Generate a SINGLE React functional component in TypeScript that uses Tailwind CSS classes.",
    "",
    "Hard requirements:",
    "- Output ONLY valid TSX code (no markdown, no backticks, no explanations).",
    "- Component must be default-exported as `Component` (exact name).",
    "- No external imports except React (avoid importing anything unless required).",
    "- Do NOT use external icon libraries (no lucide-react, react-icons, heroicons imports). If icons are needed, use inline SVG elements.",
    "- Must be responsive (mobile-first), accessible (aria labels where needed), and dark-mode friendly.",
    "- Premium modern SaaS aesthetic: minimal, glassmorphism, gradients, rounded corners, subtle shadows, smooth hover/focus states.",
    "- No network calls, no environment variables, no Next.js-specific APIs.",
    "- Use only Tailwind utility classes for styling.",
    "",
    "User request:",
    userPrompt,
  ].join("\n");
}

export async function POST(request: Request) {
  try {
    const body = GenerateRequestSchema.parse(await request.json());

    const genAI = getGeminiClient();
    const prompt = buildSystemPrompt(body.prompt);

    let lastError: unknown = null;
    for (const modelId of MODEL_CANDIDATES) {
      try {
        const model = genAI.getGenerativeModel({ model: modelId });
        const result = await model.generateContent(prompt);
        const text = result.response.text();
        return Response.json({ code: text, model: modelId });
      } catch (e) {
        lastError = e;
      }
    }

    throw lastError ?? new Error("Failed to generate content.");

  } catch (err) {
    if (err instanceof z.ZodError) {
      return Response.json(
        { error: "Invalid request", details: err.flatten() },
        { status: 400 },
      );
    }

    const message = err instanceof Error ? err.message : "Unknown error";
    return Response.json({ error: message }, { status: 500 });
  }
}

