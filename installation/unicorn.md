---
layout: default
title: Unicorn のインストール
---

## Unicorn

- [Official Site](http://unicorn.bogomips.org/)

## Install

~~~
# cd /var/www/shirasagi
# bundle install --without development test
~~~

## 設定ファイル

~~~
$ vi config/unicorn.rb
~~~

~~~
worker_processes Integer(ENV["WEB_CONCURRENCY"] || 2)
listen 3000
timeout 120
preload_app true

root = File.expand_path("../../", __FILE__)
pid "#{root}/tmp/pids/unicorn.pid"
stderr_path "#{root}/log/unicorn.stderr.log"
stdout_path "#{root}/log/unicorn.stdout.log"
~~~

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

~~~
$ crontab -e
~~~

~~~
@reboot /bin/bash -l -c 'cd /var/www/shirasagi && bundle exec rake unicorn:start'
~~~

## 自動起動設定 (CentOS 7)

~~~
# rvm wrapper 2.4.2 start unicorn # Ruby のバージョンを入力
# cp /var/www/shirasagi/bin/unicorn-centos7.service /etc/systemd/system/unicorn.service
# chmod +x /etc/systemd/system/unicorn.service
# systemctl enable unicorn
~~~

## 自動起動設定 (CentOS 6)

~~~
# rvm wrapper 2.4.2 start unicorn # Ruby のバージョンを入力
# cp /var/www/shirasagi/bin/unicorn-centos6.sh /etc/rc.d/init.d/unicorn
# chmod +x /etc/rc.d/init.d/unicorn
# /sbin/chkconfig unicorn on
~~~
