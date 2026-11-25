import { Html } from "@react-three/drei";

const SPOTS = [
  { pos: [1.6, 1.1, 1.4], label: "LED Headlights" },
  { pos: [-1.8, 0.9, 0.6], label: "Alloy Wheels" },
  { pos: [0, 1.4, -1.8], label: "Sport Roof" },
];

export default function Hotspots() {
  return (
    <group>
      {SPOTS.map((s) => (
        <Html key={s.label} position={s.pos} center distanceFactor={12}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              pointerEvents: "none",
              whiteSpace: "nowrap",
            }}
          >
            <span
              style={{
                width: 12,
                height: 12,
                borderRadius: "50%",
                background: "#ff3cac",
                boxShadow: "0 0 10px #ff3cac",
              }}
            />
            <span
              style={{
                padding: "3px 10px",
                borderRadius: 6,
                background: "rgba(0,0,0,0.6)",
                color: "#fff",
                fontFamily: "sans-serif",
                fontSize: 13,
              }}
            >
              {s.label}
            </span>
          </div>
        </Html>
      ))}
    </group>
  );
}