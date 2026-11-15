import * as THREE from 'three';
import { createStarField } from '@/utils/StarField';
import { createLights } from '@/utils/Lighting';
import { createSun, createEarth, createMoon } from '@/components/CelestialBodies';
import { createOrbitLine } from '@/components/OrbitLine';
import type { CelestialBody } from '@/components/CelestialBodies';

export interface SolarSystem {
  scene: THREE.Scene;
  bodies: CelestialBody[];
  update(delta: number): void;
  dispose(): void;
}

export function createSolarSystem(scene: THREE.Scene): SolarSystem {
  const starField = createStarField(15000);
  scene.add(starField);

  const { pointLight, ambientLight } = createLights();
  scene.add(pointLight);
  scene.add(ambientLight);

  const sun = createSun();
  const earth = createEarth();
  const moon = createMoon();

  earth.pivot.add(moon.pivot);

  scene.add(sun.pivot);
  scene.add(earth.pivot);

  const earthOrbitLine = createOrbitLine(35, 0x2244aa);
  scene.add(earthOrbitLine);

  const moonOrbitPivot = new THREE.Object3D();
  moonOrbitPivot.add(earth.pivot);

  const bodies = [sun, earth, moon];

  return {
    scene,
    bodies,
    update(delta: number) {
      for (const body of bodies) {
        body.update(delta);
      }
    },
    dispose() {
      starField.geometry.dispose();
      (starField.material as THREE.Material).dispose();
      pointLight.dispose();
      ambientLight.dispose();

      for (const body of bodies) {
        body.mesh.geometry.dispose();
        if (Array.isArray(body.mesh.material)) {
          body.mesh.material.forEach((m) => m.dispose());
        } else {
          body.mesh.material.dispose();
        }
      }

      earthOrbitLine.geometry.dispose();
      (earthOrbitLine.material as THREE.Material).dispose();
    },
  };
}
