import { Clock, PerspectiveCamera, type Scene, type WebGLRenderer } from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { createRenderer } from './Renderer';
import { ResizeHandler } from './ResizeHandler';

/** フレームごとに呼ばれる更新コールバック。 */
export type UpdateCallback = (delta: number, elapsed: number) => void;

/**
 * 描画基盤（レンダラ・カメラ・コントロール・ループ）を統括するエンジン。
 *
 * 個々の天体やシーン構成には関知せず、「毎フレーム更新して描画する」
 * という責務のみを持つ。シーン固有のロジックは onUpdate に注入する。
 */
export class Engine {
  readonly renderer: WebGLRenderer;
  readonly camera: PerspectiveCamera;
  readonly controls: OrbitControls;

  private readonly scene: Scene;
  private readonly clock = new Clock();
  private readonly resizeHandler: ResizeHandler;
  private onUpdate: UpdateCallback | null = null;
  private animationId = 0;

  constructor(canvas: HTMLCanvasElement, scene: Scene) {
    this.scene = scene;
    this.renderer = createRenderer(canvas);

    this.camera = new PerspectiveCamera(
      45,
      window.innerWidth / window.innerHeight,
      0.1,
      2000,
    );
    this.camera.position.set(0, 26, 70);

    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.controls.enableDamping = true;
    this.controls.dampingFactor = 0.06;
    this.controls.minDistance = 12;
    this.controls.maxDistance = 400;
    this.controls.enablePan = true;

    this.resizeHandler = new ResizeHandler(this.camera, this.renderer);
  }

  /** フレームごとの更新処理を登録する。 */
  setUpdate(callback: UpdateCallback): void {
    this.onUpdate = callback;
  }

  /** レンダリングループを開始する。 */
  start(): void {
    this.clock.start();
    this.renderer.setAnimationLoop(this.tick);
  }

  /** レンダリングループを停止する。 */
  stop(): void {
    this.renderer.setAnimationLoop(null);
    cancelAnimationFrame(this.animationId);
  }

  private readonly tick = (): void => {
    // delta を使い、フレームレートに依存しない一定速度の運動を保証する。
    const delta = this.clock.getDelta();
    const elapsed = this.clock.getElapsedTime();

    this.onUpdate?.(delta, elapsed);
    this.controls.update();
    this.renderer.render(this.scene, this.camera);
  };

  /** リソースとイベントリスナを解放する。 */
  dispose(): void {
    this.stop();
    this.resizeHandler.dispose();
    this.controls.dispose();
    this.renderer.dispose();
  }
}
