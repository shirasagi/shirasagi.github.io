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
{% for page in pages %}
<article class="item-{{ page.css_class }} {% if page.new? %}new{% endif %} {% if page.current? %}current{% endif %}">
  <header>
    <time datetime="{{ page.date }}">{{ page.date | ss_date: "long" }}</time>
    <h2><a href="{{ page.url }}">{{ page.index_name | default: page.name }}</a></h2>
  </header>
</article>
{% endfor %}
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
| page.event_recurrences | 繰り替えしイベント情報
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
| page.summarized_categories | サマリーページを設定したカテゴリー

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
| node.summary_page | ノードのサマリーページ

## values

定型フォームのレイアウトではグローバル変数として存在しています。
また `pages.values` は `values` を返します。

## value

ブロックのレイアウトではグローバル変数として存在しています。
共通で取得できる値と、型に応じて取得できる値とがあります。

### 共通

| 変数         | 説明 |
|-------------|--------------------------------------------|
| value.name  | ブロックの名称
| value.alignment | ブロックの配置。`flow`, `center`, `left`, `right` のいずれかの文字列。
| value.html  | 設定にしたがって入力値を HTML 化したもので既定値です。{% raw %}`{{ value }}`{% endraw %} と同じです。
| value.type  | ブロックの型を表す文字列

### 一行入力

| 変数         | 説明 |
|-------------|--------------------------------------------|
| value.html  | 設定にしたがって入力値を HTML 化したもので既定値です。既定では {% raw %}`{{ value.value | sanitize }}`{% endraw %} と同じです。
| value.value | 入力された文字列

### 日付入力

| 変数         | 説明 |
|-------------|--------------------------------------------|
| value.html  | 設定にしたがって入力値を HTML 化したもので既定値です。既定では {% raw %}`{{ value.date | ss_date: "long" }}`{% endraw %} と同じです。
| value.date  | 入力された日時
| value.value | {% raw %}`{{ value.date | ss_date: "long" }}`{% endraw %} と同じ文字列

### URL入力

| 変数         | 説明 |
|-------------|--------------------------------------------|
| value.html  | 設定にしたがって入力値を HTML 化したもので既定値です。既定では {% raw %}`<a href="{{ value.link_url }}">{{ value.link_label | default: value.link_url }}</a>`{% endraw %} と同じです。
| value.link_url | リンクURL
| value.link_label | リンクテキスト
| value.link_target | リンクターゲット。`_blank` か空文字列。 

### 複数行入力

| 変数         | 説明 |
|-------------|--------------------------------------------|
| value.html  | 設定にしたがって入力値を HTML 化したもので既定値です。既定では {% raw %}`{{ value.value | newline_to_br | sanitize }}`{% endraw %} と同じです。
| value.value | 入力された文字列

### ドロップダウン

| 変数         | 説明 |
|-------------|--------------------------------------------|
| value.html  | 設定にしたがって入力値を HTML 化したもので既定値です。既定では {% raw %}`{{ value.value | sanitize }}`{% endraw %} と同じです。
| value.value | 選択された選択肢

### ラジオボタン

| 変数         | 説明 |
|-------------|--------------------------------------------|
| value.html  | 設定にしたがって入力値を HTML 化したもので既定値です。既定では {% raw %}`{{ value.value | sanitize }}`{% endraw %} と同じです。
| value.value | 選択された選択肢

### チェックボックス

| 変数         | 説明 |
|-------------|--------------------------------------------|
| value.html  | 設定にしたがって入力値を HTML 化したもので既定値です。既定では {% raw %}`{{ value.value | sanitize }}`{% endraw %} と同じです。
| value.values | 選択された選択肢（複数）
| value.value | {% raw %}`{{ value.values | join: ", " }}`{% endraw %} と同じ文字列

### ファイルアップロード

| 変数         | 説明 |
|-------------|--------------------------------------------|
| value.html  | 設定にしたがって入力値を HTML 化したもので既定値です。既定値は下を参照。
| value.file_type | アップロードの種類。`image`, `attachment`, `video`, `banner` のいずれかの文字列。
| value.file | ファイル
| value.file_label | ファイルのタイトル
| value.text | （ビデオアップロードの場合のみ有効）ビデオの説明
| value.image_html_type | （画像アップロードの場合のみ有効）画像のリンク形式。`image` または `thumb` のいずれかの文字列。
| value.link_url | （バナーの場合のみ有効）リンクURL


#### value.file_type が image の場合の value.html

{% raw %}
~~~
<img src="{{ value.file.url }}" alt="{{ value.file_label || default: value.file.humanized_name }}">
~~~
{% endraw %}

#### value.file_type が attachment の場合の value.html

{% raw %}
~~~
<a href="{{ value.file.url }}">{{ value.file_label | default: value.file.name  }} ({{ value.file.extname | upcase }} {{ value.file.size | human_size }})</a>
~~~
{% endraw %}

#### value.file_type が video の場合の value.html

