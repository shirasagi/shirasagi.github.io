---
layout: default
title: template_variable_handlerを使用しないテンプレート
---

一部のテンプレートは`template_variable_handler`を使用せずに作成しています。`template_variable_handler`を使用しないため、レンダリングのタイミングが異なります。`Cms::PublicFilter::Layout`の`render_part`と`render_layout`にてテンプレートを定義しています。

~~~ruby
def render_template_variables(html)
  html.gsub!('#{page_name}') do
    ERB::Util.html_escape(@cur_item.name)
  end

  # 省略

  html
end
~~~

~~~html
<!-- 上部HTML -->
<nav id="category-list"><header><h2>#{parent.parent_name} &gt; #{parent_name}</h2></header>
~~~

以下に使用できるテンプレートを記述します。

### render_part

|テンプレート|説明|
|---|---|
|#{part_name}|パーツ名が表示されます|
|#{part_parent_name}|パーツのあるフォルダー名が表示されます|
|#{part_parent.parent_name}|パーツのあるフォルダーの親フォルダー名が表示されます|
|#{parent_name}|親フォルダーの名前が表示されます|
|#{parent.parent_name}|親フォルダーの親フォルダー名が表示されます|

### render_layout

|テンプレート|説明|
|---|---|
|#{page_name}|ページやフォルダーに設定しているタイトルが表示されます|
|#{parent_name}|親フォルダーの名前が表示されます|
|#{page_released}|ページの公開日時が「2015/4/1」の形式で表示されます|
|#{page_released.default}|ページの公開日時が「2015/4/1」の形式で表示されます|
|#{page_released.iso}|ページの公開日時が「2015-04-01」の形式で表示されます|
|#{page_released.long}|ページの公開日時が「2015年4月1日」の形式で表示されます|
|#{page_released.short}|ページの公開日時が「4/1」の形式で表示されます|
|#{page_updated}|ページの更新日時が「2015/4/1」の形式で表示されます|
|#{page_updated.default}|ページの更新日時が「2015/4/1」の形式で表示されます。|
|#{page_updated.iso}|ページの更新日時が「2015-04-01」の形式で表示されます。|
|#{page_updated.long}|ページの更新日時が「2015年4月1日」の形式で表示されます|
|#{page_updated.short}|ページの更新日時が「4/1」の形式で表示されます|
