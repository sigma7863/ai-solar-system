import * as THREE from "three";
import type { CelestialBodyConfig, OrbitConfig } from "../types";
import { createEarthTexture } from "../utils/textures";

export class Planet {
  readonly mesh: THREE.Mesh;
  readonly orbitGroup: THREE.Group;
  private readonly config: CelestialBodyConfig;
  private readonly orbitConfig: OrbitConfig;

  constructor(body: CelestialBodyConfig, orbit: OrbitConfig) {
    this.config = body;
    this.orbitConfig = orbit;

    const texture = createEarthTexture();

    const geometry = new THREE.SphereGeometry(body.radius, 32, 32);
    const material = new THREE.MeshStandardMaterial({
      map: texture,
      color: body.color,
      emissive: body.emissive,
      emissiveIntensity: body.emissiveIntensity,
      roughness: body.roughness,
      metalness: body.metalness,
    });

    this.mesh = new THREE.Mesh(geometry, material);
    this.mesh.castShadow = true;
    this.mesh.receiveShadow = true;
    this.mesh.position.x = orbit.radius;

    this.orbitGroup = new THREE.Group();
    this.orbitGroup.rotation.y = orbit.startAngle ?? 0;
    this.orbitGroup.add(this.mesh);

    const orbitCurve = new THREE.EllipseCurve(0, 0, orbit.radius, orbit.radius, 0, Math.PI * 2);
    const orbitPoints = orbitCurve.getPoints(128);
    const orbitGeometry = new THREE.BufferGeometry().setFromPoints(
      orbitPoints.map((p) => new THREE.Vector3(p.x, 0, p.y)),
    );
    const orbitMaterial = new THREE.LineBasicMaterial({
      color: 0x444466,
      transparent: true,
      opacity: 0.3,
    });
    const orbitLine = new THREE.Line(orbitGeometry, orbitMaterial);
    this.orbitGroup.add(orbitLine);
  }

  addTo(scene: THREE.Scene): void {
    scene.add(this.orbitGroup);
  }

  update(deltaTime: number, _elapsedTime: number): void {
    this.orbitGroup.rotation.y += this.orbitConfig.speed * deltaTime * 30;
    this.mesh.rotation.y += this.config.rotationSpeed * deltaTime * 30;
  }
}
