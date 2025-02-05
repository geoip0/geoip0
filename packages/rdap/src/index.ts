/**
 * RDAP (Registration Data Access Protocol) Client
 * A modern implementation of RDAP client following ICANN standards
 * @see https://www.icann.org/rdap
 */

import { IP } from "@geoip0/ipx";
import { ofetch } from "ofetch";
import { dns, asn, ipv4, ipv6, objectTags } from "./bootstrap/data";

/**
 * RDAP metadata interface as defined by IANA
 * @see https://www.iana.org/assignments/rdap-json-values/rdap-json-values.xhtml
 */
export interface RdapMetadata {
  description: string;
  publication: string;
  services: Array<Array<Array<string>>>;
  version: string;
}

/**
 * RDAP query types
 */
export type RdapMetadataType =
  | "asn" // Autonomous System Numbers
  | "dns" // Domain names
  | "ns" // Nameservers
  | "ipv4" // IPv4 addresses
  | "ipv6" // IPv6 addresses
  | "object-tags"; // Entity handles and other identifiers

/**
 * Error thrown when RDAP query fails
 */
export class RdapError extends Error {
  constructor(
    message: string,
    public readonly type: RdapMetadataType,
    public readonly query: string,
    public readonly cause?: unknown,
  ) {
    super(message);
    this.name = "RdapError";
  }
}

/**
 * Get RDAP metadata from IANA
 * @param type Type of RDAP service
 * @param fetch Whether to fetch fresh data from IANA (default: false)
 * @returns RDAP metadata
 * @throws {RdapError} If metadata fetch fails
 */
export async function getRdapMetadata(
  type: RdapMetadataType,
  fetch = false,
): Promise<RdapMetadata> {
  try {
    if (!fetch) {
      const metadata: Record<RdapMetadataType, RdapMetadata> = {
        asn,
        dns,
        ns: dns,
        ipv4,
        ipv6,
        "object-tags": objectTags,
      };
      return metadata[type];
    }

    return await ofetch<RdapMetadata>(
      `https://data.iana.org/rdap/${type}.json`,
      {
        parseResponse: JSON.parse,
      },
    );
  } catch (error) {
    throw new RdapError(
      `Failed to get RDAP metadata for ${type}`,
      type,
      "metadata",
      error,
    );
  }
}

/**
 * Get RDAP server URL for a query
 * @param type Type of RDAP service
 * @param query Query string (domain, IP, ASN, etc.)
 * @returns Full RDAP server URL for the query
 * @throws {RdapError} If no matching server is found
 */
export async function getRdapServer(
  type: RdapMetadataType,
  query: string,
): Promise<string> {
  try {
    const metadata = await getRdapMetadata(type);

    const suffix: Record<RdapMetadataType, string> = {
      asn: "autnum",
      dns: "domain",
      ns: "nameserver",
      ipv4: "ip",
      ipv6: "ip",
      "object-tags": "entity",
    };

    const service = metadata.services.find((service) =>
      service?.[0].some((c) => {
        try {
          if (type === "dns") return c === query.split(".").pop();
          if (type === "ipv4" || type === "ipv6") {
            return IP.range(c).contains(query);
          }
          if (type === "asn") {
            const [start, end] = c.split("-").map(Number);
            const queryNum = Number(query);
            return queryNum >= start && queryNum <= end;
          }
          if (type === "object-tags") return c === query;
          return false;
        } catch {
          return false;
        }
      }),
    );

    if (!service) {
      throw new RdapError(
        `No RDAP server found for ${type} query: ${query}`,
        type,
        query,
      );
    }

    return `${service[service.length - 1][0]}${suffix[type]}/${query}`;
  } catch (error) {
    if (error instanceof RdapError) throw error;
    throw new RdapError(
      `Failed to get RDAP server for ${type} query: ${query}`,
      type,
      query,
      error,
    );
  }
}

/**
 * Get RDAP data for a query
 * @param type Type of RDAP service
 * @param query Query string (domain, IP, ASN, etc.)
 * @returns RDAP response data
 * @throws {RdapError} If query fails
 */
export async function getRdapData(
  type: RdapMetadataType,
  query: string,
): Promise<unknown> {
  try {
    const url = await getRdapServer(type, query);
    return await ofetch(url, {
      headers: {
        Accept: "application/rdap+json",
      },
    });
  } catch (error) {
    if (error instanceof RdapError) throw error;
    throw new RdapError(
      `Failed to get RDAP data for ${type} query: ${query}`,
      type,
      query,
      error,
    );
  }
}

export * from "./types";
export * from "./client";
export * from "./bootstrap";
export * from "./utils";
