---
layout: default
title: LINE メッセージ配信機能
---

バージョン1.16.0より LINEメッセージ の配信機能を追加しました。

CMSにログインし、左ナビのLINEよりメッセージの作成と配信ができます。<br>
シラサギ独自のカテゴリーによるセグメント配信ができます。

以下の仕様になっています。

- 運用するサイトに、LINE公式アカウントを用意する。
- 利用者が LINE OAuth 2.0 により 運用するサイト にメンバーログインする。
- 利用者がメンバーログイン後、購読したい配信カテゴリーを設定する。
- 運用者が配信カテゴリーにプッシュ配信する。（[multicast](https://developers.line.biz/ja/reference/messaging-api/#send-multicast-message))

セグメント配信の仕組みとしては以下です。
- OAuth 認証によるログインにより、利用者のLINEユーザーID (OAuthID)が得られる。
- このIDを multicast に指定しプッシュ配信する。

## 設定

設定方法を説明します。<br>
利用にはシラサギの設定及び LINE Messaging Api、LINE Login チャネルが必要です。

### 制限

LINEによるメンバーログイン、画像ファイルの投稿を行う場合、シラサギにSSLが設定された状態で公開されている必要があります。
また LINEのアクセスを拒否してしまう為、BASIC認証も解除する必要があります。

### LINE Messaging Api

1. [LINE公式アカウントを開設します。](https://www.linebiz.com/jp/signup/)
2. [LINE Developer コンソール](https://developers.line.biz/console/) へアクセスし Messaging API チャネルを作成します。
3. 作成したチャネルの基本設定より、チャネルシークレットを取得します。
4. Messaging API設定より、チャネルアクセストークンを取得します。
5. 取得したトークンを、シラサギのサイト設定に設定します。対応は次のとおりです。

   | LINE Channel Tokens | シラサギのサイト設定のLINE設定 |
   |--------------------------------|-----------------------------------|
   | チャネル基本設定 ＞ チャネルシークレット | チャンネルシークレット |
   | Messaging API設定 ＞ チャネルアクセストークン（長期）| チャンネルアクセストークン |

### LINE Login Api

「メンバー/ログイン」フォルダーを作成して [OAuth 認証](/settings/oauth.html) のLINEを設定します。<br>
LINEでメンバーログインできるようにします。

### マイページ設定

1. マイページのフォルダー構成を作成します。
2. ログインフォルダーのリダイレクトURLにマイページのURL（以下の構成だと`/mypage/`）を設定します。
3. シラサギのLINEメニューより配信カテゴリーを登録します。

   | フォルダー名 | 階層 | フォルダー属性 |
   |-----------|------|------------|
   | mypage | 1 | メンバー/マイページ |
   | mypage/line-profile | 2 | メンバー/LINEプロフィール |

   マイページのフォルダー構成例

正しく設定すると、ここまでで、シラサギのメンバーログイン後、LINEメンバーが自動で作成されます。<br>
メンバーはマイページにて、購読する配信カテゴリーを設定できるので、対象者を絞ってメッセージ配信できるようになります。

## 配信予約

メッセージの配信予約を利用する場合は [定期実行](/settings/cron.html#cmsのlineメッセージ配信予約を利用する場合) を設定してください。
