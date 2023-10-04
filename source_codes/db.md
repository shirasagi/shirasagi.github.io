---
layout: default
title: DB定義
---

## 出力コマンド

~~~
$ rake ss:models
~~~

## DB定義

バージョン: v1.18.0

## ads_access_logs / 広告アクセスログ

|Field|Description|Type|
|-----|-----------|----|
|_id|ID|BSON::ObjectId|
|count|アクセス数|Integer|
|created|作成日時|DateTime|
|date|アクセス日|Date|
|deleted|削除日時|DateTime|
|link_url|リンクURL|String|
|node_id|Node|Integer|
|site_id|サイト|Object|
|text_index|全文検索インデックス(未使用)|String|
|updated|更新日時|DateTime|

## board_anpi_posts / 安否確認投稿

|Field|Description|Type|
|-----|-----------|----|
|_id|ID|Integer|
|addr|住所|String|
|age|年齢|String|
|created|作成日時|DateTime|
|deleted|削除日時|DateTime|
|email|メールアドレス|String|
|gpf_api_key|Gpf api key|String|
|gpf_domain_name|Gpf domain name|String|
|gpf_id|Gpf|String|
|gpf_repository|Gpf repository|String|
|kana|名前（かな）|String|
|member_id|メンバー|Object|
|name|名前|String|
|point|位置|Map::Extensions::Point|
|public_scope|公開範囲|String|
|sex|性別|String|
|site_id|サイト|Object|
|tel|電話番号|String|
|text|安否情報|String|
|text_index|全文検索インデックス(未使用)|String|
|updated|更新日時|DateTime|
|user_id|ユーザー|Object|

## board_posts / 掲示板投稿

|Field|Description|Type|
|-----|-----------|----|
|_id|ID|Integer|
|created|作成日時|DateTime|
|delete_key|削除キー|String|
|deleted|削除日時|DateTime|
|descendants_updated|Descendants updated|DateTime|
|email|メールアドレス|String|
|file_ids|File ids|SS::Extensions::ObjectIds|
|name|タイトル|String|
|node_id|Node|Object|
|parent_id|Parent|Object|
|poster|投稿者|String|
|poster_url|URL|String|
|site_id|サイト|Object|
|text|本文|String|
|text_index|全文検索インデックス(未使用)|String|
|topic_id|Topic|Object|
|updated|更新日時|DateTime|
|user_id|ユーザー|Object|

## chat_categories / カテゴリー

|Field|Description|Type|
|-----|-----------|----|
|_id|ID|Integer|
|created|作成日時|DateTime|
|deleted|削除日時|DateTime|
|group_ids|管理グループ|SS::Extensions::ObjectIds|
|name|名前|String|
|node_id|フォルダー|Object|
|order|並び順|Integer|
|permission_level|権限レベル|Integer|
|site_id|サイト|Object|
|text_index|全文検索インデックス(未使用)|String|
|updated|更新日時|DateTime|
|user_id|ユーザー|Object|

## chat_histories / 履歴

|Field|Description|Type|
|-----|-----------|----|
|_id|ID|Integer|
|click_suggest|使用したサジェスト|String|
|created|作成日時|DateTime|
|deleted|削除日時|DateTime|
|intent_id|シナリオ|Object|
|node_id|フォルダー|Object|
|prev_intent_id|前回のシナリオ|Object|
|question|フィードバック|String|
|request_id|リクエストID|String|
|result|返答|String|
|session_id|セッションID|String|
|site_id|サイト|Object|
|suggest|サジェスト|SS::Extensions::Words|
|text|文章|String|
|text_index|全文検索インデックス(未使用)|String|
|updated|更新日時|DateTime|
|user_id|ユーザー|Object|

## chat_intents / シナリオ

|Field|Description|Type|
|-----|-----------|----|
|_id|ID|Integer|
|category_ids|カテゴリー|SS::Extensions::ObjectIds|
|created|作成日時|DateTime|
|deleted|削除日時|DateTime|
|group_ids|管理グループ|SS::Extensions::ObjectIds|
|link|リンク|SS::Extensions::Lines|
|name|名前|String|
|node_id|フォルダー|Object|
|order|並び順|Integer|
|permission_level|権限レベル|Integer|
|phrase|フレーズ|SS::Extensions::Lines|
|question|フィードバック|String|
|response|返答|String|
|site_id|サイト|Object|
|site_search|サイト内検索のリンク|String|
|suggest|サジェスト|SS::Extensions::Lines|
|text_index|全文検索インデックス(未使用)|String|
|updated|更新日時|DateTime|
|user_id|ユーザー|Object|

## chat_line_bot_exists_phrases

|Field|Description|Type|
|-----|-----------|----|
|_id|ID|BSON::ObjectId|
|confirm_no|Confirm no|Integer|
|confirm_yes|Confirm yes|Integer|
|created|作成日時|DateTime|
|deleted|削除日時|DateTime|
|frequency|Frequency|Integer|
|name|Name|String|
|node_id|Node|Object|
|site_id|サイト|Object|
|text_index|全文検索インデックス(未使用)|String|
|updated|更新日時|DateTime|

## chat_line_bot_record_phrases

|Field|Description|Type|
|-----|-----------|----|
|_id|ID|BSON::ObjectId|
|created|作成日時|DateTime|
|deleted|削除日時|DateTime|
|frequency|Frequency|Integer|
|name|Name|String|
|node_id|Node|Object|
|site_id|サイト|Object|
|text_index|全文検索インデックス(未使用)|String|
|updated|更新日時|DateTime|

## chat_line_bot_sessions

|Field|Description|Type|
|-----|-----------|----|
|_id|ID|BSON::ObjectId|
|created|作成日時|DateTime|
|date_created|Date created|String|
|deleted|削除日時|DateTime|
|line_user_id|Line user|String|
|node_id|Node|Object|
|site_id|サイト|Object|
|text_index|全文検索インデックス(未使用)|String|
|updated|更新日時|DateTime|

## chat_line_bot_used_times

|Field|Description|Type|
|-----|-----------|----|
|_id|ID|BSON::ObjectId|
|created|作成日時|DateTime|
|deleted|削除日時|DateTime|
|hour|Hour|Integer|
|node_id|Node|Object|
|site_id|サイト|Object|
|text_index|全文検索インデックス(未使用)|String|
|updated|更新日時|DateTime|

## chorg_changesets / 変更内容

|Field|Description|Type|
|-----|-----------|----|
|_id|ID|Integer|
|created|作成日時|DateTime|
|deleted|削除日時|DateTime|
|destinations|移動先|Array|
|revision_id|Revision|Object|
|sources|移動元|Array|
|text_index|全文検索インデックス(未使用)|String|
|type|種別|String|
|updated|更新日時|DateTime|

## chorg_revisions / リビジョン

|Field|Description|Type|
|-----|-----------|----|
|_id|ID|Integer|
|content_csv_file_id|コンテンツCSVファイル|Object|
|created|作成日時|DateTime|
|delete_method|削除方法|String|
|deleted|削除日時|DateTime|
|job_ids|ジョブ|Array|
|lock_until|ロック期限日時|DateTime|
|name|名前|String|
|site_id|サイト|Object|
|target_site_ids|対象サイト|SS::Extensions::ObjectIds|
|text_index|全文検索インデックス(未使用)|String|
|updated|更新日時|DateTime|
|user_csv_file_id|ユーザーCSVファイル|Object|

## chorg_run_params / 組織変更実行オプション

|Field|Description|Type|
|-----|-----------|----|
|_id|ID|BSON::ObjectId|
|add_newly_created_group_to_site|新規作成グループをサイトに追加|Integer|
|created|作成日時|DateTime|
|deleted|削除日時|DateTime|
|forced_overwrite|Forced overwrite|Integer|
|reservation|予約実行|DateTime|
|text_index|全文検索インデックス(未使用)|String|
|updated|更新日時|DateTime|

## cms_body_layouts / レイアウト

|Field|Description|Type|
|-----|-----------|----|
|_id|ID|Integer|
|created|作成日時|DateTime|
|css_paths|Css paths|SS::Extensions::Words|
|deleted|削除日時|DateTime|
|depth|フォルダ階層|Integer|
|filename|ファイル名|String|
|first_released|First released|DateTime|
|group_ids|Group ids|SS::Extensions::ObjectIds|
|html|Html|String|
|imported|Imported|DateTime|
|index_name|一覧用タイトル|String|
|js_paths|Js paths|SS::Extensions::Words|
|md5|ハッシュ値|String|
|name|本文レイアウト名|String|
|order|並び順|Integer|
|part_paths|Part paths|SS::Extensions::Words|
|parts|パーツ名|SS::Extensions::Lines|
|permission_level|Permission level|Integer|
|released|公開日時|DateTime|
|released_type|公開日時種別|String|
|site_id|サイト|Object|
|state|ステータス|String|
|text_index|全文検索インデックス(未使用)|String|
|updated|更新日時|DateTime|
|user_id|ユーザー|Object|

## cms_check_links_error_bases / エラー情報

|Field|Description|Type|
|-----|-----------|----|
|_id|ID|BSON::ObjectId|
|_type|Type|String|
|created|作成日時|DateTime|
|deleted|削除日時|DateTime|
|filename|ファイル名|String|
|group_ids|管理グループ|SS::Extensions::ObjectIds|
|name|タイトル|String|
|permission_level|Permission level|Integer|
|ref|パス|String|
|ref_url|URL|String|
|report_id|Report|Object|
|site_id|サイト|Object|
|text_index|全文検索インデックス(未使用)|String|
|updated|更新日時|DateTime|
|urls|リンク切れ|Array|

## cms_check_links_ignore_urls

|Field|Description|Type|
|-----|-----------|----|
|_id|ID|Integer|
|created|作成日時|DateTime|
|deleted|削除日時|DateTime|
|name|除外URL|String|
|site_id|サイト|Object|
|text_index|全文検索インデックス(未使用)|String|
|updated|更新日時|DateTime|
|user_id|ユーザー|Object|

## cms_check_links_reports

|Field|Description|Type|
|-----|-----------|----|
|_id|ID|Integer|
|created|作成日時|DateTime|
|deleted|削除日時|DateTime|
|name|Name|String|
|site_id|サイト|Object|
|text_index|全文検索インデックス(未使用)|String|
|updated|更新日時|DateTime|

## cms_column_value_bases

|Field|Description|Type|
|-----|-----------|----|
|_id|ID|BSON::ObjectId|
|_type|Type|String|
|alignment|配置|String|
|column_id|Column|Object|
|created|作成日時|DateTime|
|deleted|削除日時|DateTime|
|name|Name|String|
|order|並び順|Integer|
|text_index|全文検索インデックス(未使用)|String|
|updated|更新日時|DateTime|

## cms_columns / 入力項目

|Field|Description|Type|
|-----|-----------|----|
|_id|ID|BSON::ObjectId|
|_type|Type|String|
|created|作成日時|DateTime|
|deleted|削除日時|DateTime|
|form_id|Form|Object|
|form_type|Form type|String|
|layout|レイアウト|String|
|name|名前|String|
|order|並び順|Integer|
|postfix_label|Postfix label|String|
|prefix_label|Prefix label|String|
|required|必須入力|String|
|site_id|サイト|Object|
|text_index|全文検索インデックス(未使用)|String|
|tooltips|ツールチップ|SS::Extensions::Lines|
|updated|更新日時|DateTime|

## cms_commands / コマンド

|Field|Description|Type|
|-----|-----------|----|
|_id|ID|Integer|
|command|コマンド|String|
|created|作成日時|DateTime|
|deleted|削除日時|DateTime|
|description|説明|String|
|name|タイトル|String|
|order|並び順|Integer|
|output|出力|String|
|site_id|サイト|Object|
|text_index|全文検索インデックス(未使用)|String|
|updated|更新日時|DateTime|

## cms_editor_templates / テンプレート

|Field|Description|Type|
|-----|-----------|----|
|_id|ID|Integer|
|created|作成日時|DateTime|
|deleted|削除日時|DateTime|
|description|説明|String|
|html|Html|String|
|name|名前|String|
|order|並び順|Integer|
|site_id|サイト|Object|
|text_index|全文検索インデックス(未使用)|String|
|thumb_id|サムネイル画像|Object|
|updated|更新日時|DateTime|

## cms_form_db_import_logs / インポートログ

|Field|Description|Type|
|-----|-----------|----|
|_id|ID|BSON::ObjectId|
|created|作成日時|DateTime|
|data|Data|String|
|db_id|Db|Object|
|deleted|削除日時|DateTime|
|form_id|Form|Object|
|node_id|Node|Object|
|site_id|Site|Object|
|text_index|全文検索インデックス(未使用)|String|
|updated|更新日時|DateTime|

## cms_form_dbs / 定型フォーム - DB

|Field|Description|Type|
|-----|-----------|----|
|_id|ID|Integer|
|created|作成日時|DateTime|
|deleted|削除日時|DateTime|
|form_id|定型フォーム|Object|
|generate_on_import|記事ページを書き出す|Integer|
|group_ids|管理グループ|SS::Extensions::ObjectIds|
|import_column_options|値による条件設定|SS::Extensions::ArrayOfHash|
|import_event|イベント日時を取り込む|Integer|
|import_exclude_columns|除外するカラム|SS::Extensions::Lines|
|import_map|地図座標を取り込む|Integer|
|import_page_name|記事タイトルのカラム|String|
|import_primary_key|主キーのカラム|String|
|import_skip_same_file|同じファイルはインポートしない|Integer|
|import_url|インポートURL|String|
|import_url_hash|Import url hash|String|
|name|名前|String|
|node_id|記事フォルダー|Object|
|order|並び順|Integer|
|permission_level|権限レベル|Integer|
|site_id|Site|Object|
|text_index|全文検索インデックス(未使用)|String|
|updated|更新日時|DateTime|

## cms_forms / 定型フォーム

|Field|Description|Type|
|-----|-----------|----|
|_id|ID|Integer|
|created|作成日時|DateTime|
|deleted|削除日時|DateTime|
|group_ids|管理グループ|SS::Extensions::ObjectIds|
|html|HTML|String|
|name|名前|String|
|order|並び順|Integer|
|permission_level|権限レベル|Integer|
|site_id|サイト|Object|
|state|ステータス|String|
|sub_type|目的|String|
|text_index|全文検索インデックス(未使用)|String|
|updated|更新日時|DateTime|

## cms_image_resizes

|Field|Description|Type|
|-----|-----------|----|
|_id|ID|Integer|
|created|作成日時|DateTime|
|deleted|削除日時|DateTime|
|extensions|拡張子|SS::Extensions::Words|
|max_height|縦幅|Integer|
|max_width|横幅|Integer|
|name|名前|String|
|node_id|Node|Object|
|order|並び順|Integer|
|quality|画質|Integer|
|site_id|サイト|Object|
|size|制限サイズ|Integer|
|state|状態|String|
|text_index|全文検索インデックス(未使用)|String|
|updated|更新日時|DateTime|

## cms_import_job_files

|Field|Description|Type|
|-----|-----------|----|
|_id|ID|Integer|
|created|作成日時|DateTime|
|deleted|削除日時|DateTime|
|file_ids|File ids|SS::Extensions::ObjectIds|
|import_date|インポート開始日時|DateTime|
|job_name|Job name|String|
|job_wait|Job wait|Integer|
|node_id|Node|Object|
|root_node_id|Root node|Object|
|site_id|Site|Object|
|text_index|全文検索インデックス(未使用)|String|
|updated|更新日時|DateTime|
|user_id|ユーザー|Object|

## cms_init_columns / 初期ブロック

|Field|Description|Type|
|-----|-----------|----|
|_id|ID|BSON::ObjectId|
|column_id|Column|Object|
|column_type|Column type|String|
|created|作成日時|DateTime|
|deleted|削除日時|DateTime|
|form_id|Form|Object|
|form_type|Form type|String|
|order|並び順|Integer|
|site_id|サイト|Object|
|text_index|全文検索インデックス(未使用)|String|
|updated|更新日時|DateTime|

## cms_layouts / レイアウト

|Field|Description|Type|
|-----|-----------|----|
|_id|ID|Integer|
|created|作成日時|DateTime|
|css_paths|Css paths|SS::Extensions::Words|
|deleted|削除日時|DateTime|
|depth|フォルダ階層|Integer|
|filename|ファイル名|String|
|first_released|First released|DateTime|
|group_ids|管理グループ|SS::Extensions::ObjectIds|
|html|HTML|String|
|imported|Imported|DateTime|
|index_name|一覧用タイトル|String|
|js_paths|Js paths|SS::Extensions::Words|
|md5|ハッシュ値|String|
|name|レイアウト名|String|
|order|並び順|Integer|
|part_paths|Part paths|SS::Extensions::Words|
|permission_level|権限レベル|Integer|
|released|公開日時|DateTime|
|released_type|公開日時種別|String|
|site_id|サイト|Object|
|state|ステータス|String|
|text_index|全文検索インデックス(未使用)|String|
|updated|更新日時|DateTime|
|user_id|ユーザー|Object|

## cms_line_areas

|Field|Description|Type|
|-----|-----------|----|
|_id|ID|BSON::ObjectId|
|created|作成日時|DateTime|
|data|データ|String|
|deleted|削除日時|DateTime|
|height|H|Integer|
|menu_id|切替メニュー|Object|
|text|メッセージ|String|
|text_index|全文検索インデックス(未使用)|String|
|type|アクション|String|
|updated|更新日時|DateTime|
|uri|URI|String|
|width|W|Integer|
|x|X|Integer|
|y|Y|Integer|

## cms_line_deliver_categories

|Field|Description|Type|
|-----|-----------|----|
|_id|ID|Integer|
|_type|Type|String|
|created|作成日時|DateTime|
|deleted|削除日時|DateTime|
|depth|Depth|Integer|
|filename|ファイル名|Object|
|name|タイトル|Object|
|order|並び順|Integer|
|parent_id|Parent|Object|
|remarks|Remarks|String|
|site_id|サイト|Object|
|state|ステータス|String|
|text_index|全文検索インデックス(未使用)|String|
|updated|更新日時|DateTime|
|user_id|ユーザー|Object|

## cms_line_deliver_conditions

|Field|Description|Type|
|-----|-----------|----|
|_id|ID|Integer|
|created|作成日時|DateTime|
|deleted|削除日時|DateTime|
|deliver_category_ids|Deliver category ids|SS::Extensions::ObjectIds|
|group_ids|管理グループ|SS::Extensions::ObjectIds|
|name|タイトル|Object|
|order|並び順|Integer|
|permission_level|権限レベル|Integer|
|site_id|サイト|Object|
|text_index|全文検索インデックス(未使用)|String|
|updated|更新日時|DateTime|
|user_id|ユーザー|Object|

## cms_line_deliver_plans

|Field|Description|Type|
|-----|-----------|----|
|_id|ID|BSON::ObjectId|
|created|作成日時|DateTime|
|deleted|削除日時|DateTime|
|deliver_date|配信日時（予約）|DateTime|
|group_ids|管理グループ|SS::Extensions::ObjectIds|
|message_id|Message|Object|
|name|配信日時(予約)|String|
|permission_level|権限レベル|Integer|
|site_id|サイト|Object|
|state|ステータス|String|
|text_index|全文検索インデックス(未使用)|String|
|updated|更新日時|DateTime|
|user_id|ユーザー|Object|

## cms_line_event_sessions

|Field|Description|Type|
|-----|-----------|----|
|_id|ID|BSON::ObjectId|
|channel_user_id|Channel user|String|
|created|作成日時|DateTime|
|data|Data|Hash|
|deleted|削除日時|DateTime|
|hook_id|Hook|Object|
|lock_until|Lock until|DateTime|
|locked_at|Locked at|DateTime|
|site_id|サイト|Object|
|text_index|全文検索インデックス(未使用)|String|
|updated|更新日時|DateTime|

## cms_line_facility_search_categories

|Field|Description|Type|
|-----|-----------|----|
|_id|ID|BSON::ObjectId|
|condition_forms|検索条件(定型フォーム)|Cms::Extensions::ConditionForms|
|conditions|検索条件|SS::Extensions::Lines|
|created|作成日時|DateTime|
|deleted|削除日時|DateTime|
|hook_id|Hook|Object|
|image_id|サムネイル画像|Object|
|limit|表示件数|Integer|
|loop_format|ループHTML形式|String|
|loop_html|ループHTML|String|
|loop_liquid|表示テキスト|String|
|loop_setting_id|定義済みループHTML|Object|
|lower_html|下部HTML|String|
|name|タイトル|String|
|new_days|NEWマーク期間|Integer|
|no_image_id|NO IMAGE画像|Object|
|no_items_display_state|ページ未検出時表示|String|
|order|並び順|Integer|
|site_id|サイト|Object|
|sort|並び順|String|
|sort_column_direction|並び順（方向）|String|
|sort_column_name|並び順（項目名）|String|
|state|ステータス|String|
|substitute_html|代替HTML|String|
|summary|サマリー|String|
|text_index|全文検索インデックス(未使用)|String|
|updated|更新日時|DateTime|
|upper_html|上部HTML|String|
|user_id|ユーザー|Object|

## cms_line_mail_handlers

|Field|Description|Type|
|-----|-----------|----|
|_id|ID|Integer|
|created|作成日時|DateTime|
|deleted|削除日時|DateTime|
|deliver_category_ids|Deliver category ids|SS::Extensions::ObjectIds|
|deliver_condition_id|配信条件|Object|
|deliver_condition_state|設定|String|
|filename|ファイル名|String|
|from_conditions|送信者メールアドレス|SS::Extensions::Lines|
|group_ids|管理グループ|SS::Extensions::ObjectIds|
|handle_state|ステータス|String|
|name|タイトル|String|
|order|並び順|Integer|
|permission_level|権限レベル|Integer|
|site_id|サイト|Object|
|statistic_state|統計情報|String|
|terminate_line|終端文字列|String|
|text_index|全文検索インデックス(未使用)|String|
|to_conditions|宛先メールアドレス|SS::Extensions::Lines|
|updated|更新日時|DateTime|
|user_id|ユーザー|Object|

## cms_line_messages

|Field|Description|Type|
|-----|-----------|----|
|_id|ID|Integer|
|completed|配信日時|DateTime|
|created|作成日時|DateTime|
|deleted|削除日時|DateTime|
|deliver_category_ids|Deliver category ids|SS::Extensions::ObjectIds|
|deliver_condition_id|配信条件|Object|
|deliver_condition_state|設定|String|
|deliver_state|配信ステータス|String|
|first_released|First released|DateTime|
|group_ids|管理グループ|SS::Extensions::ObjectIds|
|name|タイトル|String|
|permission_level|権限レベル|Integer|
|released|Released|DateTime|
|site_id|サイト|Object|
|state|ステータス|String|
|statistic_state|統計情報|String|
|test_completed|テスト配信日時|DateTime|
|text_index|全文検索インデックス(未使用)|String|
|updated|更新日時|DateTime|
|user_id|ユーザー|Object|

## cms_line_richmenu_groups

|Field|Description|Type|
|-----|-----------|----|
|_id|ID|Integer|
|close_date|終了日時|DateTime|
|created|作成日時|DateTime|
|deleted|削除日時|DateTime|
|name|タイトル|String|
|order|並び順|Integer|
|site_id|サイト|Object|
|start_date|開始日時|DateTime|
|state|ステータス|String|
|text_index|全文検索インデックス(未使用)|String|
|updated|更新日時|DateTime|
|user_id|ユーザー|Object|

## cms_line_richmenu_menus

|Field|Description|Type|
|-----|-----------|----|
|_id|ID|Integer|
|area_size|タップ領域数|Integer|
|chat_bar_text|メニューテキスト|String|
|created|作成日時|DateTime|
|deleted|削除日時|DateTime|
|group_id|Group|Object|
|height|高さ|Integer|
|image_id|画像|Object|
|in_areas|In areas|Array|
|name|メニュー名|Object|
|order|並び順|Integer|
|selected|デフォルト表示|String|
|site_id|サイト|Object|
|target|適用区分|String|
|text_index|全文検索インデックス(未使用)|String|
|updated|更新日時|DateTime|
|user_id|ユーザー|Object|
|width|幅|Integer|

## cms_line_richmenu_registrations

|Field|Description|Type|
|-----|-----------|----|
|_id|ID|BSON::ObjectId|
|created|作成日時|DateTime|
|deleted|削除日時|DateTime|
|line_richmenu_alias_id|Line richmenu alias|String|
|line_richmenu_id|Line richmenu|String|
|linked_user_ids|Linked user ids|Array|
|menu_id|Menu|Object|
|site_id|サイト|Object|
|text_index|全文検索インデックス(未使用)|String|
|updated|更新日時|DateTime|

## cms_line_service_groups

|Field|Description|Type|
|-----|-----------|----|
|_id|ID|Integer|
|close_date|終了日時|DateTime|
|created|作成日時|DateTime|
|deleted|削除日時|DateTime|
|expired_minutes|有効期限（分）|Integer|
|expired_text|有効期限切れメッセージ|String|
|name|タイトル|String|
|order|並び順|Integer|
|site_id|サイト|Object|
|start_date|開始日時|DateTime|
|state|ステータス|String|
|text_index|全文検索インデックス(未使用)|String|
|updated|更新日時|DateTime|
|user_id|ユーザー|Object|

## cms_line_service_hooks

|Field|Description|Type|
|-----|-----------|----|
|_id|ID|BSON::ObjectId|
|_type|Type|String|
|action_data|データ|String|
|action_type|アクション|String|
|created|作成日時|DateTime|
|deleted|削除日時|DateTime|
|group_id|Group|Object|
|name|タイトル|String|
|order|並び順|Integer|
|site_id|サイト|Object|
|text_index|全文検索インデックス(未使用)|String|
|updated|更新日時|DateTime|
|user_id|ユーザー|Object|

## cms_line_statistics

|Field|Description|Type|
|-----|-----------|----|
|_id|ID|Integer|
|action|Action|String|
|aggregation_unit|Aggregation unit|String|
|aggregation_units_by_month|Aggregation units by month|Integer|
|condition_label|配信条件|String|
|condition_state|設定|String|
|created|作成日時|DateTime|
|deleted|削除日時|DateTime|
|group_ids|管理グループ|SS::Extensions::ObjectIds|
|member_count|Member count|Integer|
|message_id|メッセージ|Object|
|name|統計情報|String|
|permission_level|権限レベル|Integer|
|request_id|Request|String|
|site_id|サイト|Object|
|statistics|Statistics|Hash|
|text_index|全文検索インデックス(未使用)|String|
|updated|更新日時|DateTime|
|user_id|ユーザー|Object|

## cms_line_template_bases

|Field|Description|Type|
|-----|-----------|----|
|_id|ID|BSON::ObjectId|
|_type|Type|String|
|created|作成日時|DateTime|
|deleted|削除日時|DateTime|
|image_id|画像|Object|
|message_id|Message|Object|
|name|Name|String|
|order|Order|Integer|
|page_id|ページ|Object|
|site_id|サイト|Object|
|text_index|全文検索インデックス(未使用)|String|
|updated|更新日時|DateTime|
|user_id|ユーザー|Object|

## cms_line_test_members

|Field|Description|Type|
|-----|-----------|----|
|_id|ID|Integer|
|created|作成日時|DateTime|
|default_checked|既定のテストメンバー|String|
|deleted|削除日時|DateTime|
|group_ids|管理グループ|SS::Extensions::ObjectIds|
|name|名前|String|
|oauth_id|OAuth ID (ユーザーID)|String|
|order|並び順|Integer|
|permission_level|権限レベル|Integer|
|site_id|サイト|Object|
|text_index|全文検索インデックス(未使用)|String|
|updated|更新日時|DateTime|
|user_id|ユーザー|Object|

## cms_loop_settings / ループHTML

|Field|Description|Type|
|-----|-----------|----|
|_id|ID|Integer|
|created|作成日時|DateTime|
|deleted|削除日時|DateTime|
|description|説明|String|
|html|Html|String|
|name|タイトル|String|
|order|並び順|Integer|
|site_id|サイト|Object|
|text_index|全文検索インデックス(未使用)|String|
|updated|更新日時|DateTime|

## cms_max_file_sizes

|Field|Description|Type|
|-----|-----------|----|
|_id|ID|Integer|
|created|作成日時|DateTime|
|deleted|削除日時|DateTime|
|extensions|拡張子|SS::Extensions::Words|
|name|名前|String|
|node_id|Node|Object|
|order|並び順|Integer|
|site_id|サイト|Object|
|size|制限サイズ|Integer|
|state|状態|String|
|text_index|全文検索インデックス(未使用)|String|
|updated|更新日時|DateTime|

## cms_members / メンバー

|Field|Description|Type|
|-----|-----------|----|
|_id|ID|Integer|
|addr|住所|String|
|birthday|生年月日|Date|
|created|作成日時|DateTime|
|deleted|削除日時|DateTime|
|deliver_category_ids|Deliver category ids|SS::Extensions::ObjectIds|
|email|メールアドレス|String|
|email_type|Email type|String|
|first_registered|初回登録日時|DateTime|
|job|職種|String|
|kana|氏名（ふりがな）|String|
|last_loggedin|最終ログイン日時|DateTime|
|name|氏名|String|
|oauth_id|OAuth ID|String|
|oauth_token|OAuth トークン|String|
|oauth_type|OAuth Type|String|
|organization_name|会社、団体名|String|
|password|パスワード|String|
|postal_code|郵便番号|String|
|sex|性別|String|
|site_email|Site email|String|
|site_id|サイト|Object|
|state|ステータス|String|
|subscribe_line_message|LINEメッセージ|String|
|subscribe_richmenu_id|LINEリッチメニューID|String|
|subscription_ids|購読メルマガ|SS::Extensions::ObjectIds|
|tel|電話番号|String|
|text_index|全文検索インデックス(未使用)|String|
|updated|更新日時|DateTime|
|verify_mail_sent|Verify mail sent|DateTime|
|icon_id|アイコン画像|Object|

## cms_michecker_results / miChecker結果

|Field|Description|Type|
|-----|-----------|----|
|_id|ID|Integer|
|at|At|Integer|
|closed|終了日時|DateTime|
|created|作成日時|DateTime|
|current_count|処理件数|Integer|
|deleted|削除日時|DateTime|
|interrupt|中止命令|String|
|michecker_last_executed_at|最終実行日時|DateTime|
|michecker_last_job_id|Michecker last job|String|
|michecker_last_result|最終実行結果|Integer|
|name|タスク名|String|
|segment|セグメント|String|
|site_id|サイト|Object|
|started|開始日時|DateTime|
|state|ステータス|String|
|target_class|モデル|String|
|target_id|ID|String|
|target_type|種別|String|
|text_index|全文検索インデックス(未使用)|String|
|total_count|全体件数|Integer|
|updated|更新日時|DateTime|
|user_id|ユーザー|Object|

## cms_nodes / フォルダー

|Field|Description|Type|
|-----|-----------|----|
|_id|ID|Integer|
|body_layout_id|本文レイアウト|Object|
|category_ids|Category ids|SS::Extensions::ObjectIds|
|close_days_before|公開終了間近の表示日|Integer|
|created|作成日時|DateTime|
|default_close_days_after|公開終了日|Integer|
|default_release_days_after|公開開始日|Integer|
|default_release_plan_state|公開予約の既定値|String|
|deleted|削除日時|DateTime|
|depth|フォルダ階層|Integer|
|filename|フォルダー名|String|
|first_released|First released|DateTime|
|group_ids|管理グループ|SS::Extensions::ObjectIds|
|imported|Imported|DateTime|
|index_name|一覧用タイトル|String|
|layout_id|レイアウト|Object|
|location_ids|Location ids|SS::Extensions::ObjectIds|
|md5|ハッシュ値|String|
|name|タイトル|String|
|order|並び順|Integer|
|page_layout_id|ページレイアウト|Object|
|permission_level|権限レベル|Integer|
|redirect_link|Redirect link|String|
|released|公開日時|DateTime|
|released_type|公開日時種別|String|
|route|フォルダー属性|String|
|service_ids|Service ids|SS::Extensions::ObjectIds|
|shortcut|ショートカット|String|
|site_id|サイト|Object|
|st_category_ids|St category ids|SS::Extensions::ObjectIds|
|st_location_ids|St location ids|SS::Extensions::ObjectIds|
|st_service_ids|St service ids|SS::Extensions::ObjectIds|
|state|ステータス|String|
|text_index|全文検索インデックス(未使用)|String|
|updated|更新日時|DateTime|
|user_id|ユーザー|Object|
|view_route|既定のモジュール|String|
|description|概要|String|
|export_columns|出力するカラム|SS::Extensions::Lines|
|export_filename|出力ファイル名|String|
|export_page_name|記事タイトルのカラム|String|
|form_id|定型フォーム|Object|
|keywords|キーワード|SS::Extensions::Words|
|node_id|記事フォルダー|Object|
|summary_html|サマリー|String|
|condition_forms|検索条件(定型フォーム)|Cms::Extensions::ConditionForms|
|conditions|検索条件(URL)|SS::Extensions::Lines|
|limit|表示件数|Integer|
|loop_format|ループHTML形式|String|
|loop_html|ループHTML|String|
|loop_liquid|ループHTML|String|
|loop_setting_id|定義済みループHTML|Object|
|lower_html|下部HTML|String|
|map_center|中心位置|Map::Extensions::Loc|
|map_center_setting|中心位置設定|String|
|map_cluster_setting|マーカークラスター|String|
|map_html|地図HTML|String|
|map_marker_liquid|マーカーHTML|String|
|map_search_options|検索オプション|Article::Extensions::MapSearchOptions|
|map_zoom_level|ズーム|Integer|
|map_zoom_setting|ズーム設定|String|
|new_days|NEWマーク期間|Integer|
|no_items_display_state|ページ未検出時表示|String|
|sidebar_loop_liquid|サイドバーループHTML|String|
|sort|並び順|String|
|sort_column_direction|並び順（方向）|String|
|sort_column_name|並び順（項目名）|String|
|substitute_html|代替HTML|String|
|upper_html|上部HTML|String|
|color_button|文字色変更ボタン|String|
|content_quota|容量制限|Integer|
|editor_css_path|スタイルシートパス|String|
|for_member_state|会員向け|String|
|node_line_auto_post|LINE投稿|String|
|node_line_edit_auto_post|編集時に自動投稿|String|
|node_line_post_format|投稿形式|String|
|node_twitter_auto_post|Twitter投稿|String|
|node_twitter_edit_auto_post|編集時に自動投稿|String|
|node_twitter_post_format|投稿形式|String|
|opendata_site_ids|サイト|SS::Extensions::ObjectIds|
|st_form_default_id|St form default|Object|
|st_form_ids|定型フォーム設定|SS::Extensions::ObjectIds|
|st_tags|タグ|SS::Extensions::Words|
|syntax_check|アクセシビリティチェック|String|
|show_email|メールアドレスの表示|String|
|banned_words|禁止語句設定|SS::Extensions::Lines|
|captcha|画像認証|String|
|captcha_test|認証画像の表示確認|String|
|deletable_post|パスワードによる削除|String|
|deny_ips|拒否IPアドレス|SS::Extensions::Lines|
|deny_url|URl投稿拒否|String|
|file_ext_limit|ファイル拡張子|SS::Extensions::Lines|
|file_limit|添付ファイル|Integer|
|file_scan|ウイルスチェック|String|
|file_size_limit|容量制限|Integer|
|mode|表示形式|String|
|show_url|URLの表示|String|
|text_size_limit|本文の最大文字数|Integer|
|readable_group_ids|閲覧グループ|SS::Extensions::ObjectIds|
|readable_member_ids|閲覧ユーザー|SS::Extensions::ObjectIds|
|readable_setting_range|公開範囲|String|
|summary_page_id|サマリーページ|Object|
|child_limit|表示件数|Integer|
|child_loop_html|ループHTML|String|
|child_lower_html|下部HTML|String|
|child_upper_html|上部HTML|String|
|list_origin|起点|String|
|map_icon_url|マーカアイコンURL|String|
|node_routes|フォルダー属性|SS::Extensions::Words|
|thumb_id|サムネイル画像|Object|
|chat_retry|フィードバック返答(いいえ)|String|
|chat_success|フィードバック返答(はい)|String|
|exception_text|例外文章|String|
|first_suggest|開始時サジェスト|SS::Extensions::Lines|
|first_text|開始時文章|String|
|question|フィードバック|String|
|radius|半径(km)|Integer|
|response_template|返答テンプレート|String|
|set_location|位置情報送信テキスト|String|
|ckan_basicauth_password|Basic認証パスワード|String|
|ckan_basicauth_state|Basic認証|String|
|ckan_basicauth_username|Basic認証ユーザー名|String|
|ckan_item_url|リンクのURL共通部分|String|
|ckan_json_cache|Ckan json cache|String|
|ckan_max_docs|最大件数|Integer|
|ckan_url|URL|String|
|archive_view|表示設定|String|
|condition_group_ids|Condition group ids|SS::Extensions::ObjectIds|
|close_date|公開終了日時(予約)|DateTime|
|release_date|公開開始日時(予約)|DateTime|
|event_display|表示形式|String|
|ical_basic_password|ベーシック認証パスワード|String|
|ical_basic_user|ベーシック認証ユーザー|String|
|ical_category_ids|ページカテゴリー|SS::Extensions::ObjectIds|
|ical_import_date_after|取り込み制限(未来)|Integer|
|ical_import_date_ago|取り込み制限(過去)|Integer|
|ical_import_url|iCal配信URL|String|
|ical_max_docs|最大保存件数|Integer|
|ical_page_state|ページステータス|String|
|ical_refresh_method|更新方法|String|
|ical_sync_method|同期方法|String|
|sender_email|送信メールアドレス|String|
|sender_name|送信者名|String|
|signature_html|署名（HTML版）|String|
|signature_text|署名（テキスト版）|String|
|subscription_constraint|制約|String|
|reply_lower_text|下部確認テキスト|String|
|reply_signature|署名|String|
|reply_upper_text|上部確認テキスト|String|
|image_id|Image|Object|
|center_point|中心座標|Map::Extensions::Point|
|facility_caption|キャプション|String|
|csv_assoc|CSV連携|String|
|additional_info|追加情報|Cms::Extensions::AdditionalInfo|
|address|住所|String|
|fax|FAX|String|
|kana|施設名ふりがな|String|
|map_points|座標|Array|
|postcode|郵便番号|String|
|related_url|URL|String|
|tel|電話番号|String|
|search_html|検索HTML|String|
|center|回収センター|String|
|garbage_type|ゴミの種類|Array|
|bgcolor|背景色|String|
|style|スタイル|String|
|rest_end|休止終了日|DateTime|
|rest_start|休止開始日|DateTime|
|remark|出し方・ワンポイント|String|
|guide_html|ガイド画面 HTML|String|
|guide_index_html|ガイド開始画面 HTML|String|
|guide_url_fragment|ガイドURLアンカー|String|
|procedure_ids|その他の手続き|SS::Extensions::ObjectIds|
|area_states|エリアステータス|Array|
|supplement_state|補足の表示|String|
|aggregation_state|集計設定|String|
|faq_id|FAQフォルダー|Object|
|from_email|差出人メールアドレス|String|
|from_name|差出人名|String|
|inquiry_captcha|画像認証|String|
|inquiry_html|説明テキスト|String|
|inquiry_results_html|集計結果テキスト|String|
|inquiry_sent_html|送信完了テキスト|String|
|kintone_app_activation|連携|String|
|kintone_app_api_token|APIトークン|String|
|kintone_app_guest_space_id|ゲストスペースID|String|
|kintone_app_key|アプリID|String|
|notice_content|通知内容|String|
|notice_email|通知メールアドレス|String|
|notice_state|通知設定|String|
|reception_close_date|回答受付終了日|DateTime|
|reception_start_date|回答受付開始日|DateTime|
|reply_content_state|返信内容|String|
|reply_content_static|固定メッセージ|String|
|reply_state|返信設定|String|
|reply_subject|返信件名|String|
|arrival_days|緊急情報表示期間|Integer|
|mail_page_from_conditions|送信者メールアドレス|SS::Extensions::Lines|
|mail_page_to_conditions|宛先メールアドレス|SS::Extensions::Lines|
|terminate_line|終端文字列|String|
|urgency_node_id|フォルダー|Object|
|urgency_state|切り替え|String|
|page_limit|ページ表示件数|Integer|
|blog_page_location_ids|地域設定|SS::Extensions::ObjectIds|
|genres|ジャンル設定|SS::Extensions::Lines|
|member_id|メンバー|Object|
|facebook_client_id|App ID|String|
|facebook_client_secret|App Secret|String|
|facebook_oauth|OAuth 認証|String|
|form_auth|フォーム認証|String|
|github_client_id|Client ID|String|
|github_client_secret|Client Secret|String|
|github_oauth|OAuth 認証|String|
|google_oauth2_client_id|クライアントID|String|
|google_oauth2_client_secret|クライアントシークレット|String|
|google_oauth2_oauth|OAuth 認証|String|
|line_client_id|チャネルID|String|
|line_client_secret|チャネルシークレット|String|
|line_oauth|OAuth 認証|String|
|redirect_url|リダイレクトURL|String|
|twitter_client_id|Consumer Key|String|
|twitter_client_secret|Consumer Secret|String|
|twitter_oauth|OAuth 認証|String|
|yahoojp_client_id|アプリケーションID|String|
|yahoojp_client_secret|シークレット|String|
|yahoojp_oauth|OAuth 認証|String|
|yahoojp_v2_client_id|アプリケーションID|String|
|yahoojp_v2_client_secret|シークレット|String|
|yahoojp_v2_oauth|OAuth 認証|String|
|gpf_api_key|APIキー|String|
|gpf_domain_name|ドメイン名|String|
|gpf_mode_cache|Gpf mode cache|Hash|
|gpf_repository|リポジトリ|String|
|gpf_state|状態|String|
|map_state|状態|String|
|map_view_state|地図表示状態|String|
|group_invitation_signature|署名|String|
|group_invitation_subject|件名|String|
|group_invitation_template|メールテンプレート|String|
|member_invitation_signature|署名|String|
|member_invitation_subject|件名|String|
|member_invitation_template|メールテンプレート|String|
|member_joins_to_invited_group|招待グループへの参加|String|
|sender_signature|署名|String|
|addr_required|住所|String|
|birthday_required|生年月日|String|
|job_required|職種|String|
|kana_required|氏名（ふりがな）|String|
|organization_name_required|会社、団体名|String|
|postal_code_required|郵便番号|String|
|sex_required|性別|String|
|tel_required|電話番号|String|
|html|Html|String|
|license_free|誰でも利用可|String|
|license_not_free|許可が必要|String|
|completed_lower_text|下部確認テキスト|String|
|completed_subject|件名|String|
|completed_upper_text|上部確認テキスト|String|
|confirm_personal_data_html|個人情報保護HTML|String|
|confirm_personal_data_state|個人情報保護状態|String|
|footer_html|フッターHTML|String|
|header_html|ヘッダーHTML|String|
|reset_password_lower_text|下部確認テキスト|String|
|reset_password_subject|件名|String|
|reset_password_upper_text|上部確認テキスト|String|
|categories_limit|分野数の上限|Object|
|show_point|ポイント表示|String|
|show_tabs|タブ表示|SS::Extensions::Words|
|tab_titles|Tab titles|Hash|
|pref_code_id|Pref code|Object|
|estat_categories_limit|eStat分野数の上限|Object|
|st_estat_category_ids|eStat分野|SS::Extensions::ObjectIds|
|page_state|ページステータス|String|
|rss_max_docs|最大保存件数|Integer|
|rss_refresh_method|更新方法|String|
|rss_url|RSS配信URL|String|
|anpi_mail_id|Anpi mail|Object|
|earthquake_intensity|震度|String|
|loop_mail_text|ループメール|String|
|lower_mail_text|下部メール|String|
|my_anpi_post_id|My anpi post|Object|
|target_region_ids|Target region ids|SS::Extensions::ObjectIds|
|title_mail_text|メール件名|String|
|upper_mail_text|上部メール|String|
|related_urgency_site_ids|連携サイト|SS::Extensions::ObjectIds|
|urgency_default_layout_id|通常時レイアウト|Object|
|urgency_mail_page_layout_id|メール取込レイアウト|Object|

