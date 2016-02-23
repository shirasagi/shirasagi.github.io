---
layout: default
title: 音声読み上げ
---

## 読み上げの Basic 認証

読み上げ機能では、リクエストされた URL にアクセスするため、
アクセス先が Basic 認証で保護されていると読み上げることができません。
この場合、Basic 認証のアカウントを設定することでアクセスできるようになります。

~~~
vi config/voice.yml
~~~

~~~
production: &production
  download:
    basic_auth: [ "username", "password" ]
~~~

また、ユーザとパスワードは、`secrets.yml` に設定している `secret_key_base` を用いて暗号化することができます。

~~~
$ RAILS_ENV=production bundle exec rails c
> secrets = Rails.application.secrets[:secret_key_base]
> encryptor = ::ActiveSupport::MessageEncryptor.new(secrets, cipher: 'aes-256-cbc')
> puts encryptor.encrypt_and_sign("username")
> puts encryptor.encrypt_and_sign("password")
~~~

`secrets.yml` に設定されている `secret_key_base` は `[production|test|development]` でそれぞれ異なるため、
`voice.yml` にはそれぞれ異なる文字列を設定してください。

~~~
vi config/voice.yml
~~~

~~~
production: &production
  download:
    basic_auth: [ "ZjlvckRjaVVMM0t1UXE2ZjF6RFZZZz09LS14eEhJZTZ4bHRKekQzd3hvR3FUNURnPT0=--4de55609c68a873a734bdd221b9c42fe67888e07", "NVJURDVEbWExcE5yUDlVTFZKUUQrQT09LS00YzJab0lwODRNSGRMWHZPR2J5dTFBPT0=--970e99f0ca61a6ac7a008bca94e4068d2174f0f1" ]
~~~

## 読み上げ使用時の Rack サーバの注意点

読み上げをご利用になる場合、必ず Rack サーバが 2 多重以上でリクエストを処理できることを確認して下さい。
Unicorn をご利用の場合 `config/unicorn.rb` を確認し、ワーカープロセス数を 2 以上に設定してください。

~~~
vi config/unicorn.rb
~~~

~~~
# 初期値は2
worker_processes Integer(ENV["WEB_CONCURRENCY"] || 2)
~~~
