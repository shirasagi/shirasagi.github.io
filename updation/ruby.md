---
layout: default
title: Ruby の更新
---

## Ruby(RVM)

~~~
$ su -
# rvm get stable
# rvm install 2.6.3 --disable-binary
# rvm use 2.6.3 --default
~~~

## Mecab Ruby

~~~
$ cd /usr/local/src/mecab-ruby-0.996
$ su -
# ruby extconf.rb
# make clean
# make
# make install
~~~

## Unicorn 起動設定ファイル

OS 起動時に Unicorn を起動する設定が /etc/systemd/system/unicorn.service というファイルにあります。
古いバージョンの設定ファイルは `ExecStart=` 行が次のように設定されています。

古い `ExecStart=` 行:

~~~
ExecStart=/usr/local/rvm/bin/start_unicorn  -c config/unicorn.rb -E production -D
~~~

上記のように設定されている場合、以下のように変更してください。

新しい `ExecStart=` 行:

~~~
ExecStart=/usr/local/rvm/wrappers/default/bundle exec unicorn_rails -c config/unicorn.rb -D
~~~

## Unicorn 再起動

Ruby をバージョンアップした際は Unicorn の restart では、正しく再起動しない場合があるため、stop してから start する方が安全です。

~~~
$ su -
# systemctl stop unicorn
# systemctl start unicorn
~~~

Unicorn が完全に停止しないうちに `systemctl start unicorn` コマンドを実行するとエラーになる場合があります。エラーになる場合は、数秒置いてからもう一度実行してみてくだい。
