/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['example.com', 'files.stripe.com'], 
  },
  
};

module.exports = nextConfig;