---
layout: default
title: 公開系の開発
---

## 画面構成

公開系画面は以下の要素で構成されます。

- ページ
  - 画面内に１つだけ配置が可能な主要なページコンテンツ。
  - URL を持つ。
- ノード
  - 画面内に１つだけ配置が可能な中間ページコンテンツ。
  - URL を持つ。
  - UI名称はフォルダー
- パーツ
  - 画面内にいくつでも配置可能なコンテンツ
  - URL を持つ。（Ajaxによる動的表示時に使用）
- レイアウト
  - ページ, ノード, パーツの配置を管理
  - URL を持つ。（現在は管理にのみ使用）

## 画面生成の流れ

画面生成の流れは以下のようになります。

- ページ or ノードを描画
- ページ or ノードに紐付くレイアウトを描画
- レイアウトに記述されているパーツを描画

## 画面生成の内部処理

紐付くデータを順に検索していきます。

1. URLアクセス
2. `Cms::PublicController` で処理を開始
3. `set_site` / ドメインがCMS管理下のものであるか検証
4. `find_page` / URL からページ(cms_pages)を検索
  - `render_page` / ページコントローラを実行
5. `find_node` / ページが見つからなければノード(cms_nodes)を検索
  - `render_node` / ノードコントローラを実行
6. `render_layout` / レイアウトを描画
7. `render_layout_parts` / パーツを描画

## 主要なコントローラークラス/モジュール

