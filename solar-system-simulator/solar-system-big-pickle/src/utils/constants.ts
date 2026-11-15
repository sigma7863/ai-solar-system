import type { SolarSystemConfig } from "../types";

export const SOLAR_SYSTEM_CONFIG: SolarSystemConfig = {
  sun: {
    radius: 5,
    color: 0xffcc33,
    emissive: 0xff6600,
    emissiveIntensity: 2.0,
    roughness: 0.4,
    metalness: 0.0,
    rotationSpeed: 0.002,
  },
  earth: {
    body: {
      radius: 1.5,
      color: 0x4488ff,
      emissive: 0x112244,
      emissiveIntensity: 0.1,
      roughness: 0.6,
      metalness: 0.1,
      rotationSpeed: 0.02,
    },
    orbit: {
      radius: 15,
      speed: 0.003,
      startAngle: 0,
    },
    satellites: [
      {
        body: {
          radius: 0.4,
          color: 0xaaaaaa,
          roughness: 0.9,
          metalness: 0.0,
          rotationSpeed: 0.005,
        },
        orbit: {
          radius: 3.5,
          speed: 0.03,
          startAngle: 0,
        },
      },
    ],
  },
  starfield: {
    count: 10000,
    radius: 1000,
  },
};

export const CAMERA_CONFIG = {
  fov: 60,
  near: 0.1,
  far: 2000,
  initialPosition: { x: 30, y: 20, z: 30 },
} as const;

export const RENDERER_CONFIG = {
  antialias: true,
  shadowMapSize: 2048,
  pixelRatio: Math.min(window.devicePixelRatio, 2),
} as const;

export const AMBIENT_LIGHT_CONFIG = {
  intensity: 0.3,
  color: 0x222244,
} as const;
