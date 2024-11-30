export function getIPVersion(ip) {
  const ipv4Regex =
    /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
  const ipv6Regex = /^([0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}$/;

  const ipv4CidrRegex =
    /^((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)(\/(\d|[1-2]\d|3[0-2]))$/;
  const ipv6CidrRegex =
    /^([0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}(\/(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))$/;

  if (ipv4Regex.test(ip) || ipv4CidrRegex.test(ip)) {
    return "IPv4";
  }
  if (ipv6Regex.test(ip) || ipv6CidrRegex.test(ip)) {
    return "IPv6";
  }
  return "Invalid IP address";
}
