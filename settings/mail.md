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
SHIRASAGI利用ではローカル SMTP サービス を利用することを推奨します。
ローカルの SMTP サービス を指定することで、ローカルにメールスプール
されます。ネットワークが遅い場合でもシラサギの性能は悪化しません。
ただし、定期的にスプールのクリーニングを行うことを推奨します。

~~~
production:
  # smtp or sendmail
  delivery_method: smtp

  # smtp settings
  address: localhost
  port: 25
  domain: localhost
  user_name:
  password:
  authentication:
~~~

## Header

~~~
production:
  # message settings
  default_from:
  default_charset: utf-8
~~~

## postfixの設定

### 外部の SMTP サーバの情報
設定例

| 項目                         |                          |
|------------------------------|--------------------------|
| 外部 SMTP サーバの FQDN      | sandbox.smtp.mailtrap.io |
| 外部 SMTP サーバのポート番号 | 25                       |
| アカウント                   | youraccount              |
| パスワード                   | yourpassword             |

### main.cf の設定
main.cf の「relayhost」にて、外部 SMTP サーバを指定します。

「smtp_sasl_auth_enable」では SMTP 認証を有効化し、

「smtp_tls_security_level」では STARTTLS機能を有効化し、

「smtp_tls_CAfile」では 接続先の証明書を検証するためのルート証明書を指定し、

「smtp_sasl_password_maps」では SMTP 認証のときに用いるアカウント名とパスワードを列挙したファイルを指定します。

「smtp_sasl_security_options」、「smtp_sasl_mechanism_filter」「smtp_tls_loglevel」は必要に応じて設定してください。

~~~ bash
# vi /etc/postfix/main.cf
---
relayhost = [sandbox.smtp.mailtrap.io]:25
smtp_sasl_auth_enable = yes
smtp_sasl_mechanism_filter = plain
smtp_sasl_security_options = noanonymous
smtp_sasl_password_maps = hash:/etc/postfix/sasl_passwd
smtp_tls_CAfile = /etc/pki/tls/cert.pem
smtp_tls_security_level = may
smtp_tls_loglevel = 1
---
~~~

### アカウント、パスワードの設定

~~~ bash
# vi /etc/postfix/sasl_passwd
---
sandbox.smtp.mailtrap.io youraccount:yourpassword
---
~~~

パスワードデータベースをビルドして postfix を再起動します。

~~~ bash
# postmap /etc/postfix/sasl_passwd
# systemctl restart postfix
~~~

### 送信テスト

トラブルシューティングの[メール送信](/trouble-shootings/email.html)を参照ください。
