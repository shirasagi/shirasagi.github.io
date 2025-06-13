---
layout: default
title: devcontainer
---

SHIRASAGI v1.20 以降では devcontainer を用いて開発環境を簡単に構築できるようになりました。
ここでは利用手順などを解説します。

> devcontainer とは development container の略で、docker などの container を用いて簡単に開発環境を構築することができます。
> [devcontainer の公式サイトを表示するにはここをクリック](https://containers.dev/)

## 前提条件

- 事前に docker をインストールしておく必要があります。
  - docker 以外のコンテナ技術を利用することもできるかと思いますが、ここでは docker を前提に解説しますし、SHIRASAGI チームは docker での動作のみを確認しています。
- devcontainer を起動するために vscode を利用します。事前に vscode と、devcontainer を利用するのに必要な vscode プラグインをインストールしておく必要があります。
  - お勧めの vscode プラグインです。
    - Dev Containers
    - Remote - SSH
    - Remote Explorer
    - Docker
    - (Windows の場合) WSL
- 開発環境の提供が目的です。小規模な評価目的にも本手順を利用できると思いますが、本番環境の構築に本手順を利用することはできません。
- 確認に利用した vscode には日本語パックを適用していません。このため、本手順では vscode の機能名やメッセージを英語で表記します。日本語パックをインストールしている方は適時読み替えてください。

## devcontainer の利用準備

### SHIRASAGI の取得

SHIRASAGI を GitHub から取得します。

~~~
$ cd ~/projects
$ git clone "https://github.com/shirasagi/shirasagi.git"
~~~

### vscode で SHIRASAGI を開く

vscode でダウンロードした SHIRASAGI (`~/projects/shirasagi/`) を開きます。

> 本手順では SHIRASAGI を `~/projects/shirasagi/` にダウンロードしましたが、ダウンロードのディレクトリはどこでも構いません。ご利用のパソコンに応じて、好きなディレクトリにダウンロードしてください。

vscode でダウンロードした SHIRASAGI を開くと、以下のようなポップアップが表示されるかと思います。

~~~
Folder contains a Dev Container configuration file. Reopen folder to develop in a container.
~~~

一旦、このポップアップを閉じます。

> このポップアップが表示されない場合は、devcontainer の利用に必要な vscode プラグインがインストールされていない可能性があります。
> vscode でインストール済みのプラグインを確認してください。

### devcontainer の利用時のオプション設定

devcontainer は利用開始時にポート番号を設定し、シードをインストールします。
`.env` ファイルで、ポート番号やインストールするシードを選択することができます。

そこで、devcontainer の利用を開始する前に `.env` ファイルを作成します。
`.env` ファイルのテンプレートが `.devcontainer/dot.env.templ` ファイルにありますので、このファイルを `.env` ファイルへコピーします。

> 何らかの理由ですでに `.env` ファイルが存在する場合、`.env` ファイルを vscode で開き、末尾に `.devcontainer/dot.env.templ` ファイルの中身を追加してください。

`.env` ファイルでは、以下のオプションを設定することができます。適時 `.env` ファイルを修正・変更し、利用したいオプションを設定してください。


| 環境変数 | 説明 | 既定値 |
|---------|------|-------|
| PORT    | ポート番号を設定します。 | 3000 |
| SETUP_DEMO_SITE | 「自治体サンプル」シードをインストールします | 1 （インストールする） |
| SETUP_OPENDATA_SITE | 「オープンデータサンプル」シードをインストールします | subdir （自治体サンプルのサブサイトとしてインストールする） |
| SETUP_COMPANY_SITE | 「企業サンプル」シードをインストールします | 0 （インストールしない） |
| SETUP_CHILDCARE_SITE | 「子育て支援サンプル」シードをインストールします | 0 （インストールしない） |
| SETUP_LP_SITE | 「LPサンプル」シードをインストールします | 0 （インストールしない） |
| SETUP_GWS | 「グループウェア」シードをインストールします | 0 （インストールしない） |
| SETUP_WEBMAIL | 「ウェブメール」シードをインストールします | 0 （インストールしない） |

## devcontainer の利用開始

以下の手順で devcontainer の利用を開始します。

1. vscode 上で F1 キーを押し、コマンドパレットをポップアップさせます。
2. コマンドパレットで "reopen in container" と入力すると "Dev Containers: Reopen in Container" が候補に表示されるので、"Dev Containers: Reopen in Container" をクリックします。
3. "Dev Containers: Reopen in Container" をクリックすると devcontainer の利用開始処理が実行されます。

devcontainer の利用開始処理は、初回の場合 10 分ぐらいかかります（利用しているパソコンやインストールするシードによって時間は大きく変わります）。2 回目からは一瞬で完了します。
利用開始処理を実行中の間、コーヒーでも飲みながらゆっくりしていてください。

利用開始処理の実行中は vscode のステータスバーに "Configuring Dev Container (show log)" と表示され、その左側に実行中を示すアイコンがグルグルと回っています。

利用開始処理が完了すると、Terminal に "Done. Press any key to close the terminal" と表示され、ステータスバーに表示されていた "Configuring Dev Container (show log)" や実行中を示すアイコンが消えます。

Terminal をアクティブにし、エンターキーを押し、一旦 Terminal を閉じた後、別の Terminal を開きます。
表示されたターミナルで `bin/rails s` コマンドを実行すると、SHIRASAGI が起動します。
SHIRASAGI が起動後、<http://localhost:3000/.mypage> (`.env` ファイルでポート番号を設定している場合はそのポートを指定) にブラウザでアクセスすると、シラサギのログイン画面が表示されます。
ログインできるユーザーは[シラサギデモサイト](https://www.ss-proj.org/download/demo.html) と同じユーザーでログインすることができます。

## 補足・制限

SHIRASAGI では Elasticsearch を用いた全文検索が可能ですが、現在の SHIRASAGI devcontainer はサポートしていません。
devcontainer の利用開始の完了後に手動で Elasticsearch を構成する必要があります。手動での Elasticsearch 構成手順については、すみませんが割愛させていただきます。

ほか、SHIRASAGI には michecker を用いたアクセシビリティチェック、LDAP サーバを用いた ID 管理なども可能ですが、
現在の SHIRASAGI devcontainer はサポートしていませんし、すみませんが構成手順については割愛させていただきます。
