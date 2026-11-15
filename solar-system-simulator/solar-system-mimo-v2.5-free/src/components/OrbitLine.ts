import * as THREE from 'three';

export function createOrbitLine(radius: number, color: number = 0x333366): THREE.Line {
  const segments = 128;
  const points: THREE.Vector3[] = [];

  for (let i = 0; i <= segments; i++) {
    const angle = (i / segments) * Math.PI * 2;
    points.push(new THREE.Vector3(
      Math.cos(angle) * radius,
      0,
      Math.sin(angle) * radius,
    ));
  }

  const geometry = new THREE.BufferGeometry().setFromPoints(points);
  const material = new THREE.LineBasicMaterial({
    color,
    transparent: true,
    opacity: 0.3,
    depthWrite: false,
  });

  return new THREE.Line(geometry, material);
}
