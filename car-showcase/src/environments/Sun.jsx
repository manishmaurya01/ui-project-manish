export default function Sun() {
  return (
    <group position={[50, 40, -50]}>
      <pointLight position={[0, 0, 0]} intensity={3} distance={300} decay={1} castShadow />
      <mesh>
        <sphereGeometry args={[6, 32, 32]} />
        <meshBasicMaterial color="#fff2c0" />
      </mesh>
      <mesh>
        <sphereGeometry args={[10, 32, 32]} />
        <meshBasicMaterial color="#fff2c0" transparent opacity={0.4} />
      </mesh>
    </group>
  );
}
