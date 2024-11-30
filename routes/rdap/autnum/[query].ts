import { getRdapData } from "rdap";

export default defineCachedEventHandler(async (event) => {
  const { query } = event.context.params;

  return (await getRdapData("asn", query)) || rdapErrorNotice;
});
