---
layout: default
title: SHIRASAGI の更新
---

## ソースコードの更新

```
# cd /var/www/shirasagi

# 念の為に現在のバージョンをバックアップ
# git add .
# git commit -a -m "backup at $(date +%Y-%m-%d)"
# git branch -m backup-$(date +%Y-%m-%d)

# 最新版を取得
# git fetch origin
# git checkout -b stable origin/stable
```

> 上のコマンドがエラーになるなどで最新版を取得できない場合は、次のコマンドを試してみてください。
>
> ```
> # git config remote.origin.fetch '+refs/heads/*:refs/remotes/origin/*'
> # git fetch origin --unshallow
> ```

### (アーカイブを利用する場合)

### SHIRASAGI

```
# cd /var/www
# wget https://github.com/shirasagi/shirasagi/archive/stable.tar.gz -O shirasagi-stable.tar.gz

# tar xzf shirasagi-stable.tar.gz
# cd shirasagi
# rm -rf app bin db doc lib spec vendor config/*/* public/assets*
# cd ../
# \cp -af shirasagi-stable/* shirasagi/
# rm -rf shirasagi-stable*
```

> v1.4.0 でオープンデータプラグインは、SHIRASAGI にマージされました。
> オープンデータのアップデート手順は SHIRASAGI のアップデート手順と同じです。

## asdf のインストール

v1.17.0 から Node.js,yarn のインストールが必須になりました。
そこでバージョン管理ツール（asdf）を使用し Node.js をインストールします。

```
# git clone https://github.com/asdf-vm/asdf.git ~/.asdf
# vi ~/.bashrc
---(追記)
. $HOME/.asdf/asdf.sh
. $HOME/.asdf/completions/asdf.bash
---
# source ~/.bashrc
```

## Node.js のインストール

```
# asdf plugin add nodejs
# asdf install nodejs VERSION
# asdf global nodejs VERSION
# npm install -g yarn
```

> `VERSION`: Node.js のバージョンは[README.md](https://github.com/shirasagi/shirasagi/blob/stable/README.md)をご参照ください。

## Gem の更新

```
# source /opt/rh/devtoolset-11/enable
# bundle install --without development test
```

## 設定の更新

`config/` の下に独自設定を追加している場合は、設定の更新が必要です。
次のコマンドを実行し、独自の設定が存在するかどうか確認します。

```
# cd /var/www/shirasagi
# ls config/*.yml | fgrep -v secrets.yml | fgrep -v mongoid.yml
```

何も表示されなければ、独自の設定はありませんので、次のステップへお進みください。

何かファイルが表示されたら、独自の設定が存在しているので、一つ一つ差分を確認していきます。
例えば `config/mail.yml` が表示された場合、次のコマンドを実行し、既定の設定との差分を確認します。

```
# diff -u config/defaults/mail.yml config/mail.yml
```

そして、目視により増えた項目、減った項目を確認し、手動で修正します。

```
# vi config/mail.yml
# 既定の設定の差分から手動で設定を修正する
```

差分の反映方法が不明ない場合は、[Facebook のシラサギプロジェクト開発コミュニティ](https://www.facebook.com/groups/ssproj/)で質問してみてください。

## DB の差分更新

```
# rake ss:migrate
# bin/deploy
```

## Unicorn 起動設定ファイル

OS 起動時に Unicorn を起動する設定が /etc/systemd/system/unicorn.service というファイルにあります。
古いバージョンの設定ファイルは `ExecStart=` 行が次のように設定されています。

古い `ExecStart=` 行:

```
ExecStart=/usr/local/rvm/bin/start_unicorn  -c config/unicorn.rb -E production -D
```

上記のように設定されている場合、以下のように変更してください。

新しい `ExecStart=` 行:

```
ExecStart=/bin/bash -lc 'bundle exec unicorn_rails -c config/unicorn.rb -D'
```

## Web サーバーに apache httpd をご利用の方

Web サーバーに apache httpd をご利用の方は `config/environments/production.rb` に x-sendfile の設定をしていたかと思います。
この設定がソースコードの更新時に元に戻ってしまっている可能性がありますので、
[Apache のインストールの shirasagi の設定を変更する x-sendfile](/installation/apache.html#shirasagiの設定を変更するx-sendfile)を参考に、もう一度 x-sendfile を設定してください。

## Unicorn の再起動

本番サーバーでは root になり次のコマンドを実行:

```
$ su -
# systemctl restart unicorn
```

開発環境では次のコマンドを実行:

```
# cd /var/www/shirasagi
# rake unicorn:restart
```

Unicorn の再起動には 2, 3 分かかる場合があります。

## 定期実行設定の更新

v1.12.2 から定期実行設定が大きく変更されました。
[定期実行](/settings/cron.html)を確認し、必要であれば、定期実行設定を更新してください。

## 全文検索インデックスの更新

グループウェアの全文検索をご利用の方は全文検索インデックスの更新が必要です。
詳しくは[全文検索インデックスの更新](/updation/elasticsearch_index.html)を参照してください。
