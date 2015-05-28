---
layout: default
title: ログイン
---

## 仕様

- ユーザーIDとパスワードでログインが可能。
- メールアドレスとパスワードでログインが可能。
- LDAP連携が可能。

## CSRF対策

- 通常のログイン画面はCSRF対策が有効になっている。
- CSRF対策トークンを使用しないログイン画面も使用することができる。(`/.mypage/remote_login`)

`config/sns.yml`

```
remote_login: true
```

## ソースコード

- https://github.com/shirasagi/shirasagi/blob/master/config/samples/sns.yml
