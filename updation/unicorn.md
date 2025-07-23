---
layout: default
title: Unicornの更新
---

**SHIRASAGI v1.20 にて、Unicorn は廃止されることが決まりました。**
**Unicornの廃止時期は未定ですが、2～3年の猶予の後、削除されます。**

## Unicorn 起動設定ファイル

OS 起動時に Unicorn を起動する設定が /etc/systemd/system/unicorn.service というファイルにあります。
古いバージョンの設定ファイルは `ExecStart=` 行が次のように設定されています。

古い `ExecStart=` 行:

```
ExecStart=/usr/local/rvm/bin/start_unicorn  -c config/unicorn.rb -E production -D
```

上記のように設定されている場合、以下のように変更してください。

#### asdf を利用してない場合

新しい `ExecStart=` 行:

```
ExecStart=/usr/local/rvm/wrappers/default/bundle exec unicorn_rails -c config/unicorn.rb -D
```

#### asdf でインストールしている場合

新しい `ExecStart=` 行:

```
ExecStart=/bin/bash -lc 'bundle exec unicorn_rails -c config/unicorn.rb -D'
```

## Unicorn の再起動

本番サーバーでは root になり次のコマンドを実行:

```
$ su -
# systemctl restart unicorn
```

Unicorn が完全に停止しないうちに `systemctl start unicorn` コマンドを実行するとエラーになる場合があります。エラーになる場合は、数秒置いてからもう一度実行してみてくだい。

開発環境では次のコマンドを実行:

```
$ cd /var/www/shirasagi
$ bundle exec rake unicorn:restart
```

Unicorn の再起動には 2, 3 分かかる場合があります。
