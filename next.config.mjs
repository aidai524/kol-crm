/** @type {import('next').NextConfig} */
import dotenv from 'dotenv';

const { parsed: localEnv } = process.env.BUILD_ENV
  ? dotenv.config({
      path: `.env.${process.env.BUILD_ENV}`,
    })
  : {};

console.log('process.env.BUILD_ENV', process.env.BUILD_ENV);

const nextConfig = {
  env: {
    ...localEnv,
  },
  rewrites: async () => {
    return [
      {
        source: "/api/v1/:path*",
        destination: `${process.env.NEXT_PUBLIC_API_URL}/api/v1/:path*`,
      },
    ];
  },
  webpack: (config) => {
    // config.ignoreWarnings = [
    //   { module: /node_modules\/@solana\/web3\.js/ },
    //   { message: /Critical dependency: the request of a dependency is an expression/ }
    // ];
    //https://docs.reown.com/appkit/next/core/installation#extra-configuration
    config.externals.push("pino-pretty", "lokijs", "encoding");
    return config;
  },
};

export default nextConfig;
