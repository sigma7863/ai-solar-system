import type { WebGLRenderer, PerspectiveCamera, Scene } from "three";
import type { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import type { TickContext } from "../utils/types";

export type TickFn = (ctx: TickContext) => void;

export function startAnimationLoop(
  scene: Scene,
  camera: PerspectiveCamera,
  renderer: WebGLRenderer,
  controls: OrbitControls,
  onTick: TickFn,
): void {
  const clock = { start: performance.now(), prev: performance.now() };

  function loop(): void {
    const now = performance.now();
    const elapsed = (now - clock.start) / 1000;
    const delta = Math.min((now - clock.prev) / 1000, 0.05);

    clock.prev = now;

    controls.update();
    onTick({ delta, elapsed });
    renderer.render(scene, camera);

    requestAnimationFrame(loop);
  }

  loop();
}
