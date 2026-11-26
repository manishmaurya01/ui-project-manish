import { useState } from "react";
import { Canvas } from "@react-three/fiber";
import { Environment } from "@react-three/drei";
import Scene from "./components/Scene";
import Overlay from "./ui/Overlay";
import ColorOptions from "./ui/ColorOptions";
import Loader from "./ui/Loader";
import { envs, cars } from "./data";

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

const driveBtn = {
  ...resetBtn,
  right: 130,
  background: "linear-gradient(90deg,#ff3cac,#3498db)",
  border: "none",
  fontWeight: 700,
};

const panel = {
  position: "absolute",
  top: 20,
  right: 20,
  zIndex: 10,
  display: "flex",
  flexDirection: "column",
  gap: 8,
  padding: 14,
  borderRadius: 12,
  background: "rgba(0,0,0,0.45)",
  backdropFilter: "blur(6px)",
};

const toggleRow = {
  display: "flex",
  alignItems: "center",
  gap: 10,
  color: "#fff",
  fontFamily: "sans-serif",
  fontSize: 14,
  cursor: "pointer",
  userSelect: "none",
};

const navWrap = {
  position: "absolute",
  bottom: 88,
  left: "50%",
  transform: "translateX(-50%)",
  zIndex: 10,
  display: "flex",
  alignItems: "center",
  gap: 18,
};

const navBtn = {
  width: 44,
  height: 44,
  borderRadius: "50%",
  border: "1px solid rgba(255,255,255,0.3)",
  background: "rgba(0,0,0,0.5)",
  color: "#fff",
  fontSize: 20,
  cursor: "pointer",
  backdropFilter: "blur(6px)",
};

const carName = {
  color: "#fff",
  fontFamily: "sans-serif",
  fontWeight: 700,
  fontSize: 18,
  letterSpacing: 1,
  minWidth: 140,
  textAlign: "center",
  textShadow: "0 0 10px rgba(255,60,172,0.7)",
};

const helpText = {
  position: "absolute",
  bottom: 24,
  left: "50%",
  transform: "translateX(-50%)",
  zIndex: 10,
  padding: "8px 16px",
  borderRadius: 8,
  background: "rgba(0,0,0,0.5)",
  color: "#fff",
  fontFamily: "sans-serif",
  fontSize: 14,
  letterSpacing: 1,
  backdropFilter: "blur(6px)",
};

const TOGGLES = [
  { key: "rotate", label: "Auto-Rotate" },
  { key: "beams", label: "Light Beams" },
  { key: "particles", label: "Particles" },
  { key: "hotspots", label: "Hotspots" },
];

export default function App() {
  const [carColor, setCarColor] = useState("#e74c3c");
  const [carIndex, setCarIndex] = useState(0);
  const [resetSignal, setResetSignal] = useState(0);
  const [driveMode, setDriveMode] = useState(false);
  const [options, setOptions] = useState({
    rotate: true,
    beams: true,
    particles: true,
    hotspots: false,
  });
  const env = envs[0];
  const car = cars[carIndex];

  const toggle = (key) =>
    setOptions((o) => ({ ...o, [key]: !o[key] }));

  const prevCar = () =>
    setCarIndex((i) => (i - 1 + cars.length) % cars.length);
  const nextCar = () =>
    setCarIndex((i) => (i + 1) % cars.length);

  return (
    <div style={{ width: "100vw", height: "100vh", position: "relative" }}>
      <Canvas shadows dpr={[1, 1.5]} camera={{ position: [6, 2.5, 7], fov: 45 }}>
        <Environment preset="city" background={true} intensity={1} />
        <Scene
          index={0}
          carColor={carColor}
          carModel={car.model}
          resetSignal={resetSignal}
          options={options}
          drive={driveMode}
        />
      </Canvas>
      <Loader />
      {!driveMode && <Overlay title={env.name} />}
      <ColorOptions carColor={carColor} setCarColor={setCarColor} />
      {!driveMode && (
        <div style={navWrap}>
          <button style={navBtn} onClick={prevCar} aria-label="Previous car">
            ‹
          </button>
          <span style={carName}>{car.name}</span>
          <button style={navBtn} onClick={nextCar} aria-label="Next car">
            ›
          </button>
        </div>
      )}
      {driveMode ? (
        <>
          <div style={helpText}>W / S — Forward / Back · A / D — Steer · Drag / Scroll — Camera</div>
          <button style={driveBtn} onClick={() => setDriveMode(false)}>
            Exit Test Drive
          </button>
        </>
      ) : (
        <button style={driveBtn} onClick={() => setDriveMode(true)}>
          Test Drive
        </button>
      )}
      {!driveMode && (
        <>
          <button style={resetBtn} onClick={() => setResetSignal((s) => s + 1)}>
            Reset View
          </button>
          <div style={panel}>
            {TOGGLES.map((t) => (
              <label key={t.key} style={toggleRow}>
                <input
                  type="checkbox"
                  checked={options[t.key]}
                  onChange={() => toggle(t.key)}
                />
                {t.label}
              </label>
            ))}
          </div>
        </>
      )}
    </div>
  );
}