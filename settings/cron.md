---
layout: default
title: 定期実行
---

## ページ予約公開＆書き出し

```
*/15 * * * * /bin/bash -l -c 'cd /var/www/shirasagi && bundle exec rake cms:release_pages && bundle exec rake cms:generate_nodes' >/dev/null
0 * * * * /bin/bash -l -c 'cd /var/www/shirasagi && bundle exec rake cms:generate_pages' >/dev/null
```

## RSS取込

```
0 * * * * /bin/bash -l -c 'cd /var/www/shirasagi && bundle exec rake rss:import_pages' >/dev/null
```

> RSS取込フォルダーを利用しない方は、本設定は不要です。

## Webクロール

※ [オープンデータプラグイン](https://github.com/shirasagi/opendata) をご利用の方のみ

```
5 0 * * * /bin/bash -l -c 'cd /var/www/shirasagi && bundle exec rake opendata:crawl site=www' >/dev/null
```

> `site=www` の箇所は、実際のサイト名に合わせてください。

## DBバックアップ

```
5 0 * * * /usr/bin/mongodump --db ss -o /var/db_backups/$(date +\%Y\%m\%d)
```
