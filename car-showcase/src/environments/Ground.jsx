export default function Ground({ color }) {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow castShadow>
      <circleGeometry args={[40, 64]} />
      <meshStandardMaterial color={color} metalness={0.1} roughness={0.8} />
    </mesh>
  );
}
