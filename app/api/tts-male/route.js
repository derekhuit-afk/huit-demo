export const runtime = "edge"

export async function POST(req) {
  const body = await req.json()
  const { text } = body

  const apiKey = process.env.ELEVENLABS_API_KEY || body.api_key
  if (!apiKey) {
    return new Response(JSON.stringify({ error: "No ElevenLabs API key configured" }), {
      status: 500, headers: { "Content-Type": "application/json" }
    })
  }

  // Bill — Wise, Mature, Balanced American male
  const BILL = "pqHfZKP75CvOlQylNhV4"

  const res = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${BILL}`, {
    method: "POST",
    headers: {
      "xi-api-key": apiKey,
      "Content-Type": "application/json",
      "Accept": "audio/mpeg",
    },
    body: JSON.stringify({
      text,
      model_id: "eleven_turbo_v2_5",
      voice_settings: {
        stability: 0.55,
        similarity_boost: 0.85,
        style: 0.08,
        use_speaker_boost: true,
      },
    }),
  })

  if (!res.ok) {
    const err = await res.text()
    return new Response(JSON.stringify({ error: err }), {
      status: res.status, headers: { "Content-Type": "application/json" }
    })
  }

  const buffer = await res.arrayBuffer()
  return new Response(buffer, {
    headers: { "Content-Type": "audio/mpeg", "Cache-Control": "no-store" }
  })
}
