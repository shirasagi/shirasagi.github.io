---
layout: default
title: ループHTML変数の一覧と使用例(template_variable_handler)
---

## template_variable_handlerとは

`template_variable_handler`はフォルダー、パーツ、レイアウトなどで使用できるテンプレートを提供する機能です。基本的な動きは`SS::TemplateVariable`というモジュールに記述しています。モデルで`template_variable_handler`というメソッドを使用することで、テンプレートで使用したい記述と、それに対して実行するメソッドを配列にしてインスタンス変数に格納します。

~~~ruby
extend ActiveSupport::Concern
include SS::TemplateVariable

included do
  template_variable_handler(:name, :template_variable_handler_name)
end

def template_variable_handler_name(name, issuer)
  ERB::Util.html_escape self.send(name)
end
~~~

`template_variable_handler`によって実行するメソッドは`Symbol`, `String`の他、`Proc`で記述することが可能です。

~~~ruby
included do
  template_variable_handler(:index_name) { |name, issuer| template_variable_handler_name(:name_for_index, issuer) }
end
~~~

テンプレートを対応するメソッドの返り値に置換するには`render_template`というメソッドを使用します。例えば、ループHTMLの値を返す`render_loop_html`というメソッドは`render_template`を使用しているため、ループHTML内であればテンプレートを使用することが可能です。

~~~ruby
def render_loop_html(item, opts = {})
  item = item.becomes_with_route rescue item
  item.render_template(opts[:html] || loop_html, self)
end
~~~

`render_template`は`template_variable_handler`によって格納された配列の集合をもとに置換を実行します。`find_template_variable_handler`で`Symbol`や`String`, `Proc`に対する動作を実行した後、対応するメソッドを`call`することでレンダリングしています。`template_variable_get`が`false`を返した場合、テンプレートの記述をレンダリングします。

