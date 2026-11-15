import { CanvasTexture, RepeatWrapping, SRGBColorSpace, type Texture } from 'three';

/**
 * 外部アセットに依存せず、Canvas 上で天体表面を手続き的に生成するための
 * テクスチャファクトリ群。オフライン環境でも動作し、
 * ビルド成果物に画像を同梱しなくて済む利点がある。
 */

/** 値ノイズ用の 2D 疑似乱数。座標から決定的な 0〜1 の値を返す。 */
function hash2d(x: number, y: number): number {
  const s = Math.sin(x * 127.1 + y * 311.7) * 43758.5453;
  return s - Math.floor(s);
}

/** 補間付き値ノイズ。 */
function valueNoise(x: number, y: number): number {
  const xi = Math.floor(x);
  const yi = Math.floor(y);
  const xf = x - xi;
  const yf = y - yi;

  const tl = hash2d(xi, yi);
  const tr = hash2d(xi + 1, yi);
  const bl = hash2d(xi, yi + 1);
  const br = hash2d(xi + 1, yi + 1);

  // smoothstep による滑らかな補間。
  const u = xf * xf * (3 - 2 * xf);
  const v = yf * yf * (3 - 2 * yf);

  const top = tl + (tr - tl) * u;
  const bottom = bl + (br - bl) * u;
  return top + (bottom - top) * v;
}

/** オクターブを重ねたフラクタルノイズ（fBm）。 */
function fbm(x: number, y: number, octaves: number): number {
  let value = 0;
  let amplitude = 0.5;
  let frequency = 1;
  for (let i = 0; i < octaves; i++) {
    value += valueNoise(x * frequency, y * frequency) * amplitude;
    frequency *= 2;
    amplitude *= 0.5;
  }
  return value;
}

/** 指定サイズのオフスクリーン canvas と 2D コンテキストを生成する。 */
function createCanvas(size: number): {
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
} {
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size / 2; // 経緯度マッピングに合わせ 2:1 比率。
  const ctx = canvas.getContext('2d');
  if (!ctx) {
    throw new Error('2D コンテキストの取得に失敗しました。');
  }
  return { canvas, ctx };
}

/** CanvasTexture を色空間・ラップ設定付きで生成する共通処理。 */
function toTexture(canvas: HTMLCanvasElement): CanvasTexture {
  const texture = new CanvasTexture(canvas);
  texture.colorSpace = SRGBColorSpace;
  texture.wrapS = RepeatWrapping;
  texture.wrapT = RepeatWrapping;
  texture.anisotropy = 4;
  return texture;
}

/**
 * 地球テクスチャ。fBm の高さ値で海（青）と陸（緑〜砂色）を塗り分け、
 * 極地に氷冠を加える。
 */
export function createEarthTexture(size = 1024): Texture {
  const { canvas, ctx } = createCanvas(size);
  const { width, height } = canvas;
  const image = ctx.createImageData(width, height);
  const data = image.data;

  for (let y = 0; y < height; y++) {
    // 緯度（0=北極, 1=南極）。極付近を氷冠にするため利用。
    const lat = y / height;
    const polar = Math.abs(lat - 0.5) * 2; // 0(赤道)〜1(極)

    for (let x = 0; x < width; x++) {
      const nx = (x / width) * 8;
      const ny = (y / height) * 8;
      let elevation = fbm(nx, ny, 6);
      elevation = elevation * 0.7 + polar * 0.15;

      let r: number;
      let g: number;
      let b: number;

      if (polar > 0.86) {
        // 氷冠。
        r = 235;
        g = 240;
        b = 245;
      } else if (elevation < 0.48) {
        // 海。深さで濃淡をつける。
        const depth = elevation / 0.48;
        r = 8 + depth * 20;
        g = 40 + depth * 60;
        b = 90 + depth * 90;
      } else if (elevation < 0.55) {
        // 海岸線。
        r = 200;
        g = 190;
        b = 130;
      } else {
        // 陸地。標高で緑〜茶へ。
        const land = (elevation - 0.55) / 0.45;
        r = 40 + land * 90;
        g = 110 - land * 40;
        b = 40 + land * 20;
      }

      const idx = (y * width + x) * 4;
      data[idx] = r;
      data[idx + 1] = g;
      data[idx + 2] = b;
      data[idx + 3] = 255;
    }
  }

  ctx.putImageData(image, 0, 0);
  return toTexture(canvas);
}

/**
 * 月テクスチャ。灰色のレゴリスを fBm で表現し、
 * クレーターを暗い円として重ねる。
 */
export function createMoonTexture(size = 512): Texture {
  const { canvas, ctx } = createCanvas(size);
  const { width, height } = canvas;
  const image = ctx.createImageData(width, height);
  const data = image.data;

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const nx = (x / width) * 10;
      const ny = (y / height) * 10;
      const shade = 90 + fbm(nx, ny, 5) * 90;
      const idx = (y * width + x) * 4;
      data[idx] = shade;
      data[idx + 1] = shade;
      data[idx + 2] = shade;
      data[idx + 3] = 255;
    }
  }
  ctx.putImageData(image, 0, 0);

  // クレーターを重ねる。
  const craterCount = 40;
  for (let i = 0; i < craterCount; i++) {
    const cx = hash2d(i, 1) * width;
    const cy = hash2d(i, 2) * height;
    const radius = 4 + hash2d(i, 3) * 22;

    const gradient = ctx.createRadialGradient(cx, cy, radius * 0.2, cx, cy, radius);
    gradient.addColorStop(0, 'rgba(30, 30, 30, 0.55)');
    gradient.addColorStop(0.7, 'rgba(60, 60, 60, 0.25)');
    gradient.addColorStop(1, 'rgba(200, 200, 200, 0.15)');
    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.arc(cx, cy, radius, 0, Math.PI * 2);
    ctx.fill();
  }

  return toTexture(canvas);
}

/**
 * 太陽テクスチャ。fBm で対流セルのような明暗を作り、
 * 白〜オレンジのグラデーションに写像する。emissiveMap として使用。
 */
export function createSunTexture(size = 1024): Texture {
  const { canvas, ctx } = createCanvas(size);
  const { width, height } = canvas;
  const image = ctx.createImageData(width, height);
  const data = image.data;

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const nx = (x / width) * 12;
      const ny = (y / height) * 12;
      const n = fbm(nx, ny, 6);

      // 明部は白熱、暗部は黒点寄りのオレンジ。
      const r = 255;
      const g = 140 + n * 110;
      const b = 20 + n * 90;

      const idx = (y * width + x) * 4;
      data[idx] = r;
      data[idx + 1] = Math.min(255, g);
      data[idx + 2] = Math.min(255, b);
      data[idx + 3] = 255;
    }
  }

  ctx.putImageData(image, 0, 0);
  return toTexture(canvas);
}
