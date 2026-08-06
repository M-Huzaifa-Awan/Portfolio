/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    formats: ["image/avif", "image/webp"],
  },
  async redirects() {
    return [
      {
        source: "/cv",
        destination: "/Huzaifa_Awan_Senior_CV.pdf",
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