## cms_notices / お知らせ

|Field|Description|Type|
|-----|-----------|----|
|_id|ID|Integer|
|close_date|公開終了日時(予約)|DateTime|
|contains_urls|Contains urls|Array|
|created|作成日時|DateTime|
|deleted|削除日時|DateTime|
|file_ids|File ids|SS::Extensions::ObjectIds|
|group_ids|管理グループ|SS::Extensions::ObjectIds|
|html|Html|String|
|markdown|Markdown|String|
|name|タイトル|String|
|notice_severity|種別|String|
|notice_target|公開範囲|String|
|permission_level|権限レベル|Integer|
|release_date|公開開始日時(予約)|DateTime|
|released|公開日時|DateTime|
|site_id|サイト|Object|
|state|ステータス|String|
|text_index|全文検索インデックス(未使用)|String|
|updated|更新日時|DateTime|
|user_id|ユーザー|Object|
|value_contains_urls|Value contains urls|Array|

## cms_page_index_queues

|Field|Description|Type|
|-----|-----------|----|
|_id|ID|BSON::ObjectId|
|action|Action|String|
|created|作成日時|DateTime|
|deleted|削除日時|DateTime|
|filename|ファイル名|String|
|page_id|Page|Object|
|site_id|サイト|Object|
|text_index|全文検索インデックス(未使用)|String|
|updated|更新日時|DateTime|
|user_id|ユーザー|Object|

## cms_page_releases

|Field|Description|Type|
|-----|-----------|----|
|_id|ID|BSON::ObjectId|
|action|Action|String|
|created|作成日時|DateTime|
|deleted|削除日時|DateTime|
|filename|ファイル名|String|
|page_id|Page|Object|
|site_id|サイト|Object|
|text_index|全文検索インデックス(未使用)|String|
|updated|更新日時|DateTime|
|user_id|ユーザー|Object|

## cms_page_searches / ページ検索

|Field|Description|Type|
|-----|-----------|----|
|_id|ID|Integer|
|created|作成日時|DateTime|
|deleted|削除日時|DateTime|
|group_ids|管理グループ|SS::Extensions::ObjectIds|
|name|名前|String|
|order|並び順|Integer|
|permission_level|権限レベル|Integer|
|search_approved_after|Search approved after|Integer|
|search_approved_close|承認日時（終了）|DateTime|
|search_approved_condition|Search approved condition|String|
|search_approved_start|承認日時（開始）|DateTime|
|search_approver_state|承認ステータス|String|
|search_category_ids|カテゴリー|SS::Extensions::ObjectIds|
|search_filename|ファイル名|String|
|search_first_released|公開ステータス|String|
|search_group_ids|グループ|SS::Extensions::ObjectIds|
|search_keyword|キーワード|String|
|search_layout_ids|レイアウト|SS::Extensions::ObjectIds|
|search_name|タイトル|String|
|search_node_ids|フォルダー|SS::Extensions::ObjectIds|
|search_released_after|Search released after|Integer|
|search_released_close|公開日時（終了）|DateTime|
|search_released_condition|Search released condition|String|
|search_released_start|公開日時（開始）|DateTime|
|search_routes|ページ属性|SS::Extensions::Words|
|search_sort|検索結果の並び順|String|
|search_state|ステータス|String|
|search_updated_after|Search updated after|Integer|
|search_updated_close|更新日時（終了）|DateTime|
|search_updated_condition|Search updated condition|String|
|search_updated_start|更新日時（開始）|DateTime|
|search_user_ids|作成者|SS::Extensions::ObjectIds|
|site_id|サイト|Object|
|text_index|全文検索インデックス(未使用)|String|
|updated|更新日時|DateTime|

## cms_pages / ページ

|Field|Description|Type|
|-----|-----------|----|
|_id|ID|Integer|
|additional_attr|追加属性|Cms::Extensions::HtmlAttributes|
|ads_category_ids|Ads category ids|SS::Extensions::ObjectIds|
|body_layout_id|本文レイアウト|Object|
|category_ids|カテゴリー|SS::Extensions::ObjectIds|
|close_date|公開終了日時(予約)|DateTime|
|created|作成日時|DateTime|
|deleted|削除日時|DateTime|
|depth|フォルダ階層|Integer|
|file_id|バナー画像|Object|
|filename|ファイル名|String|
|first_released|First released|DateTime|
|group_ids|管理グループ|SS::Extensions::ObjectIds|
|imported|Imported|DateTime|
|index_name|一覧用タイトル|String|
|layout_id|レイアウト|Object|
|link_url|リンクURL|String|
|md5|ハッシュ値|String|
|name|サイト名|String|
|order|並び順|Integer|
|permission_level|権限レベル|Integer|
|redirect_link|Redirect link|String|
|release_date|公開開始日時(予約)|DateTime|
|released|公開日時|DateTime|
|released_type|公開日時種別|String|
|route|ページ属性|String|
|site_id|サイト|Object|
|size|容量|Integer|
|state|ステータス|String|
|text_index|全文検索インデックス(未使用)|String|
|updated|更新日時|DateTime|
|user_id|ユーザー|Object|
|approved|承認日時|DateTime|
|body_parts|Body parts|Array|
|center_setting|中心位置指定方法|String|
|column_values_updated|定型フォーム更新日|DateTime|
|contact_charge|担当|String|
|contact_email|メールアドレス|String|
|contact_fax|ファックス番号|String|
|contact_group_contact_id|Contact group contact|Object|
|contact_group_id|所属|Object|
|contact_group_relation|連絡先連動設定|String|
|contact_link_name|リンク名|String|
|contact_link_url|リンクURL|String|
|contact_state|表示設定|String|
|contact_tel|電話番号|String|
|contains_urls|Contains urls|Array|
|description|概要|String|
|event_dates|イベント日|Event::Extensions::EventDates|
|event_deadline|申込締切|DateTime|
|event_name|イベントタイトル|String|
|event_recurrences|定期開催|Event::Extensions::Recurrences|
|file_ids|File ids|SS::Extensions::ObjectIds|
|form_contains_urls|定型フォームURL一覧|Array|
|form_id|定型フォーム|Object|
|gravatar_email|Gravatar用メールアドレス|String|
|gravatar_image_view_kind|画像表示ステータス|String|
|gravatar_screen_name|投稿者表示名|String|
|html|本文|String|
|keywords|キーワード|SS::Extensions::Words|
|line_auto_post|LINE投稿|String|
|line_edit_auto_post|編集時に自動投稿|String|
|line_post_error|投稿エラー|String|
|line_post_format|投稿形式|String|
|line_posted|LINE投稿履歴|Array|
|line_text_message|LINEメッセージ|String|
|lock_owner_id|Lock owner|Object|
|lock_until|期限|DateTime|
|map_points|マーカー設定|Map::Extensions::Points|
|map_reference_column_name|マーカー項目名|String|
|map_reference_method|マーカー指定方法|String|
|map_zoom_level|地図の縮尺（自動ズームレベル）|Integer|
|markdown|Markdown|String|
|master_id|Master|Object|
|opendata_area_ids|地域|SS::Extensions::ObjectIds|
|opendata_category_ids|カテゴリー|SS::Extensions::ObjectIds|
|opendata_dataset_group_ids|データセットグループ|SS::Extensions::ObjectIds|
|opendata_dataset_ids|データセット|SS::Extensions::ObjectIds|
|opendata_dataset_state|公開状態|String|
|opendata_license_ids|ライセンス|SS::Extensions::ObjectIds|
|opendata_resources|Opendata resources|Hash|
|parent_crumb_urls|親フォルダー|SS::Extensions::Lines|
|related_page_ids|関連記事|SS::Extensions::ObjectIds|
|related_page_sort|並び順|String|
|requested|Requested|DateTime|
|set_center_position|中心位置|String|
|set_zoom_level|指定ズームレベル|Integer|
|summary_html|サマリー|String|
|tags|タグ|SS::Extensions::Words|
|thumb_id|サムネイル画像|Object|
|twitter_auto_post|Twitter投稿|String|
|twitter_edit_auto_post|編集時に自動投稿|String|
|twitter_post_error|投稿エラー|String|
|twitter_post_format|投稿形式|String|
|twitter_posted|Twitter投稿履歴|Array|
|value_contains_urls|Value contains urls|Array|
|workflow_agent_id|Workflow agent|Object|
|workflow_approver_attachment_uses|承認者によるファイル追加|Array|
|workflow_approvers|承認者|Workflow::Extensions::WorkflowApprovers|
|workflow_circulation_attachment_uses|回覧者によるファイル追加|Array|
|workflow_circulations|回覧者|Workflow::Extensions::WorkflowCirculations|
|workflow_comment|申請コメント|String|
|workflow_current_circulation_level|現在の回覧ステップ|Integer|
|workflow_kind|承認の種類|String|
|workflow_member_id|申請メンバー|Integer|
|workflow_on_remand|差し戻し時|String|
|workflow_pull_up|引き上げ承認|String|
|workflow_reminder_sent_at|Workflow reminder sent at|DateTime|
|workflow_required_counts|必要承認数|Workflow::Extensions::Route::RequiredCounts|
|workflow_state|承認状態|String|
|workflow_user_id|申請者|Object|
|zoom_setting|ズーム指定方法|String|
|additional_info|Additional info|Cms::Extensions::AdditionalInfo|
|contact|お問い合わせ|String|
|content|内容|String|
|cost|費用|String|
|facility_ids|施設|SS::Extensions::ObjectIds|
|ical_link|ソースURL|String|
|ical_uid|ソースID|String|
|related_url|URL|String|
|schedule|日時|String|
|venue|開催場所|String|
|completed|Completed|Mongoid::Boolean|
|deliver_date|配信予約日時|DateTime|
|test_delivered|テスト配信完了日時|DateTime|
|text|本文（テキスト版）|String|
|image_alt|ALT属性|String|
|image_comment|説明文|String|
|image_id|Image|Object|
|image_thumb_height|高さ|Integer|
|image_thumb_width|幅|Integer|
|color_button|文字色変更ボタン|String|
|editor_css_path|スタイルシートパス|String|
|question|質問|String|
|syntax_check|アクセシビリティチェック|String|
|area_state|エリアステータス|String|
|coords|Coords|Array|
|shape|Shape|String|
|arrival_close_date|緊急情報表示終了日時|DateTime|
|arrival_start_date|緊急情報表示開始日時|DateTime|
|mail_page_original_mail|Mail page original mail|String|
|blog_page_location_ids|Blog page location ids|SS::Extensions::ObjectIds|
|genres|ジャンル|SS::Extensions::Lines|
|member_id|メンバー|Object|
|caption|キャプション|String|
|license_name|ライセンス|String|
|listable_state|一覧及び検索結果への表示|String|
|photo_category_ids|Photo category ids|SS::Extensions::ObjectIds|
|photo_location_ids|Photo location ids|SS::Extensions::ObjectIds|
|slide_order|スライド並び順|Integer|
|slideable_state|スライドへの表示|String|
|member_photo_ids|Member photo ids|SS::Extensions::ObjectIds|
|appurl|公開URL|String|
|area_ids|地域|SS::Extensions::ObjectIds|
|dataset_ids|関連データセット|SS::Extensions::ObjectIds|
|executed|実行回数|Integer|
|license|ライセンス|String|
|point|評価|Integer|
|assoc_file_id|Assoc file|Integer|
|assoc_method|連携確認方法|String|
|assoc_node_id|連携フォルダー|Integer|
|assoc_node_ids|連携フォルダー|SS::Extensions::ObjectIds|
|assoc_page_id|連携ページ|Integer|
|assoc_page_ids|連携ページ|SS::Extensions::ObjectIds|
|assoc_site_id|連携サイト|Integer|
|assoc_site_ids|連携サイト|SS::Extensions::ObjectIds|
|creator_name|データ作成者|String|
|dataset_group_ids|グループ|SS::Extensions::ObjectIds|
|downloaded|合計ダウンロード数|Integer|
|estat_category_ids|eStat分野|SS::Extensions::ObjectIds|
|harvest_api_type|Harvest api type|String|
|harvest_host|Harvest host|String|
|harvest_imported|Harvest imported|DateTime|
|harvest_imported_attributes|Harvest imported attributes|Hash|
|harvest_imported_url|Harvest imported url|String|
|harvest_importer_id|Harvest importer|Object|
|harvest_source_url|Harvest source url|String|
|harvest_text_index|テキストインデックス|String|
|update_plan|更新頻度|String|
|update_plan_date|更新予定日|DateTime|
|update_plan_mail_state|更新予定日のメール通知|String|
|update_plan_unit|Update plan unit|String|
|uuid|Uuid|String|
|app_ids|App ids|SS::Extensions::ObjectIds|
|commented|合計コメント数|DateTime|
|data|データ|String|
|issue|課題|String|
|note|備考|String|
|total_comment|Total comment|Integer|
|rss_link|ソースURL|String|
|event_id|イベントID|String|
|sitemap_deny_urls|除外URL|SS::Extensions::Lines|
|sitemap_depth|表示階層数|Integer|
|sitemap_page_state|ページの表示|String|
|sitemap_urls|URLリスト|SS::Extensions::Lines|

## cms_parts / パーツ

|Field|Description|Type|
|-----|-----------|----|
|_id|ID|Integer|
|ajax_view|動的表示|String|
|ajax_view_expire_seconds|動的表示キャッシュ|Integer|
|created|作成日時|DateTime|
|deleted|削除日時|DateTime|
|depth|フォルダ階層|Integer|
|filename|ファイル名|String|
|first_released|First released|DateTime|
|group_ids|管理グループ|SS::Extensions::ObjectIds|
|imported|Imported|DateTime|
|index_name|一覧用タイトル|String|
|link_action|リンク動作|String|
|link_target|リンク表示|String|
|lower_html|下部HTML|String|
|md5|ハッシュ値|String|
|mobile_view|携帯向け表示|String|
|name|パーツ名|String|
|order|並び順|Integer|
|permission_level|権限レベル|Integer|
|released|公開日時|DateTime|
|released_type|公開日時種別|String|
|route|パーツ属性|String|
|site_id|サイト|Object|
|sort|並び順|String|
|state|ステータス|String|
|text_index|全文検索インデックス(未使用)|String|
|updated|更新日時|DateTime|
|upper_html|上部HTML|String|
|user_id|ユーザー|Object|
|with_category|カテゴリー連動|String|
|condition_forms|検索条件(定型フォーム)|Cms::Extensions::ConditionForms|
|conditions|検索条件(URL)|SS::Extensions::Lines|
|limit|表示件数|Integer|
|loop_format|ループHTML形式|String|
|loop_html|ループHTML|String|
|loop_liquid|ループHTML|String|
|loop_setting_id|定義済みループHTML|Object|
|new_days|NEWマーク期間|Integer|
|no_items_display_state|ページ未検出時表示|String|
|sort_column_direction|並び順（方向）|String|
|sort_column_name|並び順（項目名）|String|
|substitute_html|代替HTML|String|
|search_node_id|検索フォルダー|Object|
|list_origin|起点|String|
|node_routes|フォルダー属性|SS::Extensions::Words|
|chat_path|フォルダーパス|String|
|exporter_id|エクスポート|Object|
|ckan_basicauth_password|Basic認証パスワード|String|
|ckan_basicauth_state|Basic認証|String|
|ckan_basicauth_username|Basic認証ユーザー名|String|
|ckan_status|種類|String|
|ckan_url|URL|String|
|ckan_value_cache|Ckan value cache|Integer|
|ckan_value_url|件数部分のリンクURL|String|
|clipboard_copy_selector|CSSセレクター|String|
|clipboard_copy_target|コピー対象|String|
|home_label|ホームラベル|String|
|html|Html|String|
|periods|表示期間|Integer|
|placeholder|プレースホルダー|String|
|site_search_keywords|注目ワード|SS::Extensions::Lines|
|sns_share_orders|並び順|Hash|
|sns_share_states|表示|Hash|
|event_display|表示形式|String|
|feedback_confirmation|確認画面|String|
|kv_pause|静止時間|Integer|
|kv_speed|スライド時間|Integer|
|kv_autoplay|自動再生|String|
|kv_navigation|ページ送り|String|
|kv_pagination_style|ページネーション|String|
|kv_space|スライド間隔|Integer|
|kv_thumbnail|サムネイル画像|String|
|kv_thumbnail_count|サムネイル数|Integer|
|login_link_url|ログインURL|String|
|node_url|フォトフォルダーURL|String|
|display_target|表示対象|String|
|exclude_paths|除外パス|SS::Extensions::Lines|

## cms_roles / ロール

|Field|Description|Type|
|-----|-----------|----|
|_id|ID|Integer|
|created|作成日時|DateTime|
|deleted|削除日時|DateTime|
|name|ロール名|String|
|permission_level|権限レベル|Integer|
|permissions|権限設定|SS::Extensions::Words|
|site_id|サイト|Object|
|text_index|全文検索インデックス(未使用)|String|
|updated|更新日時|DateTime|
|user_id|ユーザー|Object|

## cms_site_search_history_logs

|Field|Description|Type|
|-----|-----------|----|
|_id|ID|BSON::ObjectId|
|created|作成日時|DateTime|
|deleted|削除日時|DateTime|
|query|Query|Hash|
|remote_addr|Remote addr|String|
|site_id|サイト|Object|
|text_index|全文検索インデックス(未使用)|String|
|updated|更新日時|DateTime|
|user_agent|User agent|String|

## cms_sns_post_logs

|Field|Description|Type|
|-----|-----------|----|
|_id|ID|BSON::ObjectId|
|_type|Type|String|
|action|アクション|String|
|created|作成日時|DateTime|
|deleted|削除日時|DateTime|
|error|Error|String|
|name|タイトル|String|
|site_id|サイト|Object|
|source_id|連携対象|Object|
|source_name|Source name|String|
|source_type|Source type|String|
|state|ステータス|String|
|text_index|全文検索インデックス(未使用)|String|
|updated|更新日時|DateTime|

## cms_source_cleaner_templates

|Field|Description|Type|
|-----|-----------|----|
|_id|ID|Integer|
|action_type|Action type|String|
|created|作成日時|DateTime|
|deleted|削除日時|DateTime|
|name|名前|String|
|order|並び順|Integer|
|replace_source|対象の属性値|String|
|replaced_value|置換後の値|String|
|site_id|サイト|Object|
|state|ステータス|String|
|target_type|対象の種別|String|
|target_value|対象の名称|String|
|text_index|全文検索インデックス(未使用)|String|
|updated|更新日時|DateTime|

## cms_theme_templates / Theme切り替え

|Field|Description|Type|
|-----|-----------|----|
|_id|ID|Integer|
|background_color|背景色|String|
|class_name|class属性|String|
|created|作成日時|DateTime|
|css_path|cssパス|String|
|default_theme|既定のtheme|String|
|deleted|削除日時|DateTime|
|font_color|文字色|String|
|high_contrast_mode|設定|String|
|name|名前|String|
|order|並び順|Integer|
|site_id|サイト|Object|
|state|ステータス|String|
|text_index|全文検索インデックス(未使用)|String|
|updated|更新日時|DateTime|

## cms_word_dictionaries / かな辞書

|Field|Description|Type|
|-----|-----------|----|
|_id|ID|Integer|
|body|設定|String|
|created|作成日時|DateTime|
|deleted|削除日時|DateTime|
|name|名前|String|
|site_id|サイト|Object|
|text_index|全文検索インデックス(未使用)|String|
|updated|更新日時|DateTime|

## ezine_columns / メルマガ項目

|Field|Description|Type|
|-----|-----------|----|
|_id|ID|Integer|
|additional_attr|追加属性|String|
|created|作成日時|DateTime|
|deleted|削除日時|DateTime|
|html|説明テキスト|String|
|input_type|入力形式|String|
|name|項目名|String|
|node_id|Node|Object|
|order|並び順|Integer|
|required|必須入力|String|
|select_options|選択肢|SS::Extensions::Lines|
|site_id|サイト|Object|
|state|ステータス|String|
|text_index|全文検索インデックス(未使用)|String|
|updated|更新日時|DateTime|

## ezine_entries / メルマガ購読依頼

|Field|Description|Type|
|-----|-----------|----|
|_id|ID|BSON::ObjectId|
|created|作成日時|DateTime|
|deleted|削除日時|DateTime|
|email|メールアドレス|String|
|email_type|配信形式|String|
|entry_type|登録種別|String|
|node_id|Node|Object|
|site_id|サイト|Object|
|text_index|全文検索インデックス(未使用)|String|
|updated|更新日時|DateTime|
|verification_token|Verification token|String|

## ezine_entry_data

|Field|Description|Type|
|-----|-----------|----|
|_id|ID|BSON::ObjectId|
|column_id||Object|
|value||String|
|values||Array|

## ezine_members / メルマガ購読者

|Field|Description|Type|
|-----|-----------|----|
|_id|ID|BSON::ObjectId|
|created|作成日時|DateTime|
|deleted|削除日時|DateTime|
|email|メールアドレス|String|
|email_type|配信形式|String|
|node_id|Node|Object|
|site_id|サイト|Object|
|state|配信状態|String|
|text_index|全文検索インデックス(未使用)|String|
|updated|更新日時|DateTime|
|user_id|ユーザー|Object|

## ezine_results

|Field|Description|Type|
|-----|-----------|----|
|_id|ID|BSON::ObjectId|
|count||Integer|
|delivered||DateTime|
|started||DateTime|

## ezine_sent_logs

|Field|Description|Type|
|-----|-----------|----|
|_id|ID|BSON::ObjectId|
|created|配信日時|DateTime|
|deleted|削除日時|DateTime|
|email|メールアドレス|String|
|node_id|Node|Object|
|page_id|Page|Object|
|text_index|全文検索インデックス(未使用)|String|
|updated|更新日時|DateTime|

## ezine_test_members

|Field|Description|Type|
|-----|-----------|----|
|_id|ID|BSON::ObjectId|
|created|作成日時|DateTime|
|deleted|削除日時|DateTime|
|email|メールアドレス|String|
|email_type|配信形式|String|
|node_id|Node|Object|
|site_id|サイト|Object|
|text_index|全文検索インデックス(未使用)|String|
|updated|更新日時|DateTime|
|user_id|ユーザー|Object|

## guide_diagram_edges

|Field|Description|Type|
|-----|-----------|----|
|_id|ID|BSON::ObjectId|
|created|作成日時|DateTime|
|deleted|削除日時|DateTime|
|explanation|Explanation|String|
|point_ids|Point ids|SS::Extensions::ObjectIds|
|question_type|Question type|String|
|text_index|全文検索インデックス(未使用)|String|
|transition|Transition|String|
|updated|更新日時|DateTime|
|value|選択肢の質問|String|

## guide_diagram_point

|Field|Description|Type|
|-----|-----------|----|
|_id|ID|BSON::ObjectId|
|_type|Type|String|
|created|作成日時|DateTime|
|deleted|削除日時|DateTime|
|explanation|Explanation|String|
|id_name|Id name|String|
|name|Name|String|
|node_id|Node|Object|
|order|Order|Integer|
|site_id|サイト|Object|
|text_index|全文検索インデックス(未使用)|String|
|updated|更新日時|DateTime|
|user_id|ユーザー|Object|

## gws_affair_capital_years / 年度設定

|Field|Description|Type|
|-----|-----------|----|
|_id|ID|Integer|
|close_date|終了日|Date|
|code|西暦|String|
|created|作成日時|DateTime|
|deleted|削除日時|DateTime|
|name|年度|String|
|site_id|組織|Object|
|start_date|開始日|Date|
|text_index|全文検索インデックス(未使用)|String|
|updated|更新日時|DateTime|
|user_group_id|作成者(グループ)|Integer|
|user_group_name|作成者(グループ名)|String|
|user_id|作成者|Object|
|user_name|作成者(氏名)|String|
|user_uid|作成者(UID)|String|

## gws_affair_capitals / 原資区分

|Field|Description|Type|
|-----|-----------|----|
|_id|ID|Integer|
|article_code|款|Integer|
|basic_code|Basic code|String|
|basic_code_name|Basic code name|String|
|created|作成日時|DateTime|
|deleted|削除日時|DateTime|
|description_name|説明名称|String|
|detail_code|歳出明細番号|Integer|
|item_code|節|Integer|
|item_name|節名称|String|
|member_custom_group_ids|参加カスタムグループ|SS::Extensions::ObjectIds|
|member_group_ids|参加グループ|SS::Extensions::ObjectIds|
|member_ids|参加ユーザー|SS::Extensions::ObjectIds|
|name|原資区分名|String|
|project_code|事業連番|Integer|
|project_name|事業名称|String|
|section_code|項|Integer|
|site_id|組織|Object|
|subitem_code|細節|Integer|
|subitem_name|細節名称|String|
|subsection_code|目|Integer|
|text_index|全文検索インデックス(未使用)|String|
|updated|更新日時|DateTime|
|user_group_id|作成者(グループ)|Integer|
|user_group_name|作成者(グループ名)|String|
|user_id|作成者|Object|
|user_name|作成者(氏名)|String|
|user_uid|作成者(UID)|String|
|year_code|西暦|String|
|year_id|年度|Object|
|year_name|年度名|String|

## gws_affair_duty_calendars / 勤務カレンダー

|Field|Description|Type|
|-----|-----------|----|
|_id|ID|Integer|
|created|作成日時|DateTime|
|deleted|削除日時|DateTime|
|duty_hour_ids|勤務時間|SS::Extensions::ObjectIds|
|duty_notice_ids|警告|SS::Extensions::ObjectIds|
|flextime_state|自由時間勤務|String|
|holiday_calendar_ids|休日|SS::Extensions::ObjectIds|
|member_custom_group_ids|参加カスタムグループ|SS::Extensions::ObjectIds|
|member_group_ids|参加グループ|SS::Extensions::ObjectIds|
|member_ids|参加ユーザー|SS::Extensions::ObjectIds|
|name|名称|String|
|site_id|組織|Object|
|text_index|全文検索インデックス(未使用)|String|
|updated|更新日時|DateTime|
|user_group_id|作成者(グループ)|Integer|
|user_group_name|作成者(グループ名)|String|
|user_id|作成者|Object|
|user_name|作成者(氏名)|String|
|user_uid|作成者(UID)|String|

## gws_affair_duty_hours / 勤務時間

|Field|Description|Type|
|-----|-----------|----|
|_id|ID|BSON::ObjectId|
|affair_break_end_at_hour|Affair break end at hour|Integer|
|affair_break_end_at_hour_0|Affair break end at hour 0|Integer|
|affair_break_end_at_hour_1|Affair break end at hour 1|Integer|
|affair_break_end_at_hour_2|Affair break end at hour 2|Integer|
|affair_break_end_at_hour_3|Affair break end at hour 3|Integer|
|affair_break_end_at_hour_4|Affair break end at hour 4|Integer|
|affair_break_end_at_hour_5|Affair break end at hour 5|Integer|
|affair_break_end_at_hour_6|Affair break end at hour 6|Integer|
|affair_break_end_at_minute|Affair break end at minute|Integer|
|affair_break_end_at_minute_0|Affair break end at minute 0|Integer|
|affair_break_end_at_minute_1|Affair break end at minute 1|Integer|
|affair_break_end_at_minute_2|Affair break end at minute 2|Integer|
|affair_break_end_at_minute_3|Affair break end at minute 3|Integer|
|affair_break_end_at_minute_4|Affair break end at minute 4|Integer|
|affair_break_end_at_minute_5|Affair break end at minute 5|Integer|
|affair_break_end_at_minute_6|Affair break end at minute 6|Integer|
|affair_break_start_at_hour|Affair break start at hour|Integer|
|affair_break_start_at_hour_0|Affair break start at hour 0|Integer|
|affair_break_start_at_hour_1|Affair break start at hour 1|Integer|
|affair_break_start_at_hour_2|Affair break start at hour 2|Integer|
|affair_break_start_at_hour_3|Affair break start at hour 3|Integer|
|affair_break_start_at_hour_4|Affair break start at hour 4|Integer|
|affair_break_start_at_hour_5|Affair break start at hour 5|Integer|
|affair_break_start_at_hour_6|Affair break start at hour 6|Integer|
|affair_break_start_at_minute|Affair break start at minute|Integer|
|affair_break_start_at_minute_0|Affair break start at minute 0|Integer|
|affair_break_start_at_minute_1|Affair break start at minute 1|Integer|
|affair_break_start_at_minute_2|Affair break start at minute 2|Integer|
|affair_break_start_at_minute_3|Affair break start at minute 3|Integer|
|affair_break_start_at_minute_4|Affair break start at minute 4|Integer|
|affair_break_start_at_minute_5|Affair break start at minute 5|Integer|
|affair_break_start_at_minute_6|Affair break start at minute 6|Integer|
|affair_end_at_hour|Affair end at hour|Integer|
|affair_end_at_hour_0|Affair end at hour 0|Integer|
|affair_end_at_hour_1|Affair end at hour 1|Integer|
|affair_end_at_hour_2|Affair end at hour 2|Integer|
|affair_end_at_hour_3|Affair end at hour 3|Integer|
|affair_end_at_hour_4|Affair end at hour 4|Integer|
|affair_end_at_hour_5|Affair end at hour 5|Integer|
|affair_end_at_hour_6|Affair end at hour 6|Integer|
|affair_end_at_minute|Affair end at minute|Integer|
|affair_end_at_minute_0|Affair end at minute 0|Integer|
|affair_end_at_minute_1|Affair end at minute 1|Integer|
|affair_end_at_minute_2|Affair end at minute 2|Integer|
|affair_end_at_minute_3|Affair end at minute 3|Integer|
|affair_end_at_minute_4|Affair end at minute 4|Integer|
|affair_end_at_minute_5|Affair end at minute 5|Integer|
|affair_end_at_minute_6|Affair end at minute 6|Integer|
|affair_start_at_hour|Affair start at hour|Integer|
|affair_start_at_hour_0|Affair start at hour 0|Integer|
|affair_start_at_hour_1|Affair start at hour 1|Integer|
|affair_start_at_hour_2|Affair start at hour 2|Integer|
|affair_start_at_hour_3|Affair start at hour 3|Integer|
|affair_start_at_hour_4|Affair start at hour 4|Integer|
|affair_start_at_hour_5|Affair start at hour 5|Integer|
|affair_start_at_hour_6|Affair start at hour 6|Integer|
|affair_start_at_minute|Affair start at minute|Integer|
|affair_start_at_minute_0|Affair start at minute 0|Integer|
|affair_start_at_minute_1|Affair start at minute 1|Integer|
|affair_start_at_minute_2|Affair start at minute 2|Integer|
|affair_start_at_minute_3|Affair start at minute 3|Integer|
|affair_start_at_minute_4|Affair start at minute 4|Integer|
|affair_start_at_minute_5|Affair start at minute 5|Integer|
|affair_start_at_minute_6|Affair start at minute 6|Integer|
|affair_time_wday|Affair time wday|Object|
|attendance_time_changed_minute|日替わり時刻|Integer|
|created|作成日時|DateTime|
|deleted|削除日時|DateTime|
|name|名称|String|
|overtime_in_work|標準勤務時間内での残業|String|
|site_id|組織|Object|
|text_index|全文検索インデックス(未使用)|String|
|updated|更新日時|DateTime|
|user_group_id|作成者(グループ)|Integer|
|user_group_name|作成者(グループ名)|String|
|user_id|作成者|Object|
|user_name|作成者(氏名)|String|
|user_uid|作成者(UID)|String|

