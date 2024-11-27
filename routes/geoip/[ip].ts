export default defineEventHandler((event) => {
  const { ip } = event.context.params;

  return ip ? getGeoIP2Location(event, ip) : getGeoIP2Location(event);
});
