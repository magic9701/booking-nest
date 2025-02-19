/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "img.clerk.com",
        pathname: "/**",
      },
      {
        protocol: 'https',
        hostname: 'vgyeioqdrxiellhpjwuz.supabase.co',
      },
    ],
  },
};

export default nextConfig;
