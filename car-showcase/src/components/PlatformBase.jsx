export default function PlatformBase() {
  return (
    <mesh position={[0, 0.1, 0]} receiveShadow castShadow>
      <cylinderGeometry args={[3.5, 3.5, 0.2, 64]} />
      <meshStandardMaterial color="#222" metalness={0.8} roughness={0.3} />
    </mesh>
  );
}
