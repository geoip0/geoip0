import type { RdapMetadataType } from "~/packages/rdap/src";

export default defineEventHandler(async (event) => {
  const type = getRouterParam(event, "type");

  const query = getRouterParam(event, "query");

  const { shouldBypassCache } = getQuery(event);

  const typeMap: Record<string, RdapMetadataType> = {
    autnum: "asn",
    asn: "asn",
    domain: "dns",
    dns: "dns",
    entity: "object-tags",
    "object-tags": "object-tags",
    nameserver: "ns",
    ns: "ns",
    ip: getIPVersion(query) === "IPv4" ? "ipv4" : "ipv6",
    ipv4: "ipv4",
    ipv6: "ipv6",
  };

  return typeMap[type]
    ? await getRdapData(typeMap[type], query, shouldBypassCache)
    : rdapErrorNotice;
});
