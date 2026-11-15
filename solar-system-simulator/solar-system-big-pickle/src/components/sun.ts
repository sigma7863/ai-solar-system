import * as THREE from "three";
import type { CelestialBodyConfig } from "../types";
import { createSunTexture } from "../utils/textures";

export class Sun {
  readonly mesh: THREE.Mesh;
  readonly light: THREE.PointLight;
  private readonly config: CelestialBodyConfig;
  private readonly glowMesh: THREE.Mesh;

  constructor(config: CelestialBodyConfig) {
    this.config = config;

    const texture = createSunTexture();

    const geometry = new THREE.SphereGeometry(config.radius, 48, 48);
    const material = new THREE.MeshStandardMaterial({
      map: texture,
      color: config.color,
      emissive: config.emissive,
      emissiveIntensity: config.emissiveIntensity ?? 0,
      emissiveMap: texture,
      roughness: config.roughness,
      metalness: config.metalness,
    });

    this.mesh = new THREE.Mesh(geometry, material);
    this.mesh.castShadow = false;
    this.mesh.receiveShadow = false;

    this.light = new THREE.PointLight(0xffeedd, 2.0, 200);
    this.light.position.set(0, 0, 0);
    this.light.castShadow = true;
    this.light.shadow.mapSize.width = 2048;
    this.light.shadow.mapSize.height = 2048;

    const glowGeometry = new THREE.SphereGeometry(config.radius * 1.15, 32, 32);
    const glowMaterial = new THREE.MeshBasicMaterial({
      color: config.emissive,
      transparent: true,
      opacity: 0.15,
      depthWrite: false,
    });
    this.glowMesh = new THREE.Mesh(glowGeometry, glowMaterial);
  }

  addTo(scene: THREE.Scene): void {
    scene.add(this.mesh);
    scene.add(this.light);
    scene.add(this.glowMesh);
  }

  update(deltaTime: number, _elapsedTime: number): void {
    this.mesh.rotation.y += this.config.rotationSpeed * deltaTime * 30;
    this.glowMesh.rotation.y -= this.config.rotationSpeed * deltaTime * 20;
    this.glowMesh.position.copy(this.mesh.position);
  }
}
