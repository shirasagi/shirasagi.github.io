---
layout: default
title: SHIRASAGI の更新
---

## ソースコードの更新

~~~
$ cd /var/www/shirasagi
$ git pull
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
