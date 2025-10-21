import React from "react";
import type { PresetKey } from "../modules/estimator/presetSkuSuggest";
import {
  getPresetSkuSuggestions,
  filterExistingSkus,
  formatSuggestionHint
} from "../modules/estimator/presetSkuSuggest";
import { setSkuDraft } from "../modules/estimator/skuMapDraftStore";
import { usePrices } from "../modules/estimator/priceStore";

export type PresetParams = {
  length_ft: number; width_ft: number;
  railSides: 0|1|2|3;
  stairsWidth_ft: number; stairsRise_in: number;
};

export default function DeckPresetsTile({ value, onChange }:{
  value: PresetKey; onChange: (p: Partial<PresetParams> & { preset: PresetKey }) => void
}) {
  const { items } = usePrices();
  const [preset, setPreset] = React.useState<PresetKey>(value);
  const [params, setParams] = React.useState<PresetParams>({
    length_ft: 20, width_ft: 12, railSides: 2, stairsWidth_ft: 4, stairsRise_in: 36
  });

  const suggestions = getPresetSkuSuggestions(preset);
  const existing = filterExistingSkus(suggestions, items);
  const missingCount = suggestions.length - existing.length;
  const hint = formatSuggestionHint(suggestions, missingCount);

  function apply() {
    setSkuDraft(existing);
    document.getElementById("sku-map-tile")?.scrollIntoView({ behavior: "smooth" });
  }

  React.useEffect(() => {
    onChange({ preset, ...params });
  }, [preset, params.length_ft, params.width_ft, params.railSides, params.stairsWidth_ft, params.stairsRise_in]);

  return (
    <div style={{ border: "1px solid #ddd", borderRadius: 12, padding: 12, fontSize: 12 }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
        <div style={{ fontWeight: 600 }}>Deck Presets</div>
        <button
          disabled={existing.length === 0}
          onClick={apply}
          title={missingCount>0?"Some SKUs not in catalog yet":"Apply preset SKUs"}
          style={{ background: "#111", color: "#fff", borderRadius: 6, padding: "4px 8px", opacity: existing.length===0?0.4:1 }}
        >
          Apply SKUs
        </button>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
        <label style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span>Preset</span>
          <select value={preset} onChange={e=>setPreset(e.target.value as PresetKey)} style={{ padding: "4px 8px" }}>
            <option value="RECT_BASIC">Rectangle – basic</option>
            <option value="RECT_RAIL_3SIDES">Rectangle – rail on 3 sides</option>
            <option value="RECT_RAIL_STAIRS">Rectangle – rail + stairs</option>
            <option value="RECT_45CORNERS_RAIL_STAIRS">45° corners – rail + stairs</option>
            <option value="CURVED_RAIL">Curved rail (segmented)</option>
          </select>
        </label>

        <div style={{ gridColumn: "1 / span 2", color: "#666", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
          {hint}
        </div>

        <label style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span>Length (ft)</span>
          <input type="number" min={4} step={1} value={params.length_ft}
            onChange={e=>setParams(p=>({ ...p, length_ft: Math.max(4, Number(e.target.value)||0) }))}
            style={{ width: 80, textAlign: "right", padding: "4px 8px" }} />
        </label>

        <label style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span>Width (ft)</span>
          <input type="number" min={4} step={1} value={params.width_ft}
            onChange={e=>setParams(p=>({ ...p, width_ft: Math.max(4, Number(e.target.value)||0) }))}
            style={{ width: 80, textAlign: "right", padding: "4px 8px" }} />
        </label>

        <label style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span>Rail sides</span>
          <select value={params.railSides}
            onChange={e=>setParams(p=>({ ...p, railSides: Number(e.target.value) as any }))}
            style={{ padding: "4px 8px" }}>
            <option value={0}>None</option>
            <option value={1}>One side</option>
            <option value={2}>Two sides</option>
            <option value={3}>Three sides</option>
          </select>
        </label>

        <label style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span>Stairs width (ft)</span>
          <input type="number" min={2} step={0.5} value={params.stairsWidth_ft}
            onChange={e=>setParams(p=>({ ...p, stairsWidth_ft: Math.max(2, Number(e.target.value)||0) }))}
            style={{ width: 80, textAlign: "right", padding: "4px 8px" }} />
        </label>

        <label style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span>Stairs rise (in)</span>
          <input type="number" min={1} step={1} value={params.stairsRise_in}
            onChange={e=>setParams(p=>({ ...p, stairsRise_in: Math.max(1, Number(e.target.value)||0) }))}
            style={{ width: 80, textAlign: "right", padding: "4px 8px" }} />
        </label>
      </div>
    </div>
  );
}
