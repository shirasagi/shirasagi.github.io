---
layout: default
title: 条件分岐構文
---

`#{if 条件分岐タグ}内容A#{end}`のように記述することで、条件を満たすとき内容Aが表示されるような条件分岐が可能です。条件分岐構文はレイアウトやパーツの上部HTML、下部HTMLで使用できます。条件分岐構文として`if`, `elsif`, `else`が使用できます。条件分岐タグは特定の内容を表示する条件を設定するために使用します。

|条件分岐タグ|説明|
|---|---|
|is_page()|表示中の画面がページならばtrue, それ以外はfalseを返します。|
|is_page('docs')|表示中の画面が、ファイル名(フルパス)がdocsから始まるかつページならばtrue, それ以外はfalseを返します。|
|is_node()|表示中の画面がフォルダーならばtrue, それ以外はfalseを返します。|
|is_node('docs')|表示中の画面が、フォルダー名(フルパス)がdocsから始まるかつフォルダーならばtrue, それ以外はfalseを返します。|
|in_node('docs')|表示中の画面が、フォルダー名(フルパス)がdocsから始まるかつならばtrue, それ以外はfalseを返します。is_node('docs')とは異なりページでもtrueを返します。|
|has_pages()|表示中のフォルダーにページがある、または表示中のフォルダーのカテゴリーに所属しているならばtrue, それ以外はfalseを返します。|

ページとフォルダーで表示を変えたい場合は以下のように記述します。

~~~html
#{if is_page()}
  <p>#{parent_name} &gt; #{page_name}</p>
#{elsif is_node()}
  <p>#{page_name}</p>
#{end}
~~~

yield と組み合わせる事でフォルダー内にページが無い場合の表示を記述できます。

<div class="language-html highlighter-rouge"><div class="highlight"><pre class="highlight"><code>#{if has_pages()}
  <span class="nt">{</span><span class="nt">{</span><span class="nt"> yield </span><span>}</span><span>}</span>
#{else}
  <span class="nt">&lt;p&gt;</span>記事はありません。<span class="nt">&lt;/p&gt;</span>
#{end}
</code></pre></div></div>
