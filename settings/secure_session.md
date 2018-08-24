---
layout: default
title: セッションの secure 化
---

SHIRASAGI へのアクセスがすべて HTTPS 化されている場合、
セッションを secure にすることで、より安全度を高められます。

セッションを secure にするには、`config/ss.yml` をテキストエディタで開き、'session.secure' のコメントを解除してください。

> `config/ss.yml` が存在しない場合、`config/defaults/ss.yml` を `config/ss.yml` へコピーしてください。

`config/ss.yml`が、以下のような内容になれば OK です。

~~~yaml
    key: '_ss_session'
    # uncomment blow setting if you have been running SHIRASAGI with full https
    secure: true
~~~

設定変更後、SHIRASAGI の再起動が必要です。

上記の設定後、正しく動作しない場合は [nginx の設定](/installation/nginx.html)で `X-Forwarded-Proto` が追加されているか確認してください。
