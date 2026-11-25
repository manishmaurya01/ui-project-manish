import { useGLTF, Html } from "@react-three/drei";
import * as THREE from "three";

const TARGET_SIZE = 22;

export default function Showroom({ position = [0, 0, 0], name }) {
  const { scene } = useGLTF("/car_showroom.glb");

  const box = new THREE.Box3().setFromObject(scene);
  const size = box.getSize(new THREE.Vector3());
  const center = box.getCenter(new THREE.Vector3());
  const bottom = center.y - size.y / 2;

  const maxDim = Math.max(size.x, size.y, size.z);
  const scale = TARGET_SIZE / maxDim;

  return (
    <group
      position={[
        position[0] - center.x * scale,
        position[1] - bottom * scale,
        position[2] - center.z * scale,
      ]}
      scale={[scale, scale, scale]}
    >
      <primitive object={scene} castShadow receiveShadow />
      {name && (
        <Html
          position={[center.x, center.y + size.y / 2 + 2 / scale, center.z]}
          center
          distanceFactor={18}
          style={{ pointerEvents: "none" }}
        >
          <div
            style={{
              padding: "6px 18px",
              borderRadius: 8,
              background: "rgba(0,0,0,0.65)",
              color: "#ff3cac",
              fontFamily: "sans-serif",
              fontWeight: 700,
              fontSize: 28,
              letterSpacing: 2,
              whiteSpace: "nowrap",
              textShadow: "0 0 12px rgba(255,60,172,0.8)",
            }}
          >
            {name}
          </div>
        </Html>
      )}
    </group>
  );
}