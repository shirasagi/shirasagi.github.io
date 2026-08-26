---
layout: default
title: macでのシラサギ開発
---

mac でシラサギを開発できるようになるまでの環境面について説明します。Ruby, Ruby on Rails の開発方法、git コマンドや GitHub の使い方などについてはインターネットの文書や市販の書籍をあたってください。

ミドルウェアのインストール手順は [AlmaLinux のインストールマニュアル](/installation/almalinux.html)、シラサギ側の設定手順は [Windows11でのシラサギ開発](/devel/on_win11.html) にそれぞれ対応しています。あわせてご確認ください。

**このマニュアルではミドルウェアを mac へ直接インストールして、開発する方針を示します。**

> Docker を利用して開発環境を構築したい場合は [devcontainer](/installation/devcontainer.html) を参照してください。


## 対象環境

- Apple Silicon（M シリーズ）搭載の mac
- Homebrew（Apple Silicon のためインストール先は `/opt/homebrew`）
- SHIRASAGI v1.21（最新版）

### 古いバージョンのシラサギについて

**このページの手順は最新のシラサギ（v1.21）を対象としています。**

古いバージョンのシラサギは、要求する Ruby および gem のバージョンが古く、Apple Silicon ではインストールに失敗します。

- 古い Ruby（2.6 系、2.7 系など）は arm64 向けのビルドが通らないことがあります
- `nokogiri`、`ffi`、`libv8`、`therubyracer` といったネイティブ拡張を含む古い gem には arm64-darwin 向けのビルド定義がなく、`bundle install` が失敗します

古いバージョンのシラサギを Apple Silicon の mac で動かしたい場合は、[devcontainer](/installation/devcontainer.html) などの Docker を用いた方法を検討してください。Intel mac であれば、このページの手順（`/opt/homebrew` を `/usr/local` に読み替え）でインストールできます。

## 事前準備

### Command Line Tools のインストール

ターミナルを開き、次のコマンドを実行します。すでにインストール済みの場合は何もせず終了します。

```
$ xcode-select --install
```

### Homebrew のインストール

