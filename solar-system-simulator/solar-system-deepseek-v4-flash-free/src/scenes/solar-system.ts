import {
  AmbientLight,
  PointLight,
  Group,
  type Scene,
  type PerspectiveCamera,
  type WebGLRenderer,
} from "three";
import type { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { createScene } from "../core/scene";
import { createCamera } from "../core/camera";
import { createRenderer } from "../core/renderer";
import { createSun } from "../components/sun";
import { createPlanet } from "../components/planet";
import { createStarfield } from "../components/starfield";
import { EARTH, MOON, LIGHT, SUN } from "../utils/constants";
import type { TickContext } from "../utils/types";

export interface SolarSystemContext {
  scene: Scene;
  camera: PerspectiveCamera;
  renderer: WebGLRenderer;
  controls: OrbitControls;
  sunGroup: Group;
  earthRevolution: Group;
  earthRotation: Group;
  moonRevolution: Group;
  moonRotation: Group;
}

export async function buildSolarSystem(): Promise<SolarSystemContext> {
  const scene = createScene();
  const camera = createCamera();
  const renderer = createRenderer();

  const ambient = new AmbientLight(0x222244, LIGHT.ambientIntensity);
  scene.add(ambient);

  const sunGroup = createSun();
  scene.add(sunGroup);

  const sunLight = new PointLight(
    0xffeedd,
    LIGHT.pointIntensity,
    LIGHT.pointDistance,
  );
  sunLight.position.set(0, 0, 0);
  sunLight.castShadow = true;
  sunLight.shadow.mapSize.width = 1024;
  sunLight.shadow.mapSize.height = 1024;
  scene.add(sunLight);

  const earth = createPlanet(EARTH);
  scene.add(earth.revolutionPivot);

  const moon = createPlanet({ ...MOON, orbitRadius: MOON.orbitRadius });
  earth.rotationPivot.add(moon.revolutionPivot);
  moon.revolutionPivot.position.x = 0;

  const starfield = createStarfield();
  scene.add(starfield);

  document.body.appendChild(renderer.domElement);

  const { OrbitControls: Controls } = await import(
    "three/examples/jsm/controls/OrbitControls.js"
  );
  const controls = new Controls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.dampingFactor = 0.08;
  controls.minDistance = 8;
  controls.maxDistance = 100;

  return {
    scene,
    camera,
    renderer,
    controls,
    sunGroup,
    earthRevolution: earth.revolutionPivot,
    earthRotation: earth.rotationPivot,
    moonRevolution: moon.revolutionPivot,
    moonRotation: moon.rotationPivot,
  };
}

export function tickSolarSystem(
  ctx: SolarSystemContext,
  tick: TickContext,
): void {
  const deltaFactor = tick.delta * 60;

  ctx.sunGroup.rotation.y += SUN.rotationSpeed * deltaFactor;
  ctx.earthRevolution.rotation.y += EARTH.revolutionSpeed * deltaFactor;
  ctx.earthRotation.rotation.y += EARTH.rotationSpeed * deltaFactor;
  ctx.moonRevolution.rotation.y += MOON.revolutionSpeed * deltaFactor;
  ctx.moonRotation.rotation.y += MOON.rotationSpeed * deltaFactor;
}
