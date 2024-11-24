import { defineNitroConfig } from "nitropack/config";

export default defineNitroConfig({
  experimental: {
    database: true,
  },
  routeRules: {
    "/**": {
      cors: true,
    },
  },
  typescript: {
    tsConfig: {
      compilerOptions: {
        moduleResolution: "Node",
      },
    },
  },
  runtimeConfig: {
    public: {
      postgres: {
        url: process.env.POSTGRES_URL,
      },
    },
  },
  database: {
    default: {
      connector: "postgresql",
      options: {
        url: process.env.POSTGRES_URL,
      },
    },
  },
  rollupConfig: {
    external: ["pg-native", "cloudflare:sockets"],
  },
});
