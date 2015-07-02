---
layout: default
title: 環境設定
---

## 設定ファイル

設定ファイルは `config/defaults/*.yml` に設置されています。

設定値を変更したい場合は、直接ファイルを修正するのではなく `config/` にコピーして編集してください。
`config/*.yml` で設定している値が優先されて機能します。

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
