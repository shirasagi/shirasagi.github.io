---
layout: default
title: トラブルシューティング - インストール
---

## RMagick がインストールできない

> No package 'MagickCore' found

```
# export PKG_CONFIG_PATH=/usr/local/lib/pkgconfig
# gem install rmagick
```

## Unicorn が起動できない

### エラーログ

```
$ less /var/www/shirasagi/log/unicorn.stderr.log
```

### pid ファイルが作成できない

pid ファイルのパスを変更してください。

```
$ vi /var/www/shirasagi/config/unicorn.rb
```

```
pid "/tmp/unicorn.pid"
```

