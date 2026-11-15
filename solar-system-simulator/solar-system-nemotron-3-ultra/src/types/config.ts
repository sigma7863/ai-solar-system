import { Vector3, Color } from 'three';

export interface MoonConfig {
  name: string;
  radius: number;
  distance: number;
  orbitalPeriod: number;
  orbitalSpeed: number;
  color: number;
  initialAngle: number;
}

export interface PlanetConfig {
  name: string;
  radius: number;
  distance: number;
  orbitalPeriod: number;
  orbitalSpeed: number;
  rotationPeriod: number;
  rotationSpeed: number;
  axialTilt: number;
  color: number;
  emissive: number;
  emissiveIntensity: number;
  roughness: number;
  metalness: number;
  hasRing: boolean;
  ringInnerRadius: number;
  ringOuterRadius: number;
  ringColor: number;
  initialOrbitAngle: number;
  initialRotationAngle: number;
  moons: MoonConfig[];
}

export interface StarConfig {
  name: string;
  radius: number;
  color: number;
  emissive: number;
  emissiveIntensity: number;
  temperature: number;
}

export interface CameraConfig {
  initialDistance: number;
  minDistance: number;
  maxDistance: number;
  initialPhi: number;
  initialTheta: number;
}

export interface AnimationConfig {
  timeScale: number;
  paused: boolean;
}

export interface SolarSystemConfig {
  star: StarConfig;
  planets: PlanetConfig[];
  camera: CameraConfig;
  animation: AnimationConfig;
}

export interface OrbitalData {
  angle: number;
  speed: number;
  radius: number;
  axis: Vector3;
}

export interface CelestialBodyData {
  name: string;
  position: Vector3;
  radius: number;
  visible: boolean;
  isStar: boolean;
}