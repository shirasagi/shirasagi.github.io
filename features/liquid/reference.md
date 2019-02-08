---
layout: default
title: リファレンス
---

## Global Variables

| 変数    | 説明 |
|--------|--------------------------------------------|
| pages  | ページの配列
| nodes  | ノードの配列
| parts  | パーツ管理
| part   | 描画中のパーツ
| node   | 描画中のノード
| page   | 描画中のパーツ
| values | 描画中のフォームの入力値
| value  | 描画中のブロックの入力値

## pages

記事リストやカテゴリーページリストなどページの一覧を表示するノードのループ HTML で使用でき、
既定では次のようなレイアウトを描画します。

{% highlight HTML %}
{% raw %}
{{ for page in pages }}
<article class="item-{{ page.css_class }} {% if page.new? %}new{% endif %} {% if page.current? %}current{% endif %}">
  <header>
    <time datetime="{{ page.date }}">{{ page.date | ss_date: "long" }}</time>
    <h2><a href="{{ page.url }}">{{ page.index_name | default: page.name }}</a></h2>
  </header>
</article>
{{ endfor }}
{% endraw %}
{% endhighlight %}

## nodes

カテゴリーリストなどノードの一覧を表示するノードのループ HTML で使用でき、
既定では次のようなレイアウトを描画します。

{% highlight HTML %}
{% raw %}
{% for node in nodes %}
<article class="item-{{ node.css_class }} {% if node.current? %}current{% endif %}">
  <header>
     <h2><a href="{{ node.url }}">{{ node.name }}</a></h2>
  </header>
</article>
{% endfor %}
{% endraw %}
{% endhighlight %}

## parts

だいたいどこでも使用できパーツの一覧へのアクセスを提供します。
ただし、ループで全パーツを取り出すといった利用方法はできません。

共通で利用できる部分をパーツとして定義しておき、ループ HTML で利用したり、
定型フォームで利用したりすることを想定しています。

{% highlight HTML %}
{% raw %}
{{ parts["loop_header"].html }}

{% for node in nodes %}
<article class="item-{{ node.css_class }} {% if node.current? %}current{% endif %}">
  <header>
     <h2><a href="{{ node.url }}">{{ node.name }}</a></h2>
  </header>
</article>
{% endfor %}

