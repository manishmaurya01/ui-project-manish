import { useThree } from "@react-three/fiber";

export default function Ground({ color }) {
  const { scene } = useThree();

  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow castShadow>
      <circleGeometry args={[60, 64]} />
      <meshStandardMaterial
        color={color}
        metalness={0.6}
        roughness={0.2}
        envMap={scene.environment}
        envMapIntensity={0.5}
      />
    </mesh>
  );
}
