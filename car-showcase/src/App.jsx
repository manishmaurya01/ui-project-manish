import { useState } from "react";
import { Canvas } from "@react-three/fiber";
import { Environment } from "@react-three/drei";
import Scene from "./components/Scene";
import Overlay from "./ui/Overlay";
import ColorOptions from "./ui/ColorOptions";
import { envs } from "./data";

export default function App() {
  const [carColor, setCarColor] = useState("#e74c3c");
  const env = envs[0];

  return (
    <div style={{ width: "100vw", height: "100vh", position: "relative" }}>
      <Canvas shadows dpr={[1, 1.5]} camera={{ position: [6, 2.5, 7], fov: 45 }}>
        <Environment preset="city" background={true} intensity={1} />
        <Scene index={0} carColor={carColor} />
      </Canvas>
      <Overlay title={env.name} />
      <ColorOptions carColor={carColor} setCarColor={setCarColor} />
    </div>
  );
}
