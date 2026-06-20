# 開発フロー v1 — レビュー込みの子Issue 開発サイクル

> 作成日: 2026-06-20
> 関連: 管理 Issue #1 の「開発方針」

本プロジェクトは **アジャイル + TDD** で進め、子Issue 単位で
「実装 → PR → レビュー → マージ」を 1 サイクルとする。
各サイクルの標準手順を以下に定める。

---

## サイクル全体図

```
1. 子Issue 起票（親 #1 に紐付け）
        ↓
2. feature/issue-N-xxx ブランチ作成
        ↓
3. TDD で実装（小さく刻む）
        ↓
4. ローカル検証（lint / test / build）
        ↓
5. PR 作成（gh、Closes #N）
        ↓
6. コードレビュー（/code-review）→ 指摘反映     ← 本フローで追加した工程
        ↓
7. CI が green であることを確認
        ↓
8. squash マージ → ブランチ削除 → Issue クローズ
        ↓
9. summary/issue-N-xxx.md にサマリー保存
        ↓
10. 管理 Issue #1 の進捗を更新
```

---

## 各ステップの詳細

### 1. 子Issue 起票
- 親（管理 Issue #1）に `親Issue: #1` で紐付ける。
- 目的・やること（チェックリスト）・完了条件を記載する。

### 2. ブランチ作成
- 命名規則: `feature/issue-<N>-<短い英語スラッグ>`。
- 分岐元は最新の `master`。

### 3. 実装（TDD・小さく刻む）
- 可能な限りテストを先に書く（Red → Green → Refactor）。
- 一度に大きく作らず、「次の一歩」単位でコミットする。

### 4. ローカル検証
- frontend: `npm ci`（クリーン環境再現）→ `npm run lint` → `npm test` → `npm run build`。
- backend（将来）: `dotnet test` 等。
- ここで落ちるものを PR に上げない。

### 5. PR 作成
- `gh pr create` を使う。
- 本文に `Closes #N` を入れ、マージで Issue が自動クローズされるようにする。
- 変更概要・検証結果（lint/test/build の結果）を記載する。

### 6. コードレビュー ← 本フローで明文化した工程
- `/code-review` で差分をレビューする。
- 指摘（バグ・効率・簡潔さ・規約）を反映する。
- レビューを通さずにマージしない。

### 7. CI 確認
- GitHub Actions（`.github/workflows/ci.yml`）が **green** であることを確認する。
- 詳細は [`process/architecture-v1.md`](./architecture-v1.md) / `summary/issue-4-ci.md` 参照。

### 8. マージ・後始末
- `gh pr merge <PR> --squash --delete-branch`（履歴を 1 コミットに集約）。
- ローカルは `master` を fast-forward 更新し、feature ブランチを削除する。
- `Closes #N` で自動クローズされない場合は手動でクローズする。

### 9. サマリー保存
- `summary/issue-<N>-<スラッグ>.md` に実装内容・検証結果・補足を残す。
- 認知負債を減らし、後から経緯を追えるようにする目的。

### 10. 管理 Issue 更新
- 管理 Issue #1 の「進捗サマリー」「子Issue 一覧」「完了条件」を実態に合わせて更新する。
- 必要に応じて進捗コメントを追加する。

---

## 補足

- 本フローで新たに気づいた改善は、この `process/` 配下に追記・改訂する
  （prom2「新しい開発プロセスは process ディレクトリに記録する」方針）。
- 番号の整合性に注意: Issue 本文中の参照番号は計画時の仮番号になりうるため、
  実際に採番された番号を正とする（参考: #4 / #5 の経緯）。
