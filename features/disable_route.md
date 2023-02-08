---
layout: default
title: 特定フォルダー・パーツの無効化
---

フォルダー作成時、あるいはパーツ作成時、大量の部品の中から適切な部品を選択する必要があります。無関係な部品を非表示とすることで選択しやすくし、操作ミスが起きる可能性を減らすことができます。

ここでは、このような目的で特定のフォルダーやパーツを無効化する設定を説明します。

## 無効化したい部品の route の見つけ方

フォルダー作成時にフォルダー属性を変更するとモーダルダイアログが表示されます。
モーダルダイアログにさまざまな部品が並んでおり、部品ひとつ一つがリンクとして表示されています。この部品のリンクにマウスカーソルを当て、しばらくそのままにしておくと部品のリンク先が表示されます。部品のリンク先には必ず `route=cms/node` のような route パラメーターがついています。

まずは、部品のリンク先を確認し、無効化したい部品の route パラメーターを調査します。

パーツも同様で、パーツ作成時にパーツ属性を変更するとモーダルダイアログが表示され、モーダルダイアログ内の部品のリンク先から route パラメーターを調査します。

## 設定

### フォルダーの無効化

標準機能の写真一覧（route は cms/photo_album）を無効化したい場合は config/cms.yml に `node/photo_album.disable = true` を設定します。

試しに標準機能の写真一覧（route は cms/photo_album）と、同じく標準機能のLINE HUB（route は cms/line_hub）とを無効化したいとしますと、config/cms.yml（存在しない場合はconfig/default/cms.ymlをコピー）をテキストエディタで開き、以下の設定を追加します。

~~~
production: &production

  ...

  node:
    photo_album:
      disable: true
    line_hub:
      disable: true
~~~

CKANの新着（route は ckan/page）を無効化したい場合は、config/ckan.yml（存在しない場合は新規作成）をテキストエディタで開き、以下の設定を追加します。

~~~
production: &production
  node:
    page:
      disable: true

test:
  <<: *production

development:
  <<: *production
~~~

設定完了後 Unicorn を再起動すると、目的の部品がモーダルダイアログから消えていることが確認できます。

### パーツの無効化

パーツの無効化の方法はフォルダーの無効化とほぼ同じで、設定が `node` から `part` になる点が異なるだけです。

CKANの件数（route は ckan/status）を無効化したい場合は、config/ckan.yml（存在しない場合は新規作成）をテキストエディタで開き、以下の設定を追加します。

~~~
production: &production
  part:
    status:
      disable: true

test:
  <<: *production

development:
  <<: *production
~~~

注意点としてパーツに関しては既定で cms/node と category/node が無効化されています。これらは cms/node2 へ統合されたために既定で無効化されており、上書きして消してしまわないように注意してください。
