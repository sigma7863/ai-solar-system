import * as THREE from "three";

export interface Updateable {
  update(deltaTime: number, elapsedTime: number): void;
}

export class AnimationLoop {
  private clock: THREE.Clock;
  private running: boolean;
  private updateables: Updateable[];

  constructor() {
    this.clock = new THREE.Clock();
    this.running = false;
    this.updateables = [];
  }

  add(updateable: Updateable): void {
    this.updateables.push(updateable);
  }

  start(renderer: THREE.WebGLRenderer, scene: THREE.Scene, camera: THREE.Camera): void {
    this.running = true;
    this.clock.start();

    const tick = () => {
      if (!this.running) return;

      const deltaTime = Math.min(this.clock.getDelta(), 0.05);
      const elapsedTime = this.clock.elapsedTime;

      for (const updateable of this.updateables) {
        updateable.update(deltaTime, elapsedTime);
      }

      renderer.render(scene, camera);
      requestAnimationFrame(tick);
    };

    tick();
  }

  stop(): void {
    this.running = false;
  }
}
