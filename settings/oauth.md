---
layout: default
title: OAuth 認証
---

## 設定ファイル

```
$ cp -n config/defaults/oauth.yml config
$ vi config/oauth.yml
```

## OAuth の有効化

```
roduction: &production
  # prefix_path must be set to same path as member/login node.
  prefix_path: "/auth"   # コメントを外す
  ...
```

## OAuth の設定

管理画面の「ログイン」フォルダー（モジュールが「メンバー」のフォルダー）の編集画面を開きます。
有効にしたい OAuth プロバイダーを「有効」に、それ以外を「無効」にします。

有効にしたOAuth プロバイダーの *クライアントID* と *クライアントシークレット* を設定し、保存をクリックします。

*クライアントID* と *クライアントシークレット* は、`oauth.yml` に設定することもできます。
*クライアントID* と *クライアントシークレット* をフォルダーに設定すると、サイト管理者がメンテナンスすることができるようになる反面、容易に誤った設定に変更されやすくなります。
`oauth.yml` に設定するとシステム管理者のみがメンテナンスすることができ、容易には変更できないためシステムの安定性が保たれます。

どちらに管理させたほうが都合が良いかを判断し、
フォルダーに設定するか `oauth.yml` に設定するかを決定してください。

## Unicorn 再起動

設定変更を反映させるため Unicorn を再起動します。

```
$ rake unicorn:restart
```

Unicorn の再起動には 2, 3 分かかる場合があります。

## クライアントIDとクライアントシークレットの取得方法

### Twitter

ブラウザで Twitter にログイン後、https://apps.twitter.com/ にアクセスすると、クライアントIDとクライアントシークレットを取得することができます。

Callback URL には `http://$domain:$port/auth/twitter/callback` を設定してください。

### Facebook

ブラウザで Facebook にログイン後、https://developers.facebook.com/ にアクセスすると、クライアントIDとクライアントシークレットを取得することができます。

Valid OAuth redirect URIs には `http://$domain:$port/auth/facebook/callback` を設定してください。

その他の注意点として、メールアドレスを正しく登録しないとアプリが仮登録のままとなります。

### Yahoo! JAPAN

ブラウザで Yahoo! JAPAN にログイン後、https://e.developer.yahoo.co.jp/ にアクセスすると、クライアントIDとクライアントシークレットを取得することができます。

コールバックURL には `http://$domain:$port/auth/yahoojp/callback` を設定してください。

### Google

ブラウザで Google にログイン後、https://console.developers.google.com/ にアクセスすると、クライアントIDとクライアントシークレットを取得することができます。

認証済みのリダイレクトURLには `http://$domain:$port/auth/google_oauth2/callback` を設定してください。

その他の注意点として、"Contacts API" と "Google+ API" の使用を有効にしないと動作しません。

### GitHub

ブラウザで Google にログイン後、Settings -> Applications -> Developer applications とたどると、クライアントIDとクライアントシークレットを取得することができます。

Authorization callback URL には `http://$domain:$port/auth/github/callback` を設定してください。

### 制限

現在、Twitter, Facebook, Yahoo! Japan, Google, GitHub の 5 つのプロバイダーに対応しています。
これら以外のプロバイダーには未対応です。
