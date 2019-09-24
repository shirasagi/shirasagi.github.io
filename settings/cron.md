---
layout: default
title: 定期実行
---

日時の設定は目安として記載しています。

## 共通

~~~
## 日ごとのメンテナンス
## - ss:delete_download_files (エクスポートファイルの削除)
## - history:trash:purge(ゴミ箱掃除 purge_threshold で期間の指定)
0 2 * * * /bin/bash -l -c 'cd /var/www/shirasagi && bundle exec rake ss:daily purge_threshold=14.days' >/dev/null
~~~

## CMS

~~~
## ページ予約公開＆書き出し
*/15 * * * * /bin/bash -l -c 'cd /var/www/shirasagi && bundle exec rake cms:release_pages && bundle exec rake cms:generate_nodes' >/dev/null
0 * * * * /bin/bash -l -c 'cd /var/www/shirasagi && bundle exec rake cms:generate_pages' >/dev/null

## メールマガジン配信予約
## - メールマガジンの配信予約機能を利用しない方は、本設定は不要です
*/15 * * * * /bin/bash -l -c 'cd /var/www/shirasagi && bundle exec rake ezine:deliver' >/dev/null

## RSS取込
## - RSS取込フォルダーを利用しない方は、本設定は不要です。
0 * * * * /bin/bash -l -c 'cd /var/www/shirasagi && bundle exec rake rss:import_items' >/dev/null

## リンクチェック
## - site=www の箇所は、実際のサイト名に合わせてください。
## - email=admin@example.jp の箇所にリンクチェック結果を送信するメールアドレスを設定します。
0 1 * * * /bin/bash -l -c 'cd /var/www/shirasagi && bundle exec rake cms:check_links site=www email=admin@example.jp'

## ゴミ箱掃除（例: 削除されてから 1 ヶ月がたったホスト名が www のサイトのデータの削除）
## パラメータは適時変更してください。
5 0 * * * /bin/bash -l -c 'cd /var/www/shirasagi && bundle exec rake history:trash:purge site=www purge_threshold=1.month' >/dev/null
~~~

## オープンデータ

~~~
## クローリングリソースの更新
## - site=www の箇所は、実際のサイト名に合わせてください。
5 0 * * * /bin/bash -l -c 'cd /var/www/shirasagi && bundle exec rake opendata:crawl site=www' >/dev/null
~~~

## GWS

~~~
## 通知
*/10 * * * * /bin/bash -l -c 'cd /var/www/shirasagi && bundle exec rake gws:notification:deliver' >/dev/null

## ゴミ箱掃除（例: 削除されてから 1 ヶ月がたったシラサギ市のデータの削除）
## パラメータは適時変更してください。
5 0 * * * /bin/bash -l -c 'cd /var/www/shirasagi && bundle exec rake gws:trash:purge site=シラサギ市 threshold=1.month' >/dev/null
~~~

## その他

~~~
## DBバックアップ
5 0 * * * /usr/bin/mongodump --db ss -o /var/db_backups/$(date +\%Y\%m\%d)
~~~
