---
layout: default
title: JavaScript構成
---

シラサギで `JavaScript` を利用する場合、以下の方法があります。

1. `app/javascript` 配下に `JavaScript` を ES6 で書く
2. `app/assets/javascripts` 配下に `JavaScript` を ES5 で書く
3. `view` に `JavaScript` を書く（非推奨）

外部ライブラリを利用する場合、以下の方法があります。

1. `package.json` にライブラリを追加する（推奨）
  - `package.json` にライブラリを追加するには `yarn add` コマンド を用います。Git には `package.json` と `yarn.lock` とをコミットします。
  - `yarn add` で追加したライブラリは `app/javascript` 配下の ES6 でも `app/assets/javascripts` 配下の ES5 ででも利用できます。
  - ただし、`app/assets/javascripts` 配下の ES5 で直接利用するには、追加したライブラリ自体が ES5 に対応している必要があります。ES6 専用のライブラリを追加した場合は `app/assets/javascripts` 配下の ES5 で直接利用することはできませんので、`app/javascript` 配下の ES6 でラッパーを自作するなどして対応してください。
2. `Gem` を利用する（非推奨。ただし、JS と同時に提供されているヘルパーメソッドなどの替えがない場合にのみ推奨）
3. `vendor/assets/packages` 配下にライブラリを配置する（非推奨で過去との互換性のために残されています）
4. `vendor/assets/javascripts` 配下にライブラリを配置する（非推奨で過去との互換性のために残されています）
5. `public/assets/js` 配下にライブラリを配置する（非推奨で過去との互換性のために残されています）

> `vendor/assets/packages`, `vendor/assets/javascripts`, `public/assets/js` 配下に置いたライブラリは、[GitHub Dependabot](https://docs.github.com/ja/code-security/dependabot/dependabot-security-updates/about-dependabot-security-updates)によるセキュリティチェックが機能しません。
> 

## 1. app/javascript 配下に JavaScript を ES6 で書く

シラサギは [Stimulus](https://stimulus.hotwired.dev/)や[Turbo](https://turbo.hotwired.dev/)を活用していこうとしています。

Stimulusのコードを記述する場合は `app/javascript/controllers` 配下に記述していきます。
それ以外は `app/javascript` 配下にモジュールのディレクトリを作成し、モジュールごとに記述していきます。
何か特別な初期化が必要なライブラリを利用する場合は `app/javascript/initializers` 配下に初期化コードを記述します（Rails の config/initializers のような機能）。

注意点:

- シラサギには非推奨というわけではないですが、Bootstrap, React や Vue などのメジャーなフレームワークは組み込まれていません。
- 現状、管理画面でのみ利用されており、公開画面では利用されていません。公開画面で利用する JavaScript は `app/assets/javascripts` 配下に ES5 で書きます。

### 基点と webpack

起点として `app/javascript/application.js` のみが定義されており、webpack により `public/assets/application.js` へとトランスパイルされます。
`app/javascript/application.scss` に SCSS を記述すれば、`public/assets/application.css` へとトランスパイルされます。

webpack の設定は `webpack.config.js` に記述します。

### ビルド

本番環境では `bin/deploy` コマンドを実行します。コマンドを実行すると `public/assets` 配下に最終成果物が作成されます。

開発時は `yarn build` コマンドを実行します。コマンドを実行すると `assets/builds` 配下に中間生成物が作成されます。これは Rails の assets pipeline の仕組みより、開発時の view に読み込まれます。

なお、開発時は `npx webpack-cli watch` コマンドを実行しておき、JavaScript に変更が発生すると即座にビルド処理が開始されるようにしておくと便利です。
JavaScript に変更が発生すると即座に `assets/builds` 配下の中間生成物が更新されるので、ブラウザをリロードするだけで JavaScript が再読み込みされます。

## 2. app/assets/javascripts 配下に JavaScript を ES5 で書く

記述量が多い場合やライブラリとして使い回す箇所は view に直接書かず、`app/assets/javascripts` 配下にて管理します。
`lib/` に含まれるファイル以外は `assets precompile` の対象になります。

ES5で記述します。

[ディレクトリ構成](/devel/directories.html)も参照ください。

#### モジュール

`app/assets/javascripts` 配下に、モジュール単位で分割し配置します。

例）

~~~
app/assets/javascripts/ads/lib/banner.js (広告バナーパーツのランダム表示)
~~~

現状、スクリプトは管理側と公開側で厳密に分けられていません。

#### 管理側 JavaScript (基点)

- `app/assets/javascripts/ss/script.js`

#### 公開側 JavaScript (基点)

- `app/assets/javascripts/cms/public.js.erb`

## 3.view に JavaScript を書く

記述量が少ない場合は view に直接書くことができます。

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


## 付録. シラサギでよく利用するサードパーティライブラリ

- jQuery
  - シラサギでは現役で ES6 でも利用します。$.exntend めっちゃ便利。
- i18next
  - シラサギでは config/locales/ 配下に定義したロケールを JavaScript でも利用できるようにしています。
- moment
  - 日付をパースしたり、書式化したりするのに便利です。
- ejs
  - JavaScript 内で簡単なHTMLテンプレートを利用したい場合に便利です。
- Material Icons
  - [Google の公式資料](https://fonts.google.com/icons)通りに利用することができます。ちょっとしたアイコン画像をつけたい場合に便利です。
  - 注意点として Material Symbols は利用できません。Material Icons の方が利用できる点に注意が必要です。
