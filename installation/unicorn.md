---
layout: default
title: Unicorn のインストール
---

**SHIRASAGI v1.20 にて、Unicorn は廃止されることが決まりました。**
**Unicornの廃止時期は未定ですが、2～3年の猶予の後、削除されます。**


## Unicorn

- [Official Site](http://unicorn.bogomips.org/)

## Install

シラサギのインストールがまだの人は、次の資料を参考にシラサギのインストールを済ませてください。

- 自動インストール
  - [Vagrant](installation/vagrant.html)
  - [install.sh](installation/installsh.html)
- 手動インストール
  - [CentOS](installation/manual.html)
  - [Ubuntu](installation/ubuntu.html)
  - [Linux Mint 19.1](installation/linux-mint-19.1.html)

## 設定ファイル

```
$ vi config/unicorn.rb
```

```
worker_processes Integer(ENV["WEB_CONCURRENCY"] || 2)
listen 3000
timeout 120
preload_app true

root = File.expand_path("../../", __FILE__)
pid "#{root}/tmp/pids/unicorn.pid"
stderr_path "#{root}/log/unicorn.stderr.log"
stdout_path "#{root}/log/unicorn.stdout.log"
```

worker_processes

- worker プロセス数を設定します。
- 搭載メモリに応じて値を増やしてください。
- 初期値: `2`

listen

- 受け付けるポート番号を設定します。
- 複数のプロジェクトを同時稼動させる場合などに変更してください。
- 初期値: `3000`

timeout

- タイムアウト値を設定します。
- 初期値: `120`

pid

- PID ファイルのパスを指定します。
- PID ファイルの作成に失敗する場合は `/tmp` など別の場所を指定してください。
- 初期値: `/var/www/shirasagi/tmp/pids/unicorn.pid`

stderr_path

- エラーログファイルのパスを指定します。
- Unicorn の起動に失敗した場合などに書き込まれます。
- 初期値: `/var/www/shirasagi/log/unicorn.stderr.log`

stdout_path

- ログファイルのパスを指定します。
- 初期値: `/var/www/shirasagi/log/unicorn.stdout.log`

## 自動起動設定 (簡易版)

```
$ crontab -e
```

```
@reboot /bin/bash -l -c 'cd /var/www/shirasagi && bundle exec rake unicorn:start'
```

## 自動起動設定

```
# cp /var/www/shirasagi/bin/unicorn-centos7_asdf.service /etc/systemd/system/unicorn.service
# chmod +x /etc/systemd/system/unicorn.service
# systemctl enable unicorn
```
## パフォーマンス調整について

#### (1) workerプロセス数の調整

動的な画面の表示等で 502(Bad Gateway)エラーや 504(Gateway Timeout)エラーが発生する場合は、原因の一つとしてリクエスト量に対してunicorn workerプロセスの数が足りていないことが考えられます。  
その場合、workerプロセス数を増やすことで解消できる場合があります。   

workerプロセス数は上記「設定ファイル」項の"worker_processes"値を変更し、nginxを再起動(リロードでも可)する事で対応できます。  
（対応後psコマンド等でunicorn workerプロセスの個数を確認ください。）  

注意点） 
- worker個数を増やすことにより、プロセスの増加となりその分CPU負荷が上昇します。事前にtopコマンド等でピークアクセス時にCPUの余力があることを確認の上お試しください。 
- worker個数を増やすことにより、常駐プロセスの増加となりその分メモリを圧迫します。事前にps axコマンド等で1workerの消費メモリとfreeコマンド等で残メモリ容量を確認の上お試しください。 


#### (2) workerの使用メモリ上限値の調整

SHIRASAGIではunicornのメモリ消費対策としてunicorn-worker-killerを利用しています。 
unicorn-worker-killerにメモリ利用上限の範囲を設定しておくことでworkerのメモリ利用が設定範囲以上に達すると自動的にworkerを再起動します。 
アクセスが多い環境や、扱うデータが多い環境では標準の設定では頻繁に上限を超えてしまい、短時間でworkerの再起動を繰り返す状況となります。 
この状態になると再起動のオーバーヘッド負荷等により動的処理に於いて十分なパフォーマンスが得られない状況となります。 

再起動頻度の確認は log/unicorn.stderr.log で確認が可能です。 
"Unicorn::WorkerKiller send SIGQUIT"で再起動され"worker=0 ready"でworker 0号機の再起動が完了という意味になりますが、同一号機のworkerの再起動が数分に1回発生している状況だと再起動過多と思われます。 

その場合上記"send SIGQUIT"の前に設定上限を超えた旨のログが記録されていると思います。 
メモリ上限のケースが多くその場合下記のようなログ内容となります。
 
"worker (pid: xxxx) exceeds memory limit (823857152.0 bytes > 641051371 bytes)" 

この例ですと、左辺byte数のメモリ利用があり右辺byteを超えた為再起動した旨になりますので、設定値を左辺byte数以上とすることで再起動を抑えられます。 

設定ファイルは shirasagiディレクトリ直下の config.ru ファイルになります。 


~~~
$ vi config.ru
~~~

~~~
# Max memory size (RSS) per worker
mem_min = (ENV['UNICORN_KILLER_MEM_MIN'] || 512).to_i
mem_max = (ENV['UNICORN_KILLER_MEM_MAX'] || 576).to_i
~~~

上記例では512MB～576MBが設定されており、この上限範囲を調整してunicornを再起動する事で対応できます。 

注意点） 
- メモリ上限を増やすことによりその分worker個数分利用メモリが増加します。事前にfreeコマンド等で空きメモリ量を確認の上お試しください。 

