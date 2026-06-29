// Lazily loads the Google Maps JS API (Places library) once, using the public
// key in NEXT_PUBLIC_GOOGLE_MAPS_API_KEY. Resolves false (no-op) when no key is
// configured, so address fields keep working as plain inputs.
//
// Uses the NEW Places API (PlaceAutocompleteElement) — the legacy
// Autocomplete widget is not available to Google Cloud projects created after
// March 1, 2025.

let loadPromise: Promise<boolean> | null = null;

export function loadGoogleMaps(): Promise<boolean> {
  if (typeof window === "undefined") return Promise.resolve(false);

  const key = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
  if (!key) return Promise.resolve(false);

  const w = window as unknown as { google?: { maps?: { places?: unknown } } };
  if (w.google?.maps?.places) return Promise.resolve(true);

  if (loadPromise) return loadPromise;

  loadPromise = new Promise<boolean>((resolve) => {
    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?key=${encodeURIComponent(
      key,
    )}&libraries=places&loading=async`;
    script.async = true;
    script.defer = true;
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.head.appendChild(script);
  });
  return loadPromise;
}

export type ParsedAddress = {
  line1: string;
  city: string;
  state: string;
  zip: string;
};

// New Places API address component shape.
type PlaceAddressComponent = {
  longText?: string | null;
  shortText?: string | null;
  types: string[];
};

/** Parse a Place's (new API) addressComponents into our address shape. */
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
