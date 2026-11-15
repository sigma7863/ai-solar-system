export interface CelestialBodyConfig {
  radius: number;
  color: number;
  emissive?: number;
  emissiveIntensity?: number;
  roughness: number;
  metalness: number;
  rotationSpeed: number;
}

export interface OrbitConfig {
  radius: number;
  speed: number;
  startAngle?: number;
}

export interface PlanetConfig {
  body: CelestialBodyConfig;
  orbit: OrbitConfig;
  satellites?: SatelliteConfig[];
}

export interface SatelliteConfig {
  body: CelestialBodyConfig;
  orbit: OrbitConfig;
}

export interface SolarSystemConfig {
  sun: CelestialBodyConfig;
  earth: PlanetConfig;
  starfield: {
    count: number;
    radius: number;
  };
}
