---
layout: default
title: グループウェアの始め方
---

## インストール手順

グループウェア機能はシラサギリポジトリに含まれているため、別途インストールの必要はありません。<br />
グループを作成し、グループに所属することでグループウェアの機能を利用することができます。<br />

## 初期設定

初めて利用する場合は、グループに対する管理権限をユーザーに付与してください。<br />
(GWSサンプルデータを適用した場合は admin ユーザーに権限が付与されています。)

~~~
$ bundle exec rake gws:set_admin_role user=admin site=シラサギ市
( bundle exec rake gws:set_admin_role user=ユーザーID site=グループ名 )
~~~

## 設定ファイル

必要に応じて設定ファイルを編集してください。

~~~
$ cp -n config/defaults/gws.yml config
$ vi config/gws.yml
~~~

~~~
production: &production
  # グループウェアへのリンクを非表示にします。
  disable: false

  # グループウェア画面で利用するStyleSheetファイルを設定します。
  stylesheets: ["gws/style"]

  # グループウェア画面で利用するJavaScriptファイルを設定します。
  javascripts: ["gws/script"]
~~~

## サンプルデータ

スケジュール、設備などのサンプルデータが投入されます。

~~~
$ bundle exec rake db:seed name=gws
~~~

## 定期実行

すべての機能を利用する場合は、以下の定期実行設定を行ってください。

~~~
## 通知
*/10 * * * * /bin/bash -l -c 'cd /var/www/shirasagi && bundle exec rake gws:notification:deliver' >/dev/null
## ゴミ箱掃除（例: 削除されてから 1 ヶ月がたったシラサギ市のデータの削除）
## パラメータは適時変更してください。
*/10 * * * * /bin/bash -l -c 'cd /var/www/shirasagi && bundle exec rake gws:trash:purge site=シラサギ市 threshold=1.month' >/dev/null
~~~
