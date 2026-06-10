---
layout: default
title: インストールマニュアル
---

RHEL8 系 向けのインストールマニュアルです。
下記ディストリビューションでの動作検証を行なってます。

RockyLinux 8
AlmaLinux 8

## セキュリティ設定

環境に応じて適宜セキュリティを設定してください。<br />
下記は検証環境用に SELlinux, Firewalld を無効にしています。

```
$ sudo setenforce 0
$ sudo sed -i 's/SELINUX=enforcing/SELINUX=disabled/g' /etc/selinux/config
$ sudo systemctl stop firewalld
$ sudo systemctl disable firewalld
```

## パッケージのダウンロード

```
$ sudo dnf -y install epel-release.noarch wget
$ sudo dnf config-manager --disable epel
$ sudo dnf --enablerepo=epel -y update epel-release
$ sudo dnf -y groupinstall "Development tools"
$ sudo dnf -y --enablerepo=epel,powertools install ImageMagick ImageMagick-devel openssl-devel libyaml-devel mecab mecab-devel mecab-ipadic
```

> ImageMagick のポリシーを調整する場合は[こちら](installation/imagemagick.html)を参照の上、追加の設定を適用してください。

## MongoDB のインストール

[Official installation](http://docs.mongodb.org/manual/installation/)

```
$ sudo vi /etc/yum.repos.d/mongodb-org-8.0.repo
```

```
[mongodb-org-8.0]
name=MongoDB Repository
baseurl=https://repo.mongodb.org/yum/redhat/$releasever/mongodb-org/8.0/x86_64/
gpgcheck=1
enabled=0
gpgkey=https://www.mongodb.org/static/pgp/server-8.0.asc
```

```
$ sudo dnf install -y --enablerepo=mongodb-org-8.0 mongodb-org
$ sudo systemctl enable mongod --now
```

MongoDB を起動する前に [MongoDB の推奨設定を適用する方法](/installation/mongodb-settings.html)を参照の上、追加の設定を適用してください。

## asdf のインストール

1. asdf のダウンロード

```
$ wget https://github.com/asdf-vm/asdf/releases/download/v0.18.1/asdf-v0.18.1-linux-amd64.tar.gz
$ tar -xzf asdf-v0.18.1-linux-amd64.tar.gz
$ sudo mv asdf /usr/local/bin/
```

2. 環境変数の設定

```
$ vi $HOME/.bashrc
```

```
export PATH="${ASDF_DATA_DIR:-$HOME/.asdf}/shims:$PATH"
```

> `.bashrc` の末尾に追加してください。

3. 設定反映

```
$ source $HOME/.bashrc
```

> 上記コマンド実行後、環境によっては、`exec $SHELL -l` が必要な場合があります。

## Ruby のインストール

```
$ asdf plugin add ruby
$ asdf install ruby VERSION
$ asdf set ruby VERSION
```

> `VERSION`: ruby のバージョンは[README.md](https://github.com/shirasagi/shirasagi/blob/stable/README.md)をご参照ください。

## Node.js のインストール

```
$ asdf plugin add nodejs
$ asdf install nodejs VERSION
$ asdf set nodejs VERSION
$ npm install -g yarn
```

> `VERSION`: Node.js のバージョンは[README.md](https://github.com/shirasagi/shirasagi/blob/stable/README.md)をご参照ください。

## SHIRASAGI ダウンロード

1. インストールディレクトリの権限を一般ユーザーに変更します。

   例)ユーザが ssuser の場合

```
$ sudo mkdir -p /var/www
$ sudo chown -R ssuser /var/www
```

2. GitHub からクローン

```
$ git clone -b stable https://github.com/shirasagi/shirasagi /var/www/shirasagi
```

> v1.4.0 でオープンデータプラグインは、SHIRASAGI にマージされました。
> オープンデータに関する機能をご利用の場合も SHIRASAGI のソースコードをダウンロードしてください。

## ふりがな機能のインストール

```
$ sudo chmod 777 /usr/local/src
$ cd /usr/local/src
$ cp -arp /var/www/shirasagi/vendor/mecab/mecab-ruby-0.996.tar.gz ./
$ tar xvzf mecab-ruby-0.996.tar.gz && cd mecab-ruby-0.996
$ ruby extconf.rb && make && make install
$ cd /var/www/shirasagi
$ cp config/defaults/kana.yml config/
$ sed -i "s#/usr/local/libexec/mecab/mecab-dict-index#/usr/libexec/mecab/mecab-dict-index#" config/kana.yml
$ sed -i "s#/usr/local/lib/mecab/dic/ipadic#/usr/lib64/mecab/dic/ipadic#" config/kana.yml
```

> Mecab をソースからコンパイルする場合には、[こちら](/installation/mecab.html)を確認ください。

## 音声読み上げ機能のインストール

```
$ cd /usr/local/src
$ wget http://downloads.sourceforge.net/hts-engine/hts_engine_API-1.08.tar.gz \
   http://downloads.sourceforge.net/open-jtalk/open_jtalk-1.07.tar.gz \
   http://downloads.sourceforge.net/lame/lame-3.99.5.tar.gz \
   http://downloads.sourceforge.net/sox/sox-14.4.1.tar.gz

$ cd /usr/local/src
$ tar xvzf hts_engine_API-1.08.tar.gz && cd hts_engine_API-1.08
$ ./configure && make && make install

$ cd /usr/local/src
$ tar xvzf open_jtalk-1.07.tar.gz && cd open_jtalk-1.07
$ sed -i "s/#define MAXBUFLEN 1024/#define MAXBUFLEN 10240/" bin/open_jtalk.c
$ sed -i "s/0x00D0 SPACE/0x000D SPACE/" mecab-naist-jdic/char.def
$ ./configure --with-charset=UTF-8 && make && make install

$ cd /usr/local/src
$ tar xvzf lame-3.99.5.tar.gz && cd lame-3.99.5
$ ./configure && make && make install

$ cd /usr/local/src
$ tar xvzf sox-14.4.1.tar.gz && cd sox-14.4.1
$ ./configure && make && make install

$ sudo ldconfig
```
> 環境変数 PATH に/usr/local/bin を追記が必要なケースがあります。

## SHIRASAGI のインストール

```
$ cd /var/www/shirasagi
$ cp -n config/samples/*.{yml,rb} config/
$ bundle install --without development test
$ bundle exec rails credentials:edit
$ ./bin/deploy
```

> `GLIBC_2.29` 関する警告が発生された場合には、`bundle config set force_ruby_platform true` を実行し再度 `bundle install` から実行してください。<br />
> `secret_key_base` 関する警告が表示された場合は、[トラブルシューティング](/trouble-shootings/secret_key_base.html)を確認ください。

## Web サーバの起動

```
$ sudo cp -n /var/www/shirasagi/bin/puma.service /etc/systemd/system/puma.service
$ sudo vi /etc/systemd/system/puma.service
```

```
[Service]
User=ssuser
...（省略）
```

```
$ sudo systemctl daemon-reload
$ sudo systemctl start puma
```

> `puma.service` の User はシラサギの実行ユーザに合わせてください。<br />
> unicornで起動させる場合は、[Unicorn のインストール](/installation/unicorn.html)を確認ください。<br />
> http://localhost:3000/.mypage にアクセスするとログイン画面が表示されます。

## 新規サイトの作成

カレントディレクトリを移動

```
$ cd /var/www/shirasagi
```

データベースの作成（インデックスの作成）

```
$ bundle exec rake db:drop
$ bundle exec rake db:create_indexes
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
$ bundle exec rake ss:create_site data='{ name: "サイト名", host: "www", domains: "localhost:3000" }'
```

#### サンプルデータの適用

```
## 自治体サンプル
$ bundle exec rake db:seed site=www name=demo

## 企業サンプル
$ bundle exec rake db:seed site=www name=company

## 子育て支援サンプル
$ bundle exec rake db:seed site=www name=childcare

## オープンデータサンプル
$ bundle exec rake db:seed site=www name=opendata

## LPサンプル
$ bundle exec rake db:seed site=www name=lp
```

<http://localhost:3000/.mypage> から `admin` / `pass` のアカウントでログインし、
サイト名をクリックすると、登録したサンプルデータを確認・編集することができます。

### サンプルデータを利用しない

#### 管理者ユーザーの作成

```
$ bundle exec rake ss:create_user data='{ name: "システム管理者", email: "sys@example.jp", password: "pass" }'
```

#### サイトの作成

管理画面に管理者ユーザーでログイン後、以下の手順でサイトを作成してください。

- ログイン後のマイページ画面から、[システム設定] へ移動する。
- [グループ] からサイト管理用のグループを作成する。
- [ユーザー] からユーザーを作成・編集してグループに所属させる。
- [サイト] からサイトを新規に作成し、管理グループを適用する。

[ユーザー管理コマンド](/settings/cmd.html)もご確認ください。

## 正式サービスとしてご利用する際の注意点

本番環境等正式サービスとして利用の際、アプリケーションサーバであるUnicornで
リクエストを直接受ける構成はセキュリティ上好ましくありません。<br />
フロントにNginx等のWEBサーバを立て、セキュリティに配慮した設定を反映し運用頂くことを推奨いたします。<br />
Nginxの導入につきましては[Nginxのインストール](/installation/nginx.html)をご確認ください。
