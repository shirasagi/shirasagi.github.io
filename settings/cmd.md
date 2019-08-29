---
layout: default
title: 管理コマンド
---

## デプロイ

データベースの差分更新

~~~
$ rake ss:migrate
~~~

## ユーザー管理

ユーザーの作成

~~~
$ rake ss:create_user data='{ name: "Name", uid: "UID", email: "Email", password: "password" }'
~~~

システム管理権限の付与（SYS）

~~~
$ rake sys:set_admin_role user=admin
~~~

サイト管理権限の付与（CMS）

~~~
$ rake cms:set_admin_role user=admin site=www
~~~

GWS管理権限の付与（GWS）

~~~
$ rake gws:set_admin_role user=admin site=シラサギ市
~~~

## CMS - コンテンツ管理

サイトの作成

~~~
$ rake ss:create_site data='{ name: "サイト名", host: "www", domains: "localhost:3000" }'
~~~

予約公開/非公開

~~~
$ rake cms:release_pages
~~~

フォルダー書き出し (トップページ, 一覧ページ)

~~~
$ rake cms:generate_nodes site=www
~~~

ページ書き出し

~~~
$ rake cms:generate_pages site=www
~~~

メールマガジンの配信

~~~
$ rake ezine:deliver
~~~

RSS の取り込み

~~~
$ rake rss:import_items
~~~

クローリングリソースの更新（オープンデータ）

~~~
$ rake opendata:crawl site=www
~~~

## サンプルデータ

自治体サンプル

~~~
$ rake db:seed name=demo site=www
~~~

企業サンプル

~~~
$ rake db:seed name=company site=www
~~~

オープンデータサンプル

~~~
$ rake db:seed name=opendata site=www
~~~

GWS サンプル

~~~
$ rake db:seed name=gws
~~~


## 開発 - モジュール管理

インストール

~~~
$ bin/egg install sample-egg -v 1.0.0
~~~

アンインストール

~~~
$ bin/egg uninstall sample-egg
~~~

圧縮ファイル生成

~~~
$ bin/egg pack sample-egg -v 1.0.0
~~~
