import {
  SphereGeometry,
  MeshBasicMaterial,
  Mesh,
  Group,
  AdditiveBlending,
  BackSide,
} from "three";
import { SUN } from "../utils/constants";

export function createSun(): Group {
  const group = new Group();
  group.name = "sun";

  const geometry = new SphereGeometry(SUN.radius, SUN.segments, SUN.segments);

  const material = new MeshBasicMaterial({
    color: SUN.color,
  });

  const mesh = new Mesh(geometry, material);
  mesh.name = "sun-mesh";
  group.add(mesh);

  const glowGeometry = new SphereGeometry(
    SUN.radius * 1.3,
    SUN.segments,
    SUN.segments,
  );
  const glowMaterial = new MeshBasicMaterial({
    color: SUN.emissive,
    transparent: true,
    opacity: 0.15,
    blending: AdditiveBlending,
    side: BackSide,
  });
  const glowMesh = new Mesh(glowGeometry, glowMaterial);
  glowMesh.name = "sun-glow";
  group.add(glowMesh);

  return group;
}
