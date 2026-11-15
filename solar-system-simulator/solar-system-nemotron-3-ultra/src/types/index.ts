import type { Vector3, Color, Texture } from 'three';

export interface PlanetConfig {
  name: string;
  radius: number;
  distance: number;
  orbitalPeriod: number;
  rotationPeriod: number;
  axialTilt: number;
  color: number;
  texture?: string;
  emissive?: number;
  emissiveIntensity?: number;
  hasRing?: boolean;
  ringInnerRadius?: number;
  ringOuterRadius?: number;
  ringColor?: number;
  moons?: MoonConfig[];
}

export interface MoonConfig {
  name: string;
  radius: number;
  distance: number;
  orbitalPeriod: number;
  color: number;
}

export interface StarConfig {
  name: string;
  radius: number;
  color: number;
  emissive: number;
  emissiveIntensity: number;
  temperature: number;
}

export interface OrbitData {
  angle: number;
  speed: number;
  radius: number;
}

export interface CelestialBodyData {
  name: string;
  position: Vector3;
  radius: number;
  visible: boolean;
}

export interface CameraState {
  position: Vector3;
  target: Vector3;
  distance: number;
  phi: number;
  theta: number;
}

export interface AppConfig {
  star: StarConfig;
  planets: PlanetConfig[];
  camera: {
    initialDistance: number;
    minDistance: number;
    maxDistance: number;
    initialPhi: number;
    initialTheta: number;
  };
  animation: {
    timeScale: number;
    paused: boolean;
  };
}