## gws_affair_duty_notices

|Field|Description|Type|
|-----|-----------|----|
|_id|ID|Integer|
|body|警告文|String|
|created|作成日時|DateTime|
|deleted|削除日時|DateTime|
|name|名称|String|
|notice_type|種別|String|
|site_id|組織|Object|
|text_index|全文検索インデックス(未使用)|String|
|threshold_hour|上限時間|Integer|
|updated|更新日時|DateTime|
|user_group_id|作成者(グループ)|Integer|
|user_group_name|作成者(グループ名)|String|
|user_id|作成者|Object|
|user_name|作成者(氏名)|String|
|user_uid|作成者(UID)|String|

## gws_affair_holiday_calendars / 休日

|Field|Description|Type|
|-----|-----------|----|
|_id|ID|BSON::ObjectId|
|created|作成日時|DateTime|
|deleted|削除日時|DateTime|
|friday_type|金曜日|String|
|monday_type|月曜日|String|
|name|名称|String|
|national_holiday_type|勤務日が祝祭日の場合|String|
|saturday_type|土曜日|String|
|site_id|組織|Object|
|sunday_type|日曜日|String|
|text_index|全文検索インデックス(未使用)|String|
|thursday_type|木曜日|String|
|tuesday_type|火曜日|String|
|updated|更新日時|DateTime|
|user_group_id|作成者(グループ)|Integer|
|user_group_name|作成者(グループ名)|String|
|user_id|作成者|Object|
|user_name|作成者(氏名)|String|
|user_uid|作成者(UID)|String|
|wednesday_type|水曜日|String|

## gws_affair_leave_dates

|Field|Description|Type|
|-----|-----------|----|
|_id|ID|BSON::ObjectId|
|created|作成日時|DateTime|
|date|Date|DateTime|
|deleted|削除日時|DateTime|
|end_at|End at|DateTime|
|minute|Minute|Integer|
|start_at|Start at|DateTime|
|text_index|全文検索インデックス(未使用)|String|
|updated|更新日時|DateTime|
|working_minute|Working minute|Integer|

## gws_affair_leave_files

|Field|Description|Type|
|-----|-----------|----|
|_id|ID|Integer|
|approved|承認日時|DateTime|
|close_date|Close date|DateTime|
|created|作成日時|DateTime|
|custom_group_ids|管理カスタムグループ|SS::Extensions::ObjectIds|
|custom_groups_hash|管理カスタムグループ(ハッシュ)|Hash|
|date|Date|DateTime|
|deleted|削除日時|DateTime|
|end_at|終了時間|DateTime|
|file_ids|ファイル|SS::Extensions::ObjectIds|
|group_ids|管理グループ|SS::Extensions::ObjectIds|
|groups_hash|管理グループ(ハッシュ)|Hash|
|holiday_compensatory_file_id|振替申請（代休）|Object|
|leave_type|休暇区分|String|
|name|タイトル|String|
|permission_level|権限レベル|Integer|
|readable_custom_group_ids|閲覧カスタムグループ|SS::Extensions::ObjectIds|
|readable_custom_groups_hash|閲覧カスタムグループ(ハッシュ)|Hash|
|readable_group_ids|閲覧グループ|SS::Extensions::ObjectIds|
|readable_groups_hash|閲覧グループ(ハッシュ)|Hash|
|readable_member_ids|閲覧ユーザー|SS::Extensions::ObjectIds|
|readable_members_hash|閲覧ユーザー(ハッシュ)|Hash|
|readable_setting_range|公開範囲|String|
|reason|理由|String|
|release_date|Release date|DateTime|
|released|Released|DateTime|
|requested|申請日時|DateTime|
|site_id|組織|Object|
|special_leave_id|特別休暇区分|Object|
|start_at|開始時間|DateTime|
|state|ステータス|String|
|target_duty_calendar_id|Target duty calendar|Object|
|target_group_id|グループ|Object|
|target_group_name|Target group name|String|
|target_user_code|Target user code|String|
|target_user_id|ユーザー|Object|
|target_user_kana|Target user kana|String|
|target_user_name|Target user name|String|
|target_user_staff_address_uid|ユーザー設定画面から申請対象ユーザーの宛名番号|String|
|target_user_staff_category|ユーザー設定画面から申請対象ユーザーの職員区分|String|
|text_index|全文検索インデックス(未使用)|String|
|updated|更新日時|DateTime|
|user_group_id|作成者(グループ)|Integer|
|user_group_name|作成者(グループ名)|String|
|user_id|作成者|Object|
|user_ids|管理ユーザー|SS::Extensions::ObjectIds|
|user_name|作成者(氏名)|String|
|user_uid|作成者(UID)|String|
|users_hash|管理ユーザー(ハッシュ)|Hash|
|week_in_compensatory_file_id|振替申請（同一週内）|Object|
|week_out_compensatory_file_id|振替申請（同一週外）|Object|
|workflow_agent_id|Workflow agent|Object|
|workflow_approver_attachment_uses|Workflow approver attachment uses|Array|
|workflow_approvers|承認者|Workflow::Extensions::WorkflowApprovers|
|workflow_circulation_attachment_uses|Workflow circulation attachment uses|Array|
|workflow_circulations|回覧者|Workflow::Extensions::WorkflowCirculations|
|workflow_comment|申請コメント|String|
|workflow_current_circulation_level|Workflow current circulation level|Integer|
|workflow_kind|Workflow kind|String|
|workflow_member_id|Workflow member|Integer|
|workflow_on_remand|差し戻し時|String|
|workflow_pull_up|引き上げ承認|String|
|workflow_reminder_sent_at|Workflow reminder sent at|DateTime|
|workflow_required_counts|必要承認数|Workflow::Extensions::Route::RequiredCounts|
|workflow_state|承認状態|String|
|workflow_user_id|申請者|Object|

## gws_affair_leave_settings

|Field|Description|Type|
|-----|-----------|----|
|_id|ID|Integer|
|count|有効日数|Integer|
|created|作成日時|DateTime|
|deleted|削除日時|DateTime|
|name|タイトル|String|
|site_id|組織|Object|
|target_user_id|対象ユーザー|Object|
|text_index|全文検索インデックス(未使用)|String|
|updated|更新日時|DateTime|
|user_group_id|作成者(グループ)|Integer|
|user_group_name|作成者(グループ名)|String|
|user_id|作成者|Object|
|user_name|作成者(氏名)|String|
|user_uid|作成者(UID)|String|
|year_code|Year code|String|
|year_id|年度設定|Object|
|year_name|Year name|String|

## gws_affair_overtime_day_results

|Field|Description|Type|
|-----|-----------|----|
|_id|ID|BSON::ObjectId|
|break1_end_at|Break1 end at|DateTime|
|break1_start_at|Break1 start at|DateTime|
|break2_end_at|Break2 end at|DateTime|
|break2_start_at|Break2 start at|DateTime|
|break_time_minute|Break time minute|Integer|
|capital_basic_code|Capital basic code|String|
|capital_detail_code|Capital detail code|String|
|capital_id|Capital|Object|
|capital_project_code|Capital project code|String|
|capital_state|Capital state|String|
|created|作成日時|DateTime|
|date|Date|DateTime|
|date_fiscal_year|Date fiscal year|Integer|
|date_month|Date month|Integer|
|date_year|Date year|Integer|
|deleted|削除日時|DateTime|
|duty_day_in_work_time_minute|Duty day in work time minute|Integer|
|duty_day_time_minute|Duty day time minute|Integer|
|duty_night_time_minute|Duty night time minute|Integer|
|end_at|End at|DateTime|
|file_id|File|Object|
|holiday_compensatory_minute|Holiday compensatory minute|Integer|
|is_holiday|Is holiday|Mongoid::Boolean|
|leave_day_time_minute|Leave day time minute|Integer|
|leave_night_time_minute|Leave night time minute|Integer|
|result_closed|Result closed|DateTime|
|site_id|組織|Object|
|start_at|Start at|DateTime|
|target_duty_calendar_id|Target duty calendar|Object|
|target_group_id|グループ|Object|
|target_group_name|Target group name|String|
|target_user_code|Target user code|String|
|target_user_id|ユーザー|Object|
|target_user_kana|Target user kana|String|
|target_user_name|Target user name|String|
|target_user_staff_address_uid|ユーザー設定画面から申請対象ユーザーの宛名番号|String|
|target_user_staff_category|ユーザー設定画面から申請対象ユーザーの職員区分|String|
|text_index|全文検索インデックス(未使用)|String|
|updated|更新日時|DateTime|
|user_group_id|作成者(グループ)|Integer|
|user_group_name|作成者(グループ名)|String|
|user_id|作成者|Object|
|user_name|作成者(氏名)|String|
|user_uid|作成者(UID)|String|
|week_in_compensatory_minute|Week in compensatory minute|Integer|
|week_out_compensatory_minute|Week out compensatory minute|Integer|

## gws_affair_overtime_files / 時間外申請

|Field|Description|Type|
|-----|-----------|----|
|_id|ID|Integer|
|approved|承認日時|DateTime|
|capital_basic_code|Capital basic code|String|
|capital_detail_code|Capital detail code|String|
|capital_id|原資区分|Object|
|capital_project_code|Capital project code|String|
|capital_state|Capital state|String|
|close_date|Close date|DateTime|
|created|作成日時|DateTime|
|custom_group_ids|管理カスタムグループ|SS::Extensions::ObjectIds|
|custom_groups_hash|管理カスタムグループ(ハッシュ)|Hash|
|date|Date|DateTime|
|deleted|削除日時|DateTime|
|end_at|終了時間|DateTime|
|group_ids|管理グループ|SS::Extensions::ObjectIds|
|groups_hash|管理グループ(ハッシュ)|Hash|
|holiday_compensatory_end_at|Holiday compensatory end at|DateTime|
|holiday_compensatory_minute|代休振替|Integer|
|holiday_compensatory_start_at|Holiday compensatory start at|DateTime|
|name|タイトル|String|
|overtime_name|業務名|String|
|permission_level|権限レベル|Integer|
|readable_custom_group_ids|閲覧カスタムグループ|SS::Extensions::ObjectIds|
|readable_custom_groups_hash|閲覧カスタムグループ(ハッシュ)|Hash|
|readable_group_ids|閲覧グループ|SS::Extensions::ObjectIds|
|readable_groups_hash|閲覧グループ(ハッシュ)|Hash|
|readable_member_ids|閲覧ユーザー|SS::Extensions::ObjectIds|
|readable_members_hash|閲覧ユーザー(ハッシュ)|Hash|
|readable_setting_range|公開範囲|String|
|release_date|Release date|DateTime|
|released|Released|DateTime|
|remark|備考|String|
|requested|申請日時|DateTime|
|result_closed|結果確認日時|DateTime|
|result_created|結果入力日時|DateTime|
|result_updated|結果編集日時|DateTime|
|site_id|組織|Object|
|start_at|開始時間|DateTime|
|state|ステータス|String|
|target_duty_calendar_id|Target duty calendar|Object|
|target_group_id|グループ|Object|
|target_group_name|Target group name|String|
|target_user_code|Target user code|String|
|target_user_id|ユーザー|Object|
|target_user_kana|Target user kana|String|
|target_user_name|Target user name|String|
|target_user_staff_address_uid|ユーザー設定画面から申請対象ユーザーの宛名番号|String|
|target_user_staff_category|ユーザー設定画面から申請対象ユーザーの職員区分|String|
|text_index|全文検索インデックス(未使用)|String|
|updated|更新日時|DateTime|
|user_group_id|作成者(グループ)|Integer|
|user_group_name|作成者(グループ名)|String|
|user_id|作成者|Object|
|user_ids|管理ユーザー|SS::Extensions::ObjectIds|
|user_name|作成者(氏名)|String|
|user_uid|作成者(UID)|String|
|users_hash|管理ユーザー(ハッシュ)|Hash|
|week_in_compensatory_minute|同一週内振替|Integer|
|week_in_end_at|同一週内振替終了時間|DateTime|
|week_in_start_at|同一週内振替開始時間|DateTime|
|week_out_compensatory_minute|同一週外振替|Integer|
|week_out_end_at|同一週外振替終了時間|DateTime|
|week_out_start_at|同一週外振替開始時間|DateTime|
|workflow_agent_id|Workflow agent|Object|
|workflow_approver_attachment_uses|Workflow approver attachment uses|Array|
|workflow_approvers|承認者|Workflow::Extensions::WorkflowApprovers|
|workflow_circulation_attachment_uses|Workflow circulation attachment uses|Array|
|workflow_circulations|回覧者|Workflow::Extensions::WorkflowCirculations|
|workflow_comment|申請コメント|String|
|workflow_current_circulation_level|Workflow current circulation level|Integer|
|workflow_kind|Workflow kind|String|
|workflow_member_id|Workflow member|Integer|
|workflow_on_remand|差し戻し時|String|
|workflow_pull_up|引き上げ承認|String|
|workflow_reminder_sent_at|Workflow reminder sent at|DateTime|
|workflow_required_counts|必要承認数|Workflow::Extensions::Route::RequiredCounts|
|workflow_state|承認状態|String|
|workflow_user_id|申請者|Object|

## gws_affair_overtime_results

|Field|Description|Type|
|-----|-----------|----|
|_id|ID|BSON::ObjectId|
|break1_end_at|Break1 end at|DateTime|
|break1_start_at|Break1 start at|DateTime|
|break2_end_at|Break2 end at|DateTime|
|break2_start_at|Break2 start at|DateTime|
|break_time_minute|休憩時間|Integer|
|created|作成日時|DateTime|
|date|Date|DateTime|
|deleted|削除日時|DateTime|
|end_at|終了時間|DateTime|
|start_at|開始時間|DateTime|
|text_index|全文検索インデックス(未使用)|String|
|updated|更新日時|DateTime|

## gws_affair_shift_calendars

|Field|Description|Type|
|-----|-----------|----|
|_id|ID|Integer|
|created|作成日時|DateTime|
|deleted|削除日時|DateTime|
|site_id|組織|Object|
|text_index|全文検索インデックス(未使用)|String|
|updated|更新日時|DateTime|
|user_group_id|作成者(グループ)|Integer|
|user_group_name|作成者(グループ名)|String|
|user_id|作成者|Object|
|user_name|作成者(氏名)|String|
|user_uid|作成者(UID)|String|

## gws_affair_shift_records

|Field|Description|Type|
|-----|-----------|----|
|_id|ID|BSON::ObjectId|
|affair_end_at_hour|Affair end at hour|Integer|
|affair_end_at_minute|Affair end at minute|Integer|
|affair_start_at_hour|Affair start at hour|Integer|
|affair_start_at_minute|Affair start at minute|Integer|
|created|作成日時|DateTime|
|date|日付|DateTime|
|deleted|削除日時|DateTime|
|shift_calendar_id|Shift calendar|Object|
|text_index|全文検索インデックス(未使用)|String|
|updated|更新日時|DateTime|
|wday_type|休日設定|String|

## gws_affair_special_leaves

|Field|Description|Type|
|-----|-----------|----|
|_id|ID|Integer|
|code|コード|String|
|created|作成日時|DateTime|
|deleted|削除日時|DateTime|
|name|名称|String|
|order|並び順|Integer|
|site_id|組織|Object|
|staff_category|職員区分|String|
|text_index|全文検索インデックス(未使用)|String|
|updated|更新日時|DateTime|
|user_group_id|作成者(グループ)|Integer|
|user_group_name|作成者(グループ名)|String|
|user_id|作成者|Object|
|user_name|作成者(氏名)|String|
|user_uid|作成者(UID)|String|

## gws_aggregation_groups

|Field|Description|Type|
|-----|-----------|----|
|_id|ID|Integer|
|activation_date|Activation date|DateTime|
|created|作成日時|DateTime|
|deleted|削除日時|DateTime|
|expiration_date|Expiration date|DateTime|
|group_id|Group|Object|
|name|Name|String|
|order|Order|Integer|
|site_id|組織|Object|
|text_index|全文検索インデックス(未使用)|String|
|updated|更新日時|DateTime|
|user_ids|User ids|SS::Extensions::ObjectIds|

## gws_attendance_histories / 履歴

|Field|Description|Type|
|-----|-----------|----|
|_id|ID|BSON::ObjectId|
|action|アクション|String|
|created|修正時刻|DateTime|
|date|日付|DateTime|
|deleted|削除日時|DateTime|
|field_name|フィールド名|String|
|reason|備考|String|
|reason_type|修正理由|String|
|text_index|全文検索インデックス(未使用)|String|
|time|Time|DateTime|
|updated|更新日時|DateTime|

## gws_attendance_records / レコード

|Field|Description|Type|
|-----|-----------|----|
|_id|ID|BSON::ObjectId|
|break_enter1|休始1|DateTime|
|break_enter2|休始2|DateTime|
|break_enter3|休始3|DateTime|
|break_leave1|休終1|DateTime|
|break_leave2|休終2|DateTime|
|break_leave3|休終3|DateTime|
|created|作成日時|DateTime|
|date|日付|DateTime|
|deleted|削除日時|DateTime|
|enter|出勤|DateTime|
|leave|退勤|DateTime|
|memo|備考|String|
|text_index|全文検索インデックス(未使用)|String|
|updated|更新日時|DateTime|
|working_hour|Working hour|Integer|
|working_minute|Working minute|Integer|

## gws_attendance_time_cards / タイムカード

|Field|Description|Type|
|-----|-----------|----|
|_id|ID|BSON::ObjectId|
|created|作成日時|DateTime|
|date|日付|DateTime|
|deleted|削除日時|DateTime|
|lock_state|ロック状態|String|
|name|名前|String|
|site_id|組織|Object|
|text_index|全文検索インデックス(未使用)|String|
|updated|更新日時|DateTime|
|user_group_id|作成者(グループ)|Integer|
|user_group_name|作成者(グループ名)|String|
|user_id|作成者|Object|
|user_name|作成者(氏名)|String|
|user_uid|作成者(UID)|String|

## gws_board_posts / 投稿

|Field|Description|Type|
|-----|-----------|----|
|_id|ID|Integer|
|contributor_id|投稿者（データID）|String|
|contributor_model|投稿者（モデル）|String|
|contributor_name|投稿者名|String|
|created|投稿日|DateTime|
|custom_group_ids|管理カスタムグループ|SS::Extensions::ObjectIds|
|custom_groups_hash|管理カスタムグループ(ハッシュ)|Hash|
|deleted|削除日時|DateTime|
|descendants_files_count|トピック内添付ファイル数|Integer|
|descendants_total_file_size|トピック内添付ファイル容量|Integer|
|descendants_updated|トピック内更新日時|DateTime|
|file_ids|ファイル|SS::Extensions::ObjectIds|
|group_ids|管理グループ|SS::Extensions::ObjectIds|
|groups_hash|管理グループ(ハッシュ)|Hash|
|links|リンク|Array|
|mode|表示形式|String|
|name|タイトル|String|
|parent_id|親投稿|Object|
|permission_level|権限レベル|Integer|
|permit_comment|コメント|String|
|readable_custom_group_ids|Readable custom group ids|SS::Extensions::ObjectIds|
|readable_custom_groups_hash|Readable custom groups hash|Hash|
|readable_group_ids|Readable group ids|SS::Extensions::ObjectIds|
|readable_groups_hash|Readable groups hash|Hash|
|readable_member_ids|Readable member ids|SS::Extensions::ObjectIds|
|readable_members_hash|Readable members hash|Hash|
|readable_setting_range|Readable setting range|String|
|severity|重要度|String|
|site_id|組織|Object|
|state|ステータス|String|
|text|内容|String|
|text_index|全文検索インデックス(未使用)|String|
|text_type|内容形式|String|
|topic_id|トピック|Object|
|updated|最終更新日|DateTime|
|user_group_id|作成者(グループ)|Integer|
|user_group_name|作成者(グループ名)|String|
|user_id|作成者|Object|
|user_ids|管理ユーザー|SS::Extensions::ObjectIds|
|user_name|作成者(氏名)|String|
|user_uid|作成者(UID)|String|
|users_hash|管理ユーザー(ハッシュ)|Hash|
|browsed_users_hash|既読ユーザー|Hash|
|category_ids|カテゴリー|SS::Extensions::ObjectIds|
|close_date|公開終了日時(予約)|DateTime|
|member_custom_group_ids|参加カスタムグループ|SS::Extensions::ObjectIds|
|member_group_ids|参加グループ|SS::Extensions::ObjectIds|
|member_ids|参加ユーザー|SS::Extensions::ObjectIds|
|notification_noticed_at|Notification noticed at|DateTime|
|notify_state|通知設定|String|
|release_date|公開開始日時(予約)|DateTime|
|released|公開日時|DateTime|
|subscribed_users_readable_state|通知先表示|String|

## gws_bookmark_folders / フォルダー

|Field|Description|Type|
|-----|-----------|----|
|_id|ID|Integer|
|created|作成日時|DateTime|
|deleted|削除日時|DateTime|
|depth|階層|Integer|
|folder_type|Folder type|String|
|name|フォルダー名|String|
|order|並び順|Integer|
|site_id|組織|Object|
|state|状態|String|
|text_index|全文検索インデックス(未使用)|String|
|updated|更新日時|DateTime|
|user_group_id|作成者(グループ)|Integer|
|user_group_name|作成者(グループ名)|String|
|user_id|作成者|Object|
|user_name|作成者(氏名)|String|
|user_uid|作成者(UID)|String|

## gws_bookmarks / お気に入り

|Field|Description|Type|
|-----|-----------|----|
|_id|ID|Integer|
|bookmark_model|機能|String|
|created|作成日時|DateTime|
|deleted|削除日時|DateTime|
|folder_id|フォルダー|Object|
|link_target|ターゲット|String|
|name|名前|String|
|order|並び順|Integer|
|site_id|組織|Object|
|text_index|全文検索インデックス(未使用)|String|
|updated|更新日時|DateTime|
|url|URL|String|
|user_group_id|作成者(グループ)|Integer|
|user_group_name|作成者(グループ名)|String|
|user_id|作成者|Object|
|user_name|作成者(氏名)|String|
|user_uid|作成者(UID)|String|

## gws_categories / 汎用カテゴリー

|Field|Description|Type|
|-----|-----------|----|
|_id|ID|Integer|
|color|表示色|String|
|created|作成日時|DateTime|
|custom_group_ids|管理カスタムグループ|SS::Extensions::ObjectIds|
|custom_groups_hash|管理カスタムグループ(ハッシュ)|Hash|
|deleted|削除日時|DateTime|
|group_ids|管理グループ|SS::Extensions::ObjectIds|
|groups_hash|管理グループ(ハッシュ)|Hash|
|model|モデル|String|
|name|カテゴリー名|String|
|order|並び順|Integer|
|permission_level|権限レベル|Integer|
|readable_custom_group_ids|閲覧カスタムグループ|SS::Extensions::ObjectIds|
|readable_custom_groups_hash|閲覧カスタムグループ(ハッシュ)|Hash|
|readable_group_ids|閲覧グループ|SS::Extensions::ObjectIds|
|readable_groups_hash|閲覧グループ(ハッシュ)|Hash|
|readable_member_ids|閲覧ユーザー|SS::Extensions::ObjectIds|
|readable_members_hash|閲覧ユーザー(ハッシュ)|Hash|
|readable_setting_range|公開範囲|String|
|site_id|組織|Object|
|state|状態|String|
|subscribed_custom_group_ids|購読カスタムグループ|SS::Extensions::ObjectIds|
|subscribed_custom_groups_hash|購読カスタムグループ(ハッシュ)|Hash|
|subscribed_group_ids|購読グループ|SS::Extensions::ObjectIds|
|subscribed_groups_hash|購読グループ(ハッシュ)|Hash|
|subscribed_member_ids|購読ユーザー|SS::Extensions::ObjectIds|
|subscribed_members_hash|購読ユーザー(ハッシュ)|Hash|
|text_index|全文検索インデックス(未使用)|String|
|updated|更新日時|DateTime|
|user_group_id|作成者(グループ)|Integer|
|user_group_name|作成者(グループ名)|String|
|user_id|作成者|Object|
|user_ids|管理ユーザー|SS::Extensions::ObjectIds|
|user_name|作成者(氏名)|String|
|user_uid|作成者(UID)|String|
|users_hash|管理ユーザー(ハッシュ)|Hash|
|depth_level|深さ|Integer|

## gws_chorg_changesets / 変更内容

|Field|Description|Type|
|-----|-----------|----|
|_id|ID|Integer|
|created|作成日時|DateTime|
|deleted|削除日時|DateTime|
|destinations|移動先|Array|
|revision_id|リビジョン|Object|
|sources|移動元|Array|
|text_index|全文検索インデックス(未使用)|String|
|type|種別|String|
|updated|更新日時|DateTime|

## gws_chorg_revisions / リビジョン

|Field|Description|Type|
|-----|-----------|----|
|_id|ID|Integer|
|created|作成日時|DateTime|
|delete_method|削除方法|String|
|deleted|削除日時|DateTime|
|job_ids|ジョブ|Array|
|lock_until|ロック期限日時|DateTime|
|name|名前|String|
|site_id|組織|Object|
|text_index|全文検索インデックス(未使用)|String|
|updated|更新日時|DateTime|
|user_csv_file_id|ユーザーCSVファイル|Object|

## gws_chorg_run_params / 組織変更実行オプション

|Field|Description|Type|
|-----|-----------|----|
|_id|ID|BSON::ObjectId|
|created|作成日時|DateTime|
|deleted|削除日時|DateTime|
|reservation|予約実行|DateTime|
|staff_record_code|電子職員録西暦|String|
|staff_record_name|電子職員録年度名|String|
|staff_record_state|電子職員録|String|
|text_index|全文検索インデックス(未使用)|String|
|updated|更新日時|DateTime|

## gws_circular_posts / トピック

|Field|Description|Type|
|-----|-----------|----|
|_id|ID|Integer|
|browsing_authority|公開範囲|String|
|created|作成日時|DateTime|
|custom_group_ids|管理カスタムグループ|SS::Extensions::ObjectIds|
|custom_groups_hash|管理カスタムグループ(ハッシュ)|Hash|
|deleted|削除日時|DateTime|
|group_ids|管理グループ|SS::Extensions::ObjectIds|
|groups_hash|管理グループ(ハッシュ)|Hash|
|name|タイトル|String|
|permission_level|権限レベル|Integer|
|post_id|Post|Object|
|site_id|組織|Object|
|text|コメント|String|
|text_index|全文検索インデックス(未使用)|String|
|updated|更新日時|DateTime|
|user_group_id|作成者(グループ)|Integer|
|user_group_name|作成者(グループ名)|String|
|user_id|作成者|Object|
|user_ids|管理ユーザー|SS::Extensions::ObjectIds|
|user_name|作成者(氏名)|String|
|user_uid|作成者(UID)|String|
|users_hash|管理ユーザー(ハッシュ)|Hash|
|category_ids|カテゴリー|SS::Extensions::ObjectIds|
|due_date|回覧期限日時|DateTime|
|file_ids|ファイル|SS::Extensions::ObjectIds|
|member_custom_group_ids|参加カスタムグループ|SS::Extensions::ObjectIds|
|member_group_ids|参加グループ|SS::Extensions::ObjectIds|
|member_ids|参加ユーザー|SS::Extensions::ObjectIds|
|see_type|既読にする形式|String|
|seen|既読|Hash|
|state|ステータス|String|
|text_type|内容形式|String|

## gws_column_value_bases

|Field|Description|Type|
|-----|-----------|----|
|_id|ID|BSON::ObjectId|
|_type|Type|String|
|column_id|Column|Object|
|created|作成日時|DateTime|
|deleted|削除日時|DateTime|
|name|Name|String|
|order|Order|Integer|
|text_index|全文検索インデックス(未使用)|String|
|updated|更新日時|DateTime|

## gws_columns / 入力項目

|Field|Description|Type|
|-----|-----------|----|
|_id|ID|BSON::ObjectId|
|_type|型|String|
|created|作成日時|DateTime|
|deleted|削除日時|DateTime|
|form_id|フォーム|Object|
|form_type|フォーム種別|String|
|name|名前|String|
|order|並び順|Integer|
|postfix_label|後ラベル|String|
|prefix_label|前ラベル|String|
|required|必須入力|String|
|site_id|組織|Object|
|text_index|全文検索インデックス(未使用)|String|
|tooltips|ツールチップ|SS::Extensions::Lines|
|updated|更新日時|DateTime|

## gws_contrasts / コントラスト

|Field|Description|Type|
|-----|-----------|----|
|_id|ID|BSON::ObjectId|
|color|背景色|String|
|created|作成日時|DateTime|
|deleted|削除日時|DateTime|
|name|名前|String|
|order|並び順|Integer|
|site_id|組織|Object|
|state|ステータス|String|
|text_color|文字色|String|
|text_index|全文検索インデックス(未使用)|String|
|updated|更新日時|DateTime|

## gws_custom_groups / カスタムグループ

|Field|Description|Type|
|-----|-----------|----|
|_id|ID|Integer|
|created|作成日時|DateTime|
|custom_group_ids|管理カスタムグループ|SS::Extensions::ObjectIds|
|custom_groups_hash|管理カスタムグループ(ハッシュ)|Hash|
|deleted|削除日時|DateTime|
|group_ids|管理グループ|SS::Extensions::ObjectIds|
|groups_hash|管理グループ(ハッシュ)|Hash|
|member_custom_group_ids|参加カスタムグループ|SS::Extensions::ObjectIds|
|member_group_ids|参加グループ|SS::Extensions::ObjectIds|
|member_ids|参加ユーザー|SS::Extensions::ObjectIds|
|name|グループ名|String|
|order|表示順|Integer|
|permission_level|権限レベル|Integer|
|readable_custom_group_ids|閲覧カスタムグループ|SS::Extensions::ObjectIds|
|readable_custom_groups_hash|閲覧カスタムグループ(ハッシュ)|Hash|
|readable_group_ids|閲覧グループ|SS::Extensions::ObjectIds|
|readable_groups_hash|閲覧グループ(ハッシュ)|Hash|
|readable_member_ids|閲覧ユーザー|SS::Extensions::ObjectIds|
|readable_members_hash|閲覧ユーザー(ハッシュ)|Hash|
|readable_setting_range|公開範囲|String|
|site_id|組織|Object|
|text_index|全文検索インデックス(未使用)|String|
|updated|更新日時|DateTime|
|user_group_id|作成者(グループ)|Integer|
|user_group_name|作成者(グループ名)|String|
|user_id|作成者|Object|
|user_ids|管理ユーザー|SS::Extensions::ObjectIds|
|user_name|作成者(氏名)|String|
|user_uid|作成者(UID)|String|
|users_hash|管理ユーザー(ハッシュ)|Hash|

## gws_daily_report_comments / コメント

|Field|Description|Type|
|-----|-----------|----|
|_id|ID|Integer|
|body|コメント|String|
|column_id|入力項目|Object|
|created|作成日時|DateTime|
|custom_group_ids|管理カスタムグループ|SS::Extensions::ObjectIds|
|custom_groups_hash|管理カスタムグループ(ハッシュ)|Hash|
|deleted|削除日時|DateTime|
|group_ids|管理グループ|SS::Extensions::ObjectIds|
|groups_hash|管理グループ(ハッシュ)|Hash|
|permission_level|権限レベル|Integer|
|report_id|業務日報|Object|
|report_key|入力項目キー|String|
|site_id|組織|Object|
|text_index|全文検索インデックス(未使用)|String|
|updated|更新日時|DateTime|
|user_group_id|作成者(グループ)|Integer|
|user_group_name|作成者(グループ名)|String|
|user_id|作成者|Object|
|user_ids|管理ユーザー|SS::Extensions::ObjectIds|
|user_name|作成者(氏名)|String|
|user_uid|作成者(UID)|String|
|users_hash|管理ユーザー(ハッシュ)|Hash|

## gws_daily_report_forms / 業務カテゴリー

|Field|Description|Type|
|-----|-----------|----|
|_id|ID|BSON::ObjectId|
|created|作成日時|DateTime|
|custom_group_ids|管理カスタムグループ|SS::Extensions::ObjectIds|
|custom_groups_hash|管理カスタムグループ(ハッシュ)|Hash|
|daily_report_group_id|部署|Object|
|deleted|削除日時|DateTime|
|group_ids|管理グループ|SS::Extensions::ObjectIds|
|groups_hash|管理グループ(ハッシュ)|Hash|
|memo|備考|String|
|name|部署名|String|
|order|並び順|Integer|
|permission_level|権限レベル|Integer|
|readable_custom_group_ids|閲覧カスタムグループ|SS::Extensions::ObjectIds|
|readable_custom_groups_hash|閲覧カスタムグループ(ハッシュ)|Hash|
|readable_group_ids|閲覧グループ|SS::Extensions::ObjectIds|
|readable_groups_hash|閲覧グループ(ハッシュ)|Hash|
|readable_member_ids|閲覧ユーザー|SS::Extensions::ObjectIds|
|readable_members_hash|閲覧ユーザー(ハッシュ)|Hash|
|readable_setting_range|公開範囲|String|
|site_id|組織|Object|
|text_index|全文検索インデックス(未使用)|String|
|updated|更新日時|DateTime|
|user_group_id|作成者(グループ)|Integer|
|user_group_name|作成者(グループ名)|String|
|user_id|作成者|Object|
|user_ids|管理ユーザー|SS::Extensions::ObjectIds|
|user_name|作成者(氏名)|String|
|user_uid|作成者(UID)|String|
|users_hash|管理ユーザー(ハッシュ)|Hash|
|year|年度|Integer|

## gws_daily_report_reports / 業務日報

|Field|Description|Type|
|-----|-----------|----|
|_id|ID|Integer|
|created|作成日時|DateTime|
|daily_report_date|日付|DateTime|
|daily_report_group_id|部署|Object|
|deleted|削除日時|DateTime|
|file_ids|ファイル|SS::Extensions::ObjectIds|
|form_id|フォーム|Object|
|limited_access|限定公開|String|
|name|タイトル|String|
|share_column_ids|部署で共有|SS::Extensions::ObjectIds|
|share_small_talk|部署で共有|String|
|site_id|組織|Object|
|small_talk|雑談|String|
|text|内容|String|
|text_index|全文検索インデックス(未使用)|String|
|text_type|内容形式|String|
|updated|更新日時|DateTime|
|user_group_id|作成者(グループ)|Integer|
|user_group_name|作成者(グループ名)|String|
|user_id|作成者|Object|
|user_name|作成者(氏名)|String|
|user_uid|作成者(UID)|String|

## gws_discussion_posts / 電子会議室

|Field|Description|Type|
|-----|-----------|----|
|_id|ID|Integer|
|contributor_id|投稿者（データID）|String|
|contributor_model|投稿者（モデル）|String|
|contributor_name|投稿者名|String|
|created|作成日時|DateTime|
|custom_group_ids|管理カスタムグループ|SS::Extensions::ObjectIds|
|custom_groups_hash|管理カスタムグループ(ハッシュ)|Hash|
|deleted|削除日時|DateTime|
|depth|層|Integer|
|descendants_updated|スレッド内更新日時|DateTime|
|file_ids|ファイル|SS::Extensions::ObjectIds|
|forum_id|電子会議室|Object|
|forum_quota|電子会議室容量制限|Integer|
|group_ids|管理グループ|SS::Extensions::ObjectIds|
|groups_hash|管理グループ(ハッシュ)|Hash|
|main_topic|メインスレッド|String|
|member_custom_group_ids|参加カスタムグループ|SS::Extensions::ObjectIds|
|member_group_ids|参加グループ|SS::Extensions::ObjectIds|
|member_ids|参加ユーザー|SS::Extensions::ObjectIds|
|name|タイトル|String|
|notify_state|通知設定|String|
|order|並び順|Integer|
|parent_id|親投稿|Object|
|permanently|編集禁止|String|
|permission_level|権限レベル|Integer|
|permit_comment|コメント投稿|String|
|released|公開日時|DateTime|
|site_id|組織|Object|
|state|ステータス|String|
|text|内容|String|
|text_index|全文検索インデックス(未使用)|String|
|text_type|内容形式|String|
|topic_id|スレッド|Object|
|topic_quota|スレッド容量制限|Integer|
|updated|更新日時|DateTime|
|user_group_id|作成者(グループ)|Integer|
|user_group_name|作成者(グループ名)|String|
|user_id|作成者|Object|
|user_ids|管理ユーザー|SS::Extensions::ObjectIds|
|user_name|作成者(氏名)|String|
|user_uid|作成者(UID)|String|
|users_hash|管理ユーザー(ハッシュ)|Hash|
|size|使用量|Integer|

## gws_facilities / 設備

