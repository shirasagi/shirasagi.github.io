---
layout: default
title: モデルアドオン設計
---

## モデルアドオンとは

フィールド定義と、それと関連するビュー等をひとまとめにして、モデルに組み込んでいくための機能を「モデルアドオン」と呼んでいます。

### モデルアドオンの構成要素

- フィールド定義
- フィールドのバリデーション
- フィールドの多言語化対応
- Strong Parameters のデフォルトフィルター
- 編集画面HTML
- 確認画面HTML

### モデルアドオンを使うことの利点

- 使い回しが効く。<br />
  => 同じコードを書かなくてよい。
- 関連する処理をファイル単位で切り出すことができる。<br />
  => コードの視認性/保守性が向上する。
- 部分的なHTMLのみ書けばよい。<br />
  => 編集/確認画面を手早く構築することができる。

## ファイル構成

例えば Cms::Addon::Name という名称のアドオンを作成するには以下のファイルを配置します。

- app/models/concerns/cms/addon/name.rb
- app/views/cms/agents/addons/name/_form.html.erb
- app/views/cms/agents/addons/name/_show.html.erb
- config/locales/cms/ja.yml

### モデル

~~~ruby
# app/models/concerns/cms/addon/name.rb

module Cms
  module Addon
    module Name
      # Concern として使用します。
      extend ActiveSupport::Concern

      # モデルアドオンとして使用するために必要です。
      extend SS::Addon

      included do
        # フィールドやリレーションを定義します。
        field :name, type: String

        # Strong Parameters で許可します。
        permit_params :name

        # 関連するバリデーションを定義します。
        validates :name, presence: true
      end
    end
  end
end
~~~

- 通常のモデルに書く内容と変わりはありませんが、関係する定義/処理のみを書く必要があります。

### 編集画面HTML

~~~erb
# app/views/cms/agents/addons/meta/_form.html.erb

<dl>
  <dt><%= @model.t :name %></dt>
  <dd><%= f.text_field :name %></dd>
</dl>
~~~

- `@model` - アドオンをインクルードしたクラスが取得できます。
- `f.` - form_for で生成される FormBuilder インスタンスです。

### 確認画面HTML

~~~erb
# app/views/cms/agents/addons/meta/_show.html.erb

<dl>
  <dt><%= @model.t :name %></dt>
  <dd><%= @item.send :name %></dd>
</dl>
~~~

- `@model` - アドオンをインクルードしたクラス
- `@item` -  @model のインスタンス

### 多言語設定

~~~yaml
# config/locales/cms/ja.yml

ja:
  modules:
    addons:
      cms/name: アドオン名
  mongoid:
    attributes:
      cms/addon/name:
        name: フィールド名
~~~

- `ja.modules.addons.module/addon_name`
  - アドオン名
  - 編集/確認画面で使用します。
- `ja.mongoid.attributes.module/addon/addon_name.field`
  - フィールド名
  - @model.t(:name) や エラーメッセージで使用します。
- 読み込み元のモデルクラスで設定する必要はなく、アドオンをインクルードするだけで使用できます。
