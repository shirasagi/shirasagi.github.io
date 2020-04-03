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

## ImageMagick のポリシー修正

~~~
# vi /etc/ImageMagick/policy.xml
~~~

~~~
<policymap>
  <!-- <policy domain="system" name="precision" value="6"/> -->
  <!-- <policy domain="resource" name="temporary-path" value="/tmp"/> -->
  <!-- <policy domain="resource" name="memory" value="2GiB"/> -->
  <!-- <policy domain="resource" name="map" value="4GiB"/> -->
  <!-- <policy domain="resource" name="area" value="1GB"/> -->
  <!-- <policy domain="resource" name="disk" value="16EB"/> -->
  <!-- <policy domain="resource" name="file" value="768"/> -->
  <!-- <policy domain="resource" name="thread" value="4"/> -->
  <!-- <policy domain="resource" name="throttle" value="0"/> -->
  <!-- <policy domain="resource" name="time" value="3600"/> -->
  <policy domain="coder" rights="none" pattern="EPHEMERAL" />
  <policy domain="coder" rights="read" pattern="HTTPS" />
  <policy domain="coder" rights="none" pattern="HTTP" />
  <policy domain="coder" rights="none" pattern="URL" />
  <policy domain="coder" rights="none" pattern="FTP" />
  <policy domain="coder" rights="none" pattern="MVG" />
  <policy domain="coder" rights="none" pattern="MSL" />
  <policy domain="coder" rights="none" pattern="TEXT" />
  <!--policy domain="coder" rights="read | write" pattern="LABEL" /-->
  <policy domain="path" rights="none" pattern="@*" />
  <policy domain="coder" rights="read | write" pattern="JPEG" />
  <policy domain="coder" rights="read | write" pattern="PNG" />
</policymap>
~~~

参考: <https://github.com/diaspora/diaspora/issues/6828>

## ImageMagick の動作確認（画像認証の動作確認）

次のコマンドを実行してみます。

~~~
$ convert -fill darkblue -background white -size 100x28 -wave 0x88 -gravity Center -pointsize 22 -implode 0.2 label:3407 jpeg:/dev/null
~~~

ただしく設定できている場合、上記のコマンドを実行しても何も出力されません。何も出力されない場合、シラサギで画像認証を利用可能です。

しかし、エラーが出力される場合、このままではシラサギで画像認証を利用することはできません。
利用している OS などの情報を検索し、エラーを修正する必要があります。

参考: <https://github.com/shirasagi/shirasagi/issues/3200>

## MongoDB のインストール

[Official installation](http://docs.mongodb.org/manual/installation/)

~~~
# vi /etc/yum.repos.d/mongodb-org-3.4.repo
~~~

~~~
[mongodb-org-3.4]
name=MongoDB Repository
baseurl=https://repo.mongodb.org/yum/redhat/$releasever/mongodb-org/3.4/x86_64/
gpgcheck=1
enabled=1
gpgkey=https://www.mongodb.org/static/pgp/server-3.4.asc
~~~

~~~
# yum install -y --enablerepo=mongodb-org-3.4 mongodb-org
# systemctl start mongod
# systemctl enable mongod
~~~

> [ CentOS 6 ] <br />
> /sbin/service mongod start <br />
> /sbin/chkconfig mongod on <br />

## Ruby(RVM) のインストール

~~~
# gpg2 --keyserver hkp://pool.sks-keyservers.net --recv-keys 409B6B1796C275462A1703113804BB82D39DC0E3 7D2BAF1CF37B13E2069D6956105BD0E739499BDB
# \curl -sSL https://get.rvm.io | sudo bash -s stable
# source /etc/profile
# rvm install 2.6.3
# rvm use 2.6.3 --default
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
# wget -O mecab-0.996.tar.gz "https://drive.google.com/uc?export=download&id=0B4y35FiV1wh7cENtOXlicTFaRUE"
# wget -O mecab-ipadic-2.7.0-20070801.tar.gz "https://drive.google.com/uc?export=download&id=0B4y35FiV1wh7MWVlSDBCSXZMTXM"
# wget -O mecab-ruby-0.996.tar.gz "https://drive.google.com/uc?export=download&id=0B4y35FiV1wh7VUNlczBWVDZJbE0"
# wget https://raw.githubusercontent.com/shirasagi/shirasagi/stable/vendor/mecab/mecab-ipadic-2.7.0-20070801.patch

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

### サンプルデータを利用する

サンプルデータはご利用に合わせていずれかをインポートしてください。<br />
サンプルデータの詳細は[オンラインデモ](http://www.ss-proj.org/download/demo.html)をご確認ください。<br />
各サンプルデータには以下の内容が含まれています。

- ユーザー
- グループ
- サイトコンテンツ

#### サイトの作成

~~~
$ rake ss:create_site data='{ name: "サイト名", host: "www", domains: "localhost:3000" }'
~~~

#### サンプルデータの適用

~~~
## 自治体サンプル
$ rake db:seed site=www name=demo

## 企業サンプル
$ rake db:seed site=www name=company

## 子育て支援サンプル
$ rake db:seed site=www name=childcare

## オープンデータサンプル
$ rake db:seed site=www name=opendata

## LPサンプル
$ rake db:seed site=www name=lp
~~~

<http://localhost:3000/.mypage> から `admin` / `pass` のアカウントでログインし、
サイト名をクリックすると、登録したサンプルデータを確認・編集することができます。

### サンプルデータを利用しない

#### 管理者ユーザーの作成

~~~
$ rake ss:create_user data='{ name: "システム管理者", email: "sys@example.jp", password: "pass" }'
~~~

#### サイトの作成

管理画面に管理者ユーザーでログイン後、以下の手順でサイトを作成してください。

- ログイン後のマイページ画面から、[システム設定] へ移動する。
- [グループ] からサイト管理用のグループを作成する。
- [ユーザー] からユーザーを作成・編集してグループに所属させる。
- [サイト] からサイトを新規に作成し、管理グループを適用する。

[ユーザー管理コマンド](/settings/cmd.html)もご確認ください。
