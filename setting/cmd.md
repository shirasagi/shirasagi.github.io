---
layout: default
title: 管理コマンド
---

## CMS管理コマンド

予約公開/非公開

```
$ rake cms:release_pages
```

フォルダー書き出し (トップページ, 一覧ページ)

```
rake cms:generate_nodes site=www
```

ページ書き出し

```
$ rake cms:generate_pages site=www
```

## 開発ツール(Egg: モジュール管理)

インストール

```
$ bin/egg install sample-egg -v 1.0.0
```

アンインストール

```
$ bin/egg uninstall sample-egg
```

圧縮ファイル生成

```
$ bin/egg pack sample-egg -v 1.0.0
```
