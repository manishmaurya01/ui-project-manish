export default function Dune({ x, z, size }) {
  return (
    <mesh position={[x, 0, z]} scale={[1, 0.35, 1]} castShadow receiveShadow>
      <sphereGeometry args={[size, 32, 32]} />
      <meshStandardMaterial color="#e0b070" metalness={0.1} roughness={0.9} />
    </mesh>
  );
}
