---
layout: default
title: 全文検索インデックスの更新
---

全文検索インデックスを更新するには次のコマンドを実行します。

~~~
$ bundle exec rake gws:es:drop site=グループ名
$ bundle exec rake gws:es:create_indexes site=グループ名
$ bundle exec rake gws:es:feed_all site=グループ名
~~~

上記のコマンドは全文検索インデックスを再作成するコマンドですので、
実行完了までにはしばらくかかる場合がございます。
