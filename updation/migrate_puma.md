---
layout: default
title: Unicorn から Puma への移行
---

## 前提条件

Puma を Application サーバとして利用するには、SHIRASAGI バージョン は v1.20.0 以上でなければいけません。

---

## 移行作業手順

以下 `SS_DIR=/var/www/shirasagi` を前提に記載。作業はすべて rootユーザとしている。

### バックアップ

```
# mkdir -p /root/backup/puma-migration-$(date +%Y%m%d)
# cd /root/backup/puma-migration-$(date +%Y%m%d)
# cp -p /etc/systemd/system/unicorn.service ./
# cp -p /var/www/shirasagi/config/unicorn.rb ./
```

### Unicorn の停止と自動起動解除

```
# systemctl stop unicorn
# systemctl disable unicorn
# systemctl status unicorn
# ps -aux | grep unicorn # 残存プロセスが無いこと
```

### puma.service の配置と補正

unit ファイルをコピーする。

```
# cp -n /var/www/shirasagi/bin/puma.service /etc/systemd/system/puma.service
```

さらに環境に応じて編集する（`vi /etc/systemd/system/puma.service`）。

| 条件 | 変更内容 |
| --- | --- |
| アプリを root 以外で実行している | `User=<実行ユーザー>` |
| SHIRASAGI の設置先が `/var/www/shirasagi` 以外 | `WorkingDirectory=` と `PIDFile=` のパス |
| Unicorn の `worker_processes` が 2 以外だった | `Environment=WEB_CONCURRENCY=<値>` |

```
[Unit]
Description=SHIRASAGI Puma Server
After=mongod.service

[Service]
User=root
WorkingDirectory=/var/www/shirasagi
Environment=RAILS_ENV=production
#Environment=PORT=3000
Environment=WEB_CONCURRENCY=2
#Environment=WORKER_TIMEOUT=120
#Environment=RAILS_MAX_THREADS=3
#Environment=PUMA_RAM=1024
#Environment=PUMA_ROLLING_RESTART_FREQUENCY=43200
SyslogIdentifier=shirasagi
PIDFile=/var/www/shirasagi/tmp/pids/server.pid
Type=simple
TimeoutSec=300

ExecStart=/bin/bash -lc 'exec bundle exec rails s'
ExecStop=/usr/bin/kill -TERM $MAINPID
ExecReload=/usr/bin/kill -USR2 $MAINPID

[Install]
WantedBy=multi-user.target
```

### 登録と起動

```
# systemctl daemon-reload
# systemctl enable puma --now
```

### 起動確認

```
# systemctl status puma
# journalctl -u puma
```

`journalctl` に `Puma Worker Killer started!` が出ていれば puma_worker_killer が有効。起動には数十秒〜数分かかることがある。

## 注意点・既知の差異

### USR2 シグナルの挙動差

Unicorn の unit も Puma の unit も `ExecReload=/usr/bin/kill -USR2 $MAINPID` で同じシグナル名を使うが、意味がまったく違う。`systemctl reload` の感覚を移行前と同じまま運用すると事故につながる。

Unicorn の USR2 = 「動作中のバイナリを再実行」

- 新しいマスタを別プロセスとして起動し、旧マスタはそのまま稼働し続ける。旧マスタへ別途 QUIT を送ることで初めて世代交代が完了する。
- 新コードの起動に失敗しても旧マスタが残ってサービスが継続する（フェイルセーフ）。
- 切替中は 2 世代のプロセスが並走するため、一時的にメモリ使用量がほぼ 2 倍になる。

Puma の USR2 = hot restart（自プロセスの入れ替え）

- `Kernel.exec` で自分自身を exec し直す。
- 同時に動くのは常に 1 世代だけなので、Unicorn のような一時的なメモリ 2 倍のは起きない。
- 新しいプロセスがロードに失敗すると、そのまま終了する。旧世代は既に存在しないためサービスが停止する。
- クライアント影響: 処理中のリクエストには応答が返り、アイドル状態の keep-alive 接続は正常に切断される。Linux + CRuby では、切替直前に接続したクライアントは待たされるが接続は切られない。
- 再 exec は起動時のコマンドラインを実行し直すだけなので、`systemctl reload` では unit ファイルに追記・変更した `Environment=` は反映されない。環境変数を変えたときは `systemctl daemon-reload` → `systemctl restart puma`が必要である。

Puma だけにある USR1（phased restart）

- ワーカを 1 つずつ入れ替えるため、ワーカが 2 個以上あれば無停止で入れ替えられる。cluster モード限定で、アプリを入れ替える用途では `preload_app!` が無効であることが条件である。
- ただしマスタは再起動されないため、puma 自身やマスタがロードする gem の更新は反映されない。`prune_bundler` を設定していれば反映される。
- 採用する場合は unit の `ExecReload` を `/usr/bin/kill -USR1 $MAINPID` に変更すれば `systemctl reload puma` が phased restart になる。

使い分けまとめ

| 状況 | 操作 | 理由 |
| --- | --- | --- |
| SHIRASAGI のコード更新 | `systemctl reload puma`（USR2） | 1世代のみでメモリスパイクなし。ただし起動失敗時は落ちるので直後にプロセス確認 |
| unit の環境変数変更・Ruby 更新・gem 更新・`config/puma.rb` 変更  | `systemctl restart puma` | exec のやり直しでは新しい環境変数を拾わないため reload では不十分 |
| 無停止性を重視 | `kill -USR1 <master PID>`（phased restart） | 動的ページへのアクセスを無停止で行うため |

## 移行前後の構成比較表

| 項目 | Unicorn（移行前） | Puma（移行後） |
| --- | --- | --- |
| プロセスモデル | マルチプロセス（1ワーカ1リクエスト） | マルチプロセス × マルチスレッド |
| 起動 | `systemctl start unicorn` / `bundle exec rake unicorn:start`（デーモン） | `systemctl start puma`（フォアグラウンド、systemd 管理） |
| 設定ファイル | `config/unicorn.rb` | `config/puma.rb` |
| systemd unit | `/etc/systemd/system/unicorn.service` | `/etc/systemd/system/puma.service` |
| PID ファイル | `tmp/pids/unicorn.pid` | `tmp/pids/server.pid` |
| 標準出力 / エラー出力 | `log/unicorn.stdout.log` / `log/unicorn.stderr.log` にリダイレクト | リダイレクトしない。`journalctl -u puma` で確認 |
| ワーカ数の指定 | `worker_processes`（`config/unicorn.rb`） | `Environment=WEB_CONCURRENCY`（unit ファイル） |
| メモリ制御 | unicorn-worker-killer `UNICORN_KILLER_MEM_MIN, UNICORN_KILLER_MEM_MAX `（unit ファイル） | puma_worker_killer `Environment=PUMA_RAM`（unit ファイル） |
| 再起動 | `systemctl restart unicorn` / `bundle exec rake unicorn:restart` | `systemctl restart puma` |
| `USR2` の意味 | バイナリの再実行。新マスタを別プロセスとして起動し、旧マスタは QUIT を受けるまで並走（2世代並走・PID が変わる） | hot restart。`exec` で自プロセスを入れ替え（常に1世代・PID は変わらない） |

`config/production.rb` が出力する Rails アプリケーションログ（`log/production.log`）は移行後も変わらず同じ場所に出力される。変わるのはアプリケーションサーバ自身のログだけである。

---
