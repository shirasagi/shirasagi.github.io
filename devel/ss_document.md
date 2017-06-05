---
layout: default
title: SS::Document
---

シラサギの全モデルが include しているモジュールで、次の基本機能を提供します。

### `created`, `updated` フィールド

- モデルの作成日時と更新日時を保持する 2 つのフィールドです。
- ActiveRecord をお使いの方ならご存知でしょうが ActiveRecord は標準で `created_at`, `updated_at` という 2 つのフィールドがあります。MongoDB ではこれらのフィールドは標準的には提供されていないため、SS::Document に定することで標準的に提供しています。
- `updated` フィールドの更新は `before_save` コールバック内にて実行されています。もし、更新時に `updated` フィールドを更新したくない場合、[Mongoid の Atomic](https://docs.mongodb.com/mongoid/master/tutorials/mongoid-persistence/#atomic) メソッドを用いて更新することで、すべてのコールバックを迂回させることで、`updated` フィールドを更新せず、他のフィールドを更新することができます。

### `t` と `tt` メソッド

- `t` メソッドはフィールドの名称 - ロケールが日本語の場合は日本語名を、それ以外の場合は英語名 - を取得するメソッドで、主にシラサギの view ファイルで `@model.t :name` という風に利用されています。
- `tt` メソッドは、フィールドに割り当てられているツールチップ - ロケールが日本語の場合は日本語のツールチップを、ロケールが英語の場合は英語のツールチップ - を取得するメソッドで、主にシラサギの view ファイルで `@model.tt :name` という風に利用されています。

### `seqid` メソッドと `SS::Fields::Sequencer` モジュール

- RDB でいう AUTO INCREMENT フィールドを作成する機能を提供します。作成されるフィールドの型は整数型です。
- 通常、MongoDB の主キーは [ObjectId](https://docs.mongodb.com/manual/reference/method/ObjectId/) 型ですが、本機能を用いることで主キーを AUTO INCREMENT 型の整数型フィールドに変更することができます。
- 主にシラサギでは主キーに対して `setid :id` という風に利用されています。

### `embeds_ids`

- 多対多リレーション機能を提供します。
- 注意点として MongoDB の多対多リレーションは RDB のように中間テーブルを作成しません。当該ドキュメント内に配列で参照先モデルの主キーを保持します。
- 使い方は `embeds_ids :categories, class_name: "Cms::Node"` という風に使い `category_ids` フィールドと `categories` メソッドの 2 つが作成されます。
- DB に保存されるのは `category_ids` フィールドで、参照先モデルの主キーの配列を持ちます。
- `categories` メソッドにアクセスすると、参照先のオブジェクトの一覧を表す `Mongoid::Criteria` が得られます。
- [Mongoid には同様の機能を持つ `has_and_belongs_to_many`](https://mongoid.github.io/old/en/mongoid/docs/relations.html#has_and_belongs_to_many) がありますが、機能的な差異はほとんどありませんが、1 点、`embeds_ids` には任意のメタデータを定義できるのに対して、`has_and_belongs_to_many` は任意のメタデータを定義できません。
  - シラサギではサイトコピー時にフィールを単にコピーすればよいのか、複製してコピーすればよいのか、複製時は初期化すればよいのかの制御にフィールドのメタデータを利用しています。

### `label`

- 列挙型フィールドのラベル取得をサポートします。
- 例えば `state` というフィールドが `public` または `closed` のどちらかの値を取り、`public` の場合に「公開」、`closed` の場合に「非公開」と表示したい場合、シラサギでは `@item.label :state` と書くことができます。
  - ActiveRecord などの例では列挙型フィールドの値として整数型をよく用いますが、シラサギでは列挙型フィールドの値として文字列型を使います。
  - なお、動作させるには `state_options` というメソッドを作成し、定義域と値域とを返す必要があります。

### `keyword_in` スコープ

- 複数フィールド検索メソッドです。
- 使い方は `Article::Page.keyword_in('健康', :name, :html, { method: 'and' })` という風に使い、意味は「健康」という文字列を、name フィールドと html フィールドから検索します。検索対象フィールドはいくらでも指定することができます。
- '健康' の部分ですが空白で区切ることで最大 4 つまでキーワードを設定できます。
  - 例: `Article::Page.keyword_in('健康 メタボ', :name, :html, { method: 'and' })`
- 複数のフィールドを指定した場合は、フィールド内で and 検索を、フィールド間で or 検索を実行します。
  - 上記の例は「健康」と「メタボ」を name フィールドに持つか、「健康」と「メタボ」を html フィールドにもつという風に解釈されます。
- 引数の最後にハッシュ型でオプションを指定することができます。現在は `method` というオプションのみ有効で、`method` には　`'and'` か `'any'` を設定することができます。
- `method` に `'and'` を指定した場合、他の検索条件と and 検索を実行します。`'any'` を指定した場合、他の検索条件と or 検索を実行します。既定値は `'and'` です。
  - 例: `Article::Page.keyword_in('健康 メタボ', :name, :html, { method: 'and' }).where({ category_ids: 1 })` という風に検索すると、`{ category_ids: 1 }` という検索条件とは and となります。
  - 例: `Article::Page.keyword_in('健康 メタボ', :name, :html, { method: 'any' }).where({ category_ids: 1 })` という風に検索すると、`{ category_ids: 1 }` という検索条件とは or となります。

### `search_text` スコープ

- 全文検索機能をて提供するメソッドですが、シラサギ内では現在のところ利用実績がなく、現在は単なる `name` フィールドを検索するメソッドです。

### `permit_params` と　`permitted_fields` メソッド

- Strong Parameters で利用を許可するフィールドを管理します。
- app/controllers/concerns/cms/public_filter/crud.rb, app/controllers/concerns/ss/crud_filter.rb などと組み合わせて利用します。

### `addon`, `addons`, `lookup_addons` メソッド

- モデルアドオンの基機能を提供します。
- シラサギを使ったシステム開発をする上では意識する必要はありませんが、興味のある方は ソースコード `app/views/ss/crud/_addons_{form,show}.html.erb` をご覧ください。

### `SS::Fields::Normalizer` モジュール

基本的なフィールド正規化としてシラサギでは次の機能を提供します。

- 文字列型フィールド
  - [strip](https://docs.ruby-lang.org/ja/latest/method/String/i/strip.html) します。
    - `before_validation` コールバック内で実行されます。
- 全ての型
  - blank? が true の場合、当該フィールドを削除します。
    - `before_save` コールバック内で実行されます。
