---
layout: default
title: Nginx のインストール
---

## Nginx

- [Official Site](http://nginx.org/)

## Nginx のインストール

~~~
# vi /etc/yum.repos.d/nginx.repo
~~~

~~~
[nginx]
name=nginx repo
baseurl=http://nginx.org/packages/centos/$releasever/$basearch/
gpgcheck=0
enabled=0
~~~

~~~
# yum -y --enablerepo=nginx install nginx
# nginx -t
# systemctl start nginx
# systemctl enable nginx
~~~

> [ CentOS 6 ] <br />
> service nginx start <br />
> chkconfig nginx on <br />

## 標準の設定を追加する

各設定値は環境に応じて変更してください。

#### (1) http 用標準設定

~~~
# vi /etc/nginx/conf.d/http.conf
~~~

~~~
server_tokens off;
server_name_in_redirect off;
etag off;
client_max_body_size 100m;
client_body_buffer_size 256k;

gzip on;
gzip_http_version 1.0;
gzip_comp_level 1;
gzip_proxied any;
gzip_vary on;
gzip_buffers 4 8k;
gzip_min_length 1000;
gzip_types text/plain
           text/xml
           text/css
           text/javascript
           application/xml
           application/xhtml+xml
           application/rss+xml
           application/atom_xml
           application/javascript
           application/x-javascript
           application/x-httpd-php;
gzip_disable "MSIE [1-6]\.";
gzip_disable "Mozilla/4";

proxy_headers_hash_bucket_size 128;
proxy_headers_hash_max_size 1024;
proxy_cache_path /var/cache/nginx/proxy_cache levels=1:2 keys_zone=my-key:8m max_size=50m inactive=120m;
proxy_temp_path /var/cache/nginx/proxy_temp;
proxy_buffers 8 64k;
proxy_buffer_size 64k;
proxy_max_temp_file_size 0;
proxy_connect_timeout 30;
proxy_read_timeout 120;
proxy_send_timeout 10;
proxy_cache_use_stale timeout invalid_header http_500 http_502 http_503 http_504;
proxy_cache_lock on;
proxy_cache_lock_timeout 5s;
~~~

#### (2) location 用ヘッダー設定

~~~
# vi /etc/nginx/conf.d/header.conf
~~~

~~~
proxy_set_header Host $host;
proxy_set_header X-Real-IP $remote_addr;
proxy_set_header Remote-Addr $remote_addr;
# HTTPS しか使用しない場合
proxy_set_header X-Forwarded-Proto "https";
# HTTP も使用する場合
# proxy_set_header X-Forwarded-Proto $scheme;
# ELB やセキュリティファイアーウォールなどの後段に配備し、nginx が HTTPS を終端しない場合
# proxy_set_header X-Forwarded-Proto $http_x_forwarded_proto;
proxy_set_header X-Forwarded-Host $http_host;
proxy_set_header X-Forwarded-Server $host;
proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
proxy_set_header Accept-Encoding "";
proxy_set_header X-Sendfile-Type X-Accel-Redirect;
proxy_hide_header X-Pingback;
proxy_hide_header Link;
proxy_hide_header ETag;
~~~

#### (3) server 用キャッシュ設定

~~~
# mkdir /etc/nginx/conf.d/common/
# vi /etc/nginx/conf.d/common/drop.conf
~~~

~~~
location = /favicon.ico                      { expires 1h; access_log off; log_not_found off; }
location = /robots.txt                       { expires 1h; access_log off; log_not_found off; }
location = /apple-touch-icon.png             { expires 1h; access_log off; log_not_found off; }
location = /apple-touch-icon-precomposed.png { expires 1h; access_log off; log_not_found off; }
~~~

## シラサギの設定を追加する

#### (1) ドメイン/ポートの設定

~~~
# vi /etc/nginx/conf.d/virtual.conf
~~~

~~~
server {
    include conf.d/server/shirasagi.conf;
    server_name example.jp;
}
~~~

> `example.jp` はサイトのドメインに変更してください。<br />
> `include ...` の箇所は直接記述しても構いません。

#### (2) プロキシーの設定

~~~
# mkdir /etc/nginx/conf.d/server/
# vi /etc/nginx/conf.d/server/shirasagi.conf
~~~

~~~
include conf.d/common/drop.conf;
root /var/www/shirasagi/public/sites/w/w/w/_/;
error_page 404 /404.html;

location @app {
    include conf.d/header.conf;
    if ($request_filename ~ .*\.(ico|gif|jpe?g|png|css|js)$) { access_log off; }
    proxy_pass http://127.0.0.1:3000;
    proxy_set_header X-Accel-Mapping /var/www/shirasagi/=/private_files/;
    proxy_intercept_errors on;
}
location / {
    try_files $uri $uri/index.html @app;
}
location /assets/ {
    root /var/www/shirasagi/public/;
    expires 1h;
    access_log off;
}
location /private_files/ {
    internal;
    alias /var/www/shirasagi/;
}
# download .svg files instead of showing inline in browser for protecting from xss
location ~* \.svg$ {
    expires 1h;
    access_log off;
    log_not_found off;
    add_header Content-Disposition "attachment";
    try_files $uri @app;
}
~~~
> `/var/www/shirasagi` はインストールしたディレクトリに変更してください。

## Nginx の再起動

~~~
# systemctl restart nginx
~~~
> [ CentOS 6 ]
> service nginx restart

## 管理画面にBasic認証を設定する

パスワードファイルを作成する。

~~~
# yum -y install httpd-tools
# cd /etc/nginx
# htpasswd -cm .htpasswd username
> パスワードを入力する
~~~

設定を追加する。

~~~
# vi /etc/nginx/conf.d/virtual.conf
~~~

~~~
server {
    ...
    location /. {
        try_files $uri @app;
        auth_basic "Secret";
        auth_basic_user_file /etc/nginx/.htpasswd;
    }
}
~~~

## セキュリティ関連の設定

SELlinux, Firewalld が有効な場合はそれぞれについて設定します。


- SELlinux

~~~
管理用コマンドの導入
# yum -y install policycoreutils-python

selinux制限許可(SHIRASAI関連ファイル, unicorn)
# restorecon -RF /var/www/shirasagi/public
# restorecon -RF /var/www/shirasagi/private
# semanage port -a -t http_port_t -p tcp 3000
~~~


- Firewalld

~~~
unicorn 3000番ポートを解放する
# firewall-cmd --add-port=3000/tcp --permanent
# firewall-cmd --reload
~~~

## ロードバランサーなどの背後に配備する際の注意点

シラサギ CMS の掲示板など一部の機能には接続元の IP アドレスの拒否設定を持つものがあり、この機能を正しく動作させるには、シラサギが正しく接続元の IP アドレスを知る必要があります。

しかし、ロードバランサーやファイアーウォールの背後に nginx を配備した場合、接続元の IP アドレスが、X-Forwarded-For などのヘッダーにセットされ、シラサギからは正しい接続元 IP アドレスを取得できない場合があります。

シラサギでは接続元の IP アドレスを X_REAL_IP ヘッダーから取得していますので、接続元としてもっともらしい IP アドレスを X_REAL_IP ヘッダーへセットするように構成してください。

具体的には接続元の IP アドレスの拒否設定をご利用になる場合、次の手順で設定を確認してください。

1. シラサギの管理画面へログインし、接続情報 (/.u/connection) へアクセスします。
2. 「接続元IPアドレス」を確認し、正しい接続元 IP が表示されている場合は問題ありません。正しい接続元 IP アドレスが表示されていない場合は、次の手順へ進みます。
3. 外部サイト [remote_addrとかx-forwarded-forとかx-real-ipとか](https://christina04.hatenablog.com/entry/2016/10/25/190000) などを参考に、X-Forwarded-For に設定されている IP アドレスチェーンの中から、接続元としてもっともらしい IP アドレスを X_REAL_IP ヘッダーへセットするように設定を変更します。
4. nginx を再起動し、手順 1 からやり直してください。
