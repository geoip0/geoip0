export default defineEventHandler((event) => {
  const ip = getRequestIP(event, {
    xForwardedFor: true,
  });

  return {
    type: getIPVersion(ip),
    ip,
  };
});
