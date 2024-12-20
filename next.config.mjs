/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config) => {
    config.ignoreWarnings = [
      { module: /node_modules\/@solana\/web3\.js/ },
      { message: /Critical dependency: the request of a dependency is an expression/ }
    ];
    return config;
  },
};

export default nextConfig;
