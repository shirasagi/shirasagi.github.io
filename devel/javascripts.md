---
layout: top
title: JavaScript構成
---

シラサギで `JavaScript` を利用する場合、以下の方法があります。

- `view` に `JavaScript` を書く
- `app/assets/javascripts` 配下に `CoffeeScript` を書く
- `Gem` を利用する
- `public/assets/js` 配下にライブラリを配置する

## 1.view に JavaScript を書く

#### jquery ヘルパー

~~~
<%= jquery do %>
  ...
<% end %>
~~~

ブロックの箇所が以下の形式で展開されます。

~~~
$(function() {
  ...
});
~~~

#### coffee ヘルパー

~~~
<%= coffee do %>
  ...
<% end %>
~~~

ブロックの箇所がコンパイルされて展開されます。<br />
コンパイルの速度面を考慮して `deprecated` となっています。<br />
基本的に `jquery` ヘルパー を利用ください。

## 2.アセットファイル (app/assets/javascript)

記述量が多い場合やライブラリとして使い回す箇所は view に直接書かず、<br />
`app/assets/javascripts` 配下にて管理します。<br />
`lib/` に含まれるファイル以外は `assets precompile` の対象になります。<br />
[ディレクトリ構成](http://localhost:3333/devel/directories.html)も参照ください。

#### モジュール

`app/assets/javascripts` 配下に、モジュール単位で分割し配置します。

例）

~~~
app/assets/javascripts/ads/lib/banner.coffee (広告バナーパーツのランダム表示)
~~~

現状、スクリプトは管理側と公開側で厳密に分けられていません。

#### 管理側 JavaScript (基点)

- app/assets/javascripts/ss/script.coffee.erb

#### 公開側 JavaScript (基点)

- app/assets/javascripts/cms/public.coffee.erb

## 3.サードパーティライブラリ （Gemfile）
Gem化されているサードパーティライブラリ利用しています。

-----|-----
gem "jquery-rails" | jQuery
gem 'jquery-ui-rails' | jQuery UI
gem 'jquery-minicolors-rails' | jQuery MiniColors

## 4.サードパーティライブラリ （public/assets/js）

アセットパイプラインに含めたくない、サードパーティライブラリを直接 `public/assets` に配置しています。

-----|-----
public/assets/js/ckeditor | WYSIWYGエディタ
public/assets/js/codemirror | コードエディタ
public/assets/js/jplayer | HTML5 メディアプレイヤー
public/asstes/js/openlayers | オープンソースの地図表示ライブラリ
public/asstes/js/tinymce | WYSIWYGエディタ
public/asstes/js/jquery.colorbox-min.js | モーダルウィンドウ
public/asstes/js/jquery.colorbox.js | モーダルウィンドウ
public/asstes/js/exif-js.js | 画像からExif情報を読み取る
public/asstes/js/sprintf.js | JavaScriptでsprintf関数を使う
public/asstes/js/heightLine.js | ブロックレベル要素の高さを揃える
public/asstes/js/IE9.js | IE8以前のブラウザをIE9の動作に近づける
public/asstes/js/html5.js | IE8以前のブラウザのHTML5対応
public/asstes/js/css3-mediaqueries.js | IE8以前のブラウザでメディアクエリを使う
public/asstes/js/respond.js | IE8以前のブラウザでレスポンシブ対応
public/asstes/js/selectivizr-min.js | IE8以前のブラウザでCSSセレクタの拡張を行う
public/asstes/js/jquery.xdomainajax.js | クロスドメイン用

## 開発時によく使うクラス

- `@SS`
  - 管理画面/公開画面で同じクラス名
  - `SS.render()` で管理画面/公開画面で必要なスクリプトを展開

- `@SS_ListUI`
  - 管理画面の一覧表示部分 `<ul class-"list-items"> ... </ul>`

- `@SS_SearchUI`
  - モーダル選択UIのクラス

- `@SS_TreeUI`
  - テーブルのツリー表示

- `@Map`
  - GoogleMapsでの地図表示

- `@Openlayers_Map`
  - Openlayersでの地図表示
