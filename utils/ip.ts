import { IPTools } from "ip2location-nodejs";

export function getIPVersion(ip: string) {
  const ipTools = new IPTools();

  if (ipTools.isIPV4(ip) || ipTools.cidrToIPV4(ip)) {
    return "ipv4";
  }
  if (ipTools.isIPV6(ip) || ipTools.cidrToIPV6(ip)) {
    return "ipv6";
  }
  return null;
}
