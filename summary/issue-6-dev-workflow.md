# Issue #6 実装サマリー: 開発フロー（レビュー込み）の文書化

## 背景

管理 Issue #1 の開発方針に「PR はマージ前にコードレビューを行う」を追加した。
これに伴い、prom2「新しい開発プロセスは process ディレクトリに記録する」方針に従い、
レビュー工程を含む標準の開発サイクルを正式文書として残した。

## 実装内容

### `process/dev-workflow-v1.md`（新規）

子Issue 単位の開発サイクルを 10 ステップで定義:

1. 子Issue 起票（親 #1 に紐付け）
2. `feature/issue-N-xxx` ブランチ作成
3. TDD で実装（小さく刻む）
4. ローカル検証（lint / test / build）
5. PR 作成（gh、`Closes #N`）
6. **コードレビュー（/code-review）→ 指摘反映** ← 本フローで明文化
7. CI が green であることを確認
8. squash マージ → ブランチ削除 → Issue クローズ
9. `summary/` にサマリー保存
10. 管理 Issue #1 の進捗を更新

## 補足

- ドキュメントのみの変更（コード変更なし）。
- 本 PR 自体もこのフロー（実装 → PR → レビュー → CI green → マージ）に従って進めた dogfooding。
- CI の concurrency 設定により、feature への push run は PR run に集約されてキャンセルされる
  （キャンセル run は check 一覧に CANCELLED として残り PR は UNSTABLE 表示になるが、
  実作業の run は SUCCESS でありマージ可能。見た目上の副作用として認識しておく）。
