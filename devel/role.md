---
layout: default
title: 権限/ロール
---

## 権限とロール

権限は、ユーザーが機能やオブジェクトを操作できるどうかのフラグです。
また、複数の権限をグループ化したものをロールと呼んでいます。
ロールをユーザーに適用することで、ユーザーの権限を管理します。

## 権限

### 機能権限

機能を使用するために必要な権限です。

（例）

|権限名|日本語表示|
|--|
|edit_sys_users|ユーザーの管理|
|edit_sys_groups|グループの管理|
|edit_sys_users|ユーザーの管理|
|edit_sys_roles|権限/ロールの管理|

### オブジェクト権限

標準的なオブジェクト権限は以下の要素の組み合わせで成り立っています。

- アクション
  - read, edit, delete, etc.
- オブジェクトの所有者
  - private は所有するオブジェクトにのみ適用されます。
  - other は所有しないオブジェクトにも適用されます。
- オブジェクトの種類
  - モデル名のスネークケース文字列を使用します。
  - DBのコレクション名とも言えます。

（例）

|権限名|日本語表示|アクション|所有者|オブジェクトの種類|
|--|
|read_private_cms_pages|ページの閲覧（所有）|read|private|cms_pages|
|read_other_cms_pages|ページの閲覧（全て）|read|other|cms_pages|
|edit_private_cms_pages|ページの編集（所有）|edit|private|cms_pages|
|edit_other_cms_pages|ページの編集（全て）|edit|other|cms_pages|
|delete_private_cms_pages|ページの削除（所有）|delete|private|cms_pages|
|delete_other_cms_pages|ページの削除（全て）|delete|other|cms_pages|

※編集権限には作成権限も含まれています。

## ロール

### ロールの種類

機能レイヤーごとにロールが存在します。<br />

|モデル|フィールド|フィールドの説明|フィールド値の例|
|--|
|Sys::Role|name|ロール名|システム管理者|
||permissions|権限内容|[ 'edit_sys_groups',, ]|
|Cms::Role|name|ロール名|サイト管理者|
||permissions|権限内容|[ 'read_private_article_pages',, ]|
||permission_level|権限レベル|1|
||site_id|対象サイト #Cms::Site|10|
|Gws::Role|name|ロール名|グループ管理者|
||permissions|権限内容|[ 'read_private_gws_link',, ]|
||permission_level|権限レベル|1|
||site_id|対象組織 #Gws::Group|10|

権限内容 `permissions`

- 権限名の配列です。

権限レベル `permission_level`

- 対象オブジェクトに設定されている権限レベル以上であれば権限有りとなります。
- 1 ～ 3 の値が設定できます。

### ロールの適用

ユーザーとロールの関係性は以下のようになります。

|ユーザーモデル|フィールド|参照モデル|ロール設定用アドオン|
|--|
|SS::User|sys_role_ids|Sys::Role|Sys::Addon::Role|
|Cms::User|cms_role_ids|Cms::Role|Cms::Addon::Role|
|Gws::User|gws_role_ids|Gws::Role|Gws::Addon::Role|

## 権限モジュールの利用

権限モジュールを利用することで、オブジェクトに権限処理を実装することができます。

### 権限モジュールの種類と設定用アドオン

|権限モジュール|説明|設定用アドオン|
|--|
|Sys::Permission|ユーザーがシステム権限をもっているか判定|--|
|Cms::SitePermission|対象サイトのCMS権限をもっているか判定|--|
|Cms::GroupPermission|対象オブジェクトへのCMS権限をもっているか|Cms::Addon::GroupPermission|
|Gws::SitePermission|対象サイトのGWS権限をもっているか判定|--|
|Gws::GroupPermission|対象オブジェクトへのGWS権限をもっているか|Gws::Addon::GroupPermission|

### 権限判定メソッド

対象オブジェクトの権限判定

~~~
Model.first.allowed?(action, user, site: site) #=> bool
~~~

権限をもつオブジェクトへのスコープ

~~~
Model.where({}).allow(action, user, site: site) #=> criteria
~~~

## 新しい権限の追加

新しい権限を追加する際の手順を説明します。

### 権限名の登録

使用する機能レイヤーへ権限名を登録します。

~~~
# app/models/**/initializer.rb

Sys::Role.permission :permission_name1
Cms::Role.permission :permission_name2
Gws::Role.permission :permission_name3
~~~

### 多言語設定

locales へ表示文字を記述します。

~~~
# config/locales/**/ja.yml

ja:
  sys_role:
    permission_name1: 権限1
  cms_role:
    permission_name2: 権限2
  gws_role:
    permission_name3: 権限3
~~~

### モデルの設定

権限モジュールをモデルへ組み込みます。

~~~
# app/models/**/any_model.rb

class Model
  include SS::Document
  include SS::Reference::User
  include SS::Reference::Site
  include Cms::Addon::GroupPermission

  # set_permission_name "any_models"
  # set_permission_name "any_models", :edit
  ...
end
~~~

権限名の固定（モデル名） `set_permission_name(name)`

- 通常はモデル名が権限名となりますが、これを別の文字列に変更することができます。
- 上記例の場合、`"#{action}_any_models"` が権限名となります。

権限名の完全固定 `set_permission_name(name, action)`

- アクションを含め、使用される権限名を完全に固定します。
- 上記例の場合、どのようなアクションを指定されても `"edit_any_models"` が権限名となります。
