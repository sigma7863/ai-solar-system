# Solar System Simulator

Three.js を使用した3D太陽系シミュレーター。太陽・地球・月の自転と公転を表現します。

## セットアップ方法

```bash
# 依存関係をインストール
bun install

# 開発サーバーを起動
bun run dev
```

## 起動方法

```bash
# 開発サーバー（ホットリロード付き）
bun run dev

# ビルド
bun run build

# ビルド結果のプレビュー
bun run preview

# 型チェック
bun run typecheck

# リント
bun run lint
```

## ディレクトリ構成

```
solar-system-deepseek-v4-flash-free/
├── index.html             # エントリーポイントHTML
├── package.json
├── tsconfig.json
├── vite.config.ts
├── eslint.config.js
└── src/
    ├── main.ts            # アプリケーションエントリーポイント
    ├── core/              # コアシステム
    │   ├── scene.ts       # シーン生成
    │   ├── camera.ts      # カメラ生成・リサイズ
    │   ├── renderer.ts    # WebGLレンダラー生成・設定
    │   └── animation-loop.ts  # アニメーションループ管理
    ├── components/        # 天体コンポーネント
    │   ├── sun.ts         # 太陽（光・グローエフェクト）
    │   ├── planet.ts      # 汎用惑星生成・軌道リング
    │   └── starfield.ts   # 星空背景（パーティクル）
    ├── scenes/            # シーン構成
    │   └── solar-system.ts # 太陽系全体の構築・更新
    └── utils/             # ユーティリティ
        ├── constants.ts   # 各種定数
        └── types.ts       # 共通型定義
```

## 採用した設計

- **責務分離**: core / components / scenes / utils の4層に分割し、各モジュールの責務を明確化
- **シーングラフ階層**: Three.js の Group 構造を活用し、地球の自転軸・公転軸、月の公転軸を階層的に構成
- **フレームレート非依存**: delta 時間によるアニメーション更新で、どのフレームレートでも一定速度を維持
- **型安全性**: 厳格な TypeScript 設定で、実行時エラーをコンパイル時に予防

## 工夫した点

### 視覚表現
- 太陽にグロースフィアを重ね、AdditiveBlending で発光感を演出
- ACESFilmic トーンマッピングでダイナミックレンジを向上
- 星空は色温度のバリエーション（青白・黄・白）を持たせて自然な見た目に
- PointLight の影を有効化し、地球と月に影が落ちる表現を実現

### パフォーマンス
- `devicePixelRatio` を 2 でキャップし、高DPI環境での過剰描画を防止
- アニメーションループで delta を `0.05` でクランプし、タブ非アクティブ時のジャンプを防止
- 星のパーティクルは `AdditiveBlending` + `depthWrite: false` で効率的な描画

### 保守性
- 各天体のパラメータ（サイズ・色・速度・軌道半径）は `constants.ts` に一元管理
- 惑星生成は汎用的な `createPlanet()` 関数で、地球・月の両方に対応
- カメラ・レンダラーは `core/` で独立管理し、リサイズ処理を一元化
