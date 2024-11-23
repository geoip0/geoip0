export default defineEventHandler((event) => {
  const { ip } = event.context.params;

  return useGeoIP2Location(event, ip);
});
