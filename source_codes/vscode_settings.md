---
layout: default
title: おすすめの VSCode 設定例
---

以下は `settings.json`、`extensions.json` に追加を推奨する設定例です。プロジェクトや好みに合わせて調整してください。

`settings.json`

```json

{
  // ──────────────────────────────
  // エディター一般設定
  // ──────────────────────────────
  "editor.tabSize": 2,                      // タブ幅を 2 スペースに固定
  "editor.detectIndentation": false,        // ファイルごとのインデント検出を無効化
  "editor.indentSize": "tabSize",           // indentSize を tabSize と同じに設定
  "editor.insertSpaces": true,              // タブをスペースで挿入
  "editor.defaultFormatter": "vscode.json-language-features",
  "editor.formatOnSave": true,
  "editor.renderWhitespace": "all",
  "editor.rulers": [130],                   // 縦罫線（ガター）を 130 文字目に表示

  // ──────────────────────────────
  // ファイル操作関連
  // ──────────────────────────────
  "files.trimTrailingWhitespace": true,     // 行末の不要な空白を自動削除
  "files.insertFinalNewline": true,         // 最終行に必ず改行を追加
  "files.eol": "\n",                        // 改行コードを LF に統一

  // ──────────────────────────────
  // 言語別設定
  // ──────────────────────────────
  "[markdown]": {
    "files.trimTrailingWhitespace": false   // Markdown のリストなどで末尾空白を残す
  },
  "[javascript]": {
    "editor.maxTokenizationLineLength": 2500
  },

  // ──────────────────────────────
  // Git 関連
  // ──────────────────────────────
  "git.enableSmartCommit": true,           // スマートコミットを有効化

  // ──────────────────────────────
  // VSCode＋JavaScript 整理
  // ──────────────────────────────
  "javascript.updateImportsOnFileMove.enabled": "never"  // ファイル移動時に自動で import パスを更新しない
}
```

`extensions.json`

```json

{
  "recommendations": [
    "bung87.rails",
  ]
}

```
