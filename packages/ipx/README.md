# @geoip0/ipx 🔍

A powerful and efficient IP address manipulation library.

## ✨ Features

- 🌐 Complete IP address manipulation
  - 📍 IPv4 and IPv6 support
  - 🔢 CIDR range operations
  - ✅ IP address validation
  - 🎯 Network mask calculations
  - 🔄 Binary and numeric conversions
  - 🏷️ IP address type detection (private, loopback, multicast)
  - ➕ IP address arithmetic
- 🚀 Zero dependencies
- 📝 TypeScript support
- 🛡️ Comprehensive error handling
- ⚡️ High performance bitwise operations
- 📦 Modern ESM and CJS support

## 📥 Installation

```bash
# Using npm
npm install @geoip0/ipx

# Using yarn
yarn add @geoip0/ipx

# Using pnpm
pnpm add @geoip0/ipx
```

## 🚀 Basic Usage

```typescript
import { IP } from "@geoip0/ipx";

// IP address parsing and validation
const addr = IP.parse("192.168.0.1");
console.log(addr.version()); // 4
console.log(addr.toBinary()); // '11000000101010000000000000000001'
console.log(addr.isPrivate()); // true
console.log(addr.next().toString()); // '192.168.0.2'
console.log(addr.prev().toString()); // '192.168.0.0'

// IP address validation
console.log(IP.isValid("192.168.0.1")); // true
console.log(IP.isValid("not an ip")); // false
console.log(IP.isIPv4("192.168.0.1")); // true
console.log(IP.isIPv6("2001:db8::")); // true

// CIDR range operations
const range = IP.range("192.168.0.0/24");
console.log(range.contains("192.168.0.1")); // true
console.log(range.contains("192.168.1.1")); // false
console.log(range.first()); // '192.168.0.0'
console.log(range.last()); // '192.168.0.255'
console.log(range.mask()); // '255.255.255.0'
console.log(range.prefixLength()); // 24
console.log(range.size()); // 256
```

## 🔧 Advanced Usage

### 🌐 IPv6 Operations

```typescript
const ipv6Range = IP.range("2001:db8::/32");
console.log(ipv6Range.contains("2001:db8::1")); // true
console.log(ipv6Range.contains("2001:db9::1")); // false
console.log(ipv6Range.first()); // '2001:db8:0000:0000:0000:0000:0000:0000'
console.log(ipv6Range.last()); // '2001:db8:ffff:ffff:ffff:ffff:ffff:ffff'
```

### 🔄 Range Overlap Checking

```typescript
const range1 = IP.range("192.168.0.0/24");
const range2 = IP.range("192.168.0.128/25");
console.log(range1.overlaps(range2)); // true
```

## 📚 API Reference

### 🎯 IP Address Operations

#### `IP.parse(ip: string): IPAddress`

Parse an IP address string and return an `IPAddress` object.

#### `IP.isValid(ip: string): boolean`

Check if a string is a valid IP address (IPv4 or IPv6).

#### `IP.isIPv4(ip: string): boolean`

Check if a string is a valid IPv4 address.

#### `IP.isIPv6(ip: string): boolean`

Check if a string is a valid IPv6 address.

### 📋 IP Address Interface

The `IPAddress` interface provides the following methods:

- 🏠 `isPrivate(): boolean` - Check if this is a private address
- 🔄 `isLoopback(): boolean` - Check if this is a loopback address
- 📡 `isMulticast(): boolean` - Check if this is a multicast address
- ➡️ `next(): IPAddress` - Get the next IP address
- ⬅️ `prev(): IPAddress` - Get the previous IP address

### 🌐 CIDR Range Operations

#### `IP.range(cidr: string, options?: IPOptions): IPRange`

Create a new IP range from CIDR notation.

The `IPRange` interface provides the following methods:

- 🎯 `contains(ip: string): boolean` - Check if an IP address is in the range
- 🏁 `first(): string` - Get the first IP address in the range
- 🔚 `last(): string` - Get the last IP address in the range
- 🎭 `mask(): string` - Get the network mask
- 📏 `prefixLength(): number` - Get the network prefix length
- 📊 `size(): number | bigint` - Get the total number of addresses in the range
- 🔄 `overlaps(other: IPRange): boolean` - Check if this range overlaps with another
- 📍 `version(): 4 | 6` - Get the IP version

### 🧮 IP Address Calculations

```typescript
import { IP } from "@geoip0/ipx";

// Calculate subnet information
const network = IP.parse("192.168.1.0/24");
console.log(network.networkAddress()); // '192.168.1.0'
console.log(network.broadcastAddress()); // '192.168.1.255'
console.log(network.usableHostRange()); // ['192.168.1.1', '192.168.1.254']
console.log(network.usableHostCount()); // 254

// IP arithmetic
const ip = IP.parse("192.168.1.1");
console.log(ip.add(5).toString()); // '192.168.1.6'
console.log(ip.subtract(1).toString()); // '192.168.1.0'
console.log(ip.distanceTo("192.168.1.10")); // 9
```

### 🔍 Method Quick Reference

| Category        | Method               | Description               | Example                         |
| --------------- | -------------------- | ------------------------- | ------------------------------- |
| **Parsing**     | `IP.parse()`         | Parse IP address string   | `IP.parse('192.168.0.1')`       |
|                 | `IP.isValid()`       | Validate IP address       | `IP.isValid('192.168.0.1')`     |
|                 | `IP.isIPv4()`        | Check if IPv4             | `IP.isIPv4('192.168.0.1')`      |
|                 | `IP.isIPv6()`        | Check if IPv6             | `IP.isIPv6('2001:db8::')`       |
| **Properties**  | `version()`          | Get IP version            | `ip.version()` // 4 or 6        |
|                 | `toBinary()`         | Get binary representation | `ip.toBinary()`                 |
|                 | `toNumber()`         | Get numeric value         | `ip.toNumber()`                 |
| **Type Checks** | `isPrivate()`        | Check if private          | `ip.isPrivate()`                |
|                 | `isLoopback()`       | Check if loopback         | `ip.isLoopback()`               |
|                 | `isMulticast()`      | Check if multicast        | `ip.isMulticast()`              |
| **Arithmetic**  | `next()`             | Get next IP               | `ip.next()`                     |
|                 | `prev()`             | Get previous IP           | `ip.prev()`                     |
|                 | `add()`              | Add to IP                 | `ip.add(5)`                     |
|                 | `subtract()`         | Subtract from IP          | `ip.subtract(1)`                |
| **CIDR**        | `networkAddress()`   | Get network address       | `network.networkAddress()`      |
|                 | `broadcastAddress()` | Get broadcast address     | `network.broadcastAddress()`    |
|                 | `contains()`         | Check if IP in range      | `range.contains('192.168.0.1')` |

## ⚠️ Error Handling

The library throws descriptive errors for:

- 🚫 Invalid IP address format
- 📏 Invalid prefix length (must be 0-32 for IPv4, 0-128 for IPv6)
- ❌ Mismatched IP version
- 🚫 Invalid CIDR notation

## 🤝 Contributing

Contributions are welcome! Please read our [Contributing Guide](../../CONTRIBUTING.md) for details.

## 📄 License

[MIT](LICENSE) © [Demo Macro](https://imst.xyz/)
