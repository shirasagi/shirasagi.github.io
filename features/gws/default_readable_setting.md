---
layout: default
title: 閲覧権限の公開範囲などの既定値
---

閲覧権限の公開範囲などの既定値は`config/gws.yml`（存在しない場合は`config/defaults/gws.yml`をコピー）の`readable_setting`以下の設定を適切に設定することで変更することができます。

例えば、閲覧権限の公開範囲の既定値を「全公開」にするには以下のように設定します。

~~~yaml
  readable_setting:
    setting_range: 'public'
~~~

ただし、お知らせや共有ファイルなどの一部の機能に関して、フォルダーに設定している閲覧権限を引き継ぎます。

この設定の変更後、Unicornの再起動が必要です。
