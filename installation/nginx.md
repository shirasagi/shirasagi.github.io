---
layout: default
title: Nginx のインストール
---

## Nginx

- [Official Site](http://nginx.org/)

## Nginx のインストール

```
# vi /etc/yum.repos.d/CentOS-Base.repo
```

```
[nginx]
name=nginx repo
baseurl=http://nginx.org/packages/centos/$releasever/$basearch/
gpgcheck=0
enabled=0
```

```
# yum -y --enablerepo=nginx install nginx
# nginx -t
# systemctl start nginx
# systemctl enable nginx
```

> [ CentOS 6 ] <br />
> service nginx start <br />
> chkconfig nginx on <br />

## 標準の設定を追加する

```
# vi /etc/nginx/conf.d/http.conf
```

```
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

proxy_set_header Host $host;
proxy_set_header X-Real-IP $remote_addr;
proxy_set_header Remote-Addr $remote_addr;
proxy_set_header X-Forwarded-Host $http_host;
proxy_set_header X-Forwarded-Server $host;
proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
proxy_set_header Accept-Encoding "";
proxy_set_header X-Sendfile-Type X-Accel-Redirect;
proxy_hide_header X-Pingback;
proxy_hide_header Link;
proxy_hide_header ETag;
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
```

> 各設定値は環境に応じて変更してください。

## 共通の設定を追加する

```
# mkdir /etc/nginx/conf.d/common/
# vi /etc/nginx/conf.d/common/drop.conf
```

```
location = /favicon.ico                      { expires 1h; access_log off; log_not_found off; }
location = /robots.txt                       { expires 1h; access_log off; log_not_found off; }
location = /apple-touch-icon.png             { expires 1h; access_log off; log_not_found off; }
location = /apple-touch-icon-precomposed.png { expires 1h; access_log off; log_not_found off; }
```

## シラサギの設定を追加する (1)


```
# mkdir /etc/nginx/conf.d/server/
# vi /etc/nginx/conf.d/server/shirasagi.conf
```

```
#
# `/var/www/shirasagi` はインストールしたディレクトリに変更してください。
#
include conf.d/common/drop.conf;

location @app {
    if ($request_filename ~ .*\.(ico|gif|jpe?g|png|css|js)$) { access_log off; }
    proxy_pass http://127.0.0.1:3000;
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
```

## シラサギの設定を追加する (2)

```
# vi /etc/nginx/conf.d/virtual.conf
```

```
#
# `example.jp` はサイトのドメインに変更してください。
# `/var/www/shirasagi` はインストールしたディレクトリに変更してください。
#
server {
    include conf.d/server/shirasagi.conf;
    listen 80;
    server_name example.jp;
    root /var/www/shirasagi/public/sites/w/w/w/_/;
}
proxy_set_header X-Accel-Mapping /var/www/shirasagi/=/private_files/;
```

> `include ..` の箇所に設定(1)を記載して `virtual.conf` にまとめることもできます。

## Nginx の再起動

```
# systemctl restart nginx
```
> [ CentOS 6 ]
> service nginx restart

## 管理画面にBasic認証を設定する

パスワードファイルを作成する。

```
# yum -y install httpd-tools
# cd /etc/nginx
# htpasswd -cm .htpasswd username
> パスワードを入力する
```

設定を追加する。

```
# vi /etc/nginx/conf.d/virtual.conf
```

```
server {
    ...
    location /. {
        try_files $uri @app;
        auth_basic "Secret";
        auth_basic_user_file /etc/nginx/.htpasswd;
    }
}
```

## セキュリティ関連の設定

SELlinux, Firewalld が有効な場合はそれぞれについて設定します。


- SELlinux

```
管理用コマンドの導入
# yum -y install policycoreutils-python

selinux制限許可(SHIRASAI関連ファイル, unicorn)
# restorecon -RF /var/www/shirasagi/public
# restorecon -RF /var/www/shirasagi/private
# semanage port -a -t http_port_t -p tcp 3000
```


- Firewalld

```
unicorn 3000番ポートを解放する
# firewall-cmd --add-port=3000/tcp --permanent
# firewall-cmd --reload
```
