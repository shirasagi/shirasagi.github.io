---
layout: default
title: 不適切な公開HTMLと添付ファイルの削除
---

バージョン1.18.0よりメンテナンス用に公開側に残ってしまった不適切なHTMLを削除するタスクを強化し、
添付ファイルも削除できる機能を追加しました。

## 概要

ページ、フォルダーは公開ディレクトリにHTMLを書き出します。
同様にページに添付されていファイルも公開ディレクトリにコピーが保存されます。

不具合や何らかの運用により、ページ、フォルダー、添付ファイルが公開状態でないにもかかわらず、HTMLや添付ファイルのコピーが残ってしまうケースが報告されています。

HTMLや添付ファイルのコピーが残ってしまうと、Google 検索などの検索サービスにいつまでも残ってしまい、不意に検索からアクセスされてしまいます。
不適切な公開HTMLと添付ファイルを削除する `rake task` を導入しました。

## 実行方法

### チェックのみ

- コマンド：`bundle exec rake cms:consistency:check`

コマンドを実行すると削除可能なファイル一覧を作成したファイル `deletable-pathes.txt` が作成されます。
実際にはコマンドの最後に以下のような行が出力されます。

~~~
check /var/www/shirasagi/private/files/ss_tasks/4/4/_/5_44-deletable-pathes.txt to see the all lists
~~~

### 実際に削除する

コマンド `bundle exec rake cms:consistency:repair` を実行しても良いですし、
チェック結果の `deletable-pathes.txt` を利用して以下のように削除することもできます。

~~~
# 削除の前に、念のためバックアップを作成する
tar cf backup.tar $(cat /var/www/shirasagi/private/files/ss_tasks/4/4/_/5_44-deletable-pathes.txt)
# 削除する
rm -rf $(cat /var/www/shirasagi/private/files/ss_tasks/4/4/_/5_44-deletable-pathes.txt)
# ファイルを削除することで空ディレクトリが発生しているかもしれないので、空ディレクトを削除する
find /var/www/shirasagi/public -type d -empty -exec rmdir {} \;
~~~

コマンド `bundle exec rake cms:consistency:repair` は対象ファイルを削除するだけで、
バックアップは作成しませんし、空ディレクトリも削除しません。
後者の方法を定期的に実行するのがお勧めです。

## 簡単な動作確認

以下のようにすると、公開ディレクトリ（ドキュメントルート）配下に手動でHTMLを配置して、不適切なHTMLとして削除されるかを確認できます。

- サイトホスト名 `www`
- 公開ディレクトリ `public/sites/w/w/w/_/`

~~~
# cd /var/www/shirasagi
# touch public/sites/w/w/w/_/sample.html
# bundle exec rake cms:consistency:check site=www
> サイト名
> found 26 html files in '/var/www/shirasagi/public/sites/w/w/w/_'
> /var/www/shirasagi/public/sites/w/w/w/_/sample.html: doesn't match pages nor nodes. this file can delete.
> found 8 files in /var/www/shirasagi/public/sites/w/w/w/_/fs
> check /var/www/shirasagi/private/files/ss_tasks/4/4/_/5_44-deletable-pathes.txt to see the all lists
~~~
