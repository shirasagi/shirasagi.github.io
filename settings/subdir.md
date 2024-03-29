---
layout: default
title: サブディレクトリ設定
---

バージョン1.5.0より公開側のサイトURLをサブディレクトリとして運用する設定を追加しました。

サブディレクトリ用の設定項目として以下があります。

* サブディレクトリ
* 親サイト

管理画面にログインし

~~~
システム設定 ＞ サイト ＞ サイトを選択 ＞ 編集する
~~~

より設定可能です。

### サブディレクトリ

サイトのサブディレクトリパスを設定します。<br />
ドメインと合わせたパスが公開側サイトURLとなります。

例）

ドメイン     | demo.ss-proj.org
サブディレクトリ | subdir
公開側URL （トップ） | http://demo.ss-proj.org/subdir/
管理画面URL | http://demo.ss-proj.org/.mypage

### 親サイト

サイトを他サイトのサブサイトとしたい場合に、親サイトを設定します。<br />
シラサギの各サイトのドキュメントルートはホスト名から生成されますが、<br />
親サイトを設定することで、ドキュメントルートを共通化することができます。

例）※親サイト設定なし

設定       | サイトA | サイトB
-----------|--------|-----
ホスト名 | www | demo
サブディレクトリ | なし | subdir
親サイト | なし | なし
ドキュメントルート | public/sites/w/w/w/_ | public/sites/d/e/m/o/_


例）※サイトAをサイトBの親サイトに設定

設定       | サイトA | サイトB
-----------|--------|-----
ホスト名 | www | demo
サブディレクトリ | なし | subdir
親サイト | なし | サイトA
ドキュメントルート | public/sites/w/w/w/_ | public/sites/w/w/w/\_/subdir

## サブディレクトリサイトの新設

サブディレクトを含めたURLとして自治体サンプルを公開する際の、初期設定例について記載します。<br />
設定項目は環境に合わせて変更ください。

### 0．シラサギインストール

シラサギをインストールします。<br />
Nginxのドキュメントルート設定を調整します。(※後項参照)

### 1．サブサイト用のサイトを追加します。（管理画面より登録してもOK）

~~~
# bundle exec rake ss:create_site data='{ name: "サイト名", host: "www", domains: "localhost:3000" }'
~~~

※ホスト名は既存サイトと重複しないものを設定

### 2．管理ユーザーが無い場合 sysユーザーを登録

~~~
# bundle exec rake ss:create_user data='{ name: "name", uid: "sys", email: "sys@example.jp", password: "pass" }'
~~~

### 3．管理画面にログインし、以下の項目を設定

* サブディレクトリ
* 親サイト

### 4．自治体サンプルを投入

~~~
# bundle exec rake db:seed name=demo site=www
~~~

※引数 site は1で設定したサイトのホスト名

### 5．レイアウト等に記載されているURLを調整

以下の rake task にて単純なパス置換を行うことができます。

~~~
bundle exec rake cms:set_subdir_url site=www
~~~

※引数 site は1で設定したサイトのホスト名

### 6．公開画面を確認

公開画面がサブディレクトリを含めたURLになっていることを確認します。

## すでに展開されているサイトのサブディレクトリ対応

以下の点を手動調整する必要があります。

* 管理画面よりサブディレクトリ、親サイトの設定
* ドキュメントルート下のファイルを手動移動、調整
* Nginxのドキュメントルート設定の調整(※後項参照)
* レイアウト等に記載されているURLの調整

## Nginxのドキュメントルート設定の調整

サイトAをサイトBの親サイトに設定した場合は、サイトAのドキュメントルートの<br />
設定のみで問題ありませんが、親サイトの設定を行わず、サブディレクトリを<br />
個別のサイトとして管理する場合、Nginxのドキュメントルートの調整が必要となります。

上記「例）※親サイト設定なし」の場合の設定例

~~~
# vi /etc/nginx/conf.d/server/shirasagi.conf
~~~

~~~
include conf.d/common/drop.conf;
root /var/www/shirasagi/public/sites/w/w/w/_/;

～ 省略 ～

location ^~ /subdir/ {
    root /var/www/shirasagi/public/sites/d/e/m/o/_/;
    try_files $uri $uri/index.html @app;
}
~~~
