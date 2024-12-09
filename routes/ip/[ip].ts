export default defineEventHandler((event) => {
  const ip =
    getRouterParam(event, "ip") ||
    getRequestIP(event, {
      xForwardedFor: true,
    });

  return {
    type: getIPVersion(ip),
    ip,
  };
});
