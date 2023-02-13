---
layout: default
title: OAuth 2.0 IdP
---

## 目的

これまで SHIRASAGI では API 機能を提供してきました。
しかし、ユーザーID/パスワード方式の認証しかなく、あまり広く利用される様な状況ではありません。
ここで、一般的に利用されている OAuth 2.0 IdP 機能を SHIRASAGI が提供することで、広く API クライアントを開発できるようにします。

## SHIRASAGI の OAuth 2.0 IdP

### アプリケーション

次の二つのタイプのアプリケーションをサポートしています。

- クライアント
  - 共有鍵タイプのアプリケーションで、クライアントIDとクライアントシークレットとを認証に用います。
- サービス
  - 公開鍵タイプのアプリケーションで、公開鍵を認証に用います。
  - 公開鍵の形式としてはRSA暗号のみをサポートしており、楕円曲線暗号などは非サポートです。

アプリケーションは SHIRASAGI のシステムにログイン後、システム設定 ー 認証 ー OAuthアプリ から作成することができます。
 デモサイトでは <https://demo.ss-proj.org/.sys/auth/oauth2_applications>

### フロー

次の3 種類のフローをサポートしています。

- Authorization Code Flow
- Implicit Flow
- urn:ietf:params:oauth:grant-type:jwt-bearer

### エンドポイント

- 認可エンドポイント: https://your-domain/.mypage/login/oauth2/authorize
- トークンエンドポイント: https://your-domain/.mypage/login/oauth2/token

## サンプルコード

### Authorization Code Flow

このフローではクライアントタイプのアプリケーションを利用しますので、
事前に SHIRASAGI の管理画面からクライアントタイプのアプリケーションを作成しておいてください。

~~~ruby
# ドメイン
your_domain = "https://your-domain/"
# 認可エンドポイントの URL
authorize_url = URI.join(your_domain, "/.mypage/login/oauth2/authorize")
# トークンエンドポイントの URL
token_url = URI.join(your_domain, "/.mypage/login/oauth2/token")
# SHIRASAGI 管理画面で作成したアプリケーションのクライアントID
client_id = ...
# SHIRASAGI 管理画面で作成したアプリケーションのクライアントシークレット
client_secret = ...
# SHIRASAGI 管理画面で作成したアプリケーションを作成する際に登録したリダイレクト URL
redirect_uri = ...
# SHIRASAGI 管理画面で作成したアプリケーションを作成する際に選択した権限
scopes = %w(...)

authorize_request = {
  response_type: "code",
  client_id: client_id,
  redirect_uri: redirect_uri,
  scope: scopes.join(" ")
}
# コンソールに表示される URL にブラウザでアクセスする
puts "#{authorize_url}?#{authorize_request.to_query}"

# コンソールに表示される URL にブラウザでアクセスすると、シラサギ側のログイン画面が表示される。
# そして、ログインに成功すると redirect_uri に戻ってくる。
# redirect_uri には code というパラメータが含まれているので、記録する
authorize_code = ...

token_resp = Faraday.new(url: token_url).post do |req|
  req.headers['Authorization'] = "Basic #{Base64.strict_encode64([ client_id, client_secret ].join(":"))}"
  req.params['grant_type'] = 'authorization_code'
  req.params['code'] = authorize_code
  req.params['redirect_uri'] = redirect_uri
end

access_token = JSON.parse(token_resp.body).then { |json| json["access_token"] }
puts "access_token=#{access_token}"

# 取得したアクセストークンを用いてユーザーアカウント情報を取得する

account_resp = Faraday.new(url: URI.join(your_domain, "/.u/user_account.json")).get do |req|
  req.headers['Authorization'] = "Bearer #{access_token}"
end

account_json = JSON.parse(account_resp.body)
puts "email=#{account_json['email']}"
~~~

### Implicit Flow

このフローではクライアントタイプのアプリケーションを利用します。


