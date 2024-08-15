module.exports = {
    async rewrites() {
      return [
        {
          source: '/api/:path*',
          destination: 'http://127.0.0.1:5328/api/:path*', // Proxy to Backend
        },
      ]
    },
    images: {
        domains: [
            "utfs.io",
            "img.clerk.com",
            "i.scdn.co"
        ]
    },
    reactStrictMode: false
  }