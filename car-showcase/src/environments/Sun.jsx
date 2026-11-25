export default function Sun() {
  return (
    <mesh position={[0, 12, -35]}>
      <sphereGeometry args={[4, 32, 32]} />
      <meshBasicMaterial color="#fff2c0" />
    </mesh>
  );
}