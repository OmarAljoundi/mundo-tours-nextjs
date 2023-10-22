/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    domains: ['mundo-tours.s3.eu-central-1.amazonaws.com', 'flagcdn.com', 'cdlxkuzvjlyvwgzgcdro.supabase.co'],
  },
  experimental: {
    serverActions: true,
  },
  staticPageGenerationTimeout: 120,
}

module.exports = nextConfig
