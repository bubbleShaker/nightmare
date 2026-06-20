# Issue #2 実装サマリー: プロジェクト骨格セットアップ

## 実装内容

### フロントエンド骨格（`frontend/`）

- **ビルドツール**: Vite 8 + React 19 + TypeScript 6
- **ルーティング**: React Router v7（`/` と `/play/:id`）
- **3D ライブラリ**: Three.js 0.184（シーン実装は Issue #4, #5 で行う）
- **テスト**: Jest 30 + React Testing Library + ts-jest

### クリーンアーキテクチャ構成

```
src/
├── domain/
│   ├── nightmare.ts       # Nightmare エンティティ・型定義
│   └── scene.ts           # NightmareScene, SceneKeyframe 型定義
├── application/
│   ├── getNightmares.ts   # 悪夢一覧取得ユースケース
│   └── playNightmare.ts   # 悪夢再生ユースケース
├── infrastructure/
│   ├── staticNightmareRepository.ts  # 静的データ実装
│   └── staticSceneRepository.ts     # 静的シーンデータ実装
├── presentation/
│   └── pages/
│       ├── SelectionPage.tsx  # / 画面（悪夢選択）
│       └── PlayPage.tsx       # /play/:id 画面（再生プレースホルダー）
└── __tests__/
    ├── getNightmares.test.ts
    ├── SelectionPage.test.tsx
    └── PlayPage.test.tsx
```

### テスト設定の工夫

Vite の `"type": "module"` と Jest の CommonJS 変換の競合を回避するため:
- `jest.config.cjs`（CommonJS 形式）を使用
- `tsconfig.jest.json`（`verbatimModuleSyntax` なし、CommonJS モジュール）を別途用意
- `jest.setup.ts` で `TextEncoder`/`TextDecoder` を polyfill（jsdom 環境で必要）

## テスト結果

```
Test Suites: 3 passed, 3 total
Tests:       4 passed, 4 total
```