{% raw %}
~~~
<div>
  <video src="{{ value.file.url }}" controls="controls"></video>
  <div>{{ value.text | newline_to_br }}</div>
</div>
~~~
{% endraw %}

#### value.file_type が banner の場合の value.html

{% raw %}
~~~
<a href="{{ value.link_url }}">
  <img src="{{ value.file.url }}" alt="{{ value.file_label | default: value.file.humanized_name }}">
</a>
~~~
{% endraw %}

### 見出し入力

| 変数         | 説明 |
|-------------|--------------------------------------------|
| value.html  | 設定にしたがって入力値を HTML 化したもので既定値です。既定では {% raw %}`<{{ value.head }}>{{ value.text | sanitize }}</{{ value.head }}>`{% endraw %} と同じです。
| value.head  | h1, h2, h3, h4 のいずれか
| value.text  | 入力された文字列

### リスト入力

| 変数         | 説明 |
|-------------|--------------------------------------------|
| value.html  | 設定にしたがって入力値を HTML 化したもので既定値です。既定では<br/>{% raw %}&lt;{{ value.list_type }}><br/>  {% for list in value.lists %}<br/>  &lt;li>{{ list \| sanitize }}&lt;/li><br/>  {% endfor %}<br/>&lt;/{{ value.list_type }}>{% endraw %}<br/>と同じです。
| value.list_type | リスト種類。ol か ul のどちらか。
| value.lists    | リストが配列で返る。

### YouTube埋め込み

| 変数         | 説明 |
|-------------|--------------------------------------------|
| value.html  | 設定にしたがって入力値を HTML 化したもので既定値です。既定では {% raw %}`<iframe src="https://www.youtube.com/embed/{{ value.youtube_id }}" width="{{ value.width }}" height="{{ value.height }}" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen="allowfullscreen"></iframe>`{% endraw %} と同じです。
| value.youtube_id  | YouTube Id です。
| value.width  | ビデオの横幅です。
| value.height  | ビデオの高さです。
| value.auto_width  | ビデオを画面の横幅に合わせるかどうかを示し、"enabled" のとき、横幅に合わせるようにします。

### 自由入力

| 変数         | 説明 |
|-------------|--------------------------------------------|
| value.html  | 設定にしたがって入力値を HTML 化したもので既定値です。既定では {% raw %}`{{ value.value }}`{% endraw %} と同じです。
| value.value | 入力されたHTML
| value.files | アップロードされたファイル

### 表

| 変数         | 説明 |
|-------------|--------------------------------------------|
| value.html  | 設定にしたがって入力値を HTML 化したもので既定値です。既定では {% raw %}`{{ value.value | newline_to_br }}`{% endraw %} と同じです。
| value.value | 入力されたHTML

## groups

`page.groups` や `node.groups` は `groups` を返し、グループの一覧を表します。

## group

| 変数         | 説明 |
|-------------|--------------------------------------------|
| group.name  | グループ名
| group.full_name  | グループ名の "/" を " " に置き換えたもの
| group.section_name  | グループ名の先頭の要素を除いて "/" を " " に置き換えたもの
| group.trailing_name  | グループ名からグループ階層を除いた末端の名前
| group.last_name  | グループ名の最後の要素

## files

自由入力の `value.files` は `files` を返し、ファイルの一覧を表します。

## file

| 変数         | 説明 |
|-------------|--------------------------------------------|
| file.name   | ファイルの日本語名
| file.extname | ファイルの拡張子
| file.size   | ファイルのサイズ
| file.humanized_name | ファイルの日本語名の可読形式
| file.filename | ファイルの物理名
| file.basename | ファイルのベース名
| file.url    | ファイルの URL
| file.thumb_url | ファイルのサムネイル URL（ただしファイルが画像の場合）
| file.image?  | ファイルが画像の場合 true

## event_recurrence

`page.event_recurrences` の要素です。

| 変数                              | 説明                                       |
|-----------------------------------|--------------------------------------------|
| event_recurrence.start_date       | イベントの開始日   |
| event_recurrence.start_datetime   | イベントの開始日時   |
| event_recurrence.end_date         | イベントの終了日（含まない）   |
| event_recurrence.end_datetime     | イベントの終了日時（含まない）   |
| event_recurrence.until_date       | イベントの繰り返し終了日   |
| event_recurrence.day_of_weeks     | 曜日（日から土）   |
| event_recurrence.includes_holiday | 祝日を含むかどうか   |
| event_recurrence.exclude_dates    | 除外日   |
| event_recurrence.to_long_html     | 繰り返しイベントの内容を簡潔に表す説明 |

start_date と start_datetime は同じ値を返し、前者は日付型で後者は日時型で取得します。end_date と end_datetime も同様で同じ値を返し、前者は日付型で後者は日時型で取得します。

例えば 2022/6/1 から 2022/6/30 までの繰り返しイベントを設定した場合、start_date, end_date そして until_date はそれぞれ以下のようになります。

