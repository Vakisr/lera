// Parses Google Places API (New) addressComponents into our address shape.
// Pure (no DOM / no key) so it can run server-side in the /api/places proxy.

export type ParsedAddress = {
  line1: string;
  city: string;
  state: string;
  zip: string;
};

type PlaceAddressComponent = {
  longText?: string | null;
  shortText?: string | null;
  types: string[];
};

export function parseAddressComponents(
  components: PlaceAddressComponent[] | undefined,
): ParsedAddress | null {
  if (!components || components.length === 0) return null;
  const get = (type: string) => components.find((c) => c.types.includes(type));

  const streetNumber = get("street_number")?.longText ?? "";
  const route = get("route")?.longText ?? "";
  const city =
    get("locality")?.longText ??
    get("postal_town")?.longText ??
    get("sublocality")?.longText ??
    get("sublocality_level_1")?.longText ??
    "";
  const state = get("administrative_area_level_1")?.shortText ?? "";
  const zip = get("postal_code")?.longText ?? "";

  return {
    line1: [streetNumber, route].filter(Boolean).join(" "),
    city,
    state,
    zip,
  };
}
