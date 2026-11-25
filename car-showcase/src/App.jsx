import { useState } from "react";
import { Canvas } from "@react-three/fiber";
import { Environment } from "@react-three/drei";
import Scene from "./components/Scene";
import Overlay from "./ui/Overlay";
import ColorOptions from "./ui/ColorOptions";
import Loader from "./ui/Loader";
import { envs } from "./data";

const resetBtn = {
  position: "absolute",
  bottom: 24,
  right: 24,
  zIndex: 10,
  padding: "10px 18px",
  borderRadius: 8,
  border: "1px solid rgba(255,255,255,0.3)",
  background: "rgba(0,0,0,0.45)",
  color: "#fff",
  fontFamily: "sans-serif",
  cursor: "pointer",
  backdropFilter: "blur(6px)",
};

export default function App() {
  const [carColor, setCarColor] = useState("#e74c3c");
  const [resetSignal, setResetSignal] = useState(0);
  const env = envs[0];

  return (
    <div style={{ width: "100vw", height: "100vh", position: "relative" }}>
      <Canvas shadows dpr={[1, 1.5]} camera={{ position: [6, 2.5, 7], fov: 45 }}>
        <Environment preset="city" background={true} intensity={1} />
        <Scene index={0} carColor={carColor} resetSignal={resetSignal} />
      </Canvas>
      <Loader />
      <Overlay title={env.name} />
      <ColorOptions carColor={carColor} setCarColor={setCarColor} />
      <button style={resetBtn} onClick={() => setResetSignal((s) => s + 1)}>
        Reset View
      </button>
    </div>
  );
}