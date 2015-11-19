---
layout: default
title: OAuth 認証
---

## 目的

Facebook、Twitter などのソーシャルアカウントでオープンデータサイトにログインするためには、
クライアントIDとクライアントシークレットを各ソーシャルサービス業者から取得し、
シラサギに設定する必要があります。

各ソーシャルサービス業者によって、クライアントIDとクライアントシークレットの取得方法が異なります。

ここでは設定方法を解説します。

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

ソーシャルサービス・プロバイダー毎にクライアントIDとクライアントシークレットの取得方法が全く異なります。
以下に、それぞれのソーシャルサービス・プロバイダーでのクライアントIDとクライアントシークレットの取得方法を説明します。

### Twitter

ブラウザで [Twitter](https://twitter.com/) にログイン後、https://apps.twitter.com/ にアクセスします。

"Create New App" ボタンをクリックし、アプリケーションを作成します。
次の項目を入力します。

* Name: アプリケーション名を入力します。管理しやすい名前であれば、どんな名前でもいいです。
* Description: アプリケーションの説明を入力します。簡潔に説明を入力します。
* Website: `http://$domain:$port/` を設定します。
* Callback URL: `http://$domain:$port/auth/twitter/callback` を設定します。

`$domain` と `$port` の部分は、設定するサイトに応じて適時読み替えてください。

アプリケーションを作成後、"Keys and Access Tokens" タブを開くと、
クライアントIDとクライアントシークレットを取得することができます。
クライアントIDとクライアントシークレットをメモしておき、シラサギに設定します。

アプリケーション作成後、追加で次の設定を実施することをお勧めします。

* Settings タブ
  * Application Icon: 素敵なアイコンを登録してください。
  * Organization name: 企業名、組織名を入力してください。
  * Organization website: ホームページを入力してください。
* Permissions タブ
  * Read only を選択てください。


### Facebook

ブラウザで [Facebook](https://www.facebook.com/) にログイン後、https://developers.facebook.com/ にアクセスします。
アクセス後:

1. メニュー "My Apps" -> "Add a New App" を選択します。
2. アプリケーション追加画面が表示されますので、選択肢の中から「ウェブサイト」を選択します。
3. アプリケーション名を入力します。管理しやすい名前であれば、どんな名前でもいいです。
4. "Create New Facebook App ID" ボタンをクリックします。
5. カテゴリを適切に選択し、「アプリIDを作成」ボタンをクリックします。
6. "Site URL" 欄に、サイトの URL `http://$domain:$port/` を入力します。
7. "Skip to Developer Dashboard" リンクをクリックします。
8. 左メニュー "Settings" をクリックします。
9. "Contact Email" 欄に、管理者のメールアドレスを入力し、"Save Changes" ボタンをクリックします。
10. "Advanced" タブをクリックします。
11. "Valid OAuth redirect URIs" 欄に `http://$domain:$port/auth/facebook/callback` を入力し、"Save Changes" ボタンをクリックします。
12. 左メニュー "Status & Review" をクリックします。
13. "Do you want to make this app and all its live features available to the general public?" 欄を "Yes" に変更します。
14. 確認が表示されるので、「確認」をクリックします。

`$domain` と `$port` の部分は、設定するサイトに応じて適時読み替えてください。

アプリケーションを作成後、左メニュー "Dashboard" をクリックすると、
App ID（＝クライアントID） と App Secret（＝クライアントシークレット）を取得することができます。
クライアントIDとクライアントシークレットをメモしておき、シラサギに設定します。

#### Facebook のビジネスアカウントについて

Facebook にはビジネスアカウントという企業で利用することができるアカウントがあります。
ビジネスアカウントでは、アプリケーションを作成できないとの情報があり、
個人でアプリケーションを作成後、ビジネスアカウントに管理を移譲するやり方が一般的なようです。
参考: http://www.ssw2005.net/facebookpage/facebook-business

### Yahoo! JAPAN

ブラウザで [Yahoo! JAPAN](http://www.yahoo.co.jp/) にログイン後、https://e.developer.yahoo.co.jp/ にアクセスします。

「新しいアプリケーションを開発」ボタンをクリックし、次の情報を入力します。

* アプリケーション名: アプリケーション名を入力します。管理しやすい名前であれば、どんな名前でもいいです。
* サイトURL: `http://$domain:$port/` を設定します。
* ガイドラインに同意しますか？に対して「同意する」を選択します。

`$domain` と `$port` の部分は、設定するサイトに応じて適時読み替えてください。

確認ボタンをクリックし、アプリケーションを作成します。

画面下段にある「アプリケーションの詳細」をクリックし、詳細画面で次の情報を入力します。

* コールバックURL: `http://$domain:$port/auth/yahoojp/callback`

更新ボタンをクリックし、アプリケーションを更新します。

アプリケーションを更新すると、アプリケーションID（＝クライアントID）とシークレット（＝クライアントシークレット）を取得することができます。
クライアントIDとクライアントシークレットをメモしておき、シラサギに設定します。

### Google

ブラウザで [Google](https://www.google.co.jp/) にログイン後、https://console.developers.google.com/ にアクセスします。

左上にある「≡」をクリックし、表示されたメニューから「API Manager」をクリックします。
"Contacts API" と "Google+ API" の使用を有効にします。

左メニューにある「認証情報」をクリックします。
「認証情報を追加」ボタンをクリックし、「OAuth 2.0 クライアントID」をクリックします。

表示された選択肢から「ウェブアプリケーション」をクリックし、次の情報を入力します。

* 名前: アプリケーション名を入力します。管理しやすい名前であれば、どんな名前でもいいです。
* 承認済みのリダイレクト URI: `http://$domain:$port/auth/google_oauth2/callback`

`$domain` と `$port` の部分は、設定するサイトに応じて適時読み替えてください。

「作成」ボタンをクリックすると、クライアントIDとクライアントシークレットを取得することができます。
クライアントIDとクライアントシークレットをメモしておき、シラサギに設定します。

### GitHub

ブラウザで [GitHub](https://github.com/) にログイン後、
Settings -> Applications -> Developer applications と辿ると、アプリケーション管理画面が表示されます。
Organization Repository の場合、Organization Repository を表示後、Settings -> Applications と辿ると、アプリケーション管理画面が表示されます。

"Register new Application" ボタンをクリックし、次の情報を入力します。

* Application name: アプリケーション名を入力します。管理しやすい名前であれば、どんな名前でもいいです。
* Homepage URL: サイトの URL `http://$domain:$port/` を入力します。
* Application description: アプリケーションの説明を入力します。簡潔に説明を入力します。
* Authorization callback URL: `http://$domain:$port/auth/github/callback` を入力します。

`$domain` と `$port` の部分は、設定するサイトに応じて適時読み替えてください。

"Register application" ボタンをクリックしすると、アプリケーションが作成され、
クライアントIDとクライアントシークレットを取得することができます。
クライアントIDとクライアントシークレットをメモしておき、シラサギに設定します。

アプリケーション作成後、アイコンを設定することをお勧めします。

### 制限

現在、Twitter, Facebook, Yahoo! Japan, Google, GitHub の 5 つのプロバイダーに対応しています。
これら以外のプロバイダーには未対応です。
