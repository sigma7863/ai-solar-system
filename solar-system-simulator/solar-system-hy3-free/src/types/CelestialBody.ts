import type { Object3D } from 'three';

/**
 * 時間で状態を更新できる天体（またはシーン構成要素）の共通インターフェース。
 *
 * すべての可視オブジェクトは `object3d` を通じてシーンへ追加され、
 * `update` でフレームごとのアニメーションを進める。
 * `dispose` は GPU リソースの解放に用いる。
 */
export interface Updatable {
  /** Three.js のシーングラフに追加するルートオブジェクト。 */
  readonly object3d: Object3D;

  /**
   * フレームごとに呼ばれる更新処理。
   *
   * @param delta 前フレームからの経過秒数
   * @param elapsed アプリ開始からの累積秒数
   */
  update(delta: number, elapsed: number): void;

  /** ジオメトリ・マテリアル等の GPU リソースを解放する。 */
  dispose(): void;
}
