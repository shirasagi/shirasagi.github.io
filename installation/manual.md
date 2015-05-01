---
layout: default
title: Manual
---

## Packages

```
$ su -
# yum -y install ImageMagick ImageMagick-devel
```

## MongoDB

[Official installation](http://docs.mongodb.org/manual/installation/)

```
# vi /etc/yum.repos.d/CentOS-Base.repo
```

```
[mongodb-org-3.0]
name=MongoDB Repository
baseurl=http://repo.mongodb.org/yum/redhat/$releasever/mongodb-org/3.0/x86_64/
gpgcheck=0
enabled=0
```

```
# yum install -y --enablerepo=mongodb-org-3.0 mongodb-org
# /sbin/service mongod start
# /sbin/chkconfig mongod on
```

## Ruby(RVM)

```
# gpg2 --keyserver hkp://keys.gnupg.net --recv-keys D39DC0E3
# \curl -sSL https://get.rvm.io | sudo bash -s stable
# source /etc/profile
# rvm install 2.2.2
```

## SHIRASAGI

```
$ git clone -b stable --depth 1 https://github.com/shirasagi/shirasagi /var/www/shirasagi
$ cd /var/www/shirasagi
$ cp -n config/samples/* config/
# bundle install
# rake unicorn:start
```

> http://localhost:3000/.mypage にアクセスするとログイン画面が表示されます。

## ふりがな機能

```
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
```

> mecab ビルド後に `ldconfig` が必要なケースがあります。

## 音声読み上げ

```
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
```

> [モジュール - 音声読み上げ](../module/voice.html)

## データベース操作

カレントディレクトリを移動

```
$ cd /var/www/shirasagi
```

インデックスの作成

```
$ rake db:create_indexes
```

管理者ユーザーの作成

```
$ rake ss:create_user data='{ name: "システム管理者", email: "sys@example.jp", password: "pass" }'
```

サイトの作成

```
$ rake ss:create_site data='{ name: "サイト名", host: "www", domains: "localhost:3000" }'
```

## サンプルデータ

ユーザー、グループデータの登録

```
$ rake db:seed name=users site=www
```

サイトデータの登録

```
$ rake db:seed name=demo site=www
```

> http://localhost:3000/.mypage から `admin@example.jp`, `pass` のアカウントでログインできます。
