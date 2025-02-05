import { ofetch } from "ofetch";
import type { FetchError } from "ofetch";
import { findBootstrapServer } from "../bootstrap";
import type {
  RdapBootstrapType,
  RdapClientOptions,
  RdapQueryType,
  RdapResponse,
} from "../types";
import {
  bootstrapTypeToQueryType,
  convertToAscii,
  getBootstrapType,
  getQueryType,
} from "../utils";

/**
 * RDAP client error
 */
export class RdapClientError extends Error {
  constructor(
    message: string,
    public readonly query: string,
    public readonly queryType: RdapQueryType,
    public readonly statusCode?: number,
    public readonly cause?: unknown,
  ) {
    super(message);
    this.name = "RdapClientError";
  }

  get isAuthError(): boolean {
    return this.statusCode === 401 || this.statusCode === 403;
  }

  get isNotFound(): boolean {
    return this.statusCode === 404;
  }

  get isRateLimit(): boolean {
    return this.statusCode === 429;
  }
}

/**
 * RDAP client
 */
export class RdapClient {
  private readonly options: Required<RdapClientOptions>;

  constructor(options: RdapClientOptions = {}) {
    this.options = {
      baseUrl: options.baseUrl ?? "",
      authToken: options.authToken ?? "",
      headers: options.headers ?? {},
      convertIdn: options.convertIdn ?? true,
      fetchOptions: options.fetchOptions ?? {},
    };
  }

  /**
   * Query RDAP data
   */
  async query<T extends RdapResponse = RdapResponse>(
    query: string,
    type?: RdapQueryType,
  ): Promise<T> {
    try {
      // Convert IDN domain to ASCII
      const normalizedQuery = this.options.convertIdn
        ? convertToAscii(query)
        : query;

      // Determine query type
      const queryType = type ?? getQueryType(normalizedQuery);

      // Get server URL
      const url = await this.getServerUrl(normalizedQuery, queryType);

      // Make request
      const response = await ofetch<T>(url, {
        headers: {
          Accept: "application/rdap+json",
          Authorization: this.options.authToken
            ? `Bearer ${this.options.authToken}`
            : undefined,
          ...this.options.headers,
        },
        ...this.options.fetchOptions,
      });

      return response;
    } catch (error) {
      if (error instanceof RdapClientError) {
        throw error;
      }

      const queryType = type ?? getQueryType(query);
      throw new RdapClientError(
        `RDAP query failed: ${error}`,
        query,
        queryType,
        (error as FetchError)?.response?.status,
        error,
      );
    }
  }

  /**
   * Get server URL for a query
   */
  private async getServerUrl(
    query: string,
    queryType: RdapQueryType,
  ): Promise<string> {
    // If base URL is provided, use it
    if (this.options.baseUrl) {
      const baseUrl = this.options.baseUrl.replace(/\/$/, "");
      return `${baseUrl}/${queryType}/${query}`;
    }

    // Otherwise, use bootstrap service
    const bootstrapType = getBootstrapType(query);
    const baseUrl = (await findBootstrapServer(bootstrapType, query)).replace(
      /\/$/,
      "",
    );
    const finalType = bootstrapTypeToQueryType(bootstrapType);

    return `${baseUrl}/${finalType}/${query}`;
  }

  /**
   * Query domain information
   */
  async queryDomain<T extends RdapResponse = RdapResponse>(
    domain: string,
  ): Promise<T> {
    return this.query(domain, "domain");
  }

  /**
   * Query nameserver information
   */
  async queryNameserver<T extends RdapResponse = RdapResponse>(
    nameserver: string,
  ): Promise<T> {
    return this.query(nameserver, "nameserver");
  }

  /**
   * Query entity information
   */
  async queryEntity<T extends RdapResponse = RdapResponse>(
    handle: string,
  ): Promise<T> {
    return this.query(handle, "entity");
  }

  /**
   * Query IP network information
   */
  async queryIp<T extends RdapResponse = RdapResponse>(ip: string): Promise<T> {
    return this.query(ip, "ip");
  }

  /**
   * Query autonomous system information
   */
  async queryAsn<T extends RdapResponse = RdapResponse>(
    asn: string,
  ): Promise<T> {
    return this.query(asn, "autnum");
  }

  /**
   * Search domains
   */
  async searchDomains<T extends RdapResponse = RdapResponse>(
    query: string,
  ): Promise<T> {
    return this.query(query, "domains");
  }

  /**
   * Search nameservers
   */
  async searchNameservers<T extends RdapResponse = RdapResponse>(
    query: string,
  ): Promise<T> {
    return this.query(query, "nameservers");
  }

  /**
   * Search entities
   */
  async searchEntities<T extends RdapResponse = RdapResponse>(
    query: string,
  ): Promise<T> {
    return this.query(query, "entities");
  }

  /**
   * Get help information
   */
  async getHelp<T extends RdapResponse = RdapResponse>(): Promise<T> {
    return this.query("", "help");
  }
}
