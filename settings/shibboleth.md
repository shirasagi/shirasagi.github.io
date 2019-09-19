---
layout: default
title: Shibboleth 認証
---

シラサギを Shibboleth SP として Shibboleth IdP へ接続する方法を説明します。本書の設定を参考に Shibboleth 認証を設定すると、シラサギのグループウェアや Web メールへのログインの際に Shibboleth 認証を利用できるようになります。

## 前提

標準（公式？）の Shibboleth SP モジュールは apache httpd の拡張ハンドラーとして提供されており、インターネットに多く溢れている解説記事もこの拡張ハンドラーを利用したものとなっています。

このようなことから、シラサギでは通常 nginx を Web サーバーとして利用するように案内していますが、シラサギを Shibboleth SP とする場合は Web サーバーとして apache httpd を利用するようにします。

## 設定手順の概要

Shibboleth IdP への接続は、多くの個別のネットワーク情報が必要となるので、本書では詳細に立ち入らず、概要のみを述べるものとします。設定手順の概要は、次のようになります。

1. インターネットの解説記事や Shibboleth IdP の管理者の指示にしたがって apache http および Shibboleth SP モジュールを適切にインストールおよび設定します。
2. [インストール手順](/#インストール手順) を参照し、シラサギをインストールします。
3. [Apache のインストール](/installation/apache.html)を参考に 1 で設定した apache httpd に設定を追加し、シラサギへのリバース・プロキシーを設定します。
   - 注意点として、Shibboleth SP モジュールがハンドリングしなければならない URL は　Shibboleth SP モジュールが受け取れるように、それ以外はシラサギが受け取れるようにリバース・プロキーを設定します。
4. Shibboleth SP モジュールは認証に成功すると認証した情報を apache httpd の「環境変数」に設定します。この「環境変数」をシラサギへリバース・プロキシーする際に一緒にシラサギへ転送する設定を apache httpd へ追加します。
5. シラサギの管理画面へログインし、左のナビを「システム設定」-「認証」-「環境変数」とたどり、4 で転送した環境変数を設定します。
   - 注意点として、Shibboleth SP モジュールは認証情報として様々な情報を「環境変数」へ設定しますが、ここでは、シラサギ側の「ユーザーID」か「メールアドレス」に相当する環境変数を設定する必要があります。
6. ログイン画面へ戻ると 5 で設定したリンクが表示されるので、URL をメモします。
7. 6 の URL に対してシボレス認証が必要です。そこで apache httpd の設定を変更し 6 の URL に `AuthType shibboleth` を付与します。
8. 6 のリンクをクリックすると Shibboleth IdP 側へブラウザが遷移します。Shibboleth IdP 側でログインに成功するとシラサギへ戻り、シラサギのグループウェアや Web メールが利用できるようになれば、設定に成功しています。うまく動作しない場合は、ログなどから原因を調査してください。


## 設定例

### Shibboleth SP モジュールの URL をリバース・プロキシーから除外

設定例を下に示します。

~~~
<VirtualHost ...>
  ...

  RewriteEngine on
  RewriteCond %{REQUEST_URI} !^/Shibboleth.sso/.*$
  RewriteRule ^/(.*) http://127.0.0.1:3000/$1 [P,L,QSA]

  ...
</VirtualHost>
~~~

Shibboleth SP モジュールを通常の方法でインストールすると Shibboleth SP モジュールは URL `/Shibboleth.sso/` でリクエストを待ち受けていますので、URL `/Shibboleth.sso/` をリバースプロキシーから除外する設定となっています。
なお、シラサギを通常の方法でインストールすると 3000 番ポートでリクエストを待ち受けているので 127.0.0.1:3000 へのリバースプロキシーを設定しています。

### apache httpd の「環境変数」をシラサギへリバース・プロキシーする際に一緒に転送する設定

設定例を下に示します。

~~~
<VirtualHost ...>
  ...

  RequestHeader set X-Shib-Uid %{uid}e

  ...
</VirtualHost>
~~~

Shibboleth 認証に成功すると Shibboleth SP モジュールが環境変数 `uid` に認証したユーザーのユーザーIDを設定することを前提とした例です。
シラサギ側では環境変数 `X-SHIB-UID` で、ユーザーID を受け取れるようにする設定です。

### 「システム設定」-「認証」-「環境変数」の設定例

設定例を下に示します。

| 項目       | 設定           |
|-----------|---------------|
| 名前       | Shibboleth認証 |
| ファイル名　 | shibboleth    |
| キー       | X-SHIB-UID    |

このように設定すると、ログイン画面 `/.mypage/login` に、リンク「Shibboleth認証」が表示され、そのリンク先 URL は `/.mypage/login/env/shibboleth/login` となります。

### AuthType shibboleth の付与例

設定例を下に示します。

~~~
<Location /.mypage/login/env/shibboleth/login>
  AuthType shibboleth
  ShibRequestSetting requireSession 1
  require shib-session
</Location>
~~~

## 認可に関する注意点

Shibboleth 認証は、認証のみのサービスとなっており、認可はシラサギ側で実施します。
つまり、事前にシラサギ側にユーザーの登録および、そのユーザーのグループや権限などを適切に設定しておく必要があります。

Shibboleth IdP の管理者などからユーザー情報を CSV などの機械可読形式で提供を受け、シラサギに CSV インポートにより一括でユーザーを設定することをお勧めします。
