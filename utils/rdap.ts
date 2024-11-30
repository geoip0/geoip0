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
