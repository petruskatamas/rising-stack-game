/** @type {import('next').NextConfig} */
const nextConfig = {
    async headers() {
        return [
          {
            // Routes this applies to
            source: "/api/(.*)",
            // Headers
            headers: [
              // Allow for specific domains to have access or * for all
              {
                key: "Access-Control-Allow-Origin",
                value: "*",
              },
              // Allows for specific methods accepted
              {
                key: "Access-Control-Allow-Methods",
                value: "GET, POST, PUT, DELETE, OPTIONS",
              },
              // Allows for specific headers accepted (These are a few standard ones)
              {
                key: "Access-Control-Allow-Headers",
                value: "Content-Type, Authorization",
              },
            ],
          },
        ];
      },
}

const dbConfig = {
    experimental: {
      esmExternals: "loose", // <-- add this
      serverComponentsExternalPackages: ["mongoose"] // <-- and this
    },
    // and the following to enable top-level await support for Webpack
    webpack: (config) => {
      config.experiments = {
        topLevelAwait: true
      };
      return config;
    },
  }

module.exports = nextConfig, dbConfig
