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
- 手動インストール
  - [CentOS](installation/manual.html)
  - [Ubuntu](installation/ubuntu.html)
  - [Linux Mint 19.1](installation/linux-mint-19.1.html)
- ミドルウェア
  - [Unicorn](installation/unicorn.html)
  - [Nginx](installation/nginx.html)
  - [Apache](installation/apache.html)
  - [Fuseki](installation/fuseki.html) （オープンデータ利用時）
  - [Elasticsearch & Fess](installation/elasticsearch_and_fess.html) （GWSの全文検索、サイト内検索利用時）
  - [MongoDB 推奨設定](installation/mongodb-settings.html)

## アップデート手順

- [バックアップとリストア](updation/backup.html)
- [Ruby](updation/ruby.html)
- [MongoDB](updation/mongodb.html)
- [SHIRASAGI](updation/manual.html)
  - [オープンデータのレポート機能](updation/opendata_report.html)
  - [全文検索インデックス](updation/elasticsearch_index.html)

## 利用手順

- [グループウェアの始め方](start/gws.html)
- [ウェブメールの始め方](start/webmail.html)

## 機能と設定

- システム全般
  - [管理コマンド一覧](settings/cmd.html)
  - [環境設定](settings/env.html)
    - [OEM開発](settings/oem.html)
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

- グループウェア
  - [全文検索対象機能](features/gws/indexing.html)

- CMS 外部連携
  - [外国語自動翻訳機能](features/translate.html)
  - [OGP と Twitter Card 設定](settings/ogp.html)
  - [SNS 投稿連携](settings/sns_poster.html)
  - [LINE 連携](settings/line.html)
  - [気象庁防災情報 XML 連携（PULL型）](settings/jmaxml_pull.html)
  - [5374連携](settings/k5374.html)

## サイト構築資料

- [マルチテナントサイトの構築について](site_construction/multi-tenant.html)

## 開発資料

- ソースコード
  - [Gems](source_codes/gems.html)
  - [DB定義](source_codes/db.html)
- 基本情報
  - [ディレクトリ構成](devel/directories.html)
  - [JavaScript構成](devel/javascripts.html)
  - [システム設定 (config)](devel/config.html)
  - [モデルアドオン設計](devel/model_addon.html)
  - [権限/ロール](devel/role.html)
  - [モデルの基底モジュール (SS::Document)](devel/ss_document.html)
  - [ファイル機能（SS::File）](devel/ss_file.html)
  - [モーダル検索UI (SearchUI)](devel/search_ui.html)
  - [Jobの開発](devel/job.html)
  - [無害化処理 (サニタイザー)](devel/upload_policy.html)
  - [ダブルクリック防御](devel/double_click_guard.html)
  - [Guard](devel/guard.html)
- CMS
  - [CMSの主要モデル](devel/cms_models.html)
  - [公開系の開発](devel/cms_public.html)
  - [リストノード/パーツとループHTML変数の定義と拡張](devel/loop.html)
  - [ループHTML変数の一覧と使用例(template_variable_handler)](devel/template_variable_handler/template_variable_handler.html)
  - [template_variable_handlerを使用しないテンプレート](devel/template_variable_handler/other_template_variable.html)
  - [アクセシビリティチェック機能](devel/accessibility.html)
- Webメール
  - [ウェブメール開発環境の構築](devel/webmail.html)
  - [Docker を用いたウェブメールテスト環境の構築](devel/webmail_test_with_docker.html)
  - [IMAP のデバッグ](devel/debug_imap.html)
- テスト
  - [Rspec](devel/rspec/rspec.html)
  - [Rspecの運用](devel/rspec.html)
  - [Rspec w/ Google Chrome](devel/rspec_google_chrome.html)

## トラブルシューティング

- [インストール](trouble-shootings/installation.html)
- [画像認証](trouble-shootings/captcha.html)
- [シラサギが過負荷になる（音声読み上げが原因の場合）](trouble-shootings/voice.html)
- [Rails 6.1 への更新と Gem の最新化](trouble-shootings/update_rails6.html)

## シラサギ公式サイトの FAQ

CKEditor のカスタマイズ方法や音声読み上げのスキップ方法など、このサイト上で解説していない情報がシラサギ公式サイトの FAQ にはあります。シラサギ公式サイトの FAQ も確認してみてください。

- [シラサギ公式サイトの FAQ](https://www.ss-proj.org/faq/docs/)
