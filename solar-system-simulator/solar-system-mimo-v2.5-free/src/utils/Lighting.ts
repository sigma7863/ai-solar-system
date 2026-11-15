import * as THREE from 'three';

export interface LightSetup {
  pointLight: THREE.PointLight;
  ambientLight: THREE.AmbientLight;
}

export function createLights(): LightSetup {
  const pointLight = new THREE.PointLight(0xffffff, 2.5, 1000, 0.5);
  pointLight.position.set(0, 0, 0);
  pointLight.castShadow = true;
  pointLight.shadow.mapSize.width = 2048;
  pointLight.shadow.mapSize.height = 2048;
  pointLight.shadow.camera.near = 0.1;
  pointLight.shadow.camera.far = 500;
  pointLight.shadow.bias = -0.001;
  pointLight.shadow.radius = 4;

  const ambientLight = new THREE.AmbientLight(0x404060, 0.15);

  return { pointLight, ambientLight };
}
