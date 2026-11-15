import { Vector3, Spherical, MathUtils } from 'three';

export function sphericalToCartesian(radius: number, phi: number, theta: number): Vector3 {
  const spherical = new Spherical(radius, phi, theta);
  return new Vector3().setFromSpherical(spherical);
}

export function cartesianToSpherical(vector: Vector3): Spherical {
  return new Spherical().setFromVector3(vector);
}

export function lerp(start: number, end: number, t: number): number {
  return start + (end - start) * t;
}

export function lerpVector3(start: Vector3, end: Vector3, t: number): Vector3 {
  return start.clone().lerp(end, t);
}

export function clamp(value: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, value));
}

export function degToRad(degrees: number): number {
  return MathUtils.degToRad(degrees);
}

export function radToDeg(radians: number): number {
  return MathUtils.radToDeg(radians);
}

export function normalizeAngle(angle: number): number {
  while (angle < 0) angle += Math.PI * 2;
  while (angle >= Math.PI * 2) angle -= Math.PI * 2;
  return angle;
}

export function randomInRange(min: number, max: number): number {
  return Math.random() * (max - min) + min;
}

export function generateStarField(count: number, radius: number): Vector3[] {
  const stars: Vector3[] = [];
  for (let i = 0; i < count; i++) {
    const theta = randomInRange(0, Math.PI * 2);
    const phi = Math.acos(randomInRange(-1, 1));
    const r = radius * Math.cbrt(randomInRange(0, 1));
    stars.push(sphericalToCartesian(r, phi, theta));
  }
  return stars;
}

export function calculateOrbitalPosition(
  distance: number,
  orbitalPeriod: number,
  time: number,
  initialAngle: number = 0
): Vector3 {
  const speed = (Math.PI * 2) / orbitalPeriod;
  const angle = initialAngle + speed * time;
  return sphericalToCartesian(distance, Math.PI / 2, angle);
}

export function calculateRotationAngle(rotationPeriod: number, time: number, initialAngle: number = 0): number {
  const speed = (Math.PI * 2) / rotationPeriod;
  return initialAngle + speed * time;
}