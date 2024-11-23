import { provider, runtime } from "std-env";

export default defineEventHandler((event) => {
  if (provider === "vercel" || runtime === "edge-light") {
    return useGeoIPVercel(event);
  }

  if (provider === "netlify" || runtime === "netlify") {
    return useGeoIPNetlify(event);
  }

  if (provider === "cloudflare_pages" || runtime === "workerd") {
    return useGeoIPCloudflare(event);
  }

  return useGeoIP2Location(event);
});
