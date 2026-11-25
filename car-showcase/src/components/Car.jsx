import { useGLTF } from "@react-three/drei";
import * as THREE from "three";
import { useRef, useEffect } from "react";

const BODY_KEYWORDS = ["body", "door", "bumper", "hood", "viper", "railings", "logo", "chest"];

export default function Car({ color = "#e74c3c" }) {
  const { scene } = useGLTF("/car.glb");
  const bodyMaterials = useRef(new Map());

  useEffect(() => {
    scene.traverse((child) => {
      if (child.isMesh && child.material) {
        const name = child.name.toLowerCase();
        if (BODY_KEYWORDS.some((kw) => name.includes(kw))) {
          bodyMaterials.current.set(child, child.material);
        }
      }
    });
  }, [scene]);

  useEffect(() => {
    bodyMaterials.current.forEach((mat) => {
      mat.color.set(color);
    });
  }, [color]);

  const box = new THREE.Box3().setFromObject(scene);
  const size = box.getSize(new THREE.Vector3());
  const center = box.getCenter(new THREE.Vector3());
  const bottom = center.y - size.y / 2;

  const maxDim = Math.max(size.x, size.y, size.z);
  const scale = 5 / maxDim;

  return (
    <group
      position={[-center.x * scale, -bottom * scale + 0.2, -center.z * scale]}
      scale={[scale, scale, scale]}
    >
      <primitive object={scene} castShadow receiveShadow />
    </group>
  );
}
