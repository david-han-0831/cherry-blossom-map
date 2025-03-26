/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    // Warning: 프로덕션 환경에서는 권장되지 않습니다
    ignoreDuringBuilds: true,
  },
  typescript: {
    // Warning: 프로덕션 환경에서는 권장되지 않습니다
    ignoreBuildErrors: true,
  },
  reactStrictMode: true,
  swcMinify: true,
}

module.exports = nextConfig 