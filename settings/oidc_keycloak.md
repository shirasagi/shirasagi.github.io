---
layout: default
title: OpenID Connect 認証の疎通確認
---

シラサギは OpenID Connect (OIDC) をサポートしており、シラサギ側に IdP の情報を適切に設定することで、
シラサギでシングル・サインオン (SSO) をサポートすることが可能となっています。

ここでは、IdP として keycloak を用意し、シラサギと Keycloak を OIDC で連携し、SSO を実現する設定は以下の通りになります。
シラサギ側が RP (リライイング・パーティ)、Keycloak 側が IdP (IDプロバイダー) として動作します。

> Keycloak のインストールおよび設定方法は [Keycloack を用いた認証基盤 (IdP) の構築](devel/keycloak.html) を参照下さい。

## 事前準備

また、OIDC SSO 認証でサポートしているのは _認証_ のみで、_認可_ についてはシラサギ側で実施します。
つまり、事前にシラサギ側にグループ、ユーザー、権限/ロールを適切に設定しておく必要があります。
認証は IdP 側で実施します。

## Keycloak側 (IdP) の設定

Keycloak の管理コンソールで、シラサギをクライアントとして登録します。 

1. Client Type: openid-connect を選択します。

2. Client ID: 任意のID(例: demo)を設定します。

3. Client authentication: サーバー間通信を行うため ON にし、Authentication flow に Implicit flow を追加します。
   必要に応じて Client Secret を発行・保存してください。

4. Valid redirect URIs: シラサギの認証用 URL を指定します (例: https://[シラサギURL]/.mypage/login/oid/[ファイル名]/callback)。
   環境によりパスが異なる場合があるため、シラサギのシステム設定画面で確認してください。

4. ユーザー、グループを作成し、任意にパスワードを設定します。

## シラサギ側 (RP) の設定

シラサギのシステム管理(https://[シラサギURL]/.sys/auth/open_id_connects) 画面から OIDC の接続情報を設定します。

1. 管理メニュー: システム設定 ＞ 認証 ＞ OpenID Connect から 新規作成します。

2. 名前: 任意の名前を入力します。

3. ファイル名: Keycloak で発行した有効なリダイレクト URI で発行したファイル名を入力します(例: oidc)。

4. Client ID / Client Secret: Keycloak で発行したものを入力します。

5. Issuer: Keycloak のメタデータ URL を指定します。
   形式: https://[Keycloakドメイン]/realms/[レルム名]

6. Auth URL: Keycloak のメタデータ URL を指定します。
   形式: https://[Keycloakドメイン]/realms/[レルム名]/protocol/openid-connect/auth

7. Token URL: Keycloak のメタデータ URL を指定します。
   形式: https://[Keycloakドメイン]/realms/[レルム名]/protocol/openid-connect/token

8. Scope: 通常は openid profile email などを指定します。

9. JWKS Uri URL: Keycloak のメタデータ URL を指定します。
   形式: https://[Keycloakドメイン]/realms/[レルム名]/protocol/openid-connect/certs

また、別途 Discovery ファイルから接続情報を設定も可能です。

> OpenID Connect Discovery は、特定の URL (例: https://[Keycloakドメイン]/realms/[レルム名]/.well-known/openid-configuration) で公開されるJSON形式のファイルです

## 注意点

ユーザーの紐付けについて、初回ログイン時にシラサギ側のユーザーアカウントとKeycloak側の
ID (email等)をどう紐付けるか、マッチングのルールを確認してください。

どうしても疎通確認がうまくいかない場合は、シラサギのログレベルを debug に変更し、
どのような URL へ、どんなパラメーターでアクセスしているかをログに出力するようにすることで、
どこでどんな理由でうまくいかないのかを調査することができます。

> `config/environments/production.rb` をテキストエディタで開き `config.log_level` を `debug` に変更し、シラサギを再起動してください。これでデバッグログが有効になります。
