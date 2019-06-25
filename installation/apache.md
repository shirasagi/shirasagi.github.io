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
  ServerName default
  DocumentRoot /var/www/shirasagi/public/sites/w/w/w/_/
  Alias /assets/  /var/www/shirasagi/public/assets/

  # x-sendfile
  RequestHeader Set X-Sendfile-Type X-Sendfile
  XSendFile on
  XSendFilePath /var/www/shirasagi

  AllowEncodedSlashes On
  RewriteEngine on
  # voice
  RewriteCond %{REQUEST_URI} ^/.voice/.*$
  RewriteCond %{THE_REQUEST} /([^\ ]*)
  RewriteRule (?s)^/(.*)$ http://127.0.0.1:3000/%1 [P,L,QSA,NE]
  # static file
  RewriteCond %{DOCUMENT_ROOT}/%{REQUEST_FILENAME} !-f
  RewriteCond %{DOCUMENT_ROOT}/%{REQUEST_FILENAME} !-d
  RewriteCond %{REQUEST_URI} !^/assets/.*$
  RewriteRule ^/(.*) http://127.0.0.1:3000/$1 [P,L,QSA]

  ProxyRequests Off
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
