---
layout: default
title: インストールマニュアル - Linux Mint
---

## 検証環境

- Linux Mint 19.1 Tessa

## パッケージのダウンロード

```
$ sudo apt-get install -y git imagemagick libmagickcore-dev libmagickwand-dev
```

## MongoDB のインストール

> https://docs.mongodb.com/manual/tutorial/install-mongodb-on-ubuntu/

```
$ sudo apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv 9DA31620334BD75D9DCB49F368818C72E52529D4
$ echo "deb [ arch=amd64 ] https://repo.mongodb.org/apt/ubuntu bionic/mongodb-org/4.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-4.0.list
$ sudo apt-get update
$ sudo apt-get install -y mongodb-org
$ sudo systemctl start mongod
$ sudo systemctl enable mongod
```

## Ruby(RVM) のインストール

> https://github.com/rvm/ubuntu_rvm

```
$ sudo apt-add-repository -y ppa:rael-gc/rvm
$ sudo apt-get update
$ sudo apt-get install -y rvm
$ source /usr/share/rvm/scripts/rvm #(Run command as login shell)
$ rvm install ruby 2.6.3 --disable-binary
$ rvm use 2.6.3 --default
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
$ git clone -b stable --depth 1 https://github.com/shirasagi/shirasagi.git /var/www/shirasagi
$ cd /var/www/shirasagi
$ cp -n config/samples/*.{rb,yml} config/
$ bundle install
$ rake unicorn:start

$ firefox http:/localhost:3000/.mypage &
```

---
その他のインストール手順は [CentOS](manual.html) を参考にしてください。
