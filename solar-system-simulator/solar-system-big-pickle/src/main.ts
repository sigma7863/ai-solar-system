import { createScene } from "./core/scene";
import { createCamera, updateCameraAspect } from "./core/camera";
import { createRenderer, updateRendererSize } from "./core/renderer";
import { AnimationLoop } from "./core/loop";
import { SolarSystem } from "./scenes/solar-system";

function main(): void {
  const scene = createScene();
  const camera = createCamera();
  const renderer = createRenderer();

  const solarSystem = new SolarSystem(scene, camera);

  const loop = new AnimationLoop();
  loop.add(solarSystem);
  loop.start(renderer, scene, camera);

  window.addEventListener("resize", () => {
    updateCameraAspect(camera);
    updateRendererSize(renderer);
  });
}

main();
