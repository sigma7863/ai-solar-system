import { PerspectiveCamera } from "three";
import { CAMERA } from "../utils/constants";

export function createCamera(): PerspectiveCamera {
  const { fov, near, far, initialPosition } = CAMERA;
  const aspect = window.innerWidth / window.innerHeight;
  const camera = new PerspectiveCamera(fov, aspect, near, far);
  camera.position.set(initialPosition.x, initialPosition.y, initialPosition.z);
  camera.lookAt(0, 0, 0);
  return camera;
}

export function updateCameraAspect(
  camera: PerspectiveCamera,
): void {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
}
