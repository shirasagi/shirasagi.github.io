---
layout: default
title: システム設定（config）
---

## <a name="description"></a> システム設定(config)

シラサギではシステム設定の既定値を `config/defaults/` 以下に配置し、
デプロイ毎に異なるシステム設定は `config/defaults/` 以下の当該ファイルを `config/` にコピーし、
設定値を変更する運用ポリシーとなっています。

    例: sendmail ではなく smtp を使用する場合 

    config/defaults/mail.yml を config/ にコピーし、delivery_method を smtp に変更します。

## <a name="how-to-get"></a> プログラムでのシステム設定の取得

プログラム内部からは、`SS.config.モジュール名.設定キー` で取得することができます。

例: `mail.yml` の `delivery_method` を取得する場合

    SS.config.mail.delivery_method

深い階層にある設定を取得する場合、2 階層目以降は Hash のアクセスと同じ `[]` を用いてアクセスします。

例:

    SS.config.cms.check_links["html_request_timeout"]
    SS.config.cms.ckeditor["options"]["allowedContent"]

## <a name="how-to-create-new-config"></a> 新しいシステム設定の追加

既定値を納めたファイルを `config/defaults/` 以下に作成します。

例: 次のような内容を持つ `config/defaults/blog.yml` を作成したとします。 

    # blog
    production: &production
      avatar: show
      email: hide

    test:
      <<: *production

    development:
      <<: *production

プログラムからは次のようにして取得することができます。

    SS.config.blog.avatar
    SS.config.blog.email

## <a name="how-to-overwrite-config"></a> サイト設定やフォルダー設定による上書き

追加したシステム設定は、サイト設定やフォルダー設定で上書きできるように留意しましょう。
