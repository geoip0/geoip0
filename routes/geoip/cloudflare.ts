export default defineEventHandler((event) => {
  try {
    return getGeoIPCloudflare(event);
  } catch (error) {
    return getGeoIP2Location(event);
  }
});
