---
layout: default
title: Elasticsearch & Fess のインストール
---

前のElasticsearch（5系）のインストール方法は[こちら](./elasticsearch.md)を参照してください。

- Elasticsearch は Elasticsearch BV 社によって提供されているオープンソースの全文検索エンジンです。
- Fess は Elasticsearch を検索エンジンとして利用するオープンソース全文検索サーバーです。

グループウェアの全文検索、CMS のサイト内検索をご利用になる際は、本手順を参照して Elasticsearch をインストールしてください。
また、CMS のサイト内検索にて外部サイト検索をご利用になる際は、本手順を参照して Fess をインストールしてください。
本書では CentOS 7 でのインストール方法を説明します。他のディストリビューションをご利用の方は適時読み替えください。  

CentOS 7 以外のディストリビューションをご利用の方は [Installing Elasticsearch](https://www.elastic.co/guide/en/elasticsearch/reference/current/install-elasticsearch.html#install-elasticsearch) を参照の上、適時、インストールしてください。

なお、Elasticsearch 5.x から 7.x へのマイグレーションは[Official Site](https://www.elastic.co/guide/en/elasticsearch/reference/7.0/rolling-upgrades.html)を参考にしてください。

## Elasticsearch install
- [公式サイト](https://www.elastic.co/jp/elasticsearch/)

次のコマンドを実行し、Elasticsearch GPG キーをインポートします
```shell
$ su -
# rpm --import https://artifacts.elastic.co/GPG-KEY-elasticsearch
```

<br />

次のコマンドを実行し、 Elasticsearch をインストールします。
`shasum` ではダウンロードした RPM と公開されたチェックサムのSHAを比較し、ダウンロードした RPM の完全性を検証します。これにより、`elasticsearch- {version} -x86_64.rpm：OK` のように出力されていればファイルの完全性が保証されています。

```shell
$ su -
# wget https://artifacts.elastic.co/downloads/elasticsearch/elasticsearch-7.12.1-x86_64.rpm
# wget https://artifacts.elastic.co/downloads/elasticsearch/elasticsearch-7.12.1-x86_64.rpm.sha512
# shasum -a 512 -c elasticsearch-7.12.1-x86_64.rpm.sha512
# rpm --install elasticsearch-7.12.1-x86_64.rpm
```

<br />

次のコマンドを実行し Elasticsearch のプラグインをインストールします。
```shell
$ su -
# cd /usr/share/elasticsearch
# bin/elasticsearch-plugin install analysis-icu
# bin/elasticsearch-plugin install analysis-kuromoji
# bin/elasticsearch-plugin install ingest-attachment
```

次のコマンドを実行すると、インストールされているプラグインを確認できます。

```shell
$ su -
# cd /usr/share/elasticsearch
# bin/elasticsearch-plugin list
```

次のようなコマンド結果が表示されていれば、プラグインのインストールはできています。

```shell
analysis-icu
analysis-kuromoji
ingest-attachment
```

<br />

Elasticsearch が自動的に起動するように次のコマンドを実行します。

```shell
$ su -
# systemctl daemon-reload
# systemctl enable elasticsearch.service
```

<br />

次のコマンドを実行して Elasticsearch を起動します。

```shell
$ su -
# systemctl start elasticsearch.service
```

<br />

次のコマンドを実行し Elasticsearch が起動していることを確認します。

```shell
$ curl 'http://127.0.0.1:9200/?pretty'
```

次のような JSON が表示されれば Elasticsearch は起動しています。

```JSON
{
  "name" : "83b62d9effc2",
  "cluster_name" : "elasticsearch",
  "cluster_uuid" : "biTzcpXkT7K6XJCGV3XRhA",
  "version" : {
    "number" : "7.12.1",
    "build_flavor" : "default",
    "build_type" : "rpm",
    "build_hash" : "3186837139b9c6b6d23c3200870651f10d3343b7",
    "build_date" : "2021-04-20T20:56:39.040728659Z",
    "build_snapshot" : false,
    "lucene_version" : "8.8.0",
    "minimum_wire_compatibility_version" : "6.8.0",
    "minimum_index_compatibility_version" : "6.0.0-beta1"
  },
  "tagline" : "You Know, for Search"
}
```

## Fess install
- [Official Site](https://fess.codelibs.org/)([日本語](https://fess.codelibs.org/ja/))

次のコマンドを実行し、 Java をインストールします。

```shell
$ su -
# wget https://download.java.net/java/GA/jdk11/9/GPL/openjdk-11.0.2_linux-x64_bin.tar.gz
# tar xzvf openjdk-11.0.2_linux-x64_bin.tar.gz
# mv jdk-11.0.2 /opt/
# alternatives --install /usr/bin/java java /opt/jdk-11.0.2/bin/java 1
# alternatives --install /usr/bin/jar jar /opt/jdk-11.0.2/bin/jar 1
# alternatives --install /usr/bin/javac javac /opt/jdk-11.0.2/bin/javac 1
```

次のコマンドを実行し、インストール結果を確認します。

```shell
$ java -version
```

次のようなコマンド結果が表示されていれば、Java のインストールはできています。

```shell
openjdk version "11.0.2" 2019-01-15
OpenJDK Runtime Environment 18.9 (build 11.0.2+9)
OpenJDK 64-Bit Server VM 18.9 (build 11.0.2+9, mixed mode)
```

<br />

次のコマンドを実行し、 Fess をインストールをします。

```shell
$ su -
# wget https://github.com/codelibs/fess/releases/download/fess-13.12.2/fess-13.12.2.rpm
# rpm --install fess-13.12.2.rpm
```

<br />

次のコマンドを実行し、 Fess に必要な Elasticsearch のプラグインをインストールします

```shell
$ su -
# cd /usr/share/elasticsearch/
# bin/elasticsearch-plugin install org.codelibs:elasticsearch-analysis-fess:7.12.0
# bin/elasticsearch-plugin install org.codelibs:elasticsearch-analysis-extension:7.12.0
# bin/elasticsearch-plugin install org.codelibs:elasticsearch-minhash:7.12.0
```

次のコマンドを実行し、インストール結果を確認します。

```shell
$ bin/elasticsearch-plugin list
```

次のようなコマンド結果が表示されていれば、 Fess に必要なプラグインのインストールはできています。

```shell
analysis-extension
analysis-fess
minhash
```

<br />

次のコマンドを実行し、 elasticsearch-configsync をインストールします。

```shell
$ su -
# curl -o /tmp/configsync.zip https://repo.maven.apache.org/maven2/org/codelibs/elasticsearch-configsync/7.12.0/elasticsearch-configsync-7.12.0.zip
# mkdir -p /usr/share/elasticsearch/modules/configsync
# unzip -d /usr/share/elasticsearch/modules/configsync /tmp/configsync.zip
```

<br />

/etc/elasticsearch/elasticsearch.yml に下記の設定を加えます
```shell
$ su -
# vi /etc/elasticsearch/elasticsearch.yml

configsync.config_path: /var/lib/elasticsearch/config
```

<br />

Elasticsearch を再起動します。

```shell
$ su -
# systemctl restart elasticsearch
```

<br />

次のコマンドを実行し、 Fess を有効にします。

```shell
$ su -
# systemctl daemon-reload
# systemctl enable fess.service
```

<br />

次のコマンドを実行し、 Fess を起動します。

```shell
$ su -
# systemctl start fess.service
```

ブラウザで `http://localhost:8080` にアクセスして、以下のような画面が表示されていればインストールができています。

![Fess](../images/fess.png "Fess")

Fess のインストール後、外部サイトのインデックスを作成するためウェブサイトのクロールに関する設定をする必要があります。
詳細は [ウェブクロール](https://fess.codelibs.org/ja/13.12/admin/webconfig-guide.html) をご覧ください。

## グループウェアの設定
Rails コンソールから以下のコマンドを実行し、全文検索を有効にします。 以下の例では「シラサギ市」の全文検索を有効にしています。

```ruby
group = Gws::Group.find_by(name: 'シラサギ市')
group.menu_elasticsearch_state = 'show'
group.elasticsearch_hosts = ["127.0.0.1:9200"]
group.save
```

「シラサギ市」の全文検索が有効になったかどうか、以下のコマンドを実行して確認してみます。

```shell
$ bundle exec rake gws:es:info site=シラサギ市
```

有効になっている場合、次のような JSON が表示されます。

```JSON
{
  "name" : "d11c3ce6504b",
  "cluster_name" : "elasticsearch",
  "cluster_uuid" : "zysDpJFHSoOfbxfijLiaOg",
  "version" : {
    "number" : "7.12.1",
    "build_flavor" : "default",
    "build_type" : "rpm",
    "build_hash" : "3186837139b9c6b6d23c3200870651f10d3343b7",
    "build_date" : "2021-04-20T20:56:39.040728659Z",
    "build_snapshot" : false,
    "lucene_version" : "8.8.0",
    "minimum_wire_compatibility_version" : "6.8.0",
    "minimum_index_compatibility_version" : "6.0.0-beta1"
  },
  "tagline" : "You Know, for Search"
}
```

「シラサギ市」の全文検索を初期化するため、以下のコマンドを実行します。

```shell
$ bundle exec rake gws:es:ingest:init site=シラサギ市
$ bundle exec rake gws:es:create_indexes site=シラサギ市
$ bundle exec rake gws:es:feed_all site=シラサギ市
```

定期処理で検索インデックスを更新します。

~~~shell
[crontab]
40 0 * * * /bin/bash -l -c 'cd /var/www/shirasagi && /usr/bin/flock -x -w 10 /var/www/shirasagi/tmp/gws_es_feed_all_lock bundle exec rake gws:es:feed_all site=シラサギ市' >/dev/null
~~~

シラサギを起動しグループウェアの全文検索で `*:*` を検索してみてください。 正しく設定できている場合、何らかの文書がヒットします。

## サイト内検索の設定
Rails コンソールから以下のコマンドを実行し、サイト内検索を有効にします。 以下の例では「自治体サンプル」のサイト内検索を有効にしています。
なお、「自治体サンプル」のホスト名は `www` としています。

```ruby
site = Cms::Site.find_by(host: 'www')
site.elasticsearch_hosts = ["127.0.0.1:9200"]
site.save
```

「自治体サンプル」のサイト内検索を初期化するため、以下のコマンドを実行します。

```shell
$ bundle exec rake cms:es:ingest:init site=www
$ bundle exec rake cms:es:create_indexes site=www
$ bundle exec rake cms:es:feed_all site=www
```

定期処理で検索インデックスを更新します。

```shell
[crontab]
0 * * * * /bin/bash -l -c 'cd /var/www/shirasagi && /usr/bin/flock -x -w 10 /var/www/shirasagi/tmp/cms_es_feed_all_lock bundle exec rake cms:es:feed_releases site=www' > /dev/null
```

シラサギを起動し CMS のサイト内検索で検索してみてください。
正しく設定できている場合、検索結果がヒットします。

Fess を利用した外部サイト検索を利用する場合、外部サイト検索を有効にする必要があります。

```ruby
site = Cms::Site.find_by(host: 'www')
site.elasticsearch_outside = 'enabled'
site.save
```

シラサギを起動し CMS のサイト内検索で検索してみてください。
検索結果画面にプルダウンが追加されていますので、そちらを変更後に再度検索してください。
そうすれば Fess によって作成されたインデックスによって外部サイトの検索結果が表示されます。
