const nextConfig = {
  async rewrites() {
    return [
      {
        source: '/shop',
        destination: '/shop/index.html',
      },
    ];
  },
};

export default nextConfig;
