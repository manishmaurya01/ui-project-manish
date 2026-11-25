import { OrbitControls } from "@react-three/drei";
import { useRef, useEffect } from "react";

export default function CameraControls({ resetSignal = 0, autoRotate = false }) {
  const ref = useRef();

  useEffect(() => {
    if (ref.current) ref.current.reset();
  }, [resetSignal]);

  return (
    <OrbitControls
      ref={ref}
      makeDefault
      target={[0, 0.8, 0]}
      minDistance={4}
      maxDistance={16}
      maxPolarAngle={Math.PI / 2 - 0.05}
      enableDamping
      autoRotate={autoRotate}
      autoRotateSpeed={1.2}
    />
  );
}