~~~ruby
def render_template(template, *args)
  return '' if template.blank?
  template.gsub(/\#\{(.*?)\}/) do |m|
    str = template_variable_get($1, *args) rescue false
    str == false ? m : str
  end
end

def template_variable_get(name, *args)
  handler = find_template_variable_handler(name)
  return unless handler

  handler.call(name, *args)
rescue => e
  Rails.logger.error("#{e.class} (#{e.message}):\n  #{e.backtrace.join("\n  ")}")
  false
end
~~~

## テンプレートの使用例

テンプレートはループHTMLなどに`#{name}`のように記述することで使用できます。標準機能のフォルダーリストでは、以下のように使用しています。

~~~html
<article class="item-#{class} #{current}">
  <header>
    <h2><a href="#{url}">#{name}</a></h2>
  </header>
</article>
~~~

## <a name="new"></a><a name="current"></a> new, current

`new`, `current`は条件を満たすときに`new`, `current`を表示するテンプレートです。このテンプレートは`class`を追加してスタイルシートを適用したい場合などに使用します。`new`は該当するコンテンツの更新日時がリスト表示のアドオンで設定した期間が経過するまでの間、`new`を表示するテンプレートです。`current`は該当するコンテンツが現在のコンテンツと同じ場合に`current`を表示するテンプレートです。使用例を以下に記述します。

~~~html
<article class="item-#{class} #{new} #{current}">
  <header>
  <time datetime="#{date.iso}">#{date.long}</time>
  <h2><a href="#{url}">#{index_name}</a></h2>
  </header>
</article>
~~~

## <a name="child_items"></a> 子リスト表示

`#{child_items}`は子リストを表示する特殊なテンプレートです。`#{child_items}`は子リスト表示というアドオンで返り値を設定します。以下に使用例を記述します。

~~~html
<!-- リスト表示のループHTML -->
<article class="item-#{class} #{current}">
  <header>
    <h2><a href="#{url}">#{name}</a></h2>
    #{child_items}
  </header>
</article>

<!-- 子リスト表示のループHTML -->
<h2><a href="#{url}">#{name}</a></h2>
~~~

## template_variable_handlerを使用しないテンプレート

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
<nav id="category-list"><header><h2>#{parent.parent_name} > #{parent_name}</h2></header>
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

## 条件分岐構文

`#{if 条件分岐タグ}内容A#{end}`のように記述することで、条件を満たすとき内容Aが表示されるような条件分岐が可能です。条件分岐構文はレイアウトやパーツで使用できます。条件分岐構文として`if`, `elsif`, `else`が使用できます。条件分岐タグは特定の内容を表示する条件を設定するために使用します。

|条件分岐タグ|説明|
|---|---|
|is_page()|ページならばtrue, それ以外はfalseを返します。|
|is_node()|フォルダーならばtrue, それ以外はfalseを返します。|
|in_node('/docs')|ファイル名がdocsから始まるならばtrue, それ以外はfalseを返します。|
|has_pages()|現在のフォルダーにページがある、または現在のフォルダーのカテゴリーに所属しているならばtrue, それ以外はfalseを返します。|

詳細な動作は`Cms::PublicFilter::ConditionalTag`に記述しています。正規表現のために`conditional_tag_template`と`conditional_tag_data`というメソッドを作成しています。テンプレートに記述した条件分岐構文に応じてメソッドを作成しています。条件分岐タグは`conditional_tag_handler`というメソッドで判別しています。

~~~ruby
def conditional_tag_handler(matchdata, data)
  case matchdata[:cond]
  when 'is_page' then return @data = data if @cur_page && @cur_page.filename.start_with?(matchdata[:path])

  # 省略

  else false
  end
end
~~~

使用例を以下に記述します。

~~~html
#{if is_page()}
<p>#{parent_name} > #{page_name}</p>
#{elsif is_node()}
<p>#{page_name}</p>
#{else}
#{end}
~~~

## 使用できるテンプレート

`template_variable_handler`によって使用できるテンプレートを以下に記述します。

### Ckan::Addon::ItemList

|テンプレート|説明|
|---|---|
|#{id}|CKANデータセットのid|
|#{revision_id}|CKANデータセットのrevision_id|
|#{title}|CKANデータセットのtitle|
|#{license_id}|CKANデータセットのlicense_id|
|#{license_title}|CKANデータセットのlicense_title|
|#{license_url}|CKANデータセットのlicense_url|
|#{author}|CKANデータセットのauthor|
|#{author_email}|CKANデータセットのauthor_email|
|#{maintainer}|CKANデータセットのmaintainer|
|#{maintainer_email}|CKANデータセットのmaintainer_email|
|#{num_tags}|CKANデータセットのnum_tags|
|#{num_resources}|CKANデータセットのnum_resources|
|#{private}|CKANデータセットのprivate|
|#{state}|CKANデータセットのstate|
|#{version}|CKANデータセットのversion|
|#{type}|CKANデータセットのtype|
|#{created_date}|CKANデータセットのmetadata_createdを「2015/4/1」の形式で表示します。|
|#{created_date.iso}|CKANデータセットのmetadata_createdを「2015-04-01」の形式で表示します。|
|#{created_date.long}|CKANデータセットのmetadata_createdを「2015年4月1日」の形式で表示します。|
|#{updated_date}|CKANデータセットのmetadata_modifiedを「2015/4/1」の形式で表示します。|
|#{updated_date.iso}|CKANデータセットのmetadata_modifiedを「2015-04-01」の形式で表示します。|
|#{updated_date.long}|CKANデータセットのmetadata_modifiedを「2015年4月1日」の形式で表示します。|
|#{created_time}|CKANデータセットのmetadata_createdを「2015/4/1 09:08」の形式で表示します。|
|#{created_time.iso}|CKANデータセットのmetadata_createdを「2015-04-01 09:08」の形式で表示します。|
|#{created_time.long}|CKANデータセットのmetadata_createdを「2015年4月1日 09時08分」の形式で表示します。|
|#{updated_time}|CKANデータセットのmetadata_modifiedを「2015/4/1 09:08」の形式で表示します。|
|#{updated_time.iso}|CKANデータセットのmetadata_modifiedを「2015-04-01 09:08」の形式で表示します。|
|#{updated_time.long}|CKANデータセットのmetadata_modifiedを「2015年4月1日 09時08分」の形式で表示します。|
|#{group}|リンク先ページの所有グループが表示されます。|
|#{groups}|リンク先ページの全ての所有グループが表示されます。|
|#{organization}|CKANデータセットのorganization。|
|#{add_or_update}|データセットが新規の場合は「add」を、更新の場合は「update」を表示します。|
|#{add_or_update_text}|データセットが新規の場合は「データ追加」を、更新の場合は「データ更新」を表示します。|

### Cms::Addon::Body

|テンプレート|説明|
|---|---|
|#{img.src}|リンク先ページ内に画像が存在する場合、リンク先ページの先頭の画像が表示されます。それ以外の場合、既定のパスが表示されます。|

### Cms::Addon::Meta

|テンプレート|説明|
|---|---|
|#{summary}|リンク先ページのSummaryが表示されます。|
|#{description}|リンク先ページの概要が表示されます。|

### Cms::Addon::Tag

|テンプレート|説明|
|---|---|
|#{tags}|リンク先ページのタグが表示されます。|

### Cms::ChildList

|テンプレート|説明|
|---|---|
|#{category_nodes}|カテゴリーに所属するフォルダーがリスト表示されます。|
|#{category_pages}|カテゴリーに所属するページがリスト表示されます。|
|#{child_pages}|子階層のページがリスト表示されます。|
|#{child_nodes}|子階層のフォルダーがリスト表示されます。|
|[#{child_items}](#child_items)|リスト表示のアドオンで使用できる子リストが表示されます。|

### Cms::GroupPermission

|テンプレート|説明|
|---|---|
|#{group}|リンク先ページの所有グループが表示されます。|
|#{groups}|リンク先ページの全ての所有グループが表示されます。|

### Cms::Model::Node

|テンプレート|説明|
|---|---|
|#{pages.count}|リンク先ページ内にページが存在する場合、リンク先ページ内のページ数が表示されます。|

### Cms::Model::Page

|テンプレート|説明|
|---|---|
|#{categories}|リンク先ページ内がカテゴリに関連付けられている場合、リンク先ページのカテゴリリストが表示されます。|

### Cms::Reference::Member

|テンプレート|説明|
|---|---|
|#{contributor}|メンバーの名前、またはユーザーの名前が表示されます。|

### Cms::TemplateVariable

|テンプレート|説明|
|---|---|
|#{name}|リンク先ページのタイトルが表示されます。|
|#{url}|リンク先ページのURLが表示されます。|
|#{html}|リンク先ページの本文が表示されます。|
|#{index_name}|リンク先ページの一覧用タイトルが表示されます。未設定の場合はタイトルが表示されます。|
|#{class}|リンク先のファイル名が表示されます。ファイル名に拡張子がある場合、拡張子を除いた部分が表示されます。|
|[#{new}](#new)|リンク先のページ公開日時がNEWマーク期間の範囲内の場合、classにnewが付与されます。|
|#{date}|リンク先のページの公開日時が「2015/4/1」の形式で表示されます。|
|#{date.default}|リンク先のページの公開日時が「2015/4/1」の形式で表示されます。|
|#{date.iso}|リンク先のページの公開日時が「2015-04-01」の形式で表示されます。|
|#{date.long}|リンク先のページの公開日時が「2015年4月1日」の形式で表示されます。|
|#{date.short}|リンク先のページの公開日時が「4/1」の形式で表示されます。|
|#{time}|リンク先のページの公開日時が「2015/4/1 12:34」の形式で表示されます。|
|#{time.default}|リンク先のページの公開日時が「2015/4/1 12:34」の形式で表示されます。|
|#{time.iso}|リンク先のページの公開日時が「2015-4-1 12:34」の形式で表示されます。|
|#{time.long}|リンク先のページの公開日時が「2015年4月1日 12時34分」の形式で表示されます。|
|#{time.short}|リンク先のページの公開日時が「15/04/01 12:34」の形式で表示されます。|
|[#{current}](#current)|現在訪問しているページとURLが同一の場合、classにcurrentが付与されます。|

### Event::Addon::Date

|テンプレート|説明|
|---|---|
|#{event_dates}|イベント日が「2015/4/1」の形式で表示されます。|
|#{event_dates.default}|イベント日が「2015/4/1」の形式で表示されます。|
|#{event_dates.default_full}|イベント日が「2015/4/1 (水)」の形式で表示されます。|
|#{event_dates.iso}|イベント日が「2015-4-1」の形式で表示されます。|
|#{event_dates.iso_full}|イベント日が「2015-4-1 (水)」の形式で表示されます。|
|#{event_dates.long}|イベント日が「2015年4月1日」の形式で表示されます。|
|#{event_dates.full}|イベント日が「2015年4月1日 (水)」の形式で表示されます。|

### Jmaxml::Renderer::CommentHandler

|テンプレート|説明|
|---|---|
|#{forecast_comment}|気象庁XMLの/Report/Body/Comments/ForecastComment/Text/text()が表示されます。|
|#{warning_comment}|気象庁XMLの/Report/Body/Comments/WarningComment/Text/text()が表示されます。|
|#{free_form_comment}|気象庁XMLの/Report/Body/Comments/FreeFormComment/text()が表示されます。|

### Jmaxml::Renderer::ControlHandler

|テンプレート|説明|
|---|---|
|#{title}|気象庁XMLの/Report/Control/Title/text()が表示されます。|
|#{status}|気象庁XMLの/Report/Control/Status/text()が表示されます。|
|#{editorial_office}|気象庁XMLの/Report/Control/EditorialOffice/text()が表示されます。|
|#{publishing_office}|気象庁XMLの/Report/Control/PublishingOffice/text()が表示されます。|

### Jmaxml::Renderer::EarthquakeHandler

|テンプレート|説明|
|---|---|
|#{earthquake_origin_time}|気象庁XMLの/Report/Body/Earthquake/OriginTime/text()が「2015年4月1日」の形式で表示されます。|
|#{earthquake_magnitude}|気象庁XMLの/Report/Body/Earthquake/jmx_eb:Magnitudeが表示されます。|
|#{hypocenter_area_name}|気象庁XMLの/Report/Body/Earthquake/Hypocenter/Area/Name/text()が表示されます。|
|#{hypocenter_coordinate}|気象庁XMLの/Report/Body/Earthquake/Hypocenter/Area/jmx_eb:Coordinateが表示されます。|
|#{hypocenter_name_from_mark}|気象庁XMLの/Report/Body/Earthquake/Hypocenter/Area/NameFromMark/text()が表示されます。|

### Jmaxml::Renderer::HeadHandler

|テンプレート|説明|
|---|---|
|#{head_title}|気象庁XMLの/Report/Head/Title/text()が表示されます。|
|#{headline_text}|気象庁XMLの/Report/Head/Headline/Text/text()が表示されます。|
|#{target_time}|気象庁XMLの/Report/Head/TargetDateTime/text()が「2015年4月1日」の形式で表示されます。|
|#{info_type}|気象庁XMLの/Report/Head/InfoType/text()が表示されます。|

### Jmaxml::Renderer::VolcanoHandler

|テンプレート|説明|
|---|---|
|#{volcano_headline}|気象庁XMLの/Report/Body/VolcanoInfoContent/VolcanoHeadline/text()が表示されます。|
|#{volcano_activity}|気象庁XMLの/Report/Body/VolcanoInfoContent/VolcanoActivity/text()が表示されます。|
|#{volcano_prevention}|気象庁XMLの/Report/Body/VolcanoInfoContent/VolcanoPrevention/text()が表示されます。|
|#{appendix}|気象庁XMLの/Report/Body/VolcanoInfoContent/Appendix/text()が表示されます。|

### Member::Addon::Blog::Body

|テンプレート|説明|
|---|---|
|#{img.src}|リンク先ページ内に画像が存在する場合、リンク先ページの先頭の画像が表示されます。それ以外の場合、既定のパスが表示されます。|

### Member::Addon::Blog::PageSetting

|テンプレート|説明|
|---|---|
|#{img.src}|リンク先ページ内に画像が存在する場合、リンク先ページの先頭の画像が表示されます。それ以外の場合、既定のパスが表示されます。|

### Member::Addon::Photo::Body

|テンプレート|説明|
|---|---|
|#{img.src}|リンク先ページ内に画像が存在する場合、リンク先ページの先頭の画像が表示されます。それ以外の場合、既定のパスが表示されます。|

### Opendata::AppTemplateVariables

|テンプレート|説明|
|---|---|
|#{app_name}|オープンデータのアプリのアプリ名が表示されます。|
|#{app_url}|オープンデータのアプリのURLが表示されます。|
|#{app_update}|オープンデータのアプリの更新日時が「2015年4月1日 12時34分」の形式で表示されます。|
|#{app_update.default}|オープンデータのアプリの更新日時が「2015/4/1 12:34」の形式で表示されます。|
|#{app_update.iso}|オープンデータのアプリの更新日時が「2015-4-1 12:34」の形式で表示されます。|
|#{app_update.long}|オープンデータのアプリの更新日時が「2015年4月1日 12時34分」の形式で表示されます。|
|#{app_update.short}|オープンデータのアプリの更新日時が「15/04/01 12:34」の形式で表示されます。|
|#{app_state}|オープンデータのアプリの状態が表示されます。|
|#{app_point}|オープンデータのアプリの評価が表示されます。|

### Opendata::DatasetTemplateVariables

|テンプレート|説明|
|---|---|
|#{dataset_name}|オープンデータのデータセットのデータセット名が表示されます。|
|#{dataset_url}|オープンデータのデータセットのURLが表示されます。|
|#{dataset_update}|オープンデータのデータセットの更新日時が「2015年4月1日 12時34分」の形式で表示されます。|
|#{dataset_update.default}|オープンデータのデータセットの更新日時が「2015/4/1 12:34」の形式で表示されます。|
|#{dataset_update.iso}|オープンデータのデータセットの更新日時が「2015-4-1 12:34」の形式で表示されます。|
|#{dataset_update.long}|オープンデータのデータセットの更新日時が「2015年4月1日 12時34分」の形式で表示されます。|
|#{dataset_update.short}|オープンデータのデータセットの更新日時が「15/04/01 12:34」の形式で表示されます。|
|#{dataset_state}|オープンデータのデータセットの状態が表示されます。|
|#{dataset_point}|オープンデータのデータセットの評価が表示されます。|
|#{dataset_downloaded}|オープンデータのデータセットのダウンロード数が表示されます。|
|#{dataset_apps_count}|オープンデータのデータセットの登録アプリ件数が表示されます。|
|#{dataset_ideas_count}|オープンデータのデータセットの登録アイデア件数が表示されます。|

### Opendata::IdeaTemplateVariables

|テンプレート|説明|
|---|---|
|#{idea_name}|オープンデータのアイデアボックスのタイトルが表示されます。|
|#{idea_url}|オープンデータのアイデアボックスのURLが表示されます。|
|#{idea_update}|オープンデータのアイデアボックスの更新日時が「2015年4月1日 12時34分」の形式で表示されます。|
|#{idea_update.default}|オープンデータのアイデアボックスの更新日時が「2015/4/1 12:34」の形式で表示されます。|
|#{idea_update.iso}|オープンデータのアイデアボックスの更新日時が「2015-4-1 12:34」の形式で表示されます。|
|#{idea_update.long}|オープンデータのアイデアボックスの更新日時が「2015年4月1日 12時34分」の形式で表示されます。|
|#{idea_update.short}|オープンデータのアイデアボックスの更新日時が「15/04/01 12:34」の形式で表示されます。|
|#{idea_state}|オープンデータのアイデアボックスの状態が表示されます。|
|#{idea_point}|オープンデータのアイデアボックスの評価が表示されます。|
|#{idea_datasets}|オープンデータのアイデアボックスのデータセット名が表示されます。|
|#{idea_apps}|オープンデータのアイデアボックスのアプリ名が表示されます。|

### Sys::Addon::Body

|テンプレート|説明|
|---|---|
|#{img.src}|リンク先ページ内に画像が存在する場合、リンク先ページの先頭の画像が表示されます。それ以外の場合、既定のパスが表示されます。|

### Member::Renderer::GroupInvitation

|テンプレート|説明|
|---|---|
|#{sender_name}|招待した人の名前が表示されます。|
|#{sender_email}|招待した人のメールアドレスが表示されます。|
|#{group_name}|招待するグループ名が表示されます。|
|#{invitation_message}|招待するグループの招待メッセージが表示されます。|
|#{accept_url}|グループへの招待を承諾するための URL が表示されます。|
|#{reject_url}|グループへの招待を辞退するための URL が表示されます。|

### Member::Renderer::MemberInvitation

|テンプレート|説明|
|---|---|
|#{sender_name}|招待した人の名前が表示されます。|
|#{sender_email}|招待した人のメールアドレスが表示されます。|
|#{group_name}|招待するグループ名が表示されます。|
|#{invitation_message}|招待するグループの招待メッセージが表示されます。|
|#{registration_url}|会員登録するための URL が表示されます。|

### Rss::Renderer::AnpiMail

|テンプレート|説明|
|---|---|
|#{target_time}|地震発生日が「2015年4月1日 12時34分」の形式で表示されます。|
|#{anpi_post_url}|安否投稿 URL が表示されます。|
|#{pref_name}|地震が発生した都道府県が表示されます。|
|#{area_name}|地震発生地域が表示されます。|
|#{intensity_label}|震度が表示されます。|
