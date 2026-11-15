import {
  Scene,
  Mesh,
  SphereGeometry,
  MeshBasicMaterial,
  BackSide,
  Float32Array,
  Color,
} from 'three';
import { CelestialBodyConfig, SolarSystemConfig } from '../types/config';

export class SceneManager {
  private scene: Scene;
  private config: SolarSystemConfig;
  private starField: Mesh | null = null;

  constructor(config: SolarSystemConfig) {
    this.config = config;
    this.scene = new Scene();
    this.scene.background = new Color(0x000000);
    this.initializeEnvironment();
  }

  public getScene(): Scene {
    return this.scene;
  }

  private initializeEnvironment(): void {
    this.createStarField();
    this.createSunGlow();
  }

  private createStarField(): void {
    const geometry = new SphereGeometry(500, 64, 64);
    const material = new MeshBasicMaterial({
      color: 0xffffff,
      side: BackSide,
      transparent: true,
      opacity: 0.6,
      vertexColors: true,
    });

    const positions = geometry.attributes.position;
    const colors = new Float32Array(positions.count * 3);

    for (let i = 0; i < positions.count; i++) {
      const intensity = 0.3 + Math.random() * 0.7;
      const variation = Math.random();
      colors[i * 3] = intensity * (0.9 + variation * 0.2);
      colors[i * 3 + 1] = intensity * (0.85 + variation * 0.2);
      colors[i * 3 + 2] = intensity * (0.7 + variation * 0.3);
    }

    geometry.setAttribute('color', new Float32Array(colors));
    geometry.attributes.color.needsUpdate = true;

    this.starField = new Mesh(geometry, material);
    this.scene.add(this.starField);
  }

  private createSunGlow(): void {
    const geometry = new SphereGeometry(this.config.star.radius * 1.8, 32, 32);
    const material = new MeshBasicMaterial({
      color: this.config.star.color,
      transparent: true,
      opacity: 0.12,
      side: BackSide,
      depthWrite: false,
    });
    const glow = new Mesh(geometry, material);
    glow.name = 'sun-glow';
    this.scene.add(glow);
  }

  public update(deltaTime: number, elapsedTime: number): void {
    if (this.starField) {
      this.starField.rotation.y += deltaTime * 0.00002;
      this.starField.rotation.x += deltaTime * 0.00001;
    }

    const glow = this.scene.getObjectByName('sun-glow');
    if (glow) {
      const pulse = 1 + Math.sin(elapsedTime * 0.8) * 0.08;
      glow.scale.setScalar(pulse);
    }
  }

  public dispose(): void {
    if (this.starField) {
      this.starField.geometry.dispose();
      (this.starField.material as any).dispose();
      this.scene.remove(this.starField);
      this.starField = null;
    }

    const glow = this.scene.getObjectByName('sun-glow');
    if (glow) {
      glow.geometry.dispose();
      (glow.material as any).dispose();
      this.scene.remove(glow);
    }
  }
}