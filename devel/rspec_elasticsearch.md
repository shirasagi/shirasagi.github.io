---
layout: default
title: 全文検索機能の開発とテスト
---

SHIRASAGI の CMS とグループウェアには全文検索機能があります。この機能は Elasticsearch を用いて実現しおり、開発やテストには Elasticsearch が必要となります。
SHIRASAGI では、開発やテスト目的で Elasticsearch の Docker イメージを提供しており、本章ではこれを用いた開発とテスト方法とを説明します。

## 前提

Docker が必要です。お使いの OS に応じた方法で Docker をインストールしてください。
なお、本章では Docker のインストール方法の説明については割愛します。

## Elasticsearch の準備

### Elasticsearch イメージ

Docker Hub に `shirasagi/elasticsearch` というイメージを登録しています。
これをダウンロードします。

~~~shell
$ docker pull shirasagi/elasticsearch
~~~

### Elasticsearch の起動

以下のコマンドを実行すると Elasticsearch が起動します。

~~~shell
$ docker run -d --name elasticsearch -p 9200:9200 -e discovery.type=single-node shirasagi/elasticsearch
~~~

上のコマンドではローカルの 9200 番ポートにアクセスすると、Docker で稼働中の Elasticsearch へアクセスすることができます。

## SHIRASAGI の設定

### CMS

SHIRASAGI の CMS へログインし、「サイト設定 - サイト情報」と辿り、サイト情報を編集します。
「サイト内検索設定」の「全文検索サーバー」に http://localhost:9200/ と入力し保存します。

フォルダー属性「標準機能/サイト内検索」のフォルダーが存在しない場合は作成します。
これで基本的な準備は完了です。

### グループウェア

SHIRASAGI のグループウェアへログインし、「設定 - 組織情報」と辿り、組織情報を編集します。
「全文検索」の「全文検索サーバー」に http://localhost:9200/ と入力します。
そして、「メニュー設定」の「全文検索の表示」を「表示」に設定し、保存します。

これで基本的な準備は完了です。

## 全文検索機能の初期化

### CMS

ホスト名が www のサイトで全文検索を設定したとすると、以下のコマンドを実行します。

~~~shell
$ bin/rake cms:es:ingest:init site=www
$ bin/rake cms:es:create_indexes site=www
$ bin/rake cms:es:feed_all site=www
~~~

フォルダー属性「標準機能/サイト内検索」のフォルダーの公開画面をブラウザで表示し `*` を検索してみてください。何らかの文書が検索結果に表示されると思います。

### GWS

グループ名が「シラサギ市」のグループで全文検索を設定したとすると、以下のコマンドを実行します。

~~~shell
$ bin/rake gws:es:ingest:init site=シラサギ市
$ bin/rake gws:es:create_indexes site=シラサギ市
$ bin/rake gws:es:feed_all site=シラサギ市
~~~

グループウェアの「全文検索」メニューをクリックし、「すべて」タブで `*` を検索してみてください。何らかの項目が検索結果に表示されると思います。

以上で、開発準備が整いました。

## 全文検索機能のテスト

テストの開発に際しては、実際のテストコードを参考にしてください。
ここでは、テストコードを書く際の要点を説明します。

### 全文検索スイッチの指定

RSpec の `describe` 文に `es: true` というスイッチを設定します。

例: 全文検索機能のスイッチ

~~~ruby
describe Gws::Elasticsearch::Indexer::BoardTopicJob, dbscope: :example, es: true do
~~~

`es: true` というスイッチを設定すると、テスト開始時に自動的に Docker の Elaticsearch イメージを起動（ポートはランダム）します。

### テスト内での全文検索の初期化

次にテスト内でインデックスを初期化します。通常 `before` ブロック内に記述するのが良いでしょう。

例: 全文検索の初期化

~~~
  before do
    # gws:es:ingest:init
    ::Gws::Elasticsearch.init_ingest(site: site)
    # gws:es:drop
    ::Gws::Elasticsearch.drop_index(site: site) rescue nil
    # gws:es:create_indexes
    ::Gws::Elasticsearch.create_index(site: site)
  end
~~~

### Elasticsearch の仕様制限

[Elasticsearch の Refresh API](https://www.elastic.co/guide/en/elasticsearch/reference/current/indices-refresh.html) によると、Elasticsearch には次のような仕様制限があります。

> By default, Elasticsearch periodically refreshes indices every second

そこで、テスト内で全文検索の検索クエリを実行する前に、次のコードを挿入し、強制的にインデックスを更新します。

~~~
  # wait for indexing
  ::Gws::Elasticsearch.refresh_index(site: site)
~~~

このコードがない場合、テストが成功したり、失敗したりと不安定になります。

### 検索クエリの実行

最後に検索クエリを実行し、所定の仕様をみたしているかを確認するようにします。

~~~
  site.elasticsearch_client.search(index: "g#{site.id}", size: 100, q: "*:*")
~~~

なお、テストの開発に際しては、実際のテストコードを参考にしてください。

以上。
