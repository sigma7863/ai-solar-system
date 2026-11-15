import { Engine } from './core/Engine';
import { SolarSystemScene } from './scenes/SolarSystemScene';

/**
 * アプリケーションのエントリポイント。
 * シーンの構築とエンジンの起動、およびページ離脱時の後片付けを行う。
 */
function bootstrap(): void {
  const canvas = document.getElementById('app');
  if (!(canvas instanceof HTMLCanvasElement)) {
    throw new Error('#app canvas 要素が見つかりません。');
  }

  const solarSystem = new SolarSystemScene();
  const engine = new Engine(canvas, solarSystem.scene);

  engine.setUpdate((delta, elapsed) => {
    solarSystem.update(delta, elapsed);
  });
  engine.start();

  // ホットリロードやページ遷移時に GPU リソースを解放する。
  window.addEventListener('beforeunload', () => {
    engine.dispose();
    solarSystem.dispose();
  });
}

bootstrap();
