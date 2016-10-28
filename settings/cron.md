---
layout: default
title: 定期実行
---

日時の設定は目安として記載しています。

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
~~~

## オープンデータ

~~~
## クローリングリソースの更新
## - site=www の箇所は、実際のサイト名に合わせてください。
5 0 * * * /bin/bash -l -c 'cd /var/www/shirasagi && bundle exec rake opendata:crawl site=www' >/dev/null
~~~

## GWS

~~~
## リマインダーメール通知
*/10 * * * * /bin/bash -l -c 'cd /var/www/shirasagi && bundle exec rake gws:reminder:notification:deliver' >/dev/null
~~~

## その他

~~~
## DBバックアップ
5 0 * * * /usr/bin/mongodump --db ss -o /var/db_backups/$(date +\%Y\%m\%d)
~~~
