import { AmbientLight, Color, Scene } from 'three';
import { Earth } from '../components/Earth';
import { Moon } from '../components/Moon';
import { Starfield } from '../components/Starfield';
import { Sun } from '../components/Sun';
import type { Updatable } from '../types/CelestialBody';

/**
 * 太陽系全体を組み立てるシーン。
 *
 * 各天体の生成・親子関係の構築・ライティング配置を担当し、
 * フレーム更新は保持する Updatable 群へ委譲する。
 * 描画ループ（Engine）とは疎結合で、`scene` と `update` のみを公開する。
 */
export class SolarSystemScene {
  readonly scene: Scene;

  private readonly sun: Sun;
  private readonly earth: Earth;
  private readonly moon: Moon;
  private readonly starfield: Starfield;
  private readonly updatables: readonly Updatable[];

  constructor() {
    this.scene = new Scene();
    this.scene.background = new Color(0x01020a);

    // 弱い環境光。影側が完全な黒に潰れないよう最小限に留める。
    const ambient = new AmbientLight(0x2a3550, 0.18);
    this.scene.add(ambient);

    this.sun = new Sun();
    this.earth = new Earth();
    this.moon = new Moon();
    this.starfield = new Starfield();

    // 月は地球の公転位置（自転非依存アンカー）へ取り付ける。
    this.earth.getSatelliteAnchor().add(this.moon.object3d);

    this.scene.add(this.sun.object3d);
    this.scene.add(this.earth.object3d);
    this.scene.add(this.starfield.object3d);

    this.updatables = [this.sun, this.earth, this.moon, this.starfield];
  }

  /** 全 Updatable を1フレーム分進める。 */
  update(delta: number, elapsed: number): void {
    for (const item of this.updatables) {
      item.update(delta, elapsed);
    }
  }

  /** 保持する全リソースを解放する。 */
  dispose(): void {
    for (const item of this.updatables) {
      item.dispose();
    }
  }
}
