export type PresetKey =
  | "RECT_BASIC"
  | "RECT_RAIL_3SIDES"
  | "RECT_RAIL_STAIRS"
  | "RECT_45CORNERS_RAIL_STAIRS"
  | "CURVED_RAIL";

export function getPresetSkuSuggestions(_p: PresetKey) {
  return ["TREX-TRANS-20", "DF-2X8-16", "ASD-POST"];
}
export function filterExistingSkus(s: string[], _i: any[]) { return s; }
export function formatSuggestionHint(s: string[], missing: number) {
  return `${s.length} preset SKUs • ${missing} missing prices`;
}
