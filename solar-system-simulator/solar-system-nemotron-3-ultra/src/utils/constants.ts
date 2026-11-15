import type { PlanetConfig, StarConfig, AppConfig } from '../types';

export const STAR_CONFIG: StarConfig = {
  name: 'Sun',
  radius: 5.0,
  color: 0xffcc00,
  emissive: 0xffaa00,
  emissiveIntensity: 1.5,
  temperature: 5778,
};

export const PLANET_CONFIGS: PlanetConfig[] = [
  {
    name: 'Mercury',
    radius: 0.38,
    distance: 8.0,
    orbitalPeriod: 87.97,
    rotationPeriod: 1407.6,
    axialTilt: 0.034,
    color: 0xb5b5b5,
    emissive: 0x333333,
    emissiveIntensity: 0.1,
  },
  {
    name: 'Venus',
    radius: 0.95,
    distance: 11.5,
    orbitalPeriod: 224.7,
    rotationPeriod: 5832.5,
    axialTilt: 2.64,
    color: 0xe6c87a,
    emissive: 0x443311,
    emissiveIntensity: 0.15,
  },
  {
    name: 'Earth',
    radius: 1.0,
    distance: 15.5,
    orbitalPeriod: 365.25,
    rotationPeriod: 24.0,
    axialTilt: 23.44,
    color: 0x2a5fc8,
    emissive: 0x111133,
    emissiveIntensity: 0.05,
    moons: [
      {
        name: 'Moon',
        radius: 0.27,
        distance: 2.5,
        orbitalPeriod: 27.32,
        color: 0xaaaaaa,
      },
    ],
  },
  {
    name: 'Mars',
    radius: 0.53,
    distance: 20.0,
    orbitalPeriod: 687.0,
    rotationPeriod: 24.6,
    axialTilt: 25.19,
    color: 0xc1440e,
    emissive: 0x331100,
    emissiveIntensity: 0.1,
    moons: [
      { name: 'Phobos', radius: 0.05, distance: 1.0, orbitalPeriod: 0.32, color: 0x888888 },
      { name: 'Deimos', radius: 0.03, distance: 1.5, orbitalPeriod: 1.26, color: 0x777777 },
    ],
  },
  {
    name: 'Jupiter',
    radius: 4.0,
    distance: 32.0,
    orbitalPeriod: 4333.0,
    rotationPeriod: 9.9,
    axialTilt: 3.13,
    color: 0xd4a574,
    emissive: 0x443311,
    emissiveIntensity: 0.1,
    hasRing: true,
    ringInnerRadius: 4.3,
    ringOuterRadius: 5.0,
    ringColor: 0x887766,
    moons: [
      { name: 'Io', radius: 0.3, distance: 5.5, orbitalPeriod: 1.77, color: 0xf5e6a3 },
      { name: 'Europa', radius: 0.27, distance: 7.0, orbitalPeriod: 3.55, color: 0xf5f0e1 },
      { name: 'Ganymede', radius: 0.38, distance: 9.0, orbitalPeriod: 7.15, color: 0xb8b0a0 },
      { name: 'Callisto', radius: 0.35, distance: 11.5, orbitalPeriod: 16.69, color: 0x8a8580 },
    ],
  },
  {
    name: 'Saturn',
    radius: 3.5,
    distance: 46.0,
    orbitalPeriod: 10759.0,
    rotationPeriod: 10.7,
    axialTilt: 26.73,
    color: 0xf4e4bc,
    emissive: 0x444433,
    emissiveIntensity: 0.08,
    hasRing: true,
    ringInnerRadius: 4.0,
    ringOuterRadius: 6.5,
    ringColor: 0xccc8b8,
    moons: [
      { name: 'Titan', radius: 0.4, distance: 6.0, orbitalPeriod: 15.95, color: 0xd4b896 },
      { name: 'Rhea', radius: 0.18, distance: 8.0, orbitalPeriod: 4.52, color: 0xaaaaaa },
    ],
  },
  {
    name: 'Uranus',
    radius: 2.0,
    distance: 58.0,
    orbitalPeriod: 30687.0,
    rotationPeriod: 17.2,
    axialTilt: 97.77,
    color: 0x7de3f4,
    emissive: 0x113344,
    emissiveIntensity: 0.05,
    hasRing: true,
    ringInnerRadius: 2.2,
    ringOuterRadius: 2.8,
    ringColor: 0x444466,
  },
  {
    name: 'Neptune',
    radius: 1.9,
    distance: 68.0,
    orbitalPeriod: 60190.0,
    rotationPeriod: 16.1,
    axialTilt: 28.32,
    color: 0x4b70dd,
    emissive: 0x111144,
    emissiveIntensity: 0.05,
    hasRing: true,
    ringInnerRadius: 2.1,
    ringOuterRadius: 2.6,
    ringColor: 0x222255,
  },
];

export const CAMERA_CONFIG = {
  initialDistance: 80,
  minDistance: 10,
  maxDistance: 200,
  initialPhi: Math.PI / 3,
  initialTheta: 0,
};

export const ANIMATION_CONFIG = {
  timeScale: 1.0,
  paused: false,
};

export const APP_CONFIG: AppConfig = {
  star: STAR_CONFIG,
  planets: PLANET_CONFIGS,
  camera: CAMERA_CONFIG,
  animation: ANIMATION_CONFIG,
};

export const AU_SCALE = 1.0;
export const SIZE_SCALE = 1.0;
export const ORBIT_SPEED_SCALE = 1 / 365.25;
export const ROTATION_SPEED_SCALE = 1 / 24.0;