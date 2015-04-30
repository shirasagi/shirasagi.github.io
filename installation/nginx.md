---
layout: default
title: nginx
---

## Install

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
# /sbin/service nginx start
# /sbin/chkconfig nginx on
```

## シラサギの設定を追加する

```
# vi /etc/nginx/conf.d/virtual.conf
```

```
server {
    listen 80;
    server_name example.jp;
    root /var/www/ss/public/sites/w/w/w/_/;
    
    location @app {
        if ($request_filename ~ .*\.(ico|gif|jpe?g|png|css|js)$) { access_log  off; }
        proxy_pass http://127.0.0.1:3000;
    }
    location / {
        expires 1h;
        try_files $uri $uri @app;
    }
    location /assets/ {
        root /var/www/ss/public/;
        expires 1h;
        access_log off;
    }
    location ~* \.(ico|css|js|gif|jpe?g|png)$ {
        expires 1h;
        access_log off;
        log_not_found off;
        try_files $uri $uri @app;
    }
}
```

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
        try_files $uri $uri @app;
        auth_basic "Secret";
        auth_basic_user_file /etc/nginx/.htpasswd;
    }
}
```
