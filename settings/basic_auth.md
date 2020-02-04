---
layout: default
title: Basic 認証
---

## Basic 認証

音声読み上げ機能、リンクチェック機能などでは、リクエストされた URL にアクセスするため、
アクセス先が Basic 認証で保護されていると読み上げることができません。
この場合、Basic 認証のアカウントを設定することでアクセスできるようになります。

~~~
vi config/cms.yml
~~~

~~~
production: &production
  basic_auth: [ "username", "password" ]
~~~

また、ユーザとパスワードは、`secrets.yml` に設定している `secret_key_base` を用いて暗号化することができます。

~~~
$ RAILS_ENV=production bundle exec rails c
> SS::MessageEncryptor.encrypt([ "username", "password" ])
~~~

`secrets.yml` に設定されている `secret_key_base` は `[production|test|development]` でそれぞれ異なるため、
`cms.yml` にはそれぞれ異なる文字列を設定してください。

~~~
vi config/cms.yml
~~~

~~~
production: &production
  basic_auth: [ "NGZXQk81bTd3bXhQQURab2JtTk1SZWh0czN6TThCRkZuZ2JOcmxtNGhKYz0tLUxxSEJzY3dPcGFFcmZIbUpMM3FRUVE9PQ==--51b4478b871e43d5b24e47745e49f6e894c5416b", "MlpUN3lSTHZnTk5YcTB1QjFLUUNCVXgyemRPYUJ5eVlBZkhDZkYySkNpcz0tLTBBNXBlWGlKSTVHbmoxVWx4eFVmMnc9PQ==--0a56c58dfd6da357fffc1608f42aa7260dc467ca" ]
~~~
