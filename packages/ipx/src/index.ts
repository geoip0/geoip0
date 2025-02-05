/**
 * IPX - A powerful and efficient IP address manipulation library
 */

/**
 * Convert IPv4 address to 32-bit number
 */
function ipv4ToInt(ip: string): number {
  return (
    ip
      .split(".")
      .reduce((int, oct) => (int << 8) + Number.parseInt(oct, 10), 0) >>> 0
  );
}

/**
 * Convert IPv6 address to BigInt
 */
function ipv6ToBigInt(ip: string): bigint {
  return ip.split(":").reduce((int, hex) => {
    return (int << 16n) + BigInt(Number.parseInt(hex || "0", 16));
  }, 0n);
}

/**
 * Check if string is valid IPv4 address
 */
function isIPv4(ip: string): boolean {
  const parts = ip.split(".");
  return (
    parts.length === 4 &&
    parts.every((part) => {
      const num = Number.parseInt(part, 10);
      return num >= 0 && num <= 255 && part === num.toString();
    })
  );
}

/**
 * Check if string is valid IPv6 address
 */
function isIPv6(ip: string): boolean {
  const parts = ip.split(":");
  return (
    parts.length <= 8 &&
    parts.every((part) => {
      return /^[0-9A-Fa-f]{0,4}$/.test(part);
    })
  );
}

/**
 * Convert number to IPv4 address
 */
function intToIPv4(int: number): string {
  const octets = [];
  let num = int;
  for (let i = 3; i >= 0; i--) {
    octets[i] = (num & 255).toString();
    num = num >>> 8;
  }
  return octets.join(".");
}

/**
 * Convert BigInt to IPv6 address
 */
function bigIntToIPv6(int: bigint): string {
  const hex = int.toString(16).padStart(32, "0");
  const parts = [];
  for (let i = 0; i < 8; i++) {
    parts.push(hex.slice(i * 4, (i + 1) * 4));
  }
  return parts.join(":");
}

export interface IPOptions {
  /**
   * IP version (4 or 6)
   */
  version?: 4 | 6;
}

export interface IPRange {
  /**
   * Check if an IP address is contained in the range
   */
  contains(ip: string): boolean;

  /**
   * Get the first IP address in the range
   */
  first(): string;

  /**
   * Get the last IP address in the range
   */
  last(): string;

  /**
   * Get the network mask
   */
  mask(): string;

  /**
   * Get the network prefix length
   */
  prefixLength(): number;

  /**
   * Get the total number of addresses in the range
   */
  size(): number | bigint;

  /**
   * Check if this range overlaps with another range
   */
  overlaps(other: IPRange): boolean;

  /**
   * Get the IP version (4 or 6)
   */
  version(): 4 | 6;
}

class IPRangeImpl implements IPRange {
  private readonly cidr: string;
  private readonly _version: 4 | 6;
  private readonly prefix: number;
  private readonly start: number | bigint;
  private readonly end: number | bigint;

  constructor(cidr: string, options: IPOptions = {}) {
    this.cidr = cidr;
    const [ip, prefixStr] = cidr.split("/");

    // Determine IP version
    if (options.version) {
      this._version = options.version;
    } else {
      if (isIPv4(ip)) this._version = 4;
      else if (isIPv6(ip)) this._version = 6;
      else throw new Error("Invalid IP address");
    }

    // Parse prefix length
    this.prefix = Number.parseInt(prefixStr, 10);
    if (this._version === 4 && (this.prefix < 0 || this.prefix > 32)) {
      throw new Error("Invalid IPv4 prefix length");
    }
    if (this._version === 6 && (this.prefix < 0 || this.prefix > 128)) {
      throw new Error("Invalid IPv6 prefix length");
    }

    // Calculate start and end addresses
    if (this._version === 4) {
      const ipInt = ipv4ToInt(ip);
      const mask = ~((1 << (32 - this.prefix)) - 1) >>> 0;
      this.start = ipInt & mask;
      this.end = this.start + ((1 << (32 - this.prefix)) - 1);
    } else {
      const ipBigInt = ipv6ToBigInt(ip);
      const mask = ~((1n << BigInt(128 - this.prefix)) - 1n);
      this.start = ipBigInt & mask;
      this.end = this.start + ((1n << BigInt(128 - this.prefix)) - 1n);
    }
  }

  contains(ip: string): boolean {
    try {
      if (this._version === 4) {
        if (!isIPv4(ip)) return false;
        const ipInt = ipv4ToInt(ip);
        return ipInt >= this.start && ipInt <= this.end;
      }
      if (!isIPv6(ip)) return false;
      const ipBigInt = ipv6ToBigInt(ip);
      return ipBigInt >= this.start && ipBigInt <= this.end;
    } catch {
      return false;
    }
  }

  first(): string {
    if (this._version === 4) {
      return intToIPv4(this.start as number);
    }
    return bigIntToIPv6(this.start as bigint);
  }

  last(): string {
    if (this._version === 4) {
      return intToIPv4(this.end as number);
    }
    return bigIntToIPv6(this.end as bigint);
  }

  mask(): string {
    if (this._version === 4) {
      const mask = ~((1 << (32 - this.prefix)) - 1) >>> 0;
      return intToIPv4(mask);
    }
    const mask = ~((1n << BigInt(128 - this.prefix)) - 1n);
    return bigIntToIPv6(mask);
  }

