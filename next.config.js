/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['tomato-electric-impala-477.mypinata.cloud'],
  }
}

module.exports = nextConfig
