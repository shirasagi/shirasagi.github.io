---
layout: top
title: SHIRASAGI 開発マニュアル
---

## リポジトリ(GitHub)

- master
  - [development](https://github.com/shirasagi/shirasagi)
- stable
  - [release](https://github.com/shirasagi/shirasagi/tree/stable)

## インストール手順

- 自動インストール
  - [Vagrant](installation/vagrant.html)
  - [install.sh](installation/installsh.html)
- 手動インストール
  - [CentOS](installation/manual.html)
  - [Ubuntu 16.04](installation/ubuntu.html)
  - [Linux Mint 19.1](installation/linux-mint-19.1.html)
- [Nginx のインストール](installation/nginx.html)
- [Apache のインストール](installation/apache.html)
- [Unicorn のインストール](installation/unicorn.html)
- [Fuseki のインストール](installation/fuseki.html) （オープンデータ利用時）
- [Elasticsearch と Fess のインストール](installation/elasticsearch_and_fess.html) （GWSの全文検索、サイト内検索利用時）

## 利用手順

- [グループウェアの始め方](start/gws.html)
- [ウェブメールの始め方](start/webmail.html)

## アップデート手順

- [Ruby の更新](updation/ruby.html)
- [MongoDB の更新](updation/mongodb.html)
- [SHIRASAGI の更新](updation/manual.html)
  - [オープンデータのレポート機能の更新](updation/opendata_report.html)
- [全文検索インデックスの更新](updation/elasticsearch_index.html)
- [バックアップとリストア](updation/backup.html)

## 設定

- [環境設定](settings/env.html)
- [管理コマンド](settings/cmd.html)
- [非同期実行 / バッググラウンドジョブ](settings/job.html)
- [定期実行](settings/cron.html)
- [メール送信](settings/mail.html)
- [セッションタイムアウト](settings/session.html)
- [セッションの secure 化](settings/secure_session.html)
- [OEM開発](settings/oem.html)
- [OAuth 認証](settings/oauth.html) （オープンデータ利用時）
- [ファイルサイズ制限](settings/file_size_limit.html)
- [リンクチェック設定](settings/check_links.html)
- [サブディレクトリ設定](settings/subdir.html)
- [OGP と Twitter Card 設定](settings/ogp.html)
- [SNS投稿連携](settings/sns_poster.html)
- [気象庁防災情報XML連携（PULL型）](settings/jmaxml_pull.html)
- [分散構成(同期/非レプリカセット)](settings/repl.html)
- [SAML 認証の疎通確認](settings/saml_sampling.html)
- [Shibboleth 認証](settings/shibboleth.html)
- [メール取込](settings/mail_page.html)
- [Basic 認証環境での設定](settings/basic_auth.html)
- [日本語ファイル名によるダウンロード](settings/japanese_filename.html)
- [miChecker との連携](settings/michecker_integration.html)
- [信頼できる URL の設定](settings/trusted_url.html)

## 機能

- [ログイン](features/login.html)
- [端末別表示](features/cms/mobile.html)
- [ふりがな](features/kana.html)
- [音声読み上げ](features/voice.html)
- [組織変更](features/chorg.html)
- [閲覧履歴とレコメンド](features/recommend.html)
- [サイトのデータ移行](features/site_export.html)
- [Liquid 形式レイアウト](features/liquid/index.html)
- [条件分岐構文](features/conditional_tag.html)
- [外国語自動翻訳機能](features/translate.html)

## ソースコード

- [Gems](source_codes/gems.html)
- [DB定義](source_codes/db.html)

## トラブルシューティング

- [インストール](trouble-shootings/installation.html)
- [画像認証](trouble-shootings/captcha.html)

## シラサギ公式サイトの FAQ

CKEditor のカスタマイズ方法や音声読み上げのスキップ方法など、このサイト上で解説していない情報がシラサギ公式サイトの FAQ にはあります。シラサギ公式サイトの FAQ も確認してみてください。

- [シラサギ公式サイトの FAQ](https://www.ss-proj.org/faq/docs/)

## 開発資料

- [ディレクトリ構成](devel/directories.html)
- [JavaScript構成](devel/javascripts.html)
- [システム設定 (config)](devel/config.html)
- [モデルの基底モジュール (SS::Document)](devel/ss_document.html)
- [モデルアドオン設計](devel/model_addon.html)
- [権限/ロール](devel/role.html)
- [CMSの主要モデル](devel/cms_models.html)
- [公開系の開発](devel/cms_public.html)
- [ファイル機能（SS::File）](devel/ss_file.html)
- [モーダル検索UI (SearchUI)](devel/search_ui.html)
- [リストノード/パーツとループHTML変数の定義と拡張](devel/loop.html)
- [ループHTML変数の一覧と使用例(template_variable_handler)](devel/template_variable_handler/template_variable_handler.html)
- [template_variable_handlerを使用しないテンプレート](devel/template_variable_handler/other_template_variable.html)
- [アクセシビリティチェック機能](devel/accessibility.html)
- [Jobの開発](devel/job.html)
- [Rspec](devel/rspec/rspec.html)
- [Rspecの運用](devel/rspec.html)
- [Rspec w/ Google Chrome](devel/rspec_google_chrome.html)
- [ウェブメール開発環境の構築](devel/webmail.html)
- [Docker を用いたウェブメールテスト環境の構築](devel/webmail_test_with_docker.html)
- [IMAP のデバッグ](devel/debug_imap.html)
- [ブランチ運用ルール](devel/branch_naming.html)
