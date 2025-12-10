/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    optimizePackageImports: ['lucide-react', '@radix-ui/react-icons', '@radix-ui/react-slot']
  },
  images: {
    domains: [],
    formats: ['image/webp', 'image/avif'],
    minimumCacheTTL: 31536000, // 1 year cache
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
  // Performance optimizations
  compress: true,
  poweredByHeader: false,
  generateEtags: true,
  
  webpack: (config, { isServer }) => {
    // Ignore src directory during build
    config.watchOptions = {
      ...config.watchOptions,
      ignored: ['**/src/**', '**/node_modules/**']
    }
    
    // Optimize bundle splitting
    if (!isServer) {
      config.optimization.splitChunks = {
        ...config.optimization.splitChunks,
        cacheGroups: {
          ...config.optimization.splitChunks.cacheGroups,
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name: 'vendors',
            chunks: 'all',
            priority: 10,
          },
          common: {
            name: 'common',
            minChunks: 2,
            chunks: 'all',
            priority: 5,
            reuseExistingChunk: true,
          },
        },
      }
    }
    
    return config
  },
  
  // Enable static exports if needed for deployment
  // output: 'export',
  // trailingSlash: true,
}

module.exports = nextConfig