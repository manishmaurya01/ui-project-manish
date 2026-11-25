import { useProgress } from "@react-three/drei";

export default function Loader() {
  const { active, progress } = useProgress();
  if (!active) return null;

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background: "rgba(0,0,0,0.85)",
        zIndex: 100,
        color: "#fff",
        fontFamily: "sans-serif",
      }}
    >
      <div style={{ fontSize: 20, letterSpacing: 3, marginBottom: 16 }}>
        Loading Showroom…
      </div>
      <div
        style={{
          width: 260,
          height: 8,
          borderRadius: 8,
          background: "rgba(255,255,255,0.15)",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            width: `${progress}%`,
            height: "100%",
            background: "#ff3cac",
            transition: "width 0.2s",
          }}
        />
      </div>
      <div style={{ marginTop: 10, fontSize: 14 }}>
        {Math.round(progress)}%
      </div>
    </div>
  );
}