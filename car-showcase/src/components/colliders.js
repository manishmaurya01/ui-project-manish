// Simple circle colliders approximating scene obstacles (x, z, radius)
export const COLLIDERS = [
  { x: 0, z: -17, r: 11 }, // showroom building
  { x: 6, z: 0, r: 0.6 },
  { x: -6, z: 0, r: 0.6 },
  { x: 0, z: 6, r: 0.6 },
  { x: 0, z: -6, r: 0.6 },
  { x: 8, z: 3, r: 0.6 },
  { x: -8, z: 3, r: 0.6 },
  { x: 3, z: 8, r: 0.6 },
  { x: -3, z: 8, r: 0.6 },
  { x: 8, z: -3, r: 0.6 },
  { x: -8, z: -3, r: 0.6 },
  { x: 3, z: -8, r: 0.6 },
  { x: -3, z: -8, r: 0.6 },
];

// Car cannot go beyond this radius from the showroom center
export const BOUNDARY = 24;
export const CAR_RADIUS = 1.2;