export default defineEventHandler((event) => {
  const { header } = event.context.params;

  const headers = getHeaders(event);

  return header ? { [header]: headers[header] } : headers;
});
