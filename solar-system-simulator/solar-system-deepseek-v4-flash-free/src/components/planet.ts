import {
  SphereGeometry,
  MeshStandardMaterial,
  Mesh,
  Group,
  LineBasicMaterial,
  BufferGeometry,
  LineLoop,
  Float32BufferAttribute,
} from "three";
import type { CelestialBodyData } from "../utils/types";

export function createOrbitRing(radius: number, color = 0x444466): LineLoop {
  const segments = 128;
  const positions = new Float32Array((segments + 1) * 3);

  for (let i = 0; i <= segments; i++) {
    const theta = (i / segments) * Math.PI * 2;
    positions[i * 3] = radius * Math.cos(theta);
    positions[i * 3 + 1] = 0;
    positions[i * 3 + 2] = radius * Math.sin(theta);
  }

  const geometry = new BufferGeometry();
  geometry.setAttribute("position", new Float32BufferAttribute(positions, 3));

  const material = new LineBasicMaterial({
    color,
    transparent: true,
    opacity: 0.3,
  });

  return new LineLoop(geometry, material);
}

export interface PlanetResult {
  revolutionPivot: Group;
  rotationPivot: Group;
  mesh: Mesh;
}

export function createPlanet(config: CelestialBodyData): PlanetResult {
  const revolutionPivot = new Group();
  revolutionPivot.name = `${config.color}-revolution`;

  const rotationPivot = new Group();
  rotationPivot.position.x = config.orbitRadius;
  rotationPivot.name = `${config.color}-rotation`;
  revolutionPivot.add(rotationPivot);

  const geometry = new SphereGeometry(
    config.radius,
    config.segments ?? 64,
    config.segments ?? 64,
  );

  const material = new MeshStandardMaterial({
    color: config.color,
    roughness: config.roughness ?? 0.4,
    metalness: config.metalness ?? 0.1,
  });

  const mesh = new Mesh(geometry, material);
  mesh.name = `${config.color}-mesh`;
  mesh.castShadow = true;
  mesh.receiveShadow = true;
  rotationPivot.add(mesh);

  const orbitRing = createOrbitRing(config.orbitRadius);
  revolutionPivot.add(orbitRing);

  return { revolutionPivot, rotationPivot, mesh };
}
