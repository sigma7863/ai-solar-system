import * as THREE from "three";

export function createEarthTexture(): THREE.CanvasTexture {
  const canvas = document.createElement("canvas");
  canvas.width = 512;
  canvas.height = 256;
  const ctx = canvas.getContext("2d")!;

  const gradient = ctx.createLinearGradient(0, 0, 0, 256);
  gradient.addColorStop(0, "#1a3a5c");
  gradient.addColorStop(0.3, "#2d6da8");
  gradient.addColorStop(0.5, "#4a8f4a");
  gradient.addColorStop(0.7, "#2d6da8");
  gradient.addColorStop(1, "#1a3a5c");
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, 512, 256);

  const continents = [
    { x: 180, y: 80, w: 60, h: 80 },
    { x: 220, y: 100, w: 40, h: 60 },
    { x: 100, y: 60, w: 50, h: 100 },
    { x: 110, y: 140, w: 30, h: 50 },
    { x: 280, y: 90, w: 70, h: 50 },
    { x: 300, y: 130, w: 40, h: 40 },
    { x: 350, y: 70, w: 50, h: 60 },
    { x: 370, y: 115, w: 30, h: 30 },
    { x: 130, y: 90, w: 25, h: 35 },
    { x: 440, y: 65, w: 55, h: 55 },
    { x: 445, y: 105, w: 35, h: 25 },
  ];

  ctx.fillStyle = "#3d8b37";
  for (const c of continents) {
    ctx.beginPath();
    ctx.ellipse(c.x, c.y, c.w / 2, c.h / 2, 0, 0, Math.PI * 2);
    ctx.fill();
  }

  ctx.fillStyle = "#4a9a44";
  for (const c of continents) {
    ctx.beginPath();
    ctx.ellipse(c.x - 3, c.y - 3, c.w / 3, c.h / 3, 0.2, 0, Math.PI * 2);
    ctx.fill();
  }

  ctx.fillStyle = "rgba(255, 255, 255, 0.15)";
  for (let i = 0; i < 20; i++) {
    const cx = Math.random() * 512;
    const cy = Math.random() * 256;
    const r = Math.random() * 15 + 5;
    ctx.beginPath();
    ctx.ellipse(cx, cy, r, r * 0.6, 0, 0, Math.PI * 2);
    ctx.fill();
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.ClampToEdgeWrapping;
  return texture;
}

export function createMoonTexture(): THREE.CanvasTexture {
  const canvas = document.createElement("canvas");
  canvas.width = 128;
  canvas.height = 64;
  const ctx = canvas.getContext("2d")!;

  ctx.fillStyle = "#b0b0b0";
  ctx.fillRect(0, 0, 128, 64);

  ctx.fillStyle = "#999";
  for (let i = 0; i < 30; i++) {
    const cx = Math.random() * 128;
    const cy = Math.random() * 64;
    const r = Math.random() * 6 + 1;
    ctx.beginPath();
    ctx.arc(cx, cy, r, 0, Math.PI * 2);
    ctx.fill();
  }

  ctx.fillStyle = "#888";
  for (let i = 0; i < 15; i++) {
    const cx = Math.random() * 128;
    const cy = Math.random() * 64;
    const r = Math.random() * 3 + 1;
    ctx.beginPath();
    ctx.arc(cx, cy, r, 0, Math.PI * 2);
    ctx.fill();
  }

  ctx.fillStyle = "#c0c0c0";
  for (let i = 0; i < 10; i++) {
    const cx = Math.random() * 128;
    const cy = Math.random() * 64;
    const r = Math.random() * 4 + 1;
    ctx.beginPath();
    ctx.arc(cx, cy, r, 0, Math.PI * 2);
    ctx.fill();
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.ClampToEdgeWrapping;
  return texture;
}

export function createSunTexture(): THREE.CanvasTexture {
  const canvas = document.createElement("canvas");
  canvas.width = 512;
  canvas.height = 256;
  const ctx = canvas.getContext("2d")!;

  const gradient = ctx.createRadialGradient(256, 128, 0, 256, 128, 256);
  gradient.addColorStop(0, "#fff5e0");
  gradient.addColorStop(0.3, "#ffcc33");
  gradient.addColorStop(0.6, "#ff8800");
  gradient.addColorStop(0.8, "#cc4400");
  gradient.addColorStop(1, "#882200");
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, 512, 256);

  ctx.fillStyle = "rgba(255, 200, 50, 0.3)";
  for (let i = 0; i < 80; i++) {
    const cx = Math.random() * 512;
    const cy = Math.random() * 256;
    const r = Math.random() * 20 + 3;
    ctx.beginPath();
    ctx.arc(cx, cy, r, 0, Math.PI * 2);
    ctx.fill();
  }

  ctx.fillStyle = "rgba(255, 150, 0, 0.2)";
  for (let i = 0; i < 40; i++) {
    const cx = Math.random() * 512;
    const cy = Math.random() * 256;
    const r = Math.random() * 12 + 5;
    ctx.beginPath();
    ctx.arc(cx, cy, r, 0, Math.PI * 2);
    ctx.fill();
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.ClampToEdgeWrapping;
  return texture;
}
