import { useState } from "react";
import { Canvas } from "@react-three/fiber";
import Scene from "./components/Scene";
import Car from "./components/Car";
import Overlay from "./ui/Overlay";
import { envs } from "./data";

export default function App() {
  const [index, setIndex] = useState(0);
  const next = () => setIndex((i) => (i + 1) % envs.length);
  const prev = () => setIndex((i) => (i - 1 + envs.length) % envs.length);

  const env = envs[index];

  return (
    <div style={{ width: "100vw", height: "100vh", position: "relative" }}>
      <Canvas shadows dpr={[1, 1.5]} camera={{ position: [6, 2.5, 7], fov: 45 }}>
        <color attach="background" args={[env.sky]} />
        <fog color={env.sky} near={15} far={60} />
        <Scene index={index} />
        <Car />
      </Canvas>
      <Overlay title={env.name} onPrev={prev} onNext={next} />
    </div>
  );
}
