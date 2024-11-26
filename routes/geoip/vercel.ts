export default defineEventHandler((event) => {
  try {
    return getGeoIPVercel(event);
  } catch (error) {
    return getGeoIP2Location(event);
  }
});
