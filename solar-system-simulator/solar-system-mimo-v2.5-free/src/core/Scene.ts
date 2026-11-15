import * as THREE from 'three';

export function createScene(): THREE.Scene {
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0x000010);
  scene.fog = new THREE.FogExp2(0x000010, 0.0002);

  return scene;
}
