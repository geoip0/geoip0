import { IP } from "@geoip0/ipx";
import { ofetch } from "ofetch";
import type { FetchError } from "ofetch";
import { RdapClientError } from "../client";
import type { RdapBootstrapMetadata, RdapBootstrapType } from "../types";
import { formatAsn } from "../utils";

// Import bootstrap data
import asn from "./data/asn.json";
import dns from "./data/dns.json";
import ipv4 from "./data/ipv4.json";
import ipv6 from "./data/ipv6.json";
import objectTags from "./data/object-tags.json";

/**
 * Get bootstrap metadata from IANA
 */
export async function getBootstrapMetadata(
  type: RdapBootstrapType,
  fetch = false,
): Promise<RdapBootstrapMetadata> {
  try {
    if (!fetch) {
      const metadata: Record<RdapBootstrapType, RdapBootstrapMetadata> = {
        asn,
        dns,
        ipv4,
        ipv6,
        "object-tags": objectTags,
      };
      return metadata[type];
    }

    return await ofetch<RdapBootstrapMetadata>(
      `https://data.iana.org/rdap/${type}.json`,
      {
        parseResponse: JSON.parse,
      },
    );
  } catch (error) {
    throw new RdapClientError(
      `Failed to get bootstrap metadata for ${type}`,
      type,
      "help",
      (error as FetchError)?.response?.status,
      error,
    );
  }
}

/**
 * Find RDAP server for a query
 */
export async function findBootstrapServer(
  type: RdapBootstrapType,
  query: string,
): Promise<string> {
  try {
    const metadata = await getBootstrapMetadata(type);

    const service = metadata.services.find(([patterns]) =>
      patterns.some((pattern) => {
        try {
          switch (type) {
            case "dns":
              return pattern === query.split(".").pop();
            case "ipv4":
            case "ipv6":
              return IP.range(pattern).contains(query);
            case "asn": {
              const [start, end] = pattern.split("-").map(Number);
              const queryNum = Number(formatAsn(query));
              return queryNum >= start && queryNum <= end;
            }
            case "object-tags":
              return pattern === query;
            default:
              return false;
          }
        } catch {
          return false;
        }
      }),
    );

    if (!service) {
      throw new RdapClientError(
        `No RDAP server found for ${type} query: ${query}`,
        query,
        "help",
        404,
      );
    }

    return service[1][0];
  } catch (error) {
    if (error instanceof RdapClientError) {
      throw error;
    }
    throw new RdapClientError(
      `Failed to find RDAP server for ${type} query: ${query}`,
      query,
      "help",
      500,
      error,
    );
  }
}
