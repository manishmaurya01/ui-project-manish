export default function NavButtons({ onPrev, onNext }) {
  return (
    <div>
      <button onClick={onPrev}>← Prev</button>{" "}
      <button onClick={onNext}>Next →</button>
    </div>
  );
}