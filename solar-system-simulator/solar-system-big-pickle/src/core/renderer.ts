import * as THREE from "three";
import { RENDERER_CONFIG } from "../utils/constants";

export function createRenderer(): THREE.WebGLRenderer {
  const renderer = new THREE.WebGLRenderer({
    antialias: RENDERER_CONFIG.antialias,
    powerPreference: "high-performance",
  });

  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(RENDERER_CONFIG.pixelRatio);
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.0;

  document.body.appendChild(renderer.domElement);

  return renderer;
}

export function updateRendererSize(renderer: THREE.WebGLRenderer): void {
  renderer.setSize(window.innerWidth, window.innerHeight);
}
