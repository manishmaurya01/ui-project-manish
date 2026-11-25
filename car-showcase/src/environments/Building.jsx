export default function Building({ x, z, h }) {
  return (
    <mesh position={[x, h / 2, z]} castShadow receiveShadow>
      <boxGeometry args={[3, h, 3]} />
      <meshStandardMaterial color="#1a1a33" emissive="#ff3cac" emissiveIntensity={0.25} />
    </mesh>
  );
}
