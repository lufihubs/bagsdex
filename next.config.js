/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true
  },
  env: {
    CUSTOM_KEY: 'my-value',
  }
}

module.exports = nextConfig;
