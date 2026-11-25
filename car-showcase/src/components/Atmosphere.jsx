import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export default function Atmosphere({ color }) {
  const bg = useRef();
  const fog = useRef();
  const target = new THREE.Color(color);

  useFrame(() => {
    bg.current.lerp(target, 0.05);
    fog.current.color.lerp(target, 0.05);
  });

  return (
    <>
      <color ref={bg} attach="background" args={["#0a0a1a"]} />
      <fog ref={fog} attach="fog" args={["#0a0a1a", 15, 45]} />
    </>
  );
}