# Solar System Simulator

Three.js を使用した 3D 太陽系シミュレーター

## Setup

```bash
bun install
```

## Development

```bash
bun run dev
```

ブラウザで `http://localhost:5173` を開く。

## Production Build

```bash
bun run build
bun run preview
```

## Lint

```bash
bun run lint
```

## Directory Structure

```
solar-system-big-pickle/
├── index.html            # HTML entry point
├── package.json
├── tsconfig.json
├── vite.config.ts
├── eslint.config.js
├── README.md
└── src/
    ├── main.ts           # Entry point - window resize handling
    ├── core/             # Three.js 基盤コンポーネント
    │   ├── scene.ts      # Scene 生成（fog 設定含む）
    │   ├── camera.ts     # PerspectiveCamera 生成 + リサイズ対応
    │   ├── renderer.ts   # WebGLRenderer 生成（shadow/toneMapping）
    │   └── loop.ts       # アニメーションループ（deltaTime 制御）
    ├── components/       # 天体コンポーネント
    │   ├── sun.ts        # 太陽（PointLight + glow）
    │   ├── planet.ts     # 惑星（公転 + 軌道線）
    │   └── satellite.ts  # 衛星（惑星を周回）
    ├── scenes/           # シーン構成
    │   └── solar-system.ts # 全体を統括するシーン
    ├── utils/            # ユーティリティ
    │   ├── constants.ts  # 設定値（サイズ・速度・色）
    │   ├── textures.ts   # プロシージャルテクスチャ生成
    │   └── starfield.ts  # 星空パーティクル生成
    └── types/            # TypeScript 型定義
        └── index.ts
```

## Design

### Architecture

- **依存性注入**: 各コンポーネントは設定値（`CelestialBodyConfig`）を受け取り、内部で Mesh を生成する
- **Updateable インターフェース**: `AnimationLoop` が `update(deltaTime, elapsedTime)` を持つオブジェクトを一元管理
- **コンポーネント分離**: Sun / Planet / Satellite は独立したクラスで、自身の更新処理をカプセル化

### Highlights

- **プロシージャルテクスチャ** - 外部画像に依存せず、Canvas 2D で地球・月・太陽のテクスチャを生成
- **段階的な明るさ制御** - ACESFilmicToneMapping + Sun の PointLight 2.0 強度 + AmbientLight 0.3 で宇宙らしいコントラスト
- **PCFSoftShadowMap** - ソフトな影で立体感を演出
- **deltaTime 制御** - フレームレート変動に依存しない安定した自転・公転アニメーション（最大 0.05s でクランプ）
- **星空パーティクル** - 10,000 個の星を球状に配置、色味・サイズにバリエーションを持たせた AdditiveBlending
- **Sun glow** - 半透明の大きめ球体で太陽のコロナ表現
- **OrbitControls 制限** - min/maxDistance でカメラ操作範囲を制限し、天体にめり込まないようにする
- **60FPS 対策** - deltaTime クランプ、pixelRatio 上限 2x、適切なジオメトリ分割数
