import React from "react";
import DeckPresetsTile from "./components/DeckPresetsTile";

export default function App() {
  return (
    <div style={{ padding: 20, fontFamily: "system-ui" }}>
      <h1>Big Bad Builder Lite</h1>
      <DeckPresetsTile value="RECT_BASIC" onChange={() => {}} />
    </div>
  );
}
