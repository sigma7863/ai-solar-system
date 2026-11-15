export const SUN = {
  radius: 5,
  color: 0xffaa00,
  emissive: 0xff5500,
  emissiveIntensity: 2,
  rotationSpeed: 0.001,
  segments: 64,
} as const;

export const EARTH = {
  radius: 1.5,
  color: 0x4488ff,
  orbitRadius: 15,
  rotationSpeed: 0.01,
  revolutionSpeed: 0.003,
  roughness: 0.5,
  metalness: 0.1,
  segments: 64,
} as const;

export const MOON = {
  radius: 0.5,
  color: 0xcccccc,
  orbitRadius: 3,
  rotationSpeed: 0.005,
  revolutionSpeed: 0.02,
  roughness: 0.9,
  metalness: 0,
  segments: 32,
} as const;

export const LIGHT = {
  ambientIntensity: 0.15,
  pointIntensity: 2.5,
  pointDistance: 200,
} as const;

export const STAR = {
  count: 15000,
  radius: 1000,
  size: 0.5,
} as const;

export const CAMERA = {
  fov: 60,
  near: 0.1,
  far: 2000,
  initialPosition: { x: 25, y: 15, z: 25 },
} as const;
