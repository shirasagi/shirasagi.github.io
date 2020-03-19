---
layout: default
title: 定期実行
---

※ v1.12.2 から設定内容が大きく変更されています。以前の設定をお知りになりたい方は[v1.12.1以前の定期実行](/settings/cron-before-v1.12.1.html)を参照してください。

## 標準設定

通常は下記の内容を設定してください。
時間設定は環境に応じて変更が可能です。

~~~
## crontab -l

# 10分ごとのタスク
*/10 * * * * /bin/bash -l -c 'cd /var/www/shirasagi && bundle exec rake ss:timely' >/dev/null

# 1時間ごとのタスク
0 * * * * /bin/bash -l -c 'cd /var/www/shirasagi && bundle exec rake ss:hourly' >/dev/null

# 1日ごとのタスク
5 0 * * * /bin/bash -l -c 'cd /var/www/shirasagi && bundle exec rake ss:daily' >/dev/null

# 毎週月曜日のタスク
20 0 * * 1 /bin/bash -l -c 'cd /var/www/shirasagi && bundle exec rake ss:every_monday' >/dev/null

# CMS/ページ予約公開＆書き出し
*/15 * * * * /bin/bash -l -c 'cd /var/www/shirasagi && bundle exec rake cms:release_pages && bundle exec rake cms:generate_nodes' >/dev/null
0 * * * * /bin/bash -l -c 'cd /var/www/shirasagi && bundle exec rake cms:generate_pages' >/dev/null
~~~

### 気象庁防災情報XML

気象庁防災情報XMLを受信する場合は次のコマンドを定期実行へ登録してください。

~~~
## 気象庁防災情報XML受信
*/2 * * * * /bin/bash -l -c 'cd /var/www/shirasagi && bundle exec rake rss:pull_weather_xml' >/dev/null
~~~

上記のコマンドは 2 分間隔で気象庁防災情報XMLを受信する設定となっております。

ご利用のサーバーによっては 2 分間隔では短い場合がございます。もし受信処理が 2 分以内に終わらないようであれば、実行間隔を長くしてください。


## 必要であれば

~~~
# メールマガジン配信予約
*/15 * * * * /bin/bash -l -c 'cd /var/www/shirasagi && bundle exec rake ezine:deliver' >/dev/null

# リンクチェック
#  - site=xxx にはサイトのホスト名に合わせてください。
#  - email=xxx には結果を送信するメールアドレスを設定してください。
0 1 * * * /bin/bash -l -c 'cd /var/www/shirasagi && bundle exec rake cms:check_links site=www email=admin@example.jp'
~~~

## その他

~~~
# データベースのバックアップ
5 0 * * * /usr/bin/mongodump --db ss -o /var/db_backups/$(date +\%Y\%m\%d)
~~~
