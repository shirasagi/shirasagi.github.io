---
layout: default
title: バックアップとリストア
---

## ソースコード

### バックアップ

~~~
$ cd /var/www
$ tar czf shirasagi-bak.tar.gz shirasagi/
~~~

### リストア

~~~
$ cd /var/www
$ tar xzf shirasagi-bak.tar.gz
~~~

## データベース

### バックアップ

~~~
$ mongodump --db ss -o shirasagi-db
~~~

### リストア

~~~
$ mongorestore --drop --db ss shirasagi-db/ss
~~~
