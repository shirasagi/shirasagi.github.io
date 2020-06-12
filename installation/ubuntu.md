---
layout: default
title: インストールマニュアル - Ubuntu
---

## 検証環境

以下の Ubuntu で動作を確認しています。

- Ubuntu Server 14.04 LTS/64bit
- Ubuntu Server 16.04 LTS/64bit

上記以外のバージョンでも動作可能だとは思いますが、自己責任でインストールしてください。

## パッケージのダウンロード

~~~
$ sudo su
# apt-get -y install imagemagick libmagickcore-dev libmagickwand-dev gnupg2 git
~~~

## MongoDB のインストール

### Ubuntu 14.04 (trusty) をご利用の方

~~~
# apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv 0C49F3730359A14518585931BC711F9BA15703C6
# echo "deb [ arch=amd64 ] http://repo.mongodb.org/apt/ubuntu trusty/mongodb-org/3.4 multiverse" | tee /etc/apt/sources.list.d/mongodb-org-3.4.list
# apt-get update
# apt-get install -y mongodb-org
# service mongod start
~~~

### Ubuntu 16.04 (xenial) をご利用の方

~~~
# apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv 0C49F3730359A14518585931BC711F9BA15703C6
# echo "deb [ arch=amd64,arm64 ] http://repo.mongodb.org/apt/ubuntu xenial/mongodb-org/3.4 multiverse" | tee /etc/apt/sources.list.d/mongodb-org-3.4.list
# apt-get update
# apt-get install -y mongodb-org
# systemctl start mongod
~~~

### 上記以外のバージョンをご利用の方

MongoDB の [Official installation](https://docs.mongodb.com/manual/tutorial/install-mongodb-on-ubuntu/) を参照してください。

## Ruby(RVM) のインストール

~~~
# gpg2 --keyserver hkp://keys.gnupg.net --recv-keys D39DC0E3
# \curl -sSL https://get.rvm.io | sudo bash -s stable
# echo '[[ -s "/usr/local/rvm/scripts/rvm" ]] && source "/usr/local/rvm/scripts/rvm"' >> ~/.bashrc
# source /usr/local/rvm/scripts/rvm
# /usr/local/rvm/bin/rvm requirements
# rvm install 2.6.3 --disable-binary
# rvm use 2.6.3 --default
# gem install bundler --no-document
~~~

---
その他のインストール手順は [CentOS](manual.html) を参考にしてください。
