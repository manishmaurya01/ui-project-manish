import RiseGroup from "./RiseGroup";
import Ground from "./Ground";
import Building from "./Building";
import { ringPoints } from "./layout";

const spots = ringPoints(24, 14, 3);

export default function NightCity({ active }) {
  return (
    <RiseGroup active={active}>
      <Ground color="#111122" />
      {spots.map((p) => (
        <Building key={p.i} x={p.x} z={p.z} h={4 + ((p.i * 7) % 9)} />
      ))}
    </RiseGroup>
  );
}