import { defineNitroConfig } from "nitropack/config";

export default defineNitroConfig({
  experimental: {
    database: true,
    openAPI: true,
  },

  routeRules: {
    "/**": {
      cors: true,
    },
    "/rdap/asn/**": {
      redirect: "/rdap/autnum/**",
    },
    "/rdap/dns/**": {
      redirect: "/rdap/domain/**",
    },
    "/rdap/ns/**": {
      redirect: "/rdap/nameserver/**",
    },
    "/rdap/ipv4/**": {
      redirect: "/rdap/ip/**",
    },
    "/rdap/ipv6/**": {
      redirect: "/rdap/ip/**",
    },
    "/rdap/object-tags/**": {
      redirect: "/rdap/entity/**",
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