[Homebrew の公式サイト](https://brew.sh/ja/)の手順に従ってインストールします。

```
$ /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```

インストール後、`brew` コマンドへパスを通します。

```
$ echo 'eval "$(/opt/homebrew/bin/brew shellenv)"' >> ~/.zprofile
$ eval "$(/opt/homebrew/bin/brew shellenv)"
$ brew --prefix
/opt/homebrew
```

> `brew --prefix` が `/opt/homebrew` を返すことを確認してください。<br />
> `/usr/local` が返る場合は Intel 版の Homebrew<!--（もしくは Rosetta 2 経由）-->です。以降のパスをすべて `/usr/local` に読み替えてください。

# ミドルウェアのインストール

## パッケージのインストール

Ruby のビルドと画像処理に必要なパッケージをインストールします。

```
$ brew install autoconf openssl@3 readline libyaml gmp
$ brew install imagemagick@6
```

`imagemagick@6` は keg-only（`/opt/homebrew/bin` へリンクされない）なので、`convert` コマンドへパスを通します。

```
$ echo 'export PATH="/opt/homebrew/opt/imagemagick@6/bin:$PATH"' >> ~/.zshrc
$ exec $SHELL -l
$ convert --version | grep Version
Version: ...
```

> シラサギは ImageMagick 6.9 以上を必要とします。詳細は [ImageMagick のバージョン確認](/installation/imagemagick.html) を参照してください。<br />
> ImageMagick 7 系（`brew install imagemagick`）でも動作しますが、`convert` コマンドが同梱されないバージョンがあるため、ここでは 6 系を利用します。

画像認証（CAPTCHA）が動作することを確認します。何も出力されなければ成功です。

```
$ convert -fill darkblue -background white -size 100x28 -wave 0x88 -gravity Center -pointsize 22 -implode 0.2 label:3407 jpeg:/dev/null
```

## MongoDB のインストール

MongoDB は Homebrew の公式 tap（`mongodb/brew`）からインストールします。

```
$ brew tap mongodb/brew
$ brew install mongodb-community@8.0
```

> シラサギがサポートする MongoDB のバージョンは [README.md](https://github.com/shirasagi/shirasagi/blob/stable/README.md) をご参照ください。<br />
> バージョンを指定しない `mongodb-community` を指定すると、サポート対象外の最新版がインストールされることがあります。<br />
> `mongosh` と `mongodb-database-tools`（`mongodump`, `mongorestore` など）は依存パッケージとして同時にインストールされます。

MongoDB を起動します。`brew services` で起動しておくと、mac の再起動後も自動的に起動します。

```
$ brew services start mongodb-community@8.0
```

起動を確認します。

```
$ mongosh --quiet --eval 'db.version()'
8.0.20
```

設定ファイルとデータの配置先は次のとおりです。

| 内容 | パス |
| --- | --- |
| 設定ファイル | `/opt/homebrew/etc/mongod.conf` |
| データ | `/opt/homebrew/var/mongodb` |
| ログ | `/opt/homebrew/var/log/mongodb/mongo.log` |

<!--
> 開発機のためチューニングは不要ですが、MongoDB のメモリ消費を抑えたい場合は [MongoDB 推奨設定](/installation/mongodb-settings.html) の「MongoDB のメモリ消費抑制」を参照し、`/opt/homebrew/etc/mongod.conf` に設定してください。
-->

## asdf のインストール

Ruby と Node.js のバージョン管理には asdf を利用します。

```
$ brew install asdf
```

環境変数を設定します。

```
$ echo 'export PATH="${ASDF_DATA_DIR:-$HOME/.asdf}/shims:$PATH"' >> ~/.zshrc
$ exec $SHELL -l
$ asdf --version
```

> mac の既定のシェルは zsh です。bash を利用している場合は `~/.bashrc` に設定してください。

## Ruby のインストール

```
$ asdf plugin add ruby
$ asdf install ruby VERSION
$ asdf set --home ruby VERSION
```

> `VERSION`: Ruby のバージョンは [README.md](https://github.com/shirasagi/shirasagi/blob/stable/README.md) をご参照ください。<br />
> `asdf set` はカレントディレクトリに `.tool-versions` を作成します。`--home` を付けるとホームディレクトリに作成され、全体の既定バージョンになります。

```
$ ruby -v
ruby 3.4.x (...) [arm64-darwin24]
```

<!--
> `arm64-darwin` と表示されることを確認してください。`x86_64-darwin` と表示される場合は Rosetta 2 経由で動作しています。
-->

## Node.js のインストール

```
$ asdf plugin add nodejs
$ asdf install nodejs VERSION
$ asdf set --home nodejs VERSION
$ npm install -g yarn
```

> `VERSION`: Node.js のバージョンは [README.md](https://github.com/shirasagi/shirasagi/blob/stable/README.md) をご参照ください。

## SHIRASAGI ダウンロード

GitHub からクローンします。ここでは `~/Projects/shirasagi` へ展開します。

```
$ mkdir -p ~/Projects && cd ~/Projects
$ git clone https://github.com/shirasagi/shirasagi.git
$ cd shirasagi
```

<!--
> 開発ではなく動作確認が目的の場合は `-b stable` を付けて安定版をクローンしてください。
-->

## ふりがな機能のインストール

### MeCab のインストール

```
$ brew install mecab mecab-ipadic
```

### mecab-ruby のインストール

シラサギに同梱されている `mecab-ruby` をビルドしてインストールします。

```
$ mkdir -p ~/src && cd ~/src
$ cp -p ~/Projects/shirasagi/vendor/mecab/mecab-ruby-0.996.tar.gz ./
$ tar xvzf mecab-ruby-0.996.tar.gz && cd mecab-ruby-0.996
$ ruby extconf.rb --with-opt-dir=/opt/homebrew && make && make install
```

>**extconf.rb の パス解決の為 `--with-opt-dir=/opt/homebrew` が必要です。**

<!--
> `mecab-ruby` の `extconf.rb` は `mecab-config --cflags` しか参照せず、リンカへ `-L` を渡しません。そのため、素の `ruby extconf.rb` では `-lmecab` が macOS に標準で含まれる `/usr/lib/libmecab.dylib`（Apple 製で C API のみを公開）に解決されます。Ruby 拡張は `-undefined dynamic_lookup` でリンクされるためビルド自体は成功しますが、`MeCab::createTagger` などの C++ シンボルが実行時に解決できず、`MeCab::Tagger.new` が `Segmentation fault` でクラッシュします。
-->

以下のようにすると、RubyからMeCabが正しく動作することを確認できます。

<!--
```
$ otool -L $(ruby -e 'print RbConfig::CONFIG["sitearchdir"]')/MeCab.bundle | grep mecab
	/opt/homebrew/opt/mecab/lib/libmecab.2.dylib (compatibility version 3.0.0, current version 3.0.0)
```

> `/opt/homebrew/opt/mecab/lib/libmecab.2.dylib` と表示されれば成功です。<br />
> `/usr/lib/libmecab.dylib` と表示される場合は上記の状態になっています。`make clean` を実行し、`--with-opt-dir` を付けてビルドし直してください。
-->

```
$ ruby -e 'require "MeCab"; puts MeCab::Tagger.new.parse("白鷺城")'
白鷺城	名詞,固有名詞,一般,*,*,*,白鷺城,シラサギジョウ,シラサギジョー
EOS
```

> `mecab-ruby` は Ruby のバージョンごとにインストールされます。asdf で Ruby のバージョンを切り替えた場合は、切り替え後の Ruby で再度ビルド・インストールしてください。

### kana.yml の作成

`config/defaults/kana.yml` は `/usr/local` を前提としているため、Homebrew のパスで上書きする `config/kana.yml` を作成します。

```
$ cd ~/Projects/shirasagi
$ cp config/defaults/kana.yml config/
$ sed -i '' "s#/usr/local/libexec/mecab/mecab-dict-index#/opt/homebrew/opt/mecab/libexec/mecab/mecab-dict-index#" config/kana.yml
$ sed -i '' "s#/usr/local/lib/mecab/dic/ipadic#/opt/homebrew/lib/mecab/dic/ipadic#" config/kana.yml
```

<!--
> mac の `sed`（BSD 版）は `-i` の直後に拡張子の指定が必須です。バックアップを作らない場合は `-i ''` と空文字を渡してください。<br />
> `mecab-dict-index` は `libexec` 配下にあり、Homebrew の prefix 直下にはリンクされません。`/opt/homebrew/libexec/...` ではなく `/opt/homebrew/opt/mecab/libexec/...` である点に注意してください。

置換後のパスにファイルが存在することを確認します。

```
$ grep mecab config/kana.yml
  mecab_indexer: /opt/homebrew/opt/mecab/libexec/mecab/mecab-dict-index
  mecab_dicdir: /opt/homebrew/lib/mecab/dic/ipadic
$ ls /opt/homebrew/opt/mecab/libexec/mecab/mecab-dict-index /opt/homebrew/lib/mecab/dic/ipadic
```
-->

## 音声読み上げ機能のインストール

### Open JTalk のインストール

```
$ brew install open-jtalk sox lame
```
<!--
> AlmaLinux のマニュアルでは `hts_engine_API` をソースからビルドしていますが、Homebrew の `open-jtalk` は hts_engine API を内部でビルドして同梱しているため、別途インストールする必要はありません。NAIST-JDIC も `/opt/homebrew/opt/open-jtalk/dic` に配置されます。<br />
> `sox` は読み上げる文章の長さにかかわらず必須です（`Voice::OpenJtalk` が起動時に存在を確認します）。<br />
> 音声読み上げは MeCab を利用するため、先に「ふりがな機能のインストール」を完了させてください。
-->

### voice.yml の作成

`config/defaults/voice.yml` も `/usr/local` を前提としているため、Homebrew のパスで上書きする `config/voice.yml` を作成します。

```
$ cd ~/Projects/shirasagi
$ cp config/defaults/voice.yml config/
$ sed -i '' "s#/usr/local/bin/open_jtalk#/opt/homebrew/bin/open_jtalk#" config/voice.yml
$ sed -i '' "s#/usr/local/dic#/opt/homebrew/opt/open-jtalk/dic#" config/voice.yml
$ sed -i '' "s#/usr/local/bin/sox#/opt/homebrew/bin/sox#" config/voice.yml
$ sed -i '' "s#/usr/local/bin/lame#/opt/homebrew/bin/lame#" config/voice.yml
```

<!--

> 音声データ（htsvoice）はシラサギに同梱されている `config/voices/mei_normal/mei_normal.htsvoice` を利用します。Rails.root を起点とした相対パスで解決されるため、`voice` の設定を変更する必要はありません。

置換結果を確認します。

```
$ grep -E 'bin:|dic:|sox:' config/voice.yml
    bin: /opt/homebrew/bin/open_jtalk
    dic: /opt/homebrew/opt/open-jtalk/dic
    sox: /opt/homebrew/bin/sox
    bin: /opt/homebrew/bin/lame
```
-->

# シラサギの設定

## 基本設定ファイルの準備

基本的な設定ファイルを作成します。

```
$ cd ~/Projects/shirasagi
$ cp -p config/samples/{mongoid,secrets}.yml config/
$ cp -p config/defaults/environment.yml config/
```

テキストエディタで `config/mongoid.yml` を開き、以下のような内容に変更します。

```
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
```

テキストエディタで `config/environment.yml` を開き、冒頭の `RAILS_ENV` を "development" に変更します。

```
# Default environment
RAILS_ENV: development
```

以上で開発の準備ができました。

## bundle install と assets のビルド

`bundle install` などを実行します。ターミナルで以下のコマンドを実行します。

```
$ cd ~/Projects/shirasagi
$ bundle install
$ yarn install && yarn build
```

<!--
> asdf の shims へパスを通しているシェルから実行してください。<br />
> エディタの統合ターミナルなど、ログインシェルを経由しない環境では `~/.zshrc` が読み込まれず、`ruby` や `node` が見つからないことがあります。
-->

## シードの投入とシラサギの起動

ターミナルで以下のコマンドを実行し、シードを投入します。

```
# シード投入前にすべて消去
$ bundle exec rake db:drop
$ rm -rf private public
$ git checkout -- private public

# DB作成
$ bundle exec rake db:create_indexes

# シードの投入
$ bundle exec rake ss:create_site data="{ name: '自治体サンプル', host: 'www', domains: 'www.example.jp:3000', mypage_domain: 'localhost:3000', map_api: 'openlayers' }"
$ bundle exec rake db:seed site=www name=demo
```

ターミナルで以下のコマンドを実行し、シラサギを起動します。

```
$ bundle exec rails s
```

ブラウザを開き、<http://localhost:3000/.mypage> へアクセスします。
シラサギの管理画面へのログイン画面が表示されれば成功です。`admin` / `pass` のアカウントでログインできます。
