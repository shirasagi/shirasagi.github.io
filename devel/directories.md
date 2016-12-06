---
layout: default
title: ディレクトリ構成
---

|ディレクトリ|説明|
|---|---|
|[app](#app)|アプリケーション|
|[bin](#bin)|実行ファイル|
|[config](#config)|設定ファイル|
|[db](#db)|データベース関連|
|[lib](#lib)|共有ライブラリ|
|[log](#log)|ログ|
|[private](#private)|非公開コンテンツ|
|[public](#public)|公開コンテンツ|
|[spec](#spec)|テストコード|
|[tmp](#tmp)|一時ファイル|
|[vendor](#vendor)|外部ライブラリ|

## <a name="abcd"></a> app

app/ 以下のファイルは、モジュール別にディレクトリを分けて配置されています。

- assets
  - images
    - シラサギではあまり使用していません。
  - javascripts
    - 主に CoffeeScript (*.coffee) を使用しています。
    - 日本語を出力したい場合には .coffee.erb を使用します。
    - 基点となる ss/script.coffee.erb から他のファイルを読み込んでいます。
    - lib/ に含まれるファイルは assets:precompile の対象外に設定しています。
  - stylesheets
    - 主に SCSS を使用しています。
    - 基点となる ss/style.scss から他のファイルを読み込んでいます。
    - lib/ に含まれるファイルは assets:precompile の対象外に設定しています。
- controllers
  - concern
    - ファイル名には、その役割から _filter のプレフィックスが付与されています。
  - concern/$module/base_filter.rb
    - レイヤーごとのログイン処理などが含まれています。
    - cms/base_filter.rb, sns/base_filter.rb, gws/base_filter.rb
  - concern/$module/crud_filter.rb
    - レイヤーごとにリソースの基本処理が含まれています。
    - cms/crud_filter.rb, sns/crud_filter.rb, gws/crud_filter.rb
  - $module/agents
    - [CMS] 画面生成を行うための機能を、部品の種類ごとにまとめています。
  - $module/apis
    - モーダル表示などの Ajax(xhr) 用のコントローラをまとめています。
- helpers
  - 全読み込みはされないため、使用するヘルパーを個別に宣言する必要があります。
- jobs
  - < ActiveJob >
- mailers
    - < ApplicationMailer >
- models
  - concern/ss/document.rb
    - DBモデルの基礎となる SS::Document モジュールです。
    - 基本的にモデルクラスはこれをインクルードしています。
  - concern/$module/addon
    - シラサギ独自機能の、モデルアドオンのクラスを配置しています。
- validators
  - < ActiveModel::EachValidator >
- views
  - layouts
    - レイアウトを配置しています。
  - $module/agents/addons
    - モデルアドオンのビューを配置しています。

## <a name="bin"></a> bin

インストールやデプロイ用のシェルを配置しています。

## <a name="config"></a> config

- after_initializers
  - シラサギ独自の機能で、initializers の後にロードされます。
  - 開発用設定や個人設定を手軽に行えます。
  - config/after_initializers はコミット対象外です。
- defaults
  - モジュールごとの設定を YAML ファイルで配置しています。
  - これらのファイルを config/ にコピーして変更すれば、設定を上書きすることができます。
  - config/*.yml はコミット対象外です。
- environments
- initializers
- locales/$module/ja.yml
  - モジュール別にロケールファイルを配置しています。
  - ソースコード内では日本語を使わず、この辞書を元に変換しています。
- routes/$module/routes.rb
  - モジュール別にルーティングファイルを配置しています。
- samples
  - インストール時のサンプルファイルを配置しています。
- voices
  - 音声読み上げ用のデータを配置しています。

## <a name="db"></a> db

- seeds
  - サンプルーデータ投入用のファイルです。
  - テーマ別に分類して配置しています。

## <a name="lib"></a> lib

- migrations/$module
  - DBマイグレーション用のファイルを配置しています。
- tasks/$module
  - 定期実行などのタスクを配置しています。

## <a name="log"></a> log

- unicorn.stderr.log
- unicorn.stdout.log

## <a name="private"></a> private

アプリケーション内で生成される非公開の物理ファイルが配置されます。

- 例）
- files/ss_files/1/2/3/_/123
  - (ID:123) のデータに紐づく物理ファイルが保存されています。
  - 階層化されたパスに保存されます。

## <a name="public"></a> public

- assets
  - css, img, js
    - Nginx から直接参照したいファイル
    - パスの処理が面倒なファイル
    - [CMS] 公開画面から利用したいファイル
    - などを配置しています。

- sites
  - [CMS] サイトごとのドキュメントルートディレクトリがこの中に生成されます。
  - 例）
  - w/w/w/_
    - (ホスト名:www) のサイトのドキュメントルートです。

## <a name="spec"></a> spec

Rspec, Capybara, Poltergeist, FactoryGirl などを使ったテストコードを配置しています。

## <a name="tmp"></a> tmp

キャッシュなどの一時ファイルが生成されます。

## <a name="vendor"></a> vendor

- assets
  - javascripts
    - JavaScript を配置しています
  - packages/$package
    - JavaScript とスタイルシートが混在する外部ライブラリを配置しています。
  - stylesheets
    - スタイルシートを配置しています
