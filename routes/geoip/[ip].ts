export default defineEventHandler((event) => {
  const ip = getRouterParam(event, "ip");

  return ip ? getGeoIP2Location(event, ip) : getGeoIP2Location(event);
});
