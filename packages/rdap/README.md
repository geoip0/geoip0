# rdap

![npm version](https://img.shields.io/npm/v/rdap)
![npm downloads](https://img.shields.io/npm/dw/rdap)
![npm license](https://img.shields.io/npm/l/rdap)
[![Contributor Covenant](https://img.shields.io/badge/Contributor%20Covenant-2.1-4baaaa.svg)](https://www.contributor-covenant.org/version/2/1/code_of_conduct/)

> Programmatically obtaining rdap query results.

## Getting started

```bash
# npm
$ npm install rdap

# yarn
$ yarn add rdap

# pnpm
$ pnpm add rdap
```

## Usage

```ts
import { getRdapData } from "rdap";

const ipv4Data = await getRdapData("ip", "1.1.1.1");

const ipv6Data = await getRdapData("ip", "2606:4700:4700::1111");

const cidrData = await getRdapData("ip", "1.0.0.0/8");

const asnData = await getRdapData("asn", "13335");

const domainData = await getRdapData("domain", "geoip0.com");
```

## Interfaces

See it on [JSDoc](https://www.jsdocs.io/package/rdap).

## License

- [MIT](LICENSE) &copy; [Demo Macro](https://imst.xyz/)
