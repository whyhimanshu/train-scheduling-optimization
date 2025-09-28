import { generateText } from "ai"

export async function POST(req: Request) {
  const { mode, context } = await req.json().catch(() => ({ mode: "recommendations", context: {} }))

  // Craft prompt based on mode
  const prompt =
    mode === "scenario"
      ? [
          "You are an expert railway traffic optimization assistant.",
          "Propose a single new optimization scenario for the next 30 minutes.",
          "Return STRICT JSON with keys: name (string), description (string).",
          "No prose. JSON only.",
          context?.hint ? `Context: ${context.hint}` : "",
        ].join("\n")
      : [
          "You are an expert railway traffic optimization assistant.",
          "Given current recommendations and statuses, produce a concise optimization plan:",
          "- Mention precedence changes, platform reallocations, and any holds/crossings.",
          "- Keep it brief with actionable steps (3-7 bullet points).",
          context?.recommendations ? `Context JSON: ${JSON.stringify(context.recommendations).slice(0, 4000)}` : "",
        ].join("\n")

  const { text } = await generateText({
    model: "openai/gpt-5-mini",
    prompt,
    maxOutputTokens: 600,
    temperature: mode === "scenario" ? 0.2 : 0.5,
  })

  // Try parse JSON for scenario mode
  let scenario: { name: string; description?: string } | null = null
  if (mode === "scenario" && text) {
    try {
      const match = text.match(/\{[\s\S]*\}/)
      if (match) scenario = JSON.parse(match[0])
    } catch {
      scenario = null
    }
  }

  return Response.json({ text, scenario })
}
