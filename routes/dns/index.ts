import { resolve } from "node:dns";

export default defineEventHandler((event) => {
  const { q } = getQuery(event);

  return q
    ? resolve(q as string, (err, address) => (err ? err : address))
    : {
        status: getResponseStatus(event),
        message: "Please visit https://www.geoip0.com/ for more information.",
      };
});
