/**
 * RDAP Types
 * Based on RFC 7483: JSON Responses for the Registration Data Access Protocol (RDAP)
 * @see https://datatracker.ietf.org/doc/html/rfc7483
 */

/**
 * RDAP conformance levels
 */
export type RdapConformance =
  | "rdap_level_0"
  | "icann_rdap_response_profile_0"
  | "icann_rdap_technical_implementation_guide_0";

/**
 * Common RDAP object fields
 */
export interface RdapCommon {
  rdapConformance: RdapConformance[];
  notices?: RdapNotice[];
  remarks?: RdapRemark[];
  links?: RdapLink[];
  events?: RdapEvent[];
  status?: string[];
  port43?: string;
}

/**
 * RDAP notice or remark
 */
export interface RdapNotice {
  title?: string;
  type?: string;
  description: string[];
  links?: RdapLink[];
}

export type RdapRemark = RdapNotice;

/**
 * RDAP link
 */
export interface RdapLink {
  value: string;
  rel: string;
  href: string;
  hreflang?: string[];
  title?: string;
  media?: string;
  type?: string;
}

/**
 * RDAP event
 */
export interface RdapEvent {
  eventAction: string;
  eventActor?: string;
  eventDate: string;
  links?: RdapLink[];
}

/**
 * RDAP public ID
 */
export interface RdapPublicId {
  type: string;
  identifier: string;
}

/**
 * RDAP entity (organization or individual)
 */
export type VCardPropertyType =
  | "fn"
  | "n"
  | "nickname"
  | "photo"
  | "bday"
  | "anniversary"
  | "gender"
  | "adr"
  | "tel"
  | "email"
  | "impp"
  | "lang"
  | "tz"
  | "geo"
  | "title"
  | "role"
  | "logo"
  | "org"
  | "member"
  | "related"
  | "categories"
  | "note"
  | "prodid"
  | "rev"
  | "sound"
  | "uid"
  | "clientpidmap"
  | "url"
  | "version"
  | "key"
  | "fburl"
  | "caladruri"
  | "caluri";

export type VCardProperty = [
  VCardPropertyType,
  Record<string, string>,
  string,
  string,
];
export type VCardArray = ["vcard", VCardProperty[]];

export interface RdapEntity extends RdapCommon {
  objectClassName: "entity";
  handle: string;
  vcardArray?: VCardArray;
  roles?: string[];
  publicIds?: RdapPublicId[];
  entities?: RdapEntity[];
}

/**
 * RDAP nameserver
 */
export interface RdapNameserver extends RdapCommon {
  objectClassName: "nameserver";
  handle?: string;
  ldhName: string;
  unicodeName?: string;
  ipAddresses?: {
    v4?: string[];
    v6?: string[];
  };
  entities?: RdapEntity[];
}

/**
 * RDAP domain
 */
export interface RdapDomain extends RdapCommon {
  objectClassName: "domain";
  handle?: string;
  ldhName: string;
  unicodeName?: string;
  variants?: Array<{
    relation: string[];
    idnTable: string;
    variantNames: Array<{
      ldhName: string;
      unicodeName?: string;
    }>;
  }>;
  nameservers?: RdapNameserver[];
  secureDNS?: {
    zoneSigned: boolean;
    delegationSigned: boolean;
    maxSigLife?: number;
    dsData?: Array<{
      keyTag: number;
      algorithm: number;
      digest: string;
      digestType: number;
      events?: RdapEvent[];
      links?: RdapLink[];
    }>;
    keyData?: Array<{
      flags: number;
      protocol: number;
      publicKey: string;
      algorithm: number;
      events?: RdapEvent[];
      links?: RdapLink[];
    }>;
  };
  entities?: RdapEntity[];
}

/**
 * RDAP IP network
 */
export interface RdapIpNetwork extends RdapCommon {
  objectClassName: "ip network";
  handle: string;
  startAddress: string;
  endAddress: string;
  ipVersion: string;
  name?: string;
  type?: string;
  country?: string;
  parentHandle?: string;
  entities?: RdapEntity[];
}

/**
 * RDAP autonomous system
 */
export interface RdapAutnum extends RdapCommon {
  objectClassName: "autnum";
  handle: string;
  startAutnum: number;
  endAutnum: number;
  name?: string;
  type?: string;
  entities?: RdapEntity[];
}

/**
 * RDAP error
 */
export interface RdapError extends RdapCommon {
  errorCode: number;
  title: string;
  description: string[];
}

/**
 * RDAP response types
 */
export type RdapResponse =
  | RdapDomain
  | RdapNameserver
  | RdapEntity
  | RdapIpNetwork
  | RdapAutnum
  | RdapError;

/**
 * RDAP query types
 */
export type RdapQueryType =
  | "domain" // Domain names
  | "nameserver" // Nameservers
  | "entity" // Entities (organizations, individuals)
  | "ip" // IP networks
  | "autnum" // Autonomous system numbers
  | "help" // Help information
  | "domains" // Search domains
  | "nameservers" // Search nameservers
  | "entities"; // Search entities

/**
 * RDAP bootstrap service types
 */
export type RdapBootstrapType =
  | "asn" // Autonomous System Numbers
  | "dns" // Domain names
  | "ipv4" // IPv4 addresses
  | "ipv6" // IPv6 addresses
  | "object-tags"; // Entity handles

/**
 * RDAP bootstrap metadata
 */
export interface RdapBootstrapMetadata {
  description: string;
  publication: string;
  services: string[][][];
  version: string;
}

/**
 * RDAP client options
 */
export interface RdapClientOptions {
  /**
   * Base URL for RDAP service
   * If not provided, will use bootstrap service
   */
  baseUrl?: string;

  /**
   * Authentication token for RDAP service
   */
  authToken?: string;

  /**
   * Custom headers for RDAP request
   */
  headers?: Record<string, string>;

  /**
   * Whether to convert IDN domains to ASCII format
   * @default true
   */
  convertIdn?: boolean;

  /**
   * Fetch options
   */
  fetchOptions?: RequestInit;
}
