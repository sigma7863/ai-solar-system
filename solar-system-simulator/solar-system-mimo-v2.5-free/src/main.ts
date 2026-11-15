import * as THREE from 'three';
import { createRenderer } from '@/core/Renderer';
import { createCamera, updateCameraAspect } from '@/core/Camera';
import { createScene } from '@/core/Scene';
import { createControls } from '@/core/Controls';
import { createSolarSystem } from '@/scenes/SolarSystem';

export class App {
  private renderer: THREE.WebGLRenderer;
  private camera: THREE.PerspectiveCamera;
  private scene: THREE.Scene;
  private controls: ReturnType<typeof createControls>;
  private solarSystem: ReturnType<typeof createSolarSystem>;
  private clock: THREE.Clock;
  private animationId: number = 0;

  constructor(container: HTMLElement) {
    this.renderer = createRenderer(container);
    this.camera = createCamera();
    this.scene = createScene();
    this.controls = createControls(this.camera, this.renderer.domElement);
    this.solarSystem = createSolarSystem(this.scene);
    this.clock = new THREE.Clock();

    this.setupResizeHandler();
    this.animate();
  }

  private setupResizeHandler(): void {
    window.addEventListener('resize', () => {
      const width = window.innerWidth;
      const height = window.innerHeight;

      updateCameraAspect(this.camera, width, height);
      this.renderer.setSize(width, height);
    });
  }

  private animate = (): void => {
    this.animationId = requestAnimationFrame(this.animate);

    const delta = this.clock.getDelta();
    const clampedDelta = Math.min(delta, 0.1);

    this.solarSystem.update(clampedDelta);
    this.controls.update();
    this.renderer.render(this.scene, this.camera);
  };

  dispose(): void {
    cancelAnimationFrame(this.animationId);
    this.solarSystem.dispose();
    this.renderer.dispose();
    this.controls.dispose();
  }
}
