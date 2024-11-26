export default defineEventHandler((event) => {
  try {
    return getGeoIPNetlify(event);
  } catch (error) {
    return getGeoIP2Location(event);
  }
});
