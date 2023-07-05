/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'randomuser.me',
      },
    ],
  },
};

module.exports = nextConfig;

// http://localhost:3000/(https://randomuser.me/api/portraits/med/men/97.jpg)
