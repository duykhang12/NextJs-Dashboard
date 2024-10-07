/** @type {import('next').NextConfig} */

const nextConfig = {
  experimental: {
    ppr: "incremental",
    serverActions: {
      bodySizeLimit: '5mb', // Set your desired limit, e.g., 5mb
    },
  },
};

export default nextConfig;
