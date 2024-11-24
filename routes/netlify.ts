export default defineEventHandler((event) => {
  try {
    return useGeoIPNetlify(event);
  } catch (error) {
    return useGeoIP2Location(event);
  }
});
