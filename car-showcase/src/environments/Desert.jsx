import RiseGroup from "./RiseGroup";
import Ground from "./Ground";
import Dune from "./Dune";
import Sun from "./Sun";
import { ringPoints } from "./layout";

const spots = ringPoints(14, 15, 4);

export default function Desert({ active }) {
  return (
    <RiseGroup active={active}>
      <Ground color="#bc8c50" />
      {spots.map((p) => (
        <Dune key={p.i} x={p.x} z={p.z} size={4 + (p.i % 4) * 1.5} />
      ))}
      <Sun />
    </RiseGroup>
  );
}