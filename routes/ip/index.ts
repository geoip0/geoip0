export default defineEventHandler((event) => {
  return {
    type: "default",
    ip: getRequestIP(event, {
      xForwardedFor: true,
    }),
  };
});
