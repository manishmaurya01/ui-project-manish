import Title from "./Title";

const style = { position: "absolute", bottom: 40, width: "100%", textAlign: "center", color: "white" };

export default function Overlay({ title }) {
  return (
    <div style={style}>
      <Title text={title} />
    </div>
  );
}