|Field|Description|Type|
|-----|-----------|----|
|_id|ID|Integer|
|activation_date|有効期限（開始）|DateTime|
|approval_check_state|予約承認|String|
|category_id|カテゴリー|Object|
|created|作成日時|DateTime|
|custom_group_ids|管理カスタムグループ|SS::Extensions::ObjectIds|
|custom_groups_hash|管理カスタムグループ(ハッシュ)|Hash|
|deleted|削除日時|DateTime|
|expiration_date|有効期限（終了）|DateTime|
|group_ids|管理グループ|SS::Extensions::ObjectIds|
|groups_hash|管理グループ(ハッシュ)|Hash|
|max_days_limit|予約可能期間|Integer|
|max_minutes_limit|時間制限（最大）|Integer|
|min_minutes_limit|時間制限（最小）|Integer|
|name|設備名|String|
|order|並び順|Integer|
|permission_level|権限レベル|Integer|
|readable_custom_group_ids|閲覧カスタムグループ|SS::Extensions::ObjectIds|
|readable_custom_groups_hash|閲覧カスタムグループ(ハッシュ)|Hash|
|readable_group_ids|閲覧グループ|SS::Extensions::ObjectIds|
|readable_groups_hash|閲覧グループ(ハッシュ)|Hash|
|readable_member_ids|閲覧ユーザー|SS::Extensions::ObjectIds|
|readable_members_hash|閲覧ユーザー(ハッシュ)|Hash|
|readable_setting_range|公開範囲|String|
|reservable_group_ids|予約可能グループ|SS::Extensions::ObjectIds|
|reservable_groups_hash|予約可能グループ(ハッシュ)|Hash|
|reservable_member_ids|予約可能ユーザー|SS::Extensions::ObjectIds|
|reservable_members_hash|予約可能ユーザー(ハッシュ)|Hash|
|reservation_end_date|予約可能期間（終了）|DateTime|
|reservation_start_date|予約可能期間（開始）|DateTime|
|site_id|組織|Object|
|text|内容|String|
|text_index|全文検索インデックス(未使用)|String|
|text_type|内容形式|String|
|updated|更新日時|DateTime|
|user_group_id|作成者(グループ)|Integer|
|user_group_name|作成者(グループ名)|String|
|user_id|作成者|Object|
|user_ids|管理ユーザー|SS::Extensions::ObjectIds|
|user_name|作成者(氏名)|String|
|user_uid|作成者(UID)|String|
|users_hash|管理ユーザー(ハッシュ)|Hash|

## gws_facility_categories / カテゴリー

|Field|Description|Type|
|-----|-----------|----|
|_id|ID|Integer|
|created|作成日時|DateTime|
|custom_group_ids|管理カスタムグループ|SS::Extensions::ObjectIds|
|custom_groups_hash|管理カスタムグループ(ハッシュ)|Hash|
|deleted|削除日時|DateTime|
|group_ids|管理グループ|SS::Extensions::ObjectIds|
|groups_hash|管理グループ(ハッシュ)|Hash|
|name|カテゴリー名|String|
|order|並び順|Integer|
|permission_level|権限レベル|Integer|
|readable_custom_group_ids|閲覧カスタムグループ|SS::Extensions::ObjectIds|
|readable_custom_groups_hash|閲覧カスタムグループ(ハッシュ)|Hash|
|readable_group_ids|閲覧グループ|SS::Extensions::ObjectIds|
|readable_groups_hash|閲覧グループ(ハッシュ)|Hash|
|readable_member_ids|閲覧ユーザー|SS::Extensions::ObjectIds|
|readable_members_hash|閲覧ユーザー(ハッシュ)|Hash|
|readable_setting_range|公開範囲|String|
|site_id|組織|Object|
|text_index|全文検索インデックス(未使用)|String|
|updated|更新日時|DateTime|
|user_group_id|作成者(グループ)|Integer|
|user_group_name|作成者(グループ名)|String|
|user_id|作成者|Object|
|user_ids|管理ユーザー|SS::Extensions::ObjectIds|
|user_name|作成者(氏名)|String|
|user_uid|作成者(UID)|String|
|users_hash|管理ユーザー(ハッシュ)|Hash|

## gws_faq_posts / 投稿

|Field|Description|Type|
|-----|-----------|----|
|_id|ID|Integer|
|contributor_id|投稿者（データID）|String|
|contributor_model|投稿者（モデル）|String|
|contributor_name|投稿者名|String|
|created|投稿日|DateTime|
|custom_group_ids|管理カスタムグループ|SS::Extensions::ObjectIds|
|custom_groups_hash|管理カスタムグループ(ハッシュ)|Hash|
|deleted|削除日時|DateTime|
|descendants_files_count|トピック内添付ファイル数|Integer|
|descendants_total_file_size|トピック内添付ファイル容量|Integer|
|descendants_updated|トピック内更新日時|DateTime|
|file_ids|ファイル|SS::Extensions::ObjectIds|
|group_ids|管理グループ|SS::Extensions::ObjectIds|
|groups_hash|管理グループ(ハッシュ)|Hash|
|mode|表示形式|String|
|name|回答タイトル|String|
|parent_id|親投稿|Object|
|permission_level|権限レベル|Integer|
|permit_comment|コメント|String|
|readable_custom_group_ids|Readable custom group ids|SS::Extensions::ObjectIds|
|readable_custom_groups_hash|Readable custom groups hash|Hash|
|readable_group_ids|Readable group ids|SS::Extensions::ObjectIds|
|readable_groups_hash|Readable groups hash|Hash|
|readable_member_ids|Readable member ids|SS::Extensions::ObjectIds|
|readable_members_hash|Readable members hash|Hash|
|readable_setting_range|Readable setting range|String|
|severity|重要度|String|
|site_id|組織|Object|
|state|ステータス|String|
|text|内容|String|
|text_index|全文検索インデックス(未使用)|String|
|text_type|内容形式|String|
|topic_id|トピック|Object|
|updated|最終更新日|DateTime|
|user_group_id|作成者(グループ)|Integer|
|user_group_name|作成者(グループ名)|String|
|user_id|作成者|Object|
|user_ids|管理ユーザー|SS::Extensions::ObjectIds|
|user_name|作成者(氏名)|String|
|user_uid|作成者(UID)|String|
|users_hash|管理ユーザー(ハッシュ)|Hash|
|browsed_users_hash|既読ユーザー|Hash|
|category_ids|カテゴリー|SS::Extensions::ObjectIds|
|close_date|公開終了日時(予約)|DateTime|
|release_date|公開開始日時(予約)|DateTime|
|released|公開日時|DateTime|

## gws_histories / 操作履歴

|Field|Description|Type|
|-----|-----------|----|
|_id|ID|Integer|
|action|アクション|String|
|controller|コントローラー|String|
|created|変更日時|DateTime|
|deleted|削除日時|DateTime|
|item_id|項目ID|String|
|job|ジョブ|String|
|job_name|ジョブ名|String|
|message|メッセージ|String|
|mode|区分|String|
|model|モデル|String|
|model_name|モデル名|String|
|name|名称|String|
|path|URL|String|
|request_id|リクエストID|String|
|session_id|セッションID|String|
|severity|重要度|String|
|site_id|組織|Object|
|text_index|全文検索インデックス(未使用)|String|
|updated|更新日時|DateTime|
|updated_field_names|変更箇所|Array|
|updated_fields|変更箇所|Array|
|user_group_id|作成者(グループ)|Integer|
|user_group_name|作成者(グループ名)|String|
|user_id|作成者|Object|
|user_name|ユーザー|String|
|user_uid|作成者(UID)|String|

## gws_links / リンク集

|Field|Description|Type|
|-----|-----------|----|
|_id|ID|Integer|
|close_date|公開終了日時(予約)|DateTime|
|created|作成日時|DateTime|
|custom_group_ids|管理カスタムグループ|SS::Extensions::ObjectIds|
|custom_groups_hash|管理カスタムグループ(ハッシュ)|Hash|
|deleted|削除日時|DateTime|
|group_ids|管理グループ|SS::Extensions::ObjectIds|
|groups_hash|管理グループ(ハッシュ)|Hash|
|links|リンク|Array|
|name|タイトル|String|
|permission_level|権限レベル|Integer|
|readable_custom_group_ids|閲覧カスタムグループ|SS::Extensions::ObjectIds|
|readable_custom_groups_hash|閲覧カスタムグループ(ハッシュ)|Hash|
|readable_group_ids|閲覧グループ|SS::Extensions::ObjectIds|
|readable_groups_hash|閲覧グループ(ハッシュ)|Hash|
|readable_member_ids|閲覧ユーザー|SS::Extensions::ObjectIds|
|readable_members_hash|閲覧ユーザー(ハッシュ)|Hash|
|readable_setting_range|公開範囲|String|
|release_date|公開開始日時(予約)|DateTime|
|released|公開日時|DateTime|
|site_id|組織|Object|
|state|ステータス|String|
|text_index|全文検索インデックス(未使用)|String|
|updated|更新日時|DateTime|
|user_group_id|作成者(グループ)|Integer|
|user_group_name|作成者(グループ名)|String|
|user_id|作成者|Object|
|user_ids|管理ユーザー|SS::Extensions::ObjectIds|
|user_name|作成者(氏名)|String|
|user_uid|作成者(UID)|String|
|users_hash|管理ユーザー(ハッシュ)|Hash|

## gws_memo_filters / フィルター

|Field|Description|Type|
|-----|-----------|----|
|_id|ID|BSON::ObjectId|
|action|アクション|String|
|body|条件/本文|String|
|created|作成日時|DateTime|
|deleted|削除日時|DateTime|
|folder_id|フォルダー|Object|
|from_member_ids|条件/差出人|SS::Extensions::ObjectIds|
|name|フィルター名|String|
|order|並び順|Integer|
|site_id|組織|Object|
|state|状態|String|
|subject|条件/件名|String|
|text_index|全文検索インデックス(未使用)|String|
|to_member_ids|条件/宛先|SS::Extensions::ObjectIds|
|updated|更新日時|DateTime|
|user_group_id|作成者(グループ)|Integer|
|user_group_name|作成者(グループ名)|String|
|user_id|作成者|Object|
|user_name|作成者(氏名)|String|
|user_uid|作成者(UID)|String|

## gws_memo_folders / フォルダー

|Field|Description|Type|
|-----|-----------|----|
|_id|ID|Integer|
|created|作成日時|DateTime|
|deleted|削除日時|DateTime|
|name|フォルダー名|String|
|order|並び順|Integer|
|path|パス|String|
|site_id|組織|Object|
|text_index|全文検索インデックス(未使用)|String|
|updated|更新日時|DateTime|
|user_group_id|作成者(グループ)|Integer|
|user_group_name|作成者(グループ名)|String|
|user_id|作成者|Object|
|user_name|作成者(氏名)|String|
|user_uid|作成者(UID)|String|

## gws_memo_forwards / メール転送

|Field|Description|Type|
|-----|-----------|----|
|_id|ID|BSON::ObjectId|
|created|作成日時|DateTime|
|default|メール転送設定|String|
|deleted|削除日時|DateTime|
|emails|メールアドレス|SS::Extensions::Words|
|site_id|組織|Object|
|text_index|全文検索インデックス(未使用)|String|
|updated|更新日時|DateTime|
|user_group_id|作成者(グループ)|Integer|
|user_group_name|作成者(グループ名)|String|
|user_id|作成者|Object|
|user_name|作成者(氏名)|String|
|user_uid|作成者(UID)|String|

## gws_memo_lists / リスト

|Field|Description|Type|
|-----|-----------|----|
|_id|ID|BSON::ObjectId|
|category_ids|カテゴリー|SS::Extensions::ObjectIds|
|created|作成日時|DateTime|
|custom_group_ids|管理カスタムグループ|SS::Extensions::ObjectIds|
|custom_groups_hash|管理カスタムグループ(ハッシュ)|Hash|
|deleted|削除日時|DateTime|
|group_ids|管理グループ|SS::Extensions::ObjectIds|
|groups_hash|管理グループ(ハッシュ)|Hash|
|member_custom_group_ids|参加カスタムグループ|SS::Extensions::ObjectIds|
|member_group_ids|参加グループ|SS::Extensions::ObjectIds|
|member_ids|参加ユーザー|SS::Extensions::ObjectIds|
|name|タイトル|String|
|permission_level|権限レベル|Integer|
|readable_custom_group_ids|閲覧カスタムグループ|SS::Extensions::ObjectIds|
|readable_custom_groups_hash|閲覧カスタムグループ(ハッシュ)|Hash|
|readable_group_ids|閲覧グループ|SS::Extensions::ObjectIds|
|readable_groups_hash|閲覧グループ(ハッシュ)|Hash|
|readable_member_ids|閲覧ユーザー|SS::Extensions::ObjectIds|
|readable_members_hash|閲覧ユーザー(ハッシュ)|Hash|
|readable_setting_range|公開範囲|String|
|sender_name|送信者名|String|
|signature|署名|String|
|site_id|組織|Object|
|text_index|全文検索インデックス(未使用)|String|
|updated|更新日時|DateTime|
|user_group_id|作成者(グループ)|Integer|
|user_group_name|作成者(グループ名)|String|
|user_id|作成者|Object|
|user_ids|管理ユーザー|SS::Extensions::ObjectIds|
|user_name|作成者(氏名)|String|
|user_uid|作成者(UID)|String|
|users_hash|管理ユーザー(ハッシュ)|Hash|

## gws_memo_messages / メッセージ

|Field|Description|Type|
|-----|-----------|----|
|_id|ID|BSON::ObjectId|
|bcc_member_ids|BCC|SS::Extensions::ObjectIds|
|bcc_shared_address_group_ids|BCC（共有アドレス帳）|SS::Extensions::ObjectIds|
|bcc_webmail_address_group_ids|BCC（個人アドレス帳）|SS::Extensions::ObjectIds|
|cc_member_ids|CC|SS::Extensions::ObjectIds|
|cc_shared_address_group_ids|CC（共有アドレス帳）|SS::Extensions::ObjectIds|
|cc_webmail_address_group_ids|CC（個人アドレス帳）|SS::Extensions::ObjectIds|
|created|作成日時|DateTime|
|custom_group_ids|管理カスタムグループ|SS::Extensions::ObjectIds|
|custom_groups_hash|管理カスタムグループ(ハッシュ)|Hash|
|deleted|削除状態|Hash|
|file_ids|ファイル|SS::Extensions::ObjectIds|
|filtered|フィルター適用|Hash|
|format|フォーマット|String|
|from_member_name|差出人名|String|
|group_ids|管理グループ|SS::Extensions::ObjectIds|
|groups_hash|管理グループ(ハッシュ)|Hash|
|html|本文HTML|String|
|list_id|List|Object|
|member_custom_group_ids|参加カスタムグループ|SS::Extensions::ObjectIds|
|member_group_ids|参加グループ|SS::Extensions::ObjectIds|
|member_ids|参加ユーザー|SS::Extensions::ObjectIds|
|permission_level|権限レベル|Integer|
|request_mdn_ids|開封確認|SS::Extensions::ObjectIds|
|send_date|送信日時|DateTime|
|site_id|組織|Object|
|size|サイズ|Integer|
|star|フラグ|Hash|
|state|ステータス|String|
|subject|件名|String|
|text|本文TEXT|String|
|text_index|全文検索インデックス(未使用)|String|
|to_member_ids|宛先|SS::Extensions::ObjectIds|
|to_member_name|宛先名|String|
|to_shared_address_group_ids|宛先（共有アドレス帳）|SS::Extensions::ObjectIds|
|to_webmail_address_group_ids|宛先（個人アドレス帳）|SS::Extensions::ObjectIds|
|type|型名|String|
|updated|更新日時|DateTime|
|user_ids|管理ユーザー|SS::Extensions::ObjectIds|
|user_settings|User settings|Array|
|users_hash|管理ユーザー(ハッシュ)|Hash|
|priority|重要度|String|
|user_group_id|作成者(グループ)|Integer|
|user_group_name|作成者(グループ名)|String|
|user_id|作成者|Object|
|user_name|作成者(氏名)|String|
|user_uid|作成者(UID)|String|

## gws_memo_signatures / 署名

|Field|Description|Type|
|-----|-----------|----|
|_id|ID|BSON::ObjectId|
|created|作成日時|DateTime|
|default|既定の署名|String|
|deleted|削除日時|DateTime|
|name|名称|String|
|site_id|サイト|Object|
|text|本文|String|
|text_index|全文検索インデックス(未使用)|String|
|updated|更新日時|DateTime|
|user_id|ユーザー|Object|

## gws_memo_templates / 定型文

|Field|Description|Type|
|-----|-----------|----|
|_id|ID|BSON::ObjectId|
|created|作成日時|DateTime|
|custom_group_ids|管理カスタムグループ|SS::Extensions::ObjectIds|
|custom_groups_hash|管理カスタムグループ(ハッシュ)|Hash|
|deleted|削除日時|DateTime|
|group_ids|管理グループ|SS::Extensions::ObjectIds|
|groups_hash|管理グループ(ハッシュ)|Hash|
|name|名称|String|
|order|並び順|Integer|
|permission_level|権限レベル|Integer|
|site_id|組織|Object|
|text|本文|String|
|text_index|全文検索インデックス(未使用)|String|
|updated|更新日時|DateTime|
|user_group_id|作成者(グループ)|Integer|
|user_group_name|作成者(グループ名)|String|
|user_id|作成者|Object|
|user_ids|管理ユーザー|SS::Extensions::ObjectIds|
|user_name|作成者(氏名)|String|
|user_uid|作成者(UID)|String|
|users_hash|管理ユーザー(ハッシュ)|Hash|

## gws_monitor_posts / 投稿

|Field|Description|Type|
|-----|-----------|----|
|_id|ID|Integer|
|category_ids|カテゴリー|SS::Extensions::ObjectIds|
|contributor_id|投稿者（データID）|String|
|contributor_model|投稿者（モデル）|String|
|contributor_name|投稿者名|String|
|created|作成日時|DateTime|
|custom_group_ids|管理カスタムグループ|SS::Extensions::ObjectIds|
|custom_groups_hash|管理カスタムグループ(ハッシュ)|Hash|
|deleted|削除日時|DateTime|
|descendants_files_count|トピック内添付ファイル数|Integer|
|descendants_total_file_size|トピック内添付ファイル容量|Integer|
|descendants_updated|トピック内更新日時|DateTime|
|due_date|回答期限|DateTime|
|file_ids|ファイル|SS::Extensions::ObjectIds|
|group_ids|管理グループ|SS::Extensions::ObjectIds|
|groups_hash|管理グループ(ハッシュ)|Hash|
|mode|表示形式|String|
|name|回答タイトル|String|
|parent_id|親投稿|Object|
|permission_level|権限レベル|Integer|
|permit_comment|コメント|String|
|severity|重要度|String|
|site_id|組織|Object|
|spec_config|回答表示設定|String|
|text|内容|String|
|text_index|全文検索インデックス(未使用)|String|
|text_type|内容形式|String|
|topic_id|トピック|Object|
|updated|更新日時|DateTime|
|user_group_id|作成者(グループ)|Integer|
|user_group_name|作成者(グループ名)|String|
|user_id|作成者|Object|
|user_ids|管理ユーザー|SS::Extensions::ObjectIds|
|user_name|作成者(氏名)|String|
|user_uid|作成者(UID)|String|
|users_hash|管理ユーザー(ハッシュ)|Hash|
|answer_state_hash|回覧状況|Hash|
|article_state|募集状況|String|
|attend_group_ids|参加グループ|SS::Extensions::ObjectIds|
|close_date|公開終了日時(予約)|DateTime|
|notice_at|通知日時|DateTime|
|notice_state|お知らせ表示設定|String|
|release_date|公開開始日時(予約)|DateTime|
|released|公開日時|DateTime|
|state|ステータス|String|

## gws_notice_comments / コメント

|Field|Description|Type|
|-----|-----------|----|
|_id|ID|BSON::ObjectId|
|created|作成日時|DateTime|
|deleted|削除日時|DateTime|
|notice_id|お知らせ|Object|
|site_id|組織|Object|
|text|内容|String|
|text_index|全文検索インデックス(未使用)|String|
|text_type|内容形式|String|
|updated|更新日時|DateTime|
|user_group_id|作成者(グループ)|Integer|
|user_group_name|グループ|String|
|user_id|作成者|Object|
|user_name|作成者|String|
|user_uid|作成者(UID)|String|

## gws_notice_folders / フォルダー

|Field|Description|Type|
|-----|-----------|----|
|_id|ID|Integer|
|created|作成日時|DateTime|
|custom_group_ids|管理カスタムグループ|SS::Extensions::ObjectIds|
|custom_groups_hash|管理カスタムグループ(ハッシュ)|Hash|
|deleted|削除日時|DateTime|
|depth|階層|Integer|
|group_ids|管理グループ|SS::Extensions::ObjectIds|
|groups_hash|管理グループ(ハッシュ)|Hash|
|member_custom_group_ids|投稿カスタムグループ|SS::Extensions::ObjectIds|
|member_group_ids|投稿グループ|SS::Extensions::ObjectIds|
|member_ids|投稿ユーザー|SS::Extensions::ObjectIds|
|name|フォルダー名|String|
|notice_individual_body_size_limit|本文個別容量制限|Integer|
|notice_individual_file_size_limit|添付ファイル個別容量制限|Integer|
|notice_total_body_size|総本文サイズ|Integer|
|notice_total_body_size_limit|本文総容量制限|Integer|
|notice_total_file_size|総添付ファイルサイズ|Integer|
|notice_total_file_size_limit|添付ファイル総容量制限|Integer|
|order|並び順|Integer|
|permission_level|権限レベル|Integer|
|readable_custom_group_ids|閲覧カスタムグループ|SS::Extensions::ObjectIds|
|readable_custom_groups_hash|閲覧カスタムグループ(ハッシュ)|Hash|
|readable_group_ids|閲覧グループ|SS::Extensions::ObjectIds|
|readable_groups_hash|閲覧グループ(ハッシュ)|Hash|
|readable_member_ids|閲覧ユーザー|SS::Extensions::ObjectIds|
|readable_members_hash|閲覧ユーザー(ハッシュ)|Hash|
|readable_setting_range|公開範囲|String|
|site_id|組織|Object|
|state|状態|String|
|text_index|全文検索インデックス(未使用)|String|
|updated|更新日時|DateTime|
|user_group_id|作成者(グループ)|Integer|
|user_group_name|作成者(グループ名)|String|
|user_id|作成者|Object|
|user_ids|管理ユーザー|SS::Extensions::ObjectIds|
|user_name|作成者(氏名)|String|
|user_uid|作成者(UID)|String|
|users_hash|管理ユーザー(ハッシュ)|Hash|

## gws_notices / お知らせ

|Field|Description|Type|
|-----|-----------|----|
|_id|ID|Integer|
|browsed_users_hash|既読ユーザー|Hash|
|category_ids|カテゴリー|SS::Extensions::ObjectIds|
|close_date|公開終了日時(予約)|DateTime|
|color|表示色|String|
|comment_state|コメント投稿|String|
|contributor_id|投稿者（データID）|String|
|contributor_model|投稿者（モデル）|String|
|contributor_name|投稿者名|String|
|created|作成日時|DateTime|
|custom_group_ids|管理カスタムグループ|SS::Extensions::ObjectIds|
|custom_groups_hash|管理カスタムグループ(ハッシュ)|Hash|
|deleted|削除日時|DateTime|
|end_on|終了日|Date|
|file_ids|ファイル|SS::Extensions::ObjectIds|
|folder_id|フォルダー|Object|
|group_ids|管理グループ|SS::Extensions::ObjectIds|
|groups_hash|管理グループ(ハッシュ)|Hash|
|links|リンク|Array|
|name|タイトル|String|
|notification_noticed|Notification noticed|DateTime|
|permission_level|権限レベル|Integer|
|readable_custom_group_ids|閲覧カスタムグループ|SS::Extensions::ObjectIds|
|readable_custom_groups_hash|閲覧カスタムグループ(ハッシュ)|Hash|
|readable_group_ids|閲覧グループ|SS::Extensions::ObjectIds|
|readable_groups_hash|閲覧グループ(ハッシュ)|Hash|
|readable_member_ids|閲覧ユーザー|SS::Extensions::ObjectIds|
|readable_members_hash|閲覧ユーザー(ハッシュ)|Hash|
|readable_setting_range|公開範囲|String|
|release_date|公開開始日時(予約)|DateTime|
|released|公開日時|DateTime|
|severity|種別|String|
|site_id|組織|Object|
|start_on|開始日|Date|
|state|ステータス|String|
|text|コメント|String|
|text_index|全文検索インデックス(未使用)|String|
|text_type|内容形式|String|
|total_file_size|総添付ファイルサイズ|Integer|
|updated|更新日時|DateTime|
|user_group_id|作成者(グループ)|Integer|
|user_group_name|作成者(グループ名)|String|
|user_id|作成者|Object|
|user_ids|管理ユーザー|SS::Extensions::ObjectIds|
|user_name|作成者(氏名)|String|
|user_uid|作成者(UID)|String|
|users_hash|管理ユーザー(ハッシュ)|Hash|

## gws_portal_group_portlets / 部課ポータル設定

|Field|Description|Type|
|-----|-----------|----|
|_id|ID|BSON::ObjectId|
|ad_file_ids|広告画像|SS::Extensions::ObjectIds|
|ad_pause|静止時間|Integer|
|ad_speed|スライド時間|Integer|
|ad_width|横幅|Integer|
|board_browsed_state|既読・未読|String|
|board_category_ids|カテゴリー|SS::Extensions::ObjectIds|
|board_severity|重要度|String|
|bookmark_folder_id|フォルダー|Object|
|bookmark_model|機能表示範囲|String|
|circular_article_state|表示種別|String|
|circular_category_ids|カテゴリー|SS::Extensions::ObjectIds|
|circular_sort|回覧板の並び|String|
|created|作成日時|DateTime|
|custom_group_id|カスタムグループ|Object|
|custom_group_ids|管理カスタムグループ|SS::Extensions::ObjectIds|
|custom_groups_hash|管理カスタムグループ(ハッシュ)|Hash|
|deleted|削除日時|DateTime|
|faq_category_ids|カテゴリー|SS::Extensions::ObjectIds|
|grid_data|配置情報|Hash|
|group_id|グループ|Object|
|group_ids|管理グループ|SS::Extensions::ObjectIds|
|groups_hash|管理グループ(ハッシュ)|Hash|
|html|内容|String|
|limit|表示件数|Integer|
|links|リンク|Array|
|monitor_answerable_article|表示範囲|String|
|monitor_category_ids|カテゴリー|SS::Extensions::ObjectIds|
|name|ポートレット名|String|
|notice_browsed_state|既読・未読|String|
|notice_category_ids|カテゴリー|SS::Extensions::ObjectIds|
|notice_folder_ids|フォルダー|SS::Extensions::ObjectIds|
|notice_severity|重要度|String|
|permission_level|権限レベル|Integer|
|portlet_model|ポートレット種別|String|
|qna_category_ids|カテゴリー|SS::Extensions::ObjectIds|
|readable_custom_group_ids|閲覧カスタムグループ|SS::Extensions::ObjectIds|
|readable_custom_groups_hash|閲覧カスタムグループ(ハッシュ)|Hash|
|readable_group_ids|閲覧グループ|SS::Extensions::ObjectIds|
|readable_groups_hash|閲覧グループ(ハッシュ)|Hash|
|readable_member_ids|閲覧ユーザー|SS::Extensions::ObjectIds|
|readable_members_hash|閲覧ユーザー(ハッシュ)|Hash|
|readable_setting_range|公開範囲|String|
|reminder_filter|表示範囲|String|
|schedule_member_ids|表示ユーザー|SS::Extensions::ObjectIds|
|schedule_member_mode|表示モード|String|
|setting_id|ポータルID|Object|
|share_category_ids|カテゴリー|SS::Extensions::ObjectIds|
|share_folder_id|フォルダー|Object|
|site_id|組織|Object|
|survey_answered_state|回答・未回答|String|
|survey_category_ids|カテゴリー|SS::Extensions::ObjectIds|
|survey_sort|並び順|String|
|text_index|全文検索インデックス(未使用)|String|
|timecard_module|打刻先のタイムカード|String|
|todo_state|表示状態|String|
|updated|更新日時|DateTime|
|user_group_id|作成者(グループ)|Integer|
|user_group_name|作成者(グループ名)|String|
|user_id|作成者|Object|
|user_ids|管理ユーザー|SS::Extensions::ObjectIds|
|user_name|作成者(氏名)|String|
|user_uid|作成者(UID)|String|
|users_hash|管理ユーザー(ハッシュ)|Hash|
|workflow_state|表示範囲|String|

## gws_portal_group_settings / 部課ポートレット

|Field|Description|Type|
|-----|-----------|----|
|_id|ID|BSON::ObjectId|
|created|作成日時|DateTime|
|custom_group_ids|管理カスタムグループ|SS::Extensions::ObjectIds|
|custom_groups_hash|管理カスタムグループ(ハッシュ)|Hash|
|deleted|削除日時|DateTime|
|group_ids|管理グループ|SS::Extensions::ObjectIds|
|groups_hash|管理グループ(ハッシュ)|Hash|
|name|ポータル名|String|
|permission_level|権限レベル|Integer|
|portal_group_id|ポータルグループ|Object|
|portal_link_state|表示・非表示|String|
|portal_monitor_state|表示・非表示|String|
|portal_notice_browsed_state|未読・既読|String|
|portal_notice_severity|重要度|String|
|portal_notice_state|表示・非表示|String|
|readable_custom_group_ids|閲覧カスタムグループ|SS::Extensions::ObjectIds|
|readable_custom_groups_hash|閲覧カスタムグループ(ハッシュ)|Hash|
|readable_group_ids|閲覧グループ|SS::Extensions::ObjectIds|
|readable_groups_hash|閲覧グループ(ハッシュ)|Hash|
|readable_member_ids|閲覧ユーザー|SS::Extensions::ObjectIds|
|readable_members_hash|閲覧ユーザー(ハッシュ)|Hash|
|readable_setting_range|公開範囲|String|
|site_id|組織|Object|
|text_index|全文検索インデックス(未使用)|String|
|updated|更新日時|DateTime|
|user_group_id|作成者(グループ)|Integer|
|user_group_name|作成者(グループ名)|String|
|user_id|作成者|Object|
|user_ids|管理ユーザー|SS::Extensions::ObjectIds|
|user_name|作成者(氏名)|String|
|user_uid|作成者(UID)|String|
|users_hash|管理ユーザー(ハッシュ)|Hash|

## gws_portal_user_portlets / 個人ポータル設定

|Field|Description|Type|
|-----|-----------|----|
|_id|ID|BSON::ObjectId|
|ad_file_ids|広告画像|SS::Extensions::ObjectIds|
|ad_pause|静止時間|Integer|
|ad_speed|スライド時間|Integer|
|ad_width|横幅|Integer|
|board_browsed_state|既読・未読|String|
|board_category_ids|カテゴリー|SS::Extensions::ObjectIds|
|board_severity|重要度|String|
|bookmark_folder_id|フォルダー|Object|
|bookmark_model|機能表示範囲|String|
|circular_article_state|表示種別|String|
|circular_category_ids|カテゴリー|SS::Extensions::ObjectIds|
|circular_sort|回覧板の並び|String|
|created|作成日時|DateTime|
|custom_group_id|カスタムグループ|Object|
|custom_group_ids|管理カスタムグループ|SS::Extensions::ObjectIds|
|custom_groups_hash|管理カスタムグループ(ハッシュ)|Hash|
|deleted|削除日時|DateTime|
|faq_category_ids|カテゴリー|SS::Extensions::ObjectIds|
|grid_data|配置情報|Hash|
|group_id|グループ|Object|
|group_ids|管理グループ|SS::Extensions::ObjectIds|
|groups_hash|管理グループ(ハッシュ)|Hash|
|html|内容|String|
|limit|表示件数|Integer|
|links|リンク|Array|
|monitor_answerable_article|表示範囲|String|
|monitor_category_ids|カテゴリー|SS::Extensions::ObjectIds|
|name|ポートレット名|String|
|notice_browsed_state|既読・未読|String|
|notice_category_ids|カテゴリー|SS::Extensions::ObjectIds|
|notice_folder_ids|フォルダー|SS::Extensions::ObjectIds|
|notice_severity|重要度|String|
|permission_level|権限レベル|Integer|
|portlet_model|ポートレット種別|String|
|qna_category_ids|カテゴリー|SS::Extensions::ObjectIds|
|readable_custom_group_ids|閲覧カスタムグループ|SS::Extensions::ObjectIds|
|readable_custom_groups_hash|閲覧カスタムグループ(ハッシュ)|Hash|
|readable_group_ids|閲覧グループ|SS::Extensions::ObjectIds|
|readable_groups_hash|閲覧グループ(ハッシュ)|Hash|
|readable_member_ids|閲覧ユーザー|SS::Extensions::ObjectIds|
|readable_members_hash|閲覧ユーザー(ハッシュ)|Hash|
|readable_setting_range|公開範囲|String|
|reminder_filter|表示範囲|String|
|schedule_member_ids|表示ユーザー|SS::Extensions::ObjectIds|
|schedule_member_mode|表示モード|String|
|setting_id|ポータルID|Object|
|share_category_ids|カテゴリー|SS::Extensions::ObjectIds|
|share_folder_id|フォルダー|Object|
|site_id|組織|Object|
|survey_answered_state|回答・未回答|String|
|survey_category_ids|カテゴリー|SS::Extensions::ObjectIds|
|survey_sort|並び順|String|
|text_index|全文検索インデックス(未使用)|String|
|timecard_module|打刻先のタイムカード|String|
|todo_state|表示状態|String|
|updated|更新日時|DateTime|
|user_group_id|作成者(グループ)|Integer|
|user_group_name|作成者(グループ名)|String|
|user_id|作成者|Object|
|user_ids|管理ユーザー|SS::Extensions::ObjectIds|
|user_name|作成者(氏名)|String|
|user_uid|作成者(UID)|String|
|users_hash|管理ユーザー(ハッシュ)|Hash|
|workflow_state|表示範囲|String|

## gws_portal_user_settings / 個人ポートレット

|Field|Description|Type|
|-----|-----------|----|
|_id|ID|BSON::ObjectId|
|created|作成日時|DateTime|
|custom_group_ids|管理カスタムグループ|SS::Extensions::ObjectIds|
|custom_groups_hash|管理カスタムグループ(ハッシュ)|Hash|
|deleted|削除日時|DateTime|
|group_ids|管理グループ|SS::Extensions::ObjectIds|
|groups_hash|管理グループ(ハッシュ)|Hash|
|name|ポータル名|String|
|permission_level|権限レベル|Integer|
|portal_link_state|表示・非表示|String|
|portal_monitor_state|表示・非表示|String|
|portal_notice_browsed_state|未読・既読|String|
|portal_notice_severity|重要度|String|
|portal_notice_state|表示・非表示|String|
|portal_user_id|ポータルユーザー|Object|
|readable_custom_group_ids|閲覧カスタムグループ|SS::Extensions::ObjectIds|
|readable_custom_groups_hash|閲覧カスタムグループ(ハッシュ)|Hash|
|readable_group_ids|閲覧グループ|SS::Extensions::ObjectIds|
|readable_groups_hash|閲覧グループ(ハッシュ)|Hash|
|readable_member_ids|閲覧ユーザー|SS::Extensions::ObjectIds|
|readable_members_hash|閲覧ユーザー(ハッシュ)|Hash|
|readable_setting_range|公開範囲|String|
|site_id|組織|Object|
|text_index|全文検索インデックス(未使用)|String|
|updated|更新日時|DateTime|
|user_group_id|作成者(グループ)|Integer|
|user_group_name|作成者(グループ名)|String|
|user_id|作成者|Object|
|user_ids|管理ユーザー|SS::Extensions::ObjectIds|
|user_name|作成者(氏名)|String|
|user_uid|作成者(UID)|String|
|users_hash|管理ユーザー(ハッシュ)|Hash|

## gws_qna_posts / 投稿

|Field|Description|Type|
|-----|-----------|----|
|_id|ID|Integer|
|contributor_id|投稿者（データID）|String|
|contributor_model|投稿者（モデル）|String|
|contributor_name|投稿者名|String|
|created|投稿日|DateTime|
|custom_group_ids|管理カスタムグループ|SS::Extensions::ObjectIds|
|custom_groups_hash|管理カスタムグループ(ハッシュ)|Hash|
|deleted|削除日時|DateTime|
|descendants_files_count|トピック内添付ファイル数|Integer|
|descendants_total_file_size|トピック内添付ファイル容量|Integer|
|descendants_updated|トピック内更新日時|DateTime|
|file_ids|ファイル|SS::Extensions::ObjectIds|
|group_ids|管理グループ|SS::Extensions::ObjectIds|
|groups_hash|管理グループ(ハッシュ)|Hash|
|mode|表示形式|String|
|name|回答タイトル|String|
|parent_id|親投稿|Object|
|permission_level|権限レベル|Integer|
|permit_comment|コメント|String|
|readable_custom_group_ids|Readable custom group ids|SS::Extensions::ObjectIds|
|readable_custom_groups_hash|Readable custom groups hash|Hash|
|readable_group_ids|Readable group ids|SS::Extensions::ObjectIds|
|readable_groups_hash|Readable groups hash|Hash|
|readable_member_ids|Readable member ids|SS::Extensions::ObjectIds|
|readable_members_hash|Readable members hash|Hash|
|readable_setting_range|Readable setting range|String|
|severity|重要度|String|
|site_id|組織|Object|
|state|ステータス|String|
|text|内容|String|
|text_index|全文検索インデックス(未使用)|String|
|text_type|内容形式|String|
|topic_id|トピック|Object|
|updated|最終更新日|DateTime|
|user_group_id|作成者(グループ)|Integer|
|user_group_name|作成者(グループ名)|String|
|user_id|作成者|Object|
|user_ids|管理ユーザー|SS::Extensions::ObjectIds|
|user_name|作成者(氏名)|String|
|user_uid|作成者(UID)|String|
|users_hash|管理ユーザー(ハッシュ)|Hash|
|browsed_users_hash|既読ユーザー|Hash|
|category_ids|カテゴリー|SS::Extensions::ObjectIds|
|close_date|公開終了日時(予約)|DateTime|
|question_state|回答状況|String|
|release_date|公開開始日時(予約)|DateTime|
|released|公開日時|DateTime|

## gws_reminder_notifications

