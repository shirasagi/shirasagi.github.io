---
layout: default
title: 定期実行
---

## ページ予約公開＆書き出し

```
*/15 * * * * /bin/bash -l -c 'cd /var/www/shirasagi && bundle exec rake cms:release_pages && bundle exec rake cms:generate_nodes' >/dev/null
0 * * * * /bin/bash -l -c 'cd /var/www/shirasagi && bundle exec rake cms:generate_pages' >/dev/null
```

## DBバックアップ

```
5 0 * * * /usr/bin/mongodump --db ss -o /var/db_backups/$(date +\%Y\%m\%d)
```
