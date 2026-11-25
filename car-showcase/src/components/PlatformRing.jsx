export default function PlatformRing({ color }) {
  return (
    <mesh position={[0, 0.21, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
      <ringGeometry args={[3.2, 3.5, 64]} />
      <meshBasicMaterial color={color} />
    </mesh>
  );
}