| 変数                              | 値           |
|-----------------------------------|--------------|
| event_recurrence.start_date       | 2022/06/01   |
| event_recurrence.end_date         | 2022/06/02   |
| event_recurrence.until_date       | 2022/06/30   |

## Filters

| フィルター                  | 説明 |
|------------------------|--------------------------------------------|
| ss_date                | 日付を文字列に変換
| ss_time                | 日時を文字列に変換
| delimited              | 数値を 3 桁区切り文字列に変換
| human_size             | 数値を人が視認しやすいサイズ表現に変換。<br />例: `123456789` を `118 MB`
| ss_append              | 末尾に指定された文字列を追加
| ss_prepend             | 先頭に指定された文字列を追加
| ss_img_src             | HTML 形式の文字列から先頭の &lt;img> タグの `src` 属性を抜き出す。
| expand_path            | 相対パスを絶対パスに変換
| sanitize               | HTML として不適切な文字を削除
| public_list            | フォルダーのページ一覧を取得
| filter_by_column_value | 定型フォームの値でページ一覧を絞り込み
| sort_by_column_value   | 定型フォームの値でページ一覧を並び替え
| same_name_pages        | ページとタイトルが一致するページ一覧を取得
| event_active_recurrences | 有効な繰り返しイベントのみを選択します。<br />例: `page.event_recurrences | event_active_recurrences` のようにして使用します。
| event_recurrence_summary | 繰り返しイベントの内容を簡潔に表す説明。<br />例: `<p>page.event_recurrences | event_active_recurrences | event_recurrence_summary</p>`

[Liquid](https://shopify.github.io/liquid/) 標準のフィルターも使用できます。


### ss_date / ss_time についての補足

ss_date と ss_time とは、日時データを指定されたフォーマットにしたがって文字列に変換するフィルターで、 {% raw %}`{{ page.date | ss_date: <format> }}`{% endraw %} のように指定します。

`format` には日時データのフォーマット文字列を指定し、[strftime](https://docs.ruby-lang.org/ja/latest/method/Time/i/strftime.html) メソッドと同じフォーマット文字列を使用することができます。また、事前に定義されたフォーマット文字列がいくつか提供されており、{% raw %}`{{ page.date | ss_date: "default" }}`{% endraw %} のようにして利用することもできます。

`format` を省略すると "default" が指定されたものとみなされます。

ss_date で利用できる事前定義フォーマット:

| format    | フォーマット文字列 |
|-----------|--------------|
| "default" | '%Y/%1m/%1d' |
| "iso"     | '%Y-%m-%d' |
| "long"    | '%Y年%1m月%1d日' |
| "short"   | '%1m/%1d' |
| "picker"   | '%Y/%m/%d' |

ss_time で利用できる事前定義フォーマット:

| format    | フォーマット文字列 |
|-----------|--------------|
| "default" | '%Y/%1m/%1d %H:%M' |
| "iso"     | '%Y-%m-%d %H:%M' |
| "long"    | '%Y年%1m月%1d日 %H時%M分' |
| "short"   | '%y/%m/%d %H:%M' |
| "picker"  | '%Y/%m/%d %H:%M' |

標準のフィルターに [date](https://shopify.github.io/liquid/filters/date/) というフィルターがありますが、標準フィルター `date` との違いは次の点です。

- date は事前定義フォーマットを利用できないが、ss_date / ss_time は利用できる。
- data は曜日（"%a" や "%A" など）が英語の曜日に変換されますが、ss_date / ss_time は日本語の曜日に変換されます。

### public_list についての補足

public_list はフォルダーのページ一覧を取得するフィルターで、 {% raw %}`{{ assign items = node | public_list: <limit> }}`{% endraw %} のように指定します。

`limit` には取得するページの件数を指定します。

`limit` を省略するとページを全件取得します。

### filter_by_column_value についての補足

filter_by_column_value は定型フォームの値でページ一覧を絞り込みするフィルターで、 {% raw %}`{{ assign items = pages | filter_by_column_value: "<key>.<value>" }}`{% endraw %} のように指定します。

`key` には定型フォームの項目の名前を指定します。 `value` には定型フォームの項目の値を指定します。 `key` で指定した定型フォームの項目の値が `value` と一致しているものを絞り込みます。

### sort_by_column_value についての補足

sort_by_column_value は定型フォームの値でページ一覧を並び替えするフィルターで、 {% raw %}`{{ assign items = pages | sort_by_column_value: "<key>" }}`{% endraw %} のように指定します。

`key` には定型フォームの項目の名前を指定します。 `key` で指定した定型フォームの項目の値を昇順で並び替えます。

### same_name_pages についての補足

same_name_pages はページとタイトルが一致するページ一覧を取得するフィルターで、 {% raw %}`{{ assign items = page | same_name_pages: "<filename>" }}`{% endraw %} のように指定します。

`filename` には取得するページのフォルダー名を指定します。

`filename` を省略すると名前の一致するページを全件取得します。
