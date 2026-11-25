import { useThree } from "@react-three/fiber";

export default function Building({ x, z, h }) {
  const { scene } = useThree();
  const floors = Math.max(5, Math.floor(h / 2.5));
  const isForeground = h < 18;

  const windowMeshes = [];
  for (let row = 0; row < floors; row++) {
    const y = row * 2.5 + 1.25 - h / 2;
    const lit = row % 3 === 0 || row % 4 === 1;
    const glowColor = lit ? "#ffeb3b" : "#1a1a2e";
    const intensity = lit ? 2 : 0.1;

    windowMeshes.push(
      <mesh key={`f-${row}`} position={[0, y, isForeground ? 1.51 : 2.6]}>
        <boxGeometry args={[isForeground ? 2.4 : 4.4, 1.8, 0.15]} />
        <meshStandardMaterial
          color={glowColor}
          emissive={glowColor}
          emissiveIntensity={intensity}
          metalness={0.5}
          roughness={0.3}
          envMap={scene.environment}
          envMapIntensity={1}
        />
      </mesh>,
      <mesh key={`b-${row}`} position={[0, y, isForeground ? -1.51 : -2.6]}>
        <boxGeometry args={[isForeground ? 2.4 : 4.4, 1.8, 0.15]} />
        <meshStandardMaterial
          color={glowColor}
          emissive={glowColor}
          emissiveIntensity={intensity}
          metalness={0.5}
          roughness={0.3}
          envMap={scene.environment}
          envMapIntensity={1}
        />
      </mesh>,
      <mesh key={`l-${row}`} position={[isForeground ? -1.51 : -2.6, y, 0]} rotation={[0, Math.PI / 2, 0]}>
        <boxGeometry args={[isForeground ? 2.4 : 4.4, 1.8, 0.15]} />
        <meshStandardMaterial
          color={glowColor}
          emissive={glowColor}
          emissiveIntensity={intensity}
          metalness={0.5}
          roughness={0.3}
          envMap={scene.environment}
          envMapIntensity={1}
        />
      </mesh>,
      <mesh key={`r-${row}`} position={[isForeground ? 1.51 : 2.6, y, 0]} rotation={[0, Math.PI / 2, 0]}>
        <boxGeometry args={[isForeground ? 2.4 : 4.4, 1.8, 0.15]} />
        <meshStandardMaterial
          color={glowColor}
          emissive={glowColor}
          emissiveIntensity={intensity}
          metalness={0.5}
          roughness={0.3}
          envMap={scene.environment}
          envMapIntensity={1}
        />
      </mesh>
    );
  }

  return (
    <group position={[x, 0, z]} castShadow receiveShadow>
      <mesh position={[0, h / 2, 0]}>
        <boxGeometry args={[isForeground ? 3 : 5, h, isForeground ? 3 : 5]} />
        <meshStandardMaterial
          color="#0b0c10"
          metalness={1}
          roughness={0.03}
          envMap={scene.environment}
          envMapIntensity={2.5}
        />
      </mesh>
      {windowMeshes}
      <mesh position={[0, h + 0.5, 0]}>
        <circleGeometry args={[isForeground ? 2 : 3, 32]} />
        <meshStandardMaterial color="#222" metalness={0.9} roughness={0.1} />
      </mesh>
      <mesh position={[0, h + 1.2, 0]}>
        <cylinderGeometry args={[0.12, 3, 8]} />
        <meshStandardMaterial color="#64748b" metalness={0.9} roughness={0.1} />
      </mesh>
      <mesh position={[0, h / 2, isForeground ? 1.6 : 2.7]}>
        <boxGeometry args={[isForeground ? 3.2 : 5.2, 0.4, 0.2]} />
        <meshStandardMaterial color="#00ff88" emissive="#00ff88" emissiveIntensity={4} />
      </mesh>
      <mesh position={[0, h / 2, isForeground ? -1.6 : -2.7]}>
        <boxGeometry args={[isForeground ? 3.2 : 5.2, 0.4, 0.2]} />
        <meshStandardMaterial color="#00ff88" emissive="#00ff88" emissiveIntensity={4} />
      </mesh>
      <mesh position={[isForeground ? 1.6 : 2.7, h / 2, 0]} rotation={[0, Math.PI / 2, 0]}>
        <boxGeometry args={[isForeground ? 3.2 : 5.2, 0.4, 0.2]} />
        <meshStandardMaterial color="#00ff88" emissive="#00ff88" emissiveIntensity={4} />
      </mesh>
      <mesh position={[isForeground ? -1.6 : -2.7, h / 2, 0]} rotation={[0, Math.PI / 2, 0]}>
        <boxGeometry args={[isForeground ? 3.2 : 5.2, 0.4, 0.2]} />
        <meshStandardMaterial color="#00ff88" emissive="#00ff88" emissiveIntensity={4} />
      </mesh>
    </group>
  );
}
