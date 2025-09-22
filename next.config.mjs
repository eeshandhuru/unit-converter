const nextConfig = {
  eslint: {
    dirs: ['app', 'components', 'lib', 'hooks'],
    ignoreDuringBuilds: false, // Updated to enable ESLint during builds
  },
  typescript: {
    ignoreBuildErrors: false, // Updated to not ignore TypeScript build errors
  },
  images: {
    unoptimized: true, // Updated to allow unoptimized images
  },
}
