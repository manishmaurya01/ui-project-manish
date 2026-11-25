import * as THREE from "three";

function Beam({ position, color }) {
  return (
    <mesh position={position}>
      <coneGeometry args={[3, 10, 32, 1, true]} />
      <meshBasicMaterial
        color={color}
        transparent
        opacity={0.08}
        side={THREE.DoubleSide}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </mesh>
  );
}

export default function LightBeams() {
  return (
    <group>
      <Beam position={[0, 7, 0]} color="#ffffff" />
      <Beam position={[-5, 6, -3]} color="#ff3cac" />
      <Beam position={[5, 6, -3]} color="#3498db" />
    </group>
  );
}