import { useGLTF } from "@react-three/drei";
import RiseGroup from "./RiseGroup";
import Ground from "./Ground";
import Building from "./Building";
import Sun from "./Sun";
import PersonLibrary from "../components/PersonLibrary";
import { ringPoints } from "./layout";

const foregroundSpots = ringPoints(12, 14, 2);
const backgroundSpots = ringPoints(60, 35, 10);

// People walking around car platform using real GLB models
const peopleSpots = [
  { id: "p1", x: 6, z: 0, model: "/person1.glb", speed: 0.6, delay: 0 },
  { id: "p2", x: -6, z: 0, model: "/person2.glb", speed: 0.5, delay: 0.5 },
  { id: "p3", x: 0, z: 6, model: "/person1.glb", speed: 0.7, delay: 1 },
  { id: "p4", x: 0, z: -6, model: "/person2.glb", speed: 0.55, delay: 1.5 },
  { id: "p5", x: 8, z: 3, model: "/person1.glb", speed: 0.65, delay: 0.2 },
  { id: "p6", x: -8, z: 3, model: "/person2.glb", speed: 0.5, delay: 0.8 },
  { id: "p7", x: 3, z: 8, model: "/person2.glb", speed: 0.6, delay: 1.2 },
  { id: "p8", x: -3, z: 8, model: "/person1.glb", speed: 0.55, delay: 1.8 },
  { id: "p9", x: 8, z: -3, model: "/person2.glb", speed: 0.6, delay: 0.4 },
  { id: "p10", x: -8, z: -3, model: "/person1.glb", speed: 0.5, delay: 1.0 },
  { id: "p11", x: 3, z: -8, model: "/person2.glb", speed: 0.65, delay: 1.6 },
  { id: "p12", x: -3, z: -8, model: "/person1.glb", speed: 0.55, delay: 2.0 },
];

export default function NightCity({ active }) {
  const model1 = useGLTF("/person1.glb");
  const model2 = useGLTF("/person2.glb");
  const models = {
    "/person1.glb": model1,
    "/person2.glb": model2,
  };

  return (
    <RiseGroup active={active}>
      <Ground color="#0a0a1a" />
      <Sun />

      {/* Background city skyline */}
      {backgroundSpots.map((p, i) => {
        const h = 20 + Math.sin(i * 0.8) * 15 + (i * 3) % 40;
        return (
          <Building key={`bg-${p.i}`} x={p.x} z={p.z} h={h} />
        );
      })}

      {/* Foreground buildings near platform */}
      {foregroundSpots.map((p, i) => {
        const h = 5 + Math.cos(i) * 2 + (i * 1.5) % 6;
        return (
          <Building key={`fg-${p.i}`} x={p.x} z={p.z} h={h} />
        );
      })}

      {/* People walking around car in loop */}
      <PersonLibrary people={peopleSpots} models={models} />
    </RiseGroup>
  );
}
