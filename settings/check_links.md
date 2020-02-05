---
layout: default
title: リンクチェック設定
---

SHIRASAGI にはサイト全体を非同期ジョブにてリンクチェックする機能が備わっています。

## リンクチェックの Basic 認証

リンクチェック機能はサイトが Basic 認証で保護されていると正常に動作しません。
この場合、Basic 認証のアカウントを設定することでリンクチェックできるようになります。

[Basic 認証](/settings/basic_auth.html)

## 実行方法

- 管理画面：サイト設定＞リンクチェック
- コマンド：`bundle exec rake cms:check_links email=sys@example.co.jp`

> コマンド引数 `email` はエラーレポートを送信するメールアドレスです。

## 動作

サイトトップのURLからHTMLを取得して、HTML内のリンクを再帰的に収集していきます。

収集したリンクについて WEBサーバー より取得（open）を試み、失敗した場合にエラーとして報告します。

注意点として、リンク先の環境によっては応答が遅く、ブラウザからは正常に開くことができても、リンクチェックでは失敗として報告されることがあります。

## 設定

前述の WEBサーバー よりリンク先を取得する際の タイムアウト秒数 については `config/cms.yml` にて設定することができます。

> `config/cms.yml` が存在しない場合、`config/defaults/cms.yml` を `config/cms.yml` へコピーしてください。

~~~yaml
  # check_links job's timeout
  check_links:
    html_request_timeout: 10
    head_request_timeout: 5
~~~

`html_request_timeout` はリンク先のHTMLを取得する際の、GETリクエストのタイムアウト秒数

`head_request_timeout` はリンク先のHTML以外のファイルを確認する、HEADリクエストのタイムアウト秒数

となっており、それぞれ適宜変更可能です。
