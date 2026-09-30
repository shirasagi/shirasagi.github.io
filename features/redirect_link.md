---
layout: default
title: リンクページ機能
---

バージョン1.14.0にて、リンクページ機能を追加しました。

ページにリダイレクトURLを入力しておき、公開画面からアクセスした際に、リダイレクトさせることができます。

既定では無効になっており、有効にするには `config/cms.yml` を変更します。

## リンクページ機能の有効化

`config/cms.yml`（存在しない場合は `config/defaults/cms.yml` をコピー）を編集

~~~
  disable_redirect_link: false
~~~

## Application サーバーの再起動

設定を反映させるため、運用環境に合わせて Puma または Unicorn を再起動します。

- Puma の場合

~~~
# systemctl restart puma
~~~

- Unicorn の場合

~~~
# systemctl restart unicorn
~~~

開発環境では次のコマンドを実行:

~~~
# bundle exec rake unicorn:restart
~~~

アプリケーションサーバを再起動し、管理画面よりページを編集するとリンクページアドオンが表示され、リダイレクトURLを入力することができます。

## 外部サイトへのリダイレクト

外部サイトへのリダイレクトURLの入力は既定では無効になっています。

許可する場合は [信頼できる URL の設定](/settings/trusted_url.html) を確認してください。
