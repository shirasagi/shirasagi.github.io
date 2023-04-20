---
layout: default
title: 非同期実行 / バッググラウンドジョブ
---

## ActiveJob と既定のバックエンド

非同期実行 / バッググラウンドジョブは、Rails 4.2 から導入された [ActiveJob](http://railsguides.jp/active_job_basics.html) を使って実行します。

ActiveJob のバックエンドとして、シラサギでは専用のバックエンド `Shirasagi Job` を標準で搭載しており、別途、何もインストールしなくてもジョブが実行されます。

また、ActiveJob のバックエンドとして有名な以下のサービスも利用することができます。

- [Delayed Job](https://github.com/collectiveidea/delayed_job)
- [Sidekiq](https://github.com/mperham/sidekiq)
- [Resque](https://github.com/resque/resque)

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
Type=simple
Restart=always

ExecStart=/bin/bash -lc 'bundle exec rake job:run'
ExecStop=/usr/bin/kill -QUIT $MAINPID

[Install]
WantedBy=multi-user.target
```

`${シラサギジョブを実行するユーザー}` の部分は、`Shirasagi Job` を実行するユーザーに応じて適切に書き換えてください。

そして、次のコマンドを実行し systemd にサービスを登録し自動起動を有効にし、サービスを起動してください。

```
sudo systemctl daemon-reload
sudo systemctl enable shirasagi-job.service
sudo systemctl start shirasagi-job.service
```

Shirasagi Job を 2 多重以上で動作させるには、上記のサービススクリプトを起動したい数だけコピーして複数設定してください。

## Shirasagi Job の状態確認

SHIRASAGI v1.15.0 以降でジョブの状態を確認する機能 <https://demo.ss-proj.org/.sys/job/status> が提供されるようになりました。
ジョブの実行が滞留している場合にエラーが表示されますので、Shirasagi Job の運用で何か問題がある場合はこの状態画面を確認するようにしてください。

また、ジョブの状態確認画面は json で状態を取得することができます。URL は <https://demo.ss-proj.org/.sys/job/status.json> です。
ジョブの実行状態が正常の場合、次のような json が応答されます。

```json
{
  "status": "ok",
  "active_job": {
    "queue_adapter": "shirasagi"
  },
  "job": {
    "mode": "on_demand",
    "polling_queues": ["default", "mailers", "voice_synthesis", "external"]
  },
  "item": {
    "name": "job:service",
    "current_count": 0,
    "updated": "2021-11-02T17:24:05.770+09:00"
  }
}
```

ジョブの実行が滞留している場合、次のような json が応答されます。

```json
{
  "status": "stucked",
  "notice": {
    "notices": [
      "mode が service の場合、ジョブサービスが起動していることを確認してください。これには ssh などでサーバーへログインし、ps コマンドなどでサービスが起動しているかどうかを確認します。",
      "タスク一覧の中にステータスが stop または completed でないものがある場合、削除します。",
      "それでも改善しない場合、タスク一覧の中にタスク名が job:service となっているものがありますが、これを削除します。",
      "それでも改善しない場合、タスク一覧の中のものをすべて削除します。"
    ]
  },
  "active_job": {
    "queue_adapter": "shirasagi"
  },
  "job": {
    "mode": "on_demand",
    "polling_queues": ["default", "mailers", "voice_synthesis", "external"]
  },
  "item": {
    "name": "job:service",
    "current_count": 6,
    "updated": "2021-11-02T17:24:05.770+09:00"
  }
}
```

json の意味は次の通りです。

| 項目名                   | 説明                                                                                                                                           |
| ------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------- |
| status                   | "ok" または "stucked"。実行状態が正常な場合は "ok"。ジョブの実行が滞留している場合は "stucked"。                                               |
| notice.notices           | status が "stucked" の場合のメッセージ。                                                                                                       |
| active_job.queue_adapter | ジョブのアダプターの設定値。                                                                                                                   |
| job.mode                 | Shirasagi Job のモード。                                                                                                                       |
| job.polling_queues       | Shirasagi Job が監視しているキューのリスト。                                                                                                   |
| item.name                | Shirasagi Job サービスを表すタスクの名前。これはジョブ - タスク <https://demo.ss-proj.org/.sys/job/tasks> の一覧に表示されているタスクの名前。 |
| item.current_count       | Shirasagi Job サービスの実行数。                                                                                                               |
| item.updated             | Shirasagi Job サービスの最終更新日時。                                                                                                         |

ジョブの実行状態の監視を監視システムなどに組み込んで自動化する場合は、次の Ruby スクリプトを参考にしてください。

```ruby
url = "https://demo.ss-proj.org/.sys/job/status.json"
user_id = "sys"

user = SS::User.find_by(uid: user_id)

access_token = SS::AccessToken.new(cur_user: user)
access_token.create_token
access_token.save!

resp = Faraday.get("#{url}?access_token=#{access_token.token}")
if resp.status == 302
  resp["Set-Cookie"] =~ /_ss_session=(\w+)/
  session_id = $1
  resp = Faraday.get(url) do |req|
    req.headers['Cookie'] = "_ss_session=#{session_id}"
  end
end

puts resp.body
```

この Ruby スクリプトを job_status.rb というファイル名で保存したとすると、
シラサギディレクトリで次のようにして実行します。

```
bundle exec rails runner <path-to>/job_status.rb
```

このコマンドを実行すると json が取得されるます。status だけを取得したい場合は [jq コマンド](https://stedolan.github.io/jq/)と組み合わせて、次のように実行すると status だけを取得することができます。

```
bundle exec rails runner <path>/job_status.rb | <path>/jq '.status'
```

スクリプトの URL とユーザーは適時変更してご利用ください。
