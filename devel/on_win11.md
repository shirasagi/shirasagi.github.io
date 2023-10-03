---
layout: default
title: Windows11でのシラサギ開発
---

Windows11でシラサギを開発できるようになるまでの環境面について説明します。Ruby, Ruby on Railsの開発方法、gitコマンドやGitHubの使い方、DockerやDocker Desktopの使い方などについてはインターネットの文書や市販の書籍をあたってください。

## 利用するソフトウェア

次のソフトウェアを利用します。

- WSL2（WSLおよびWSL1は不可）
- Docker Desktop
- VSCode
- Windows Terminal

### WSL2のインストール

インストール方法については様々なやり方がインターネットに見つかります。
基本的にはそれらを参照していただくとして、一番簡単だと思うのは、
PowerShell かコマンドプロンプトを管理者モードで開き、以下のコマンドを実行します。

~~~
wsl --install
~~~

このコマンドを実行すると Ubuntu ディストリビューションがインストールされます。

### Docker Desktopのインストール

次の手順でDocker Desktopをインストールしてください。

1. [Docker Desktop の公式サイト](https://www.docker.com/products/docker-desktop/)からWindows版をダウンロードし、インストールしてください。
  - 余談ですが、WSL2 の Ubuntu にインストールするのではなく、Windowsにインストールしてください。
2. インストールの際、"Use the WSL 2 based engine" を選択してください。インストール中にこの設定が見つからない場合、インストール後に Docker Desktop を起動し、Setting - General にある "Use the WSL 2 based engine" を有効にしてください。
3. インストール後、Docker Desktop を起動し、Setting - Resources - WSL integration にある "Enable integration with my default WSL distro" にチェックを入れてください。

### VSCodeのインストール

次の手順でVSCodeをインストールしてください。

1. [VSCodeの公式サイト](https://code.visualstudio.com/)の[Download](https://code.visualstudio.com/download)から、Windows版をダウンロードし、インストールしてください。
  - 余談ですが、WSL2 の Ubuntu にインストールするのではなく、Windowsにインストールしてください。
2. VSCodeのWSL Extensionをインストールしてください。この機能拡張をインストールすると、WSL2のUbuntu上に展開したソースコードをVSCodeで開けるようになります。

### Windows Terminalのインストール

Micorsoft Storeアプリを起動し、"Windows Terminal"を検索し、インストールします。

## WSL2のUbuntuの設定

初期状態のUbuntuではシラサギ開発に必要なライブラリなどが足りません。必要なものをインストールします。

### 基本ツール・基本ライブラリのインストール

好みも含まれていますが、Windows TerminalでUbuntuへ接続し、
以下のコマンドを実行し基本ツール・基本ライブラリをインストールします。

~~~
$ sudo apt install build-essential zlib zlib1g-dev libssl-dev imagemagick graphicsmagick \
  sox libsox-dev lame libmp3lame-dev mecab libmecab-dev mecab-ipadic-utf8 \
  open-jtalk open-jtalk-mecab-naist-jdic
~~~


### Google Chromeのインストール

Google ChromeはRSpecで利用します。Windows TerminalでUbuntuへ接続し、次のコマンドを実行してインストールしてください。

~~~
# key のインストール
$ wget https://dl-ssl.google.com/linux/linux_signing_key.pub
$ sudo mv linux_signing_key.pub /etc/apt/keyrings/google-chrome-key.asc
$ sudo chown root:root /etc/apt/keyrings/google-chrome-key.asc

# リポジトリの追加
$ echo 'deb [arch=amd64 signed-by=/etc/apt/keyrings/google-chrome-key.asc] https://dl.google.com/linux/chrome/deb/ stable main' \
  | sudo tee /etc/apt/sources.list.d/google-chrome.list

# google chrome インストール
$ sudo apt update
$ sudo apt install google-chrome-stable

# noto font のインストール
$ sudo apt install fonts-noto-cjk fonts-noto-cjk-extra
~~~

### ロケールの変更

既定のロケールは英語になっていると思います。シラサギ開発中の不意の障害を防止する意味でもWindows TerminalでUbuntuへ接続し、次のコマンドを実行して日本語に変更します。

~~~
$ sudo apt install language-pack-ja
$ localectl list-locales
C.UTF-8
ja_JP.UTF-8
$ sudo localectl set-locale LANG=ja_JP.UTF-8
~~~

### asdf / Ruby / nodejs のインストール

Windows TerminalでUbuntuへ接続し、以下のコマンドを実行し、asdf, Ruby, nodejsのそれぞれをインストールします。

~~~
$ sudo apt install build-essential zlib1g-dev libssl-dev imagemagick graphicsmagick

$ git clone https://github.com/asdf-vm/asdf.git ~/.asdf --branch v0.12.0
$ source ~/.asdf/asdf.sh

$ asdf plugin add ruby
$ asdf plugin add nodejs

$ asdf list all ruby
$ asdf install ruby 2.7.8
$ asdf install ruby 3.0.6
$ asdf install ruby 3.1.4
$ asdf global ruby 3.0.6

$ asdf list all nodejs
$ asdf install nodejs 20.8.0
$ asdf global nodejs 20.8.0

$ npm install --global yarn
~~~

### MongoDBのインストール

MongoDB Serverはdockerで動作させ、MongoDB ToolsはUbuntuで動作させるようにします。

#### MongoDB Serverのインストール

Windows TerminalでUbuntuへ接続し、次のコマンドを実行し、MongoDB Server 4.4をインストールし実行します。

~~~
$ docker pull mongo:4.4
$ docker run —name mongo -d -p 27017:27017 mongo:4.4
~~~

マシンを再起動すると、MongoDB Serverは停止しています。
シラサギ開発の前にDocker Desktopからmongoを起動するようにしてください。

#### MongoDB Toolsのインストール

Windows TerminalでUbuntuへ接続し、以下のコマンドを実行し、MongoDB Toolsをインストールします。

~~~
$ sudo apt-get install gnupg curl
$ curl -fsSL https://pgp.mongodb.com/server-6.0.asc | \
   sudo gpg -o /usr/share/keyrings/mongodb-server-6.0.gpg \
   --dearmor
$ echo "deb [ arch=amd64,arm64 signed-by=/usr/share/keyrings/mongodb-server-6.0.gpg ] https://repo.mongodb.org/apt/ubuntu jammy/mongodb-org/6.0 multiverse" \
  | sudo tee /etc/apt/sources.list.d/mongodb-org-6.0.list
$ sudo apt update
$ sudo apt install mongodb-org-tools mongodb-mongosh
~~~

これで mongodump, mongorestore, mongoshなどのコマンドが利用できるようになります。

## シラサギ開発

### ソースコード展開

Windows TerminalでUbuntuへ接続し、次のコマンドを実行してシラサギのソースコードを `~/Projects/shirasagi` に展開します。

~~~
$ mkdir Projects && cd Projects
$ git clone https://github.com/shirasagi/shirasagi.git
$ cd shirasagi
~~~

### 基本設定ファイルの準備

基本的な設定ファイルを作成します。Windows TerminalでUbuntuへ接続し、次のコマンドを実行します。

~~~
$ cd ~/Projects/shirasagi
$ cp -p config/samples/{mongoid,secrets}.yml config/
$ cp -p config/defaults/environment.yml config/
~~~

WindowsでVSCodeを起動し、Ubuntuへ接続し、`~/Projects/shirasagi/`を開きます。

VSCodeで、config/mongoid.yml を開き、以下のような内容に変更します。

~~~
# MongoDB Configuration
#
# if you want to know about detail configuration,
# see: https://docs.mongodb.org/ecosystem/tutorial/mongoid-installation/#mongoid-configuration
production: &production
  clients:
    default:
      database: ss
      hosts:
        - localhost:27017
      options:
        truncate_logs: false

development:
  <<: *production

test:
  clients:
    default:
      database: ss_test
      hosts:
        - localhost:27017
      options:
        truncate_logs: false
~~~

VSCodeで、config/environment.yml を開き、冒頭の `RAILS_ENV` を "development" に変更します。

以上で開発の準備ができました。

### bundle installとassetsのビルド

bundle install などを実行します。Windows TerminalでUbuntuへ接続し、以下のコマンドを実行します。
（VSCode の Terminal で実行しても構いません）

~~~
$ cd ~/Projects/shirasagi
$ bundle install
$ yarn install && yarn build
~~~

### RSpec試行

試しに RSpec を実行してみます。Windows TerminalでUbuntuへ接続し、以下のコマンドを実行してみてください。
（VSCode の Terminal で実行しても構いません）

~~~
bundle exec rspec spec/features/sys/groups_spec.rb
~~~

テストが問題なく実行できれば、セットアップに成功しています。

### シードの投入とシラサギの起動

Ubuntu で以下のコマンドを実行し、シードを投入します。
（VSCode の Terminal で実行しても構いません）

~~~
# シード投入前にすべて消去
$ bundle exec rake db:drop
$ rm -rf private public
$ git checkout -- private public

# DB作成
$ bundle exec rake db:create_indexes

# シードの投入
$ bundle exec rake ss:create_site data="{ name: '自治体サンプル', host: 'www', domains: 'www.example.jp:3000', mypage_domain: 'localhost:3000', map_api: 'openlayers' }"
$ bundle exec rake db:seed site=www name=demo
~~~

Ubuntu で以下のコマンドを実行し、シラサギを起動します。
（VSCode の Terminal で実行しても構いません）

~~~
$ bundle exec rails s
~~~

Windowsでブラウザを開き、"http://localhost:3000/.mypage" へアクセスしてみます。
シラサギの管理画面へのログイン画面が表示されれば、成功です。

