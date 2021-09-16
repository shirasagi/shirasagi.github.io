---
layout: default
title: Rails 6.1 への更新と Gem の最新化について
---

シラサギ本流を Rails 6.1 へ更新しました。その際にすべての Gem を最新にしました。
シラサギ本流でどのように更新したのかをメモとして残しておくことで、シラサギをカスタマイズしている方へ向けて、更新の際のトラブルシューティングのヒントとなることを意図したものです。

## Rails 5.2 から Rails 6.0 への更新と Gem の最新化

インターネットを見ると `Gemfile` を次のように変更し、

~~~
gem 'rails', '~> 6.0.0'
~~~

`bundle update rails` を実行するとうまくいくという情報を見かけますが、シラサギの場合、エラーとなり更新できません。
シラサギには非常に多数の Gem が組み込まれており、依存グラフを読み解いて更新が必要な Gem を一つずつ `bundle update` に並べていくというのも現実的ではありません。
そこで次の手順で Rails を 6.0 へアップデートし、さらに Gem を最新化することにします。

1. `Gemfile` には `gem 'rails', '~> 6.0.0'` だけを残し、あとは全てコメントアウトします。
2. `bundle update rails` を実行して Rails を 6.0 へ更新します。
3. コメントアウトした箇所を元に戻した後、`bundle install` を実行します。

3 の手順でいくつか補足があります。

- mongoid, mongo_session_store, mongoid-rspec, mongoid-grid_fs が GitHub リポジトリを参照していますが、GitHub リポジトリへの参照を削除します。Rubygems.org から配布されているものに戻します。
- rubyzip は 3.0 になるとインターフェースが大きく変わるようですので、`gem 'rubyzip', '~> 2.3.0'` とし、不用意に 3.0 へ更新されないように防御します。
- sprokets のバージョン指定はそのままとし、引き続き 3.x を利用し続けることにします。

## Rails 6.0 の適用

### config/application.rb の更新

`config/application.rb` を開き `config.load_defaults 5.0` の指定を `config.load_defaults 6.0` とします。

### Zeitwerk class loader 対応

SS::Config のような SS 配下のモジュールやクラスをロードするために inflection の設定が必要です。
`config/initializers/inflections.rb` に次の設定を追加します。

~~~ruby
ActiveSupport::Inflector.inflections(:en) do |inflect|
  inflect.acronym 'SS'
end
~~~

何か適当なテストを実行してみます。エラーがあれば修正します。
テストでは起動時にすべてのクラスを読み込む設定となっているためロードエラーを効率よく修正することができます。

なお Rails 7 では従来のクラスローダー classic class loader が廃止され Zeitwerk のみがサポートされるようですので、この際に Zeitwerk で動作するように修正します。
<https://weblog.rubyonrails.org/2021/9/3/autoloading-in-rails-7-get-ready/>

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

### `render file:` の deprecation warning

Rails 6.0 から `render file: "cms/agents/addons/body_part/view/index"` のように `render file:` 形式に相対パスを指定して利用すると非推奨警告が表示されるようになりました。

とはいえ、`render file: "#{Rails.root}/cms/agents/addons/body_part/view/index.html.erb"` のようにすると、今度は ERB として解釈されず単なるファイルが読み込まれ、Ruby コードが丸見えになってしまいます。

正解は `render template: "cms/agents/addons/body_part/view/index"` と `render template:` 形式を利用することのようです。

シラサギは歴史的にずっと `render file:` 形式を利用してきており、相当な量を修正しないといけません。

