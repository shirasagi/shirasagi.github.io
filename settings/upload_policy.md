---
layout: default
title: アップロード制限（無害化）
---

## 目的

複数台サーバ構成においてインターネットからのファイルアップロードを制限することができます。<br />
主に無害化処理を行うための機能です。<br />
無害化処理は「サニタイザーVer.3」と連動させることを想定しています。<br />

## 設定ファイル

~~~
[config/ss.yaml, config/defaults/ss.yaml]

# Upload Policy (restricted, sanitizer)
upload_policy:

# Sanitizer directories
sanitizer_input: sanitizer_input
sanitizer_output: sanitizer_output
sanitizer_wait_image: public/assets/img/sanitizer-wait-ja.png
~~~

- upload_policy: ポリシーの標準を指定します。
  - restricted: アップロード禁止
  - sanitizer: 無害化処理

- sanitizer_input: アップロード時にファイルを退避させる場所
- sanitizer_output: 無害化処理が完了したファイルを保存する場所
- sanitizer_wait_image: 無害化中に表示するサムネイル画像

## 設定例

upload_policy で標準値を設定すると、管理画面（システム設定）からサイト/組織ごとに設定を上書きすることができます。

1) 標準では禁止しつつ特定サイトのみ無害化する
  - upload_policy: restricted
  - サイト設定: 無害化

2) すべてのサイトで無害化する
  - upload_policy: sanitizer
  - サイト設定: 既定

## 無害化後のファイル取り込み

sanitizer_output/ にあるファイルをシラサギに取り込みます。

```sh
$ rake ss:sanitizer_restore
```

想定されるファイル名は

```
sanitizer_output/{ID}_{FILENAME}_{PID}_marked.ext
```
