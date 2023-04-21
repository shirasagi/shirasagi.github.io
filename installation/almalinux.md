---
layout: default
title: インストールマニュアル
---

AlmaLinux8 向けのインストールマニュアルです。

## セキュリティ設定

環境に応じて適宜セキュリティを設定してください。<br />
下記は検証環境用に SELlinux, Firewalld を無効にしています。

```
# setenforce 0
# sed -i 's/SELINUX=enforcing/SELINUX=disabled/g'/etc/selinux/config
# systemctl stop firewalld
# systemctl disable firewalld
```

## パッケージのダウンロード

```
# dnf -y install epel-release.noarch
# dnf config-manager --disable epel
# dnf -y groupinstall "Development tools"
# dnf -y --enablerepo=epel,powertools install ImageMagick ImageMagick-devel wget git
```

## ImageMagick のバージョン確認

shirasagi v1.14.0 からは ImageMagick のバージョンが 6.9 以上である必要があります。  
次のコマンドを実行して ImageMagick のバージョンを確認してください。

```
# convert --version | grep Version
```

```
Version: ImageMagick 6.9.12-19 Q16 x86_64 2021-07-18 https://imagemagick.org
```

## ImageMagick のポリシー修正<br>

> ※ImageMagick のバージョンによっては /etc/ImageMagick ディレクトリが存在しない場合があります。<br>
> その場合は下記 policy.xml の変更は必要ありません。

```
# vi /etc/ImageMagick-6/policy.xml
```

```
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
```

参考: <https://github.com/diaspora/diaspora/issues/6828>

## ImageMagick の動作確認（画像認証の動作確認）

次のコマンドを実行してみます。

```
# convert -fill darkblue -background white -size 100x28 -wave 0x88 -gravity Center -pointsize 22 -implode 0.2 label:3407 jpeg:/dev/null
```

ただしく設定できている場合、上記のコマンドを実行しても何も出力されません。何も出力されない場合、シラサギで画像認証を利用可能です。

しかし、エラーが出力される場合、このままではシラサギで画像認証を利用することはできません。
利用している OS などの情報を検索し、エラーを修正する必要があります。

参考: <https://github.com/shirasagi/shirasagi/issues/3200>

## ImageMagick のフォント設定

認証画像は表示できているが、画像が見切れているなどの理由で convert コマンドのフォント指定を変更したい場合 cms.yml にて設定できます。

注）この設定は v1.14.0 にて導入されました。

```
# cd /var/www/shirasagi
# cp config/defaults/cms.yml config （既に cms.yml をコピーしている場合は不要です。）
# vi config/cms.yml

### captcha の font の値を変更 ###
  captcha:
    font: NimbusSans-Bold
```

なお ImageMagick の場合、以下のコマンドで、設定可能なフォント一覧を確認できます。

```
# convert -list font
```

## MongoDB のインストール

[Official installation](http://docs.mongodb.org/manual/installation/)

```
# vi /etc/yum.repos.d/mongodb-org-4.4.repo
```

```
[mongodb-org-4.4]
name=MongoDB Repository
baseurl=https://repo.mongodb.org/yum/redhat/$releasever/mongodb-org/4.4/x86_64/
gpgcheck=1
enabled=1
gpgkey=https://www.mongodb.org/static/pgp/server-4.4.asc
```

```
# dnf install -y --enablerepo=mongodb-org-4.4 mongodb-org
# systemctl enable mongod --now
```

MongoDB を起動する前に [MongoDB の推奨設定を適用する方法](/installation/mongodb-settings.html) を参照の上、追加の設定を適用してください。

## asdf のインストール

```
# git clone https://github.com/asdf-vm/asdf.git ~/.asdf
# vi ~/.bashrc
---(追記)
. $HOME/.asdf/asdf.sh
. $HOME/.asdf/completions/asdf.bash
---
# source ~/.bashrc
```

## Ruby のインストール

```
# asdf plugin add ruby
# asdf install ruby VERSION
# asdf global ruby VERSION
```

> `VERSION`: ruby のバージョンは[README.md](https://github.com/shirasagi/shirasagi/blob/stable/README.md)をご参照ください。

## Node.js のインストール

```
# asdf plugin add nodejs
# asdf install nodejs VERSION
# asdf global nodejs VERSION
# npm install -g yarn
```

> `VERSION`: Node.js のバージョンは[README.md](https://github.com/shirasagi/shirasagi/blob/stable/README.md)をご参照ください。

## ダウンロード

### SHIRASAGI

```
# git clone -b stable https://github.com/shirasagi/shirasagi /var/www/shirasagi
```

> v1.4.0 でオープンデータプラグインは、SHIRASAGI にマージされました。
> オープンデータに関する機能をご利用の場合も SHIRASAGI のソースコードをダウンロードしてください。

## Web サーバの起動

```
# cd /var/www/shirasagi
# cp -n config/samples/*.{rb,yml} config/
# source /opt/rh/devtoolset-11/enable
# bundle install --without development test
# bin/deploy
# bundle exec rake unicorn:start
```

> http://localhost:3000/.mypage にアクセスするとログイン画面が表示されます。

## ふりがな機能のインストール

```
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
```

> mecab ビルド後に `ldconfig` が必要なケースがあります。

## 音声読み上げ機能のインストール

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

## 新規サイトの作成

カレントディレクトリを移動

```
# cd /var/www/shirasagi
```

データベースの作成（インデックスの作成）

```
# bundle exec rake db:drop
# bundle exec rake db:create_indexes
```

### サンプルデータを利用する

サンプルデータはご利用に合わせていずれかをインポートしてください。<br />
サンプルデータの詳細は[オンラインデモ](http://www.ss-proj.org/download/demo.html)をご確認ください。<br />
各サンプルデータには以下の内容が含まれています。

- ユーザー
- グループ
- サイトコンテンツ

#### サイトの作成

```
# bundle exec rake ss:create_site data='{ name: "サイト名", host: "www", domains: "localhost:3000" }'
```

#### サンプルデータの適用

```
## 自治体サンプル
# bundle exec rake db:seed site=www name=demo

## 企業サンプル
# bundle exec rake db:seed site=www name=company

## 子育て支援サンプル
# bundle exec rake db:seed site=www name=childcare

## オープンデータサンプル
# bundle exec rake db:seed site=www name=opendata

## LPサンプル
# bundle exec rake db:seed site=www name=lp
```

<http://localhost:3000/.mypage> から `admin` / `pass` のアカウントでログインし、
サイト名をクリックすると、登録したサンプルデータを確認・編集することができます。

### サンプルデータを利用しない

#### 管理者ユーザーの作成

```
# bundle exec rake ss:create_user data='{ name: "システム管理者", email: "sys@example.jp", password: "pass" }'
```

#### サイトの作成

管理画面に管理者ユーザーでログイン後、以下の手順でサイトを作成してください。

- ログイン後のマイページ画面から、[システム設定] へ移動する。
- [グループ] からサイト管理用のグループを作成する。
- [ユーザー] からユーザーを作成・編集してグループに所属させる。
- [サイト] からサイトを新規に作成し、管理グループを適用する。

[ユーザー管理コマンド](/settings/cmd.html)もご確認ください。
