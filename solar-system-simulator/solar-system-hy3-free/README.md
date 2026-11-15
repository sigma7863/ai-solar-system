# Solar System Simulator

Three.js + TypeScript + Vite で構築した、太陽・地球・月の太陽系シミュレーターです。
実際の宇宙を意識したライティング・マテリアル・影で、公転と自転をリアルタイムに描画します。

![tech](https://img.shields.io/badge/Three.js-r0.171-000000?logo=three.js)
![tech](https://img.shields.io/badge/TypeScript-5.7-3178C6?logo=typescript)
![tech](https://img.shields.io/badge/Vite-6-646CFF?logo=vite)
![tech](https://img.shields.io/badge/Bun-1.3-000000?logo=bun)

## 主な機能

- ☀️ **太陽** — 発光マテリアル（emissiveMap）+ コロナ風グロー。系唯一の主光源（PointLight）を内包
- 🌍 **地球** — 太陽を中心に公転。地軸を約 23.4° 傾けて自転。大気散乱風のグローつき
- 🌙 **月** — 地球を中心に公転。潮汐ロックを模し、常に同じ面を地球へ向ける
- 🌌 **星空** — 球殻上に 12,000 個の星を分布。色温度と大きさを揺らして自然な夜空を表現
- 🕹️ **OrbitControls** — ドラッグで回転 / スクロールでズーム / 右ドラッグでパン
- 🪟 ウィンドウリサイズ完全対応
- ⚡ delta ベース更新・pixelRatio 上限・setAnimationLoop で **60FPS を意識**した実装

## セットアップ

前提: [Bun](https://bun.sh/) がインストール済みであること。

```bash
# 依存関係のインストール
bun install
```

## Bun での起動方法

```bash
# 開発サーバー起動（http://localhost:5173）
bun run dev

# 本番ビルド（型チェック込み）
bun run build

# ビルド成果物のプレビュー
bun run preview

# 静的解析
bun run lint        # ESLint（警告ゼロで通過）
bun run typecheck   # tsc --noEmit
```

## ディレクトリ構成

責務ごとにレイヤーを分離しています。

```
solar-system-hy3-free/
├── index.html                # エントリHTML（canvas と操作ヒント）
├── package.json
├── tsconfig.json
├── vite.config.ts
├── eslint.config.js
└── src/
    ├── main.ts               # エントリポイント（bootstrap）
    ├── core/                 # 描画基盤（天体に非依存）
    │   ├── Engine.ts         # レンダラ/カメラ/コントロール/ループの統括
    │   ├── Renderer.ts       # WebGLRenderer の生成と描画設定
    │   └── ResizeHandler.ts  # リサイズ追従
    ├── scenes/
    │   └── SolarSystemScene.ts  # 天体の生成・親子関係・ライティング配置
    ├── components/           # 各天体（自己完結・再利用可能）
    │   ├── Sun.ts
    │   ├── Earth.ts
    │   ├── Moon.ts
    │   └── Starfield.ts
    ├── utils/
    │   ├── constants.ts      # スケール・周期などの定数
    │   ├── math.ts           # 角速度・座標変換
    │   └── proceduralTextures.ts  # Canvas による手続き的テクスチャ生成
    └── types/
        └── CelestialBody.ts  # 共通 Updatable インターフェース
```

## 採用した設計

### レイヤー分離とコンポーネント指向

- **core** … 「毎フレーム更新して描画する」責務のみ。どんなシーンでも使い回せる。
- **scenes** … 天体の組み立て役。親子関係とライティング配置を集約。
- **components** … 太陽・地球・月・星空を、それぞれ生成〜更新〜破棄まで自己完結させた再利用可能なクラス。
- **utils / types** … 純粋関数・定数・型定義に集約し、依存方向を一方向（下位→上位への逆流なし）に保つ。

### `Updatable` インターフェースによる統一

全ての可視オブジェクトは共通インターフェース `Updatable`（`object3d` / `update` / `dispose`）を実装します。
シーンは具象型を意識せず配列を回すだけで更新・破棄でき、天体の追加に対して開いた（Open/Closed）構造になっています。

### シーングラフで公転・自転・傾斜を表現

回転行列を手計算せず、Group の入れ子で物理関係を宣言的に表現しています。

```
地球:  公転Pivot → 位置Group → 傾斜Group → メッシュ(自転)
月:    (地球の位置Groupに接続) 公転Pivot → 位置Group → メッシュ(自転)
```

月を地球の「自転非依存アンカー（位置Group）」に取り付けることで、
**地球の自転や地軸傾斜に月が巻き込まれない**正しい階層を実現しています。

## 工夫した点

- **フレームレート非依存**: すべての回転を `delta`（経過秒）基準で更新。マシン性能に依らず一定速度。
- **60FPS への配慮**: `renderer.setAnimationLoop` を採用し、`pixelRatio` を 2 に制限して高DPI環境の過剰描画を抑制。ジオメトリ/マテリアルは各コンポーネントで一度だけ生成し使い回す。
- **オフラインで動くリアルなテクスチャ**: 外部画像に依存せず、fBm ノイズと Canvas で地球（海・大陸・氷冠）、月（レゴリス・クレーター）、太陽（対流セル）を手続き的に生成。ビルド成果物が軽量。
- **本物志向のライティング**: 太陽の PointLight のみを主光源とし、`ACESFilmicToneMapping` と sRGB 出力で自然な明暗を再現。`AmbientLight` は影側が黒潰れしない最小強度に。
- **影と食（eclipse）**: 地球・月ともに `castShadow` / `receiveShadow` を有効化し、`PCFSoftShadowMap` で柔らかい影を描画。配置次第で日食・月食のような遮蔽も発生する。
- **リソース管理**: 各コンポーネントの `dispose()` で GPU リソースを確実に解放し、`beforeunload` で後片付け。
- **型安全性**: `strict` に加え `noUnusedLocals` / `exactOptionalPropertyTypes` 等を有効化。ESLint は `recommendedTypeChecked` で型情報を用いた検査を行い、警告ゼロで通過。
