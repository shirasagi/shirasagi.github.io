---
layout: default
title: 権限/ロール
---

## 権限とロール

権限は、ユーザーがオブジェクトを操作してもよいかを制御するための機能です。<br />
権限は以下の要素の組み合わせで成り立っています。

- オブジェクトの種類
- オブジェクトの所有者
- アクション

また、複数の権限設定をグループ化したものをロールと呼んでいます。

## 権限の種類

例えば、ページを操作するための基本的な権限は以下の表のようになります。

|権限名|日本語表示|アクション|所有者|オブジェクトの種類|
|--|
|read_other_cms_pages|ページの閲覧（全て）|read|other|cms_pages|
|read_private_cms_pages|ページの閲覧（所有）|read|private|cms_pages|
|edit_other_cms_pages|ページの編集（全て）|edit|other|cms_pages|
|edit_private_cms_pages|ページの編集（所有）|edit|private|cms_pages|
|delete_other_cms_pages|ページの削除（全て）|delete|other|cms_pages|
|delete_private_cms_pages|ページの編削除（所有）|delete|private|cms_pages|

アクション

- read, edit, delete
- etc..

所有者

- other は所有状態にないオブジェクトにも適用されます。
- private は所有状態のオブジェクトにのみ適用されます。

オブジェクトの種類

- モデル名を使用します。
- DBのコレクション名とも言えます。

## メソッド

- Model.allow #=> scope
- item.allowed? #=> boolean

## アドオンの種類

- ss
- cms
- gws
- Fee
- Group permission

