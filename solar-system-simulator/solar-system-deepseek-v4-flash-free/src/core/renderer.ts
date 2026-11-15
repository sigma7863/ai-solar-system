import { WebGLRenderer, type WebGLRendererParameters } from "three";

export function createRenderer(
  parameters?: WebGLRendererParameters,
): WebGLRenderer {
  const renderer = new WebGLRenderer({
    antialias: true,
    alpha: false,
    ...parameters,
  });

  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = 1; // PCFSoftShadowMap
  renderer.toneMapping = 3; // ACESFilmicToneMapping
  renderer.toneMappingExposure = 1.2;

  return renderer;
}

export function resizeRenderer(renderer: WebGLRenderer): void {
  renderer.setSize(window.innerWidth, window.innerHeight);
}
