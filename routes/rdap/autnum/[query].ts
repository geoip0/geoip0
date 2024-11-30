import { getRdapData } from "rdap";

export default defineEventHandler(async (event) => {
  const { query } = event.context.params;

  return (await getRdapData("asn", query)) || rdapErrorNotice;
});
