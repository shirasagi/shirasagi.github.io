---
layout: default
title: "DEPRECATION WARNING: Your secret_key_base is ..."
---

シラサギ v1.19.0 へアップデートすると、以下のような警告が表示されるようになります。

> DEPRECATION WARNING: Your `secret_key_base` is configured in `Rails.application.secrets`, which is deprecated in favor of `Rails.application.credentials` and will be removed in Rails 7.2. (called from <main> at /var/www/shirasagi/config/environment.rb:5)

この修正方法を解説します。

## 修正方法

シラサギをインストールしたディレクトリで次のコマンドを実行します。

~~~
bundle exec rails credentials:edit
~~~

コマンドの実行に成功するとテキストエディタが起動して、secret_key_base を編集できるようになります。
このコマンドが失敗しテキストエディタが起動しない場合、次のコマンドを実行してみてください。

~~~
EDITOR=vi bundle exec rails credentials:edit
~~~

テキストエディタとして vi を用い、secret_key_base を編集できる画面が起動します。

起動したテキストエディタで secret_key_base に `config/secrets.yml` と同じものを設定します。

編集が終了すると `config/master.key` と `config/credentials.yml.enc` が作成されます。
`config/master.key` は `config/credentials.yml.enc` を暗号化する際に使用した暗号化キーが保存されています。
無くすとシラサギを正しく動作させられなくなるため、大切に保管するとともに漏洩しないように秘密にしてください。

編集が完了したら、正しく設定できていることを確認するため、以下のコマンドを実行します。

~~~
bundle exec rails runner 'puts Rails.application.credentials.secret_key_base'
~~~

正しく設定できていることが確認できたら、`config/secrets.yml` を削除します。

~~~
rm config/secrets.yml
~~~

以上です。
