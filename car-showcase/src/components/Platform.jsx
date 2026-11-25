import PlatformBase from "./PlatformBase";
import PlatformRing from "./PlatformRing";

export default function Platform({ ringColor }) {
  return (
    <group>
      <PlatformBase />
      <PlatformRing color={ringColor} />
    </group>
  );
}