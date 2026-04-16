/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: "/dashboard/:path*",
        destination: "/dashboards/:path*",
        permanent: false,
      },
      {
        source: "/dashboard",
        destination: "/dashboards",
        permanent: false,
      },
    ];
  },
};
module.exports = nextConfig;
