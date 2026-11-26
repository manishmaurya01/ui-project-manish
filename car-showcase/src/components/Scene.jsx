import { ContactShadows } from "@react-three/drei";
import { useRef } from "react";
import * as THREE from "three";
import { envs } from "../data";
import Atmosphere from "./Atmosphere";
import Lights from "./Lights";
import Platform from "./Platform";
import Car from "./Car";
import DrivableCar from "./DrivableCar";
import CameraControls from "./CameraControls";
import FollowControls from "./FollowControls";
import Particles from "./Particles";
import LightBeams from "./LightBeams";
import NeonFloor from "./NeonFloor";
import Hotspots from "./Hotspots";
import NightCity from "../environments/NightCity";

export default function Scene({ index, carColor, carModel, resetSignal, options, drive }) {
  const env = envs[index];
  const carState = useRef({ speed: 0, heading: 0, pos: new THREE.Vector3(0, 0, 0) });

  return (
    <>
      <Atmosphere color={env.sky} />
      <Lights />
      <Platform ringColor={env.ring} />
      <NeonFloor />
      {drive ? (
        <DrivableCar model={carModel} color={carColor} carState={carState} />
      ) : (
        <Car color={carColor} model={carModel} />
      )}
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
      {options.hotspots && !drive && <Hotspots />}
      {drive ? (
        <FollowControls carState={carState} />
      ) : (
        <CameraControls resetSignal={resetSignal} autoRotate={options.rotate} />
      )}
    </>
  );
}