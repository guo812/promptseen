import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  poweredByHeader: false,
  images: {
    unoptimized: true,
  },
  async redirects() {
    return [
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'www.promptseen.online' }],
        destination: 'https://promptseen.online/:path*',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
