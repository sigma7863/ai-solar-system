import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import type { Updateable } from "../core/loop";
import { Sun } from "../components/sun";
import { Planet } from "../components/planet";
import { Satellite } from "../components/satellite";
import { createStarfield } from "../utils/starfield";
import { SOLAR_SYSTEM_CONFIG, AMBIENT_LIGHT_CONFIG } from "../utils/constants";

export class SolarSystem implements Updateable {
  private readonly scene: THREE.Scene;
  private readonly camera: THREE.PerspectiveCamera;
  private readonly controls: OrbitControls;
  private readonly sun: Sun;
  private readonly earth: Planet;
  private readonly moon: Satellite;

  constructor(scene: THREE.Scene, camera: THREE.PerspectiveCamera) {
    this.scene = scene;
    this.camera = camera;

    const ambientLight = new THREE.AmbientLight(
      AMBIENT_LIGHT_CONFIG.color,
      AMBIENT_LIGHT_CONFIG.intensity,
    );
    this.scene.add(ambientLight);

    const starfield = createStarfield(
      SOLAR_SYSTEM_CONFIG.starfield.count,
      SOLAR_SYSTEM_CONFIG.starfield.radius,
    );
    this.scene.add(starfield);

    this.sun = new Sun(SOLAR_SYSTEM_CONFIG.sun);
    this.sun.addTo(this.scene);

    this.earth = new Planet(
      SOLAR_SYSTEM_CONFIG.earth.body,
      SOLAR_SYSTEM_CONFIG.earth.orbit,
    );
    this.earth.addTo(this.scene);

    this.moon = new Satellite(
      SOLAR_SYSTEM_CONFIG.earth.satellites![0].body,
      SOLAR_SYSTEM_CONFIG.earth.satellites![0].orbit,
    );
    this.moon.setParent(this.earth.mesh);

    this.controls = new OrbitControls(this.camera, document.body);
    this.controls.enableDamping = true;
    this.controls.dampingFactor = 0.08;
    this.controls.minDistance = 5;
    this.controls.maxDistance = 150;
    this.controls.autoRotate = false;
    this.controls.target.set(0, 0, 0);
  }

  update(deltaTime: number, elapsedTime: number): void {
    this.sun.update(deltaTime, elapsedTime);
    this.earth.update(deltaTime, elapsedTime);
    this.moon.update(deltaTime, elapsedTime);
    this.controls.update();
  }
}
