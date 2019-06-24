---
layout: default
title: Docker を用いたウェブメールテスト環境の構築
---

本章ではDocker を用いたシラサギのウェブメール開発環境の構築方法を解説します。

## 構築手順

- Docker インストール
- Docker Image のビルド
- Docker Container の開始
- シラサギの Web メールのテスト設定
- テストの実行
- その他のオプション

## Docker インストール

公式サイトの手順にしたがって Docker をインストールしてください。

## Docker Image のビルド

[mail/imap container for shirasagi development](https://github.com/sunny4381/docker-mail) の手順にしたがって Docker Image をビルドしてください。

## Docker Container の開始

~~~
docker run --name test_mail -d -p 11143:143 -p 11587:587 shirasagi/mail
~~~

## シラサギの Web メールのテスト設定

~~~
$ cd /var/www/shirasagi
$ cp -pn config/defaults/webmail.yml config/webmail.yml
~~~

~~~
$ vi config/webmail.yml
~~~

~~~
test:
  <<: *production
  test_by: docker
~~~

## テストの実行

~~~
$ cd /var/www/shirasagi
$ bin/rspec
~~~

コンテナが起動していない場合は自動で起動します（が、動作が不安定のため事前に起動しておくことをおすすめします）。


## その他のオプション

### Docker を既定以外の方法でインストールしている。

この場合、api_url の設定が必要になるかもしれません。

~~~
test:
  <<: *production
  test_docker:
    api_url: unix:///var/run/docker.sock
~~~

api_url には unix socker ファイルへのパスを設定してください。

### Docker Container として別のコンテナを使用したい。

~~~
test:
  <<: *production
  test_docker:
    container_id: コンテナID
~~~

### リモートの Docker を利用したい。

~~~
test:
  <<: *production
  test_docker:
    api_url: http://docker.example.jp:4243/
    host: docker.example.jp
~~~