  prefixLength(): number {
    return this.prefix;
  }

  size(): number | bigint {
    if (this._version === 4) {
      return (this.end as number) - (this.start as number) + 1;
    }
    return (this.end as bigint) - (this.start as bigint) + 1n;
  }

  overlaps(other: IPRange): boolean {
    if (this._version !== other.version()) return false;
    if (this._version === 4) {
      const otherImpl = other as IPRangeImpl;
      return (
        (this.start as number) <= (otherImpl.end as number) &&
        (this.end as number) >= (otherImpl.start as number)
      );
    }
    const otherImpl = other as IPRangeImpl;
    return (
      (this.start as bigint) <= (otherImpl.end as bigint) &&
      (this.end as bigint) >= (otherImpl.start as bigint)
    );
  }

  version(): 4 | 6 {
    return this._version;
  }
}

export interface IPAddress {
  /**
   * Get the IP version (4 or 6)
   */
  version(): 4 | 6;

  /**
   * Convert to string representation
   */
  toString(): string;

  /**
   * Convert to binary string
   */
  toBinary(): string;

  /**
   * Convert to numeric value
   */
  toNumber(): number | bigint;

  /**
   * Check if this is a private address
   */
  isPrivate(): boolean;

  /**
   * Check if this is a loopback address
   */
  isLoopback(): boolean;

  /**
   * Check if this is a multicast address
   */
  isMulticast(): boolean;

  /**
   * Get the next IP address
   */
  next(): IPAddress;

  /**
   * Get the previous IP address
   */
  prev(): IPAddress;
}

class IPv4Impl implements IPAddress {
  private readonly value: number;

  constructor(ip: string | number) {
    if (typeof ip === "string") {
      if (!isIPv4(ip)) throw new Error("Invalid IPv4 address");
      this.value = ipv4ToInt(ip);
    } else {
      this.value = ip >>> 0;
    }
  }

  version(): 4 | 6 {
    return 4;
  }

  toString(): string {
    return intToIPv4(this.value);
  }

  toBinary(): string {
    return this.value.toString(2).padStart(32, "0");
  }

  toNumber(): number {
    return this.value;
  }

  isPrivate(): boolean {
    return (
      (this.value >= ipv4ToInt("10.0.0.0") &&
        this.value <= ipv4ToInt("10.255.255.255")) ||
      (this.value >= ipv4ToInt("172.16.0.0") &&
        this.value <= ipv4ToInt("172.31.255.255")) ||
      (this.value >= ipv4ToInt("192.168.0.0") &&
        this.value <= ipv4ToInt("192.168.255.255"))
    );
  }

  isLoopback(): boolean {
    return (
      this.value >= ipv4ToInt("127.0.0.0") &&
      this.value <= ipv4ToInt("127.255.255.255")
    );
  }

  isMulticast(): boolean {
    return (
      this.value >= ipv4ToInt("224.0.0.0") &&
      this.value <= ipv4ToInt("239.255.255.255")
    );
  }

  next(): IPAddress {
    return new IPv4Impl(this.value + 1);
  }

  prev(): IPAddress {
    return new IPv4Impl(this.value - 1);
  }
}

class IPv6Impl implements IPAddress {
  private readonly value: bigint;

  constructor(ip: string | bigint) {
    if (typeof ip === "string") {
      if (!isIPv6(ip)) throw new Error("Invalid IPv6 address");
      this.value = ipv6ToBigInt(ip);
    } else {
      this.value = ip;
    }
  }

  version(): 4 | 6 {
    return 6;
  }

  toString(): string {
    return bigIntToIPv6(this.value);
  }

  toBinary(): string {
    return this.value.toString(2).padStart(128, "0");
  }

  toNumber(): bigint {
    return this.value;
  }

  isPrivate(): boolean {
    return (
      this.value >= ipv6ToBigInt("fc00::") &&
      this.value <= ipv6ToBigInt("fdff:ffff:ffff:ffff:ffff:ffff:ffff:ffff")
    );
  }

  isLoopback(): boolean {
    return this.value === ipv6ToBigInt("::1");
  }

  isMulticast(): boolean {
    return (
      this.value >= ipv6ToBigInt("ff00::") &&
      this.value <= ipv6ToBigInt("ffff:ffff:ffff:ffff:ffff:ffff:ffff:ffff")
    );
  }

  next(): IPAddress {
    return new IPv6Impl(this.value + 1n);
  }

  prev(): IPAddress {
    return new IPv6Impl(this.value - 1n);
  }
}

export const IP = {
  /**
   * Create a new IP range from CIDR notation
   */
  range(cidr: string, options?: IPOptions): IPRange {
    return new IPRangeImpl(cidr, options);
  },

  /**
   * Parse an IP address
   */
  parse(ip: string): IPAddress {
    if (isIPv4(ip)) return new IPv4Impl(ip);
    if (isIPv6(ip)) return new IPv6Impl(ip);
    throw new Error("Invalid IP address");
  },

  /**
   * Check if a string is a valid IP address
   */
  isValid(ip: string): boolean {
    return isIPv4(ip) || isIPv6(ip);
  },

  /**
   * Check if a string is a valid IPv4 address
   */
  isIPv4,

  /**
   * Check if a string is a valid IPv6 address
   */
  isIPv6,
};
