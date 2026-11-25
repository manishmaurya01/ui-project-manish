import RiseGroup from "./RiseGroup";
import Ground from "./Ground";
import Building from "./Building";
import Sun from "./Sun";
import { ringPoints } from "./layout";

const foregroundSpots = ringPoints(12, 14, 2);
const backgroundSpots = ringPoints(60, 35, 10);

export default function NightCity({ active }) {
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
    </RiseGroup>
  );
}
