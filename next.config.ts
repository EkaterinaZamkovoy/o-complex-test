import type { NextConfig } from 'next';

const path = require('path');

const nextConfig: NextConfig = {
  output: 'export',
  basePath: '/o-complex-test',
  assetPrefix: '/o-complex-test',
  images: {
    unoptimized: true,
  },
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'http://o-complex.com:1337/:path*', // Proxy to external API
      },
    ];
  },
  sassOptions: {
    includePaths: [path.join(__dirname, 'shared/styles')],
    prependData: `@import "@/shared/styles/variables.scss";`,
  },
};

export default nextConfig;
