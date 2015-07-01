---
layout: default
title: Manual
---

## Packages

```
$ su -
# yum -y install wget git ImageMagick ImageMagick-devel
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
# rvm use 2.2.2 --default
# gem install bundler
```

## Download

### SHIRASAGI

```
$ git clone -b stable --depth 1 https://github.com/shirasagi/shirasagi /var/www/shirasagi
```

### オープンデータプラグイン

```
$ git clone -b stable --depth 1 https://github.com/shirasagi/opendata /var/www/shirasagi
```

> オープンデータプラグインは、SHIRASAGI が持つ全機能に加え、データカタログ、
> アプリマーケット、アイデアボックス、マイページ、CSV to RDF 変換などのオープンデータに関する機能を持っている反面、
> SHIRASAGI より少し余分にリソースを消費します。
> オープンデータプラグインが持つ機能に関しては[リリースノート](http://www.ss-proj.org/release/284.html)を参照してください。
>
> CMSの機能のみが必要であれば *SHIRASAGI* を、
> オープンデータに関する追加機能が必要であれば *オープンデータプラグイン* をダウンロードし、
> 必要とする機能に応じて *SHIRASAGI* か *オープンデータプラグイン* のどちらかをダウンロードしてください。

## Preparation

```
$ cd /var/www/shirasagi
$ cp -n config/samples/* config/
$ bundle install
$ rake unicorn:start
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

> [モジュール - 音声読み上げ](../features/voice.html)

## 新規サイト構築

カレントディレクトリを移動

```
$ cd /var/www/shirasagi
```

データベースの作成

MongoDB の場合、インデックスを作成すると、自動的にデータベースも作成されます。

```
$ rake db:drop
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

> 「インデックスの作成」「管理者ユーザーの作成」「サイトの作成」を実行すると、
> SHIRASAGI の管理画面 http://localhost:3000/.mypage を利用して、
> CSS ファイルを作成し、JavaScript を書き、レイアウト、パーツを書き、
> フォルダーを作成し、記事を書くことでゼロからサイトを構築することができます。
>
> しかし、ゼロからサイトを構築するのは多大な手間なので、次節で説明する
> 「ユーザー/グループデータ」を登録して雛形となるユーザーとグループを登録し、
> 3 つのデモデータ「自治体デモ」「企業デモ」「オープンデータデモ」のうち、
> どれか一つを登録して雛形となるサイトを構築し、ひな形を編集することで
> 労力を節約することができます。

## サンプルデータ

SHIRASAGI では、ユーザー/グループのサンプルと、3 種類のデモデータを提供しています。
まず、ユーザー、グループのサンプルを登録し、3 種類のデモデータのうち 1 つを登録します。

> ただし、オープンデータデモは、オープンデータプラグインでのみ提供されています。

### ユーザー/グループデータ

```
$ rake db:seed name=users site=www
```

上記のコマンドを実行すると、雛形となるユーザーとグループを登録します。

### 自治体デモ

自治体デモの登録

```
$ rake db:seed name=demo site=www
```

[自治体サンプル](http://demo.ss-proj.org/)にあるようなサイトを構築します。

### 企業デモ

企業デモの登録

```
$ rake db:seed name=company site=www
```

[企業サンプル](http://company.demo.ss-proj.org/)にあるようなサイトを構築します。

### オープンデータデモ

*オープンデータプラグイン* をご利用の方のみ、
次のコマンドでオープンデータデモの登録が可能です。

```
$ rake db:seed name=opendata site=www
```

[オープンデータサンプル](http://opendata.demo.ss-proj.org/)にあるようなサイトを構築します。

### デモデータの確認

> http://localhost:3000/.mypage から `admin@example.jp`, `pass` のアカウントでログインし、
サイト名をクリックすると、登録したデモデータを確認・編集することができます。

> オープンデータプラグインをご利用の方で、サイトデータの登録に失敗する方やログイン出来ない方は、
> `shirasagi/opendata` を `git clone` しているかどうかを確認して下さい。
