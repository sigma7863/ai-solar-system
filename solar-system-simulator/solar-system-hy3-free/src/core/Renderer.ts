import { ACESFilmicToneMapping, PCFSoftShadowMap, SRGBColorSpace, WebGLRenderer } from 'three';

/**
 * WebGLRenderer を生成し、宇宙空間らしい見た目に必要な
 * 描画設定（トーンマッピング・色空間・影）を適用する。
 *
 * @param canvas 描画対象の canvas 要素
 */
export function createRenderer(canvas: HTMLCanvasElement): WebGLRenderer {
  const renderer = new WebGLRenderer({
    canvas,
    antialias: true,
    powerPreference: 'high-performance',
  });

  // 高DPI環境での過剰描画を防ぎ 60FPS を維持するため上限を 2 に制限する。
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setSize(window.innerWidth, window.innerHeight);

  // HDR的な太陽の明るさを自然に丸めるフィルミックトーンマッピング。
  renderer.toneMapping = ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.0;
  renderer.outputColorSpace = SRGBColorSpace;

  // 月・地球へ落ちる影を柔らかく表現する。
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = PCFSoftShadowMap;

  return renderer;
}
