import { getRdapData } from "rdap";

export default defineEventHandler(async (event) => {
  const { pathname } = getRequestURL(event);

  const segments = pathname.split("/");

  const query = segments[4] ? `${segments[3]}/${segments[4]}` : segments[3];

  const version = getIPVersion(query);

  if (version === "IPv4") return await getRdapData("ipv4", query);

  if (version === "IPv6") return await getRdapData("ipv6", query);

  return rdapErrorNotice;
});
