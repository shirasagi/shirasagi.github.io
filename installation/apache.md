---
layout: default
title: Apache のインストール
---

## Apache

- [Official Site](https://www.apache.org/)

## Apache のインストール

#### (1) Apache本体、開発環境

~~~
# yum -y install httpd httpd-devel
~~~

#### (2) X-SendFileモジュール

~~~
# mkdir /usr/local/src/mod_xsendfile; cd $_
# wget https://tn123.org/mod_xsendfile/mod_xsendfile.c
# /usr/bin/apxs -cia mod_xsendfile.c
~~~

## Apache の設定を追加する

各設定値は環境に応じて変更してください。

#### (1) 基本設定

~~~
# vi /etc/httpd/conf/httpd.conf
~~~

~~~
ServerName (サーバ名、ＩＰアドレス)
~~~

#### (2) VirtualHost設定

~~~
# vi /etc/httpd/conf.d/shirasagi.conf
~~~

~~~
<VirtualHost *:80>
  ServerName example.jp
  DocumentRoot /var/www/shirasagi/public/sites/w/w/w/_/
  Alias /assets/  /var/www/shirasagi/public/assets/

  # x-sendfile
  RequestHeader Set X-Sendfile-Type X-Sendfile
  # ELB やセキュリティファイアーウォールなどの後段に配備し、apache httpd が HTTPS を終端しない場合
  # RequestHeader Set X-Forwarded-Proto 'https'
  XSendFile on
  XSendFilePath /var/www/shirasagi

  # download .svg files
  RewriteCond %{DOCUMENT_ROOT}/%{REQUEST_FILENAME} -f
  RewriteCond %{REQUEST_URI}  \.svg$
  RewriteRule ^.*$ - [L,E=X_attachment]
  Header set Content-Disposition attachment env=X_attachment

  # static
  RewriteEngine on
  RewriteCond %{DOCUMENT_ROOT}/%{REQUEST_FILENAME} -f [OR]
  RewriteCond %{DOCUMENT_ROOT}/%{REQUEST_FILENAME} -d [OR]
  RewriteCond %{DOCUMENT_ROOT}/%{REQUEST_FILENAME} -s
  RewriteRule ^.*$ - [L]

  # reverse proxy
  AllowEncodedSlashes On
  ProxyRequests Off
  ProxyPass /assets !
  ProxyPass / http://127.0.0.1:3000/ nocanon
  ProxyPassReverse / http://127.0.0.1:3000/
</VirtualHost>
~~~

## Apache の起動

~~~
# apachectl configtest
# systemctl start  httpd
# systemctl enable httpd
~~~

> [ CentOS 6 ] <br />
> service httpd start <br />
> chkconfig httpd on <br />

## SHIRASAGIの設定を変更する(X-SendFile)

~~~
# cd /var/www/shirasagi
# vi config/after_initializers/apache_x_sendfile_header.rb
~~~

~~~
Rails.application.config.action_dispatch.x_sendfile_header = "X-Sendfile"
~~~

## unicorn の再起動

本番サーバーでは root になり次のコマンドを実行:

~~~
$ su -
# systemctl restart unicorn
~~~

開発環境では次のコマンドを実行:

~~~
$ cd /var/www/shirasagi
$ rake unicorn:restart
~~~

Unicorn の再起動には 2, 3 分かかる場合があります。

## HTTPSサイトとして設定する際の注意点
SSL証明書の指定を行いHTTPSサイトとして設定する際、上記VirtualHost設定のままでは
管理画面からのログインが正常に動作しない場合があります。
これに対処するには Apache からバックエンドのアプリケーションサーバを呼び出す場合、
X_FORWARDED_PROTOヘッダを付与する事で解決します。

設定例)
~~~
<VirtualHost *:443>
  ～
  # SSL Certificate
  SSLEngine on
  SSLProtocol -all +TLSv1.2
  SSLCipherSuite HIGH:3DES:!aNULL:!MD5:!SEED:!IDEA:!3DES:!RC4:!DH
  SSLCertificateFile      /path/to/server.crt
  SSLCertificateKeyFile   /path/to/server.key
  SSLCertificateChainFile /path/to/chain.crt
  # Add RequestHeader
  RequestHeader Set X-Forwarded-Proto 'https'
  ～
</VirtualHost>
~~~

## ロードバランサーなどの背後に配備する際の注意点

シラサギ CMS の掲示板など一部の機能には接続元の IP アドレスの拒否設定を持つものがあり、この機能を正しく動作させるには、シラサギが正しく接続元の IP アドレスを知る必要があります。

しかし、ロードバランサーやファイアーウォールの背後に apache httpd を配備した場合、接続元の IP アドレスが、X-Forwarded-For などのヘッダーにセットされ、シラサギからは正しい接続元 IP アドレスを取得できない場合があります。

シラサギでは接続元の IP アドレスを X_REAL_IP ヘッダーから取得していますので、接続元としてもっともらしい IP アドレスを X_REAL_IP ヘッダーへセットするように構成してください。

具体的には接続元の IP アドレスの拒否設定をご利用になる場合、次の手順で設定を確認してください。

1. シラサギの管理画面へログインし、接続情報 (/.u/connection) へアクセスします。
2. 「接続元IPアドレス」を確認し、正しい接続元 IP が表示されている場合は問題ありません。正しい接続元 IP アドレスが表示されていない場合は、次の手順へ進みます。
3. 外部サイト [Apache2.2系にmod_remoteipを組み込む](https://www.denet.ad.jp/technology/2017/11/apache22mod-remoteip.html) などを参考に、mod_remoteip モジュールを有効にし、X-Forwarded-For に設定されている IP アドレスチェーンの中から、接続元としてもっともらしい IP アドレスを X_REAL_IP ヘッダーへセットするように設定を変更します。
4. apache httpd を再起動し、手順 1 からやり直してください。