以下は余談で、実装を詳しくみていきます。
当該処理は actionview の `action_view/renderer/template_renderer.rb` に実装されており、
[Rails 5.2.6 の action_view/renderer/template_renderer.rb](https://github.com/rails/rails/blob/v5.2.6/actionview/lib/action_view/renderer/template_renderer.rb#L31-L32)では次のようになっていました。

~~~ruby
      def determine_template(options)
        keys = options.has_key?(:locals) ? options[:locals].keys : []

        if options.key?(:body)
          Template::Text.new(options[:body])
        elsif options.key?(:plain)
          Template::Text.new(options[:plain])
        elsif options.key?(:html)
          Template::HTML.new(options[:html], formats.first)
        elsif options.key?(:file)
          with_fallbacks { find_file(options[:file], nil, false, keys, @details) }
        elsif options.key?(:inline)
          handler = Template.handler_for_extension(options[:type] || "erb")
          Template.new(options[:inline], "inline template", handler, locals: keys)
        elsif options.key?(:template)
          if options[:template].respond_to?(:render)
            options[:template]
          else
            find_template(options[:template], options[:prefixes], false, keys, @details)
          end
        else
          raise ArgumentError, "You invoked render but did not give any of :partial, :template, :inline, :file, :plain, :html or :body option."
        end
      end
~~~

[Rails 6.0.4.1 の action_view/renderer/template_renderer.rb](https://github.com/rails/rails/blob/v6.0.4.1/actionview/lib/action_view/renderer/template_renderer.rb#L27-L33)では次のようになっています。

~~~ruby
      def determine_template(options)
        keys = options.has_key?(:locals) ? options[:locals].keys : []

        if options.key?(:body)
          Template::Text.new(options[:body])
        elsif options.key?(:plain)
          Template::Text.new(options[:plain])
        elsif options.key?(:html)
          Template::HTML.new(options[:html], formats.first)
        elsif options.key?(:file)
          if File.exist?(options[:file])
            Template::RawFile.new(options[:file])
          else
            ActiveSupport::Deprecation.warn "render file: should be given the absolute path to a file"
            @lookup_context.with_fallbacks.find_template(options[:file], nil, false, keys, @details)
          end
        elsif options.key?(:inline)
          handler = Template.handler_for_extension(options[:type] || "erb")
          format = if handler.respond_to?(:default_format)
            handler.default_format
          else
            @lookup_context.formats.first
          end
          Template::Inline.new(options[:inline], "inline template", handler, locals: keys, format: format)
        elsif options.key?(:template)
          if options[:template].respond_to?(:render)
            options[:template]
          else
            @lookup_context.find_template(options[:template], options[:prefixes], false, keys, @details)
          end
        else
          raise ArgumentError, "You invoked render but did not give any of :partial, :template, :inline, :file, :plain, :html or :body option."
        end
      end
~~~

Rails 6.0 では `render file: "#{Rails.root}/cms/agents/addons/body_part/view/index.html.erb"` のように利用すると `Template::RawFile` クラスがインスタンス化され ERB として解釈されなくなります。

ちなみに [Rails 6.1 の action_view/renderer/template_renderer.rb](https://github.com/rails/rails/blob/v6.1.4.1/actionview/lib/action_view/renderer/template_renderer.rb#L29) では `render file: "cms/agents/addons/body_part/view/index"` のように利用すると例外が発生するようになっています。

### `render file:` にシンボルを渡せない

`render file:` は `render template:` へ書き換えると思うので問題が発生することはないと思いますが、`render file:` にシンボルを渡すと次のエラーが発生します。

~~~
TypeError (no implicit conversion of Symbol into String)
~~~

なお `render template:` へシンボルを渡すのもやめましょう。この形式でも意味的に「パス」が渡ってくることが期待されていると思います。
現在はこの形式にシンボルを渡しても動作しますが、将来は分かりませんし、「パス」としてシンボルは不適切かなと思います。文字列を渡すようにしましょう。

### ActionMailer の改行コードが \n から \r\n へ変更

次のようなテストコードが失敗します。

~~~ruby
expect(mail.body.raw_source).to include("＜警戒（発表）＞\n北九州市、福岡市")
~~~

次のように修正します。

~~~ruby
expect(mail.body.raw_source).to include("＜警戒（発表）＞\r\n北九州市、福岡市")
~~~

量としては多くないですが、ちょくちょくテストが失敗します。

### ActionDispatch::HostAuthorization middleware

Rails 6 へ更新すると "Blocked host: www.example.jp" というエラーが発生するようになります。
これは Rails 6 から追加された、DNSリバインディング攻撃を防止する ActionDispatch::HostAuthorization middleware によるものです。

ホスト名が事前にわかっていれば `Rails.application.config.hosts` へ追加することでこのエラーを消すことができますが、
シラサギはサイトやグループで任意のホストを設定することができます。
事前に予見することが難しく、かつ、いちいち `Rails.application.config.hosts` へ追加するのは運用負荷も大きいので、
ActionDispatch::HostAuthorization middleware を削除します。

具体的には `config/application.rb` に `config.middleware.delete ActionDispatch::HostAuthorization` を追加します。

余談ですが Rails 5.2 では次の middleware が組み込まれています。

~~~shell
$ bin/rake middleware
use Rack::Sendfile
use ActionDispatch::Static
use ActionDispatch::Executor
use ActiveSupport::Cache::Strategy::LocalCache::Middleware
use Rack::Runtime
use Rack::MethodOverride
use ActionDispatch::RequestId
use ActionDispatch::RemoteIp
use Sprockets::Rails::QuietAssets
use Rails::Rack::Logger
use ActionDispatch::ShowExceptions
use ActionDispatch::DebugExceptions
use ActionDispatch::Reloader
use ActionDispatch::Callbacks
use ActionDispatch::Cookies
use ActionDispatch::Session::MongoidStore
use ActionDispatch::Flash
use ActionDispatch::ContentSecurityPolicy::Middleware
use Rack::Head
use Rack::ConditionalGet
use Rack::ETag
use Rack::TempfileReaper
use Mongoid::QueryCache::Middleware
use HttpAcceptLanguage::Middleware
run SS::Application.routes
~~~

Rails 6.0 では次の middleware が組み込まれています。

~~~shell
$ bin/rake middleware
use ActionDispatch::HostAuthorization
use Rack::Sendfile
use ActionDispatch::Static
use ActionDispatch::Executor
use ActiveSupport::Cache::Strategy::LocalCache::Middleware
use Rack::Runtime
use Rack::MethodOverride
use ActionDispatch::RequestId
use ActionDispatch::RemoteIp
use Sprockets::Rails::QuietAssets
use Rails::Rack::Logger
use ActionDispatch::ShowExceptions
use ActionDispatch::DebugExceptions
use ActionDispatch::ActionableExceptions
use ActionDispatch::Reloader
use ActionDispatch::Callbacks
use ActionDispatch::Cookies
use ActionDispatch::Session::MongoidStore
use ActionDispatch::Flash
use ActionDispatch::ContentSecurityPolicy::Middleware
use Rack::Head
use Rack::ConditionalGet
use Rack::ETag
use Rack::TempfileReaper
use Mongo::QueryCache::Middleware
use HttpAcceptLanguage::Middleware
run SS::Application.routes
~~~

### CSV の mime type が text/comma-separated-values から text/csv へ変更

シラサギのソースから text/comma-separated-values を検索し text/csv へ置換します。
利用箇所は多くはないですが、処理が失敗するので修正します。

## factory_bot 4.10 から 6.2 への更新

### spec/factories/**/*.rb の更新

factory_bot を 4.10 から 6.2 へ更新したため、spec/factories/ にあるファクトリー定義を読み込むことができません。
多数のファイルがあるので手動で変更するのは大変ですが、幸い RuboCop を利用することで一括修正することができますので、次の手順を実行します。

1. `rubocop-rspec` を Gemfile へ追加し、`bundle install` を実行
2. `bundle exec rubocop --require rubocop-rspec --only FactoryBot/AttributeDefinedStatically --auto-correct` を実行します。

### association が永続化されなくなった

次のような factory 定義があります。

~~~
FactoryBot.define do
  factory :gws_board_post, class: Gws::Board::Post do
    cur_site { gws_site }
    cur_user { gws_user }

    name { "name-#{unique_id}" }
    text { "text-#{unique_id}" }

    factory :gws_board_comment do
      association :parent, factory: :gws_board_post
    end

    factory :gws_board_comment_to_comment do
      association :parent, factory: :gws_board_comment
    end
  end
end
~~~

factory_bot 4.10 では次の通りでした。

~~~ruby
build(:gws_post_comment).parent.persisted?
=> true
~~~

factory_bot 6.2 では次のようになります。

~~~ruby
build(:gws_post_comment).parent.persisted?
=> false
~~~

association が永続されていなくても処理が成功するように修正するか、association をやめて常に永続化されたインスタンスを設定するかします。

> 今回は前者の方法で修正しましたが、後者の方法で修正するとなると factory 定義を次のように変更することになると思います。
> 
> ~~~ruby
>     factory :gws_board_comment do
>       parent { create :gws_board_post }
>     end
> ~~~

## Mongoid 7.0 相当から 7.3 への更新

すべてのアップグレードガイドは <https://docs.mongodb.com/mongoid/current/tutorials/mongoid-upgrade/> に掲載されています。
ここではシラサギで発生した問題点についてのみメモしています。

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

Mongoid 7.0 相当では、後から指定した検索条件が先に指定している条件を上書きしていました:

~~~ruby
Cms::Node.where(filename: /^master\//).where(filename: /^partial\//).selector
=> {"filename"=>/^partial\//}
~~~

Mongoid 7.3 では検索条件が追加されるようになりました。

~~~ruby
Cms::Node.where(filename: /^master\//).where(filename: /^partial\//).selector
=> {"filename"=>/^master\//, "$and"=>[{"filename"=>/^partial\//}]}
~~~

#### 権限判定が正しく行われるようになった

シラサギでは閲覧権限があるものだけを DB から抽出するのによく次のようなクエリーを使います。

~~~ruby
@model.allow(:read, @cur_user, site: @cur_site).find(params[:id])
~~~

ここで閲覧権限がない場合、`.allow(:read, @cur_user, site: @cur_site)` は `.where(id: -1)` と等価となるため、上のコードは下のコードと等価となります。

~~~ruby
@model.where(id: -1).find(params[:id])
~~~

`find(params[:id])` は `where(id: params[:id]).first || raise Mongoid::Errors::DocumentNotFound` とほぼ等価のため、
もうお気づきでしょうが、Mongoid 7.0 相当では、先に指定している条件が後から指定した条件で上書きされるため `@model.find(params[:id])` を実行するのに等しく、権限チェックが無効になってしまっていました。
Mongoid 7.3 では上書きされなくなったため、このコードは例外を発生させるようになりました。

まとめると Mongoid 7.0 相当では:

~~~ruby
@model.allow(:read, @cur_user, site: @cur_site).find(params[:id])
-> @model.where(id: -1).where(id: params[:id]).first || raise Mongoid::Errors::DocumentNotFound
-> @model.where(id: params[:id]).first || raise Mongoid::Errors::DocumentNotFound
-> Mongoid::Errors::DocumentNotFound エラーが発生しない。つまり権限チェックが無効。
~~~

Mongoid 7.3 では

~~~ruby
@model.allow(:read, @cur_user, site: @cur_site).find(params[:id])
-> @model.where(id: -1).where(id: params[:id]).first || raise Mongoid::Errors::DocumentNotFound
-> @model.where(id: -1, "$and" => [{ id: params[:id] }]).first || raise Mongoid::Errors::DocumentNotFound
-> Mongoid::Errors::DocumentNotFound エラーが発生する。つまり権限チェックが有効。
~~~

### or の仕様変更

`.or` は追加されるのではなく、全体を OR で置き換えるようになりました。
実例で見ていくと、Mongoid 7.0 相当では次のようでした。

~~~ruby
site = Cms::Site.find(1)
Cms::Page.site(site).or({ filename: /^master\// }, { category_ids: 1 }).selector
=> {
  "site_id"=>1,
  "$or"=>[
    {"filename"=>/^master\//},
    {"category_ids"=>1}
  ]
}
~~~

指定したサイト内で、filename が "master" で始まるページ or カテゴリーに 1 番のフォルダーが設定されているページを検索していました。
Mongoid 7.3 では、

~~~ruby
site = Cms::Site.find(1)
Cms::Page.site(site).or({ filename: /^master\// }, { category_ids: 1 }).selector
=> {
  "$or"=>[
    {"site_id"=>1},
    {"filename"=>/^master\//},
    {"category_ids"=>1}
  ]
}
~~~

指定したサイト内のページ or filename が "master" で始まるページ or カテゴリーに 1 番のフォルダーが設定されているページを検索するようになりました。

Mongoid 公式の資料によると `.any_of` が Mongoid 7.0 の `or` として振る舞うという説明があります。
確かに次のようなクエリを試すと一見動作しそうです。

~~~ruby
Cms::Page.all.where(site_id: 1).any_of({ name: /foo/ }, { filename: /foo/ }).selector
 => {"site_id"=>1, "$or"=>[{"name"=>/foo/}, {"filename"=>/foo/}]}
~~~

しかし `.any_of` を連結すると様子が変わってきます。次のように試してみます。

~~~ruby
Cms::Page.all.where(site_id: 1) \
  .any_of([{ name: /foo/ }, { filename: /foo/ }]) \
  .any_of({ close_date: nil }, { close_date: { "$lt" => Time.zone.now.utc } }) \
  .selector
 => {"site_id"=>1, "$or"=>[{"name"=>/foo/}, {"filename"=>/foo/}, {"close_date"=>nil}, {"close_date"=>{"$lt"=>2021-09-10 00:26:58 UTC}}]}
~~~

期待した selector ではありません。`any_of` には注意すべき癖があるので、利用しない方が良さそうです。

> any_of の第1項はキーワード検索をシミュレーションした項で、第2項は公開されていることをシミュレーションした項です。

`.or` の修正は次のようすれば良いかと思います。

Mongoid 7.0 相当（修正前）:

~~~ruby
self.or({email: id}, {uid: id})
~~~

Mongoid 7.3 （修正後）:

~~~ruby
self.where("$or" => [{ email: id }, { uid: id }])
~~~

DSL を使いたいという人向けには次のような修正方法も良いでしょう。

~~~ruby
self.and(self.unscoped.or({ email: id }, { uid: id }))
~~~

> どちらかというと DSL を使った方が可読性が低下すると思いますので、DSL を使わない方を推奨します。

### $and にまつわる奇妙な動作

検索条件が追加されるようになったと説明しましたし、Mongoid の公式資料でもそのように説明されています。
しかし `$and` だけは別で、Mongoid 7.0 相当では追加されたいたのが、Mongoid 7.3 では置き換えられます。
いろいろと調査したところ、おそらくこの動作は Mongoid のバグだと思うので <https://jira.mongodb.org/browse/MONGOID-5183> に報告し、修正 PR を <https://github.com/mongodb/mongoid/pull/5077> に送りました。

これが採用されるかどうは不明ですが、シラサギとしてはこの修正がないと動作させることができません。
そこで mongoid をフォークし、修正 PR を適用した版を <https://github.com/shirasagi/mongoid/tree/7.3-stable-MONGOID-5183> に作成しました。

`Gemfile` を次のように修正し、上記のバージョンを指すように修正します。

~~~
gem 'mongoid', github: 'shirasagi/mongoid', branch: '7.3-stable-MONGOID-5183'
~~~

### find の仕様変更

Mongoid 7.0 相当では、以下のようなコードが成功していました。

~~~
Cms::Site.find id: "1"
~~~

Mongoid 7.3 では失敗しますので、次のように find_by を使うようにします。

~~~
Cms::Site.find_by id: "1"
~~~

今回は find_by に id: と主キーを渡しているので、次のように単に find にパラメータを渡すこともできます。

~~~
Cms::Site.find "1"
~~~
