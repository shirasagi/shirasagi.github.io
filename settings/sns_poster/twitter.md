---
layout: default
title: Twitter 投稿連携
---

バージョン1.5.0より記事の公開に連動して Twitter へ公開した記事のお知らせを投稿できるようになりました。
また、記事の非公開と連動して Twitter に掲載したお知らせを削除することもできるようになります。

Twitter 投稿連携を有効にするための設定方法を説明します。

## Twitter 投稿連携

1. [Twitter](https://twitter.com/)へログインします。自治体アカウントや企業アカウントなどシラサギと連携したいアカウントでログインします。
2. [Twitter Application Management](https://apps.twitter.com/) へアクセスし、既存のアプリケーションを選択するか、新しいアプリケーションを作成します。
3. 作成したアプリケーションの "Keys and Access Tokens" タブを開き、"Create my access token" ボタンをクリックし、アクセストークンを作成します。
4. 画面に表示されている情報をシラサギのサイト設定に設定します。対応は次のとおりです。

   | Twitter Keys and Access Tokens | シラサギのサイト設定のTwitter設定 |
   |--------------------------------|-----------------------------------|
   | Consumer Key (API Key)         | コンシューマーキー                |
   | Consumer Secret (API Secret)   | コンシューマーシークレット        |
   | Access Token                   | アクセストークン                  |
   | Access Token Secret            | トークンシークレット              |

5. シラサギのサイト設定のTwitter設定の「カード形式」を「サマリー形式」か「大きな画像形式」に変更し、「ユーザー名」を設定します。

以上で設定は完了です。

記事を作成する際、SNS自動投稿設定の「Twitter自動投稿」を「有効」にしてください。
記事の公開と連動して Twitter にお知らせが掲載されます。

また、記事を作成する際、SNS自動投稿設定の「非公開時に投稿を削除」を「有効」にすると、
記事の非公開と連動して Twitter からお知らせが削除されます。
