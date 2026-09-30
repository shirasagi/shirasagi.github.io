---
layout: default
title: トラブルシューティング - インストール
---

## RMagick がインストールできない

> No package 'MagickCore' found

~~~
# export PKG_CONFIG_PATH=/usr/local/lib/pkgconfig
# gem install rmagick
~~~

## Application サーバが起動できない

### エラーログ

エラーログには、Railsアプリの起動失敗、メモリ超過によるプロセスの強制終了（タイムアウト、接続エラーなど）が記録されます。

- Puma の場合

~~~
$ journalctl -u puma
~~~

- Unicorn の場合

~~~
$ less /var/www/shirasagi/log/unicorn.stderr.log
~~~
