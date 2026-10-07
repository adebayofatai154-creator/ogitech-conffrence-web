/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [{ protocol: "https", hostname: "res.cloudinary.com" }],
  },
  // Sections that used to be separate pages now live on the homepage.
  // Permanent redirects keep old links and search results working.
  async redirects() {
    return [
      { source: "/about", destination: "/#about", permanent: true },
      { source: "/call-for-papers", destination: "/#call-for-papers", permanent: true },
      { source: "/accommodation", destination: "/#accommodation", permanent: true },
      { source: "/contact", destination: "/#contact", permanent: true },
    ];
  },
};
module.exports = nextConfig;
