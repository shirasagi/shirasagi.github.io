---
layout: default
title: インストールマニュアル - Ubuntu
---

## 検証環境

Ubuntu Server 14.04 LTS/64bit

## パッケージのダウンロード

~~~
$ sudo su
# apt-get -y install imagemagick libmagickcore-dev libmagickwand-dev gnupg2 git
~~~

## MongoDB のインストール

[Official installation](https://docs.mongodb.org/manual/tutorial/install-mongodb-on-ubuntu/)

~~~
# apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv 7F0CEB10
# echo "deb http://repo.mongodb.org/apt/ubuntu trusty/mongodb-org/3.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-3.0.list
# apt-get update
# apt-get install -y mongodb-org
~~~

## Ruby(RVM) のインストール

~~~
# gpg2 --keyserver hkp://keys.gnupg.net --recv-keys D39DC0E3
# \curl -sSL https://get.rvm.io | sudo bash -s stable
# echo '[[ -s "/usr/local/rvm/scripts/rvm" ]] && source "/usr/local/rvm/scripts/rvm"' >> ~/.bashrc
# source /usr/local/rvm/scripts/rvm
# /usr/local/rvm/bin/rvm requirements
# rvm install 2.3.0
# rvm use 2.3.0 --default
# gem install bundler
~~~

---
その他のインストール手順は [CentOS](manual.html) を参考にしてください。
