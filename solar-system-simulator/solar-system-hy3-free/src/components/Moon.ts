import { Group, Mesh, MeshStandardMaterial, SphereGeometry, type Texture } from 'three';
import type { Updatable } from '../types/CelestialBody';
import {
  MOON_ORBIT_PERIOD,
  MOON_ORBIT_RADIUS,
  MOON_ORBIT_TILT,
  MOON_RADIUS,
  MOON_ROTATION_PERIOD,
} from '../utils/constants';
import { angularVelocity } from '../utils/math';
import { createMoonTexture } from '../utils/proceduralTextures';

/**
 * 月。地球を中心に公転し、潮汐ロックを模して公転と同周期で自転する
 * （常に同じ面を地球へ向ける）。
 *
 * シーングラフ構造:
 *   revolutionPivot (地球アンカーに追加され Y 回転 = 公転)
 *     └ positionGroup (公転半径だけオフセット)
 *         └ mesh (自転)
 *
 * revolutionPivot は軌道傾斜のため X 軸を少し傾けている。
 */
export class Moon implements Updatable {
  readonly object3d: Group;

  private readonly revolutionPivot: Group;
  private readonly mesh: Mesh;
  private readonly geometry: SphereGeometry;
  private readonly material: MeshStandardMaterial;
  private readonly texture: Texture;

  private readonly revolveSpeed = angularVelocity(MOON_ORBIT_PERIOD);
  private readonly spinSpeed = angularVelocity(MOON_ROTATION_PERIOD);

  constructor() {
    this.revolutionPivot = new Group();
    this.revolutionPivot.rotation.x = MOON_ORBIT_TILT;
    this.object3d = this.revolutionPivot;

    const positionGroup = new Group();
    positionGroup.position.set(MOON_ORBIT_RADIUS, 0, 0);
    this.revolutionPivot.add(positionGroup);

    this.texture = createMoonTexture();
    this.geometry = new SphereGeometry(MOON_RADIUS, 48, 48);
    this.material = new MeshStandardMaterial({
      map: this.texture,
      roughness: 0.95,
      metalness: 0,
    });
    this.mesh = new Mesh(this.geometry, this.material);
    this.mesh.castShadow = true;
    this.mesh.receiveShadow = true;
    positionGroup.add(this.mesh);
  }

  update(delta: number): void {
    this.revolutionPivot.rotation.y += this.revolveSpeed * delta;
    this.mesh.rotation.y += this.spinSpeed * delta;
  }

  dispose(): void {
    this.geometry.dispose();
    this.material.dispose();
    this.texture.dispose();
  }
}
