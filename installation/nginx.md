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
# # [CentOS7] systemctl start nginx.service
# /sbin/chkconfig nginx on
```

## シラサギの設定を追加する

```
# vi /etc/nginx/conf.d/virtual.conf
```

```
server {
    listen 80;

    # サイトのドメイン名を設定する。
    server_name example.jp;

    # SHIRASAGI をインストールしたディレクトリ下の `public/sites/w/w/w/_/` を指定する。
    root /var/www/shirasagi/public/sites/w/w/w/_/;

    location @app {
        if ($request_filename ~ .*\.(ico|gif|jpe?g|png|css|js)$) { access_log  off; }
        proxy_pass http://127.0.0.1:3000;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Host $http_host;
        proxy_set_header X-Forwarded-Server $host;
    }
    location / {
        expires 1h;
        try_files $uri $uri/index.html @app;
    }
    location /assets/ {
        # root にSHIRASAGI をインストールしたディレクトリ下の `public` を指定する。
        root /var/www/ss/public/;
        expires 1h;
        access_log off;
    }
    location ~* \.(ico|css|js|gif|jpe?g|png)$ {
        expires 1h;
        access_log off;
        log_not_found off;
        try_files $uri @app;
    }
}
```

```
# /sbin/service nginx restart
# # [CentOS7] systemctl restart nginx
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
        try_files $uri @app;
        auth_basic "Secret";
        auth_basic_user_file /etc/nginx/.htpasswd;
    }
}
```
