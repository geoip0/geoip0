import whoiser from "whoiser";

export default defineEventHandler(async (event) => {
  const query = getRouterParam(event, "query");

  return await whoiser(query);
});
