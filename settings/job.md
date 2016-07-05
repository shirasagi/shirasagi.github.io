---
layout: default
title: 非同期実行 / バッググラウンドジョブ
---

## ActiveJob と既定のバックエンド

非同期実行 / バッググラウンドジョブは、Rails 4.2 から導入された [ActiveJob](http://railsguides.jp/active_job_basics.html) を使って実行します。

ActiveJob のバックエンドとして、シラサギでは専用のバックエンド `Shirasagi Job` を標準で搭載しており、別途、何もインストールしなくてもジョブが実行されます。

また、ActiveJob のバックエンドとして有名な以下のサービスも利用することができます。

* [Delayed Job](https://github.com/collectiveidea/delayed_job)
* [Sidekiq](https://github.com/mperham/sidekiq)
* [Resque](https://github.com/resque/resque)

## Shirasagi Job の設定

`config/job.yml`（存在しない場合は `config/defaults/job.yml`をコピーして作成）に設定を記述します。

重要なのが `mode` です。`on_demand` と `service` という 2 つのモードがあり、既定では `on_demand` モードになっています。


### on_demand モード

開発環境向きのモードで、ジョブがプールに追加されるたびにサービスが起動され、プールが空の場合速やかにサービスを終了します。

追加の設定や余分な手間がかからない反面、ジョブがプールに追加されるたびにサービスが起動するので、
大量のアクセスが届いた場合、サービスが多量に起動してメモリ不足となる場合があります。

### service モード

本番環境向きのモードで、サービス起動スクリプトをインストールする必要がありますが、
大量のアクセスが届いた場合でも、指定された数以上にプロセスは起動せず、実行環境のメモリ使用量を制御しやすいモードです。


## Shirasagi Job サービススクリプト

### systemd

以下の systemd 用のサービス定義ファイルを `/etc/systemd/system/shirasagi-job.service` として作成してください。

```
[Unit]
Description=Shirasagi Job Server
After=mongod.service

[Service]
User=${シラサギジョブを実行するユーザー}
WorkingDirectory=/var/www/shirasagi
ExecStart=/usr/local/rvm/wrappers/default/bundle exec rake job:run
Type=simple
Restart=always
```

`${シラサギジョブを実行するユーザー}` の部分は、`Shirasagi Job` を実行するユーザーに応じて適切に書き換えてください。

そして、次のコマンドを実行し systemd にサービスを登録し自動起動を有効にし、サービスを起動してください。

```
sudo systemctl daemon-reload
sudo systemctl enable shirasagi-job.service
sudo systemctl start shirasagi-job.service
```

Shirasagi Job を 2 多重以上で動作させるには、上記のサービススクリプトを起動したい数だけコピーして複数設定してください。
