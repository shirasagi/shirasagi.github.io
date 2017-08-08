---
layout: default
title: サイトのデータ移行
---

## 概要

- サイトに関連するデータを、別サーバ上のサイトへ移行する機能です。
- この機能は現在、コマンド（タスク）実行のみ対応しています。

## 移行手順

### 1. エクスポート

移行元サイトを指定して、ZIPファイルを出力します。

~~~
$ rake cms:export_site site=www

> === Site Export ===
> Site name: 移行元サイト名
> Temporary directory: /var/www/shirasagi/private/export/site-www
> Outout file: /var/www/shirasagi/private/export/site-www.zip
> - export version
> - export cms_site
> - export cms_groups
> - export cms_users
> - export cms_roles
...
> Completed.
~~~

ZIPファイルには以下のデータが含まれています。

- DBデータ
- ドキュメントルート内の物理ファイル
- 非公開の物理ファイル

以下のデータは移行されません。

- ユーザー情報（管理ユーザー）
- メンバー情報（サイト訪問者）

### 2. 移行先サイトの作成

管理画面またはコマンド実行から移行先サイトを作成します。

~~~
$ rake ss:create_site data='{ name: "移行先サイト", host: "www2", domains: "www2.localhost:3000" }'
~~~

### 3. インポート

作成した移行先サイトにデータを投入します。

~~~
$ rake cms:import_site site=www2 file=/path/to/site-www.zip

> === Site Import ===
> Site name: 移行先サイト名
> Temporary directory: /var/www/shirasagi/private/import/site-www2
> Import file: private/export/site-www.zip
> - extract
> - import cms_roles
> - import cms_roles
> - import cms_users_roles
> - import ss_files
...
> Completed.
~~~
