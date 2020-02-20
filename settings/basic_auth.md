---
layout: default
title: Basic 認証環境での設定
---

## Basic 認証

Basic 認証を使用している場合、いくつかの機能は正常に動作しません。
そのような機能は `config/cms.yml` に Basic 認証のユーザーとパスワードを設定することで Basic 認証環境下でも動作するようになります。

> `config/cms.yml` が存在しない場合、`config/defaults/cms.yml` を `config/cms.yml` へコピーしてください。

~~~
vi config/cms.yml
~~~

~~~
production: &production
  basic_auth: [ "username", "password" ]
~~~

また、ユーザーとパスワードは、`secrets.yml` に設定している `secret_key_base` を用いて暗号化することができます。
下記のコマンドでユーザーとパスワードを暗号化してください。

~~~
$ RAILS_ENV=production bundle exec rails c
> SS::MessageEncryptor.encrypt([ "username", "password" ])
~~~

暗号化されたユーザーとパスワードをコピーして、 `config/cms.yml` に設定します。

~~~
vi config/cms.yml
~~~

~~~
production: &production
  basic_auth: [ "NGZXQk81bTd3bXhQQURab2JtTk1SZWh0czN6TThCRkZuZ2JOcmxtNGhKYz0tLUxxSEJzY3dPcGFFcmZIbUpMM3FRUVE9PQ==--51b4478b871e43d5b24e47745e49f6e894c5416b", "MlpUN3lSTHZnTk5YcTB1QjFLUUNCVXgyemRPYUJ5eVlBZkhDZkYySkNpcz0tLTBBNXBlWGlKSTVHbmoxVWx4eFVmMnc9PQ==--0a56c58dfd6da357fffc1608f42aa7260dc467ca" ]
~~~
