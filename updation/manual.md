---
layout: default
title: SHIRASAGI の更新(RHEL8系)
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

1.GitHub から asdf のクローン

```
$ su -
# git clone https://github.com/asdf-vm/asdf.git /usr/local/asdf
```

2.管理グループの設定
管理者権限がなくても asdf を利用できるように管理グループ asdf を作成し、/usr/local/asdf の操作権限を付与します。
その後、管理グループに一般ユーザー を追加します。

例)ユーザが ssuser の場合

```
$ su -
# groupadd asdf
# chgrp -R asdf /usr/local/asdf
# chmod -R g+rwXs /usr/local/asdf
# gpasswd -a ssuser asdf
```

3.環境変数の設定

```
$ su -
# vi /etc/profile.d/asdf.sh
```

```
export ASDF_DIR=/usr/local/asdf
export ASDF_DATA_DIR=$ASDF_DIR

ASDF_BIN="${ASDF_DIR}/bin"
ASDF_USER_SHIMS="${ASDF_DATA_DIR}/shims"
PATH="${ASDF_BIN}:${ASDF_USER_SHIMS}:${PATH}"

. "${ASDF_DIR}/asdf.sh"
. "${ASDF_DIR}/completions/asdf.bash"
```

4.設定反映

```
# source /etc/profile.d/asdf.sh
```

## Ruby のインストール

```
$ asdf plugin add ruby
$ asdf install ruby 3.1.4
$ asdf global ruby 3.1.4
```

## Node.js のインストール

```
$ asdf plugin add nodejs
$ asdf install nodejs 20.5.0
$ asdf global nodejs 20.5.0
$ npm install -g yarn
```

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
# bundle exec rake ss:migrate
```

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
$ cd /var/www/shirasagi
$ bundle exec rake unicorn:restart
```

Unicorn の再起動には 2, 3 分かかる場合があります。

## 定期実行設定の更新

v1.12.2 から定期実行設定が大きく変更されました。
[定期実行](/settings/cron.html)を確認し、必要であれば、定期実行設定を更新してください。

## 全文検索インデックスの更新

グループウェアの全文検索をご利用の方は全文検索インデックスの更新が必要です。
詳しくは[全文検索インデックスの更新](/updation/elasticsearch_index.html)を参照してください。

## DEPRECATION WARNING: Your `secret_key_base` is configured

シラサギを v1.19 へ更新すると、次のような警告がでるようになる場合があります。

> DEPRECATION WARNING: Your `secret_key_base` is configured in `Rails.application.secrets`, which is deprecated in favor of `Rails.application.credentials` and will be removed in Rails 7.2. (called from <main> at /var/www/shirasagi/config/environment.rb:5)

この修正方法を[DEPRECATION WARNING: Your secret_key_base is ...](/trouble-shootings/secret_key_base.html)に記載していますので参考にしてください。
