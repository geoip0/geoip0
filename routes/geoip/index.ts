import { provider, runtime } from "std-env";

export default defineEventHandler((event) => {
  const headers = getHeaders(event);

  if (provider === "vercel" || runtime === "edge-light") {
    return getGeoIPVercel(event);
  }

  if (provider === "netlify" || runtime === "netlify" || headers["x-nf-geo"]) {
    return getGeoIPNetlify(event);
  }

  if (provider === "cloudflare_pages" || runtime === "workerd") {
    return getGeoIPCloudflare(event);
  }

  return getGeoIP2Location(event);
});
