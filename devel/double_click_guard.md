---
layout: default
title: ダブルクリック防御
---

## 既定でダブルクリック防御を有効化

Rails にはフォームのボタン上でのダブルクリックを防御するための仕組みが備わっており、シラサギではこれを無効にしておりましたが、v1.1x.y から有効にしました。
`config/environments/production.rb` の `config.action_view.automatically_disable_submit_tag` という設定がそれで、`false` だったものを `true` へと変更しました。

この設定によりフォーム内の `<input type="submit" ...` や `<button type="submit" ...` は自動でダブルクリック防御が有効になります。

## ダブルクリック防御のタイムアウト

既定では 2 秒以内に画面遷移が発生しない場合、もう一度ボタンを押すことができるようになります。これを変更したい場合 `<form>` 要素に `data-ss-timeout` で、もう一度ボタンを押せるようになるまでの時間をミリ秒で設定します。
例:

~~~ruby
<%= form_for :item, url: { action: :download_all }, html: { id: "item-form", method: :post, multipart: true, autocomplete: :off, data: { ss_timeout: 5000 } } do |f| %>
~~~

## 通常のボタンでダブルクリック防御を有効化する場合

これは `<form>` 内のボタンかそうでないかで対応方法が異なります。

### `<form>` 内のボタンの場合

`data-disable` 属性をつけることでダブルクリック防御が有効になります。
例:

~~~ruby
<%= f.button t("ss.buttons.download"), name: "download", class: "download btn-primary", data: { disable: '' } %>
~~~

このボタンをクリックすると、同一フォーム内の他の `<input type="submit" ...` や `<button type="submit" ...` も無効になります。

### `<form>` 外のボタンの場合

`class` 属性に "ss-dc-guard" をつけます。
例:

~~~ruby
<input type="button" value="CSV" class="btn btn-csv ss-dc-guard" />
~~~

これをつけたボタンも 2 秒以内に画面遷移が発生しない場合はもう一度押すことができるようになり、変更したい場合は `data-ss-timeout` 属性でもう一度ボタンを押せるようになるまでの時間をミリ秒で設定します。

## ダブルクリック防御を無効にしたい場合

`<%= f.submit t("ss.buttons.search"), name: "search", class: "search btn-primary", data: { disable_with: false } %>` のように `data: { disable_with: false }` を指定します。
これでダブルクリック防御が無効になります。
