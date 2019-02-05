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
$ systemctl start mongod
$ systemctl enable mongod
```

## Ruby(RVM) のインストール

> https://github.com/rvm/ubuntu_rvm

```
$ sudo apt-add-repository -y ppa:rael-gc/rvm
$ sudo apt-get update
$ sudo apt-get install -y rvm
( Run command as login shell )
$ rvm install ruby 2.4.4
$ rvm use 2.4.4 --default
$ rvmsudo gem install bundler --no-document -v1.17.3
```

## シラサギのインストール

```
sudo chown -R `whoami` /var/www && cd /var/www
git clone -b stable --depth 1 git@github.com:shirasagi/shirasagi.git shirasagi
cp -n config/samples/*.{rb,yml} config/
rvmsudo bundle install
```

## Web サーバの起動

```
rake unicorn:start
firefox http:/localhost:3000/.mypage/login &
```

---
その他のインストール手順は [CentOS](manual.html) を参考にしてください。
