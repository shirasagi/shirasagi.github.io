---
layout: default
title: 環境設定
---

## 動作モード (Rails.env)

デフォルトでは `production` モードで動作します。
下記の設定ファイルで変更することができます。

```
$ vi config/environment.yml
```

```
# Default environment
RAILS_ENV: production
```

この設定は `Rails.env` が指定されていない時に有効になります。
例えば Unicorn の起動オプションが指定されている場合は、そちらが優先されます。

```
$ bundle exec rake unicorn:start RAILS_ENV=development
```
