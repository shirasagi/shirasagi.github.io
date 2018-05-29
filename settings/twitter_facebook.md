---
layout: default
title: Twitter, Facebook投稿連携
---

バージョン1.5.0より記事の公開に連動して Twitter、Facebook へ公開した記事のお知らせを投稿できるようになりました。
また、記事の非公開と連動して Twitter, Facebook に掲載したお知らせを削除することもできるようになります。

Twitter, Facebook投稿連携を有効にするための設定方法を説明します。

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


## Facebook 投稿連携

> 現在、Facebook側のポリシー変更により、Facebook投稿連携機能をご利用いただけない状況となっています。
>
> Facebook自動投稿連携にはFacebookアプリの manage_pages（ページの管理者として投稿が可能となる権限） と publish_pages（Facebook ユーザとして投稿が可能となる権限） の2つの権限が必要です。
> 8月2日以降、既定で割り当てられていた manage_pages と publish_pages も失効する可能性があり、既にFacebook投稿連携をご利用中の方についても、利用できなくなる可能性があります。
> シラサギとしましては、当面、この機能を廃止する判断となりました。
>
> 以下の資料は古いバージョン向けの資料であり、現在、以下の手順でFacebook投稿連携機能を設定することはできません。

本機能は Facebook ページと呼ばれる、Facebook 自治体公式ページや Facebook 企業公式ページと連携することを意図して開発しております。
個人の Facebook ボードとは連携できませんので、事前に Facebook ページを作成してください。

1. [Facebook](https://facebook.com/) へログインします。Facebook ページを管理できるアカウントでログインします。
2. [Facebook for Developers](https://developers.facebook.com/) へアクセスします。Facebook Developer 登録がまだの方は、Facebook Developer に登録してください。
3. 新しいアプリを追加します。追加したアプリの「アプリID」と「app secret」をメモしておきます。無期限のアクセストークンを取得する際に使用します。
4. [グラフAPIエクスプローラー](https://developers.facebook.com/tools/explorer/)にアクセスします。
    1. 右側の一番上のドロップダウンを開き、3 で作成したアプリを選択します。
    2. 右側の上から2番目のドロップダウンを開き、「ページアクセストークンを取得」を選択し、表示される確認画面で「OK」をクリックします。
    3. 同じく右側の上から2番目のドロップダウンを開き、シラサギと連携する Facebook ページを選択します。
    4. 同じく右側の上から2番目のドロップダウンを開き、「publish_pagesをリクエスト」を選択し、表示される確認画面で「OK」をクリックします。
    5. 表示されているアクセストークンをメモします。
5. 取得したアクセストークンは数日で有効期限が切れます。無期限のアクセストークンに変換するため次のURLにアクセスします。<br/>
    `https://graph.facebook.com/oauth/access_token?client_id=APP_ID&client_secret=APP_SECRET&grant_type=fb_exchange_token&fb_exchange_token=ACCESS_TOKEN`
    1. APP_ID に 3 でメモした「アプリID」を設定
    2. APP_SECRETに 3 でメモした「app secret」を設定
    3. ACCESS_TOKEN に 4-5 でメモしたアクセストークンを設定
6. 表示されたアクセストークンコピーし、[グラフAPIエクスプローラー](https://developers.facebook.com/tools/explorer/)の「アクセストークン」欄に貼り付けます。
7. アクセストークンの下のテキストフィールドに "me?fields=access_token" と入力し、「送信」をクリックします。
8. 表示されたアクセストークンをシラサギのサイト設定のFacebook設定のアクセストークンに設定します。

以上で設定は完了です。

記事を作成する際、SNS自動投稿設定の「Facebook自動投稿」を「有効」にしてください。
記事の公開と連動して Facebook にお知らせが掲載されます。

また、記事を作成する際、SNS自動投稿設定の「非公開時に投稿を削除」を「有効」にすると、
記事の非公開と連動して Facebook からお知らせが削除されます。
