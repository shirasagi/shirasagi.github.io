---
layout: default
title: 管理コマンド一覧
---

## データベース更新

~~~
$ bundle exec rake ss:migrate
~~~

### データベース更新状況の確認

~~~
$ bundle exec rake ss:migrate:status
~~~

データベース更新を実行した後で down と表示されるものがある場合は、以下の特定バージョンのみ適用するコマンドを用いて down のものだけを適用してください。

### 特定バージョンのみ適用

"20200204000000" のみを適用する例

~~~
$ bundle exec rake ss:migrate:up VERSION=20200204000000
~~~


## ユーザー管理

ユーザーの作成

~~~
$ bundle exec rake ss:create_user data='{ name: "Name", uid: "UID", email: "Email", password: "password" }'
~~~

システム管理権限の付与（SYS）

~~~
$ bundle exec rake sys:set_admin_role user=admin
~~~

サイト管理権限の付与（CMS）

~~~
$ bundle exec rake cms:set_admin_role user=admin site=www
~~~

GWS管理権限の付与（GWS）

~~~
$ bundle exec rake gws:set_admin_role user=admin site=シラサギ市
~~~

## CMS - コンテンツ管理

サイトの作成

~~~
$ bundle exec rake ss:create_site data='{ name: "サイト名", host: "www", domains: "localhost:3000" }'
~~~

予約公開/非公開

~~~
$ bundle exec rake cms:release_pages
~~~

フォルダー書き出し (トップページ, 一覧ページ)

~~~
$ bundle exec rake cms:generate_nodes site=www
~~~

ページ書き出し

~~~
$ bundle exec rake cms:generate_pages site=www
~~~

メールマガジンの配信

~~~
$ bundle exec rake ezine:deliver
~~~

RSS の取り込み

~~~
$ bundle exec rake rss:import_items
~~~

クローリングリソースの更新（オープンデータ）

~~~
$ bundle exec rake opendata:crawl site=www
~~~

## サンプルデータ

自治体サンプル

~~~
$ bundle exec rake db:seed name=demo site=www
~~~

企業サンプル

~~~
$ bundle exec rake db:seed name=company site=www
~~~

オープンデータサンプル

~~~
$ bundle exec rake db:seed name=opendata site=www
~~~

GWS サンプル

~~~
$ bundle exec rake db:seed name=gws
~~~
