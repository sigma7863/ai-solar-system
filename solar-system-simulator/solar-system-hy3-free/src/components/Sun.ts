import {
  AdditiveBlending,
  BackSide,
  Color,
  Group,
  Mesh,
  MeshBasicMaterial,
  MeshStandardMaterial,
  PointLight,
  SphereGeometry,
  type Texture,
} from 'three';
import type { Updatable } from '../types/CelestialBody';
import { SUN_RADIUS, SUN_ROTATION_PERIOD } from '../utils/constants';
import { angularVelocity } from '../utils/math';
import { createSunTexture } from '../utils/proceduralTextures';

/**
 * 太陽。自ら発光する天体であり、系全体の唯一の主光源（PointLight）を内包する。
 *
 * - 表面: emissiveMap により対流セル状の白熱表現。ライティングを受けない。
 * - グロー: BackSide + AdditiveBlending の外殻でコロナのにじみを表現。
 * - 光源: 影を落とす PointLight を中心に配置。
 */
export class Sun implements Updatable {
  readonly object3d: Group;
  readonly light: PointLight;

  private readonly mesh: Mesh;
  private readonly geometry: SphereGeometry;
  private readonly glowGeometry: SphereGeometry;
  private readonly material: MeshStandardMaterial;
  private readonly glowMaterial: MeshBasicMaterial;
  private readonly texture: Texture;
  private readonly spinSpeed = angularVelocity(SUN_ROTATION_PERIOD);

  constructor() {
    this.object3d = new Group();

    this.texture = createSunTexture();
    this.geometry = new SphereGeometry(SUN_RADIUS, 64, 64);
    this.material = new MeshStandardMaterial({
      emissive: new Color(0xffaa33),
      emissiveMap: this.texture,
      emissiveIntensity: 1.6,
      // 発光体なので拡散・鏡面反射は不要。真っ黒にして emissive のみで魅せる。
      color: new Color(0x000000),
      roughness: 1,
      metalness: 0,
    });
    this.mesh = new Mesh(this.geometry, this.material);
    this.object3d.add(this.mesh);

    // コロナ風グロー外殻。
    this.glowGeometry = new SphereGeometry(SUN_RADIUS * 1.28, 32, 32);
    this.glowMaterial = new MeshBasicMaterial({
      color: new Color(0xffcc66),
      transparent: true,
      opacity: 0.28,
      blending: AdditiveBlending,
      side: BackSide,
      depthWrite: false,
    });
    this.object3d.add(new Mesh(this.glowGeometry, this.glowMaterial));

    // 主光源。距離減衰を持たせつつ全体に届く強度に調整。
    this.light = new PointLight(0xfff2e0, 3.2, 0, 1.4);
    this.light.castShadow = true;
    this.light.shadow.mapSize.set(2048, 2048);
    this.light.shadow.camera.near = 1;
    this.light.shadow.camera.far = 220;
    this.light.shadow.bias = -0.0005;
    this.object3d.add(this.light);
  }

  update(delta: number): void {
    this.mesh.rotation.y += this.spinSpeed * delta;
  }

  dispose(): void {
    this.geometry.dispose();
    this.glowGeometry.dispose();
    this.material.dispose();
    this.glowMaterial.dispose();
    this.texture.dispose();
  }
}