~~~ruby
# ドメイン
your_domain = "https://your-domain/"
# 認可エンドポイントの URL
authorize_url = URI.join(your_domain, "/.mypage/login/oauth2/authorize")
# SHIRASAGI 管理画面で作成したアプリケーションのクライアントID
client_id = ...
# SHIRASAGI 管理画面で作成したアプリケーションを作成する際に登録したリダイレクト URL
redirect_uri = ...
# SHIRASAGI 管理画面で作成したアプリケーションを作成する際に選択した権限
scopes = %w(...)

authorize_request = {
  response_type: "token",
  client_id: client_id,
  redirect_uri: redirect_uri,
  scope: scopes.join(" ")
}
# コンソールに表示される URL にブラウザでアクセスする
puts "#{authorize_url}?#{authorize_request.to_query}"

# コンソールに表示される URL にブラウザでアクセスすると、シラサギ側のログイン画面が表示される。
# そして、ログインに成功すると redirect_uri に戻ってくる。
# redirect_uri には access_token というパラメータが含まれているので、記録する
access_token = ...

# 取得したアクセストークンを用いてユーザーアカウント情報を取得する

account_resp = Faraday.new(url: URI.join(your_domain, "/.u/user_account.json")).get do |req|
  req.headers['Authorization'] = "Bearer #{access_token}"
end

account_json = JSON.parse(account_resp.body)
puts "email=#{account_json['email']}"
~~~

### urn:ietf:params:oauth:grant-type:jwt-bearer

クライアントタイプアプリケーションでもサービスタイプアプリケーションでも利用可能です。
本サンプルではサービスタイプアプリケーションを利用します。

~~~ruby
# ドメイン
your_domain = "https://your-domain/"
# トークンエンドポイントの URL
token_url = URI.join(your_domain, "/.mypage/login/oauth2/token")
# SHIRASAGI 管理画面で作成したアプリケーションのクライアントID
client_id = ...
# SHIRASAGI 管理画面で作成したアプリケーションを作成する際に登録した公開鍵のペアになる秘密鍵
key = OpenSSL::PKey::RSA.new(::File.read("/path/to/private_key.pem"))
# SHIRASAGI 管理画面で作成したアプリケーションを作成する際に選択した権限
scopes = %w(...)
# 成り済ましたいユーザーのメールアドレス
user_email = ...

jwt_assertion = JSON::JWT.new(
  # issuer
  iss: client_id,
  # subject
  sub: user_email,
  # scope
  scope: scopes.join(" "),
  # audience
  aud: token_url,
  # expires at
  exp: 1.hour.from_now.to_i,
  # issued at
  iat: Time.zone.now.to_i
)
jwt_assertion = jwt_assertion.sign(key)

token_resp = Faraday.new(url: token_url).post do |req|
  req.params['grant_type'] = "urn:ietf:params:oauth:grant-type:jwt-bearer"
  req.params['assertion'] = jwt_assertion.to_s
end

access_token = JSON.parse(token_resp.body).then { |json| json["access_token"] }
puts "access_token=#{access_token}"

# 取得したアクセストークンを用いてユーザーアカウント情報を取得する

account_resp = Faraday.new(url: URI.join(your_domain, "/.u/user_account.json")).get do |req|
  req.headers['Authorization'] = "Bearer #{access_token}"
end

account_json = JSON.parse(account_resp.body)
puts "email=#{account_json['email']}"
~~~

本フローでは任意の任意のユーザーに成り済ますことができます。ログイン画面が表示されることはありません。非常に強力なアプリケーションタイプとフローとなります。

RSA 鍵の作成に関して openssl コマンドがインストールされている環境であれば、次のコマンドを実行することで秘密鍵と公開鍵とを作成することができます。

~~~
# 秘密鍵の作成
openssl genrsa 2048 > private_key.pem
# 公開鍵の作成
openssl rsa -in private_key.pem -pubout -out public_key.pem
~~~
