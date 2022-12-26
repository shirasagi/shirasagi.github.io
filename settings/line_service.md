---
layout: default
title: LINE イベントフック（サービス）
---

バージョン1.16.0より LINEメッセージ の配信機能を追加しました。<br>
関連して、トーク画面のイベントを受信し、応答する機能も追加しました。

LINEメニューのサービスより、以下のイベントフックを作成できます。

1. 施設検索... 地図設定のある記事を応答できます。
2. チャットボット...シラサギのチャットボットを応答できます。
3. イメージマップ... [イメージマップメッセージ](https://developers.line.biz/ja/docs/messaging-api/message-types/#imagemap-messages)を応答できます。
4. JSONテンプレート... 任意のJSONテンプレートを応答できます。

## 設定

先に[LINE メッセージ配信の設定](/settings/line_messaging.html#設定)を行ってください。

### Webhook

1. 「標準機能/LINE HUB」フォルダーを作成してください。
2. Messaging APIの、Webhook URL に `(LINE HUBフォルダーの URL)/line` を設定します。
3. LINEメニューのサービスを登録します。

正しく登録すると、トーク画面のメッセージやポストバックに反応して、メッセージを応答することができます。
