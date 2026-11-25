export default function ColorOptions({ carColor, setCarColor }) {
  const colors = ["#e74c3c", "#3498db", "#2ecc71", "#f1c40f"];

  return (
    <div
      style={{
        position: "absolute",
        bottom: 90,
        left: 20,
        display: "flex",
        flexDirection: "column",
        gap: 8,
        zIndex: 10,
      }}
    >
      {colors.map((c) => (
        <button
          key={c}
          onClick={() => setCarColor(c)}
          style={{
            width: 32,
            height: 32,
            borderRadius: "50%",
            border: "2px solid rgba(255,255,255,0.3)",
            background: c,
            cursor: "pointer",
            boxShadow: "0 2px 6px rgba(0,0,0,0.4)",
            transform: carColor === c ? "scale(1.2)" : "scale(1)",
            transition: "transform 0.2s",
          }}
        />
      ))}
    </div>
  );
}
