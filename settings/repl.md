---
layout: default
title: 分散構成(同期/非レプリカセット)
---

## 概要

Webサーバ、データベースを内外に分散配置する場合の設定例です。

以下のような条件を想定します。

- DBは内から外へ同期（レプリケーション）。
- 内側Webはインターネットへ接続できない。
- 内外が切断されても外側への投稿はできる。

## データベース

サーバ２台(4 DB)で構成します。

||配置|同期|用途|
|--|
|slave|外側|masterから同期|読み込み専用|
|post_public|外側|非同期|外部からの投稿を格納する|
|master|内側|slaveへ同期|主な更新|
|post_private|内側|非同期|投稿を非同期に取り込む|

### 外側DB / 設定ファイル (config/mongoid.yml)

サンプルファイルは `config/samples/multiple-dbs/mongoid.yml` にあります。

~~~
production:
  clients:
    default:
      database: slave
      hosts:
        - localhost:27017

    default_post:
      database: post_public
      hosts:
        - localhost:27018

    repl_master:
      database: master
      hosts:
        - other:27017
~~~

### 内側DB / 設定ファイル (config/mongoid.yml)

~~~
production:
  clients:
    default:
      database: master
      hosts:
        - localhost:27017

    default_post:
      database: post_private
      hosts:
        - localhost:27018

    public:
      database: post_public
      hosts:
        - other:27018
~~~

## Webサーバ

実行するジョブを内外で切り分けます。

### 外側Web / ジョブ設定 (config/job.yml)

ジョブの実行をサービス化します。 ([非同期実行 / バッググラウンドジョブ](job.html))

~~~
production:
  default:
    mode: "service"
    polling:
      queues:
        #- 'default'
        #- 'mailers'
        #- 'voice_synthesis'
        - 'external'
~~~

### 内側Web / ジョブ設定 (config/job.yml)

内側のジョブはオンデマンド実行でも問題ありません。

~~~
production:
  default:
    mode: "service"
    polling:
      queues:
        - 'default'
        - 'mailers'
        - 'voice_synthesis'
        #- 'external'
~~~

### 内側Web / 定期実行

~~~
# メールフォームの投稿を取り込む
30 * * * * /bin/bash -l -c 'cd /var/www/shirasagi && bundle exec rake inquiry:pull_answers' >/dev/null
~~~
