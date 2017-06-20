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

- [自動インストール - Vagrant](installation/vagrant.html)
- [手動インストール - CentOS](installation/manual.html)
- [手動インストール - Ubuntu](installation/ubuntu.html)
- [Nginx のインストール](installation/nginx.html)
- [Apache のインストール](installation/apache.html)
- [Unicorn のインストール](installation/unicorn.html)
- [Fuseki のインストール](installation/fuseki.html) （オープンデータ利用時）

## 利用手順

- [グループウェアの始め方](start/gws.html)
- [ウェブメールの始め方](start/webmail.html)

## アップデート手順

- [Ruby の更新](updation/ruby.html)
- [MongoDB の更新](updation/mongodb.html)
- [SHIRASAGI の更新](updation/manual.html)
- [バックアップとリストア](updation/backup.html)

## 設定

- [環境設定](settings/env.html)
- [管理コマンド](settings/cmd.html)
- [非同期実行 / バッググラウンドジョブ](settings/job.html)
- [定期実行](settings/cron.html)
- [メール送信](settings/mail.html)
- [セッションタイムアウト](settings/session.html)
- [OEM開発](settings/oem.html)
- [OAuth 認証](settings/oauth.html) （オープンデータ利用時）
- [ファイルサイズ制限](settings/file_size_limit.html)
- [サブディレクトリ設定](settings/subdir.html)
- [Twitter, Facebook投稿連携](settings/twitter_facebook.html)
- [気象庁防災情報XML連携](settings/jmaxml.html)

## 機能

- [ログイン](features/login.html)
- [端末別表示](features/cms/mobile.html)
- [ふりがな](features/kana.html)
- [音声読み上げ](features/voice.html)
- [組織変更](features/chorg.html)
- [閲覧履歴とレコメンド](features/recommend.html)

## ソースコード

- [Gems](source_codes/gems.html)
- [DB定義](source_codes/db.html)

## トラブルシューティング

- [インストール](trouble-shootings/installation.html)

## 開発資料

- [ディレクトリ構成](devel/directories.html)
- [システム設定（config）](devel/config.html)
- [公開系の開発](devel/cms_public.html)
- [CMSの主要モデル](devel/cms_models.html)
- [モデルアドオン設計](devel/model_addon.html)
- [Job の開発](devel/job.html)
- [リストノード/パーツとループHTML変数の定義と拡張](devel/loop.html)
- [JavaScript構成](devel/javascripts.html)
- [モーダル検索UI（SearchUI）](devel/search_ui.html)
- [SS::Document - モデルの基底モジュール](devel/ss_document.html)
- [Rspec](devel/rspec/rspec.html)
