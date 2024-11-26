export default defineEventHandler((event) => {
  return {
    ip: getRequestIP(event, {
      xForwardedFor: true,
    }),
  };
});
