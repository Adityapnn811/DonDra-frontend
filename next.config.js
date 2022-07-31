/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  compiler: {
    styledComponents: true,
  },
}

module.exports = {nextConfig, 
  webpack: (config, { isServer }) => {
  if (!isServer) {
       config.resolve.fallback.fs = false
       config.resolve.fallback.dns = false
       config.resolve.fallback.net = false
  }

  return config;
}}
