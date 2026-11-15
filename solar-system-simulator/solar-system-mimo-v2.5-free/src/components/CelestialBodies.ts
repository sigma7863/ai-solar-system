import * as THREE from 'three';

export interface CelestialBody {
  mesh: THREE.Mesh;
  pivot: THREE.Object3D;
  rotationSpeed: number;
  orbitalSpeed: number;
  update(delta: number): void;
}

export function createSun(): CelestialBody {
  const geometry = new THREE.SphereGeometry(10, 64, 64);

  const material = new THREE.MeshBasicMaterial({
    color: 0xffdd44,
  });

  const mesh = new THREE.Mesh(geometry, material);
  mesh.castShadow = false;
  mesh.receiveShadow = false;

  const glowGeometry = new THREE.SphereGeometry(11.5, 32, 32);
  const glowMaterial = new THREE.MeshBasicMaterial({
    color: 0xff8800,
    transparent: true,
    opacity: 0.15,
    side: THREE.BackSide,
  });
  const glow = new THREE.Mesh(glowGeometry, glowMaterial);
  mesh.add(glow);

  const pivot = new THREE.Object3D();
  pivot.add(mesh);

  const rotationSpeed = 0.002;

  return {
    mesh,
    pivot,
    rotationSpeed,
    orbitalSpeed: 0,
    update(delta: number) {
      mesh.rotation.y += rotationSpeed * delta;
    },
  };
}

export function createEarth(): CelestialBody {
  const geometry = new THREE.SphereGeometry(2.5, 64, 64);

  const material = new THREE.MeshStandardMaterial({
    color: 0x2244aa,
    roughness: 0.7,
    metalness: 0.1,
  });

  const mesh = new THREE.Mesh(geometry, material);
  mesh.castShadow = true;
  mesh.receiveShadow = true;

  const cloudGeometry = new THREE.SphereGeometry(2.55, 32, 32);
  const cloudMaterial = new THREE.MeshStandardMaterial({
    color: 0xffffff,
    transparent: true,
    opacity: 0.3,
    roughness: 1.0,
    metalness: 0.0,
  });
  const clouds = new THREE.Mesh(cloudGeometry, cloudMaterial);
  mesh.add(clouds);

  const pivot = new THREE.Object3D();
  pivot.add(mesh);

  const orbitRadius = 35;
  mesh.position.x = orbitRadius;

  const rotationSpeed = 0.02;
  const orbitalSpeed = 0.01;

  return {
    mesh,
    pivot,
    rotationSpeed,
    orbitalSpeed,
    update(delta: number) {
      mesh.rotation.y += rotationSpeed * delta;
      clouds.rotation.y += rotationSpeed * delta * 0.8;
      pivot.rotation.y += orbitalSpeed * delta;
    },
  };
}

export function createMoon(): CelestialBody {
  const geometry = new THREE.SphereGeometry(0.8, 32, 32);

  const material = new THREE.MeshStandardMaterial({
    color: 0xcccccc,
    roughness: 0.9,
    metalness: 0.0,
  });

  const mesh = new THREE.Mesh(geometry, material);
  mesh.castShadow = true;
  mesh.receiveShadow = true;

  const pivot = new THREE.Object3D();
  pivot.add(mesh);

  const orbitRadius = 6;
  mesh.position.x = orbitRadius;

  const rotationSpeed = 0.005;
  const orbitalSpeed = 0.04;

  return {
    mesh,
    pivot,
    rotationSpeed,
    orbitalSpeed,
    update(delta: number) {
      mesh.rotation.y += rotationSpeed * delta;
      pivot.rotation.y += orbitalSpeed * delta;
    },
  };
}
