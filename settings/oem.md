---
layout: default
title: OEM開発
---

シラサギには OEM 版の開発をサポートする機能がいくつかあります。

## ss.yml

`config/ss.yml`（`config/defaults/ss.yml` をコピーして作成）に次の設定を書くことが出来ます。

- アプリケーション名の設定
- 管理画面で使用する javascript / stylesheets の設定

これらの設定を変更することで、シラサギ本体を修正すること無く、ロゴなどを差し替えることができます。

## ロケール

1.2.0 からの新機能ですが、`config/locales/` 以下のロケールファイルを `config/oem/locales` 以下にコピーし、内容を変更することで、文言などを変更することができます。

### 例: CMSの「コンテンツ」を「ショートカット」へ変更する方法

config/locales/ 以下を「コンテンツ」で検索すると、「コンテンツ」という文言がファイル `config/locales/cms/ja.yml` の `cms.content` という階層に定義されていることが分かります。
そこで、次のような内容を持つ `config/oem/locales/custom.yml` を作成します。

~~~
ja:
  cms:
    content: ショートカット
~~~

`custom.yml` の内容を反映するには、シラサギを再起動する必要があります。

### 例: グループウェアの「全庁」を「全体」へ変更する方法

config/locales/ 以下を「全庁」で検索すると、「全庁」という文言がファイル `config/locales/gws/portal/ja.yml` の `gws/portal.root_portal` と `gws/portal.tabs.root_portal` という 2 つの階層に定義されていることが分かります。
そこで、次のような内容を持つ `config/oem/locales/custom.yml` を作成します。

~~~
ja:
  gws/portal:
    root_portal: 全体ポータル
    tabs:
      root_portal: 全体
~~~

`custom.yml` の内容を反映するには、シラサギを再起動する必要があります。
