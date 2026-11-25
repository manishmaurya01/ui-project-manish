import { OrbitControls } from "@react-three/drei";

export default function CameraControls() {
  return (
    <OrbitControls
      makeDefault
      target={[0, 0.8, 0]}
      minDistance={4}
      maxDistance={14}
      maxPolarAngle={Math.PI / 2 - 0.05}
      enableDamping
    />
  );
}