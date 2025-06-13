---
layout: default
title: Puma の設定
---

SHIRASAGI v1.20 から Puma がシラサギ標準のアプリケーションサーバーとなりました。

## Install

シラサギのインストールがまだの人は、次の資料を参考にシラサギのインストールを済ませてください。

- 自動インストール
  - [Vagrant](installation/vagrant.html)
  - [install.sh](installation/installsh.html)
- 手動インストール
  - [CentOS](installation/manual.html)
  - [Ubuntu](installation/ubuntu.html)
  - [Linux Mint 19.1](installation/linux-mint-19.1.html)

## 自動起動設定

~~~
# cp -n /var/www/shirasagi/bin/puma.service /etc/systemd/system/puma.service
# systemctl daemon-reload
# systemctl enable puma
~~~

## 実行方法・停止方法

### 開始

~~~
# systemctl start puma
~~~

### 停止

~~~
# systemctl stop puma
~~~

### ソフトな再起動（再読み込み）

シラサギを更新したときなどの再読み込み。

~~~
# systemctl reload puma
~~~

### ハードな再起動

Ruby を更新したり、シラサギをバージョンアップしたり、Pumaの設定を変更したりした場合。

~~~
# systemctl restart puma
~~~

## パフォーマンス調整について

### (1) workerプロセス数の調整

動的な画面の表示等で 502(Bad Gateway)エラーや 504(Gateway Timeout)エラーが発生する場合は、原因の一つとしてリクエスト量に対して Puma の workerプロセスの数が足りていないことが考えられます。
その場合、workerプロセス数を増やすことで解消できる場合があります。

workerプロセス数は、既定では2に設定されています。
workerプロセス数を変更するには systemd unit ファイル `/etc/systemd/system/puma.service` をテキストエディタで開き、
`[Service]` セクションの `Environment=WEB_CONCURRENCY` を調整します。

~~~
[Service]
...（省略）
Environment=WEB_CONCURRENCY=4
...（省略）

~~~

上記の設定ではworkerプロセス数を4へ変更しています。

注意点） 

- worker個数を増やすことにより、プロセスの増加となりその分CPU負荷が上昇します。事前にtopコマンド等でピークアクセス時にCPUの余力があることを確認の上お試しください。 
- worker個数を増やすことにより、常駐プロセスの増加となりその分メモリを圧迫します。事前にps axコマンド等で1workerの消費メモリとfreeコマンド等で残メモリ容量を確認の上お試しください。 

### (2) workerスレッド数の調整

workerスレッド数を増やすことで(1) workerプロセス数の調整で示した障害が解消できる場合があります。

workerスレッド数は、既定では3に設定されています。
workerスレッド数を変更するには systemd unit ファイル `/etc/systemd/system/puma.service` をテキストエディタで開き、
`[Service]` セクションの `Environment=RAILS_MAX_THREADS` を調整します。

~~~
[Service]
...（省略）
Environment=RAILS_MAX_THREADS=8
...（省略）

~~~

上記の設定ではworkerスレッド数を8へ変更しています。

注意点） 

- Ruby および Ruby on Rails はマルチスレッドではさほど効率よく動作することができません。
  第一に、workerプロセス数の変更を検討してください。

### (3) workerの使用メモリ上限値の調整

SHIRASAGIではPumaのメモリ消費対策としてpuma-worker-killerを組み込んでいます。
puma-worker-killerにメモリ利用上限の範囲を設定しておくことでworkerのメモリ利用が設定範囲以上に達すると自動的にworkerを再起動します。
アクセスが多い環境や、扱うデータが多い環境では標準の設定では頻繁に上限を超えてしまい、短時間でworkerの再起動を繰り返す状況となることがあります。
この状態になると再起動のオーバーヘッド負荷等により動的処理に於いて十分なパフォーマンスが得られない状況となります。

workerの使用メモリ上限値は、既定では 1024 MB に設定されています。
workerの使用メモリ上限値を変更するには systemd unit ファイル `/etc/systemd/system/puma.service` をテキストエディタで開き、
`[Service]` セクションの `Environment=PUMA_RAM` を調整します。`Environment=PUMA_RAM` は既定ではコメントアウトされているので、コメントアウトの解除が必要です。

~~~
[Service]
...（省略）
Environment=PUMA_RAM=2048
...（省略）

~~~

上記の設定ではworkerの使用メモリ上限値を2048MBへ変更しています。

### (4) 定期的なworkerの再起動

SHIRASAGIではworkerを定期的に再起動する処理を組み込んでいます。

workerの再起動間隔は既定では12時間（43200秒）に設定されています。
workerの再起動間隔を変更するには systemd unit ファイル `/etc/systemd/system/puma.service` をテキストエディタで開き、
`[Service]` セクションの `Environment=PUMA_ROLLING_RESTART_FREQUENCY` を調整します。`Environment=PUMA_ROLLING_RESTART_FREQUENCY` は既定ではコメントアウトされているので、コメントアウトの解除が必要です。

~~~
[Service]
...（省略）
Environment=PUMA_ROLLING_RESTART_FREQUENCY=21600
...（省略）

~~~

上記の設定ではworkerの再起動間隔を6時間（21600秒）へ変更しています。

### systemd unit ファイルの更新後

systemd unit ファイルを更新したら、次のコマンドを実行し systemd unit ファイルを再読み込みします。

~~~
# systemctl daemon-reload
~~~

そして次のコマンドを実行し Puma を再起動します。

~~~
# systemctl restart puma
~~~

## 設定ファイル

Pumaの設定ファイルは `config/puma.rb` にあります。
上記のパフォーマンス調整で紹介した設定以外の設定を変更したい場合などではPumaの設定ファイルを直接変更します。
Pumaの設定ファイルの変更は本書のスコープ外となりますので、詳細な説明は割愛します。

- 参考: [Puma's configuration DSL](https://puma.io/puma/Puma/DSL.html)

## 付録: 旧 Unicorn との違い

- Unicorn では rake タスクによる開始、停止、再起動が可能でしたが Puma ではsystemdに統合されました。
- Unicorn はバックグラウンド（デーモン）で動作していましたが、Puma はフォアグラウンドで動作します。
- Unicorn は標準出力を log/unicorn.stdout へ、標準エラー出力を log/unicorn.stderr へリダイレクトしていましたが、Pumaではリダイレクトしません。Pumaの標準出力や標準エラー出力を確認するには、コマンド `journalctl -u puma` を利用してください。
- Puma は、フォアグラウンドで動作するようになった点と標準出力や標準エラー出力をリダイレクトしない点とでUnicornと比較してコンテナ内でも動作させやすくなりました。
