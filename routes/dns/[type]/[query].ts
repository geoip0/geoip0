import { resolve } from "node:dns/promises";

export default defineEventHandler(async (event) => {
  const type = getRouterParam(event, "type");
  const query = getRouterParam(event, "query");

  try {
    const records = await resolve(
      query as string,
      (type as string).toUpperCase()
    );

    if (records) {
      return records;
    }
  } catch (error) {
    return {
      status: getResponseStatus(event),
      message: "Please visit https://www.geoip0.com/ for more information.",
    };
  }
});
