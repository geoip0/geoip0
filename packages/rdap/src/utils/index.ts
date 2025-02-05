import type { IPOptions, IPRange } from "@geoip0/ipx";
import { IP } from "@geoip0/ipx";
import type { RdapBootstrapType, RdapQueryType } from "../types";

type IPType = {
  range(cidr: string, options?: IPOptions): IPRange;
  isValid(ip: string): boolean;
  isIPv4(ip: string): boolean;
  isIPv6(ip: string): boolean;
};

const IPUtil = IP as IPType;

/**
 * Convert domain name to ASCII format (Punycode)
 */
export function convertToAscii(domain: string): string {
  try {
    return new URL(`http://${domain}`).hostname;
  } catch {
    return domain;
  }
}

/**
 * Convert bootstrap type to query type
 */
export function bootstrapTypeToQueryType(
  type: RdapBootstrapType,
): RdapQueryType {
  switch (type) {
    case "asn":
      return "autnum";
    case "dns":
      return "domain";
    case "ipv4":
    case "ipv6":
      return "ip";
    case "object-tags":
      return "entity";
    default:
      throw new Error(`Invalid bootstrap type: ${type}`);
  }
}

/**
 * Check if a string is a valid IP address
 */
export function isIpAddress(value: string): boolean {
  return IPUtil.isValid(value);
}

/**
 * Check if a string is a valid IPv4 address
 */
export function isIpv4Address(value: string): boolean {
  return IPUtil.isIPv4(value);
}

/**
 * Check if a string is a valid IPv6 address
 */
export function isIpv6Address(value: string): boolean {
  return IPUtil.isIPv6(value);
}

/**
 * Check if a string is a valid ASN
 */
export function isAsn(value: string): boolean {
  return /^AS\d+$/i.test(value) || /^\d+$/.test(value);
}

/**
 * Format ASN number
 */
export function formatAsn(value: string): string {
  if (/^AS\d+$/i.test(value)) {
    return value.slice(2);
  }
  return value;
}

/**
 * Check if a string is a valid domain name
 */
export function isDomain(value: string): boolean {
  try {
    new URL(`http://${value}`);
    return true;
  } catch {
    return false;
  }
}

/**
 * Check if a string is a valid CIDR range
 */
export function isCidr(value: string): boolean {
  try {
    IP.range(value);
    return true;
  } catch {
    return false;
  }
}

/**
 * Get query type from query string
 */
export function getQueryType(query: string): RdapQueryType {
  if (isIpAddress(query) || isCidr(query)) {
    return "ip";
  }
  if (isAsn(query)) {
    return "autnum";
  }
  if (isDomain(query)) {
    return "domain";
  }
  return "entity";
}

/**
 * Get bootstrap type from query string
 */
export function getBootstrapType(query: string): RdapBootstrapType {
  if (isIpv4Address(query)) {
    return "ipv4";
  }
  if (isIpv6Address(query)) {
    return "ipv6";
  }
  if (isAsn(query)) {
    return "asn";
  }
  if (isDomain(query)) {
    return "dns";
  }
  return "object-tags";
}
