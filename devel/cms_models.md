---
layout: default
title: CMS機能の主要モデル
---

### CMS機能の主要モデル

シラサギCMS機能の独自開発を行う際には次の要素を拡張することが多いです。

要素 | 基底クラス | 抽象モジュール | mongo collection
-----------|---------------------|-----
ページ | Cms::Page  | Cms::Model::Page | cms_pages
フォルダー | Cms::Node  | Cms::Model::Node | cms_nodes
パーツ  | Cms::Part | Cms::Model::Part | cms_parts

それぞれ機能的な特徴を列挙します。

### Cms::Page
  - シラサギのページに該当します。
  - 管理画面からタイトルや本文の内容等、必要な属性を入力し作成することができます。
  - URLを持ちます。
    - 公開側のルーティングがあります。
    - `filename`(ファイル名) をという属性を保持しており、公開側URLとなります。
      - 例）"docs/page1.html"
  - 公開画面側アクセス時には基本的に本文の内容等からHTMLを出力します。
  - 固定ページ、記事ページ等、種別があります。
    - 開発が必要になった際には、新しいページ種別を追加する事が多いです。
  - 書き出しが行われます。(例外有)
    - `Cms::Model::Page` を `include` した状態で書き出されるようになります。
    - `serve_static_file?` メソッドで書き出しを抑制しているページ種別もあります。
  - アドオンをモデルに`include`することで以下のような拡張を行えます。
    - 独自の属性（field）をページに追加できます。
    - 管理画面側の partial view を追加できます。設定項目の追加に利用できます。
    - 公開画面側の partial view を追加できます。独自項目の公開側表示に利用できます。
    - 属性の入出力だけでなく、`Workflow::Addon::Approver`(ワークフロー承認申請) 等、重要な機能としてページと密結合している箇所もあります。

### Cms::Node
  - シラサギのフォルダーに該当します。
  - 管理画面からフォルダー名や設定等、必要な属性を入力し作成することができます。
  - URLを持ちます。
    - 公開側のルーティングがあります。
    - `filename`(ファイル名) をという属性を保持しており、公開側URLとなります。
      - 例）"docs"
  - フォルダーには、他の要素（ページ、フォルダー、パーツ、レイアウト）を内部に含めることができます。
    - `filename`(ファイル名)と`depth`（深さ）の属性で判別しています。
    - 例）
    - `filename`: "docs/abc"
    - `depth`: 2
  - 記事リスト、カテゴリーリスト等、種別があります。
    - 開発が必要になった際には、新しいフォルダー種別を追加する事が多いです。
  - 公開側アクセス時には各機能、コンテンツの内容をHTMLやRSS等で出力します。
    - 出力内容は以下のパターンが多いです。
      - 各機能、コンテンツ独自の出力
        - 例）イベントリスト、掲示板
      - フォルダーに含まれるページ、もしくはフォルダーを一覧で出力する
        - 例）記事リスト、カテゴリーリスト
  - 書き出しが行われます。(例外有)
    - `Cms::Model::Node` を `include` しただけでは書き出されず、書き出しタスク用の`controller`を作成する必要があります。
    - 例）`app/controllers/article/agents/tasks/node/pages_controller.rb`
    - メンバーログイン後の画面等、フォルダーによっては機能的に書き出しを行わない箇所があります。
  - アドオンをモデルに`include`することで拡張可能です。（ページと同様）

