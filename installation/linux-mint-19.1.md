---
layout: default
title: インストールマニュアル - Linux Mint
---

## 検証環境

- Linux Mint 19.1 Tessa

## パッケージのダウンロード

```
$ sudo apt-get install -y git imagemagick libmagickcore-dev libmagickwand-dev wget gnupg2
```

## MongoDB のインストール

> https://docs.mongodb.com/manual/tutorial/install-mongodb-on-ubuntu/

```
$ wget -qO - https://www.mongodb.org/static/pgp/server-4.4.asc | sudo apt-key add -
$ echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu focal/mongodb-org/4.4 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-4.4.list
$ sudo apt update
$ sudo apt install -y mongodb-org
$ sudo systemctl start mongod
$ sudo systemctl enable mongod
```

MongoDB を起動する前に [MongoDB の推奨設定を適用する方法](/installation/mongodb-settings.html) を参照の上、追加の設定を適用してください。

## Ruby(RVM) のインストール

> https://github.com/rvm/ubuntu_rvm

```
$ sudo apt-add-repository -y ppa:rael-gc/rvm
$ sudo apt-get update
$ sudo apt-get install -y rvm
$ source /usr/share/rvm/scripts/rvm #(Run command as login shell)
$ rvm install ruby 2.7.5 --disable-binary
$ rvm use 2.7.5 --default
```

## Nginx のインストール

> http://shirasagi.github.io/installation/nginx.html

```
$ sudo apt-get install -y nginx
$ cd /etc/nginx
( Nginx settings )
$ sudo systemctl start nginx
$ sudo systemctl enable nginx
```

## シラサギのインストール

```
$ sudo chown -R $(whoami) /var/www
$ git clone -b stable https://github.com/shirasagi/shirasagi.git /var/www/shirasagi
$ cd /var/www/shirasagi
$ cp -n config/samples/*.{rb,yml} config/
$ bundle install
$ rake unicorn:start

$ firefox http:/localhost:3000/.mypage &
```

---
その他のインストール手順は [CentOS](manual.html) を参考にしてください。
