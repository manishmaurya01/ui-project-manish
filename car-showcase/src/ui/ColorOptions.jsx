const COLORS = [
  { value: "#e74c3c", label: "Racing Red" },
  { value: "#3498db", label: "Ocean Blue" },
  { value: "#2ecc71", label: "Emerald" },
  { value: "#f1c40f", label: "Sunburst" },
];

export default function ColorOptions({ carColor, setCarColor }) {
  return (
    <div
      style={{
        position: "absolute",
        bottom: 24,
        left: "50%",
        transform: "translateX(-50%)",
        display: "flex",
        gap: 14,
        zIndex: 10,
        padding: "10px 18px",
        background: "rgba(0,0,0,0.45)",
        borderRadius: 999,
        backdropFilter: "blur(6px)",
      }}
    >
      {COLORS.map((c) => {
        const active = carColor === c.value;
        return (
          <button
            key={c.value}
            title={c.label}
            onClick={() => setCarColor(c.value)}
            style={{
              width: 34,
              height: 34,
              borderRadius: "50%",
              border: active ? "3px solid #fff" : "2px solid rgba(255,255,255,0.3)",
              background: c.value,
              cursor: "pointer",
              boxShadow: active
                ? `0 0 14px ${c.value}`
                : "0 2px 6px rgba(0,0,0,0.4)",
              transform: active ? "scale(1.15)" : "scale(1)",
              transition: "transform 0.2s, box-shadow 0.2s",
            }}
          />
        );
      })}
    </div>
  );
}