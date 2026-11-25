import { envs } from "../data";
import Atmosphere from "./Atmosphere";
import Lights from "./Lights";
import Platform from "./Platform";
import Car from "./Car";
import CameraControls from "./CameraControls";
import NightCity from "../environments/NightCity";

export default function Scene({ index, carColor }) {
  const env = envs[index];
  return (
    <>
      <Atmosphere color={env.sky} />
      <Lights />
      <Platform ringColor={env.ring} />
      <Car color={carColor} />
      <NightCity active={index === 0} />
      <CameraControls />
    </>
  );
}
