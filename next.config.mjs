/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        source: "/lims-backend-local/api/:path*",
        destination: "http://java-backend:8080/lims-backend-local/api/:path*",
      },
    ];
  },
};

export default nextConfig;
