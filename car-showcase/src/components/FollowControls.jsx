import { OrbitControls } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";

export default function FollowControls({ carState }) {
  const ref = useRef();
  const { camera } = useThree();
  const baseFov = 45;

  useFrame((_, dt) => {
    const s = carState?.current;
    if (!ref.current || !s) return;

    const forward = new THREE.Vector3(Math.sin(s.heading), 0, Math.cos(s.heading));
    const look = new THREE.Vector3(
      s.pos.x + forward.x * Math.min(4, s.speed * 0.12),
      s.pos.y + 0.8,
      s.pos.z + forward.z * Math.min(4, s.speed * 0.12)
    );
    ref.current.target.lerp(look, 1 - Math.pow(0.0001, Math.min(dt, 0.05)));
    ref.current.update();

    const targetFov = baseFov + Math.min(12, Math.abs(s.speed) * 0.35);
    camera.fov += (targetFov - camera.fov) * Math.min(1, dt * 4);
    camera.updateProjectionMatrix();
  });

  return (
    <OrbitControls
      ref={ref}
      makeDefault
      target={[0, 0.8, 0]}
      minDistance={4}
      maxDistance={22}
      maxPolarAngle={Math.PI / 2 - 0.05}
      enableDamping
      dampingFactor={0.08}
      enablePan={false}
    />
  );
}