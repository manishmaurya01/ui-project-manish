import Title from "./Title";
import NavButtons from "./NavButtons";

const style = { position: "absolute", bottom: 40, width: "100%", textAlign: "center", color: "white" };

export default function Overlay({ title, onPrev, onNext }) {
  return (
    <div style={style}>
      <Title text={title} />
      <NavButtons onPrev={onPrev} onNext={onNext} />
    </div>
  );
}