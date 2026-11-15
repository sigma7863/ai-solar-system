import * as THREE from "three";
import { CAMERA_CONFIG } from "../utils/constants";

export function createCamera(): THREE.PerspectiveCamera {
  const aspect = window.innerWidth / window.innerHeight;
  const camera = new THREE.PerspectiveCamera(
    CAMERA_CONFIG.fov,
    aspect,
    CAMERA_CONFIG.near,
    CAMERA_CONFIG.far,
  );
  camera.position.set(
    CAMERA_CONFIG.initialPosition.x,
    CAMERA_CONFIG.initialPosition.y,
    CAMERA_CONFIG.initialPosition.z,
  );
  camera.lookAt(0, 0, 0);
  return camera;
}

export function updateCameraAspect(camera: THREE.PerspectiveCamera): void {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
}
