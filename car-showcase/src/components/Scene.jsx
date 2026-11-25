import { ContactShadows } from "@react-three/drei";
import { envs } from "../data";
import Atmosphere from "./Atmosphere";
import Lights from "./Lights";
import Platform from "./Platform";
import Car from "./Car";
import CameraControls from "./CameraControls";
import Particles from "./Particles";
import LightBeams from "./LightBeams";
import NeonFloor from "./NeonFloor";
import Hotspots from "./Hotspots";
import NightCity from "../environments/NightCity";

export default function Scene({ index, carColor, resetSignal, options }) {
  const env = envs[index];
  return (
    <>
      <Atmosphere color={env.sky} />
      <Lights />
      <Platform ringColor={env.ring} />
      <NeonFloor />
      <Car color={carColor} />
      <ContactShadows
        position={[0, 0.23, 0]}
        opacity={0.6}
        scale={9}
        blur={2.5}
        far={4}
        resolution={256}
        color="#000000"
      />
      <NightCity active={index === 0} showroom={env.showroom} />
      {options.beams && <LightBeams />}
      {options.particles && <Particles />}
      {options.hotspots && <Hotspots />}
      <CameraControls resetSignal={resetSignal} autoRotate={options.rotate} />
    </>
  );
}