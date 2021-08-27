---
layout: default
title: 信頼できる URL の設定
---

バージョン1.14.0よりセキュリティを厳しくチェックするようになり、一部の機能で信頼できる URL かどうかをチェックするようになりました。

## 本チェックが発動する機能

まだ、本機能はシラサギ全体では発動せず、以下の機能に限定して発動します。将来的に、全体で発動するように拡充していく計画です。

- CMS
  - ページ
    - リンクブロック
    - 連絡先のリンクURL
    - リダイレクトリンク（既定では無効）
  - フォルダー/ノード
    - ログインフォルダーのリダイレクトURL
  - パーツ
    - ログインパーツのログインURL
- システム、CMS、Webメール
  - グループ
    - 連絡先のリンクURL
- 全体
  - ログイン時のクエリーパラメーター `ref`
  - OpenID Connect や SAML 利用時のリダイレクト URL

## 信頼できる URL チェックの無効化

本機能は既定で有効となっており、過去との互換性を重視される場合、無効にしたいかもしれません。
その場合 config/sns.yml（存在しない場合は config/defaults/sns.yml をコピー）をテキストエディタで開き `url_type` を `any` に設定します（下参照）。

~~~
  url_type: any
~~~

## 信頼できる URL の追加

信頼できる外部サイトを追加したい場合、config/sns.yml（存在しない場合は config/defaults/sns.yml をコピー）をテキストエディタで開き `trusted_urls` に信頼できるサイトの URL を設定します。

~~~
  trusted_urls:
    - https://maps.google.co.jp/
    - https://www.youtube.com/
    - https://gmail.com/
    - https://meet.google.com/
    - https://drive.google.com/
    - https://calendar.google.com/
~~~
