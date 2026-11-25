import { Canvas } from "@react-three/fiber";
import { Environment } from "@react-three/drei";
import Scene from "./components/Scene";
import Overlay from "./ui/Overlay";
import { envs } from "./data";

export default function App() {
  const env = envs[0];

  return (
    <div style={{ width: "100vw", height: "100vh", position: "relative" }}>
      <Canvas shadows dpr={[1, 1.5]} camera={{ position: [6, 2.5, 7], fov: 45 }}>
        <Environment
          preset="city"
          background={true}
          intensity={1}
        />
        <Scene index={0} />
      </Canvas>
      <Overlay title={env.name} />
    </div>
  );
}
