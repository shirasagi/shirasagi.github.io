---
layout: top
title: SearchUI
---

シラサギでは以下のようなオブジェクト選択UIがあります。

- モーダルを展開しオブジェクトを選択可能
- 複数選択、単数選択にカスタマイズ可能
- モーダル内で検索可能

本ドキュメントでは `Cms::Page` の選択UIを構成する要素について説明します。<br />
動作は管理画面の関連ページアドオンにて確認できます。

![関連ページ選択](/images/search_ui.png)

### 関連ページ選択の動作

- 選択リンクをクリック
- モーダルが展開される
- モーダル画面でページ名をクリック
- 元画面のHTMLに選択要素を追加しモーダルを閉じる

以下、各構成要素について記載します。

### @SS_SearchUI

`app/assets/javascripts/ss/lib/search_ui.coffee.erb`

選択UIの`JavaScript`です。<br />
次の箇所で実行しています。<br />

- モーダルの呼び出し側
- モーダル展開後のオブジェクト選択

~~~
class @SS_SearchUI
  @anchorAjaxBox

  @select: (item) ->
    ...

  @selectItems: ->
    ...

  @deselect: (e)->
    ...

  @toggleSelectButton: ()->
    ...

  @render: ()->
    ...

  @modal: (options = {})->
    ...
~~~

- `@anchorAjaxBox`
  - モーダル展開元リンクを保持しておく変数です。

- `@select`
  - オブジェクトを単一選択する際に実行する関数です。
  - モーダル内部でページの名前をクリックした際に実行されます。

- `@selectItems`
  - オブジェクトを複数選択する際に実行する関数です。

- `@deselect`
  - 選択状態を外す際に実行する関数です。
  - ページ選択後の削除リンクに該当します。

- `@render`
  - モーダルを呼び出す側の`view`でスクリプトを初期設定します。
  - `ss/script.coffee.erb` で呼び出しています。
  - `.ajax-selected` (テーブル)要素に対して選択した項目を追加します。

- `@modal`
  - モーダル内部の選択`view`でスクリプトを初期設定します。


### モーダル呼び出し側 view

`app/views/cms/agents/addons/related_page/_form.html.erb`

選択モーダルを呼び出す側の`view`です。<br />
アドオンの関連ページ選択部分になります。

~~~
<dl class="see mod-cms-related_pages">
  <dt><%= @model.t :related_pages %><%= @model.tt :page_ids %></dt>
  <dd>
    <%= f.hidden_field "related_page_ids[]", value: "", class: "hidden-ids" %>
    <%= link_to t("cms.apis.pages.index"), cms_apis_pages_path, class: "ajax-box" %>
  </dd>
  <dd>
    <table class="index ajax-selected">
      <thead>
        <tr>
          <th class="name"><%= @model.t :name %></th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <% @item.related_pages.each do |page| %>
        <tr data-id="<%= page.id %>">
          <td><%= f.hidden_field "related_page_ids[]", value: page.id %> <%= page.name %></td>
          <td><%= link_to t("views.button.delete"), "#", class: "deselect btn" %></td>
        </tr>
        <% end %>
        <tr style="display:none" <%= raw(@item.present? ? "data-id=#{@item.id}" : "") %>></tr>
      </tbody>
    </table>
  </dd>
</dl>
~~~

- `<%= f.hidden_field "related_page_ids[]", value: "", class: "hidden-ids" %>`
  - `related_page_ids[]` が保存すべき属性（input の name 属性） に対応します。
  - `class="hidden-ids"` を付与し、 `@SS_SearchUI` から取得できるようにしています。

- `<%= link_to t("cms.apis.pages.index"), cms_apis_pages_path, class: "ajax-box" %>`
  - モーダル展開側コントローラへのリンクを設置しています。
  - リンクに `class="ajax-box"` を付けることで、モーダル展開となります。
  - このリンクをクリックすることでオブジェクト（`Cms::Page`）を選択するモーダルが出現します。

- `<table class="index ajax-selected">`
  - 選択した要素が挿入されるテーブルになります。
  - `class="ajax-selected"` を付与し `@SS_SearchUI` から参照しています。
  - すでに保存済みの要素は `<% @item.related_pages.each do |page| %> ... <% end %>` のブロックで展開しています。

- `<tr data-id="<%= page.id %>"> ... </tr>`
  - 選択された要素に対応します。
  - 選択対象のIDを `data-id` 属性として `@SS_SearchUI` で使用しています。

