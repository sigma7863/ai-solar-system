export interface CelestialBodyData {
  radius: number;
  color: number;
  rotationSpeed: number;
  orbitRadius: number;
  revolutionSpeed: number;
  roughness?: number;
  metalness?: number;
  segments?: number;
}

export interface TickContext {
  delta: number;
  elapsed: number;
}
