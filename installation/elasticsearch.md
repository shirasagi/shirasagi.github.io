---
layout: default
title: Elasticsearch のインストール
---

## Elasticsearch

- [Official Site](https://www.elastic.co/products/elasticsearch) ([日本語](https://www.elastic.co/jp/products/elasticsearch))

Elasticsearch は Elasticsearch BV 社によって提供されている全文検索サーバーです。

グループウェアの全文検索、CMSのサイト内検索をご利用になる際は、本手順を参照し Elasticsearch をインストールしてください。
なお、本書では CentOS 7 でのインストール方法を説明します。他のディストリビューションをご利用の方は適時読み替ええください。

## Install

次のようなファイル `/etc/yum.repos.d/elasticsearch-5.repo` を作成します。

~~~
[elasticsearch-5.x]
name=Elasticsearch repository for 5.x packages
baseurl=https://artifacts.elastic.co/packages/5.x/yum
gpgcheck=1
gpgkey=https://artifacts.elastic.co/GPG-KEY-elasticsearch
enabled=1
autorefresh=1
type=rpm-md
~~~

次のコマンドを実行し Elasticsearch と java をインストールします。

~~~
$ su -
# yum install elasticsearch java-1.8.0-openjdk
~~~

CentOS 7 以外のディストリビューションをご利用の方は [Installing Elasticsearch](https://www.elastic.co/guide/en/elasticsearch/reference/current/install-elasticsearch.html) を参照の上、適時、インストールしてください。

次のコマンドを実行し Elasticsearch のプラグインをインストールします。

~~~
$ su -
# cd /usr/share/elasticsearch
# bin/elasticsearch-plugin install analysis-icu
# bin/elasticsearch-plugin install analysis-kuromoji
# bin/elasticsearch-plugin install ingest-attachment
~~~

次のコマンドを実行し Elasticsearch を起動します。

~~~
$ su -
# systemctl daemon-reload
# systemctl start elasticsearch.service
~~~

次のコマンドを実行し Elasticsearch の自動起動を有効にします。

~~~
$ su -
# systemctl enable elasticsearch.service
~~~

次のコマンドを実行し Elasticsearch が起動していることを確認します。

~~~shell
$ curl 'http://127.0.0.1:9200/?pretty'
~~~

次のような JSON が表示されれば Elasticsearch は起動しています。

~~~JSON
{
  "name" : "S_x_GM3",
  "cluster_name" : "elasticsearch",
  "cluster_uuid" : "Cf1_-7haTgGla3SiCRStqw",
  "version" : {
    "number" : "5.6.1",
    "build_hash" : "667b497",
    "build_date" : "2017-09-14T19:22:05.189Z",
    "build_snapshot" : false,
    "lucene_version" : "6.6.1"
  },
  "tagline" : "You Know, for Search"
}
~~~

## グループウェアの設定

Rails コンソールから以下のコマンドを実行し、全文検索を有効にします。
以下の例では「シラサギ市」の全文検索を有効にしています。

~~~ruby
group = Gws::Group.find_by(name: 'シラサギ市')
group.menu_elasticsearch_state = 'show'
group.elasticsearch_hosts = ["127.0.0.1:9200"]
group.save
~~~

「シラサギ市」の全文検索が有効になったかどうか、以下のコマンドを実行して確認してみます。

~~~shell
$ bundle exec rake gws:es:info site=シラサギ市
~~~

有効になっている場合、次のような JSON が表示されます。

~~~JSON
{
  "name": "S_x_GM3",
  "cluster_name": "elasticsearch",
  "cluster_uuid": "Cf1_-7haTgGla3SiCRStqw",
  "version": {
    "number": "5.6.1",
    "build_hash": "667b497",
    "build_date": "2017-09-14T19:22:05.189Z",
    "build_snapshot": false,
    "lucene_version": "6.6.1"
  },
  "tagline": "You Know, for Search"
}
~~~

「シラサギ市」の全文検索を初期化するため、以下のコマンドを実行します。

~~~shell
$ bundle exec rake gws:es:ingest:init site=シラサギ市
$ bundle exec rake gws:es:create_indexes site=シラサギ市
$ bundle exec rake gws:es:feed_all site=シラサギ市
~~~

シラサギを起動しグループウェアの全文検索で `*:*` を検索してみてください。
正しく設定できている場合、何らかの文書がヒットします。


## サイト内検索の設定

Rails コンソールから以下のコマンドを実行し、サイト内検索を有効にします。
以下の例では「シラサギ市」のサイト内検索を有効にしています。

~~~ruby
site = Cms::Site.find_by(host: 'www')
site.elasticsearch_hosts = ["127.0.0.1:9200"]
site.save
~~~

「シラサギ市」のサイト内検索を初期化するため、以下のコマンドを実行します。

~~~shell
$ bundle exec rake cms:es:ingest:init site=www
$ bundle exec rake cms:es:create_indexes site=www
$ bundle exec rake cms:es:feed_all site=www
~~~

定期処理で検索インデックスを更新します。

~~~shell
[crontab]
0 * * * * /bin/bash -l -c 'cd /var/www/shirasagi && bundle exec rake cms:es:feed_releases site=www' >/dev/null
~~~
