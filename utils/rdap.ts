import {
  type RdapMetadataType,
  getRdapServer,
} from "~/packages/rdap/src/index";

export const rdapNotice = {
  rdapConformance: ["rdap_level_0"],
  notices: [
    {
      title: "ABOUT",
      description: ["This is the GeoIP0 RDAP server."],
      links: [
        {
          rel: "alternate",
          type: "text/html",
          href: "https://www.geoip0.com/",
        },
      ],
    },
  ],
};

export const rdapErrorNotice = {
  ...rdapNotice,
  title: "Not Implemented",
  description: ["Requested path segment not supported"],
};

export const getRdapData = defineCachedFunction(
  async (type: RdapMetadataType, query: string, shouldBypassCache = false) => {
    try {
      return await $fetch(`${await getRdapServer(type, query)}`);
    } catch (error) {
      return rdapErrorNotice;
    }
  },
  {
    name: "data",
    group: "rdap",
    getKey: (type: RdapMetadataType, query: string) => `${type}:${query}`,
    maxAge: 60,
    staleMaxAge: 60,
    shouldBypassCache(
      type: RdapMetadataType,
      query: string,
      shouldBypassCache: boolean,
    ) {
      return shouldBypassCache;
    },
  },
);