- app/controllers/cms/
  - [public_controller.rb](https://github.com/shirasagi/shirasagi/blob/master/app/controllers/cms/public_controller.rb)
    ... 公開系のフロントコントローラー
  - [preview_controller.rb](https://github.com/shirasagi/shirasagi/blob/master/app/controllers/cms/preview_controller.rb)
    ... プレビュー時のフロントコントローラー
- app/controllers/concerns/cms/
  - [public_filter.rb](https://github.com/shirasagi/shirasagi/blob/master/app/controllers/concerns/cms/public_filter.rb)
    ... 公開系のメイン処理
  - public_filter/
    - [page.rb](https://github.com/shirasagi/shirasagi/blob/master/app/controllers/concerns/cms/public_filter/page.rb)
      ... ページに関する処理
    - [node.rb](https://github.com/shirasagi/shirasagi/blob/master/app/controllers/concerns/cms/public_filter/node.rb)
      ... ノードに関する処理
    - [layout.rb](https://github.com/shirasagi/shirasagi/blob/master/app/controllers/concerns/cms/public_filter/layout.rb)
      ... レイアウトに関する処理

### Cms::PublicController

公開系へのアクセスは一度 `Cms::PublicController` で受け付け、
ページ/ノードのデータで設定されているコントローラに転送されます。<br />
このため、機能各にレイアウトやパーツの描画を実装する必要はありません。<br />
<br />
また、以下のような特殊な置換フィルターも自動的に適用されます。

- フリガナフィルター<br />
  パスの先頭に `/kana/` を含む場合、HTML にフリガナが付与されます。

- モバイルフィルター<br />
  パスの先頭に `/mobile/` を含む場合、モバイル用 HTML に置換されます。

### Cms::PreviewController

プレビュー画面では `Cms::PublicController` の代わりに `Cms::PreviewController` が受け付けます。<br />
画面生成の流れは同じですが、公開状態に関わらずページ/ノードを描画します。<br />
<br />
プレビューのための特別な設定は必要ありませんが、
プレビュー対象日時 `@cur_date` に応じて出力を変更する場合は、DBの検索条件を考慮しなければなりません。

## 既定の変数

変数|クラス|説明
----|------|----
@cur_path|String|/kana/ 等のフィルターパスを含まないリクエストパス
@cur_main_path|String|サブディレクトリを除いたリクエストパス ※サブディレクトリ機能
@cur_date|DateTime|プレビュー時に指定される日時 ※ActiveSupport::TimeWithZone
@cur_site|Cms::Site|実行中のサイト
@cur_page|Cms::Page|実行中のページ ※ページコントローラ内
@cur_node|Cms::Node|実行中のフォルダー ※ノードコントローラ内
@cur_part|Cms::Part|実行中のパーツ ※パーツコントローラ内
@preview|Boolean|プレビュー中かどうか


## ページの開発

`Cms::PublicController` から呼び出されるコントローラーは、設定されたルーティングと、決められた命名規則によって解決されます。

例）記事ページ<br />
db.cms_pages.route == 'article/page'

### Routes

~~~
# config/routes/article/routes.rb

# page "{MODULE}" do
#   get "{FEATURE}/:filename.:format" => "public#index", cell: "{CELL}"
# end

page "article" do
  get "page/:filename.:format" => "public#index", cell: "pages/page"
end

# 生成される Route
GET /.s:site/pages/article/page/:filename.:format
    cms/public#index {:cell=>"pages/page"}
~~~

db.cms_pages.route が `{MODULE}/{FEATURE}` の時、`cms/public_controller#index` を通り、
`{MODULE}/agents/{CELL}_controller#index` が実行されます。<br /><br />
例の場合、`article/agents/pages/page_controller#index` が実行されます。

### Controller

~~~
# app/controllers/article/agents/pages/page_controller.rb

class Article::Agents::Pages::PageController < ApplicationController
  include Cms::PageFilter::View

  # def index
  #   処理
  # end
end
~~~

`Cms::PageFilter::View` の機能が必要です。

### View

~~~
# app/views/article/agents/pages/page/index.html.erb

ページ名: <%= @cur_page.name %>
~~~

`Cms::PublicController` で検索された `Cms::Page` はモデルは `@cur_page` で参照が可能です。


## ノードの開発

`Cms::PublicController` から呼び出されるコントローラーは、設定されたルーティングと、決められた命名規則によって解決されます。

例）記事一覧<br />
db.cms_nodes.route == 'article/page'

### Routes

~~~
# config/routes/article/routes.rb

# node "{MODULE}" do
#   get "{FEATURE}/(index.:format)" => "public#index", cell: "{CELL}"
# end

node "article" do
  get "page/(index.:format)" => "public#index", cell: "nodes/page"
end

# 生成される Route
article_node
  GET /.s:site/nodes/article/page(/index.:format)
      cms/public#index {:cell=>"nodes/page"}
~~~

db.cms_pages.route が `{MODULE}/{FEATURE}` の時、`cms/public_controller#index` を通り、
`{MODULE}/agents/{CELL}_controller#index` が実行されます。<br /><br />
例の場合、`article/agents/nodes/page_controller#index` が実行されます。

### Controller

~~~
# app/controllers/article/agents/nodes/page_controller.rb

class Article::Agents::Nodes::PageController < ApplicationController
  include Cms::NodeFilter::View

  # def index
  #   処理
  # end
end
~~~

`Cms::NodeFilter::View` の機能が必要です。

### View

~~~
# app/views/article/agents/nodes/page/index.html.erb

フォルダー名: <%= @cur_node.name %>
~~~

`Cms::PublicController` で検索された `Cms::Node` はモデルは `@cur_node` で参照が可能です。


## パーツの開発

`Cms::PublicController` から呼び出されるコントローラーは、設定されたルーティングと、決められた命名規則によって解決されます。

例）記事一覧パーツ<br />
db.cms_parts.route == 'article/page'

### Routes

~~~
# config/routes/article/routes.rb

# part "{MODULE}" do
#   get "{FEATURE}" => "public#index", cell: "{CELL}"
# end

part "article" do
  get "page" => "public#index", cell: "parts/page"
end

# 生成される Route
article_part_page
  GET /.s:site/parts/article/page(.:format)
      cms/public#index {:cell=>"parts/page"}
~~~

db.cms_parts.route が `{MODULE}/{FEATURE}` の時、`cms/public_controller#index` を通り、
`{MODULE}/agents/{CELL}_controller#index` が実行されます。<br /><br />
例の場合、`article/agents/parts/page_controller#index` が実行されます。

### Controller

~~~
# app/controllers/article/agents/parts/page_controller.rb

class Article::Agents::Parts::PageController < ApplicationController
  include Cms::PartFilter::View

  # def index
  #   処理
  # end
end
~~~

`Cms::PartFilter::View` の機能が必要です。

### View

~~~
# app/views/article/agents/parts/page/index.erb

パーツ名: <%= @cur_part.name %>
~~~

`Cms::PublicController` で検索された `Cms::Part` はモデルは `@cur_part` で参照が可能です。
