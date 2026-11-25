import { useRef, useEffect } from "react";
import gsap from "gsap";

export default function RiseGroup({ active, children }) {
  const ref = useRef();

  useEffect(() => {
    gsap.to(ref.current.scale, { y: active ? 1 : 0, duration: 1.2, ease: "power3.inOut" });
  }, [active]);

  return <group ref={ref} scale={[1, 0, 1]}>{children}</group>;
}