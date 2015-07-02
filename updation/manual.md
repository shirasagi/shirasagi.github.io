---
layout: default
title: SHIRASAGI の更新
---

## ソースコードの更新

```
$ cd /var/www/shirasagi
$ git pull
```

### (アーカイブを利用する場合)

### SHIRASAGI

```
$ cd /var/www
$ wget https://github.com/shirasagi/shirasagi/archive/stable.tar.gz -O shirasagi-stable.tar.gz

$ tar xzf shirasagi-stable.tar.gz
$ cd shirasagi
$ rm -rf app bin db doc lib spec vendor config/*/* public/assets*
$ cd ../
$ \cp -af shirasagi-stable/* shirasagi/
$ rm -rf shirasagi-stable*
```

### オープンデータプラグイン

```
$ cd /var/www
$ wget https://github.com/shirasagi/opendata/archive/stable.tar.gz -O opendata-stable.tar.gz

$ tar xzf opendata-stable.tar.gz
$ cd shirasagi
$ rm -rf app bin db doc lib spec vendor config/*/* public/assets*
$ cd ../
$ \cp -af opendata-stable/* shirasagi/
$ rm -rf opendata-stable*
```

## Gem の更新

```
# bundle install
```

## DB の差分更新

```
$ rake ss:migrate
```

## Unicorn の再起動

```
$ rake unicorn:restart
```