|Field|Description|Type|
|-----|-----------|----|
|_id|ID|BSON::ObjectId|
|base_time|Base time|String|
|created|作成日時|DateTime|
|deleted|削除日時|DateTime|
|delivered_at|Delivered at|DateTime|
|interval|Interval|Integer|
|interval_type|Interval type|String|
|notify_at|Notify at|DateTime|
|state|ステータス|String|
|text_index|全文検索インデックス(未使用)|String|
|updated|更新日時|DateTime|

## gws_reminders / リマインダー

|Field|Description|Type|
|-----|-----------|----|
|_id|ID|Integer|
|allday|Allday|String|
|created|作成日時|DateTime|
|date|日時|DateTime|
|deleted|削除日時|DateTime|
|end_at|End at|DateTime|
|item_id|Item|String|
|model|Model|String|
|name|タイトル|String|
|read_at|Read at|DateTime|
|repeat_plan_id|Repeat plan|Object|
|site_id|組織|Object|
|start_at|Start at|DateTime|
|text_index|全文検索インデックス(未使用)|String|
|updated|更新日時|DateTime|
|updated_date|更新日|DateTime|
|updated_fields|変更内容|Array|
|updated_user_id|更新者ID|Integer|
|updated_user_name|更新者|String|
|updated_user_uid|更新者UID|String|
|user_group_id|作成者(グループ)|Integer|
|user_group_name|作成者(グループ名)|String|
|user_id|作成者|Object|
|user_name|作成者(氏名)|String|
|user_uid|作成者(UID)|String|

## gws_report_files / レポート

|Field|Description|Type|
|-----|-----------|----|
|_id|ID|Integer|
|created|作成日時|DateTime|
|custom_group_ids|管理カスタムグループ|SS::Extensions::ObjectIds|
|custom_groups_hash|管理カスタムグループ(ハッシュ)|Hash|
|deleted|削除日時|DateTime|
|form_id|テンプレート|Object|
|group_ids|管理グループ|SS::Extensions::ObjectIds|
|groups_hash|管理グループ(ハッシュ)|Hash|
|member_custom_group_ids|参加カスタムグループ|SS::Extensions::ObjectIds|
|member_group_ids|参加グループ|SS::Extensions::ObjectIds|
|member_ids|参加ユーザー|SS::Extensions::ObjectIds|
|name|タイトル|String|
|permission_level|権限レベル|Integer|
|readable_custom_group_ids|閲覧カスタムグループ|SS::Extensions::ObjectIds|
|readable_custom_groups_hash|閲覧カスタムグループ(ハッシュ)|Hash|
|readable_group_ids|閲覧グループ|SS::Extensions::ObjectIds|
|readable_groups_hash|閲覧グループ(ハッシュ)|Hash|
|readable_member_ids|閲覧ユーザー|SS::Extensions::ObjectIds|
|readable_members_hash|閲覧ユーザー(ハッシュ)|Hash|
|readable_setting_range|公開範囲|String|
|schedule_ids|スケジュール|SS::Extensions::ObjectIds|
|site_id|組織|Object|
|state|ステータス|String|
|text_index|全文検索インデックス(未使用)|String|
|updated|更新日時|DateTime|
|user_group_id|作成者(グループ)|Integer|
|user_group_name|作成者(グループ名)|String|
|user_id|作成者|Object|
|user_ids|管理ユーザー|SS::Extensions::ObjectIds|
|user_name|作成者(氏名)|String|
|user_uid|作成者(UID)|String|
|users_hash|管理ユーザー(ハッシュ)|Hash|

## gws_report_forms / テンプレート

|Field|Description|Type|
|-----|-----------|----|
|_id|ID|BSON::ObjectId|
|category_ids|カテゴリー|SS::Extensions::ObjectIds|
|created|作成日時|DateTime|
|custom_group_ids|管理カスタムグループ|SS::Extensions::ObjectIds|
|custom_groups_hash|管理カスタムグループ(ハッシュ)|Hash|
|deleted|削除日時|DateTime|
|group_ids|管理グループ|SS::Extensions::ObjectIds|
|groups_hash|管理グループ(ハッシュ)|Hash|
|memo|備考|String|
|name|タイトル|String|
|order|並び順|Integer|
|permission_level|権限レベル|Integer|
|readable_custom_group_ids|閲覧カスタムグループ|SS::Extensions::ObjectIds|
|readable_custom_groups_hash|閲覧カスタムグループ(ハッシュ)|Hash|
|readable_group_ids|閲覧グループ|SS::Extensions::ObjectIds|
|readable_groups_hash|閲覧グループ(ハッシュ)|Hash|
|readable_member_ids|閲覧ユーザー|SS::Extensions::ObjectIds|
|readable_members_hash|閲覧ユーザー(ハッシュ)|Hash|
|readable_setting_range|公開範囲|String|
|site_id|組織|Object|
|state|公開状態|String|
|text_index|全文検索インデックス(未使用)|String|
|updated|更新日時|DateTime|
|user_group_id|作成者(グループ)|Integer|
|user_group_name|作成者(グループ名)|String|
|user_id|作成者|Object|
|user_ids|管理ユーザー|SS::Extensions::ObjectIds|
|user_name|作成者(氏名)|String|
|user_uid|作成者(UID)|String|
|users_hash|管理ユーザー(ハッシュ)|Hash|

## gws_roles / 権限/ロール

|Field|Description|Type|
|-----|-----------|----|
|_id|ID|Integer|
|created|作成日時|DateTime|
|deleted|削除日時|DateTime|
|name|ロール名|String|
|permission_level|権限レベル|Integer|
|permissions|権限設定|SS::Extensions::Words|
|site_id|組織|Object|
|text_index|全文検索インデックス(未使用)|String|
|updated|更新日時|DateTime|
|user_id|ユーザー|Object|

## gws_schedule_approvals / 承認

|Field|Description|Type|
|-----|-----------|----|
|_id|ID|BSON::ObjectId|
|approval_state|承認|String|
|created|作成日時|DateTime|
|deleted|削除日時|DateTime|
|facility_id|Facility|Object|
|text_index|全文検索インデックス(未使用)|String|
|updated|更新日時|DateTime|
|user_group_id|作成者(グループ)|Integer|
|user_group_name|作成者(グループ名)|String|
|user_id|作成者|Object|
|user_name|作成者(氏名)|String|
|user_uid|作成者(UID)|String|

## gws_schedule_attendances / 出欠

|Field|Description|Type|
|-----|-----------|----|
|_id|ID|BSON::ObjectId|
|attendance_state|出欠|String|
|created|作成日時|DateTime|
|deleted|削除日時|DateTime|
|text_index|全文検索インデックス(未使用)|String|
|updated|更新日時|DateTime|
|user_group_id|作成者(グループ)|Integer|
|user_group_name|作成者(グループ名)|String|
|user_id|作成者|Object|
|user_name|作成者(氏名)|String|
|user_uid|作成者(UID)|String|

## gws_schedule_comments / コメント

|Field|Description|Type|
|-----|-----------|----|
|_id|ID|BSON::ObjectId|
|created|作成日時|DateTime|
|deleted|削除日時|DateTime|
|schedule_id|Schedule|Object|
|site_id|組織|Object|
|text|内容|String|
|text_index|全文検索インデックス(未使用)|String|
|text_type|内容形式|String|
|updated|更新日時|DateTime|
|user_group_id|作成者(グループ)|Integer|
|user_group_name|作成者(グループ名)|String|
|user_id|作成者|Object|
|user_name|作成者(氏名)|String|
|user_uid|作成者(UID)|String|

## gws_schedule_holidays / 休日

|Field|Description|Type|
|-----|-----------|----|
|_id|ID|BSON::ObjectId|
|allday|終日|String|
|color|表示色|String|
|created|作成日時|DateTime|
|deleted|削除日時|DateTime|
|end_at|終了日時|DateTime|
|end_on|終了日|Date|
|name|タイトル|String|
|repeat_plan_id|繰り返し予定|Object|
|site_id|組織|Object|
|start_at|開始日時|DateTime|
|start_on|開始日|Date|
|state|ステータス|String|
|text_index|全文検索インデックス(未使用)|String|
|updated|更新日時|DateTime|
|user_group_id|作成者(グループ)|Integer|
|user_group_name|作成者(グループ名)|String|
|user_id|作成者|Object|
|user_name|作成者(氏名)|String|
|user_uid|作成者(UID)|String|

## gws_schedule_plan_searches

|Field|Description|Type|
|-----|-----------|----|
|_id|ID|BSON::ObjectId|
|created|作成日時|DateTime|
|deleted|削除日時|DateTime|
|end_on|End on|Date|
|facility_ids|Facility ids|SS::Extensions::ObjectIds|
|interval|Interval|Integer|
|max_hour|Max hour|Integer|
|member_ids|Member ids|SS::Extensions::ObjectIds|
|min_hour|Min hour|Integer|
|plan_id|Plan|Object|
|repeat_base|Repeat base|String|
|repeat_type|Repeat type|String|
|site_id|組織|Object|
|start_on|Start on|Date|
|text_index|全文検索インデックス(未使用)|String|
|updated|更新日時|DateTime|
|user_group_id|作成者(グループ)|Integer|
|user_group_name|作成者(グループ名)|String|
|user_id|作成者|Object|
|user_name|作成者(氏名)|String|
|user_uid|作成者(UID)|String|
|wdays|Wdays|Array|

## gws_schedule_plans / スケジュール

|Field|Description|Type|
|-----|-----------|----|
|_id|ID|BSON::ObjectId|
|allday|終日|String|
|approval_member_ids|承認者|SS::Extensions::ObjectIds|
|approval_state|承認状態|String|
|attendance_check_state|出欠確認|String|
|category_id|種別|Object|
|color|表示色|String|
|created|作成日時|DateTime|
|custom_group_ids|管理カスタムグループ|SS::Extensions::ObjectIds|
|custom_groups_hash|管理カスタムグループ(ハッシュ)|Hash|
|deleted|削除日時|DateTime|
|duplicate_registered|Duplicate registered|DateTime|
|end_at|終了日時|DateTime|
|end_on|終了日|Date|
|facility_ids|設備予約|SS::Extensions::ObjectIds|
|file_ids|ファイル|SS::Extensions::ObjectIds|
|group_ids|管理グループ|SS::Extensions::ObjectIds|
|groups_hash|管理グループ(ハッシュ)|Hash|
|main_facility_id|主設備|Object|
|member_custom_group_ids|参加カスタムグループ|SS::Extensions::ObjectIds|
|member_group_ids|参加グループ|SS::Extensions::ObjectIds|
|member_ids|参加ユーザー|SS::Extensions::ObjectIds|
|name|タイトル|String|
|notify_state|通知設定|String|
|permission_level|権限レベル|Integer|
|priority|重要度|Integer|
|readable_custom_group_ids|閲覧カスタムグループ|SS::Extensions::ObjectIds|
|readable_custom_groups_hash|閲覧カスタムグループ(ハッシュ)|Hash|
|readable_group_ids|閲覧グループ|SS::Extensions::ObjectIds|
|readable_groups_hash|閲覧グループ(ハッシュ)|Hash|
|readable_member_ids|閲覧ユーザー|SS::Extensions::ObjectIds|
|readable_members_hash|閲覧ユーザー(ハッシュ)|Hash|
|readable_setting_range|公開範囲|String|
|repeat_plan_id|繰り返し|Object|
|site_id|組織|Object|
|start_at|開始日時|DateTime|
|start_on|開始日|Date|
|state|ステータス|String|
|text|内容|String|
|text_index|全文検索インデックス(未使用)|String|
|text_type|内容形式|String|
|updated|更新日時|DateTime|
|user_group_id|作成者(グループ)|Integer|
|user_group_name|作成者(グループ名)|String|
|user_id|作成者|Object|
|user_ids|管理ユーザー|SS::Extensions::ObjectIds|
|user_name|作成者(氏名)|String|
|user_uid|作成者(UID)|String|
|users_hash|管理ユーザー(ハッシュ)|Hash|

## gws_schedule_repeat_plans

|Field|Description|Type|
|-----|-----------|----|
|_id|ID|BSON::ObjectId|
|created|作成日時|DateTime|
|deleted|削除日時|DateTime|
|interval|繰り返し間隔|Integer|
|repeat_base|繰り返しの基準|String|
|repeat_end|終了日|Date|
|repeat_start|開始日|Date|
|repeat_type|繰り返し設定|String|
|text_index|全文検索インデックス(未使用)|String|
|updated|更新日時|DateTime|
|wdays|曜日|Array|

## gws_schedule_todo_comments / ToDoコメント

|Field|Description|Type|
|-----|-----------|----|
|_id|ID|BSON::ObjectId|
|achievement_rate|進捗率|Integer|
|created|作成日時|DateTime|
|deleted|削除日時|DateTime|
|site_id|組織|Object|
|text|内容|String|
|text_index|全文検索インデックス(未使用)|String|
|text_type|内容形式|String|
|todo_id|ToDo|Object|
|updated|更新日時|DateTime|
|user_group_id|作成者(グループ)|Integer|
|user_group_name|作成者(グループ名)|String|
|user_id|作成者|Object|
|user_name|作成者(氏名)|String|
|user_uid|作成者(UID)|String|

## gws_schedule_todos / ToDo

|Field|Description|Type|
|-----|-----------|----|
|_id|ID|BSON::ObjectId|
|achievement_rate|進捗率|Integer|
|allday|終日|String|
|category_ids|プロジェクト・工程|SS::Extensions::ObjectIds|
|color|表示色|String|
|created|作成日時|DateTime|
|custom_group_ids|管理カスタムグループ|SS::Extensions::ObjectIds|
|custom_groups_hash|管理カスタムグループ(ハッシュ)|Hash|
|deleted|削除日時|DateTime|
|discussion_forum_id|電子会議室|Object|
|end_at|終了日時|DateTime|
|end_on|終了日|Date|
|file_ids|ファイル|SS::Extensions::ObjectIds|
|group_ids|管理グループ|SS::Extensions::ObjectIds|
|groups_hash|管理グループ(ハッシュ)|Hash|
|member_custom_group_ids|担当カスタムグループ|SS::Extensions::ObjectIds|
|member_group_ids|担当グループ|SS::Extensions::ObjectIds|
|member_ids|担当ユーザー|SS::Extensions::ObjectIds|
|name|ToDo|String|
|notify_state|通知設定|String|
|permission_level|権限レベル|Integer|
|priority|重要度|Integer|
|readable_custom_group_ids|閲覧カスタムグループ|SS::Extensions::ObjectIds|
|readable_custom_groups_hash|閲覧カスタムグループ(ハッシュ)|Hash|
|readable_group_ids|閲覧グループ|SS::Extensions::ObjectIds|
|readable_groups_hash|閲覧グループ(ハッシュ)|Hash|
|readable_member_ids|閲覧ユーザー|SS::Extensions::ObjectIds|
|readable_members_hash|閲覧ユーザー(ハッシュ)|Hash|
|readable_setting_range|公開範囲|String|
|repeat_plan_id|繰り返し|Object|
|site_id|組織|Object|
|start_at|開始日時|DateTime|
|start_on|開始日|Date|
|state|ステータス|String|
|text|内容|String|
|text_index|全文検索インデックス(未使用)|String|
|text_type|内容形式|String|
|todo_state|状態|String|
|updated|更新日時|DateTime|
|user_group_id|作成者(グループ)|Integer|
|user_group_name|作成者(グループ名)|String|
|user_id|作成者|Object|
|user_ids|管理ユーザー|SS::Extensions::ObjectIds|
|user_name|作成者(氏名)|String|
|user_uid|作成者(UID)|String|
|users_hash|管理ユーザー(ハッシュ)|Hash|

## gws_search_form_targets / 検索対象

|Field|Description|Type|
|-----|-----------|----|
|_id|ID|Integer|
|created|作成日時|DateTime|
|deleted|削除日時|DateTime|
|name|名称|String|
|order|並び順|Integer|
|place_holder|プレースホルダー|String|
|search_keyword_name|Keyword name|String|
|search_other_query|Other query|String|
|search_service|検索対象|String|
|search_url|検索URL|String|
|site_id|組織|Object|
|state|ステータス|String|
|text_index|全文検索インデックス(未使用)|String|
|updated|更新日時|DateTime|
|user_group_id|作成者(グループ)|Integer|
|user_group_name|作成者(グループ名)|String|
|user_id|作成者|Object|
|user_name|作成者(氏名)|String|
|user_uid|作成者(UID)|String|

## gws_share_file_uploaders / ファイルアップローダー

|Field|Description|Type|
|-----|-----------|----|
|_id|ID|BSON::ObjectId|
|category_ids|カテゴリー|SS::Extensions::ObjectIds|
|created|作成日時|DateTime|
|custom_group_ids|管理カスタムグループ|SS::Extensions::ObjectIds|
|custom_groups_hash|管理カスタムグループ(ハッシュ)|Hash|
|deleted|削除日時|DateTime|
|group_ids|管理グループ|SS::Extensions::ObjectIds|
|groups_hash|管理グループ(ハッシュ)|Hash|
|permission_level|権限レベル|Integer|
|readable_custom_group_ids|閲覧カスタムグループ|SS::Extensions::ObjectIds|
|readable_custom_groups_hash|閲覧カスタムグループ(ハッシュ)|Hash|
|readable_group_ids|閲覧グループ|SS::Extensions::ObjectIds|
|readable_groups_hash|閲覧グループ(ハッシュ)|Hash|
|readable_member_ids|閲覧ユーザー|SS::Extensions::ObjectIds|
|readable_members_hash|閲覧ユーザー(ハッシュ)|Hash|
|readable_setting_range|公開範囲|String|
|text_index|全文検索インデックス(未使用)|String|
|updated|更新日時|DateTime|
|user_ids|管理ユーザー|SS::Extensions::ObjectIds|
|users_hash|管理ユーザー(ハッシュ)|Hash|

## gws_share_folders / フォルダー

|Field|Description|Type|
|-----|-----------|----|
|_id|ID|Integer|
|created|作成日時|DateTime|
|custom_group_ids|管理カスタムグループ|SS::Extensions::ObjectIds|
|custom_groups_hash|管理カスタムグループ(ハッシュ)|Hash|
|deleted|削除日時|DateTime|
|depth|階層|Integer|
|descendants_files_count|総ファイル数|Integer|
|descendants_total_file_size|総ファイル容量|Integer|
|group_ids|管理グループ|SS::Extensions::ObjectIds|
|groups_hash|管理グループ(ハッシュ)|Hash|
|name|フォルダー名|String|
|order|並び順|Integer|
|permission_level|権限レベル|Integer|
|readable_custom_group_ids|閲覧カスタムグループ|SS::Extensions::ObjectIds|
|readable_custom_groups_hash|閲覧カスタムグループ(ハッシュ)|Hash|
|readable_group_ids|閲覧グループ|SS::Extensions::ObjectIds|
|readable_groups_hash|閲覧グループ(ハッシュ)|Hash|
|readable_member_ids|閲覧ユーザー|SS::Extensions::ObjectIds|
|readable_members_hash|閲覧ユーザー(ハッシュ)|Hash|
|readable_setting_range|公開範囲|String|
|share_max_file_size|最大ファイルサイズ|Integer|
|share_max_folder_size|総容量制限|Integer|
|site_id|組織|Object|
|state|状態|String|
|text_index|全文検索インデックス(未使用)|String|
|updated|更新日時|DateTime|
|user_group_id|作成者(グループ)|Integer|
|user_group_name|作成者(グループ名)|String|
|user_id|作成者|Object|
|user_ids|管理ユーザー|SS::Extensions::ObjectIds|
|user_name|作成者(氏名)|String|
|user_uid|作成者(UID)|String|
|users_hash|管理ユーザー(ハッシュ)|Hash|

## gws_share_histories

|Field|Description|Type|
|-----|-----------|----|
|_id|ID|Integer|
|created|変更日時|DateTime|
|deleted|削除日時|DateTime|
|item_id|Item|String|
|mode|区分|String|
|model|Model|String|
|model_name|Model name|String|
|name|Name|String|
|site_id|組織|Object|
|text_index|全文検索インデックス(未使用)|String|
|updated|更新日時|DateTime|
|updated_field_names|Updated field names|Array|
|updated_fields|変更内容|Array|
|uploadfile_content_type|Uploadfile content type|String|
|uploadfile_filename|Uploadfile filename|String|
|uploadfile_name|ファイル名|String|
|uploadfile_size|サイズ|Integer|
|uploadfile_srcname|Uploadfile srcname|String|
|user_group_id|作成者(グループ)|Integer|
|user_group_name|作成者(グループ名)|String|
|user_id|作成者|Object|
|user_name|ユーザー|String|
|user_uid|作成者(UID)|String|

## gws_shared_address_addresses / アドレス

|Field|Description|Type|
|-----|-----------|----|
|_id|ID|BSON::ObjectId|
|address_group_id|グループ名|Object|
|company|会社|String|
|created|作成日時|DateTime|
|custom_group_ids|管理カスタムグループ|SS::Extensions::ObjectIds|
|custom_groups_hash|管理カスタムグループ(ハッシュ)|Hash|
|deleted|削除日時|DateTime|
|email|メールアドレス|String|
|group_ids|管理グループ|SS::Extensions::ObjectIds|
|groups_hash|管理グループ(ハッシュ)|Hash|
|home_city|市区町村（自宅）|String|
|home_fax|ファックス番号（自宅）|String|
|home_postal_code|郵便番号（自宅）|String|
|home_prefecture|都道府県（自宅）|String|
|home_street_address|番地（自宅）|String|
|home_tel|電話番号（自宅）|String|
|kana|カナ|String|
|member_id|ユーザー|Object|
|memo|メモ|String|
|name|氏名|String|
|office_city|市区町村（勤務先）|String|
|office_fax|ファックス番号（勤務先）|String|
|office_postal_code|郵便番号（勤務先）|String|
|office_prefecture|都道府県（勤務先）|String|
|office_street_address|番地（勤務先）|String|
|office_tel|電話番号（勤務先）|String|
|permission_level|権限レベル|Integer|
|personal_webpage|WEBページ|String|
|readable_custom_group_ids|閲覧カスタムグループ|SS::Extensions::ObjectIds|
|readable_custom_groups_hash|閲覧カスタムグループ(ハッシュ)|Hash|
|readable_group_ids|閲覧グループ|SS::Extensions::ObjectIds|
|readable_groups_hash|閲覧グループ(ハッシュ)|Hash|
|readable_member_ids|閲覧ユーザー|SS::Extensions::ObjectIds|
|readable_members_hash|閲覧ユーザー(ハッシュ)|Hash|
|readable_setting_range|公開範囲|String|
|site_id|組織|Object|
|tel|携帯電話番号|String|
|text_index|全文検索インデックス(未使用)|String|
|title|役職|String|
|updated|更新日時|DateTime|
|user_group_id|作成者(グループ)|Integer|
|user_group_name|作成者(グループ名)|String|
|user_id|作成者|Object|
|user_ids|管理ユーザー|SS::Extensions::ObjectIds|
|user_name|作成者(氏名)|String|
|user_uid|作成者(UID)|String|
|users_hash|管理ユーザー(ハッシュ)|Hash|

## gws_shared_address_groups / グループ

|Field|Description|Type|
|-----|-----------|----|
|_id|ID|Integer|
|created|作成日時|DateTime|
|custom_group_ids|管理カスタムグループ|SS::Extensions::ObjectIds|
|custom_groups_hash|管理カスタムグループ(ハッシュ)|Hash|
|deleted|削除日時|DateTime|
|group_ids|管理グループ|SS::Extensions::ObjectIds|
|groups_hash|管理グループ(ハッシュ)|Hash|
|name|グループ名|String|
|order|並び順|Integer|
|permission_level|権限レベル|Integer|
|readable_custom_group_ids|閲覧カスタムグループ|SS::Extensions::ObjectIds|
|readable_custom_groups_hash|閲覧カスタムグループ(ハッシュ)|Hash|
|readable_group_ids|閲覧グループ|SS::Extensions::ObjectIds|
|readable_groups_hash|閲覧グループ(ハッシュ)|Hash|
|readable_member_ids|閲覧ユーザー|SS::Extensions::ObjectIds|
|readable_members_hash|閲覧ユーザー(ハッシュ)|Hash|
|readable_setting_range|公開範囲|String|
|site_id|組織|Object|
|text_index|全文検索インデックス(未使用)|String|
|updated|更新日時|DateTime|
|user_group_id|作成者(グループ)|Integer|
|user_group_name|作成者(グループ名)|String|
|user_id|作成者|Object|
|user_ids|管理ユーザー|SS::Extensions::ObjectIds|
|user_name|作成者(氏名)|String|
|user_uid|作成者(UID)|String|
|users_hash|管理ユーザー(ハッシュ)|Hash|

## gws_staff_record_groups / 所属

|Field|Description|Type|
|-----|-----------|----|
|_id|ID|Integer|
|created|作成日時|DateTime|
|custom_group_ids|管理カスタムグループ|SS::Extensions::ObjectIds|
|custom_groups_hash|管理カスタムグループ(ハッシュ)|Hash|
|deleted|削除日時|DateTime|
|group_ids|管理グループ|SS::Extensions::ObjectIds|
|groups_hash|管理グループ(ハッシュ)|Hash|
|name|所属名|String|
|order|並び順|Integer|
|permission_level|権限レベル|Integer|
|readable_custom_group_ids|閲覧カスタムグループ|SS::Extensions::ObjectIds|
|readable_custom_groups_hash|閲覧カスタムグループ(ハッシュ)|Hash|
|readable_group_ids|閲覧グループ|SS::Extensions::ObjectIds|
|readable_groups_hash|閲覧グループ(ハッシュ)|Hash|
|readable_member_ids|閲覧ユーザー|SS::Extensions::ObjectIds|
|readable_members_hash|閲覧ユーザー(ハッシュ)|Hash|
|readable_setting_range|公開範囲|String|
|seating_chart_url|座席表URL|String|
|site_id|組織|Object|
|text_index|全文検索インデックス(未使用)|String|
|updated|更新日時|DateTime|
|user_group_id|作成者(グループ)|Integer|
|user_group_name|作成者(グループ名)|String|
|user_id|作成者|Object|
|user_ids|管理ユーザー|SS::Extensions::ObjectIds|
|user_name|作成者(氏名)|String|
|user_uid|作成者(UID)|String|
|users_hash|管理ユーザー(ハッシュ)|Hash|
|year_code|西暦|String|
|year_id|年度|Object|
|year_name|年度名|String|

## gws_staff_record_seatings / 座席表

|Field|Description|Type|
|-----|-----------|----|
|_id|ID|Integer|
|created|作成日時|DateTime|
|custom_group_ids|管理カスタムグループ|SS::Extensions::ObjectIds|
|custom_groups_hash|管理カスタムグループ(ハッシュ)|Hash|
|deleted|削除日時|DateTime|
|group_ids|管理グループ|SS::Extensions::ObjectIds|
|groups_hash|管理グループ(ハッシュ)|Hash|
|name|タイトル|String|
|order|並び順|Integer|
|permission_level|権限レベル|Integer|
|readable_custom_group_ids|閲覧カスタムグループ|SS::Extensions::ObjectIds|
|readable_custom_groups_hash|閲覧カスタムグループ(ハッシュ)|Hash|
|readable_group_ids|閲覧グループ|SS::Extensions::ObjectIds|
|readable_groups_hash|閲覧グループ(ハッシュ)|Hash|
|readable_member_ids|閲覧ユーザー|SS::Extensions::ObjectIds|
|readable_members_hash|閲覧ユーザー(ハッシュ)|Hash|
|readable_setting_range|公開範囲|String|
|remark|備考|String|
|site_id|組織|Object|
|text_index|全文検索インデックス(未使用)|String|
|updated|更新日時|DateTime|
|url|座席表URL|String|
|user_group_id|作成者(グループ)|Integer|
|user_group_name|作成者(グループ名)|String|
|user_id|作成者|Object|
|user_ids|管理ユーザー|SS::Extensions::ObjectIds|
|user_name|作成者(氏名)|String|
|user_uid|作成者(UID)|String|
|users_hash|管理ユーザー(ハッシュ)|Hash|
|year_code|西暦|String|
|year_id|年度|Object|
|year_name|年度名|String|

## gws_staff_record_user_occupations / 職種

|Field|Description|Type|
|-----|-----------|----|
|_id|ID|Integer|
|activation_date|有効期限（開始）|DateTime|
|code|職種コード|String|
|created|作成日時|DateTime|
|custom_group_ids|管理カスタムグループ|SS::Extensions::ObjectIds|
|custom_groups_hash|管理カスタムグループ(ハッシュ)|Hash|
|deleted|削除日時|DateTime|
|expiration_date|有効期限（終了）|DateTime|
|group_id|グループ|Object|
|group_ids|管理グループ|SS::Extensions::ObjectIds|
|groups_hash|管理グループ(ハッシュ)|Hash|
|name|職種名|String|
|order|並び順|Integer|
|permission_level|権限レベル|Integer|
|remark|備考|String|
|site_id|組織|Object|
|text_index|全文検索インデックス(未使用)|String|
|updated|更新日時|DateTime|
|user_group_id|作成者(グループ)|Integer|
|user_group_name|作成者(グループ名)|String|
|user_id|作成者|Object|
|user_ids|管理ユーザー|SS::Extensions::ObjectIds|
|user_name|作成者(氏名)|String|
|user_uid|作成者(UID)|String|
|users_hash|管理ユーザー(ハッシュ)|Hash|
|year_code|西暦|String|
|year_id|年度|Object|
|year_name|年度名|String|

## gws_staff_record_user_titles / 役職

|Field|Description|Type|
|-----|-----------|----|
|_id|ID|Integer|
|activation_date|有効期限（開始）|DateTime|
|code|役職コード|String|
|created|作成日時|DateTime|
|custom_group_ids|管理カスタムグループ|SS::Extensions::ObjectIds|
|custom_groups_hash|管理カスタムグループ(ハッシュ)|Hash|
|deleted|削除日時|DateTime|
|expiration_date|有効期限（終了）|DateTime|
|group_id|グループ|Object|
|group_ids|管理グループ|SS::Extensions::ObjectIds|
|groups_hash|管理グループ(ハッシュ)|Hash|
|name|役職名|String|
|order|並び順|Integer|
|permission_level|権限レベル|Integer|
|remark|備考|String|
|site_id|組織|Object|
|text_index|全文検索インデックス(未使用)|String|
|updated|更新日時|DateTime|
|user_group_id|作成者(グループ)|Integer|
|user_group_name|作成者(グループ名)|String|
|user_id|作成者|Object|
|user_ids|管理ユーザー|SS::Extensions::ObjectIds|
|user_name|作成者(氏名)|String|
|user_uid|作成者(UID)|String|
|users_hash|管理ユーザー(ハッシュ)|Hash|
|year_code|西暦|String|
|year_id|年度|Object|
|year_name|年度名|String|

## gws_staff_record_users / 職員

|Field|Description|Type|
|-----|-----------|----|
|_id|ID|Integer|
|charge_address|担当住所|String|
|charge_name|担当名|String|
|charge_tel|担当電話|String|
|code|職員番号|String|
|created|作成日時|DateTime|
|custom_group_ids|管理カスタムグループ|SS::Extensions::ObjectIds|
|custom_groups_hash|管理カスタムグループ(ハッシュ)|Hash|
|deleted|削除日時|DateTime|
|divide_duties|分掌事務|String|
|divide_duties_view|事務分掌表へ表示|String|
|group_ids|管理グループ|SS::Extensions::ObjectIds|
|groups_hash|管理グループ(ハッシュ)|Hash|
|kana|職員氏名（カナ）|String|
|multi_section|本務・兼務|String|
|name|職員氏名|String|
|occupation_ids|職種|SS::Extensions::ObjectIds|
|occupation_orders|職種並び順|Hash|
|order|並び順|Integer|
|permission_level|権限レベル|Integer|
|readable_custom_group_ids|閲覧カスタムグループ|SS::Extensions::ObjectIds|
|readable_custom_groups_hash|閲覧カスタムグループ(ハッシュ)|Hash|
|readable_group_ids|閲覧グループ|SS::Extensions::ObjectIds|
|readable_groups_hash|閲覧グループ(ハッシュ)|Hash|
|readable_member_ids|閲覧ユーザー|SS::Extensions::ObjectIds|
|readable_members_hash|閲覧ユーザー(ハッシュ)|Hash|
|readable_setting_range|公開範囲|String|
|remark|備考|String|
|section_name|所属|String|
|section_order|所属並び順|Integer|
|site_id|組織|Object|
|staff_records_view|電子職員録へ表示|String|
|tel_ext|個人内線|String|
|text_index|全文検索インデックス(未使用)|String|
|title_ids|役職|SS::Extensions::ObjectIds|
|title_orders|役職並び順|Hash|
|updated|更新日時|DateTime|
|user_group_id|作成者(グループ)|Integer|
|user_group_name|作成者(グループ名)|String|
|user_id|作成者|Object|
|user_ids|管理ユーザー|SS::Extensions::ObjectIds|
|user_name|作成者(氏名)|String|
|user_uid|作成者(UID)|String|
|users_hash|管理ユーザー(ハッシュ)|Hash|
|year_code|西暦|String|
|year_id|年度|Object|
|year_name|年度名|String|

## gws_staff_record_years / 年度

|Field|Description|Type|
|-----|-----------|----|
|_id|ID|Integer|
|close_date|終了日|Date|
|code|西暦|String|
|created|作成日時|DateTime|
|custom_group_ids|管理カスタムグループ|SS::Extensions::ObjectIds|
|custom_groups_hash|管理カスタムグループ(ハッシュ)|Hash|
|deleted|削除日時|DateTime|
|group_ids|管理グループ|SS::Extensions::ObjectIds|
|groups_hash|管理グループ(ハッシュ)|Hash|
|name|年度名|String|
|permission_level|権限レベル|Integer|
|readable_custom_group_ids|閲覧カスタムグループ|SS::Extensions::ObjectIds|
|readable_custom_groups_hash|閲覧カスタムグループ(ハッシュ)|Hash|
|readable_group_ids|閲覧グループ|SS::Extensions::ObjectIds|
|readable_groups_hash|閲覧グループ(ハッシュ)|Hash|
|readable_member_ids|閲覧ユーザー|SS::Extensions::ObjectIds|
|readable_members_hash|閲覧ユーザー(ハッシュ)|Hash|
|readable_setting_range|公開範囲|String|
|site_id|組織|Object|
|start_date|開始日|Date|
|text_index|全文検索インデックス(未使用)|String|
|updated|更新日時|DateTime|
|user_group_id|作成者(グループ)|Integer|
|user_group_name|作成者(グループ名)|String|
|user_id|作成者|Object|
|user_ids|管理ユーザー|SS::Extensions::ObjectIds|
|user_name|作成者(氏名)|String|
|user_uid|作成者(UID)|String|
|users_hash|管理ユーザー(ハッシュ)|Hash|

## gws_survey_files / 回答

|Field|Description|Type|
|-----|-----------|----|
|_id|ID|Integer|
|anonymous_state|Anonymous state|String|
|created|初回回答日|DateTime|
|custom_group_ids|管理カスタムグループ|SS::Extensions::ObjectIds|
|custom_groups_hash|管理カスタムグループ(ハッシュ)|Hash|
|deleted|削除日時|DateTime|
|form_id|アンケート|Object|
|group_ids|管理グループ|SS::Extensions::ObjectIds|
|groups_hash|管理グループ(ハッシュ)|Hash|
|name|回答名|String|
|permission_level|権限レベル|Integer|
|readable_custom_group_ids|閲覧カスタムグループ|SS::Extensions::ObjectIds|
|readable_custom_groups_hash|閲覧カスタムグループ(ハッシュ)|Hash|
|readable_group_ids|閲覧グループ|SS::Extensions::ObjectIds|
|readable_groups_hash|閲覧グループ(ハッシュ)|Hash|
|readable_member_ids|閲覧ユーザー|SS::Extensions::ObjectIds|
|readable_members_hash|閲覧ユーザー(ハッシュ)|Hash|
|readable_setting_range|公開範囲|String|
|site_id|組織|Object|
|text_index|全文検索インデックス(未使用)|String|
|updated|回答日|DateTime|
|user_group_id|作成者(グループ)|Integer|
|user_group_name|作成者(グループ名)|String|
|user_id|作成者|Object|
|user_ids|管理ユーザー|SS::Extensions::ObjectIds|
|user_name|作成者(氏名)|String|
|user_uid|作成者(UID)|String|
|users_hash|管理ユーザー(ハッシュ)|Hash|

## gws_survey_forms / アンケート

|Field|Description|Type|
|-----|-----------|----|
|_id|ID|BSON::ObjectId|
|anonymous_state|匿名回答|String|
|answered_users_hash|回答状況|Hash|
|category_ids|カテゴリー|SS::Extensions::ObjectIds|
|close_date|公開期限（終了）|DateTime|
|contributor_id|投稿者（データID）|String|
|contributor_model|投稿者（モデル）|String|
|contributor_name|投稿者名|String|
|created|投稿日|DateTime|
|custom_group_ids|管理カスタムグループ|SS::Extensions::ObjectIds|
|custom_groups_hash|管理カスタムグループ(ハッシュ)|Hash|
|deleted|削除日時|DateTime|
|description|説明|String|
|due_date|回答期限|DateTime|
|file_edit_state|回答の編集|String|
|file_state|回答結果|String|
|group_ids|管理グループ|SS::Extensions::ObjectIds|
|groups_hash|管理グループ(ハッシュ)|Hash|
|memo|備考|String|
|name|タイトル|String|
|notification_notice_state|通知|String|
|notification_noticed_at|通知日時|DateTime|
|order|並び順|Integer|
|permission_level|権限レベル|Integer|
|readable_custom_group_ids|閲覧カスタムグループ|SS::Extensions::ObjectIds|
|readable_custom_groups_hash|閲覧カスタムグループ(ハッシュ)|Hash|
|readable_group_ids|閲覧グループ|SS::Extensions::ObjectIds|
|readable_groups_hash|閲覧グループ(ハッシュ)|Hash|
|readable_member_ids|閲覧ユーザー|SS::Extensions::ObjectIds|
|readable_members_hash|閲覧ユーザー(ハッシュ)|Hash|
|readable_setting_range|公開範囲|String|
|release_date|公開期限（開始）|DateTime|
|site_id|組織|Object|
|state|公開状態|String|
|text_index|全文検索インデックス(未使用)|String|
|updated|最終更新日|DateTime|
|user_group_id|作成者(グループ)|Integer|
|user_group_name|作成者(グループ名)|String|
|user_id|作成者|Object|
|user_ids|管理ユーザー|SS::Extensions::ObjectIds|
|user_name|作成者(氏名)|String|
|user_uid|作成者(UID)|String|
|users_hash|管理ユーザー(ハッシュ)|Hash|

