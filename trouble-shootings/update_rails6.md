---
layout: default
title: Rails 6.1 への更新と Gem の最新化について
---

シラサギ本流を Rails 6.1 へ更新しました。その際にすべての Gem を最新にしました。
シラサギ本流でどのように更新したのかをメモとして残しておくことで、シラサギをカスタマイズしている方へ向けて、更新の際のトラブルシューティングのヒントとなることを意図したものです。

## Rails 5.2 から Rails 6.0 への更新と Gem の最新化

インターネットを見ると、`Gemfile` を次のように変更し、

~~~
gem 'rails', '~> 6.0.0'
~~~

`bundle update rails` を実行するとうまくいくという情報を見かけますが、シラサギの場合、エラーとなり更新できません。
シラサギには非常に多数の Gem が組み込まれており、依存グラフを読み解いて更新が必要な Gem を一つずつ `bundle update` に並べていくというのも現実的ではありません。

そこで次の手順で Rails を 6.0 へアップデートし、さらに Gem を最新化することにします。

1. `Gemfile` には `gem 'rails', '~> 6.0.0'` だけを残し、あとは全てコメントアウトします。
2. `bundle update rails` を実行し、Rails を 6.0 へ更新します。
3. コメントアウトした箇所を元に戻し、`bundle install` します。

3 の手順でいくつか補足があります。

- mongoid, mongo_session_store, mongoid-rspec, mongoid-grid_fs が GitHub リポジトリを参照していますが、削除します。Rubygems.org から配布されているもに戻します。
- rubyzip は 3.0 になるとインターフェースが大きく変わるようですので、`gem 'rubyzip', '~> 2.3.0'` とし、不用意に 3.0 へ更新されないように防御します。
- sprokets のバージョン指定はそのままとし、引き続き 3.x を利用し続けることにします。

## Rails 6.0 の適用

### config/application.rb の更新

`config/application.rb` を開き `config.load_defaults 5.0` の指定を `config.load_defaults 6.0` とします。
また、Rails 6 から既定で Zeitwerk クラスローダーが有効になりますが、`SS::Config` のような `SS` で始まるクラスやモジュールをうまくロードできませんので、一旦無効にするために `config.load_defaults 6.0` の下に `config.autoloader = :classic` を追加します。

### ActionDispatch::Response#media_type の利用

Rails 6.0 から ActionDispatch::Response#content_type に charset パートが含まれるようになったため、シラサギ内で条件判定に失敗する箇所があります。
`content_type` を検索し、該当箇所を `media_type` へ変更します。

例:

~~~ruby
    if response.content_type == "text/html" && node.layout
~~~

上記のようなコードがあれば、下記のように変更します。

~~~ruby
    if response.media_type == "text/html" && node.layout
~~~

## 最新版 factory_bot の適用

### spec/factories/**/*.rb の更新

factory_bot を最新版へ更新したため、spec/factories/　にあるファクトリー定義を読み込むことができません。
多数のファイルがあるので手動で変更するのは大変ですが、幸い RuboCop を利用することで一括修正することができますので、次の手順を実行します。

1. `rubocop-rspec` を Gemfile へ追加し、`bundle install` を実行
2. `bundle exec rubocop --require rubocop-rspec --only FactoryBot/AttributeDefinedStatically --auto-correct` を実行します。

## 最新版 mongoid の適用

### app/models/concerns/ss/fields/normalizer.rb の更新

Mongoid を最新版へ更新したため、`::Boolean` クラスが削除されました。`app/models/concerns/ss/fields/normalizer.rb` に `::Boolean` を利用している箇所があり、この箇所がエラーになるので修正します。
次の箇所を

~~~ruby
  def boolean_field?(field_def)
    field_def.type == Mongoid::Boolean || field_def.type == Boolean
  end
~~~

次のように修正します。

~~~ruby
  def boolean_field?(field_def)
    field_def.type == ::Mongoid::Boolean
  end
~~~

### 検索条件が追加されるようになった

以前のバージョンでは、後から指定した検索条件は、先に指定している条件を上書きしていました:

~~~
Cms::Node.where(filename: /^master\//).where(filename: /^partial\//).selector
=> {"filename"=>/^partial\//}
~~~

更新後のバージョンでは、検索条件が追加されるようになりました。

~~~
Cms::Node.where(filename: /^master\//).where(filename: /^partial\//).selector
=> {"filename"=>/^master\//, "$and"=>[{"filename"=>/^partial\//}]}
~~~

今のところこの仕様変更の影響を受けるのは `app/models/concerns/category/addon/integration.rb` だけですが、テストを進めていくと他にも見つかるかもしれません。

### or の仕様変更

`.or` は追加されるのではなく、全体を OR で置き換えるようになりました。
実例で見ていくと、以前のバージョンでは次のようでした。

~~~ruby
site = Cms::Site.find(1)
Cms::Page.site(site).or({ filename: /^master\// }, { category_ids: 1 })selector
=> ...TBD...
~~~

指定したサイト内で、filename が "master" で始まるページ or カテゴリーに 1 番のフォルダーが設定されているページを検索していました。
更新後のバージョンでは、

~~~ruby
site = Cms::Site.find(1)
Cms::Page.site(site).or({ filename: /^master\// }, { category_ids: 1 })selector
=> ...TBD...
~~~

指定したサイト内のページ or filename が "master" で始まるページ or カテゴリーに 1 番のフォルダーが設定されているページを検索するようになりました。

シラサギ内で or を検索し、該当箇所を修正します。

修正例:

~~~ruby
self.or({email: id}, {uid: id})
~~~

上記のようなコードを下記のように修正します。

~~~ruby
self.where("$or" => [{ email: id }, { uid: id }])
~~~
