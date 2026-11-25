import { useGLTF, Html } from "@react-three/drei";
import * as THREE from "three";
import { useMemo } from "react";

const TARGET_SIZE = 22;

export default function Showroom({ position = [0, 0, 0], name }) {
  const { scene } = useGLTF("/car_showroom.glb");

  const { size, center, bottom, scale } = useMemo(() => {
    const box = new THREE.Box3().setFromObject(scene);
    const size = box.getSize(new THREE.Vector3());
    const center = box.getCenter(new THREE.Vector3());
    const bottom = center.y - size.y / 2;
    const maxDim = Math.max(size.x, size.y, size.z);
    return { size, center, bottom, scale: TARGET_SIZE / maxDim };
  }, [scene]);

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
              padding: "8px 24px",
              borderRadius: 10,
              background: "rgba(0,0,0,0.7)",
              border: "2px solid #ff3cac",
              color: "#fff",
              fontFamily: "sans-serif",
              fontWeight: 800,
              fontSize: 30,
              letterSpacing: 3,
              whiteSpace: "nowrap",
              textShadow: "0 0 14px rgba(255,60,172,0.9)",
              boxShadow: "0 0 24px rgba(255,60,172,0.6)",
            }}
          >
            {name}
          </div>
        </Html>
      )}
    </group>
  );
}

useGLTF.preload("/car_showroom.glb");