## gws_user_form_data / 拡張データ

|Field|Description|Type|
|-----|-----------|----|
|_id|ID|BSON::ObjectId|
|created|作成日時|DateTime|
|deleted|削除日時|DateTime|
|form_id|拡張情報|Object|
|site_id|組織|Object|
|text_index|全文検索インデックス(未使用)|String|
|updated|更新日時|DateTime|
|user_group_id|作成者(グループ)|Integer|
|user_group_name|作成者(グループ名)|String|
|user_id|作成者|Object|
|user_name|作成者(氏名)|String|
|user_uid|作成者(UID)|String|

## gws_user_forms / 拡張情報

|Field|Description|Type|
|-----|-----------|----|
|_id|ID|BSON::ObjectId|
|created|作成日時|DateTime|
|deleted|削除日時|DateTime|
|memo|メモ|String|
|site_id|組織|Object|
|state|使用|String|
|text_index|全文検索インデックス(未使用)|String|
|updated|更新日時|DateTime|

## gws_user_presences

|Field|Description|Type|
|-----|-----------|----|
|_id|ID|Integer|
|created|作成日時|DateTime|
|deleted|削除日時|DateTime|
|memo|備考|String|
|plan|状況|String|
|site_id|組織|Object|
|state|ステータス|String|
|sync_available_state|在席|String|
|sync_timecard_state|タイムカードの打刻|String|
|sync_unavailable_state|離席|String|
|text_index|全文検索インデックス(未使用)|String|
|updated|更新日時|DateTime|
|user_group_id|作成者(グループ)|Integer|
|user_group_name|作成者(グループ名)|String|
|user_id|作成者|Object|
|user_name|作成者(氏名)|String|
|user_uid|作成者(UID)|String|

## gws_workflow_files / 申請書

|Field|Description|Type|
|-----|-----------|----|
|_id|ID|Integer|
|approved|承認日時|DateTime|
|close_date|Close date|DateTime|
|created|作成日時|DateTime|
|custom_group_ids|管理カスタムグループ|SS::Extensions::ObjectIds|
|custom_groups_hash|管理カスタムグループ(ハッシュ)|Hash|
|deleted|削除日時|DateTime|
|file_ids|ファイル|SS::Extensions::ObjectIds|
|form_id|フォーム|Object|
|group_ids|管理グループ|SS::Extensions::ObjectIds|
|groups_hash|管理グループ(ハッシュ)|Hash|
|name|タイトル|String|
|permission_level|権限レベル|Integer|
|readable_custom_group_ids|閲覧カスタムグループ|SS::Extensions::ObjectIds|
|readable_custom_groups_hash|閲覧カスタムグループ(ハッシュ)|Hash|
|readable_group_ids|閲覧グループ|SS::Extensions::ObjectIds|
|readable_groups_hash|閲覧グループ(ハッシュ)|Hash|
|readable_member_ids|閲覧ユーザー|SS::Extensions::ObjectIds|
|readable_members_hash|閲覧ユーザー(ハッシュ)|Hash|
|readable_setting_range|公開範囲|String|
|release_date|Release date|DateTime|
|released|Released|DateTime|
|requested|Requested|DateTime|
|site_id|組織|Object|
|state|ステータス|String|
|text|内容|String|
|text_index|全文検索インデックス(未使用)|String|
|text_type|内容形式|String|
|updated|更新日時|DateTime|
|user_group_id|作成者(グループ)|Integer|
|user_group_name|作成者(グループ名)|String|
|user_id|作成者|Object|
|user_ids|管理ユーザー|SS::Extensions::ObjectIds|
|user_name|作成者(氏名)|String|
|user_uid|作成者(UID)|String|
|users_hash|管理ユーザー(ハッシュ)|Hash|
|workflow_agent_id|Workflow agent|Object|
|workflow_approver_attachment_uses|承認者によるファイル追加|Array|
|workflow_approvers|承認者|Workflow::Extensions::WorkflowApprovers|
|workflow_circulation_attachment_uses|回覧者によるファイル追加|Array|
|workflow_circulations|回覧者|Workflow::Extensions::WorkflowCirculations|
|workflow_comment|申請コメント|String|
|workflow_current_circulation_level|現在の回覧ステップ|Integer|
|workflow_kind|承認の種類|String|
|workflow_member_id|承認者|Integer|
|workflow_on_remand|差し戻し時|String|
|workflow_pull_up|引き上げ承認|String|
|workflow_reminder_sent_at|Workflow reminder sent at|DateTime|
|workflow_required_counts|必要承認数|Workflow::Extensions::Route::RequiredCounts|
|workflow_state|承認状態|String|
|workflow_user_id|申請者|Object|

## gws_workflow_forms / 申請フォーム

|Field|Description|Type|
|-----|-----------|----|
|_id|ID|BSON::ObjectId|
|agent_state|代理申請|String|
|created|作成日時|DateTime|
|custom_group_ids|管理カスタムグループ|SS::Extensions::ObjectIds|
|custom_groups_hash|管理カスタムグループ(ハッシュ)|Hash|
|deleted|削除日時|DateTime|
|group_ids|管理グループ|SS::Extensions::ObjectIds|
|groups_hash|管理グループ(ハッシュ)|Hash|
|memo|備考|String|
|name|タイトル|String|
|order|並び順|Integer|
|permission_level|権限レベル|Integer|
|readable_custom_group_ids|閲覧カスタムグループ|SS::Extensions::ObjectIds|
|readable_custom_groups_hash|閲覧カスタムグループ(ハッシュ)|Hash|
|readable_group_ids|閲覧グループ|SS::Extensions::ObjectIds|
|readable_groups_hash|閲覧グループ(ハッシュ)|Hash|
|readable_member_ids|閲覧ユーザー|SS::Extensions::ObjectIds|
|readable_members_hash|閲覧ユーザー(ハッシュ)|Hash|
|readable_setting_range|公開範囲|String|
|site_id|組織|Object|
|state|公開状態|String|
|text_index|全文検索インデックス(未使用)|String|
|updated|更新日時|DateTime|
|user_group_id|作成者(グループ)|Integer|
|user_group_name|作成者(グループ名)|String|
|user_id|作成者|Object|
|user_ids|管理ユーザー|SS::Extensions::ObjectIds|
|user_name|作成者(氏名)|String|
|user_uid|作成者(UID)|String|
|users_hash|管理ユーザー(ハッシュ)|Hash|

## gws_workload_categories / 業務カテゴリー

|Field|Description|Type|
|-----|-----------|----|
|_id|ID|Integer|
|created|作成日時|DateTime|
|deleted|削除日時|DateTime|
|member_group_id|担当グループ|Object|
|member_ids|担当ユーザー|SS::Extensions::ObjectIds|
|name|カテゴリー名|String|
|order|並び順|Integer|
|site_id|組織|Object|
|text_index|全文検索インデックス(未使用)|String|
|updated|更新日時|DateTime|
|user_group_id|作成者(グループ)|Integer|
|user_group_name|作成者(グループ名)|String|
|user_id|作成者|Object|
|user_name|作成者(氏名)|String|
|user_uid|作成者(UID)|String|
|year|年度|Integer|

## gws_workload_clients / 依頼元

|Field|Description|Type|
|-----|-----------|----|
|_id|ID|Integer|
|color|表示色|String|
|created|作成日時|DateTime|
|deleted|削除日時|DateTime|
|graph_state|グラフ表示|String|
|name|依頼元|String|
|order|並び順|Integer|
|site_id|組織|Object|
|text_index|全文検索インデックス(未使用)|String|
|updated|更新日時|DateTime|
|user_group_id|作成者(グループ)|Integer|
|user_group_name|作成者(グループ名)|String|
|user_id|作成者|Object|
|user_name|作成者(氏名)|String|
|user_uid|作成者(UID)|String|
|year|年度|Integer|

## gws_workload_cycles / 頻度

|Field|Description|Type|
|-----|-----------|----|
|_id|ID|Integer|
|created|作成日時|DateTime|
|deleted|削除日時|DateTime|
|name|名称|String|
|order|並び順|Integer|
|site_id|組織|Object|
|text_index|全文検索インデックス(未使用)|String|
|updated|更新日時|DateTime|
|user_group_id|作成者(グループ)|Integer|
|user_group_name|作成者(グループ名)|String|
|user_id|作成者|Object|
|user_name|作成者(氏名)|String|
|user_uid|作成者(UID)|String|
|year|年度|Integer|

## gws_workload_graph_user_settings / 集計ユーザー

|Field|Description|Type|
|-----|-----------|----|
|_id|ID|Integer|
|color|表示色|String|
|created|作成日時|DateTime|
|deleted|削除日時|DateTime|
|graph_state|グラフ表示|String|
|group_id|Group|Object|
|name|名称|String|
|order|Order|Integer|
|site_id|組織|Object|
|text_index|全文検索インデックス(未使用)|String|
|updated|更新日時|DateTime|
|user_group_id|作成者(グループ)|Integer|
|user_group_name|作成者(グループ名)|String|
|user_id|作成者|Object|
|user_name|作成者(氏名)|String|
|user_uid|作成者(UID)|String|

## gws_workload_loads / 業務負荷

|Field|Description|Type|
|-----|-----------|----|
|_id|ID|Integer|
|coefficient|負荷係数|Integer|
|color|表示色|String|
|created|作成日時|DateTime|
|deleted|削除日時|DateTime|
|graph_state|グラフ表示|String|
|name|名称|String|
|order|並び順|Integer|
|site_id|組織|Object|
|text_index|全文検索インデックス(未使用)|String|
|updated|更新日時|DateTime|
|user_group_id|作成者(グループ)|Integer|
|user_group_name|作成者(グループ名)|String|
|user_id|作成者|Object|
|user_name|作成者(氏名)|String|
|user_uid|作成者(UID)|String|
|year|年度|Integer|

## gws_workload_overtimes / 残業時間

|Field|Description|Type|
|-----|-----------|----|
|_id|ID|Integer|
|created|作成日時|DateTime|
|deleted|削除日時|DateTime|
|group_id|Group|Object|
|month10_minutes|10月の残業時間|Integer|
|month11_minutes|11月の残業時間|Integer|
|month12_minutes|12月の残業時間|Integer|
|month1_minutes|1月の残業時間|Integer|
|month2_minutes|2月の残業時間|Integer|
|month3_minutes|3月の残業時間|Integer|
|month4_minutes|4月の残業時間|Integer|
|month5_minutes|5月の残業時間|Integer|
|month6_minutes|6月の残業時間|Integer|
|month7_minutes|7月の残業時間|Integer|
|month8_minutes|8月の残業時間|Integer|
|month9_minutes|9月の残業時間|Integer|
|name|名称|String|
|order|Order|Integer|
|site_id|組織|Object|
|text_index|全文検索インデックス(未使用)|String|
|updated|更新日時|DateTime|
|user_group_id|作成者(グループ)|Integer|
|user_group_name|作成者(グループ名)|String|
|user_id|作成者|Object|
|user_name|作成者(氏名)|String|
|user_uid|作成者(UID)|String|
|year|Year|Integer|

## gws_workload_work_comments

|Field|Description|Type|
|-----|-----------|----|
|_id|ID|BSON::ObjectId|
|achievement_rate|進捗率|Integer|
|commented_at|日時|DateTime|
|created|作成日時|DateTime|
|day|日|Integer|
|deleted|削除日時|DateTime|
|month|月|Integer|
|site_id|組織|Object|
|text|内容|String|
|text_index|全文検索インデックス(未使用)|String|
|text_type|内容形式|String|
|updated|更新日時|DateTime|
|user_group_id|作成者(グループ)|Integer|
|user_group_name|作成者(グループ名)|String|
|user_id|作成者|Object|
|user_name|作成者(氏名)|String|
|user_uid|作成者(UID)|String|
|work_id|業務|Object|
|worktime_minutes|業務時間|Integer|
|year|年度|Integer|

## gws_workload_works / 担当業務

|Field|Description|Type|
|-----|-----------|----|
|_id|ID|Integer|
|achievement_rate|進捗率|Integer|
|category_id|業務カテゴリー|Object|
|client_id|依頼元|Object|
|created|投稿日|DateTime|
|custom_group_ids|管理カスタムグループ|SS::Extensions::ObjectIds|
|custom_groups_hash|管理カスタムグループ(ハッシュ)|Hash|
|cycle_id|頻度|Object|
|deleted|削除日時|DateTime|
|due_date|期限日|DateTime|
|due_end_on|終了日|DateTime|
|due_start_on|開始日|DateTime|
|file_ids|ファイル|SS::Extensions::ObjectIds|
|group_ids|管理グループ|SS::Extensions::ObjectIds|
|groups_hash|管理グループ(ハッシュ)|Hash|
|load_id|業務負荷|Object|
|member_group_id|担当グループ|Object|
|member_ids|担当ユーザー|SS::Extensions::ObjectIds|
|name|業務名|String|
|permission_level|権限レベル|Integer|
|readable_custom_group_ids|閲覧カスタムグループ|SS::Extensions::ObjectIds|
|readable_custom_groups_hash|閲覧カスタムグループ(ハッシュ)|Hash|
|readable_group_ids|閲覧グループ|SS::Extensions::ObjectIds|
|readable_groups_hash|閲覧グループ(ハッシュ)|Hash|
|readable_member_ids|閲覧ユーザー|SS::Extensions::ObjectIds|
|readable_members_hash|閲覧ユーザー(ハッシュ)|Hash|
|readable_setting_range|公開範囲|String|
|site_id|組織|Object|
|state|ステータス|String|
|text|内容|String|
|text_index|全文検索インデックス(未使用)|String|
|text_type|内容形式|String|
|updated|更新日時|DateTime|
|user_group_id|作成者(グループ)|Integer|
|user_group_name|作成者(グループ名)|String|
|user_id|作成者|Object|
|user_ids|管理ユーザー|SS::Extensions::ObjectIds|
|user_name|作成者(氏名)|String|
|user_uid|作成者(UID)|String|
|users_hash|管理ユーザー(ハッシュ)|Hash|
|work_state|Work state|String|
|worktime_minutes|業務時間|Integer|
|year|年度|Integer|
|year_months|Year months|Array|

## history_backups

|Field|Description|Type|
|-----|-----------|----|
|_id|ID|BSON::ObjectId|
|action|アクション|String|
|created|作成日時|DateTime|
|data|保存データ|Hash|
|deleted|削除日時|DateTime|
|member_id|Member|Object|
|member_name|Member name|String|
|ref_class|保存クラス|String|
|ref_coll|保存コレクション|String|
|state|ステータス|String|
|text_index|全文検索インデックス(未使用)|String|
|updated|更新日時|DateTime|
|user_id|User|Object|
|user_name|User name|String|
|user_uid|User uid|String|
|version|バージョン|String|

## history_logs / 操作履歴

|Field|Description|Type|
|-----|-----------|----|
|_id|ID|BSON::ObjectId|
|action|アクション|String|
|behavior|動作|String|
|controller|Controller|String|
|created|操作日時|DateTime|
|deleted|削除日時|DateTime|
|filename|ファイル名|String|
|group_ids|Group ids|Array|
|page_url|ページURL|String|
|ref_coll|Ref coll|String|
|request_id|リクエストID|String|
|session_id|セッションID|String|
|site_id|Site|Object|
|target_class|Target class|String|
|target_id|Target|String|
|text_index|全文検索インデックス(未使用)|String|
|updated|更新日時|DateTime|
|url|Url|String|
|user_id|ユーザー|Object|

## history_trashes / ゴミ箱

|Field|Description|Type|
|-----|-----------|----|
|_id|ID|BSON::ObjectId|
|action|アクション|String|
|created|作成日時|DateTime|
|data|保存データ|Hash|
|deleted|削除日時|DateTime|
|member_id|Member|Object|
|member_name|Member name|String|
|ref_class|保存クラス|String|
|ref_coll|保存コレクション|String|
|site_id|サイト|Object|
|state|ステータス|String|
|text_index|全文検索インデックス(未使用)|String|
|updated|更新日時|DateTime|
|user_id|User|Object|
|user_name|User name|String|
|user_uid|User uid|String|
|version|バージョン|String|

## inquiry_answer_data

|Field|Description|Type|
|-----|-----------|----|
|_id|ID|BSON::ObjectId|
|column_id||Object|
|confirm||String|
|value||String|
|values||Array|

## inquiry_answers / 回答データ

|Field|Description|Type|
|-----|-----------|----|
|_id|ID|Integer|
|closed|Closed|DateTime|
|comment|コメント|String|
|created|受信日時|DateTime|
|deleted|削除日時|DateTime|
|group_ids|管理グループ|SS::Extensions::ObjectIds|
|inquiry_page_name|お問い合わせページタイトル|String|
|inquiry_page_url|お問い合わせページURL|String|
|kintone_record_key|レコードID|String|
|kintone_revision|レコードrevision|String|
|kintone_update_error_message|エラーメッセージ|String|
|member_id|回答メンバー|Object|
|node_id|Node|Object|
|permission_level|権限レベル|Integer|
|remote_addr|IPアドレス|String|
|site_id|サイト|Object|
|source_name|ページタイトル|String|
|source_url|ページURL|String|
|state|状態|String|
|text_index|全文検索インデックス(未使用)|String|
|updated|更新日時|DateTime|
|user_agent|ユーザーエージェント|String|

## inquiry_columns / 入力項目

|Field|Description|Type|
|-----|-----------|----|
|_id|ID|Integer|
|additional_attr|追加属性|String|
|created|作成日時|DateTime|
|deleted|削除日時|DateTime|
|group_ids|管理グループ|SS::Extensions::ObjectIds|
|html|説明テキスト|String|
|input_confirm|入力確認|String|
|input_type|入力形式|String|
|kintone_field_code|フィールドコード|String|
|max_upload_file_size|最大ファイルサイズ設定|Integer|
|name|項目名|String|
|node_id|Node|Object|
|order|並び順|Integer|
|permission_level|権限レベル|Integer|
|question|FAQ引用|String|
|required|必須入力|String|
|required_in_select_form|フォーム別必須入力|Array|
|select_options|選択肢|SS::Extensions::Lines|
|site_id|サイト|Object|
|state|ステータス|String|
|text_index|全文検索インデックス(未使用)|String|
|transfers|キーワード|Array|
|updated|更新日時|DateTime|

## jmaxml_actions / 受信時の動作

|Field|Description|Type|
|-----|-----------|----|
|_id|ID|BSON::ObjectId|
|_type|Type|String|
|created|作成日時|DateTime|
|deleted|削除日時|DateTime|
|name|名前|String|
|site_id|サイト|Object|
|text_index|全文検索インデックス(未使用)|String|
|updated|更新日時|DateTime|

## jmaxml_filters / フィルター

|Field|Description|Type|
|-----|-----------|----|
|_id|ID|BSON::ObjectId|
|action_ids|受信時の動作|SS::Extensions::ObjectIds|
|created|作成日時|DateTime|
|deleted|削除日時|DateTime|
|name|名前|String|
|state|状態|String|
|text_index|全文検索インデックス(未使用)|String|
|trigger_ids|受信条件|SS::Extensions::ObjectIds|
|updated|更新日時|DateTime|

## jmaxml_forecast_regions / 気象情報区域

|Field|Description|Type|
|-----|-----------|----|
|_id|ID|Integer|
|code|コード|String|
|created|作成日時|DateTime|
|deleted|削除日時|DateTime|
|name|名称|String|
|order|並び順|Integer|
|short_name|短い名称|String|
|short_yomi|短い名称のよみ|String|
|site_id|サイト|Object|
|state|状態|String|
|text_index|全文検索インデックス(未使用)|String|
|updated|更新日時|DateTime|
|yomi|よみ|String|

## jmaxml_triggers / 受信条件

|Field|Description|Type|
|-----|-----------|----|
|_id|ID|BSON::ObjectId|
|_type|Type|String|
|created|作成日時|DateTime|
|deleted|削除日時|DateTime|
|name|名前|String|
|site_id|サイト|Object|
|test_status|試験XML|String|
|text_index|全文検索インデックス(未使用)|String|
|training_status|訓練XML|String|
|updated|更新日時|DateTime|

## jmaxml_tsunami_regions / 津波予報区

|Field|Description|Type|
|-----|-----------|----|
|_id|ID|Integer|
|code|コード|String|
|created|作成日時|DateTime|
|deleted|削除日時|DateTime|
|name|名称|String|
|order|並び順|Integer|
|site_id|サイト|Object|
|state|状態|String|
|text_index|全文検索インデックス(未使用)|String|
|updated|更新日時|DateTime|
|yomi|よみ|String|

## jmaxml_water_level_stations / 水位観測所

|Field|Description|Type|
|-----|-----------|----|
|_id|ID|Integer|
|code|コード|String|
|created|作成日時|DateTime|
|deleted|削除日時|DateTime|
|name|名称|String|
|order|並び順|Integer|
|region_name|予報区域名|String|
|site_id|サイト|Object|
|state|状態|String|
|text_index|全文検索インデックス(未使用)|String|
|updated|更新日時|DateTime|

## job_logs / ジョブ実行履歴

|Field|Description|Type|
|-----|-----------|----|
|_id|ID|Integer|
|args|パラメータ|Array|
|at|At|Integer|
|class_name|ジョブ名|String|
|closed|終了日時|DateTime|
|created|作成日時|DateTime|
|deleted|削除日時|DateTime|
|group_id|Group|Object|
|hostname|ホスト名|String|
|ip_address|IPアドレス|String|
|job_id|ジョブID|String|
|logs|ログ|Array|
|pool|Pool|String|
|priority|Priority|Integer|
|process_id|プロセスID|Integer|
|started|開始日時|DateTime|
|state|状態|String|
|text_index|全文検索インデックス(未使用)|String|
|updated|更新日時|DateTime|
|user_id|ユーザー|Object|
|site_id|サイト|Object|

## kana_dictionaries / かな辞書

|Field|Description|Type|
|-----|-----------|----|
|_id|ID|Integer|
|body|設定|String|
|created|作成日時|DateTime|
|deleted|削除日時|DateTime|
|name|名前|String|
|site_id|サイト|Object|
|text_index|全文検索インデックス(未使用)|String|
|updated|更新日時|DateTime|

## ldap_imports / インポート

|Field|Description|Type|
|-----|-----------|----|
|_id|ID|Integer|
|created|作成日時|DateTime|
|deleted|削除日時|DateTime|
|group_count|グループ数|Integer|
|ldap|LDAPインポート結果|Ldap::Extensions::LdapArray|
|site_id|サイト|Object|
|text_index|全文検索インデックス(未使用)|String|
|updated|更新日時|DateTime|
|user_count|ユーザ数|Integer|

## map_geolocations

|Field|Description|Type|
|-----|-----------|----|
|_id|ID|BSON::ObjectId|
|category_ids|Category ids|Array|
|created|作成日時|DateTime|
|deleted|削除日時|DateTime|
|depth|Depth|Integer|
|filename|ファイル名|String|
|location|Location|Mongoid::Geospatial::Point|
|name|Name|String|
|owner_item_id|Owner item|Object|
|owner_item_type|Owner item type|String|
|site_id|Site|Object|
|text_index|全文検索インデックス(未使用)|String|
|updated|更新日時|DateTime|

## member_activity_logs / 活動履歴

|Field|Description|Type|
|-----|-----------|----|
|_id|ID|Integer|
|activity_type|種別|String|
|created|作成日時|DateTime|
|deleted|削除日時|DateTime|
|member_id|メンバー|Object|
|remote_addr|リモートアドレス|String|
|site_id|サイト|Object|
|text_index|全文検索インデックス(未使用)|String|
|updated|更新日時|DateTime|
|user_agent|ユーザーエージェント|String|

## member_bookmarks

|Field|Description|Type|
|-----|-----------|----|
|_id|ID|BSON::ObjectId|
|content_id|Content|Object|
|content_type|Content type|String|
|created|作成日時|DateTime|
|deleted|削除日時|DateTime|
|member_id|メンバー|Object|
|name|Name|String|
|site_id|サイト|Object|
|text_index|全文検索インデックス(未使用)|String|
|updated|更新日時|DateTime|

## member_group_members / グループメンバー

|Field|Description|Type|
|-----|-----------|----|
|_id|ID|BSON::ObjectId|
|created|作成日時|DateTime|
|deleted|削除日時|DateTime|
|member_id|メンバー|Object|
|state|状態|String|
|text_index|全文検索インデックス(未使用)|String|
|updated|更新日時|DateTime|

## member_groups / グループ

|Field|Description|Type|
|-----|-----------|----|
|_id|ID|Integer|
|created|作成日時|DateTime|
|deleted|削除日時|DateTime|
|invitation_message|招待メッセージ|String|
|name|グループ名|String|
|site_id|サイト|Object|
|text_index|全文検索インデックス(未使用)|String|
|updated|更新日時|DateTime|

## opendata_app_points

|Field|Description|Type|
|-----|-----------|----|
|_id|ID|BSON::ObjectId|
|app_id|App|Object|
|created|作成日時|DateTime|
|deleted|削除日時|DateTime|
|member_id|Member|Object|
|site_id|Site|Object|
|text_index|全文検索インデックス(未使用)|String|
|updated|更新日時|DateTime|

## opendata_appfiles

|Field|Description|Type|
|-----|-----------|----|
|_id|ID|Integer|
|created|作成日時|DateTime|
|deleted|削除日時|DateTime|
|file_id|ファイル|Object|
|filename|ファイル名|String|
|format|Format|String|
|text|説明|String|
|text_index|全文検索インデックス(未使用)|String|
|updated|更新日時|DateTime|

## opendata_csv2rdf_settings / RDF変換設定

|Field|Description|Type|
|-----|-----------|----|
|_id|ID|Integer|
|class_id|Class|Integer|
|column_types|列設定|Array|
|created|作成日時|DateTime|
|dataset_id|Dataset|Object|
|deleted|削除日時|DateTime|
|header_labels|タイトル|Array|
|header_rows|タイトル行数|Integer|
|resource_id|Resource|Integer|
|site_id|サイト|Object|
|text_index|全文検索インデックス(未使用)|String|
|updated|更新日時|DateTime|
|user_id|ユーザー|Object|

## opendata_dataset_access_reports

|Field|Description|Type|
|-----|-----------|----|
|_id|ID|BSON::ObjectId|
|created|作成日時|DateTime|
|dataset_areas|データセット地域|SS::Extensions::Lines|
|dataset_categories|データセット分野|SS::Extensions::Lines|
|dataset_estat_categories|データセットeStat分野|SS::Extensions::Lines|
|dataset_id|データセットID|Integer|
|dataset_name|データセット名|String|
|dataset_url|データセットURL|String|
|day0_count|Day0 count|Integer|
|day10_count|Day10 count|Integer|
|day11_count|Day11 count|Integer|
|day12_count|Day12 count|Integer|
|day13_count|Day13 count|Integer|
|day14_count|Day14 count|Integer|
|day15_count|Day15 count|Integer|
|day16_count|Day16 count|Integer|
|day17_count|Day17 count|Integer|
|day18_count|Day18 count|Integer|
|day19_count|Day19 count|Integer|
|day1_count|Day1 count|Integer|
|day20_count|Day20 count|Integer|
|day21_count|Day21 count|Integer|
|day22_count|Day22 count|Integer|
|day23_count|Day23 count|Integer|
|day24_count|Day24 count|Integer|
|day25_count|Day25 count|Integer|
|day26_count|Day26 count|Integer|
|day27_count|Day27 count|Integer|
|day28_count|Day28 count|Integer|
|day29_count|Day29 count|Integer|
|day2_count|Day2 count|Integer|
|day30_count|Day30 count|Integer|
|day3_count|Day3 count|Integer|
|day4_count|Day4 count|Integer|
|day5_count|Day5 count|Integer|
|day6_count|Day6 count|Integer|
|day7_count|Day7 count|Integer|
|day8_count|Day8 count|Integer|
|day9_count|Day9 count|Integer|
|deleted|削除日|DateTime|
|resource_filename|リソースファイル名|String|
|resource_format|リソースフォーマット|String|
|resource_id|リソースID|Integer|
|resource_name|リソース名|String|
|site_id|Site|Object|
|text_index|全文検索インデックス(未使用)|String|
|updated|更新日時|DateTime|
|year_month|年月|Integer|

## opendata_dataset_favorites

|Field|Description|Type|
|-----|-----------|----|
|_id|ID|BSON::ObjectId|
|created|作成日時|DateTime|
|dataset_id|Dataset|Object|
|deleted|削除日時|DateTime|
|member_id|Member|Object|
|site_id|サイト|Object|
|text_index|全文検索インデックス(未使用)|String|
|updated|更新日時|DateTime|

## opendata_dataset_groups / データセットグループ

|Field|Description|Type|
|-----|-----------|----|
|_id|ID|Integer|
|category_ids|分野|SS::Extensions::ObjectIds|
|created|作成日時|DateTime|
|deleted|削除日時|DateTime|
|group_ids|管理グループ|SS::Extensions::ObjectIds|
|name|グループ名|String|
|order|Order|Integer|
|permission_level|権限レベル|Integer|
|site_id|サイト|Object|
|state|ステータス|String|
|text_index|全文検索インデックス(未使用)|String|
|updated|更新日時|DateTime|
|user_id|ユーザー|Object|

## opendata_dataset_points

|Field|Description|Type|
|-----|-----------|----|
|_id|ID|BSON::ObjectId|
|created|作成日時|DateTime|
|dataset_id|Dataset|Object|
|deleted|削除日時|DateTime|
|member_id|Member|Object|
|site_id|Site|Object|
|text_index|全文検索インデックス(未使用)|String|
|updated|更新日時|DateTime|

## opendata_harvest_exporter_dataset_relations

|Field|Description|Type|
|-----|-----------|----|
|_id|ID|BSON::ObjectId|
|created|作成日時|DateTime|
|dataset_id|Dataset|Object|
|deleted|削除日時|DateTime|
|exporter_id|Exporter|Object|
|rel_id|Rel|String|
|text_index|全文検索インデックス(未使用)|String|
|updated|更新日時|DateTime|
|uuid|Uuid|String|

## opendata_harvest_exporter_group_settings

|Field|Description|Type|
|-----|-----------|----|
|_id|ID|Integer|
|category_ids|分野|SS::Extensions::ObjectIds|
|ckan_id|CKAN ID|String|
|ckan_name|CKAN NAME|String|
|created|作成日時|DateTime|
|deleted|削除日時|DateTime|
|estat_category_ids|eStat分野|SS::Extensions::ObjectIds|
|exporter_id|Exporter|Object|
|name|名前|String|
|order|並び順|Integer|
|site_id|サイト|Object|
|text_index|全文検索インデックス(未使用)|String|
|updated|更新日時|DateTime|
|user_id|ユーザー|Object|

## opendata_harvest_exporter_owner_org_settings

|Field|Description|Type|
|-----|-----------|----|
|_id|ID|Integer|
|ckan_id|CKAN ID|String|
|created|作成日時|DateTime|
|deleted|削除日時|DateTime|
|exporter_id|Exporter|Object|
|group_ids|グループ|SS::Extensions::ObjectIds|
|name|名前|String|
|order|並び順|Integer|
|site_id|サイト|Object|
|text_index|全文検索インデックス(未使用)|String|
|updated|更新日時|DateTime|
|user_id|ユーザー|Object|

## opendata_harvest_exporter_resource_relations

|Field|Description|Type|
|-----|-----------|----|
|_id|ID|BSON::ObjectId|
|created|作成日時|DateTime|
|deleted|削除日時|DateTime|
|rel_id|Rel|String|
|rel_revision_id|Rel revision|String|
|revision_id|Revision|String|
|text_index|全文検索インデックス(未使用)|String|
|updated|更新日時|DateTime|
|uuid|Uuid|String|

## opendata_harvest_exporters

|Field|Description|Type|
|-----|-----------|----|
|_id|ID|Integer|
|api_key|APIキー|String|
|api_type|API|String|
|created|作成日時|DateTime|
|deleted|削除日時|DateTime|
|deleted_resources|Deleted resources|Array|
|group_ids|管理グループ|SS::Extensions::ObjectIds|
|host|Host|String|
|name|名前|String|
|node_id|Node|Object|
|order|並び順|Integer|
|permission_level|権限レベル|Integer|
|site_id|サイト|Object|
|text_index|全文検索インデックス(未使用)|String|
|updated|更新日時|DateTime|
|url|URL|String|
|user_id|ユーザー|Object|

## opendata_harvest_importer_category_settings

|Field|Description|Type|
|-----|-----------|----|
|_id|ID|Integer|
|category_id|Category|Object|
|conditions|Conditions|Array|
|created|作成日時|DateTime|
|deleted|削除日時|DateTime|
|importer_id|Importer|Object|
|order|並び順|Integer|
|site_id|サイト|Object|
|text_index|全文検索インデックス(未使用)|String|
|updated|更新日時|DateTime|
|user_id|ユーザー|Object|

## opendata_harvest_importer_estat_category_settings

|Field|Description|Type|
|-----|-----------|----|
|_id|ID|Integer|
|category_id|Category|Object|
|conditions|Conditions|Array|
|created|作成日時|DateTime|
|deleted|削除日時|DateTime|
|importer_id|Importer|Object|
|order|並び順|Integer|
|site_id|サイト|Object|
|text_index|全文検索インデックス(未使用)|String|
|updated|更新日時|DateTime|
|user_id|ユーザー|Object|

## opendata_harvest_importer_report_datasets

|Field|Description|Type|
|-----|-----------|----|
|_id|ID|BSON::ObjectId|
|area_ids|Area ids|SS::Extensions::ObjectIds|
|category_ids|Category ids|SS::Extensions::ObjectIds|
|created|作成日時|DateTime|
|deleted|削除日時|DateTime|
|error_messages|Error messages|Array|
|estat_category_ids|Estat category ids|SS::Extensions::ObjectIds|
|imported_attributes|属性|Hash|
|name|Name|String|
|order|Order|Integer|
|report_id|Report|Object|
|size|Size|Integer|
|state|ステータス|String|
|text_index|全文検索インデックス(未使用)|String|
|updated|更新日時|DateTime|
|url|Url|String|
|uuid|Uuid|String|

## opendata_harvest_importer_report_resources

|Field|Description|Type|
|-----|-----------|----|
|_id|ID|BSON::ObjectId|
|created|作成日時|DateTime|
|deleted|削除日時|DateTime|
|error_messages|Error messages|Array|
|filename|ファイル名|String|
|format|Format|String|
|imported_attributes|Imported attributes|Hash|
|name|Name|String|
|order|Order|Integer|
|revision_id|Revision|String|
|size|Size|Integer|
|state|ステータス|String|
|text_index|全文検索インデックス(未使用)|String|
|updated|更新日時|DateTime|
|url|Url|String|
|uuid|Uuid|String|

## opendata_harvest_importer_reports

|Field|Description|Type|
|-----|-----------|----|
|_id|ID|BSON::ObjectId|
|created|作成日時|DateTime|
|deleted|削除日時|DateTime|
|importer_id|Importer|Object|
|site_id|サイト|Object|
|size|Size|Integer|
|text_index|全文検索インデックス(未使用)|String|
|updated|更新日時|DateTime|

## opendata_harvest_importers

|Field|Description|Type|
|-----|-----------|----|
|_id|ID|Integer|
|api_type|API|String|
|basicauth_password|Basic認証パスワード|String|
|basicauth_state|Basic認証|String|
|basicauth_username|Basic認証ユーザー名|String|
|created|作成日時|DateTime|
|default_area_ids|既定の地域|SS::Extensions::ObjectIds|
|default_category_ids|既定の分野|SS::Extensions::ObjectIds|
|default_estat_category_ids|既定のeStat分野|SS::Extensions::ObjectIds|
|deleted|削除日時|DateTime|
|group_ids|管理グループ|SS::Extensions::ObjectIds|
|name|名前|String|
|node_id|Node|Object|
|order|並び順|Integer|
|permission_level|権限レベル|Integer|
|resource_size_limit_mb|最大リソースサイズ|Integer|
|site_id|サイト|Object|
|source_host|Source host|String|
|source_url|URL|String|
|state|ステータス|String|
|text_index|全文検索インデックス(未使用)|String|
|updated|更新日時|DateTime|
|user_id|ユーザー|Object|

## opendata_idea_comments / コメント

