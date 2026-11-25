export default function Lights() {
  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight
        position={[5, 10, 5]}
        intensity={1.2}
        castShadow
        shadow-mapSize={[1024, 1024]}
      />
      {/* Showroom interior key light over the car */}
      <spotLight
        position={[0, 12, 4]}
        angle={0.5}
        penumbra={0.6}
        intensity={2.2}
        distance={30}
        castShadow
      />
      {/* Colored rim lights for a premium showroom look */}
      <pointLight position={[-6, 6, -4]} intensity={1.2} color="#ff3cac" />
      <pointLight position={[6, 6, -4]} intensity={1.2} color="#3498db" />
    </>
  );
}