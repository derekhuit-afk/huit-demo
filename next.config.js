/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    ELEVENLABS_VOICE_ID: process.env.ELEVENLABS_VOICE_ID || "EXAVITQu4vr4xnSDxMaL",
  },
}
module.exports = nextConfig
