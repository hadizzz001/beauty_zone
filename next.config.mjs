/** @type {import('next').NextConfig} */
const nextConfig = {
    typescript: {
        // !! WARN: This disables type checking for builds
        ignoreBuildErrors: true,
      },
};

export default nextConfig;
