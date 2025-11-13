/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  experimental: {
    optimizePackageImports: ['@radix-ui/react-icons'],
  },
  async rewrites() {
    // In development, proxy /api/* to the backend gateway to avoid CORS
    // In production, this should be handled by your deployment infrastructure
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080'
    
    return [
      {
        source: '/api/:path*',
        destination: `${apiUrl}/:path*`,
      },
    ]
  },
}

export default nextConfig
