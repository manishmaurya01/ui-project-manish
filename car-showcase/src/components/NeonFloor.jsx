export default function NeonFloor() {
  return (
    <group>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.02, 0]}>
        <ringGeometry args={[4.2, 4.5, 64]} />
        <meshBasicMaterial color="#ff3cac" />
      </mesh>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.02, 0]}>
        <ringGeometry args={[5.2, 5.35, 64]} />
        <meshBasicMaterial color="#3498db" />
      </mesh>
    </group>
  );
}