|Field|Description|Type|
|-----|-----------|----|
|_id|ID|BSON::ObjectId|
|approved|Approved|DateTime|
|comment_deleted|Comment deleted|DateTime|
|contact_charge|担当|String|
|contact_email|メールアドレス|String|
|contact_fax|ファックス番号|String|
|contact_group_contact_id|Contact group contact|Object|
|contact_group_id|所属|Object|
|contact_group_relation|連絡先連動設定|String|
|contact_link_name|リンク名|String|
|contact_link_url|リンクURL|String|
|contact_state|表示設定|String|
|contact_tel|電話番号|String|
|created|作成日時|DateTime|
|deleted|削除日時|DateTime|
|idea_id|Idea|Object|
|member_id|Member|Object|
|name|Name|String|
|requested|Requested|DateTime|
|site_id|サイト|Object|
|state|ステータス|String|
|text|コメント|String|
|text_index|全文検索インデックス(未使用)|String|
|updated|更新日時|DateTime|
|user_id|ユーザー|Object|
|workflow_agent_id|Workflow agent|Object|
|workflow_approver_attachment_uses|Workflow approver attachment uses|Array|
|workflow_approvers|承認者|Workflow::Extensions::WorkflowApprovers|
|workflow_circulation_attachment_uses|Workflow circulation attachment uses|Array|
|workflow_circulations|Workflow circulations|Workflow::Extensions::WorkflowCirculations|
|workflow_comment|申請コメント|String|
|workflow_current_circulation_level|Workflow current circulation level|Integer|
|workflow_kind|Workflow kind|String|
|workflow_member_id|Workflow member|Integer|
|workflow_on_remand|Workflow on remand|String|
|workflow_pull_up|Workflow pull up|String|
|workflow_reminder_sent_at|Workflow reminder sent at|DateTime|
|workflow_required_counts|必要承認数|Workflow::Extensions::Route::RequiredCounts|
|workflow_state|承認状態|String|
|workflow_user_id|申請者|Object|

## opendata_idea_points

|Field|Description|Type|
|-----|-----------|----|
|_id|ID|BSON::ObjectId|
|created|作成日時|DateTime|
|deleted|削除日時|DateTime|
|idea_id|Idea|Object|
|member_id|Member|Object|
|site_id|Site|Object|
|text_index|全文検索インデックス(未使用)|String|
|updated|更新日時|DateTime|

## opendata_licenses / ライセンス

|Field|Description|Type|
|-----|-----------|----|
|_id|ID|Integer|
|created|作成日時|DateTime|
|default_state|既定|String|
|deleted|削除日時|DateTime|
|file_id|ライセンス画像|Object|
|group_ids|管理グループ|SS::Extensions::ObjectIds|
|name|ライセンス名|String|
|order|並び順|Integer|
|permission_level|権限レベル|Integer|
|related_url|関連URL|String|
|site_id|サイト|Object|
|state|ステータス|String|
|text_index|全文検索インデックス(未使用)|String|
|uid|ライセンスID|String|
|updated|更新日時|DateTime|
|user_id|ユーザー|Object|

## opendata_member_notices / 会員通知

|Field|Description|Type|
|-----|-----------|----|
|_id|ID|BSON::ObjectId|
|commented_count|Commented count|Integer|
|confirmed|Confirmed|DateTime|
|created|作成日時|DateTime|
|deleted|削除日時|DateTime|
|member_id|Member|Object|
|site_id|Site|Object|
|text_index|全文検索インデックス(未使用)|String|
|updated|更新日時|DateTime|

## opendata_resource_bulk_download_histories

|Field|Description|Type|
|-----|-----------|----|
|_id|ID|BSON::ObjectId|
|created|作成日時|DateTime|
|dataset_areas|Dataset areas|Array|
|dataset_categories|Dataset categories|Array|
|dataset_estat_categories|Dataset estat categories|Array|
|dataset_id|Dataset|Integer|
|dataset_name|Dataset name|String|
|deleted|削除日時|DateTime|
|downloaded|Downloaded|DateTime|
|full_url|Full url|String|
|remote_addr|Remote addr|String|
|resource_filename|Resource filename|String|
|resource_format|Resource format|String|
|resource_id|Resource|Integer|
|resource_name|Resource name|String|
|resource_source_url|Resource source url|String|
|site_id|サイト|Object|
|text_index|全文検索インデックス(未使用)|String|
|updated|更新日時|DateTime|
|user_agent|User agent|String|

## opendata_resource_dataset_download_histories

|Field|Description|Type|
|-----|-----------|----|
|_id|ID|BSON::ObjectId|
|created|作成日時|DateTime|
|dataset_areas|Dataset areas|Array|
|dataset_categories|Dataset categories|Array|
|dataset_estat_categories|Dataset estat categories|Array|
|dataset_id|Dataset|Integer|
|dataset_name|Dataset name|String|
|deleted|削除日時|DateTime|
|downloaded|Downloaded|DateTime|
|full_url|Full url|String|
|remote_addr|Remote addr|String|
|resource_filename|Resource filename|String|
|resource_format|Resource format|String|
|resource_id|Resource|Integer|
|resource_name|Resource name|String|
|resource_source_url|Resource source url|String|
|site_id|サイト|Object|
|text_index|全文検索インデックス(未使用)|String|
|updated|更新日時|DateTime|
|user_agent|User agent|String|

## opendata_resource_download_histories / リソースダンロード履歴

|Field|Description|Type|
|-----|-----------|----|
|_id|ID|BSON::ObjectId|
|created|作成日時|DateTime|
|dataset_areas|地域|Array|
|dataset_categories|分野|Array|
|dataset_estat_categories|eStat分野|Array|
|dataset_id|データセットID|Integer|
|dataset_name|データセット名|String|
|deleted|削除日時|DateTime|
|downloaded|ダウンロード日時|DateTime|
|downloaded_by|ダウンロード方法|String|
|full_url|URL|String|
|remote_addr|接続元IP|String|
|resource_filename|リソースファイル名|String|
|resource_format|リソースフォーマット|String|
|resource_id|リソースID|Integer|
|resource_name|リソース名|String|
|resource_source_url|リソースソースURL|String|
|site_id|Site|Object|
|text_index|全文検索インデックス(未使用)|String|
|updated|更新日時|DateTime|
|user_agent|ユーザーエージェント|String|

## opendata_resource_download_reports / リソースダンロード数集計結果

|Field|Description|Type|
|-----|-----------|----|
|_id|ID|BSON::ObjectId|
|created|作成日時|DateTime|
|dataset_areas|データセット地域|SS::Extensions::Lines|
|dataset_categories|データセット分野|SS::Extensions::Lines|
|dataset_estat_categories|データセットeStat分野|SS::Extensions::Lines|
|dataset_id|データセットID|Integer|
|dataset_name|データセット名|String|
|dataset_url|データセットURL|String|
|day0_count|Day0 count|Integer|
|day10_count|Day10 count|Integer|
|day11_count|Day11 count|Integer|
|day12_count|Day12 count|Integer|
|day13_count|Day13 count|Integer|
|day14_count|Day14 count|Integer|
|day15_count|Day15 count|Integer|
|day16_count|Day16 count|Integer|
|day17_count|Day17 count|Integer|
|day18_count|Day18 count|Integer|
|day19_count|Day19 count|Integer|
|day1_count|Day1 count|Integer|
|day20_count|Day20 count|Integer|
|day21_count|Day21 count|Integer|
|day22_count|Day22 count|Integer|
|day23_count|Day23 count|Integer|
|day24_count|Day24 count|Integer|
|day25_count|Day25 count|Integer|
|day26_count|Day26 count|Integer|
|day27_count|Day27 count|Integer|
|day28_count|Day28 count|Integer|
|day29_count|Day29 count|Integer|
|day2_count|Day2 count|Integer|
|day30_count|Day30 count|Integer|
|day3_count|Day3 count|Integer|
|day4_count|Day4 count|Integer|
|day5_count|Day5 count|Integer|
|day6_count|Day6 count|Integer|
|day7_count|Day7 count|Integer|
|day8_count|Day8 count|Integer|
|day9_count|Day9 count|Integer|
|deleted|削除日|DateTime|
|resource_filename|リソースファイル名|String|
|resource_format|リソースフォーマット|String|
|resource_id|リソースID|Integer|
|resource_name|リソース名|String|
|site_id|Site|Object|
|text_index|全文検索インデックス(未使用)|String|
|updated|更新日時|DateTime|
|year_month|年月|Integer|

## opendata_resource_preview_histories

|Field|Description|Type|
|-----|-----------|----|
|_id|ID|BSON::ObjectId|
|created|作成日時|DateTime|
|dataset_areas|地域|Array|
|dataset_categories|分野|Array|
|dataset_estat_categories|eStat分野|Array|
|dataset_id|データセットID|Integer|
|dataset_name|データセット名|String|
|deleted|削除日時|DateTime|
|full_url|URL|String|
|previewed|プレビュー日時|DateTime|
|remote_addr|接続元IP|String|
|resource_filename|リソースファイル名|String|
|resource_format|リソースフォーマット|String|
|resource_id|リソースID|Integer|
|resource_name|リソース名|String|
|resource_source_url|リソースソースURL|String|
|site_id|Site|Object|
|text_index|全文検索インデックス(未使用)|String|
|updated|更新日時|DateTime|
|user_agent|ユーザーエージェント|String|

## opendata_resource_preview_reports

|Field|Description|Type|
|-----|-----------|----|
|_id|ID|BSON::ObjectId|
|created|作成日時|DateTime|
|dataset_areas|データセット地域|SS::Extensions::Lines|
|dataset_categories|データセット分野|SS::Extensions::Lines|
|dataset_estat_categories|データセットeStat分野|SS::Extensions::Lines|
|dataset_id|データセットID|Integer|
|dataset_name|データセット名|String|
|dataset_url|データセットURL|String|
|day0_count|Day0 count|Integer|
|day10_count|Day10 count|Integer|
|day11_count|Day11 count|Integer|
|day12_count|Day12 count|Integer|
|day13_count|Day13 count|Integer|
|day14_count|Day14 count|Integer|
|day15_count|Day15 count|Integer|
|day16_count|Day16 count|Integer|
|day17_count|Day17 count|Integer|
|day18_count|Day18 count|Integer|
|day19_count|Day19 count|Integer|
|day1_count|Day1 count|Integer|
|day20_count|Day20 count|Integer|
|day21_count|Day21 count|Integer|
|day22_count|Day22 count|Integer|
|day23_count|Day23 count|Integer|
|day24_count|Day24 count|Integer|
|day25_count|Day25 count|Integer|
|day26_count|Day26 count|Integer|
|day27_count|Day27 count|Integer|
|day28_count|Day28 count|Integer|
|day29_count|Day29 count|Integer|
|day2_count|Day2 count|Integer|
|day30_count|Day30 count|Integer|
|day3_count|Day3 count|Integer|
|day4_count|Day4 count|Integer|
|day5_count|Day5 count|Integer|
|day6_count|Day6 count|Integer|
|day7_count|Day7 count|Integer|
|day8_count|Day8 count|Integer|
|day9_count|Day9 count|Integer|
|deleted|削除日|DateTime|
|resource_filename|リソースファイル名|String|
|resource_format|リソースフォーマット|String|
|resource_id|リソースID|Integer|
|resource_name|リソース名|String|
|site_id|Site|Object|
|text_index|全文検索インデックス(未使用)|String|
|updated|更新日時|DateTime|
|year_month|年月|Integer|

## opendata_resources

|Field|Description|Type|
|-----|-----------|----|
|_id|ID|Integer|
|assoc_file_id|Assoc file|Integer|
|assoc_filename|連携ファイル|String|
|assoc_method|連携確認方法|String|
|assoc_node_id|連携フォルダー|Integer|
|assoc_page_id|連携ページ|Integer|
|assoc_site_id|連携サイト|Integer|
|created|作成日時|DateTime|
|deleted|削除日時|DateTime|
|downloaded_count_cache|Downloaded count cache|Hash|
|file_id|ファイル|Object|
|filename|ファイル名|String|
|format|フォーマット|String|
|harvest_api_type|Harvest api type|String|
|harvest_host|Harvest host|String|
|harvest_imported|Harvest imported|DateTime|
|harvest_imported_attributes|Harvest imported attributes|Hash|
|harvest_imported_url|Harvest imported url|String|
|harvest_importer_id|Harvest importer|Object|
|harvest_text_index|Harvest text index|String|
|license_id|ライセンス|Object|
|map_resources|Map resources|Array|
|name|リソース名|String|
|order|並び順|Integer|
|preview_graph_state|グラフ表示|String|
|preview_graph_types|グラフ種別|Array|
|rdf_error|Rdf error|String|
|rdf_iri|Rdf iri|String|
|revision_id|Revision|String|
|source_url|リソースURL|String|
|state|ステータス|String|
|text|説明|String|
|text_index|全文検索インデックス(未使用)|String|
|tsv_id|プレビュー用データ|Object|
|updated|更新日時|DateTime|
|uuid|Uuid|String|

## opendata_url_resources

|Field|Description|Type|
|-----|-----------|----|
|_id|ID|Integer|
|crawl_state|ステータス|String|
|crawl_update|更新方法|String|
|created|作成日時|DateTime|
|deleted|削除日時|DateTime|
|file_id|クローリングファイル|Object|
|filename|ファイル名|String|
|format|フォーマット|String|
|harvest_api_type|Harvest api type|String|
|harvest_host|Harvest host|String|
|harvest_imported|Harvest imported|DateTime|
|harvest_imported_attributes|Harvest imported attributes|Hash|
|harvest_imported_url|Harvest imported url|String|
|harvest_importer_id|Harvest importer|Object|
|harvest_text_index|Harvest text index|String|
|license_id|ライセンス|Object|
|map_resources|Map resources|Array|
|name|リソース名|String|
|original_updated|元ファイル更新日時|DateTime|
|original_url|URL|String|
|rdf_error|Rdf error|String|
|rdf_iri|Rdf iri|String|
|revision_id|Revision|String|
|source_url|Source url|String|
|state|ステータス|String|
|text|説明|String|
|text_index|全文検索インデックス(未使用)|String|
|tsv_id|プレビュー|Object|
|updated|更新日時|DateTime|
|uuid|Uuid|String|

## rdf_classes / 種別

|Field|Description|Type|
|-----|-----------|----|
|_id|ID|Integer|
|category_ids|分野|SS::Extensions::ObjectIds|
|comments|説明|Rdf::Extensions::LangHash|
|created|作成日時|DateTime|
|deleted|削除日時|DateTime|
|labels|名称|Rdf::Extensions::LangHash|
|name|名前|String|
|sub_class_id|Sub class|Object|
|text_index|全文検索インデックス(未使用)|String|
|updated|更新日時|DateTime|
|vocab_id|Vocab|Object|

## rdf_props / 項目

|Field|Description|Type|
|-----|-----------|----|
|_id|ID|Integer|
|class_ids|Class ids|SS::Extensions::ObjectIds|
|comments|説明|Rdf::Extensions::LangHash|
|created|作成日時|DateTime|
|deleted|削除日時|DateTime|
|labels|名称|Rdf::Extensions::LangHash|
|name|名前|String|
|range_id|Range|Object|
|text_index|全文検索インデックス(未使用)|String|
|updated|更新日時|DateTime|
|vocab_id|Vocab|Object|

## rdf_vocabs / 語彙

|Field|Description|Type|
|-----|-----------|----|
|_id|ID|Integer|
|comments|説明|Rdf::Extensions::LangHash|
|created|作成日時|DateTime|
|creators|作成者|Array|
|deleted|削除日時|DateTime|
|labels|名称|Rdf::Extensions::LangHash|
|license|ライセンス|String|
|order|並び順|Integer|
|owner|所有者|String|
|prefix|プレフィックス|String|
|published|日時|String|
|site_id|サイト|Object|
|text_index|全文検索インデックス(未使用)|String|
|updated|更新日時|DateTime|
|uri|URI|String|
|version|バージョン|String|

## recommend_history_logs / 履歴

|Field|Description|Type|
|-----|-----------|----|
|_id|ID|BSON::ObjectId|
|access_url|Access url|String|
|created|作成日時|DateTime|
|deleted|削除日時|DateTime|
|path|Path|String|
|remote_addr|Remote addr|String|
|site_id|サイト|Object|
|target_class|Target class|String|
|target_id|Target|String|
|text_index|全文検索インデックス(未使用)|String|
|token|Token|String|
|updated|更新日時|DateTime|
|user_agent|User agent|String|

## recommend_similarity_scores / スコア

|Field|Description|Type|
|-----|-----------|----|
|_id|ID|Integer|
|created|作成日時|DateTime|
|deleted|削除日時|DateTime|
|key|Key|String|
|path|Path|String|
|score|Score|Float|
|site_id|サイト|Object|
|text_index|全文検索インデックス(未使用)|String|
|updated|更新日時|DateTime|

## rss_authors

|Field|Description|Type|
|-----|-----------|----|
|_id|ID|BSON::ObjectId|
|created|作成日時|DateTime|
|deleted|削除日時|DateTime|
|email|Email|String|
|name|Name|String|
|text_index|全文検索インデックス(未使用)|String|
|updated|更新日時|DateTime|
|uri|Uri|String|

## rss_weather_xml_regions / 地震情報区域

|Field|Description|Type|
|-----|-----------|----|
|_id|ID|Integer|
|code|コード|String|
|created|作成日時|DateTime|
|deleted|削除日時|DateTime|
|name|名称|String|
|order|並び順|Integer|
|site_id|サイト|Object|
|state|状態|String|
|text_index|全文検索インデックス(未使用)|String|
|updated|更新日時|DateTime|
|yomi|よみ|String|

## service_accounts / アカウント

|Field|Description|Type|
|-----|-----------|----|
|_id|ID|BSON::ObjectId|
|account|アカウントID|String|
|account_expiration_date|有効期限（終了）|DateTime|
|account_start_date|有効期限（開始）|DateTime|
|base_quota_used|標準機能使用容量|Integer|
|cms_quota|CMS容量制限|Integer|
|cms_quota_used|CMS使用容量|Integer|
|cms_use|CMSの利用|String|
|created|作成日時|DateTime|
|deleted|削除日時|DateTime|
|gws_quota|グループウェア容量制限|Integer|
|gws_quota_used|グループウェア使用容量|Integer|
|gws_use|グループウェアの利用|String|
|last_loggedin|最終ログイン日時|DateTime|
|name|アカウント名|String|
|organization_ids|組織|SS::Extensions::ObjectIds|
|password|パスワード|String|
|remark|備考|String|
|roles|ロール|SS::Extensions::Words|
|text_index|全文検索インデックス(未使用)|String|
|updated|更新日時|DateTime|
|webmail_quota|ウェブメール容量制限|Integer|
|webmail_quota_used|ウェブメール使用容量|Integer|
|webmail_use|ウェブメールの利用|String|

## sessions / セッション

|Field|Description|Type|
|-----|-----------|----|
|_data||BSON::Binary|
|_id|ID|BSON::ObjectId|
|created_at||Time|
|updated_at||Time|

## ss_access_tokens / アクセストークン

|Field|Description|Type|
|-----|-----------|----|
|_id|ID|BSON::ObjectId|
|created|作成日時|DateTime|
|deleted|削除日時|DateTime|
|expiration_date|Expiration date|DateTime|
|login_path|Login path|String|
|logout_path|Logout path|String|
|text_index|全文検索インデックス(未使用)|String|
|token|Token|String|
|updated|更新日時|DateTime|
|user_id|ユーザー|Object|

## ss_api_tokens

|Field|Description|Type|
|-----|-----------|----|
|_id|ID|BSON::ObjectId|
|_type|Type|String|
|audience_id|利用ユーザー|Object|
|created|作成日時|DateTime|
|custom_claim|Custom claim|Hash|
|deleted|削除日時|DateTime|
|expiration_date|期限切れ日時|DateTime|
|jwt_id|JWT ID (jti)|String|
|name|名前|String|
|state|ステータス|String|
|subject|Subject|String|
|text_index|全文検索インデックス(未使用)|String|
|updated|更新日時|DateTime|
|user_id|ユーザー|Object|

## ss_auths

|Field|Description|Type|
|-----|-----------|----|
|_id|ID|Integer|
|created|作成日時|DateTime|
|deleted|削除日時|DateTime|
|filename|ファイル名|String|
|model|Model|String|
|name|名前|String|
|order|並び順|Integer|
|state|ステータス|String|
|text|説明|String|
|text_index|全文検索インデックス(未使用)|String|
|updated|更新日時|DateTime|
|keys|キー|SS::Extensions::Words|
|auth_url|Auth URL|String|
|claims|Claim|SS::Extensions::Words|
|client_id|Client ID|String|
|client_secret|Client Secret|String|
|issuer|Issuer|String|
|jwks_uri|JWKS Uri|String|
|max_age|Max Age|Integer|
|response_mode|Response Mode|String|
|response_type|Response Type|String|
|scopes|Scope|SS::Extensions::Words|
|token_url|Token URL|String|
|entity_id|Entity ID|String|
|force_authn_state|再認証|String|
|name_id_format|Name ID Format|String|
|slo_url|SLO Url|String|
|sso_url|SSO Url|String|
|x509_cert|X509公開鍵証明書|String|

## ss_captchas

|Field|Description|Type|
|-----|-----------|----|
|_id|ID|BSON::ObjectId|
|captcha_error|Captcha error|String|
|captcha_text|Captcha text|String|
|created|作成日時|DateTime|
|deleted|削除日時|DateTime|
|text_index|全文検索インデックス(未使用)|String|
|updated|更新日時|DateTime|

## ss_contacts / 連絡先

|Field|Description|Type|
|-----|-----------|----|
|_id|ID|BSON::ObjectId|
|contact_email|メールアドレス|String|
|contact_fax|ファックス番号|String|
|contact_group_name|担当部署|String|
|contact_link_name|リンク名|String|
|contact_link_url|リンクURL|String|
|contact_tel|電話番号|String|
|created|作成日時|DateTime|
|deleted|削除日時|DateTime|
|main_state|主|String|
|name|識別名|String|
|text_index|全文検索インデックス(未使用)|String|
|updated|更新日時|DateTime|

## ss_files / ファイル

|Field|Description|Type|
|-----|-----------|----|
|_id|ID|Integer|
|content_type|コンテンツタイプ|String|
|created|作成日時|DateTime|
|csv_headers|Csv headers|Array|
|deleted|削除日時|DateTime|
|filename|ファイル名（英数）|String|
|geo_location|緯度・経度|Map::Extensions::Loc|
|model|モデル|String|
|name|ファイル名|String|
|owner_item_id|オーナーId|Object|
|owner_item_type|オーナー|String|
|sanitizer_state|Sanitizer state|String|
|site_id|サイト|Object|
|size|ファイルサイズ|Integer|
|state|状態|String|
|text_index|全文検索インデックス(未使用)|String|
|updated|更新日時|DateTime|
|user_id|ユーザー|Object|
|group_ids|管理グループ|SS::Extensions::ObjectIds|
|permission_level|権限レベル|Integer|
|node_id|Node|Object|
|category_ids|カテゴリー|SS::Extensions::ObjectIds|
|custom_group_ids|管理カスタムグループ|SS::Extensions::ObjectIds|
|custom_groups_hash|管理カスタムグループ(ハッシュ)|Hash|
|folder_id|フォルダー名|Object|
|groups_hash|管理グループ(ハッシュ)|Hash|
|lock_owner_id|ロック所有者|Object|
|lock_until|ロック期限|DateTime|
|memo|補足情報|String|
|readable_custom_group_ids|閲覧カスタムグループ|SS::Extensions::ObjectIds|
|readable_custom_groups_hash|閲覧カスタムグループ(ハッシュ)|Hash|
|readable_group_ids|閲覧グループ|SS::Extensions::ObjectIds|
|readable_groups_hash|閲覧グループ(ハッシュ)|Hash|
|readable_member_ids|閲覧ユーザー|SS::Extensions::ObjectIds|
|readable_members_hash|閲覧ユーザー(ハッシュ)|Hash|
|readable_setting_range|公開範囲|String|
|user_ids|管理ユーザー|SS::Extensions::ObjectIds|
|users_hash|管理ユーザー(ハッシュ)|Hash|
|member_id|メンバー|Object|
|original_id|Original|Object|
|link_url|Link url|String|

## ss_groups / グループ

|Field|Description|Type|
|-----|-----------|----|
|_id|ID|Integer|
|activation_date|有効期限（開始）|DateTime|
|contact_email|メールアドレス|String|
|contact_fax|ファックス番号|String|
|contact_group_name|担当部署|String|
|contact_link_name|リンク名|String|
|contact_link_url|リンクURL|String|
|contact_tel|電話番号|String|
|created|作成日時|DateTime|
|deleted|削除日時|DateTime|
|domains|ドメイン|SS::Extensions::Words|
|expiration_date|有効期限（終了）|DateTime|
|gws_use|グループウェアの使用|String|
|ldap_dn|DN|String|
|ldap_import_id|Ldap import|Integer|
|name|グループ名|String|
|order|表示順|Integer|
|text_index|全文検索インデックス(未使用)|String|
|updated|更新日時|DateTime|
|upload_policy|アップロード制限|String|
|affair_break_end_at_hour|Affair break end at hour|Integer|
|affair_break_end_at_hour_0|Affair break end at hour 0|Integer|
|affair_break_end_at_hour_1|Affair break end at hour 1|Integer|
|affair_break_end_at_hour_2|Affair break end at hour 2|Integer|
|affair_break_end_at_hour_3|Affair break end at hour 3|Integer|
|affair_break_end_at_hour_4|Affair break end at hour 4|Integer|
|affair_break_end_at_hour_5|Affair break end at hour 5|Integer|
|affair_break_end_at_hour_6|Affair break end at hour 6|Integer|
|affair_break_end_at_minute|Affair break end at minute|Integer|
|affair_break_end_at_minute_0|Affair break end at minute 0|Integer|
|affair_break_end_at_minute_1|Affair break end at minute 1|Integer|
|affair_break_end_at_minute_2|Affair break end at minute 2|Integer|
|affair_break_end_at_minute_3|Affair break end at minute 3|Integer|
|affair_break_end_at_minute_4|Affair break end at minute 4|Integer|
|affair_break_end_at_minute_5|Affair break end at minute 5|Integer|
|affair_break_end_at_minute_6|Affair break end at minute 6|Integer|
|affair_break_start_at_hour|Affair break start at hour|Integer|
|affair_break_start_at_hour_0|Affair break start at hour 0|Integer|
|affair_break_start_at_hour_1|Affair break start at hour 1|Integer|
|affair_break_start_at_hour_2|Affair break start at hour 2|Integer|
|affair_break_start_at_hour_3|Affair break start at hour 3|Integer|
|affair_break_start_at_hour_4|Affair break start at hour 4|Integer|
|affair_break_start_at_hour_5|Affair break start at hour 5|Integer|
|affair_break_start_at_hour_6|Affair break start at hour 6|Integer|
|affair_break_start_at_minute|Affair break start at minute|Integer|
|affair_break_start_at_minute_0|Affair break start at minute 0|Integer|
|affair_break_start_at_minute_1|Affair break start at minute 1|Integer|
|affair_break_start_at_minute_2|Affair break start at minute 2|Integer|
|affair_break_start_at_minute_3|Affair break start at minute 3|Integer|
|affair_break_start_at_minute_4|Affair break start at minute 4|Integer|
|affair_break_start_at_minute_5|Affair break start at minute 5|Integer|
|affair_break_start_at_minute_6|Affair break start at minute 6|Integer|
|affair_end_at_hour|Affair end at hour|Integer|
|affair_end_at_hour_0|Affair end at hour 0|Integer|
|affair_end_at_hour_1|Affair end at hour 1|Integer|
|affair_end_at_hour_2|Affair end at hour 2|Integer|
|affair_end_at_hour_3|Affair end at hour 3|Integer|
|affair_end_at_hour_4|Affair end at hour 4|Integer|
|affair_end_at_hour_5|Affair end at hour 5|Integer|
|affair_end_at_hour_6|Affair end at hour 6|Integer|
|affair_end_at_minute|Affair end at minute|Integer|
|affair_end_at_minute_0|Affair end at minute 0|Integer|
|affair_end_at_minute_1|Affair end at minute 1|Integer|
|affair_end_at_minute_2|Affair end at minute 2|Integer|
|affair_end_at_minute_3|Affair end at minute 3|Integer|
|affair_end_at_minute_4|Affair end at minute 4|Integer|
|affair_end_at_minute_5|Affair end at minute 5|Integer|
|affair_end_at_minute_6|Affair end at minute 6|Integer|
|affair_start_at_hour|Affair start at hour|Integer|
|affair_start_at_hour_0|Affair start at hour 0|Integer|
|affair_start_at_hour_1|Affair start at hour 1|Integer|
|affair_start_at_hour_2|Affair start at hour 2|Integer|
|affair_start_at_hour_3|Affair start at hour 3|Integer|
|affair_start_at_hour_4|Affair start at hour 4|Integer|
|affair_start_at_hour_5|Affair start at hour 5|Integer|
|affair_start_at_hour_6|Affair start at hour 6|Integer|
|affair_start_at_minute|Affair start at minute|Integer|
|affair_start_at_minute_0|Affair start at minute 0|Integer|
|affair_start_at_minute_1|Affair start at minute 1|Integer|
|affair_start_at_minute_2|Affair start at minute 2|Integer|
|affair_start_at_minute_3|Affair start at minute 3|Integer|
|affair_start_at_minute_4|Affair start at minute 4|Integer|
|affair_start_at_minute_5|Affair start at minute 5|Integer|
|affair_start_at_minute_6|Affair start at minute 6|Integer|
|affair_time_wday|Affair time wday|Object|
|attendance_break_enter1_label|休憩1開始ラベル|String|
|attendance_break_enter2_label|休憩2開始ラベル|String|
|attendance_break_enter3_label|休憩3開始ラベル|String|
|attendance_break_leave1_label|休憩1終了ラベル|String|
|attendance_break_leave2_label|休憩2終了ラベル|String|
|attendance_break_leave3_label|休憩3終了ラベル|String|
|attendance_break_time1_state|休憩1表示|String|
|attendance_break_time2_state|休憩2表示|String|
|attendance_break_time3_state|休憩3表示|String|
|attendance_enter_label|出勤表示|String|
|attendance_leave_label|退勤表示|String|
|attendance_management_year|管理年数|Integer|
|attendance_time_changed_minute|日替わり時刻|Integer|
|attendance_year_changed_month|年度替わり月|Integer|
|board_browsed_delay|既読にするまでの秒数|Integer|
|board_file_size_per_post|添付最大サイズ/投稿単位|Integer|
|board_file_size_per_topic|添付最大サイズ/トピック単位|Integer|
|board_files_break|ファイル表示の並び|String|
|board_links_break|リンク表示の並び|String|
|board_new_days|新着表示期間|Integer|
|canonical_domain|グループウェアドメイン|String|
|canonical_scheme|グループウェアスキーム|String|
|circular_article_state|表示種別|String|
|circular_default_due_date|回覧期限日初期値|Integer|
|circular_delete_threshold|回覧復旧可能期間|Integer|
|circular_files_break|ファイル表示の並び|String|
|circular_filesize_limit|添付サイズ制限|Integer|
|circular_max_member|回覧人数制限|Integer|
|circular_new_days|新着表示期間|Integer|
|circular_sort|回覧板の並び|String|
|color_button|文字色変更ボタン|String|
|compensatory_minute1|振替時間1|Integer|
|compensatory_minute2|振替時間2|Integer|
|compensatory_minute3|振替時間3|Integer|
|default_notice_state|お知らせ表示設定|String|
|desktop_chat|チャット機能|String|
|desktop_mailstore|メールストア機能|String|
|discussion_comment_limit|コメントの上限|Integer|
|discussion_filesize_limit|添付サイズ制限|Integer|
|discussion_new_days|新着表示期間|Integer|
|discussion_quota|総容量制限|Integer|
|discussion_recent_limit|新着表示件数|Integer|
|discussion_todo_limit|ToDo表示件数|Integer|
|discussion_unseen_interval|新着確認の間隔|Integer|
|divide_duties_limit|電子事務分掌表/表示件数|Integer|
|editor_css_path|スタイルシートパス|String|
|elasticsearch_hosts|全文検索サーバー|SS::Extensions::Words|
|facility_max_hour|取得可能時間（終了）|Integer|
|facility_min_hour|取得可能時間（開始）|Integer|
|faq_browsed_delay|既読にするまでの秒数|Integer|
|faq_file_size_per_post|添付最大サイズ/投稿単位|Integer|
|faq_file_size_per_topic|添付最大サイズ/トピック単位|Integer|
|faq_files_break|ファイル表示の並び|String|
|faq_new_days|新着表示期間|Integer|
|fiscal_year_changed_month|年度替わり月|Integer|
|log_board_severity|掲示板のログ|String|
|log_chorg_severity|組織変更のログ|String|
|log_circular_severity|回覧板のログ|String|
|log_discussion_severity|電子会議室のログ|String|
|log_elasticsearch_severity|全文検索のログ|String|
|log_facility_severity|設備管理のログ|String|
|log_faq_severity|よくある質問のログ|String|
|log_main_severity|標準機能のログ|String|
|log_memo_severity|メッセージのログ|String|
|log_monitor_severity|照会・回答のログ|String|
|log_personal_address_severity|個人アドレス帳のログ|String|
|log_portal_severity|ポータルのログ|String|
|log_qna_severity|Ｑ＆Ａのログ|String|
|log_report_severity|レポートのログ|String|
|log_save_days|ログ保持日数|Integer|
|log_schedule_severity|スケジュールのログ|String|
|log_share_severity|共有ファイルのログ|String|
|log_shared_address_severity|共有アドレス帳のログ|String|
|log_staff_record_severity|電子職員録のログ|String|
|log_workflow_severity|ワークフローのログ|String|
|logo_application_image_id|ロゴ画像|Object|
|logo_application_name|アプリケーション名|String|
|mail_signature|署名|String|
|memo_filesize_limit|添付サイズ制限|Integer|
|memo_quota|メッセージ容量制限|Integer|
|memo_reminder|リマインダー表示設定|Integer|
|menu_affair_label|庶務事務の表示|String|
|menu_affair_state|庶務事務の表示|String|
|menu_attendance_label|出退勤の表示|String|
|menu_attendance_state|出退勤の表示|String|
|menu_board_label|掲示板の表示|String|
|menu_board_state|掲示板の表示|String|
|menu_bookmark_label|お気に入りの表示|String|
|menu_bookmark_state|お気に入りの表示|String|
|menu_circular_label|回覧板の表示|String|
|menu_circular_state|回覧板の表示|String|
|menu_contrast_label|コントラスト|String|
|menu_contrast_state|コントラスト|String|
|menu_daily_report_label|日報の表示|String|
|menu_daily_report_state|日報の表示|String|
|menu_discussion_label|電子会議室|String|
|menu_discussion_state|電子会議室|String|
|menu_elasticsearch_label|全文検索の表示|String|
|menu_elasticsearch_state|全文検索の表示|String|
|menu_faq_label|よくある質問の表示|String|
|menu_faq_state|よくある質問の表示|String|
|menu_links_label|リンク集の表示|String|
|menu_links_state|リンク集の表示|String|
|menu_memo_label|メッセージの表示|String|
|menu_memo_state|メッセージの表示|String|
|menu_monitor_label|照会・回答の表示|String|
|menu_monitor_state|照会・回答の表示|String|
|menu_notice_label|お知らせの表示|String|
|menu_notice_state|お知らせの表示|String|
|menu_personal_address_label|個人アドレス帳の表示|String|
|menu_personal_address_state|個人アドレス帳の表示|String|
|menu_portal_label|ポータルの表示|String|
|menu_portal_state|ポータルの表示|String|
|menu_presence_label|在席管理の表示|String|
|menu_presence_state|在席管理の表示|String|
|menu_qna_label|Ｑ＆Ａの表示|String|
|menu_qna_state|Ｑ＆Ａの表示|String|
|menu_reminder_label|リマインダーの表示|String|
|menu_reminder_state|リマインダーの表示|String|
|menu_report_label|レポートの表示|String|
|menu_report_state|レポートの表示|String|
|menu_schedule_label|スケジュールの表示|String|
|menu_schedule_state|スケジュールの表示|String|
|menu_share_label|共有ファイルの表示|String|
|menu_share_state|共有ファイルの表示|String|
|menu_shared_address_label|共有アドレス帳の表示|String|
|menu_shared_address_state|共有アドレス帳の表示|String|
|menu_staff_record_label|電子職員録の表示|String|
|menu_staff_record_state|電子職員録の表示|String|
|menu_survey_label|アンケートの表示|String|
|menu_survey_state|アンケートの表示|String|
|menu_todo_label|ToDoの表示|String|
|menu_todo_state|ToDoの表示|String|
|menu_workflow_label|ワークフローの表示|String|
|menu_workflow_state|ワークフローの表示|String|
|menu_workload_label|業務見える化の表示|String|
|menu_workload_state|業務見える化の表示|String|
|monitor_delete_threshold|削除対象|String|
|monitor_file_size_per_post|添付最大サイズ/投稿単位|Integer|
|monitor_file_size_per_topic|添付最大サイズ/トピック単位|Integer|
|monitor_files_break|ファイル表示の並び|String|
|monitor_new_days|新着表示期間|Integer|
|multibyte_filename_state|日本語ファイル名|String|
|notice_affair_state|庶務事務|String|
|notice_announcement_state|お知らせ|String|
|notice_board_state|掲示板|String|
|notice_browsed_state|未読・既読|String|
|notice_circular_state|回覧板|String|
|notice_discussion_state|電子会議室|String|
|notice_faq_state|よくある質問|String|
|notice_monitor_state|照会・回答|String|
|notice_new_days|新着表示期間|Integer|
|notice_qna_state|Q&A|String|
|notice_report_state|レポート|String|
|notice_schedule_state|スケジュール|String|
|notice_severity|重要度|String|
|notice_survey_state|アンケート|String|
|notice_todo_state|ToDo|String|
|notice_toggle_browsed|既読への変更|String|
|notice_workflow_state|ワークフロー|String|
|notice_workload_state|業務見える化|String|
|overtime_in_work|標準勤務時間内での残業|String|
|qna_browsed_delay|既読にするまでの秒数|Integer|
|qna_file_size_per_post|添付最大サイズ/投稿単位|Integer|
|qna_file_size_per_topic|添付最大サイズ/トピック単位|Integer|
|qna_files_break|ファイル表示の並び|String|
|qna_new_days|新着表示期間|Integer|
|report_new_days|新着表示期間|Integer|
|schedule_attachment_state|ファイル添付|String|
|schedule_custom_group_extra_state|Schedule custom group extra state|String|
|schedule_custom_group_tab_state|カスタムグループタブの表示|String|
|schedule_drag_drop_state|ドラッグ＆ドロップ|String|
|schedule_facility_tab_label|設備予約タブの表示|String|
|schedule_facility_tab_state|設備予約タブの表示|String|
|schedule_first_wday|開始曜日|Integer|
|schedule_group_all_tab_label|全体タブの表示|String|
|schedule_group_all_tab_state|全体タブの表示|String|
|schedule_group_tab_state|グループタブの表示|String|
|schedule_max_file_size|添付最大サイズ|Integer|
|schedule_max_hour|終了時間|Integer|
|schedule_max_month|期末月|Integer|
|schedule_max_years|年数|Integer|
|schedule_min_hour|開始時間|Integer|
|schedule_personal_tab_label|個人タブの表示|String|
|schedule_personal_tab_state|個人タブの表示|String|
|send_notice_email_state|個人メール転送|String|
|sender_email|差出人メールアドレス|String|
|sender_name|差出人名|String|
|sender_user_id|差出ユーザー|Object|
|sendmail_domains|メール送信許可ドメイン|SS::Extensions::Words|
|share_default_sort|並び順の規定値|String|
|share_files_capacity|総容量制限|Integer|
|share_max_file_size|最大ファイルサイズ|Integer|
|share_new_days|新着表示期間|Integer|
|staff_records_limit|電子職員録/表示件数|Integer|
|superior_group_ids|上位グループ|SS::Extensions::ObjectIds|
|superior_user_ids|上位ユーザー|SS::Extensions::ObjectIds|
|survey_answered_state|表示種別|String|
|survey_default_due_date|回答期限日初期値|Integer|
|survey_new_days|新着表示期間|Integer|
|survey_sort|アンケートの並び|String|
|todo_delete_threshold|ToDo復旧可能期間|Integer|
|trash_threshold|ゴミ箱保持期間|Integer|
|trash_threshold_unit|ゴミ箱保持期間単位|String|
|upper_day_leave_minute|休暇申請の有効時間|Integer|
|usage_calculated_at|使用量計算日時|DateTime|
|usage_db_size|DB使用量|Integer|
|usage_file_count|ファイル数|Integer|
|usage_group_count|グループ数|Integer|
|usage_user_count|ユーザー数|Integer|
|user_public_profiles|公開プロフィール|SS::Extensions::Words|
|week_out_compensatory_file_end_limit|Week out compensatory file end limit|Integer|
|week_out_compensatory_file_end_limit_unit|Week out compensatory file end limit unit|String|
|week_out_compensatory_file_notify_day|同一週外振替通知日|Integer|
|week_out_compensatory_file_start_limit|Week out compensatory file start limit|Integer|
|week_out_compensatory_file_start_limit_unit|Week out compensatory file start limit unit|String|
|workflow_my_group|自所属の表示|String|
|workflow_new_days|新着表示期間|Integer|
|workload_default_due_date|Workload default due date|Integer|
|workload_delete_threshold|Workload delete threshold|Integer|
|workload_files_break|Workload files break|String|
|workload_filesize_limit|Workload filesize limit|Integer|
|workload_max_member|Workload max member|Integer|
|workload_new_days|Workload new days|Integer|
|imap_settings|Imap settings|Webmail::Extensions::ImapSettings|

