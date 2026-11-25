import { useEffect } from "react";
import gsap from "gsap";

export default function PersonLibrary({ people, models }) {
  useEffect(() => {
    const tweens = [];

    people.forEach((p) => {
      if (!p.ref || !p.ref.current) return;

      // Face directly towards the car
      p.ref.current.lookAt(0, 0.45, 0);

      // Only breathing bob up-down (keeps them facing the car)
      tweens.push(
        gsap.to(p.ref.current.position, {
          y: 0.5,
          duration: 2 / (p.speed || 1),
          ease: "sine.inOut",
          yoyo: true,
          repeat: -1,
          delay: p.delay || 0,
        })
      );
    });

    return () => {
      tweens.forEach((t) => t.kill());
    };
  }, [people]);

  return (
    <group>
      {people.map((p, i) => {
        const scene = models[p.model]?.scene;
        return (
          <group
            key={p.id || i}
            ref={(el) => {
              if (el) p.ref = { current: el };
            }}
            position={[p.x, 0.45, p.z]}
            castShadow
            receiveShadow
          >
            {scene && <primitive object={scene} />}
          </group>
        );
      })}
    </group>
  );
}
