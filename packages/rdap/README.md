# @geoip0/rdap 🌐

A modern RDAP (Registration Data Access Protocol) client implementation following ICANN standards.

## ✨ Features

- 🎯 Full support for all RDAP query types:
  - 🌐 Domain names (including IDN support)
  - 🔍 IP addresses (IPv4 and IPv6)
  - 🔢 Autonomous System Numbers (ASN)
  - 🌍 Nameservers
  - 👤 Entity handles and object tags
- 📦 Built-in IANA bootstrap files with option to fetch latest data
- ⚡️ Real-time bootstrap data retrieval
- 🔄 Proper Accept header usage for RDAP responses
- 🛡️ Comprehensive error handling with detailed error types
- 📝 Full TypeScript support with strict type definitions
- 🚀 Minimal dependencies and small footprint
- 🔒 Secure access support (HTTPS and authentication)
- 📄 Pagination support for large responses

## 📥 Installation

```bash
# Using npm
npm install @geoip0/rdap

# Using yarn
yarn add @geoip0/rdap

# Using pnpm
pnpm add @geoip0/rdap
```

## 🚀 Basic Usage

```typescript
import { getRdapData } from "@geoip0/rdap";

// Query domain information
const domainInfo = await getRdapData("dns", "example.com");
// Returns: RdapDomainResponse with nameservers, status, events, etc.

// Query IP information (IPv4)
const ipv4Info = await getRdapData("ipv4", "8.8.8.8");
// Returns: RdapIpResponse with network information, entities, etc.

// Query IP information (IPv6)
const ipv6Info = await getRdapData("ipv6", "2001:db8::1");
// Returns: RdapIpResponse with network information, entities, etc.

// Query ASN information
const asnInfo = await getRdapData("asn", "15169");
// Returns: RdapAsnResponse with ASN details, network range, etc.

// Query nameserver information
const nsInfo = await getRdapData("ns", "ns1.example.com");
// Returns: RdapNameserverResponse with nameserver details, status, etc.

// Query entity information
const entityInfo = await getRdapData("object-tags", "ABC123-EXAMPLE");
// Returns: RdapEntityResponse with entity details, roles, etc.
```

## 🔧 Advanced Usage

### 🛠️ Using the RDAP Client Class

```typescript
import { RdapClient } from "@geoip0/rdap";

const client = new RdapClient({
  // Optional configuration
  timeout: 5000, // Request timeout in milliseconds
  headers: {
    // Custom headers
    Authorization: "Bearer your-token",
  },
  fetchLatest: true, // Always fetch latest bootstrap data
});

// Query methods return typed responses
const domainInfo = await client.queryDomain("example.com");
const ipInfo = await client.queryIp("8.8.8.8");
const asnInfo = await client.queryAsn("15169");
const nsInfo = await client.queryNameserver("ns1.example.com");
const entityInfo = await client.queryEntity("ABC123-EXAMPLE");

// Search methods (if supported by server)
const domains = await client.searchDomains({ name: "example" });
const entities = await client.searchEntities({ fn: "John Doe" });
```

### ⚠️ Error Handling

The package provides detailed error information through the `RdapClientError` class:

```typescript
import { RdapClient, RdapClientError } from "@geoip0/rdap";

const client = new RdapClient();

try {
  const data = await client.queryDomain("example.com");
} catch (error) {
  if (error instanceof RdapClientError) {
    console.error(
      `RDAP query failed: ${error.message}`,
      `Type: ${error.type}`,
      `Query: ${error.query}`,
      `Status: ${error.status}`,
      error.cause,
    );

    // Helper methods for common errors
    if (error.isAuthenticationError()) {
      // Handle authentication errors
    }
    if (error.isNotFoundError()) {
      // Handle not found errors
    }
    if (error.isRateLimitError()) {
      // Handle rate limit errors
    }
  }
}
```

#### Error Types

| Error Type       | Description                        | HTTP Status |
| ---------------- | ---------------------------------- | ----------- |
| `NotFound`       | The requested object was not found | 404         |
| `Authentication` | Authentication is required         | 401         |
| `Authorization`  | Access is not authorized           | 403         |
| `RateLimit`      | Rate limit exceeded                | 429         |
| `InvalidQuery`   | The query format is invalid        | 400         |
| `ServerError`    | Server-side error occurred         | 500         |
| `Timeout`        | Request timed out                  | N/A         |
| `Network`        | Network error occurred             | N/A         |
| `Bootstrap`      | Error fetching bootstrap data      | N/A         |

### 🔄 Working with Bootstrap Data

```typescript
import { getBootstrapMetadata, findBootstrapServer } from "@geoip0/rdap";

// Get bootstrap metadata for a service type
const metadata = await getBootstrapMetadata("dns", true); // true to fetch latest

// Find appropriate RDAP server for a query
const serverUrl = await findBootstrapServer("dns", "example.com");
```

## 📚 API Reference

### 🎯 RdapClient

The main class for making RDAP queries.

```typescript
class RdapClient {
  constructor(options?: RdapClientOptions);

  // Query methods
  queryDomain(domain: string): Promise<RdapDomainResponse>;
  queryIp(ip: string): Promise<RdapIpResponse>;
  queryAsn(asn: string | number): Promise<RdapAsnResponse>;
  queryNameserver(nameserver: string): Promise<RdapNameserverResponse>;
  queryEntity(handle: string): Promise<RdapEntityResponse>;

  // Search methods
  searchDomains(params: SearchParams): Promise<RdapSearchResponse>;
  searchNameservers(params: SearchParams): Promise<RdapSearchResponse>;
  searchEntities(params: SearchParams): Promise<RdapSearchResponse>;

  // Help method
  help(): Promise<RdapHelpResponse>;
}
```

### 📋 Types

The package exports comprehensive TypeScript types for all RDAP objects and responses:

```typescript
interface RdapResponse {
  rdapConformance: string[];
  notices?: Notice[];
  links?: Link[];
  // ...
}

interface RdapDomainResponse extends RdapResponse {
  handle: string;
  ldhName: string;
  unicodeName?: string;
  variants?: Variant[];
  nameservers?: Nameserver[];
  // ...
}

// See types.ts for complete type definitions
```

## 📖 Standards Compliance

This implementation follows these RDAP-related standards:

- 📘 [RFC 7480](https://tools.ietf.org/html/rfc7480) - HTTP Usage in RDAP
- 🔒 [RFC 7481](https://tools.ietf.org/html/rfc7481) - Security Services for RDAP
- 🔍 [RFC 7482](https://tools.ietf.org/html/rfc7482) - RDAP Query Format
- 📋 [RFC 7483](https://tools.ietf.org/html/rfc7483) - RDAP JSON Responses
- 🔄 [RFC 8056](https://tools.ietf.org/html/rfc8056) - EPP and RDAP Status Mapping
- ✅ [ICANN RDAP Response Profile](https://www.icann.org/rdap)

## 🤝 Contributing

Contributions are welcome! Please see our [Contributing Guide](../../CONTRIBUTING.md) for details.

## 📄 License

[MIT](LICENSE) © [Demo Macro](https://imst.xyz/)
