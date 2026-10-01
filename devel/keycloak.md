---
layout: default
title: Keycloack を用いた認証基盤 (IdP) の構築
---

Keycloakは、シングルサインオン (SSO) をはじめとしたアクセスの認証・認可制御を実現するために
Red Hat社が開発したJavaベースのオープンソースソフトウェアです。

ここでは、Keycloak のインストール方法および設定方法を解説します。

> シラサギとの OpenID Connect の設定方法は [OpenID Connect 認証の疎通確認](/settings/oidc_keycloak.html) を参照下さい。

## 構築手順

以下のサービスを設定します。

- Idp サーバーとして Keycloak

対象 OS は Almalinux9 です。他の OS をご利用の方は適時読み替えてください。

## Keycloak

### Keycloak のインストール

Keycloakを起動するための前提パッケージをまずはインストールします。

- OpenJDK17以降

上述のとおり、OpenJDKのインストールが必要です。

次のコマンドを実行し OpenJDK 17 をインストールします。

~~~shell
# yum install java-17-openjdk.x86_64
# yum install java-17-openjdk-devel.x86_64
~~~

次に、Keycloak サーバーのコマンドラインに戻り、wget コマンドや curl コマンドで Keycloak をダウンロードします。

~~~shell
# wget https://github.com/keycloak/keycloak/releases/download/26.3.1/keycloak-26.3.1.tar.gz
~~~

- Keycloak のインストール

Keycloakのインストールは、GitHubに公開されているアーカイブファイルをダウンロードし、そのアーカイブファイルを展開することで行えます。

~~~shell
# tar xvfz keycloak-26.3.1.tar.gz
~~~

### Keycloak の起動

Keycloakの起動には、以下２種類のモードを指定できます。

- 本番モード (production mode)
- 開発モード (development mode)

本番モードは、その名前のとおり、実運用で用いるモードです。
今回は開発モードで起動してみましょう。

Keycloakの起動は `bin` ディレクトリ配下の `kc.sh` を使用します。その際にオプションで `start-dev` を指定することにより、開発モードで起動します。

~~~shell
# cd keycloak-26.3.1/
# ./bin/kc.sh start-dev
~~~

### Keycloak 管理コンソールに接続

Keycloak の起動が完了したら、管理コンソールを開いてみましょう。
Keycloak の管理コンソールにはブラウザから接続することになります。
接続するには、IP アドレスの設定が必要となります。例として以下のように設定しています。

Keycloak サーバーの IP アドレス：192.168.3.15

ブラウザのアドレスバーには以下のURLを入力し、接続します。

http://192.168.3.15:8080

Keycloak には、デフォルトで設定された管理者ユーザーが存在しません。そのため、
外部からアクセスするなら、まずは管理者ユーザー／パスワードを設定する必要があります。
ですので、メッセージに従って、管理者ユーザー／パスワードを設定します。
Keycloak を起動したコンソールを開き、一度、Keycloak を停止します。
次に、環境変数にユーザー／パスワードをセットします。

~~~shell
# export KEYCLOAK_ADMIN=admin
# export KEYCLOAK_ADMIN_PASSWORD=admin
~~~

上記では、管理者ユーザー名 (KEYCLOAK_ADMIN)、管理者パスワード (KEYCLOAK_ADMIN_PASSWORD) ともに
「admin」としています。こちらは適宜、値をセットしてください。

再度、Keycloakを起動します。

~~~shell
# ./bin/kc.sh start-dev
~~~

この状態で、Keycloakの管理コンソールにアクセスすれば、ログイン画面が表示されるはずです。

### Keycloak の設定

Keycloakの管理コンソールへログインできる環境を構築しております。

### レルムの作成

Keycloakには、「レルム」という概念があります。
レルム (realm) を直訳すると「領域」や「範囲」といった意味になりますが、Keycloak における「レルム」も同様の概念となります。
Keycloak では、ユーザーが属する領域を複数作ることができます。それはつまり、レルムを用途ごとに使い分けることで、
管理者はアプリケーション(サービス)とユーザーの分離されたグループを作成できるということです。
新しいレルムの作成は以下の通りです。

- 画面左上の三点リーダーをクリックし、メニューを開きます。

- 「Keycloak」と書かれたプルダウンメニューを開き、「Manage realms」＞「Create realm」ボタンを押下します。

- レルム作成画面が開くため、「Realm name」欄に作成するレルム名を入力します。ここでは「myrealm」とします。

- 「作成」ボタンを押下するとレルムの作成は完了です。


### ユーザの作成

作成したばかりのレルムにはユーザーが登録されておりませんので、次にユーザーを作成していきます。

- 画面左上の三点リーダーをクリックし、メニューを開きます。

- 「Manage realms」と書かれたプルダウンメニューを開き、「myrealm」をクリックします。

- メニューから「Users」をクリックします。まだユーザーは存在しない状態となっています。
 「Create new user」ボタンを押下します。

- 作成したユーザーに対して、パスワードを設定します。パスワードの設定は「Credentials」タブから行います。

### アカウントコンソールにログイン

keycloakには、以下の2種類のコンソールが存在します。

- 管理コンソール

- アカウントコンソール

管理コンソールは、管理者向け、アカウントコンソールは、利用者向けとなります。
管理コンソールでは、ユーザーを追加したり、Keycloak によってセキュリティ保護されるアプリケーション(サービス)を登録します。
アカウントコンソールは、ユーザー単位で作成される設定画面のことです。レルム内のすべてのユーザーは、このアカウントコンソールにアクセス可能です。
アカウントコンソールにて、個人情報(プロファイル)を設定したり、パスワードの更新や、多要素認証の設定などを行うことができます。

本サンプルでは以下のURLとなります。

http://192.168.3.15:8080/realms/myrealm/account

上記URLにアクセスするとログイン画面が表示されます。

### RP の登録

以上で、OpenID プロバイダ (OP) としての設定は完了しています。

次に、リライングパーティー (RP) の情報を OpenID プロバイダに登録する手順を行います。
Keycloack では、OpenID Connect の RP や SAMP の SPは、「クライアント」という概念として扱われます。
つまり、クライアントを作成するということは、RP、もしくは SP を登録するということです。

ここでは、シラサギデモサイトをサンプルとして RP の情報を登録します。

まずは管理コンソールにログインします。

ブラウザのアドレスバーには以下のURLを入力し、接続します。

http://192.168.3.15:8080

管理コンソールにログインしたら、まずはレルムを前に作成した「myrealm」に切り替えます。次に、左上三点リーダーからメニューを開き、「Clients」＞「Create client」をクリックします。

- 以下のように入力します。

Client type: OpenID Connect
Client ID: demo

> Client ID はシラサギのOpenId Connect設定に合わせる必要があります。

ここまで入力したら、画面下部までスクロールし、「Next」ボタンを押下します。
「Capabilitiy config」画面に遷移します。以下のように設定します。

Client authentication: ON
Authentication flow: Standard flow, Implicit flow をチェック

画面下部までスクロールし、「Next」ボタンを押下します。
次に、RP の URL 情報を入力します。

Valid redirect URIs: https://demo.ss-proj.org/.mypage/login/oid/oidc/callback

> シラサギ側の設定の Redirect uri の設定に合わせる必要があります。
> https://demo.ss-proj.org/.sys/auth/open_id_connects

ここまで入力したら「Save」ボタンを押下します。
