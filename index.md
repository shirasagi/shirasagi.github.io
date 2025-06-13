---
layout: top
title: SHIRASAGI 開発マニュアル
---

## リポジトリ

- GitHub
  - [shirasagi/shirasagi](https://github.com/shirasagi/shirasagi)
  - [ブランチ運用ルール](devel/branch_naming.html)

## インストール手順

- 自動インストール
  - [Vagrant](installation/vagrant.html)
  - [install.sh](installation/installsh.html)
  - [devcontainer (開発・評価用)](installation/devcontainer.html)
- 手動インストール
  - [AlmaLinux](installation/almalinux.html)
  - [Ubuntu](installation/ubuntu.html)
  - [OracleLinux](installation/oraclelinux.html)
- ミドルウェア
  - [Unicorn](installation/unicorn.html)
  - [Nginx](installation/nginx.html)
  - [Apache](installation/apache.html)
  - [Fuseki](installation/fuseki.html) （オープンデータ利用時）
  - [Elasticsearch & Fess](installation/elasticsearch_and_fess.html) （GWS の全文検索、CMS のサイト内検索利用時）
  - [MongoDB 推奨設定](installation/mongodb-settings.html)

## アップデート手順

- [バックアップとリストア](updation/backup.html)
- [Ruby](updation/ruby.html)
- [MongoDB](updation/mongodb.html)
  - [v4.4 to v6.0](updation/v4.4tov6.0.html)
  - [v6.0 to v7.0](updation/v6.0tov7.0.html)
- [SHIRASAGI](updation/manual.html)
  - [オープンデータのレポート機能](updation/opendata_report.html)
  - [全文検索インデックス](updation/elasticsearch_index.html)

## 利用手順

- [グループウェアの始め方](start/gws.html)
- [グループウェアの新しいテナントの作成方法](start/gws_new_tenant.html)
- [ウェブメールの始め方](start/webmail.html)

## 機能と設定

- システム全般

  - [管理コマンド一覧](settings/cmd.html)
  - [環境設定](settings/env.html)
    - [OEM 開発](settings/oem.html)
  - [定期実行](settings/cron.html)
  - [非同期実行 / バッググラウンドジョブ](settings/job.html)
  - [セッションタイムアウト](settings/session.html)
  - [セッションの secure 化](settings/secure_session.html)
  - [分散構成(同期/非レプリカセット)](settings/repl.html)
  - [メール送信 (SMTP)](settings/mail.html)
  - [ファイルサイズ制限](settings/file_size_limit.html)
  - [日本語ファイル名のダウンロード](settings/japanese_filename.html)
  - [アップロード制限（無害化）](settings/upload_policy.html)
  - [信頼できる URL の設定](settings/trusted_url.html)
  - [日英（多言語・バイリンガル）対応](features/i18n.html)
  - [OAuth 2.0 IdP](settings/oauth2_idp.html)
  - [ユーザータイプ（SNSユーザー、LDAPユーザー、SSOユーザー）](settings/user_type.html)
  - [接続元IPアドレス](settings/remote_addr.html)
  - [コントローラーの性能計測と監視（json形式アクセスログ）](settings/controller_performance.html)

- 認証

  - [ログイン](features/login.html)
  - [OAuth 認証](settings/oauth.html)
  - [SAML 認証の疎通確認](settings/saml_sampling.html)
  - [Shibboleth 認証](settings/shibboleth.html)

- CMS

  - [Basic 認証環境での設定](settings/basic_auth.html)
  - [サブディレクトリ設定](settings/subdir.html)
  - [リンクチェック設定](settings/check_links.html)
  - [端末別表示](features/cms/mobile.html)
  - [ふりがな](features/kana.html)
  - [音声読み上げ](features/voice.html)
  - [Liquid 形式レイアウト](features/liquid/index.html)
  - [条件分岐構文](features/conditional_tag.html)
  - [閲覧履歴とレコメンド](features/recommend.html)
  - [メール取込](settings/mail_page.html)
  - [リンクページ](features/redirect_link.html)
  - [miChecker](settings/michecker_integration.html)
  - [組織変更](features/chorg.html)
  - [サイトのデータ移行](features/site_export.html)
  - [他サイト/サブサイトのページ・フォルダー参照](features/partner_site.html)
  - [特定フォルダー・パーツの無効化](features/disable_route.html)
  - [不適切な公開 HTML 削除](features/remove_improper_htmls.html)
  - [サイト内検索](features/cms/elasticsearch.html)
  - [高度なスライダーの利用](features/cms/advanced_slider.html)

- オープンデータ

  - [ハーベスト機能](settings/opendata/harvest.html)

- グループウェア

  - [全文検索対象機能](features/gws/indexing.html)
  - [閲覧権限の公開範囲などの既定値](features/gws/default_readable_setting.html)
  - [Q&A](features/gws/qa.html)

- CMS 外部連携

  - [外国語自動翻訳機能](features/translate.html)
  - [OGP と Twitter Card 設定](settings/ogp.html)
  - [SNS 投稿連携](settings/sns_poster.html)
  - [LINE 連携](settings/line/index.html)
  - [気象庁防災情報 XML 連携（PULL 型）](settings/jmaxml_pull.html)
  - [5374 連携](settings/k5374.html)

## サイト構築資料

- [マルチテナントサイトの構築について](site_construction/multi-tenant.html)

## 開発資料

- ソースコード
  - [Gems](source_codes/gems.html)
  - [DB 定義](source_codes/db.html)
- 基本情報
  - [ディレクトリ構成](devel/directories.html)
  - [JavaScript 構成](devel/javascripts.html)
  - [システム設定 (config)](devel/config.html)
  - [モデルアドオン設計](devel/model_addon.html)
  - [権限/ロール](devel/role.html)
  - [モデルの基底モジュール (SS::Document)](devel/ss_document.html)
  - [ファイル機能（SS::File）](devel/ss_file.html)
  - [モーダル検索 UI (SearchUI)](devel/search_ui.html)
  - [Job の開発](devel/job.html)
  - [無害化処理 (サニタイザー)](devel/upload_policy.html)
  - [ダブルクリック防御](devel/double_click_guard.html)
  - [Guard](devel/guard.html)
- CMS
  - [CMS の主要モデル](devel/cms_models.html)
  - [公開系の開発](devel/cms_public.html)
  - [リストノード/パーツとループ HTML 変数の定義と拡張](devel/loop.html)
  - [ループ HTML 変数の一覧と使用例(template_variable_handler)](devel/template_variable_handler/template_variable_handler.html)
  - [template_variable_handler を使用しないテンプレート](devel/template_variable_handler/other_template_variable.html)
  - [アクセシビリティチェック機能](devel/accessibility.html)
- Web メール
  - [ウェブメール開発環境の構築](devel/webmail.html)
  - [Docker を用いたウェブメールテスト環境の構築](devel/webmail_test_with_docker.html)
  - [IMAP のデバッグ](devel/debug_imap.html)
- テスト
  - [Rspec](devel/rspec/rspec.html)
  - [Rspec の運用](devel/rspec.html)
  - [Rspec w/ Google Chrome](devel/rspec_google_chrome.html)
  - [Rspec実行時に指定できる環境変数](devel/run_rspec_with_env.html)
  - [全文検索機能の開発とテスト](devel/rspec_elasticsearch.html)
- [Windows11でのシラサギ開発](devel/on_win11.html)

## トラブルシューティング

- [インストール](trouble-shootings/installation.html)
- [画像認証](trouble-shootings/captcha.html)
- [メール送信](trouble-shootings/email.html)
- [シラサギが過負荷になる（音声読み上げが原因の場合）](trouble-shootings/voice.html)
- [Rails 6.1 への更新と Gem の最新化](trouble-shootings/update_rails6.html)
- [MongoDB 6.0 / Mongoid 8.0 への更新](trouble-shootings/update_mongodb6.html)
- [DEPRECATION WARNING: Your secret_key_base is ...](trouble-shootings/secret_key_base.html)

<!--
## 試験中の機能

- CMS
  - [不適切な公開 HTML 削除](experimental/remove_improper_htmls.html)
-->

## シラサギ公式サイトの FAQ

CKEditor のカスタマイズ方法や音声読み上げのスキップ方法など、このサイト上で解説していない情報がシラサギ公式サイトの FAQ にはあります。シラサギ公式サイトの FAQ も確認してみてください。

- [シラサギ公式サイトの FAQ](https://www.ss-proj.org/faq/docs/)
