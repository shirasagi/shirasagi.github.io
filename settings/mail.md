---
layout: default
title: メール送信
---

## 設定ファイル

```
$ cp -n config/defaults/mail.yml config
$ vi config/mail.yml
```

## sendmail

```
production:
  # smtp or sendmail
  delivery_method: sendmail

  # sendmail settings
  location:
  arguments:
```

## SMTP

```
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
```

## Header

```
production:
  # message settings
  default_from:
  default_charset: iso-2022-jp
```
