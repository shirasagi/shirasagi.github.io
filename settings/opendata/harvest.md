---
layout: default
title: ハーベスト機能
---

## ハーベスト機能とは

シラサギオープンデータには他サイトに公開されているデータセットをインポートする機能が実装されています。
RSS取り込みのように、他サイトのデータセットおよびリソースを定期的にインポートして公開したい場合に利用できます。
また、登録されているデータセットをAPIにてCKANにエクスポートすることもできます。

## 連携

シラサギオープンデータもしくはCKANと連携することができます。

### シラサギオープンデータ

オープンデータサイトを立ち上げて、フォルダー属性「オープンデータ/API」を1階層目に作成します。<br>
以下のURLにアクセス可能となり、このAPIよりデータセットおよびリソースファイルの連携が可能となります。

- package_list
  - [https://opendata.demo.ss-proj.org/api/package_list](https://opendata.demo.ss-proj.org/api/package_list)
- package_show
  - [https://opendata.demo.ss-proj.org/api/package_show](https://opendata.demo.ss-proj.org/api/package_show)

### CKAN

CKANはオープンデータサイトに広く利用されている、オープンソースのデータカタログソフトフェアです。 <br>
[https://github.com/ckan/ckan](https://github.com/ckan/ckan)

CKANにはデータセットとリソースの登録機能があり、これらをシラサギにインポートすることができます。<br>
また、シラサギオープンデータからデータセットを登録(エクスポート)することができます。

バージョン2.10 CKANを連携対象として動作確認しています。

連携に[ActionAPI](https://docs.ckan.org/en/2.10/api/index.html)を使用しており、以下のURLにアクセスします。

- package_list
  - [http://demo.ckan.org/api/3/action/package_list](http://demo.ckan.org/api/3/action/package_list)
- package_show
  - [http://demo.ckan.org/api/3/action/package_show](http://demo.ckan.org/api/3/action/package_show)

## 設定

### ライセンス

データセットとリソースには公開ライセンスを設定して公開します。
取り込み元となるサイトと、取り込み先のサイトでライセンスを一意にする為、ライセンスIDを連携前に設定しておく必要があります。

#### シラサギオープンデータ

リソースファイル毎にライセンスを登録する仕様になっており、[ライセンス一覧](https://demo.ss-proj.org/.s4/opendata358/licenses)に登録されています。<br>
各ライセンスを編集して ハーベスト設定>ライセンスID を連携先のサイトと合わせてください。

#### CKAN

データセット毎にライセンスを登録する仕様になっています。<br>
CKANと連携する場合は [license_list](http://demo.ckan.org/api/3/action/license_list) を確認してください。<br>
これらのライセンスの id をCKAN側に合わせる形で、シラサギに設定してください。

### インポート

インポート設定を登録して、ジョブを実行することで、他サイトからデータセットを取り込むことができます。<br>
設定はデータセットフォルダーの [ハーベスト>インポート](https://demo.ss-proj.org/.s4/opendata358/harvest/importers) にて登録します。

- 名前
  - インポートの名称
- URL
  - 連携サイトのサイトトップURL
- API
  - Shirasagi API, CKAN API

と適宜必要な項目を設定します。

作成した設定を選択し、インポートを実行すると連携処理が開始されます。

### エクスポート

エクスポート設定して、ジョブを実行することで、シラサギからCKANにデータセットを登録することができます。<br>
設定はデータセットフォルダーの [ハーベスト>エクスポート](https://demo.ss-proj.org/.s4/opendata358/harvest/exporters) にて登録します。

- 名前
  - インポートの名称
- URL
  - 連携サイトのサイトトップURL
- API
  - CKAN API
- APIキー
  - CKAN API token
  - CKANのダッシュボードに管理者としてログインして作成してください

作成した設定を選択し、エクスポートを実行すると連携処理が開始されます。
