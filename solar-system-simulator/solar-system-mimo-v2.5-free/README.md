# 太陽系シミュレーター

Three.js による太陽系の3Dシミュレーション。太陽・地球・月の公転・自転をリアルタイムで描画する。

## セットアップ方法

### 前提条件

- [Bun](https://bun.sh/) v1.0 以上

### インストール

```bash
bun install
```

### 開発サーバー起動

```bash
bun run dev
```

ブラウザが自動で開き、`http://localhost:3000` でアクセスできる。

### プロダクションビルド

```bash
bun run build
```

ビルド成果物は `dist/` ディレクトリに出力される。

### プレビュー

```bash
bun run preview
```

### リント

```bash
bun run lint
```

## ディレクトリ構成

```
solar-system-mimo-v2.5-free/
├── src/
│   ├── core/              # Three.js の基盤モジュール
│   │   ├── Renderer.ts    # WebGL レンダラーの初期化
│   │   ├── Camera.ts      # パースペクティブカメラ
│   │   ├── Scene.ts       # シーンの初期化
│   │   └── Controls.ts    # OrbitControls の設定
│   ├── components/        # 再利用可能な3Dオブジェクト
│   │   ├── CelestialBodies.ts  # 太陽・地球・月の生成
│   │   └── OrbitLine.ts        # 公転軌道のライン描画
│   ├── scenes/            # シーン構築ロジック
│   │   └── SolarSystem.ts # 太陽系シーンの組み立て
│   ├── utils/             # ユーティリティ
│   │   ├── StarField.ts   # 星空背景の生成
│   │   └── Lighting.ts    # ライティング設定
│   └── main.ts            # エントリーポイント
├── index.html
├── vite.config.ts
├── tsconfig.json
├── eslint.config.js
└── package.json
```

## 採用した設計

### コンポーネントベースの責務分離

- **core/**: レンダラー・カメラ・シーンなど Three.js の基盤を担当。アプリケーション固有のロジックを含まない
- **components/**: 各天体や軌道線などの再利用可能な3Dオブジェクトを生成するファクトリ関数
- **scenes/**: 複数コンポーネントを組み合わせてシーンを構築する
- **utils/**: 星空生成やライティングなど、横断的な機能を提供

### CelestialBody インターフェース

すべての天体が共通の `CelestialBody` インターフェースを実装する。これにより、更新処理を統一的に扱える。

```typescript
interface CelestialBody {
  mesh: THREE.Mesh;
  pivot: THREE.Object3D;
  rotationSpeed: number;
  orbitalSpeed: number;
  update(delta: number): void;
}
```

### ピボット（Pivot）による公転

各天体の公転は `THREE.Object3D` をピボットとして利用する。ピボットを回転させることで、天体が中心点の周りを円運動する。地球のピボットに月のピボットを追加することで、月が地球を中心に公転する階層構造を実現している。

### ファクトリパターン

各コンポーネントはファクトリ関数として実装し、依存関係を明示的に注入する。シングルトンやグローバル状態を排除し、テスト容易性と保守性を確保している。

## 工夫した点

### パフォーマンス

- **delta time**: `THREE.Clock` から取得した経過時間を使用し、フレームレートに依存しない一定のアニメーション速度を実現。`clamp(0.1)` で急激な時間跳びを防止
- **ピクセル比制限**: `Math.min(devicePixelRatio, 2)` で高DPI ディスプレイでの過度なレンダリング負荷を軽減
- **Additive Blending**: 星空に加算合成を使用し、自然な輝きを低コストで実現
- **shadow map**: PCFSoftShadowMap を採用し、滑らかな影と性能のバランスを実現

### 視覚効果

- **星空**: 15,000個の星を球面上にランダム配置。星の色をホワイト・イエロー・ブルーからランダムに選択し、実際の恒星の色温度を表現
- **太陽のグロー**: BackSide マテリアルのグロー Mesh を重ねることで、太陽の光り輝く効果を表現
- **地球の雲**: 半透明な雲レイヤーを独立して回転させ、大気感を演出
- **軌道線**: 透明度の低いドットラインで公転軌道を視覚化
- **霧**: `FogExp2` で遠景を自然に減衰させ、奥行き感を演出

### UX

- **OrbitControls**: ダンピング付きで滑らかな操作感。最小/最大距離を制限し、天体を突き抜けないようにした
- **リサイズ対応**: `window.resize` イベントでアスペクト比とレンダラーサイズを自動更新
- **ページ離脱防止**: `beforeunload` で試験中の誤った離脱を防止
