---
layout: default
title: SS::Document
---

シラサギの全モデルが include しているモジュールで、次の基本機能を提供します。

### `created`, `updated` フィールド

- モデルの作成日時と更新日時を保持する 2 つのフィールドです。
- ActiveRecord をお使いの方ならご存知かと思いますが ActiveRecord は `created_at`, `updated_at` という作成日時と更新日時を保持する 2 つのフィールドを標準的に持っています。MongoDB ではこれらのフィールドは標準的には提供されていないため SS::Document に定義することでシラサギ内で全般的に利用できるようにしています。
- `updated` フィールドの更新は `before_save` コールバック内にて実行されています。
- 更新時に `updated` フィールドを更新したくない場合もあろうかと思います。
  `updated` フィールドを更新したくない場合は、[Mongoid の Atomic メソッド](https://docs.mongodb.com/mongoid/master/tutorials/mongoid-persistence/#atomic)を用いて更新することで、すべてのコールバックを迂回させることで `updated` フィールドを更新せず、他のフィールドを更新することができます。

### `t` と `tt` メソッド

- `t` メソッドはフィールドの名称を取得するメソッドで、主にシラサギの view ファイルで `@model.t :name` という風に利用されています。
  - 名称として、ロケールが日本語の場合は日本語名を、それ以外の場合は英語名を取得します。 
  - `@model.t :name` の意味は、`name` フィールドの名称を取得するという意味になります。
- `tt` メソッドは、フィールドに割り当てられているツールチップを取得するメソッドで、主にシラサギの view ファイルで `@model.tt :name` という風に利用されています。
  - ツールチップとして、ロケールが日本語の場合は日本語のツールチップを、それ以外の場合は英語のツールチップを取得します。
  - `@model.tt :name` の意味は、`name` フィールドのツールチップを取得するという意味になります。

### `seqid` メソッドと `SS::Fields::Sequencer` モジュール

- RDB でいう AUTO INCREMENT フィールドを作成する機能を提供します。作成されるフィールドの型は整数型です。
- 通常、MongoDB の主キーは [ObjectId](https://docs.mongodb.com/manual/reference/method/ObjectId/) 型ですが、本機能を用いることで主キーを AUTO INCREMENT 型の整数型フィールドに変更することができます。
- 主にシラサギでは主キーに対して `seqid :id` という風に利用されています。
- ObjectId 型は 12 バイトのデータです。対して整数型は 4 バイトのデータですので、主キーを整数型にすることでデータ容量を削減することが可能です。

### `embeds_ids`

- 他モデルへの参照を定義します。他モデルは複数持つことができます。
- 使い方は `embeds_ids :categories, class_name: "Cms::Node"` という風に使います。
  - `Cms::Node` モデルへの参照を定義します。
  - `category_ids` フィールドが作成され、`Cms::Node` を主キーを配列で保持します。
  - また `categories` メソッドが作成されます。`categories` メソッドは、参照先のオブジェクトの一覧を表す `Mongoid::Criteria` が得られます。
- 注意点として ActiveRecord の場合、他モデルへの参照は中間テーブルを使いますが、MongoDB 場合は中間テーブルを作成しません。
  当該ドキュメント内に配列で参照先モデルの主キーを保持します。

- [Mongoid には同様の機能を持つ `has_and_belongs_to_many`](https://mongoid.github.io/old/en/mongoid/docs/relations.html#has_and_belongs_to_many) があります。
  - 機能的な差異はほとんどありません。
  - 1 点、`embeds_ids` では任意のメタデータを定義できるのに対して、`has_and_belongs_to_many` では任意のメタデータを定義できません。
    - フィールドのメタデータに関して、シラサギではサイトコピー時に利用しており、フィールドを単にコピーするか、複製してコピーするのか、初期化すればよいのかの制御にフィールドのメタデータを利用しています。

#### Deep dive into `embeds_ids`

[Mongoid の Has And Belongs To Many](https://docs.mongodb.com/mongoid/master/tutorials/mongoid-relations/#has-and-belongs-to-many) の説明の中で
次のような物理データが出てきます。

~~~
# The band document.
{
  "_id" : ObjectId("4d3ed089fb60ab534684b7e9"),
  "tag_ids" : [ ObjectId("4d3ed089fb60ab534684b7f2") ]
}

# The tag document.
{
  "_id" : ObjectId("4d3ed089fb60ab534684b7f2"),
  "band_ids" : [ ObjectId("4d3ed089fb60ab534684b7e9") ]
}
~~~

これは `band(4d3ed089fb60ab534684b7e9)` から `tag(4d3ed089fb60ab534684b7f2)` を参照し、`tag(4d3ed089fb60ab534684b7f2)` からも `band(4d3ed089fb60ab534684b7e9)` を参照しており、互いが互いを参照する構図を表しています。

シラサギでは、一般的にこのような参照の仕方はしません。
例として、シラサギのユーザーは複数のグループに所属し、グループは複数のユーザーを持ちます。
シラサギのユーザーとグループがどのように参照を持つか下に取り上げています。

~~~
# ss_user document.
{
  "_id" : 4,
  "name" : "一般ユーザー2",
  "uid" : "user2",
  "group_ids" : [ 6 ]
}

# ss_group document.
{
  "_id" : 6,
  "name" : "シラサギ市/危機管理部/管理課",
  "order" : 60
}
~~~

シラサギでは一方にのみ配列で参照を保持しており、上の例では、ユーザー(4)がグループ(6)への参照を持っていますが、グループ(6)はユーザーへの参照を持っていません。

一方にのみ配列で参照を保持するのがシラサギの一般的な参照の定義方法です。グループ(6)に所属するユーザーを取得したい場合は `SS::User.where(group_ids: 6)` とします。

主としてパフォーマンス上の理由から互いに参照を持ち合う場合もあるかもしれませんが、上記のように一方だけに参照を保持したほうがデータの不整合を起こしにくくなると思います。

### `label`

- 列挙型フィールドのラベル取得をサポートします。
- 例えば `state` フィールドが `public` または `closed` のどちらかの値を取り、`public` の場合に「公開」、`closed` の場合に「非公開」と表示したい場合、シラサギでは `@item.label :state` と書くことができます。
  - ActiveRecord などの例では列挙型フィールドの値として整数型をよく用いますが、シラサギでは列挙型フィールドの値として文字列型を使います。
  - なお、動作させるには `state_options` というメソッドを作成し、定義域と値域とを返す必要があります。

### `keyword_in` スコープ

- 複数フィールド検索メソッドです。
- 書式は `keywword_in('キーワード', 検索対象フィールド, オプション)` です。
- 使い方は `Article::Page.keyword_in('健康', :name, :html, { method: 'and' })` という風に使い、意味は「健康」という文字列を、name フィールドまたは html フィールドから検索します。
- 検索対象フィールドはいくらでも指定することができます。
- `'健康'` の部分ですが空白で区切ることで最大 4 つまでキーワードを設定できます。
  - 例: 「健康」と「メタボ」を検索する場合:<br/>
    `Article::Page.keyword_in('健康 メタボ', :name, :html, { method: 'and' })`
- 複数のフィールドを指定した場合は、フィールド内で and 検索を、フィールド間で or 検索を実行します。
  - 上記の例は「健康」と「メタボ」の両方が name フィールドに出現するか、「健康」と「メタボ」の両方が html フィールドに出現するドキュメントを検索します。
- 引数の最後にハッシュ型でオプションを指定することができます。現在は `method` というオプションのみ有効で、`method` には　`'and'` か `'any'` を設定することができます。
- `method` に `'and'` を指定した場合、他の検索条件と and 検索を実行します。`'any'` を指定した場合、他の検索条件と or 検索を実行します。既定値は `'and'` です。
  - 例: `Article::Page.keyword_in('健康 メタボ', :name, :html, { method: 'and' }).where({ category_ids: 1 })` という風に検索すると、`{ category_ids: 1 }` という検索条件とは and となり、「健康」と「メタボ」が `name` または `html` に出現し、かつ、カテゴリーが 1 の文書を検索します。
  - 例: `Article::Page.keyword_in('健康 メタボ', :name, :html, { method: 'any' }).where({ category_ids: 1 })` という風に検索すると、`{ category_ids: 1 }` という検索条件とは or となり、「健康」と「メタボ」が `name` または `html` に出現する文書、または、カテゴリーが 1 の文書を検索します。

### `search_text` スコープ

- 全文検索機能をて提供するメソッドですが、シラサギ内では現在のところ利用実績がなく、現在は単なる `name` フィールドを検索するメソッドです。

### `permit_params` と　`permitted_fields` メソッド

- Strong Parameters で利用を許可するフィールドを管理します。
- app/controllers/concerns/cms/public_filter/crud.rb, app/controllers/concerns/ss/crud_filter.rb などと組み合わせて利用します。

### `addon`, `addons`, `lookup_addons` メソッド

- モデルアドオンの基本機能を提供します。
- シラサギを使ったシステム開発をする上では意識する必要はありませんが、興味のある方は ソースコード `app/views/ss/crud/_addons_{form,show}.html.erb` をご覧ください。

### `SS::Fields::Normalizer` モジュール

基本的なフィールド正規化としてシラサギでは次の機能を提供します。

- 文字列型フィールド
  - [strip](https://docs.ruby-lang.org/ja/latest/method/String/i/strip.html) します。
    - `before_validation` コールバック内で実行されます。
- 全ての型
  - blank? が true の場合、当該フィールドを削除します。
    - `before_save` コールバック内で実行されます。
