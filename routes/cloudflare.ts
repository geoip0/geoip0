export default defineEventHandler((event) => {
  try {
    return useGeoIPCloudflare(event);
  } catch (error) {
    return useGeoIP2Location(event);
  }
});
