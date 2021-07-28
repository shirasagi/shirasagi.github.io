---
layout: default
title: インストールマニュアル - MongoDB 推奨設定
---

## MongoDB 推奨設定

MongoDB のマニュアルに [推奨設定](https://docs.mongodb.com/manual/reference/ulimit/#recommended-settings) が掲載されています。これを設定します。

MongoDB をインストールすると systemd の unit ファイルが `/usr/lib/systemd/system/mongod.service` として作成されます。これをテキストエディタで開き `[Service]` セクション内に次の行を追加します。

~~~
# (file size)
LimitFSIZE=infinity
# (cpu time)
LimitCPU=infinity
# (virtual memory size)
LimitAS=infinity
# (locked-in-memory size)
LimitMEMLOCK=infinity
# (open files)
LimitNOFILE=64000
# (processes/threads)
LimitNPROC=64000
# Recommended limits for mongod as specified in
# https://docs.mongodb.com/manual/reference/ulimit/#recommended-ulimit-settings
~~~

## MongoDB のメモリ消費抑制

MongoDB は、既定では (実装メモリ - 1 GB) ÷ 2 か 256MB のどちらか大きい方をキャッシュとして消費します。4GB のメモリを実装したサーバでは (4 GB - 1 GB) ÷ 2 = 1.5 GB のメモリを消費します。

シラサギと MongoDB とを同じサーバーに同居させる場合、シラサギもそこそこメモリを消費しますので、MongoDB のメモリ消費を抑制したい場合があります。そのような場合、`/etc/mongod.conf` ファイルに次のように設定し、MongoDB の内部キャッシュ容量を抑制することで MongoDB 全体のメモリ消費を抑制することができます。

~~~
storage:
  wiredTiger:
    engineConfig:
      cacheSizeGB: 1
~~~

## MongoDB を OOM Killer の対象から除外

MongoDB の他にシラサギのような様々なサービスが同居している場合、メモリ不足によりシステムが不安定となる可能性があります。シラサギの場合、ワーカー・プロセスが OOM Killer により殺されてもすぐに復活するので、多少の耐久力はありますが、DB サーバーの場合、自動では起動せず、殺されてしまうとシステムがダウンしてしまいます。
MongoDB を OOM Killer から守るには `oom_score_adj` を -1000 に設定してやります。設定する場所は systemd の unit ファイル `/usr/lib/systemd/system/mongod.service` をテキストエディタで開き `[Service]` セクションに次の行を追加します。

~~~
OOMScoreAdjust=-1000
~~~

## MongoDB の起動

MongoDB の推奨設定を適用できたら MongoDB を起動するため次のコマンドを実行します。

~~~
systemctl start mongod
~~~

設定が正しく適用できているかを確認するため、次のファイルの内容を確認してください。

- /proc/$MongoDBのプロセスID/limits
- /proc/$MongoDBのプロセスID/oom_score_adj （MongoDB を OOM Killer の対象から除外した場合）
