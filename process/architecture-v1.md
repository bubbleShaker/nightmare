# Architecture v1 — Nightmare 3D Web App

> 作成日: 2026-06-20

## 悪夢コンテンツ

### 1.md (化け猫悪夢)
- 元飼い猫が巨大化した化け物が窓から家に侵入しようとする
- 翌日、その母親の巨大化け猫も来る
- 化け猫の背に乗って空を飛び、急上昇 → 機構が外れて急落下 → 異国の地に叩きつけ死亡 → 夢の中で起きる

### 2.md (浮遊・落下の繰り返し悪夢)
- 体が制御不能で上昇（ミニ気球あり or なし）
- 建物がどんどん小さくなる
- 風で知らない土地に流される
- 見知らぬ文化の建造物
- 最後に急落下 → 地面に叩きつけられて目が覚める

---

## 技術スタック

### フロントエンド (TypeScript)
| 技術 | 役割 |
|------|------|
| React + Vite | UI フレームワーク・ビルドツール |
| React Router | 選択画面 ↔ 再生画面のルーティング |
| Three.js | WebGL 3D レンダリング（シネマティックアニメーション） |
| Jest + React Testing Library | フロントエンドテスト |

### バックエンド (C#)
| 技術 | 役割 |
|------|------|
| ASP.NET Core | 悪夢メタデータ REST API |
| AWS Lambda + API Gateway | サーバーレスホスティング |
| xUnit | C# ユニットテスト |

### インフラ (IaaS)
| 技術 | 役割 |
|------|------|
| AWS CDK (TypeScript) | IaC（コードでインフラ管理） |
| S3 + CloudFront | 静的フロントエンドホスティング |
| Lambda + API Gateway | C# API ホスティング |

---

## ディレクトリ構造

```
nightmare-app/
├── frontend/
│   ├── src/
│   │   ├── domain/          # Nightmare, Scene エンティティ
│   │   ├── application/     # ユースケース (getNightmares, playNightmare)
│   │   ├── infrastructure/  # Three.js レンダラー, API クライアント
│   │   └── presentation/    # React コンポーネント・ページ
│   └── ...
├── backend/
│   └── NightmareApi/
│       ├── Domain/
│       ├── Application/
│       ├── Infrastructure/
│       └── Presentation/
├── infra/                   # AWS CDK スタック
├── process/                 # 開発プロセス記録
└── summary/                 # 子Issue完了時の実装サマリー
```

---

## 3D 再現アプローチ

- **シネマティック固定カメラ**: ユーザー操作なし、スクリプトされたカメラパス
- `CatmullRomCurve3` でカメラ飛行経路をスムーズに補間
- 各シーンをシーケンシャルに再生、完了後に選択画面に戻る
- Three.js `AnimationMixer` でオブジェクトアニメーション管理

---

## 画面フロー

```
/ (選択画面)
  └─ /play/:id (悪夢再生画面)
       └─ 再生完了 → / に戻る
```

---

## 開発順序

1. プロジェクト骨格（Vite + React + Three.js + ルーティング）
2. 選択画面（悪夢カード一覧）
3. 2.md 悪夢再現（浮遊・落下シーン）
4. 1.md 悪夢再現（化け猫・急上昇・落下）
5. C# バックエンド（悪夢メタデータ API）
6. AWS インフラ（CDK でデプロイ）
