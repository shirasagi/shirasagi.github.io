---
layout: default
title: インストールマニュアル
---

CentOS 7 向けのインストールマニュアルです。

## セキュリティ設定

環境に応じて適宜セキュリティを設定してください。<br />
下記は検証環境用に SELlinux, Firewalld を無効にしています。

~~~
$ su -
# setenforce 0
# sed -i 's/SELINUX=enforcing/SELINUX=disabled/g'/etc/selinux/config
# systemctl stop firewalld
# systemctl disable firewalld
~~~

## パッケージのダウンロード

~~~
$ su -
# yum -y install wget git ImageMagick ImageMagick-devel
~~~

## MongoDB のインストール

[Official installation](http://docs.mongodb.org/manual/installation/)

~~~
# vi /etc/yum.repos.d/mongodb-org-3.2.repo
~~~

~~~
[mongodb-org-3.2]
name=MongoDB Repository
baseurl=https://repo.mongodb.org/yum/redhat/$releasever/mongodb-org/3.2/x86_64/
gpgcheck=0
enabled=0
~~~

~~~
# yum install -y --enablerepo=mongodb-org-3.2 mongodb-org
# systemctl start mongod
# systemctl enable mongod
~~~

> [ CentOS 6 ] <br />
> /sbin/service mongod start <br />
> /sbin/chkconfig mongod on <br />

## Ruby(RVM) のインストール

~~~
# gpg2 --keyserver hkp://keys.gnupg.net --recv-keys D39DC0E3
# \curl -sSL https://get.rvm.io | bash -s stable
# source /etc/profile
# rvm install 2.3.0
# rvm use 2.3.0 --default
# gem install bundler
~~~

## ダウンロード

### SHIRASAGI

~~~
$ git clone -b stable --depth 1 https://github.com/shirasagi/shirasagi /var/www/shirasagi
~~~

> v1.4.0 でオープンデータプラグインは、SHIRASAGI にマージされました。
> オープンデータに関する機能をご利用の場合も SHIRASAGI のソースコードをダウンロードしてください。

## Web サーバの起動

~~~
$ cd /var/www/shirasagi
$ cp -n config/samples/*.{rb,yml} config/
$ bundle install --without development test
$ rake unicorn:start
~~~

> http://localhost:3000/.mypage にアクセスするとログイン画面が表示されます。

## ふりがな機能のインストール

~~~
# cd /usr/local/src
# wget http://mecab.googlecode.com/files/mecab-0.996.tar.gz \
    http://mecab.googlecode.com/files/mecab-ipadic-2.7.0-20070801.tar.gz \
    http://mecab.googlecode.com/files/mecab-ruby-0.996.tar.gz \
    https://raw.githubusercontent.com/shirasagi/shirasagi/stable/vendor/mecab/mecab-ipadic-2.7.0-20070801.patch

# cd /usr/local/src
# tar xvzf mecab-0.996.tar.gz && cd mecab-0.996
# ./configure --enable-utf8-only && make && make install

# cd /usr/local/src
# tar xvzf mecab-ipadic-2.7.0-20070801.tar.gz && cd mecab-ipadic-2.7.0-20070801
# patch -p1 < ../mecab-ipadic-2.7.0-20070801.patch
# ./configure --with-charset=UTF-8 && make && make install

# cd /usr/local/src
# tar xvzf mecab-ruby-0.996.tar.gz && cd mecab-ruby-0.996
# ruby extconf.rb && make && make install

# echo "/usr/local/lib" >> /etc/ld.so.conf
# ldconfig
~~~

> mecab ビルド後に `ldconfig` が必要なケースがあります。

## 音声読み上げ機能のインストール

~~~
# cd /usr/local/src
# wget http://downloads.sourceforge.net/hts-engine/hts_engine_API-1.08.tar.gz \
    http://downloads.sourceforge.net/open-jtalk/open_jtalk-1.07.tar.gz \
    http://downloads.sourceforge.net/lame/lame-3.99.5.tar.gz \
    http://downloads.sourceforge.net/sox/sox-14.4.1.tar.gz

# cd /usr/local/src
# tar xvzf hts_engine_API-1.08.tar.gz && cd hts_engine_API-1.08
# ./configure && make && make install

# cd /usr/local/src
# tar xvzf open_jtalk-1.07.tar.gz && cd open_jtalk-1.07
# sed -i "s/#define MAXBUFLEN 1024/#define MAXBUFLEN 10240/" bin/open_jtalk.c
# sed -i "s/0x00D0 SPACE/0x000D SPACE/" mecab-naist-jdic/char.def
# ./configure --with-charset=UTF-8 && make && make install

# cd /usr/local/src
# tar xvzf lame-3.99.5.tar.gz && cd lame-3.99.5
# ./configure && make && make install

# cd /usr/local/src
# tar xvzf sox-14.4.1.tar.gz && cd sox-14.4.1
# ./configure && make && make install

# ldconfig
~~~

## 新規サイトの作成

カレントディレクトリを移動

~~~
$ cd /var/www/shirasagi
~~~

データベースの作成（インデックスの作成）

~~~
$ rake db:drop
$ rake db:create_indexes
~~~

管理者ユーザーの作成

```
$ rake ss:create_user data='{ name: "システム管理者", email: "sys@example.jp", password: "pass" }'
```

サイトの作成

~~~
$ rake ss:create_site data='{ name: "サイト名", host: "www", domains: "localhost:3000" }'
~~~

> 以上の操作でサイトを構築するための最低限のデータが作成できました。
> 雛形となるサイトのデータセットが必要な場合は、次節のサンプルデータをご利用ください。

## サンプルデータ

サンプルデータはご利用に合わせていずれかをインポートしてください。
サンプルデータの詳細は[オンラインデモ](http://www.ss-proj.org/download/demo.html)をご確認ください。

### 自治体サンプル

~~~
$ rake db:seed name=demo site=www
~~~

### 企業サンプル

~~~
$ rake db:seed name=company site=www
~~~

### 子育て支援サンプル

~~~
$ rake db:seed name=childcare site=www
~~~

### オープンデータサンプル

~~~
$ rake db:seed name=opendata site=www
~~~

## サイトの確認

<http://localhost:3000/.mypage> から `admin` / `pass` のアカウントでログインし、
サイト名をクリックすると、登録したデモデータを確認・編集することができます。
