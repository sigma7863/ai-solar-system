import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

export function createControls(
  camera: THREE.PerspectiveCamera,
  canvas: HTMLElement,
): OrbitControls {
  const controls = new OrbitControls(camera, canvas);

  controls.enableDamping = true;
  controls.dampingFactor = 0.05;
  controls.minDistance = 20;
  controls.maxDistance = 500;
  controls.enablePan = true;
  controls.panSpeed = 0.5;
  controls.rotateSpeed = 0.5;
  controls.zoomSpeed = 1.0;

  return controls;
}
