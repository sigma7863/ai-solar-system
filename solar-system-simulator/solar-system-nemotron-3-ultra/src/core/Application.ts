import { WebGLRenderer, Scene, PerspectiveCamera, Clock } from 'three';
import type { AppConfig } from '../types';
import { APP_CONFIG } from '../utils/constants';
import { SceneManager } from './SceneManager';
import { InputManager } from './InputManager';
import { UIManager } from './UIManager';
import { CelestialBodyManager } from './CelestialBodyManager';

export class Application {
  private renderer: WebGLRenderer;
  private scene: Scene;
  private camera: PerspectiveCamera;
  private clock: Clock;
  private config: AppConfig;
  private sceneManager: SceneManager;
  private inputManager: InputManager;
  private uiManager: UIManager;
  private celestialBodyManager: CelestialBodyManager;
  private animationId: number | null = null;
  private lastTime: number = 0;
  private isRunning: boolean = false;

  constructor() {
    this.config = APP_CONFIG;
    this.clock = new Clock();

    this.renderer = this.createRenderer();
    this.scene = new Scene();
    this.camera = this.createCamera();

    this.sceneManager = new SceneManager(this.scene, this.renderer, this.camera, this.config);
    this.inputManager = new InputManager(this.camera, this.renderer.domElement, this.config);
    this.uiManager = new UIManager(this.config);
    this.celestialBodyManager = new CelestialBodyManager(this.scene, this.config);

    this.setupEventListeners();
  }

  private createRenderer(): WebGLRenderer {
    const renderer = new WebGLRenderer({
      antialias: true,
      alpha: false,
      powerPreference: 'high-performance',
      stencil: false,
      depth: true,
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = 1;
    renderer.toneMapping = 1;
    renderer.toneMappingExposure = 1.0;
    renderer.outputColorSpace = 'srgb';
    return renderer;
  }

  private createCamera(): PerspectiveCamera {
    const aspect = window.innerWidth / window.innerHeight;
    const camera = new PerspectiveCamera(45, aspect, 0.1, 1000);
    camera.position.set(0, this.config.camera.initialDistance, this.config.camera.initialDistance);
    camera.lookAt(0, 0, 0);
    return camera;
  }

  private setupEventListeners(): void {
    window.addEventListener('resize', this.onResize.bind(this));
    this.uiManager.onSpeedChange((speed: number) => {
      this.config.animation.timeScale = speed;
    });
    this.uiManager.onPauseToggle((paused: boolean) => {
      this.config.animation.paused = paused;
      if (!paused) this.lastTime = performance.now();
    });
  }

  private onResize(): void {
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  }

  public start(): void {
    if (this.isRunning) return;
    this.isRunning = true;
    this.lastTime = performance.now();
    this.animate();
  }

  public stop(): void {
    this.isRunning = false;
    if (this.animationId !== null) {
      cancelAnimationFrame(this.animationId);
      this.animationId = null;
    }
  }

  private animate = (currentTime: number): void => {
    this.animationId = requestAnimationFrame(this.animate);

    if (!this.isRunning || this.config.animation.paused) {
      this.render();
      return;
    }

    const deltaTime = (currentTime - this.lastTime) / 1000;
    this.lastTime = currentTime;

    const scaledDelta = deltaTime * this.config.animation.timeScale;

    this.celestialBodyManager.update(scaledDelta);
    this.inputManager.update();
    this.uiManager.update(this.celestialBodyManager.getFocusedBody());
    this.render();
  };

  private render(): void {
    this.renderer.render(this.scene, this.camera);
  }

  public getCanvas(): HTMLCanvasElement {
    return this.renderer.domElement;
  }

  public dispose(): void {
    this.stop();
    window.removeEventListener('resize', this.onResize.bind(this));
    this.renderer.dispose();
    this.sceneManager.dispose();
    this.celestialBodyManager.dispose();
    this.inputManager.dispose();
    this.uiManager.dispose();
  }
}