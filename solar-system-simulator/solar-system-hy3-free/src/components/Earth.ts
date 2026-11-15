import {
  AdditiveBlending,
  BackSide,
  Color,
  Group,
  Mesh,
  MeshBasicMaterial,
  MeshStandardMaterial,
  type Object3D,
  SphereGeometry,
  type Texture,
} from 'three';
import type { Updatable } from '../types/CelestialBody';
import {
  EARTH_AXIAL_TILT,
  EARTH_ORBIT_PERIOD,
  EARTH_ORBIT_RADIUS,
  EARTH_RADIUS,
  EARTH_ROTATION_PERIOD,
} from '../utils/constants';
import { angularVelocity } from '../utils/math';
import { createEarthTexture } from '../utils/proceduralTextures';

/**
 * 地球。太陽を中心に公転し、地軸を傾けて自転する。
 *
 * シーングラフ構造:
 *   revolutionPivot (原点で Y 回転 = 公転)
 *     └ positionGroup (公転半径だけオフセット / 月の取り付け位置)
 *         └ tiltGroup (地軸傾斜)
 *             └ mesh (自転)
 *
 * 月は自転や地軸傾斜の影響を受けないよう positionGroup に取り付ける。
 */
export class Earth implements Updatable {
  readonly object3d: Group;

  private readonly revolutionPivot: Group;
  private readonly positionGroup: Group;
  private readonly mesh: Mesh;
  private readonly geometry: SphereGeometry;
  private readonly material: MeshStandardMaterial;
  private readonly atmosphereGeometry: SphereGeometry;
  private readonly atmosphereMaterial: MeshBasicMaterial;
  private readonly texture: Texture;

  private readonly revolveSpeed = angularVelocity(EARTH_ORBIT_PERIOD);
  private readonly spinSpeed = angularVelocity(EARTH_ROTATION_PERIOD);

  constructor() {
    this.revolutionPivot = new Group();
    this.object3d = this.revolutionPivot;

    this.positionGroup = new Group();
    this.positionGroup.position.set(EARTH_ORBIT_RADIUS, 0, 0);
    this.revolutionPivot.add(this.positionGroup);

    const tiltGroup = new Group();
    tiltGroup.rotation.z = EARTH_AXIAL_TILT;
    this.positionGroup.add(tiltGroup);

    this.texture = createEarthTexture();
    this.geometry = new SphereGeometry(EARTH_RADIUS, 64, 64);
    this.material = new MeshStandardMaterial({
      map: this.texture,
      roughness: 0.85,
      metalness: 0.05,
    });
    this.mesh = new Mesh(this.geometry, this.material);
    this.mesh.castShadow = true;
    this.mesh.receiveShadow = true;
    tiltGroup.add(this.mesh);

    // 大気散乱を模した薄いフレネル風グロー。
    this.atmosphereGeometry = new SphereGeometry(EARTH_RADIUS * 1.06, 48, 48);
    this.atmosphereMaterial = new MeshBasicMaterial({
      color: new Color(0x4a90d9),
      transparent: true,
      opacity: 0.18,
      blending: AdditiveBlending,
      side: BackSide,
      depthWrite: false,
    });
    this.mesh.add(new Mesh(this.atmosphereGeometry, this.atmosphereMaterial));
  }

  /** 月を取り付けるためのアンカー（地球の公転位置、自転非依存）を返す。 */
  getSatelliteAnchor(): Object3D {
    return this.positionGroup;
  }

  update(delta: number): void {
    this.revolutionPivot.rotation.y += this.revolveSpeed * delta;
    this.mesh.rotation.y += this.spinSpeed * delta;
  }

  dispose(): void {
    this.geometry.dispose();
    this.material.dispose();
    this.atmosphereGeometry.dispose();
    this.atmosphereMaterial.dispose();
    this.texture.dispose();
  }
}
