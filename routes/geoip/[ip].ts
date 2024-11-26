export default defineEventHandler((event) => {
  const { ip } = event.context.params;

  return getGeoIP2Location(event, ip);
});
