import ipCidr from "ip-cidr";
import { ofetch } from "ofetch";
import { dns, asn, ipv4, ipv6, objectTags } from "./metadata";

export interface RdapMetadata {
  description: string;
  publication: string;
  services: Array<Array<Array<string>>>;
  version: string;
}

export type RdapMetadataType =
  | "asn"
  | "dns"
  | "ns"
  | "ipv4"
  | "ipv6"
  | "object-tags";

export async function getRdapMetadata(type: RdapMetadataType, fetch = false) {
  if (!fetch) {
    const metadata: Record<RdapMetadataType, RdapMetadata> = {
      asn: asn,
      dns: dns,
      ns: dns,
      ipv4: ipv4,
      ipv6: ipv6,
      "object-tags": objectTags,
    };

    return metadata[type] as RdapMetadata;
  }

  return await ofetch<RdapMetadata>(`https://data.iana.org/rdap/${type}.json`, {
    parseResponse: JSON.parse,
  });
}

export async function getRdapServer(type: RdapMetadataType, query: string) {
  const metadata = await getRdapMetadata(type);

  const suffix: Record<RdapMetadataType, string> = {
    asn: "autnum",
    dns: "domain",
    ns: "nameserver",
    ipv4: "ip",
    ipv6: "ip",
    "object-tags": "object-tag",
  };

  const service = metadata.services.find((service) =>
    service[0].some((c) => {
      if (type === "dns") return c === query.split(".").pop();
      if (type === "ipv4" || type === "ipv6")
        return new ipCidr(c).contains(query);
      if (type === "asn")
        return +query >= +c.split("-")[0] && +query <= +c.split("-")[1];
      if (type === "object-tags") return c === query;
    }),
  );

  return `${service?.pop()[0] || "https://api.geoip0.com/rdap/"}${suffix[type]}/${query}`;
}

export async function getRdapData(type: RdapMetadataType, query: string) {
  return await ofetch(`${await getRdapServer(type, query)}`);
}
