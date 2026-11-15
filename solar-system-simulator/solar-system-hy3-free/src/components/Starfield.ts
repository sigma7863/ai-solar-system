import {
  AdditiveBlending,
  BufferAttribute,
  BufferGeometry,
  Color,
  Points,
  PointsMaterial,
} from 'three';
import type { Updatable } from '../types/CelestialBody';
import { STAR_COUNT, STARFIELD_RADIUS } from '../utils/constants';

/**
 * 星空の背景。半径 STARFIELD_RADIUS の球殻上に星を分布させた Points。
 *
 * - 球面上の一様分布を得るため、方向ベクトルを正規分布近似で生成する。
 * - 星ごとに明るさ（白〜わずかに青/橙）と大きさを揺らして自然さを出す。
 * - 全体を極めてゆっくり回転させ、静的な背景に微かな生気を与える。
 */
export class Starfield implements Updatable {
  readonly object3d: Points;

  private readonly geometry: BufferGeometry;
  private readonly material: PointsMaterial;

  constructor() {
    this.geometry = new BufferGeometry();

    const positions = new Float32Array(STAR_COUNT * 3);
    const colors = new Float32Array(STAR_COUNT * 3);
    const color = new Color();

    for (let i = 0; i < STAR_COUNT; i++) {
      // 球面上の一様ランダム方向。
      const u = Math.random() * 2 - 1;
      const theta = Math.random() * Math.PI * 2;
      const r = Math.sqrt(1 - u * u);

      // 距離に僅かな揺らぎを与え、奥行き感を出す。
      const dist = STARFIELD_RADIUS * (0.85 + Math.random() * 0.15);
      const idx = i * 3;
      positions[idx] = r * Math.cos(theta) * dist;
      positions[idx + 1] = u * dist;
      positions[idx + 2] = r * Math.sin(theta) * dist;

      // 色温度の揺らぎ。大半は白、たまに青白/橙。
      const hue = 0.55 + (Math.random() - 0.5) * 0.1;
      const saturation = Math.random() * 0.25;
      const lightness = 0.7 + Math.random() * 0.3;
      color.setHSL(hue, saturation, lightness);
      colors[idx] = color.r;
      colors[idx + 1] = color.g;
      colors[idx + 2] = color.b;
    }

    this.geometry.setAttribute('position', new BufferAttribute(positions, 3));
    this.geometry.setAttribute('color', new BufferAttribute(colors, 3));

    this.material = new PointsMaterial({
      size: 1.6,
      sizeAttenuation: true,
      vertexColors: true,
      transparent: true,
      opacity: 0.9,
      blending: AdditiveBlending,
      depthWrite: false,
    });

    this.object3d = new Points(this.geometry, this.material);
    // 背景は影・ライティングの計算対象外にする。
    this.object3d.matrixAutoUpdate = true;
  }

  update(delta: number): void {
    this.object3d.rotation.y += delta * 0.005;
  }

  dispose(): void {
    this.geometry.dispose();
    this.material.dispose();
  }
}
