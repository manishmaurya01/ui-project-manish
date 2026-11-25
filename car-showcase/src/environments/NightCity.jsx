import { useGLTF } from "@react-three/drei";
import RiseGroup from "./RiseGroup";
import Ground from "./Ground";
import Sun from "./Sun";
import Showroom from "../components/Showroom";
import PersonLibrary from "../components/PersonLibrary";

// People standing around the car platform using real GLB models
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

export default function NightCity({ active, showroom }) {
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

      {/* Car showroom building behind the people */}
      {showroom && (
        <Showroom position={showroom.position} name={showroom.name} />
      )}

      {/* People standing around the car */}
      <PersonLibrary people={peopleSpots} models={models} />
    </RiseGroup>
  );
}

useGLTF.preload("/person1.glb");
useGLTF.preload("/person2.glb");