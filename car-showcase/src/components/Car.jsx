import { useGLTF } from "@react-three/drei";
import * as THREE from "three";

export default function Car() {
  const { scene } = useGLTF("/car.glb");
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
