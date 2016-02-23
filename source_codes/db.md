---
layout: default
title: DB定義
---

## 出力コマンド

~~~
$ rake ss:models
~~~

## DB定義

|Collection|Field|Type|Memo|
|---|---|---|---|
|chorg_changesets|_id|Integer|ID|
|(変更内容)|created|DateTime|作成日時|
||updated|DateTime|更新日時|
||text_index|String|Text index|
||revision_id|Object|Revision|
||type|String|種別|
||sources|Array|Sources|
||destinations|Array|Destinations|
|chorg_revisions|_id|Integer|ID|
|(リビジョン)|created|DateTime|作成日時|
||updated|DateTime|更新日時|
||text_index|String|Text index|
||site_id|Object|サイト|
||lock_until|DateTime|Lock until|
||name|String|名前|
||job_ids|Array|Job ids|
|cms_editor_templates|_id|Integer|ID|
|(テンプレート)|created|DateTime|作成日時|
||updated|DateTime|更新日時|
||text_index|String|Text index|
||site_id|Object|サイト|
||html|String|Html|
||thumb_id|Object|サムネイル画像|
||name|String|名前|
||description|String|説明|
||order|Integer|並び順|
|cms_layouts|_id|Integer|ID|
|(レイアウト)|created|DateTime|作成日時|
||updated|DateTime|更新日時|
||text_index|String|Text index|
||user_id|Object|ユーザー|
||site_id|Object|サイト|
||permission_level|Integer|権限レベル|
||group_ids|*ObjectIds|管理グループ|
||state|String|ステータス|
||name|String|レイアウト名|
||filename|String|ファイル名|
||depth|Integer|フォルダ階層|
||order|Integer|並び順|
||released|DateTime|公開日時|
||md5|String|ハッシュ値|
||part_paths|*Words|Part paths|
||css_paths|*Words|Css paths|
||js_paths|*Words|Js paths|
||html|String|HTML|
|cms_members|_id|Integer|ID|
|(メンバー)|created|DateTime|作成日時|
||updated|DateTime|更新日時|
||text_index|String|Text index|
||site_id|Object|サイト|
||name|String|氏名|
||email|String|メールアドレス|
||password|String|Password|
||oauth_type|String|OAuth Type|
||oauth_id|String|OAuth ID|
||oauth_token|String|OAuth トークン|
||last_loggedin|DateTime|Last loggedin|
|cms_nodes|_id|Integer|ID|
|(記事リスト)|created|DateTime|作成日時|
||updated|DateTime|更新日時|
||text_index|String|Text index|
||user_id|Object|ユーザー|
||site_id|Object|サイト|
||permission_level|Integer|権限レベル|
||group_ids|*ObjectIds|管理グループ|
||state|String|ステータス|
||name|String|タイトル|
||filename|String|フォルダー名|
||depth|Integer|フォルダ階層|
||order|Integer|並び順|
||released|DateTime|公開日時|
||md5|String|ハッシュ値|
||layout_id|Object|レイアウト|
||page_layout_id|Object|ページレイアウト|
||st_category_ids|*ObjectIds|St category ids|
||category_ids|*ObjectIds|Category ids|
||service_ids|*ObjectIds|Service ids|
||st_service_ids|*ObjectIds|St service ids|
||location_ids|*ObjectIds|Location ids|
||st_location_ids|*ObjectIds|St location ids|
||route|String|フォルダー属性|
||shortcut|String|ショートカット|
||view_route|String|既定のモジュール|
||keywords|*Words|キーワード|
||description|String|概要|
||summary_html|String|サマリー|
||conditions|*Words|検索条件(URL)|
||sort|String|並び順|
||limit|Integer|表示件数|
||loop_html|String|ループHTML|
||upper_html|String|上部HTML|
||lower_html|String|下部HTML|
||new_days|Integer|NEWマーク期間|
||kana|String|施設名ふりがな|
||postcode|String|郵便番号|
||address|String|住所|
||tel|String|電話番号|
||fax|String|FAX|
||related_url|String|URL|
||additional_info|*AdditionalInfo|追加情報|
||search_html|String|検索HTML|
||map_html|String|地図HTML|
||image_id|Object|Image|
||center_point|*Point|中心座標|
||inquiry_html|String|説明テキスト|
||inquiry_sent_html|String|送信完了テキスト|
||inquiry_results_html|String|集計結果テキスト|
||inquiry_captcha|String|画像認証|
||notice_state|String|通知設定|
||notice_email|String|通知メールアドレス|
||from_name|String|差出人名|
||from_email|String|差出人メールアドレス|
||reply_state|String|返信設定|
||reply_subject|String|返信件名|
||reply_upper_text|String|上部返信テキスト|
||reply_lower_text|String|下部返信テキスト|
||release_date|DateTime|公開開始日|
||close_date|DateTime|公開終了日|
||reception_start_date|DateTime|回答受付開始日|
||reception_close_date|DateTime|回答受付終了日|
||aggregation_state|String|集計設定|
||redirect_url|String|リダイレクトURL|
||form_auth|String|フォーム認証|
||twitter_oauth|String|OAuth 認証|
||twitter_client_id|String|Consumer Key|
||twitter_client_secret|String|Consumer Secret|
||facebook_oauth|String|OAuth 認証|
||facebook_client_id|String|App ID|
||facebook_client_secret|String|App Secret|
||yahoojp_oauth|String|OAuth 認証|
||yahoojp_client_id|String|アプリケーションID|
||yahoojp_client_secret|String|シークレット|
||google_oauth2_oauth|String|OAuth 認証|
||google_oauth2_client_id|String|クライアントID|
||google_oauth2_client_secret|String|クライアントシークレット|
||github_oauth|String|OAuth 認証|
||github_client_id|String|Client ID|
||github_client_secret|String|Client Secret|
||rss_url|String|RSS配信URL|
||rss_max_docs|Integer|最大保存件数|
||rss_refresh_method|String|更新方法|
||urgency_default_layout_id|Object|Urgency default layout|
|cms_pages|_id|Integer|ID|
|(広告バナー)|created|DateTime|作成日時|
||updated|DateTime|更新日時|
||text_index|String|Text index|
||user_id|Object|ユーザー|
||site_id|Object|サイト|
||permission_level|Integer|権限レベル|
||group_ids|*ObjectIds|管理グループ|
||state|String|ステータス|
||name|String|サイト名|
||filename|String|ファイル名|
||depth|Integer|フォルダ階層|
||order|Integer|並び順|
||released|DateTime|公開日時|
||md5|String|ハッシュ値|
||layout_id|Object|レイアウト|
||route|String|ページ属性|
||category_ids|*ObjectIds|カテゴリー|
||release_date|DateTime|公開開始日時(予約)|
||close_date|DateTime|公開終了日時(予約)|
||link_url|String|リンクURL|
||file_id|Object|バナー画像|
||master_id|Object|Master|
||workflow_user_id|Integer|申請者|
||workflow_state|String|承認状態|
||workflow_comment|String|申請コメント|
||workflow_approvers|*WorkflowApprovers|承認者|
||workflow_required_counts|*RequiredCounts|必要承認数|
||keywords|*Words|キーワード|
||description|String|概要|
||summary_html|String|サマリー|
||html|String|本文|
||markdown|String|Markdown|
||file_ids|*ObjectIds|File ids|
||parent_crumb_urls|*Lines|親フォルダー|
||event_name|String|イベントタイトル|
||event_dates|*EventDates|イベント日|
||map_points|*Points|Map points|
||contact_state|String|表示設定|
||contact_charge|String|担当|
||contact_tel|String|電話番号|
||contact_fax|String|ファックス番号|
||contact_email|String|メールアドレス|
||contact_group_id|Object|所属|
||related_page_ids|*ObjectIds|Related page ids|
||schedule|String|日時|
||venue|String|開催場所|
||content|String|内容|
||cost|String|費用|
||related_url|String|URL|
||contact|String|お問い合わせ|
||additional_info|*AdditionalInfo|Additional info|
||text|String|本文（テキスト版）|
||deliver_date|DateTime|配信予約日時|
||test_delivered|DateTime|テスト配信完了日時|
||completed|*Boolean|Completed|
||image_id|Object|Image|
||image_alt|String|ALT属性|
||image_comment|String|説明文|
||image_thumb_width|Integer|幅|
||image_thumb_height|Integer|高さ|
||question|String|質問|
||rss_link|String|ソースURL|
||sitemap_urls|*Lines|URLリスト|
||sitemap_depth|Integer|表示階層数|
||sitemap_page_state|String|ページの表示|
||sitemap_deny_urls|*Lines|除外URL|
|cms_parts|_id|Integer|ID|
|(パーツ)|created|DateTime|作成日時|
||updated|DateTime|更新日時|
||text_index|String|Text index|
||user_id|Object|ユーザー|
||site_id|Object|サイト|
||permission_level|Integer|権限レベル|
||group_ids|*ObjectIds|管理グループ|
||state|String|ステータス|
||name|String|パーツ名|
||filename|String|ファイル名|
||depth|Integer|フォルダ階層|
||order|Integer|並び順|
||released|DateTime|公開日時|
||md5|String|ハッシュ値|
||route|String|パーツ属性|
||mobile_view|String|携帯向け表示|
||ajax_view|String|動的表示|
||link_action|String|リンク動作|
||link_target|String|リンク表示|
||sort|String|並び順|
||upper_html|String|上部HTML|
||lower_html|String|下部HTML|
||conditions|*Words|検索条件(URL)|
||limit|Integer|表示件数|
||loop_html|String|ループHTML|
||new_days|Integer|NEWマーク期間|
||html|String|Html|
||home_label|String|ホームラベル|
|cms_roles|_id|Integer|ID|
|(ロール)|created|DateTime|作成日時|
||updated|DateTime|更新日時|
||text_index|String|Text index|
||user_id|Object|ユーザー|
||name|String|ロール名|
||permissions|*Words|権限設定|
||site_id|Object|サイト|
||permission_level|Integer|権限レベル|
|ezine_columns|_id|Integer|ID|
||created|DateTime|作成日時|
||updated|DateTime|更新日時|
||text_index|String|Text index|
||site_id|Object|サイト|
||node_id|Object|Node|
||input_type|String|入力形式|
||select_options|*Words|選択肢|
||required|String|必須入力|
||additional_attr|String|追加属性|
||state|String|ステータス|
||name|String|項目名|
||html|String|説明テキスト|
||order|Integer|並び順|
|ezine_members|_id|*ObjectId|ID|
||created|DateTime|作成日時|
||updated|DateTime|更新日時|
||text_index|String|Text index|
||user_id|Object|ユーザー|
||site_id|Object|サイト|
||email|String|メールアドレス|
||email_type|String|配信形式|
||state|String|配信状態|
||node_id|Object|Node|
|history_logs|_id|*ObjectId|ID|
|(操作履歴)|created|DateTime|操作日時|
||updated|DateTime|更新日時|
||text_index|String|Text index|
||user_id|Object|ユーザー|
||url|String|Url|
||controller|String|Controller|
||action|String|Action|
||target_id|String|Target|
||target_class|String|Target class|
||site_id|Object|Site|
|job_logs|_id|Integer|ID|
|(ジョブ実行履歴)|created|DateTime|作成日時|
||updated|DateTime|更新日時|
||text_index|String|Text index|
||user_id|Object|ユーザー|
||job_id|Integer|Job|
||state|String|状態|
||started|DateTime|開始日時|
||closed|DateTime|終了日時|
||logs|Array|ログ|
||pool|String|Pool|
||class_name|String|ジョブ名|
||args|Array|パラメータ|
||priority|Integer|Priority|
||at|Integer|At|
||site_id|Object|Site|
|kana_dictionaries|_id|Integer|ID|
|(かな辞書)|created|DateTime|作成日時|
||updated|DateTime|更新日時|
||text_index|String|Text index|
||site_id|Object|サイト|
||name|String|名前|
||body|String|設定|
|ldap_imports|_id|Integer|ID|
|(インポート)|created|DateTime|作成日時|
||updated|DateTime|更新日時|
||text_index|String|Text index|
||site_id|Object|サイト|
||group_count|Integer|グループ数|
||user_count|Integer|ユーザ数|
||ldap|*LdapArray|LDAPインポート結果|
||results|Hash|Results|
|ss_files|_id|Integer|ID|
|(ファイル)|created|DateTime|作成日時|
||updated|DateTime|更新日時|
||text_index|String|Text index|
||user_id|Object|ユーザー|
||model|String|モデル|
||state|String|状態|
||name|String|ファイル名（表示用）|
||filename|String|ファイル名|
||size|Integer|ファイルサイズ|
||content_type|String|Content Type|
||site_id|Object|Site|
||permission_level|Integer|権限レベル|
||group_ids|*ObjectIds|管理グループ|
|ss_groups|_id|Integer|ID|
|(グループ)|created|DateTime|作成日時|
||updated|DateTime|更新日時|
||text_index|String|Text index|
||ldap_dn|String|DN|
||ldap_import_id|Integer|Ldap import|
||name|String|グループ名|
||order|Integer|表示順|
||contact_tel|String|電話番号|
||contact_fax|String|ファックス番号|
||contact_email|String|メールアドレス|
|ss_migrations|_id|*ObjectId|ID|
||version|String|version|
|ss_sites|_id|Integer|ID|
|(サイト)|created|DateTime|作成日時|
||updated|DateTime|更新日時|
||text_index|String|Text index|
||name|String|サイト名|
||host|String|ホスト名|
||domains|*Words|ドメイン|
||group_ids|*ObjectIds|グループ|
||auto_description|String|概要自動設定|
||auto_keywords|String|キーワード自動設定|
||keywords|*Words|追加キーワード|
|ss_tasks|_id|Integer|ID|
||created|DateTime|作成日時|
||updated|DateTime|更新日時|
||text_index|String|Text index|
||user_id|Object|ユーザー|
||name|String|タスク名|
||state|String|ステータス|
||interrupt|String|Interrupt|
||started|DateTime|開始日時|
||closed|DateTime|終了日時|
||total_count|Integer|全体件数|
||current_count|Integer|処理件数|
||logs|Array|Logs|
||pool|String|Pool|
||class_name|String|Class name|
||args|Array|Args|
||priority|Integer|Priority|
||at|Integer|At|
||site_id|Object|Site|
|ss_users|_id|Integer|ID|
|(ユーザー)|created|DateTime|作成日時|
||updated|DateTime|更新日時|
||text_index|String|Text index|
||ldap_dn|String|DN|
||ldap_import_id|Integer|Ldap import|
||name|String|氏名|
||uid|String|ユーザーID|
||email|String|メールアドレス|
||password|String|パスワード|
||type|String|ユーザータイプ|
||login_roles|Array|Login roles|
||last_loggedin|DateTime|Last loggedin|
||group_ids|*ObjectIds|グループ|
||cms_role_ids|*ObjectIds|ロール|
||sys_role_ids|*ObjectIds|ロール|
|sys_roles|_id|Integer|ID|
|(ロール)|created|DateTime|作成日時|
||updated|DateTime|更新日時|
||text_index|String|Text index|
||user_id|Object|ユーザー|
||name|String|ロール名|
||permissions|*Words|権限設定|
|voice_files|_id|*ObjectId|ID|
|(読み上げ音声)|created|DateTime|作成日時|
||updated|DateTime|作成日時|
||text_index|String|Text index|
||site_id|Object|サイト|
||url|String|URL|
||path|String|Path|
||page_identity|String|Page identity|
||lock_until|DateTime|Lock until|
||error|String|エラー|
||has_error|Integer|Has error|
||age|Integer|Age|
