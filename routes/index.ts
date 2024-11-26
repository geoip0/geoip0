export default defineEventHandler((event) => {
  return {
    status: getResponseStatus(event),
    message: "Please visit https://www.geoip0.com/ for more information.",
  };
});
