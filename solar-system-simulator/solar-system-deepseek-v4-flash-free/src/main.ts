import { buildSolarSystem, tickSolarSystem } from "./scenes/solar-system";
import { startAnimationLoop } from "./core/animation-loop";
import { updateCameraAspect } from "./core/camera";
import { resizeRenderer } from "./core/renderer";

async function main(): Promise<void> {
  const ctx = await buildSolarSystem();

  window.addEventListener("resize", () => {
    updateCameraAspect(ctx.camera);
    resizeRenderer(ctx.renderer);
  });

  startAnimationLoop(ctx.scene, ctx.camera, ctx.renderer, ctx.controls, (tick) => {
    tickSolarSystem(ctx, tick);
  });
}

main();
