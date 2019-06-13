---
layout: default
title: SHIRASAGI の更新
---

## ソースコードの更新

~~~
$ cd /var/www/shirasagi
$ git pull --ff-only
~~~

### (アーカイブを利用する場合)

### SHIRASAGI

~~~
$ cd /var/www
$ wget https://github.com/shirasagi/shirasagi/archive/stable.tar.gz -O shirasagi-stable.tar.gz

$ tar xzf shirasagi-stable.tar.gz
$ cd shirasagi
$ rm -rf app bin db doc lib spec vendor config/*/* public/assets*
$ cd ../
$ \cp -af shirasagi-stable/* shirasagi/
$ rm -rf shirasagi-stable*
~~~

> v1.4.0 でオープンデータプラグインは、SHIRASAGI にマージされました。
> オープンデータのアップデート手順は SHIRASAGI のアップデート手順と同じです。

## Gem の更新

~~~
# bundle install --without development test
~~~

## 設定の更新

`config/` の下に独自設定を追加している場合は、設定の更新が必要です。
次のコマンドを実行し、独自の設定が存在するかどうか確認します。

~~~
$ cd /var/www/shirasagi
$ ls config/*.yml | fgrep -v secrets.yml | fgrep -v mongoid.yml
~~~

何も表示されなければ、独自の設定はありませんので、次のステップへお進みください。

何かファイルが表示されたら、独自の設定が存在しているので、一つ一つ差分を確認していきます。
例えば `config/mail.yml` が表示された場合、次のコマンドを実行し、既定の設定との差分を確認します。

~~~
$ diff -u config/defaults/mail.yml config/mail.yml
~~~

そして、目視により増えた項目、減った項目を確認し、手動で修正します。

~~~
$ vi config/mail.yml
# 既定の設定の差分から手動で設定を修正する
~~~

差分の反映方法が不明ない場合は、[Facebook のシラサギプロジェクト開発コミュニティ](https://www.facebook.com/groups/ssproj/)で質問してみてください。

## DB の差分更新

~~~
$ rake ss:migrate
~~~

## Unicorn の再起動

~~~
$ rake unicorn:restart
~~~

## 全文検索インデックスの更新

グループウェアの全文検索をご利用の方は全文検索インデックスの更新が必要です。
詳しくは[全文検索インデックスの更新](/updation/elasticsearch_index.html)を参照してください。