## ss_image_resizes / 画像リサイズ

|Field|Description|Type|
|-----|-----------|----|
|_id|ID|Integer|
|created|作成日時|DateTime|
|deleted|削除日時|DateTime|
|extensions|拡張子|SS::Extensions::Words|
|max_height|縦幅|Integer|
|max_width|横幅|Integer|
|name|名前|String|
|order|並び順|Integer|
|quality|画質|Integer|
|size|制限サイズ|Integer|
|state|状態|String|
|text_index|全文検索インデックス(未使用)|String|
|updated|更新日時|DateTime|

## ss_max_file_sizes / 最大ファイルサイズ

|Field|Description|Type|
|-----|-----------|----|
|_id|ID|Integer|
|created|作成日時|DateTime|
|deleted|削除日時|DateTime|
|extensions|拡張子|SS::Extensions::Words|
|name|名前|String|
|order|並び順|Integer|
|size|制限サイズ|Integer|
|state|状態|String|
|text_index|全文検索インデックス(未使用)|String|
|updated|更新日時|DateTime|

## ss_migrations / DBマイグレーション

|Field|Description|Type|
|-----|-----------|----|
|_id|ID|BSON::ObjectId|
|created|作成日時|DateTime|
|deleted|削除日時|DateTime|
|text_index|全文検索インデックス(未使用)|String|
|updated|更新日時|DateTime|
|version|Version|String|

## ss_notifications / 通知

|Field|Description|Type|
|-----|-----------|----|
|_id|ID|Integer|
|created|作成日時|DateTime|
|deleted|削除日時|DateTime|
|format|フォーマット|String|
|group_id|グループ|Object|
|html|本文HTML|String|
|member_ids|参加者|SS::Extensions::ObjectIds|
|reply_item_id|返信ID|String|
|reply_model|返信モデル名|String|
|reply_module|返信モジュール名|String|
|send_date|送信日時|DateTime|
|state|ステータス|String|
|subject|件名|String|
|text|本文TEXT|String|
|text_index|全文検索インデックス(未使用)|String|
|updated|更新日時|DateTime|
|url|URL|String|
|user_id|ユーザー|Object|
|user_settings|ユーザー別設定|Array|

## ss_oauth2_applications / OAuthアプリ

|Field|Description|Type|
|-----|-----------|----|
|_id|ID|BSON::ObjectId|
|_type|Type|String|
|client_id|クライアントID|String|
|created|作成日時|DateTime|
|deleted|削除日時|DateTime|
|name|名前|String|
|permissions|権限|SS::Extensions::Words|
|state|ステータス|String|
|text_index|全文検索インデックス(未使用)|String|
|updated|更新日時|DateTime|

## ss_oauth2_tokens

|Field|Description|Type|
|-----|-----------|----|
|_id|ID|BSON::ObjectId|
|application_id|Application|Object|
|application_type|Application type|String|
|created|作成日時|DateTime|
|deleted|削除日時|DateTime|
|expiration_date|Expiration date|DateTime|
|scopes|Scopes|SS::Extensions::Words|
|text_index|全文検索インデックス(未使用)|String|
|token|Token|String|
|updated|更新日時|DateTime|
|user_id|ユーザー|Object|

## ss_postal_codes / 郵便番号

|Field|Description|Type|
|-----|-----------|----|
|_id|ID|Integer|
|city|区市町村|String|
|city_kana|区市町村（カナ）|String|
|code|郵便番号|String|
|created|作成日時|DateTime|
|deleted|削除日時|DateTime|
|prefecture|都道府県|String|
|prefecture_code|都道府県コード|String|
|prefecture_kana|都道府県（カナ）|String|
|text_index|全文検索インデックス(未使用)|String|
|town|町名|String|
|town_kana|町名（カナ）|String|
|updated|更新日時|DateTime|

## ss_pref_codes / 市町村コード

|Field|Description|Type|
|-----|-----------|----|
|_id|ID|Integer|
|city|市区町村名（漢字）|String|
|city_kana|市区町村名（カナ）|String|
|code|市町村コード|String|
|created|作成日時|DateTime|
|deleted|削除日時|DateTime|
|prefecture|都道府県名（漢字）|String|
|prefecture_kana|都道府県名（カナ）|String|
|text_index|全文検索インデックス(未使用)|String|
|updated|更新日時|DateTime|

## ss_sequences

|Field|Description|Type|
|-----|-----------|----|
|_id|ID|BSON::ObjectId|
|id||String|
|value||Integer|

## ss_sites / サイト

|Field|Description|Type|
|-----|-----------|----|
|_id|ID|Integer|
|anti_bot_methods|Bot対策|SS::Extensions::Words|
|app_state|アプリ|String|
|app_workflow_route_id|App workflow route|Object|
|approve_remind_later|承認督促期間|String|
|approve_remind_state|承認督促|String|
|auto_description|概要自動設定|String|
|auto_keywords|キーワード自動設定|String|
|close_confirmation|非公開保存の警告表示設定|String|
|close_days_before|公開終了間近の表示日|Integer|
|color_button|文字色変更ボタン|String|
|created|作成日時|DateTime|
|dataset_state|データセット|String|
|dataset_workflow_route_id|Dataset workflow route|Object|
|default_close_days_after|公開終了日|Integer|
|default_release_days_after|公開開始日|Integer|
|default_release_plan_state|公開予約の既定値|String|
|deleted|削除日時|DateTime|
|domains|ドメイン|SS::Extensions::Words|
|domains_with_subdir|サブディレクトリを含めたドメイン|Array|
|editor_css_path|スタイルシートパス|String|
|elasticsearch_deny|除外パス|SS::Extensions::Lines|
|elasticsearch_hosts|全文検索サーバー|SS::Extensions::Words|
|elasticsearch_indexes|インデックス|SS::Extensions::Words|
|elasticsearch_outside|外部サイト検索|String|
|elasticsearch_site_ids|サイト|SS::Extensions::ObjectIds|
|facebook_app_id|App ID|String|
|facebook_page_url|発行元URL|String|
|file_fs_access_restriction_allowed_ip_addresses|許可IPアドレス|SS::Extensions::Lines|
|file_fs_access_restriction_basic_auth_id|Basic認証（ID）|String|
|file_fs_access_restriction_basic_auth_password|Basic認証（パスワード）|String|
|file_fs_access_restriction_env_key|環境変数（キー）|String|
|file_fs_access_restriction_env_value|環境変数（値）|String|
|file_fs_access_restriction_state|/fs のアクセス制限|String|
|file_resizing|添付ファイルリサイズ|Array|
|forced_update|メールアドレス注意設定|String|
|generate_lock_until|書き出し停止期限|DateTime|
|generate_lock_user_id|Generate lock user|Object|
|group_ids|グループ|SS::Extensions::ObjectIds|
|host|ホスト名|String|
|https|HTTPS|String|
|idea_state|アイデア|String|
|idea_workflow_route_id|Idea workflow route|Object|
|inquiry_form_id|お問い合わせフォーム|Object|
|kana_format|ふりがなの形式|String|
|keywords|追加キーワード|SS::Extensions::Words|
|kintone_domain|kintone ドメイン|String|
|kintone_password|Basic認証パスワード|String|
|kintone_user|Basic認証ユーザー|String|
|line_channel_access_token|チャネルアクセストークン|String|
|line_channel_secret|チャネルシークレット|String|
|line_poster_state|ページ連携|String|
|logo_application_image_id|ロゴ画像|Object|
|logo_application_name|アプリケーション名|String|
|mail_signature|署名|String|
|maint_excluded_user_ids|除外ユーザー|SS::Extensions::ObjectIds|
|maint_remark|メンテナンス備考|String|
|maintenance_mode|メンテナンスモード|String|
|map_api|地図API|String|
|map_api_key|APIキー|String|
|map_api_layer|地図レイヤー|String|
|map_api_mypage|管理画面での地図表示|String|
|map_center|地図の中心座標|Map::Extensions::Loc|
|map_max_number_of_markers|最大地点数|Integer|
|max_name_length|ページタイトル文字数制限|Integer|
|mobile_css|CSS|SS::Extensions::Lines|
|mobile_location|ロケーション|String|
|mobile_size|１ページの最大サイズ|Integer|
|mobile_state|状態|String|
|multibyte_filename_state|日本語ファイル名|String|
|mypage_domain|マイページドメイン|String|
|mypage_scheme|マイページスキーム|String|
|name|サイト名|String|
|opengraph_defaul_image_url|既定の画像URL|String|
|opengraph_type|OpenGraph|String|
|page_expiration_before|公開期限|String|
|page_expiration_mail_subject|公開期限お知らせメール（件名）|String|
|page_expiration_mail_upper_text|公開期限お知らせメール（上部テキスト）|String|
|page_expiration_state|公開期限警告|String|
|parent_id|親サイト|Object|
|partner_site_ids|提携サイト|SS::Extensions::ObjectIds|
|rss_recent_state|rss-recent.xml|String|
|sender_email|差出人メールアドレス|String|
|sender_name|差出人名|String|
|sender_user_id|差出ユーザー|Object|
|show_google_maps_search|Googleマップへのリンク|String|
|source_cleaner_remove_class_state|不要なクラスの削除|String|
|source_cleaner_remove_tag_state|空のタグの削除|String|
|source_cleaner_unwrap_tag_state|不要なタグの削除|String|
|subdir|サブディレクトリ|String|
|syntax_check|アクセシビリティチェック|String|
|syntax_checker_url_scheme_attributes|属性|SS::Extensions::Words|
|syntax_checker_url_scheme_schemes|スキーム|SS::Extensions::Words|
|text_index|全文検索インデックス(未使用)|String|
|translate_api|API|String|
|translate_api_limit_exceeded_html|制限超過時の表示HTML|String|
|translate_api_request_word_limit|文字数上限|Integer|
|translate_google_api_credential_file_id|サービスアカウント秘密鍵|Object|
|translate_google_api_project_id|プロジェクトID|String|
|translate_google_api_request_count|APIリクエスト数|Integer|
|translate_google_api_request_word_count|APIリクエスト文字数|Integer|
|translate_microsoft_api_key|サブスクリプション キー|String|
|translate_microsoft_api_region|リージョン|String|
|translate_microsoft_api_request_count|APIリクエスト数|Integer|
|translate_microsoft_api_request_metered_usage|x-metered-usage|Integer|
|translate_microsoft_api_request_word_count|APIリクエスト文字数|Integer|
|translate_source_id|元言語コード|Object|
|translate_state|ステータス|String|
|translate_target_ids|翻訳言語コード|SS::Extensions::ObjectIds|
|trash_threshold|ゴミ箱保持期間|Integer|
|trash_threshold_unit|ゴミ箱保持期間単位|String|
|twitter_access_token|アクセストークン|String|
|twitter_access_token_secret|トークンシークレット|String|
|twitter_card|カード形式|String|
|twitter_consumer_key|コンシューマーキー|String|
|twitter_consumer_secret|コンシューマーシークレット|String|
|twitter_default_image_url|既定の画像URL|String|
|twitter_poster_state|ページ連携|String|
|twitter_username|ユーザー名|String|
|updated|更新日時|DateTime|
|upload_policy|アップロード制限|String|
|usage_calculated_at|使用量計算日時|DateTime|
|usage_db_size|DB使用量|Integer|
|usage_file_count|ファイル数|Integer|
|usage_group_count|グループ数|Integer|
|usage_node_count|フォルダー数|Integer|
|usage_page_count|ページ数|Integer|
|usage_user_count|ユーザー数|Integer|
|workflow_my_group|自所属の表示|String|

## ss_sso_tokens

|Field|Description|Type|
|-----|-----------|----|
|_id|ID|BSON::ObjectId|
|created|作成日時|DateTime|
|deleted|削除日時|DateTime|
|login_path|Login path|String|
|ref|Ref|String|
|text_index|全文検索インデックス(未使用)|String|
|token|Token|String|
|updated|更新日時|DateTime|

## ss_tasks / タスク

|Field|Description|Type|
|-----|-----------|----|
|_id|ID|Integer|
|at|At|Integer|
|closed|終了日時|DateTime|
|created|作成日時|DateTime|
|current_count|処理件数|Integer|
|deleted|削除日時|DateTime|
|interrupt|中止命令|String|
|name|タスク名|String|
|revision_id|Revision|Object|
|segment|セグメント|String|
|site_id|サイト|Object|
|started|開始日時|DateTime|
|state|ステータス|String|
|text_index|全文検索インデックス(未使用)|String|
|total_count|全体件数|Integer|
|updated|更新日時|DateTime|
|user_id|ユーザー|Object|
|node_id|Node|Object|
|target_node_name|複製先フォルダー名|String|
|db_id|Db|Object|
|import_manually|Import manually|Integer|
|import_url|Import url|String|
|file_ids|File ids|SS::Extensions::ObjectIds|
|page_id|Page|Object|
|group_id|Group|Object|
|zipped_file_ids|Zipped file ids|SS::Extensions::ObjectIds|
|active_job|Active job|Hash|
|app_type|App type|String|
|args|Args|Array|
|class_name|Class name|String|
|pool|Pool|String|
|priority|Priority|Integer|
|results|Results|Hash|
|copy_contents|複製する項目|SS::Extensions::Words|
|source_site_id|複製するサイト|Object|
|target_host_domains|ドメイン|SS::Extensions::Words|
|target_host_host|ホスト名|String|
|target_host_name|サイト名|String|
|target_host_parent_id|親サイト|Object|
|target_host_subdir|サブディレクトリ|String|

## ss_user_group_histories / 異動履歴

|Field|Description|Type|
|-----|-----------|----|
|_id|ID|Integer|
|cms_site_id|CMSサイト|Integer|
|created|異動日時|DateTime|
|dec_group_ids|Dec group ids|SS::Extensions::ObjectIds|
|dec_group_names|Dec group names|Array|
|dec_groups_hash|Dec groups hash|Hash|
|deleted|削除日時|DateTime|
|group_ids|グループ|SS::Extensions::ObjectIds|
|group_names|Group names|Array|
|groups_hash|Groups hash|Hash|
|gws_site_id|GWSサイト|Integer|
|inc_group_ids|Inc group ids|SS::Extensions::ObjectIds|
|inc_group_names|Inc group names|Array|
|inc_groups_hash|Inc groups hash|Hash|
|text_index|全文検索インデックス(未使用)|String|
|updated|更新日時|DateTime|
|user_id|ユーザー|Object|

## ss_user_occupations / 職種

|Field|Description|Type|
|-----|-----------|----|
|_id|ID|Integer|
|activation_date|有効期限（開始）|DateTime|
|code|職種コード|String|
|created|作成日時|DateTime|
|deleted|削除日時|DateTime|
|expiration_date|有効期限（終了）|DateTime|
|group_id|グループ|Object|
|name|職種名|String|
|order|並び順|Integer|
|remark|備考|String|
|text_index|全文検索インデックス(未使用)|String|
|updated|更新日時|DateTime|

## ss_user_titles / 役職

|Field|Description|Type|
|-----|-----------|----|
|_id|ID|Integer|
|activation_date|有効期限（開始）|DateTime|
|code|役職コード|String|
|created|作成日時|DateTime|
|deleted|削除日時|DateTime|
|expiration_date|有効期限（終了）|DateTime|
|group_id|グループ|Object|
|name|役職名|String|
|order|並び順|Integer|
|presence_editable_title_ids|編集可能な役職|SS::Extensions::ObjectIds|
|remark|備考|String|
|text_index|全文検索インデックス(未使用)|String|
|updated|更新日時|DateTime|

## ss_users / ユーザー

|Field|Description|Type|
|-----|-----------|----|
|_id|ID|Integer|
|account_expiration_date|有効期限（終了）|DateTime|
|account_start_date|有効期限（開始）|DateTime|
|cms_role_ids|ロール|SS::Extensions::ObjectIds|
|created|作成日時|DateTime|
|deleted|削除日時|DateTime|
|deletion_lock_state|削除状態|String|
|email|メールアドレス|String|
|group_ids|グループ|SS::Extensions::ObjectIds|
|imap_default_index|IMAP/既定アカウント|Integer|
|imap_settings|IMAP/ユーザー設定|Webmail::Extensions::ImapSettings|
|initial_password_warning|初期パスワード警告|Integer|
|kana|カナ|String|
|lang|言語|String|
|last_loggedin|最終ログイン日時|DateTime|
|ldap_dn|DN|String|
|ldap_import_id|Ldap import|Integer|
|lock_state|利用状態|String|
|login_roles|ログイン種別|Array|
|name|氏名|String|
|occupation_ids|職種|SS::Extensions::ObjectIds|
|occupation_orders|職種並び順|Hash|
|organization_id|所属組織|Object|
|organization_uid|職員番号|String|
|password|パスワード|String|
|password_changed_at|Password changed at|DateTime|
|remark|備考|String|
|restriction|利用制限|String|
|session_lifetime|セッション寿命|Integer|
|switch_user_id|切り替えユーザー|Object|
|sys_role_ids|SYSロール|SS::Extensions::ObjectIds|
|tel|電話番号|String|
|tel_ext|内線番号|String|
|text_index|全文検索インデックス(未使用)|String|
|timezone|タイムゾーン|String|
|title_ids|役職|SS::Extensions::ObjectIds|
|title_orders|役職並び順|Hash|
|type|ユーザータイプ|String|
|uid|ユーザーID|String|
|updated|更新日時|DateTime|
|charge_address|担当住所|String|
|charge_name|担当名|String|
|charge_tel|担当電話|String|
|divide_duties|分掌事務|String|
|gws_default_group_ids|グループ（既定）|Hash|
|gws_main_group_ids|グループ（主）|Hash|
|gws_memo_message_sort|メッセージ並び順|Hash|
|gws_role_ids|ロール|SS::Extensions::ObjectIds|
|gws_superior_group_ids|上位グループ|Hash|
|gws_superior_user_ids|上位ユーザー|Hash|
|notice_affair_email_user_setting|Notice affair email user setting|String|
|notice_affair_user_setting|庶務事務|String|
|notice_announcement_email_user_setting|お知らせ通知メール転送|String|
|notice_announcement_user_setting|お知らせ|String|
|notice_board_email_user_setting|掲示板通知メール転送|String|
|notice_board_user_setting|掲示板|String|
|notice_circular_email_user_setting|回覧板通知メール転送|String|
|notice_circular_user_setting|回覧板|String|
|notice_discussion_email_user_setting|電子会議室通知メール転送|String|
|notice_discussion_user_setting|電子会議室|String|
|notice_faq_email_user_setting|よくある質問通知メール転送|String|
|notice_faq_user_setting|よくある質問|String|
|notice_monitor_email_user_setting|照会・回答通知メール転送|String|
|notice_monitor_user_setting|照会・回答|String|
|notice_qna_email_user_setting|Q&A通知メール転送|String|
|notice_qna_user_setting|Q&A|String|
|notice_report_email_user_setting|レポート通知メール転送|String|
|notice_report_user_setting|レポート|String|
|notice_schedule_email_user_setting|スケジュール通知メール転送|String|
|notice_schedule_user_setting|スケジュール|String|
|notice_survey_email_user_setting|アンケート通知メール転送|String|
|notice_survey_user_setting|アンケート|String|
|notice_todo_email_user_setting|ToDo通知メール転送|String|
|notice_todo_user_setting|ToDo|String|
|notice_workflow_email_user_setting|ワークフロー通知メール転送|String|
|notice_workflow_user_setting|ワークフロー|String|
|notice_workload_email_user_setting|業務見える化通知メール転送|String|
|notice_workload_user_setting|業務見える化|String|
|readable_custom_group_ids|閲覧カスタムグループ|SS::Extensions::ObjectIds|
|readable_custom_groups_hash|閲覧カスタムグループ(ハッシュ)|Hash|
|readable_group_ids|閲覧グループ|SS::Extensions::ObjectIds|
|readable_groups_hash|閲覧グループ(ハッシュ)|Hash|
|readable_member_ids|閲覧ユーザー|SS::Extensions::ObjectIds|
|readable_members_hash|閲覧ユーザー(ハッシュ)|Hash|
|readable_setting_range|公開範囲|String|
|schedule_tabs_custom_group_ids|タブ表示/カスタムグループ|SS::Extensions::ObjectIds|
|schedule_tabs_group_ids|タブ表示/グループ|SS::Extensions::ObjectIds|
|send_notice_mail_addresses|転送先メールアドレス|SS::Extensions::Words|
|staff_address_uid|宛名番号|String|
|staff_category|職員区分|String|
|webmail_role_ids|ロール|SS::Extensions::ObjectIds|
|webmail_message_sort|Webmail message sort|Hash|

## sys_auth_open_id_connect_json_web_keys

|Field|Description|Type|
|-----|-----------|----|
|_id|ID|BSON::ObjectId|
|alg|Alg|String|
|created|作成日時|DateTime|
|deleted|削除日時|DateTime|
|kid|Kid|String|
|kty|Kty|String|
|others|Others|Hash|
|text_index|全文検索インデックス(未使用)|String|
|updated|更新日時|DateTime|

## sys_auth_settings

|Field|Description|Type|
|-----|-----------|----|
|_id|ID|BSON::ObjectId|
|created|作成日時|DateTime|
|deleted|削除日時|DateTime|
|form_auth|フォーム認証|String|
|form_key|フォーム認証利用時のキー|String|
|form_password|フォーム認証利用時のパスワード|String|
|text_index|全文検索インデックス(未使用)|String|
|updated|更新日時|DateTime|

## sys_mail_logs / メールログ

|Field|Description|Type|
|-----|-----------|----|
|_id|ID|BSON::ObjectId|
|bcc|Bcc|String|
|cc|Cc|String|
|created|作成日時|DateTime|
|date|Date|DateTime|
|deleted|削除日時|DateTime|
|error|エラー|String|
|from|差出人|String|
|mail|内容|String|
|mailer|Mailer|String|
|subject|件名|String|
|text_index|全文検索インデックス(未使用)|String|
|to|宛先|String|
|updated|更新日時|DateTime|

## sys_notices / システムのお知らせ

|Field|Description|Type|
|-----|-----------|----|
|_id|ID|Integer|
|close_date|公開終了日時(予約)|DateTime|
|created|作成日時|DateTime|
|deleted|削除日時|DateTime|
|html|本文|String|
|markdown|本文（Markdown）|String|
|name|お知らせ見出し|String|
|notice_severity|種別|String|
|notice_target|表示場所|Array|
|release_date|公開開始日時(予約)|DateTime|
|released|公開日時|DateTime|
|state|ステータス|String|
|text_index|全文検索インデックス(未使用)|String|
|updated|更新日時|DateTime|
|user_id|ユーザー|Object|

## sys_roles / ロール

|Field|Description|Type|
|-----|-----------|----|
|_id|ID|Integer|
|created|作成日時|DateTime|
|deleted|削除日時|DateTime|
|name|ロール名|String|
|permissions|権限設定|SS::Extensions::Words|
|text_index|全文検索インデックス(未使用)|String|
|updated|更新日時|DateTime|
|user_id|ユーザー|Object|

## sys_settings / システム設定

|Field|Description|Type|
|-----|-----------|----|
|_id|ID|BSON::ObjectId|
|created|作成日時|DateTime|
|deleted|削除日時|DateTime|
|file_ids|File ids|SS::Extensions::ObjectIds|
|menu_connection_state|接続情報|String|
|menu_file_state|ファイル|String|
|password_limit_days|有効日数|Integer|
|password_limit_use|有効日数の使用|String|
|password_min_change_char_count|相違数|Integer|
|password_min_change_char_use|相違数の使用|String|
|password_min_digit_length|数字|Integer|
|password_min_digit_use|数字の最低文字数の使用|String|
|password_min_downcase_length|英小文字|Integer|
|password_min_downcase_use|英小文字の最低文字数の使用|String|
|password_min_length|最低文字数|Integer|
|password_min_symbol_length|記号|Integer|
|password_min_symbol_use|記号の最低文字数の使用|String|
|password_min_upcase_length|英大文字|Integer|
|password_min_upcase_use|英大文字の最低文字数の使用|String|
|password_min_use|最低文字数の使用|String|
|password_prohibited_char|使用禁止文字|String|
|password_prohibited_char_use|使用禁止文字の使用|String|
|password_warning_days|有効期限切れ警告|Integer|
|password_warning_use|有効期限切れ警告の使用|String|
|text_index|全文検索インデックス(未使用)|String|
|time|画像切り替え時間|Integer|
|updated|更新日時|DateTime|
|width|横幅|Integer|

## translate_langs

|Field|Description|Type|
|-----|-----------|----|
|_id|ID|Integer|
|accept_languages|Accept-Language|SS::Extensions::Lines|
|code|言語コード|String|
|created|作成日時|DateTime|
|deleted|削除日時|DateTime|
|google_translation_code|Google API|String|
|microsoft_translator_text_code|Microsoft API|String|
|mock_code|開発用API|String|
|name|名称|String|
|site_id|サイト|Object|
|text_index|全文検索インデックス(未使用)|String|
|updated|更新日時|DateTime|

## translate_text_caches

|Field|Description|Type|
|-----|-----------|----|
|_id|ID|BSON::ObjectId|
|api|API|String|
|created|作成日時|DateTime|
|deleted|削除日時|DateTime|
|hexdigest|Hexdigest|String|
|original_text|翻訳前テキスト|String|
|site_id|サイト|Object|
|source|翻訳前言語コード|String|
|target|翻訳先言語コード|String|
|text|翻訳先テキスト|String|
|text_index|全文検索インデックス(未使用)|String|
|update_state|ステータス|String|
|updated|更新日時|DateTime|

## uploader_job_files

|Field|Description|Type|
|-----|-----------|----|
|_id|ID|Integer|
|created|作成日時|DateTime|
|deleted|削除日時|DateTime|
|job_name|Job name|String|
|job_wait|Job wait|Integer|
|path|Path|String|
|site_id|Site|Object|
|text_index|全文検索インデックス(未使用)|String|
|updated|更新日時|DateTime|
|user_id|ユーザー|Object|

## voice_files / 読み上げ音声

|Field|Description|Type|
|-----|-----------|----|
|_id|ID|BSON::ObjectId|
|age|Age|Integer|
|created|作成日時|DateTime|
|deleted|削除日時|DateTime|
|error|エラー|String|
|has_error|Has error|Integer|
|lock_until|ロック期限日時|DateTime|
|page_identity|Page identity|String|
|path|Path|String|
|site_id|サイト|Object|
|text_index|全文検索インデックス(未使用)|String|
|updated|作成日時|DateTime|
|url|URL|String|

## webmail_address_groups / 個人アドレス帳/グループ

|Field|Description|Type|
|-----|-----------|----|
|_id|ID|Integer|
|created|作成日時|DateTime|
|deleted|削除日時|DateTime|
|name|グループ名|String|
|order|並び順|Integer|
|text_index|全文検索インデックス(未使用)|String|
|updated|更新日時|DateTime|
|user_id|ユーザー|Object|

## webmail_addresses / 個人アドレス帳

|Field|Description|Type|
|-----|-----------|----|
|_id|ID|BSON::ObjectId|
|address_group_id|グループ名|Object|
|company|会社|String|
|created|作成日時|DateTime|
|deleted|削除日時|DateTime|
|email|メールアドレス|String|
|home_city|市区町村（自宅）|String|
|home_fax|ファックス番号（自宅）|String|
|home_postal_code|郵便番号（自宅）|String|
|home_prefecture|都道府県（自宅）|String|
|home_street_address|番地（自宅）|String|
|home_tel|電話番号（自宅）|String|
|kana|カナ|String|
|member_id|ユーザー|Object|
|memo|メモ|String|
|name|氏名|String|
|office_city|市区町村（勤務先）|String|
|office_fax|ファックス番号（勤務先）|String|
|office_postal_code|郵便番号（勤務先）|String|
|office_prefecture|都道府県（勤務先）|String|
|office_street_address|番地（勤務先）|String|
|office_tel|電話番号（勤務先）|String|
|personal_webpage|WEBページ|String|
|tel|携帯電話番号|String|
|text_index|全文検索インデックス(未使用)|String|
|title|役職|String|
|updated|更新日時|DateTime|
|user_id|ユーザー|Object|

## webmail_filters / フィルター

|Field|Description|Type|
|-----|-----------|----|
|_id|ID|BSON::ObjectId|
|account|Account|String|
|action|アクション|String|
|conditions|検索条件|Array|
|conjunction|検索条件の接続|String|
|created|作成日時|DateTime|
|deleted|削除日時|DateTime|
|filter_error_at|エラー日時|DateTime|
|filter_errors|エラー内容|Array|
|host|Host|String|
|mailbox|フォルダー|String|
|name|フィルター名|String|
|order|並び順|Integer|
|state|ステータス|String|
|text_index|全文検索インデックス(未使用)|String|
|updated|更新日時|DateTime|
|user_id|ユーザー|Object|

## webmail_histories / 操作履歴

|Field|Description|Type|
|-----|-----------|----|
|_id|ID|Integer|
|action|アクション|String|
|controller|コントローラー|String|
|created|変更日時|DateTime|
|deleted|削除日時|DateTime|
|item_id|項目ID|String|
|job|ジョブ|String|
|job_name|ジョブ名|String|
|message|メッセージ|String|
|mode|区分|String|
|model|モデル|String|
|model_name|モデル名|String|
|name|名称|String|
|path|URL|String|
|request_id|リクエストID|String|
|session_id|セッションID|String|
|severity|重要度|String|
|text_index|全文検索インデックス(未使用)|String|
|updated|更新日時|DateTime|
|updated_field_names|変更箇所|Array|
|updated_fields|変更箇所|Array|
|user_id|User|Object|
|user_name|ユーザー|String|
|user_uid|User uid|String|

## webmail_mailboxes / フォルダー

|Field|Description|Type|
|-----|-----------|----|
|_id|ID|BSON::ObjectId|
|account|Account|String|
|attr|Attr|Array|
|created|作成日時|DateTime|
|deleted|削除日時|DateTime|
|delim|Delim|String|
|depth|Depth|Integer|
|host|Host|String|
|name|フォルダー名|String|
|order|Order|Integer|
|original_name|フォルダー名(UTF-7)|String|
|text_index|全文検索インデックス(未使用)|String|
|uidnext|Uidnext|Integer|
|unseen|Unseen|Integer|
|updated|更新日時|DateTime|
|user_id|ユーザー|Object|

## webmail_mails / メール

|Field|Description|Type|
|-----|-----------|----|
|_id|ID|BSON::ObjectId|
|account|Account|String|
|bcc|BCC|Array|
|cc|CC|Array|
|content_type|Content type|String|
|created|作成日時|DateTime|
|date|日付|DateTime|
|deleted|削除日時|DateTime|
|disposition_notification_to|Disposition notification to|Array|
|file_ids|File ids|SS::Extensions::ObjectIds|
|from|差出人|Array|
|has_attachment|Has attachment|Mongoid::Boolean|
|host|Host|String|
|in_reply_to|返信先|String|
|internal_date|送信日時|DateTime|
|mailbox|Mailbox|String|
|message_id|Message|String|
|references|References|SS::Extensions::Words|
|reply_to|返信先|Array|
|sender|差出人|String|
|size|サイズ|Integer|
|subject|件名|String|
|text_index|全文検索インデックス(未使用)|String|
|to|宛先|Array|
|uid|Uid|Integer|
|updated|更新日時|DateTime|
|user_id|ユーザー|Object|

## webmail_quota / 容量

|Field|Description|Type|
|-----|-----------|----|
|_id|ID|BSON::ObjectId|
|account|Account|String|
|created|作成日時|DateTime|
|deleted|削除日時|DateTime|
|host|Host|String|
|mailbox|Mailbox|String|
|quota|Quota|Integer|
|reloaded|Reloaded|DateTime|
|text_index|全文検索インデックス(未使用)|String|
|threshold_mb|Threshold mb|Integer|
|updated|更新日時|DateTime|
|usage|Usage|Integer|

## webmail_roles / 権限/ロール

|Field|Description|Type|
|-----|-----------|----|
|_id|ID|Integer|
|created|作成日時|DateTime|
|deleted|削除日時|DateTime|
|name|ロール名|String|
|permission_level|権限レベル|Integer|
|permissions|権限設定|SS::Extensions::Words|
|text_index|全文検索インデックス(未使用)|String|
|updated|更新日時|DateTime|
|user_id|ユーザー|Object|

## webmail_signatures / 署名

|Field|Description|Type|
|-----|-----------|----|
|_id|ID|BSON::ObjectId|
|account|Account|String|
|created|作成日時|DateTime|
|default|既定の署名|String|
|deleted|削除日時|DateTime|
|host|Host|String|
|name|名称|String|
|text|本文|String|
|text_index|全文検索インデックス(未使用)|String|
|updated|更新日時|DateTime|
|user_id|ユーザー|Object|

## workflow_routes / 承認経路

|Field|Description|Type|
|-----|-----------|----|
|_id|ID|Integer|
|approver_attachment_uses|承認者によるファイル追加|Array|
|approvers|承認者|Workflow::Extensions::Route::Approvers|
|circulation_attachment_uses|回覧者によるファイル追加|Array|
|circulations|回覧者|Workflow::Extensions::Route::Circulations|
|created|作成日時|DateTime|
|custom_group_ids|管理カスタムグループ|SS::Extensions::ObjectIds|
|custom_groups_hash|管理カスタムグループ(ハッシュ)|Hash|
|deleted|削除日時|DateTime|
|group_ids|管理グループ|SS::Extensions::ObjectIds|
|groups_hash|管理グループ(ハッシュ)|Hash|
|name|名前|String|
|on_remand|差し戻し時|String|
|permission_level|権限レベル|Integer|
|pull_up|引き上げ承認|String|
|required_counts|必要承認数|Workflow::Extensions::Route::RequiredCounts|
|text_index|全文検索インデックス(未使用)|String|
|updated|更新日時|DateTime|
|user_ids|管理ユーザー|SS::Extensions::ObjectIds|
|users_hash|管理ユーザー(ハッシュ)|Hash|
