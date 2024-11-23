import { runtime } from "std-env";

export default defineEventHandler((event) => {
  switch (runtime) {
    case "edge-light":
      return useGeoIPVercel(event);
    case "netlify":
      return useGeoIPNetlify(event);
    case "workerd":
      return useGeoIPCloudflare(event);
    default:
      return useGeoIP2Location(event);
  }
});