### モーダル展開側 controller

`app/controllers/concerns/cms/api_filter.rb`
`app/controllers/apis/pages_controller`

モーダル展開側のコントローラとモジュールです。<br />
`Apis`を含む命名規則としています。

~~~
module Cms::ApiFilter
  extend ActiveSupport::Concern
  include Cms::BaseFilter
  include SS::CrudFilter
  include SS::AjaxFilter

  def index
    @single = params[:single].present?
    @multi = !@single

    @items = @model.site(@cur_site).
      search(params[:s]).
      order_by(_id: -1).
      page(params[:page]).per(50)
  end
end
~~~

~~~
class Cms::Apis::PagesController < ApplicationController
  include Cms::ApiFilter

  model Cms::Page

  def routes
    @items = @model.routes
  end
end
~~~

- `model`
  - 選択対象となるオブジェクトの`class`を設定しています。
- `@single`
  - 単数選択時のオプションです。
  - `@single` に値を入れていなければ複数選択となる想定です。
  - 現状、`api`によってサポートしている箇所、していない箇所があります。
    - 関連ページは現状複数選択のみなので未対応です。
    - 拡張する場合は`view`に `@single` の `hidden_field` を追加します。
- `#routes`
  - `Cms::Page` の `route` 属性一覧を返すアクションです。
  - 関連ページの選択には利用していません。

### モーダル展開側 view

`app/views/cms/apis/pages/index.html.erb`

モーダル展開側(モーダル内部)の`view`です。

~~~
<%= jquery do %> SS_SearchUI.modal(); <% end %>

<div class="search-ui-form">
<%= form_for :s, url: { action: :index }, html: { method: "GET", class: :search } do |f| %>
  <%= f.text_field :name, value: params[:s].try(:[], :name) %>
  <%= f.submit  t("cms.apis.pages.search"), class: :btn %>
<% end %>
</div>

<table class="index">
  <thead class="list-head">
    <tr>
      <th class="checkbox"><input type="checkbox" /></th>
      <th class="name"><%= @model.t :name %></th>
      <th class="filename"><%= @model.t :filename %></th>
      <th class="updated"><%= @model.t :updated %></th>
    </tr>
  </thead>
  <tbody class="items">
    <% @items.each do |item| %>
      <tr data-id="<%= item.id %>" class="list-item">
        <td class="checkbox">
          <input type="checkbox" name="ids[]" value="<%= item.id %>" />
        </td>
        <td class="name"><%= link_to item.name, "#", class: "select-item" %></td>
        <td class="filename"><%= item.filename %></td>
        <td class="updated"><%= item.updated.strftime("%Y/%m/%d %H:%M") %></td>
      </tr>
    <% end %>
  </tbody>
</table>

<div class="search-ui-select">
  <%= button_tag t("cms.apis.pages.select"), { type: :button, class: "select-items btn" } %>
</div>

<%= paginate @items if @items.try(:current_page) %>
~~~

- `<%= jquery do %> SS_SearchUI.modal(); <% end %>`
  - モーダルの中では `@modal` を呼び出して、以下のイベントをハンドルします。
    - 単数選択のクリックイベント
    - 複数選択のクリックイベント
    - 検索とフォームのサブミットイベント
    - ページネーションのクリックイベント
  - また、ページネーションに対応する為、既に選択されている項目はグレーアウトされます。

- `<tr data-id="<%= item.id %>" class="list-item"> ... </tr>`
  - 選択対象の要素です。
  - 選択時、この要素の `data-id` 属性と `tr`タグをモーダル呼び出し側の `view` に `append` します。

- `<%= link_to item.name, "#", class: "select-item" %>`
  - 単数選択のリンクです。
  - `class="select-item"` を付与しイベントをハンドルしています。

- `<%= button_tag t("cms.apis.pages.select"), { type: :button, class: "select-items btn" } %>`
  - 複数選択のボタンです。
  - `class="select-items"` を付与しイベントをハンドルしています。

### モーダル展開側 routes

`app/views/cms/apis/pages/index.html.erb`

モーダル展開側のコントローラにもルーティングが必要です。<br />
以下に記述されています。

~~~
namespace "cms", path: ".s:site/cms" do
  ...
  namespace "apis" do
    ...
    get "pages" => "pages#index"
    ...
  end
  ...
end
~~~
