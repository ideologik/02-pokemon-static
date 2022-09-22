/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  images: { domains: ['raw.githubusercontent.com'] },
  staticPageGenerationTimeout: 60,
}

module.exports = nextConfig
