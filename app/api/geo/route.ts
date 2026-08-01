export const runtime = "edge";

/**
 * Coarse, privacy-conscious location for the anonymous feedback box.
 * Reads Vercel's own edge geolocation headers (populated automatically on
 * every request routed through Vercel, no third-party lookup, no IP ever
 * stored) and returns a country, or "City, Country" when available.
 * Returns { place: null } in local dev, where these headers don't exist.
 */
export async function GET(request: Request) {
  const country = request.headers.get("x-vercel-ip-country");
  const cityRaw = request.headers.get("x-vercel-ip-city");

  if (!country) {
    return Response.json({ place: null });
  }

  let countryName = country;
  try {
    countryName = new Intl.DisplayNames(["en"], { type: "region" }).of(country) ?? country;
  } catch {
    // Fall back to the raw ISO code if Intl.DisplayNames isn't available.
  }

  const city = cityRaw ? decodeURIComponent(cityRaw) : null;
  const place = city ? `${city}, ${countryName}` : countryName;

  return Response.json({ place });
}
