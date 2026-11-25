export function ringPoints(count, radius, spread = 0) {
  return Array.from({ length: count }, (_, i) => {
    const a = (i / count) * Math.PI * 2;
    const r = radius + (i % 3) * spread;
    return { x: Math.cos(a) * r, z: Math.sin(a) * r, i };
  });
}