{{ parts["loop_footer].html }}

{% endraw %}
{% endhighlight %}

## part

パーツのループ HTML 内などで、描画中のパーツを表します。
また、`parts["loop_header"]` などは `part` を返します。

| 変数    | 説明 |
|--------|--------------------------------------------|
| part.html | パーツの HTML
| part.id | パーツの ID
| part.name | パーツの名前
| part.url | パーツの URL
| part.full_url | パーツのフルURL
| part.basename | パーツのURLのベース名
| part.filename | パーツのファイル名
| part.parent | パーツがフォルダー内にある場合、そのフォルダー

## page

定型フォームのレイアウト内で、描画中のページを表します。
また、`pages` をループで展開した場合は `page` を返します。

| 変数    | 説明 |
|--------|--------------------------------------------|
| page.id | ページの ID
| page.name | ページの名前
| page.index_name | ページの一覧名
| page.url | ページの URL
| page.full_url | ページのフルURL
| page.basename | ページのURLのベース名
| page.filename | ページのファイル名
| page.order | ページの並び順
| page.date | ページの日時
| page.released | ページの公開日時
| page.updated | ページの更新日時
| page.created | ページの作成日時
| page.parent | ページがフォルダー内にある場合、そのフォルダー
| page.css_class | ページの CSS クラス
| page.new? | ページが新着の場合 true
| page.current? | ページが現在の場合 true
| page.summary | ページのサマリー
| page.description | ページの概要
| page.thumb | ページのイメージ
| page.html | ページの HTML
| page.values | ページのフォームに入力された入力値
| page.categories | ページに関連付けられたカテゴリー
| page.event_name | ページに設定されたイベントタイトル
| page.event_dates | ページに設定されたイベント日
| page.event_deadline | ページに設定されたイベントの申込締切
| page.map_points | ページに設定された地図の地点
| page.map_zoom_level | ページに設定された地図のズームレベル
| page.contact_state | ページに設定された連絡先の表示設定
| page.contact_group | ページに設定された連絡先の所属
| page.contact_charge | ページに設定された連絡先の担当
| page.contact_tel | ページに設定された連絡先の電話番号
| page.contact_fax | ページに設定された連絡先のファックス番号
| page.contact_email | ページに設定された連絡先のメールアドレス
| page.contact_link_url | ページに設定された連絡先のリンクURL
| page.contact_link_name | ページに設定された連絡先のリンク名
| page.tags | ページのタグ
| page.groups | ページの管理グループ

## node

`nodes` をループで展開した場合は `node` を返します。
また、`part.parent` や `page.parent` は `node` を返します。

| 変数    | 説明 |
|--------|--------------------------------------------|
| node.id | ノードの ID
| node.name | ノードの名前
| node.index_name | ノードの一覧名
| node.url | ノードの URL
| node.full_url | ノードのフルURL
| node.basename | ノードのURLのベース名
| node.filename | ノードのファイル名
| node.order | ノードの並び順
| node.date | ノードの日時
| node.current? | ノードが現在の場合 true
| node.released | ノードの公開日時
| node.updated | ノードの更新日時
| node.created | ノードの作成日時
| node.parent | ノードがフォルダー内にある場合、そのフォルダー
| node.css_class | ノードの CSS クラス
| node.nodes | ノードのサブノート
| node.pages | ノード内にあるページ、または、カテゴリーとして関連付けられているページ、または、検索条件 URL として設定されているノード内のページ、または、検索条件 URL として設定されているノードにカテゴリーとして関連付けられているページ、または、これらすべてのページ
| node.groups | ノードの管理グループ

## values

定形フォームのレイアウトではグローバル変数として存在しています。
また `pages.values` は `values` を返します。

## value

ブロックのレイアウトではグローバル変数として存在しています。
共通で取得できる値と、型に応じて取得できる値とがあります。

### 共通

| 変数         | 説明 |
|-------------|--------------------------------------------|
| value.name  | ブロックの名称
| value.alignment | ブロックの配置
| value.html  | 設定にしたがって入力値を HTML 化したもので既定値です。{% raw %}`{{ value }}`{% endraw %} と同じです。
| value.type  | ブロックの型を表す文字列

### 一行入力

| 変数         | 説明 |
|-------------|--------------------------------------------|
| value.value | 入力された文字列

### 日付入力

| 変数         | 説明 |
|-------------|--------------------------------------------|
| value.date  | 入力された日時
| value.value | {% raw %}`{{ value.date | ss_date }}`{% endraw %} と同じ文字列

### URL入力

| 変数         | 説明 |
|-------------|--------------------------------------------|
| value.link | 入力された文字列
| value.label | 入力された文字列

### 複数行入力

| 変数         | 説明 |
|-------------|--------------------------------------------|
| value.value | 入力された文字列

### ドロップダウン

| 変数         | 説明 |
|-------------|--------------------------------------------|
| value.value | 選択された選択肢

### ラジオボタン

| 変数         | 説明 |
|-------------|--------------------------------------------|
| value.value | 選択された選択肢

### チェックボックス

| 変数         | 説明 |
|-------------|--------------------------------------------|
| value.values | 選択された選択肢（複数）
| value.value | {% raw %}`{{ value.values | join: ", " }}`{% endraw %} と同じ文字列

### ファイルアップロード

TBD

### 見出し入力

| 変数         | 説明 |
|-------------|--------------------------------------------|
| value.head  | h1, h2, h3, h4 のいずれか
| value.text  | 入力された文字列

### リスト入力

| 変数         | 説明 |
|-------------|--------------------------------------------|
| value.list_type | リスト種類。ol か ul のどちらか。
| value.lists  | リストが配列で返るs。

### YouTube埋め込み

| 変数         | 説明 |
|-------------|--------------------------------------------|
| value.youtube_id  | YouTube Id です。
| value.width  | ビデオの横幅です。
| value.height  | ビデオの高さです。
| value.auto_width  | ビデオを画面の横幅に合わせるかどうかを示し、"enabled" のとき、横幅に合わせるようにします。

### 自由入力

| 変数         | 説明 |
|-------------|--------------------------------------------|
| value.value | 入力されたHTML

### 表

| 変数         | 説明 |
|-------------|--------------------------------------------|
| value.value | 入力されたHTML

## Filters

| フィルター    | 説明 |
|-------------|--------------------------------------------|
| ss_date     | 日付を文字列に変換
| ss_time     | 日時を文字列に変換
| delimited   | 数値を 3 桁区切り文字列に変換
| human_size  | 数値を人が視認しやすいサイズ表現に変換。<br />例: `123456789` を `118 MB`
| ss_append   | 末尾に指定された文字列を追加
| ss_prepend  | 先頭に指定された文字列を追加
| ss_img_src  | HTML 形式の文字列から先頭の &lt;img> タグの `src` 属性を抜き出す。
| expand_path | 相対パスを絶対パスに変換

[Liquid](https://shopify.github.io/liquid/) 標準のフィルターも使用できます。
