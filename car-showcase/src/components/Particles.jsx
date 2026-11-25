import { Sparkles } from "@react-three/drei";

export default function Particles() {
  return (
    <>
      <Sparkles
        count={60}
        scale={[22, 10, 22]}
        position={[0, 5, 0]}
        size={2.5}
        speed={0.3}
        color="#ff3cac"
      />
      <Sparkles
        count={40}
        scale={[18, 8, 18]}
        position={[0, 4, 0]}
        size={2}
        speed={0.2}
        color="#3498db"
      />
    </>
  );
}