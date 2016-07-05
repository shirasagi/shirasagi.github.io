---
layout: default
title: メール送信
---

既定では `sendmail` コマンドを使用してメールを送信します。
ここでは、設定方法を解説します。

## 設定ファイル

設定ファイルは、`mail.yml` です。変更する前に次のコマンドでコピーしましょう。

~~~
$ cp -n config/defaults/mail.yml config/mail.yml
~~~

次のコマンドを実行し、テキストエディタで開きます。

~~~
$ vi config/mail.yml
~~~

## sendmail

既定では `delivery_method` に `sendmail` が設定されています。
これは `sendmail` コマンドによりメールを送ることを表します。

~~~
production:
  # smtp or sendmail
  delivery_method: sendmail

  # sendmail settings
  location:
  arguments:
~~~

`location` には、`sendmail` コマンドの場所を、`arguments` には `sendmail` コマンドへ渡す追加の引数を指定することができます。

## SMTP

既定では `delivery_method` に `smtp` を設定することで、
外部の SMTP サーバーを用いてメールを送ることができます。

~~~
production:
  # smtp or sendmail
  delivery_method: smtp

  # smtp settings
  address: 127.0.0.1
  port: 25
  domain: 127.0.0.1
  user_name:
  password:
  authentication:
~~~

## Header

~~~
production:
  # message settings
  default_from:
  default_charset: iso-2022-jp
~~~
