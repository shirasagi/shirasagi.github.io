---
layout: default
title: 接続元IPアドレス
---

シラサギでは操作履歴を記録する際、接続元IPアドレスを保存します。また、接続元IPアドレスからアクセスを制限したり、ワンタイムパスワードを要求したりする機能があります。

この際の接続元IPアドレスは、X_REAL_IP ヘッダーから取得し、X_REAL_IP ヘッダーが定義されていない場合 REMOTE_ADDR から取得します。

> ネットワークの構成によっては X_FORWARDED_FOR の最初のIPアドレスが、接続元IPアドレスを示していない可能性もあるので、シラサギでは接続元IPアドレスを取得する際にX_FORWARDED_FORは検査しません。

シラサギが認識している接続元IPアドレスは、[マイページの接続情報（/.u/connection）](https://demo.ss-proj.org/.u/connection)にアクセスすることで確認することができます。

シラサギが接続元IPアドレスを正しく認識しない場合、[Nginx のインストール](/installation/nginx.html)や[Apache のインストー](/installation/apache.html)などを参照し、X_REAL_IPを適切に設定するようにしてください。
