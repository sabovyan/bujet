/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    typedRoutes: true
  },
  images: {
    domains: ['lh3.googleusercontent.com']
  }
};

module.exports = nextConfig;
