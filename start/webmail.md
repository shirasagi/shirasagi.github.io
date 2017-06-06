---
layout: default
title: ウェブメールの始め方
---

## インストール手順

ウェブメール機能はシラサギリポジトリに含まれているため、別途インストールの必要はありません。<br />
メールの送受信には別途、SMTPサーバ、IMAPサーバが必要になります。<br />
SMTPサーバの設定は[メール送信](/settings/mail.html)を参照してください。

## 初期設定

IMAPサーバへのログイン情報はユーザーごとに設定することができます。<br />
ホスト名などを初期設定として共通利用したい場合は、設定ファイルを編集してください。<br />

## 設定ファイル

ご利用のIMAPサーバに応じて設定ファイルを編集してください。<br />

~~~
$ cp -n config/defaults/webmail.yml config
$ vi config/webmail.yml
~~~

~~~
production: &production
  # ウェブメールへのリンクを非表示にします。
  disable: false

  # メールボックス容量表示を無効にします。(GETQUOTAROOTコマンド)
  disable_quota: false

  # Default settings
  clients:
    default:
      # 接続先
      host: localhost
      options:
        port: 143

      # 認証方式: LOGIN, PLAIN, CRAM-MD5, DIGEST-MD5
      auth_type: LOGIN

      # 認証時のユーザ名文字列に使用する値です。
      #   uid: ユーザーID(uid)を使用します。
      #   email: メールアドレスを使用します。
      account: email

  # メールの一覧情報をDBにキャッシュします。
  cache_mails: true

  # メールボックス容量をDBにキャッシュします。
  cache_quota: true

  # 容量キャッシュの期限を設定します。(時間)
  cache_quota_expires: 24
~~~

## IMAPログイン方法

ユーザーごとにログイン情報を設定していない場合、以下の情報でIMAPログインを試みます。<br />
ログインに失敗すると、接続情報の登録フォームへ遷移します。<br />

|host|設定ファイル clients.default.host|
|port|設定ファイル clients.default.options.port|
|auth_type|設定ファイル clients.default.auth_type|
|user|設定ファイル clients.default.account を元にした値|
|password|シラサギログイン時に使用したパスワード|
