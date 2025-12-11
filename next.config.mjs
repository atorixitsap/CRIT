// next.config.mjs – ESM
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname  = path.dirname(__filename);

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable Turbopack explicitly to silence errors
  turbopack: {},

  // Updated image config — domains removed (deprecated)
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        pathname: '/**',
      },
    ],
  },

  // ❌ REMOVE Webpack config (it breaks Turbopack)
  // webpack: (config) => {
  //   config.resolve.alias = {
  //     ...config.resolve.alias,
  //     '@': path.resolve(__dirname),
  //   };
  //   return config;
  // },
};

export default nextConfig;
