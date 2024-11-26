export default defineEventHandler((event) => {
  return getGeoIP2Location(event);
});
