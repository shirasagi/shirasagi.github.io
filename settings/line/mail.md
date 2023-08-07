---
layout: default
title: LINE メール取込
---

バージョン1.18.0より、受信したメールをLINEメッセージとして保存/配信する機能を追加しました。

## 設定

### LINE

[LINE メッセージ配信の設定](/settings/line/messaging.html#設定)を行ってください。

### メール取込

管理画面の LINE>メール連携 にて、メール取込用の設定を作成できます。<br />
ファイル名と配信条件、その他の設定を適切に入力して作成してください。<br />
送信者メールアドレス、宛先メールアドレスは[メール取込](/settings/mail_page.html#メール取込設定)を参照してください。


設定を作成後、メールを公開画面にPOSTすることで、LINEメッセージを保存できます。

~~~
# data=$( cat mail.eml )
# curl -H 'X-SS-API-Key: XXXX' -X POST -d "data=$data" http://$domain:$port/$node/mail/$filename
~~~

POST先はLINE HUBフォルダーの公開側URLになります。
- `$domain` と `$port` の部分は、設定するサイトに応じて適時読み替えてください。
- `$node` をLINE HUBフォルダーのフォルダー名に読み替えてください。
- `$filename` をメール連携設定のファイル名に読み替えてください。

ヘッダー `X-SS-API-Key` に連携用APIトークンを設定する必要があります。<br />
APIトークンについては[メール取込](/settings/mail_page.html#apiトークン)を参照してください。
