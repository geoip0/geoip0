export default defineEventHandler((event) => {
  try {
    return useGeoIPVercel(event);
  } catch (error) {
    return useGeoIP2Location(event);
  }
});
