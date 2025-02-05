# GeoIP0 🌍

![GitHub](https://img.shields.io/github/license/geoip0/geoip0)
[![Contributor Covenant](https://img.shields.io/badge/Contributor%20Covenant-2.1-4baaaa.svg)](https://www.contributor-covenant.org/version/2/1/code_of_conduct/)

> 🚀 Self-hosted Geo IP Zero Configuration API Services for Serverless.

## 📖 About GeoIP0

GeoIP0 is a powerful tool for looking up geolocation information corresponding to IP addresses. The service seamlessly integrates with serverless platforms, utilizing the platform's Geo IP context, and supports multiple publicly available free databases. It provides comprehensive geolocation data including country, province, city, latitude, longitude, and more. The service is designed to be self-hosted, making it easy for users to deploy and manage according to their specific needs.

## 📦 Core Packages

### 🌐 @geoip0/rdap

A modern RDAP (Registration Data Access Protocol) client implementation following ICANN standards. It provides:

- 🎯 Full support for all RDAP query types (domains, IPs, ASNs, nameservers, entities)
- 📦 Built-in IANA bootstrap with real-time data retrieval
- 🛡️ Comprehensive error handling and TypeScript support
- 🔒 Secure access and pagination support

[Learn more about @geoip0/rdap](packages/rdap/README.md)

```typescript
import { RdapClient } from "@geoip0/rdap";

const client = new RdapClient();
const domainInfo = await client.queryDomain("example.com");
```

## ✨ Features

### 🌟 Current Support Status

|         | [Vercel](https://vercel.geoip0.com/) | [Netlify](https://netlify.geoip0.com/) | [Cloudflare Pages](https://cloudflare.geoip0.com/) |
| ------- | ------------------------------------ | -------------------------------------- | -------------------------------------------------- |
| Headers | ✅                                   | ✅                                     | ✅                                                 |
| IP      | ✅                                   | ✅                                     | ✅                                                 |
| GeoIP   | ✅                                   | ✅                                     | ✅                                                 |
| DNS     | ✅                                   | ✅                                     | 🚧                                                 |
| RDAP    | ✅                                   | ✅                                     | ✅                                                 |
| Whois   | ✅                                   | ✅                                     | 🚧                                                 |

Legend: ✅ = Supported, 🚧 = In Progress

### 🗺️ IP Geolocation Database Support

- 🔄 [GeoLite2](https://dev.maxmind.com/geoip/geolite2-free-geolocation-data/) (Coming Soon)
- ✅ [IP2Location Lite](https://lite.ip2location.com/)
- 🔄 [DBIP Lite](https://db-ip.com/db/lite.php) (Coming Soon)

### 🌐 RDAP Features

- ✅ Domain name lookups (including IDN support)
- ✅ IP address lookups (IPv4 and IPv6)
- ✅ ASN lookups
- ✅ Nameserver lookups
- ✅ Entity lookups
- ✅ Bootstrap data management
- ✅ Secure access support
- ✅ Pagination support

## 🚀 Quick Start

### 📋 Prerequisites

- 📦 Node.js 18+
- 🔧 PNPM 9+
- 🗄️ PostgreSQL (optional, for IP2Location database)

### ⚡️ Installation

1. Clone the repository

```bash
git clone https://github.com/geoip0/geoip0.git
cd geoip0
```

2. Install dependencies

```bash
pnpm install
```

3. Configure environment variables

```bash
cp .env.example .env
```

4. Start development server

```bash
pnpm dev
```

5. Test the API

```bash
# Get IP information
curl http://localhost:3000/ip

# Get GeoIP information
curl http://localhost:3000/geoip

# Query RDAP information for a domain
curl http://localhost:3000/rdap/dns/example.com
```

## 💻 Development

### 📁 Project Structure

```
geoip0/
├── routes/           # API routes
├── utils/           # Utility functions
├── packages/        # Shared packages
│   ├── rdap/        # RDAP client implementation
│   └── ...          # Other packages
└── public/         # Static files
```

## 🗓️ Roadmap

### 🌱 Q1 2024

- ✅ Complete RDAP client implementation
- 🔄 Complete GeoLite2 database integration
- 🔄 Add DNS and Whois support for Cloudflare Pages
- 🔄 Implement rate limiting
- 🔄 Add comprehensive test coverage

### 🌿 Q2 2024

- 🔄 Add DBIP Lite database support
- 🔄 Implement API versioning
- 🔄 Add performance monitoring
- 🔄 Create client SDKs
- 🔄 Enhance RDAP client with caching support

### 🌳 Q3 2024

- 🔄 Add ASN and ISP information
- 🔄 Implement IPv6 to IPv4 mapping
- 🔄 Enhance caching strategy
- 🔄 Add API authentication
- 🔄 Add RDAP bulk query support

### 🎯 Q4 2024

- 🔄 Add more geolocation data sources
- 🔄 Implement advanced analytics
- 🔄 Create developer dashboard
- 🔄 Enhance documentation
- 🔄 Add RDAP historical data support

## 🤝 Contributing

We welcome contributions! Please read our [Contributing Guide](CONTRIBUTING.md) for details.

## 📄 License

[MIT](LICENSE) © [Demo Macro](https://imst.xyz/)
