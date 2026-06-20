# Issue #4 実装サマリー: CI 整備（GitHub Actions）+ 改行コード LF 統一

## 背景

TDD・アジャイル方針（prom2）を支えるため、子Issue ごとの PR で
lint / test / build を自動検証する CI 土台を整備した。あわせて、
Windows(PowerShell) と WSL の混在編集で発生していた CRLF/LF の
「幻の差分」を恒久的に解消した。

## 実装内容

### 1. GitHub Actions ワークフロー（`.github/workflows/ci.yml`）

- **トリガー**: `master` 向け PR、および `master` / `feature/**` への push
- **frontend ジョブ**（`ubuntu-latest`）
  - `actions/setup-node@v4`（Node 22、npm キャッシュ）
  - `npm ci`(lockfile 厳密インストール。CI では `install` ではなく `ci`)
  - `npm run lint`（eslint）
  - `npm test`（jest）
  - `npm run build`（`tsc -b` 型チェック + `vite build` 本番ビルド）
- backend（C# / xUnit）は将来別ジョブとして追加予定

### 2. 改行コードの LF 統一（`.gitattributes`）

```
* text=auto eol=lf
```

- リポジトリ内の改行を LF に正規化（Linux CI / AWS 前提）
- 既存ファイルは `git add --renormalize .` で正規化
- WSL / PowerShell どちらから編集しても結果が一定になり、
  CRLF/LF 由来の差分ノイズが出なくなる

### 3. 本番ビルドからテストを除外（`frontend/tsconfig.app.json`）

```jsonc
"exclude": ["src/**/*.test.ts", "src/**/*.test.tsx", "src/**/__tests__/**"]
```

- `tsc -b`（本番ビルドの型チェック）の対象からテストファイルを除外し、
  ビルド成果物にテスト依存が混入しないようにした

### 4. `.gitignore`

- Claude Code のローカル設定 `.claude/` を無視対象に追加

## ローカル検証結果（`npm ci` でクリーン環境を再現）

| ステップ | 結果 |
|---------|------|
| `npm run lint` | exit 0 |
| `npm test` | 3 suites / 4 tests passed |
| `npm run build` | success（dist 生成、604ms） |

> 注: WSL 上の既存 `node_modules` は ts-jest の preset 解決に失敗したが、
> `npm ci` でクリーン再インストールすると解消。CI は毎回 `npm ci` のため影響なし。

## 補足: Issue 番号について

当初ブランチは `feature/issue-8-ci` で起票予定だったが、Issue #1 本文の
子Issue（#2〜#7）は参照テキストのみで実体が無く、実在は #2 / #3 のみ。
新規起票で実際に採番されたのは **#4** のため、本サマリー・PR は #4 を正とする。
