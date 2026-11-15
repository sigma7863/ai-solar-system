import type { PerspectiveCamera, WebGLRenderer } from 'three';

/**
 * ウィンドウリサイズに応じてカメラのアスペクト比とレンダラサイズを
 * 追従させるハンドラ。`dispose` でリスナを解除できる。
 */
export class ResizeHandler {
  private readonly camera: PerspectiveCamera;
  private readonly renderer: WebGLRenderer;

  constructor(camera: PerspectiveCamera, renderer: WebGLRenderer) {
    this.camera = camera;
    this.renderer = renderer;
    window.addEventListener('resize', this.handleResize);
  }

  private readonly handleResize = (): void => {
    const width = window.innerWidth;
    const height = window.innerHeight;

    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();

    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.setSize(width, height);
  };

  dispose(): void {
    window.removeEventListener('resize', this.handleResize);
  }
}
