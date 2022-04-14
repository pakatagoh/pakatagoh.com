export const getHostByHostname = (hostname?: string) => {
  if (!hostname) return;

  return hostname === "localhost"
    ? "http://localhost:3000"
    : `https://${hostname}`;
};
