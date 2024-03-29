---
layout: default
title: セッションタイムアウト
---

シラサギのセッションタイムアウトには、ハードリミットとソフトリミットとが設定されています。
ハードリミットとは、データベースに設定された制限で、ソフトリミットとは、シラサギに設定された制限です。

## ソフトリミット

ソフトリミットの既定値は 30 分で、30 分間何も操作しなければ自動でログアウトします。
ここでは、設定方法を解説します。

### 変更方法

ソフトリミットは設定ファイル `sns.yml` に設定されています。
`sns.yml` を変更する前に次のコマンドでコピーしましょう。

~~~
$ cp -n config/defaults/sns.yml config/sns.yml
~~~

`sns.yml` に次のような設定があります。

~~~
production:
  session_lifetime: 1800
~~~

この設定は、セッションのタイムアウトを秒数で設定しています。
既定は 1800 秒 = 30 分となっています。

## ハードリミット

ハードリミットは、データベースに設定された制限で、既定値は 60 分です。
ソフトリミットの設定値にかかわらず、既定では最大 60 分間何も操作しなければ自動でログアウトします。

### 変更方法

ハードリミットを 120 分（= 7200 秒）に変更したい場合、シラサギディレクトリで次のコマンドを実行します。

~~~
bundle exec rake ss:session_lifetime:hard limit=7200
~~~

> 上記のコマンドは v1.11 以降で使用することができます。v1.10 以前をご利用の方は `mongo` コマンドを用いて直接データベースを修正してください。以下に `mongo` コマンドを用いて 120 分（= 7200 秒）に変更にする実行例を示します。
> 
> ~~~
> use シラサギが利用しているデータベース;
> // 認証が必要な場合、次のコマンドを実行
> // db.auth("ユーザーID", "パスワード");
> db.sessions.dropIndex("updated_at_1");
> db.sessions.createIndex({ updated_at: 1 }, { expireAfterSeconds: 7200 });
> ~~~
> 
> 「シラサギが利用しているデータベース」は、標準は ss ですので、一行目のコマンドは use ss; となります。

## 制限

ソフトリミットは、ハードリミットの範囲内で変更させることができます。
ハードリミットの既定値は 60 分ですので、既定ではソフトリミットは最大 3600 秒までの範囲で設定することが出来ます。
