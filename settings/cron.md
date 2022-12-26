---
layout: default
title: 定期実行
---

- v1.16.0 から cms:release_nodes が追加されました。
- v1.12.2 から設定内容が大きく変更されています。以前の設定をお知りになりたい方は[v1.12.1以前の定期実行](/settings/cron-before-v1.12.1.html)を参照してください。

## 標準設定

通常は下記の内容を設定してください。
時間設定は環境に応じて変更が可能です。

~~~
## crontab -l

# 10分ごとのタスク
*/10 * * * * /bin/bash -l -c 'cd /var/www/shirasagi && /usr/bin/flock -x -w 10 /var/www/shirasagi/tmp/ss_timely_lock bundle exec rake ss:timely' >/dev/null

# 1時間ごとのタスク
0 * * * * /bin/bash -l -c 'cd /var/www/shirasagi && /usr/bin/flock -x -w 10 /var/www/shirasagi/tmp/ss_hourly_lock bundle exec rake ss:hourly' >/dev/null

# 1日ごとのタスク
5 0 * * * /bin/bash -l -c 'cd /var/www/shirasagi && /usr/bin/flock -x -w 10 /var/www/shirasagi/tmp/ss_daily bundle exec rake ss:daily' >/dev/null

# 毎週月曜日のタスク
20 0 * * 1 /bin/bash -l -c 'cd /var/www/shirasagi && /usr/bin/flock -x -w 10 /var/www/shirasagi/tmp/ss_every_monday_lock bundle exec rake ss:every_monday' >/dev/null

# CMS/ページ予約公開＆書き出し
*/15 * * * * /bin/bash -l -c 'cd /var/www/shirasagi; /usr/bin/flock -x -w 10 /var/www/shirasagi/tmp/cms_release_nodes_lock bundle exec rake cms:release_nodes; /usr/bin/flock -x -w 10 /var/www/shirasagi/tmp/cms_release_pages_lock bundle exec rake cms:release_pages; /usr/bin/flock -x -w 10 /var/www/shirasagi/tmp/cms_generate_nodes_lock bundle exec rake cms:generate_nodes' >/dev/null
0 * * * * /bin/bash -l -c 'cd /var/www/shirasagi && /usr/bin/flock -x -w 10 /var/www/shirasagi/tmp/cms_generate_pages_lock bundle exec rake cms:generate_pages' >/dev/null
~~~

### CMS の気象庁防災情報XMLを利用する場合

気象庁防災情報XMLを受信する場合は次のコマンドを定期実行へ登録してください。

~~~
## 気象庁防災情報XML受信
*/2 * * * * /bin/bash -l -c 'cd /var/www/shirasagi && /usr/bin/flock -x -w 10 /var/www/shirasagi/tmp/rss_pull_weather_xml_lock bundle exec rake rss:pull_weather_xml' >/dev/null
~~~

上記のコマンドは 2 分間隔で気象庁防災情報XMLを受信する設定となっております。

ご利用のサーバーによっては 2 分間隔では短い場合がございます。もし受信処理が 2 分以内に終わらないようであれば、実行間隔を長くしてください。上記コマンドでは 2 分以内に受信処理が終わらなかった場合を考慮し、flock コマンドでロックが獲得できた場合にのみ受信処理を実行しています。


## CMS のメールマガジン配信予約を利用する場合

~~~
# メールマガジン配信予約
*/15 * * * * /bin/bash -l -c 'cd /var/www/shirasagi && /usr/bin/flock -x -w 10 /var/www/shirasagi/tmp/ezine_deliver_lock bundle exec rake ezine:deliver' >/dev/null
~~~

## CMS のリンクチェックを利用する場合

~~~
# リンクチェック
#  - site=xxx にはサイトのホスト名に合わせてください。
#  - email=xxx には結果を送信するメールアドレスを設定してください。
0 1 * * * /bin/bash -l -c 'cd /var/www/shirasagi && /usr/bin/flock -x -w 10 /var/www/shirasagi/tmp/cms_check_links bundle exec rake cms:check_links site=www email=admin@example.jp'
~~~

## CMSの全文検索を利用する場合

毎時0分に更新されたページをインデクシングします。

~~~
0 * * * * /bin/bash -l -c 'cd /var/www/shirasagi && /usr/bin/flock -x -w 10 /var/www/shirasagi/tmp/cms_es_feed_all_lock bundle exec rake cms:es:feed_releases site=www' > /dev/null
~~~

一週間に一度ぐらいの頻度で、全文検索の再インデクシングをすることをお勧めします。

~~~
59 0 * * 1 /bin/bash -l -c 'cd /var/www/shirasagi && /usr/bin/flock -x -w 10 /var/www/shirasagi/tmp/cms_es_feed_all_lock bundle exec rake cms:es:drop site=www && /usr/bin/flock -x -w 10 /var/www/shirasagi/tmp/cms_es_feed_all_lock bundle exec rake cms:es:create_indexes site=www && /usr/bin/flock -x -w 10 /var/www/shirasagi/tmp/cms_es_feed_all_lock bundle exec rake cms:es:feed_all site=www' > /dev/null
~~~

## CMSのLINEメッセージ配信予約を利用する場合

~~~
# LINE配信予約
*/15 * * * * /bin/bash -l -c 'cd /var/www/shirasagi && /usr/bin/flock -x -w 10 /var/www/shirasagi/tmp/cms_line_deliver_lock bundle exec rake cms:line:deliver site=www' >/dev/null
~~~

## CMSのLINEリッチメニュー更新を利用する場合

毎日1時にリッチメニューの更新を行います。

~~~
# LINEリッチメニュー更新
0 1 * * * /bin/bash -l -c 'cd /var/www/shirasagi && /usr/bin/flock -x -w 10 /var/www/shirasagi/tmp/cms_line_richmenu_lock bundle exec rake cms:line:apply_richmenu site=www' >/dev/null
~~~

## グループウェアの全文検索を利用する場合

毎日0時40分に全部をインデクシングします。

~~~
40 0 * * * /bin/bash -l -c 'cd /var/www/shirasagi && /usr/bin/flock -x -w 10 /var/www/shirasagi/tmp/gws_es_feed_all_lock bundle exec rake gws:es:feed_all site=シラサギ市' >/dev/null
~~~

毎日の実行にかえて一週間に一度の実行でも構いません。負荷に応じて適切に運用してください。

## データベースのバックアップ

~~~
# データベースのバックアップ
5 0 * * * /usr/bin/mongodump --db ss -o /var/db_backups/$(date +\%Y\%m\%d)
~~~
