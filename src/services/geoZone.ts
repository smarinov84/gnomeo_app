// Minimal helper to suggest a horticulture zone string from lat/lon.
// Rationale:
// - Placeholder heuristic keeps UX flowing while we finalize licensed datasets.
// - Explicit comment signals this must be replaced with a real lookup before launch.
// Future: integrate with public zone polygons + reverse geocoding and cache the result.

export async function suggestZoneFromLocation({ lat, lon }: { lat: number; lon: number }): Promise<string | undefined> {
  // Placeholder heuristic:
  // - Very rough latitude bands just to provide an editable suggestion.
  // NOTE: This is NOT accurate. Users can edit the field.
  if (Number.isFinite(lat)) {
    if (lat > 50) return 'USDA 3-4 (approx)';
    if (lat > 45) return 'USDA 4-5 (approx)';
    if (lat > 40) return 'USDA 5-6 (approx)';
    if (lat > 35) return 'USDA 6-7 (approx)';
    if (lat > 30) return 'USDA 7-8 (approx)';
    if (lat > 25) return 'USDA 8-9 (approx)';
    return 'USDA 9-10 (approx)';
  }
  return undefined;
}

// Future: replace with a real lookup using public datasets and caching.
// Example approach (pseudocode):
// 1) Reverse geocode city/region via Open-Meteo/Nominatim
// 2) Intersect lat/lon with USDA zone polygons (US) or region-specific systems
// 3) Return zone code like "8b" with provenance.

