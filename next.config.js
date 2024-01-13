/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },

  swcMinify: true,
  images: {
    remotePatterns: [
      {
        hostname: 'mundo-tours.s3.eu-central-1.amazonaws.com',
      },
      {
        hostname: 'flagcdn.com',
      },
      {
        hostname: 'cdlxkuzvjlyvwgzgcdro.supabase.co',
      },
    ],
  },

  staticPageGenerationTimeout: 120,
}

module.exports = nextConfig
