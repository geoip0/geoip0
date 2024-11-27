import whoiser from "whoiser";

export default defineEventHandler((event) => {
  const { q } = getQuery(event);

  return q
    ? whoiser(q as string)
    : {
        status: getResponseStatus(event),
        message: "Please visit https://www.geoip0.com/ for more information.",
      };
});
