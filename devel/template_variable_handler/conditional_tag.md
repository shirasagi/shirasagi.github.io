---
layout: default
title: 条件分岐構文
---

`#{if 条件分岐タグ}内容A#{end}`のように記述することで、条件を満たすとき内容Aが表示されるような条件分岐が可能です。条件分岐構文はレイアウトやパーツの上部HTML、下部HTMLで使用できます。条件分岐構文として`if`, `elsif`, `else`が使用できます。条件分岐タグは特定の内容を表示する条件を設定するために使用します。

|条件分岐タグ|説明|
|---|---|
|is_page()|ページならばtrue, それ以外はfalseを返します。|
|is_node()|フォルダーならばtrue, それ以外はfalseを返します。|
|in_node('docs')|ファイル名がdocsから始まるならばtrue, それ以外はfalseを返します。|
|has_pages()|現在のフォルダーにページがある、または現在のフォルダーのカテゴリーに所属しているならばtrue, それ以外はfalseを返します。|

詳細な動作は`Cms::PublicFilter::ConditionalTag`に記述しています。正規表現のために`conditional_tag_template`と`conditional_tag_data`というメソッドを作成しています。テンプレートに記述した条件分岐構文に応じてメソッドを作成しています。条件分岐タグは`conditional_tag_handler`というメソッドで判別しています。

~~~ruby
def conditional_tag_handler(matchdata, data)
  case matchdata[:cond]
  when 'is_page' then condition = @cur_page && @cur_page.filename.to_s.start_with?(matchdata[:path])

  # 省略

  else return false
  end
  @data = condition ? data : false
end
~~~

使用例を以下に記述します。

~~~html
#{if is_page()}
<p>#{parent_name} &gt; #{page_name}</p>
#{elsif is_node()}
<p>#{page_name}</p>
#{end}

<p>
#{if in_node('docs')}
#{parent_name}
#{end}
#{if is_page('docs')}
 &gt; #{page_name}
#{end}
</p>
~~~
<div class="language-html highlighter-rouge"><div class="highlight"><pre class="highlight"><code>#{if has_pages()}
<span class="nt">{</span><span class="nt">{</span><span class="nt"> yield </span><span>}</span><span>}</span>
#{else}
<span class="nt">&lt;p&gt;</span>記事はありません。<span class="nt">&lt;/p&gt;</span>
#{end}
</code></pre></div></div>