### Cms::Part
  - シラサギのパーツに該当します。
  - 管理画面からパーツ名や設定等、必要な属性を入力し作成することができます。
  - URLを持ちます。
    - 公開側のルーティングがあります。
    - filename(ファイル名) をという属性を保持しており、公開側URLとなります。
      - 例）"head.part.html"
  - 記事リスト、広告バナー等、種別があります。
    - 開発が必要になった際には、新しいパーツ種別を追加する事が多いです。
  - 公開側表示はレイアウトにパーツを記述し参照する使い方になります。
    - 出力内容は以下のパターンが多いです。
      - リストを作成しHTMLを出力
        - 例）ページリスト、カテゴリーリスト
      - 設定したHTMLや各機能のHTMLを出力
        - 例）広告バナー、スライドショー
    - 直接URLにアクセスすれば、パーツ自体の内容が出力されます。
  - パーツ自体の書き出しは行われません。
    - レイアウトに設定がある場合、ページ、フォルダーの書き出し時に、パーツ内容も書き出されます。
    - 動的パーツの場合、読み込み用の Ajax JavaScript が書き出されます。
  - アドオンをモデルに`include`することで拡張することができます。（ページと同様）

## 種別クラス（ポリモーフィック・モデル）
ページ、フォルダー、パーツは class と route 属性により機能毎に種別分けされています。
- 例）記事ページ
  - `class`: Article::Page
  - `route`: "article/page"

各種別のクラスはシラサギ独自の命名規則に従って作成されています。<br />
以下に、記事モジュールのページ、フォルダー、パーツを例に示します。

** ページ **
~~~ruby
class Article::Page
  include Cms::Model::Page
  # 必要なモジュール、アドオンをinclude

  default_scope ->{ where(route: "article/page") }
end
~~~
** フォルダー **
~~~ruby
module Article::Node
  class Page
    include Cms::Model::Node
    # 必要なモジュール、アドオンをinclude

    default_scope ->{ where(route: "article/page") }
  end
end
~~~
** パーツ **

~~~ruby
module Article::Part
  class Page
    include Cms::Model::Node
    # 必要なモジュール、アドオンをinclude

    default_scope ->{ where(route: "article/page") }
  end
end
~~~

独自の種別を追加する際には、`module`、`class`、`route`を拡張機能に合わせて変更ください。<br />
それぞれの`class`で抽象モジュールを`include`する為`mongo collection`は基底クラスに一致します。

## 属性

各基底クラスの主要属性として、
それぞれの抽象モジュール 及び`SS::Document`、`Cms::Content`に
定義されているものを抜粋します。<br />
属性については、今後の開発により変更が発生する場合があります。

 field | 説明　| 例 | Cms::Model::Page | Cms::Model::Node | Cms::Model::Part
-----------|---------------------|-----
id | シーケンシャルID | 1 | ○ | ○ | ○
name | タイトル | "ふれあいフェスティバル" | ○ | ○ | ○
index_name | 一覧表示用タイトル | "ふれあい記事" | ○ | ○ | ○
filename | ファイル名 | "docs/page1.html" | ○ | ○ | ○
depth | ファイル名の深さ、スラッシュ(/)区切り | 2 | ○ | ○ | ○
order | 並び順 | 10 | ○ | ○ | ○
state | 公開状態 | "public" or "closed" | ○ | ○ | ○
released | 公開日時 | "2016-10-28T17:49:33+09:00" | ○ | ○ | ○
created | 作成日時 | "2016-10-28T17:49:33+09:00" | ○ | ○ | ○
updated | 更新日時 | "2016-10-28T17:49:33+09:00" | ○ | ○ | ○
route | 機能種別 | "article/page" | ○ | ○ | ○
category_ids | カテゴリフォルダーのID配列 |[1,2,3] | ○ | 別addonで定義されている |
view_route | 既定のモジュール機能 | "article/page" | | ○ |
shortcut | コンテンツ画面へのショートカット表示 | "show" or "hide" | | ○ |
mobile_view | モバイル時の表示 | "show" or "hide" | | | ○
ajax_view | Ajaxパーツの有効 | "enabled" or "disabled" | | | ○
<!--
text_index | 検索用CSV文字列 | --- | --- | --- | ---
first_released | 公開日時（画面上で編集不可） | --- | --- | --- | ---
md5 | 書き出し時に埋め込まれるmd5ハッシュ値 | --- | --- | --- | ---
-->
