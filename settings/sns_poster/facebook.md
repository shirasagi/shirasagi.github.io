---
layout: default
title: Facebook投稿連携
---

Facebook側のポリシー変更により、Facebook投稿連携機能をご利用いただけない状況となっています。

以下の資料は古いバージョン向けの資料であり、現在、以下の手順でFacebook投稿連携機能を設定することはできません。

## Facebook 投稿連携

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
