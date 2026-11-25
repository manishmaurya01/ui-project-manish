import { useThree } from "@react-three/fiber";

export default function PlatformBase() {
  const { scene } = useThree();

  return (
    <mesh position={[0, 0.1, 0]} receiveShadow castShadow>
      <cylinderGeometry args={[3.5, 3.5, 0.2, 64]} />
      <meshStandardMaterial
        color="#222"
        metalness={0.9}
        roughness={0.1}
        envMap={scene.environment}
        envMapIntensity={1.5}
      />
    </mesh>
  );
}
