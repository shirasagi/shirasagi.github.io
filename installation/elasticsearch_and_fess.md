---
layout: default
title: elasticsearch & fess のインストール
---

前のElasticsearch（5系）のインストール方法は[こちら](./elasticsearch.md)を参照してください。

- Elasticsearch は Elasticsearch BV 社によって提供されている全文検索サーバーです。
- Fessはオープンソースソフトウェアの全文検索システムです。

グループウェアの全文検索、CMSのサイト内検索、外部サイト検索をご利用になる際は、本手順を参照してElasticsearchとFess をインストールしてください。本書では CentOS 7 でのインストール方法を説明します。他のディストリビューションをご利用の方は適時読み替えください。  

CentOS 7 以外のディストリビューションをご利用の方は [Installing Elasticsearch](https://www.elastic.co/guide/en/elasticsearch/reference/current/install-elasticsearch.html#install-elasticsearch) を参照の上、適時、インストールしてください。

なお、elasticsearch5.xから7.xへのマイグレーションは[Official Site](https://www.elastic.co/guide/en/elasticsearch/reference/7.0/rolling-upgrades.html)を参考にしてください。また、[こちら](https://aimstogeek.hatenablog.com/entry/2020/10/05/080000)では日本語で紹介されています。



## Elasticserach install
- [Official Site](https://www.elastic.co/jp/elasticsearch/)([日本語](https://www.elastic.co/jp/elasticsearch/))

次のコマンドを実行し、Elasticsearch GPGキーをインポートします
```
$ su -
# rpm --import https://artifacts.elastic.co/GPG-KEY-elasticsearch
```
<br />

次のコマンドを実行し、elasticserachをインストールします。
また、`shasum`ではダウンロードしたRPMと公開されたチェックサムのSHAを比較します。これにより、`elasticsearch- {version} -x86_64.rpm：OK`が出力されます。

```
$ su -
# wget https://artifacts.elastic.co/downloads/elasticsearch/elasticsearch-7.12.1-x86_64.rpm
# wget https://artifacts.elastic.co/downloads/elasticsearch/elasticsearch-7.12.1-x86_64.rpm.sha512
# shasum -a 512 -c elasticsearch-7.12.1-x86_64.rpm.sha512
# rpm --install elasticsearch-7.12.1-x86_64.rpm
```
<br />

次のコマンドを実行し Elasticsearch のプラグインをインストールします。
```
$ su -
# cd /usr/share/elasticsearch
# bin/elasticsearch-plugin install analysis-icu
# bin/elasticsearch-plugin install analysis-kuromoji
# bin/elasticsearch-plugin install ingest-attachment
```

次のコマンドを実行し、インストール結果を確認します。

```
$ su -
# cd /usr/share/elasticsearch
# bin/elasticsearch-plugin list
```

次のようなコマンド結果が表示されていれば、プラグインのインストールはできています。

```
analysis-icu
analysis-kuromoji
ingest-attachment
```


<br />


elasticsearchが自動的に起動するように次のコマンドを実行します。

```
$ su -
# systemctl daemon-reload
# systemctl enable elasticsearch.service
```


<br />


次のコマンドを実行してElasticsearchを起動します。

```
$ su -
# systemctl start elasticsearch.service
```

<br />

次のコマンドを実行し Elasticsearch が起動していることを確認します。

```
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








## fess install
- [Official Site](https://fess.codelibs.org/)([日本語](https://fess.codelibs.org/ja/))

次のコマンドを実行し、Javaをインストールします。

```
$ su -
# wget https://download.java.net/java/GA/jdk11/9/GPL/openjdk-11.0.2_linux-x64_bin.tar.gz
# tar xzvf openjdk-11.0.2_linux-x64_bin.tar.gz
# mv jdk-11.0.2 /opt/
# alternatives --install /usr/bin/java java /opt/jdk-11.0.2/bin/java 1
# alternatives --install /usr/bin/jar jar /opt/jdk-11.0.2/bin/jar 1
# alternatives --install /usr/bin/javac javac /opt/jdk-11.0.2/bin/javac 1
```

次のコマンドを実行し、インストール結果を確認します。

```
$ java -version
```

次のようなコマンド結果が表示されていれば、Javaのインストールはできています。

```
openjdk version "11.0.2" 2019-01-15
OpenJDK Runtime Environment 18.9 (build 11.0.2+9)
OpenJDK 64-Bit Server VM 18.9 (build 11.0.2+9, mixed mode)
```

<br />

次のコマンドを実行し、fessをインストールをします。

```dotnetcli
$ su -
# wget https://github.com/codelibs/fess/releases/download/fess-13.12.2/fess-13.12.2.rpm
# rpm --install fess-13.12.2.rpm
```

<br />

次のコマンドを実行し、fessに必要なElasticsearchのプラグインをインストールします

```dotnetcli
$ su -
# cd /usr/share/elasticsearch/
# bin/elasticsearch-plugin install org.codelibs:elasticsearch-analysis-fess:7.12.0
# bin/elasticsearch-plugin install org.codelibs:elasticsearch-analysis-extension:7.12.0
# bin/elasticsearch-plugin install org.codelibs:elasticsearch-minhash:7.12.0
```

次のコマンドを実行し、インストール結果を確認します。

```
$ bin/elasticsearch-plugin list
```

次のようなコマンド結果が表示されていれば、fessに必要なプラグインのインストールはできています。

```
analysis-extension
analysis-fess
minhash
```

<br />


次のコマンドを実行し、elasticsearch-configsync をインストールします。

```dotnetcli
$ su -
# curl -o /tmp/configsync.zip https://repo.maven.apache.org/maven2/org/codelibs/elasticsearch-configsync/7.12.0/elasticsearch-configsync-7.12.0.zip
# mkdir -p /usr/share/elasticsearch/modules/configsync
# unzip -d /usr/share/elasticsearch/modules/configsync /tmp/configsync.zip
```

<br />


/etc/elasticsearch/elasticsearch.yml に下記の設定を加えます
```dotnetcli
$ su -
# vi /etc/elasticsearch/elasticsearch.yml

configsync.config_path: /var/lib/elasticsearch/config
```


<br />


Elasticserachを再起動します。

```dotnetcli
$ su -
# systemctl restart elasticsearch
```


<br />


次のコマンドを実行し、fessを有効にします。

```dotnetcli
$ su -
# systemctl daemon-reload
# systemctl enable fess.service
```


<br />

次のコマンドを実行し、fessを起動します。

```
$ su -
# systemctl start fess.service
```

ブラウザで`http://localhost:8080`にアクセスして、以下のような画面が表示されていればインストールができています。

![Fess](../images/fess.png "Fess")



## グループウェアの設定
Rails コンソールから以下のコマンドを実行し、全文検索を有効にします。 以下の例では「シラサギ市」の全文検索を有効にしています。

```ruby
group = Gws::Group.find_by(name: 'シラサギ市')
group.menu_elasticsearch_state = 'show'
group.elasticsearch_hosts = ["127.0.0.1:9200"]
group.save
```
「シラサギ市」の全文検索が有効になったかどうか、以下のコマンドを実行して確認してみます。

```
$ bin/rake gws:es:info site=シラサギ市
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

```
$ bin/rake gws:es:ingest:init site=シラサギ市
$ bin/rake gws:es:create_indexes site=シラサギ市
$ bin/rake gws:es:feed_all site=シラサギ市
```

シラサギを起動しグループウェアの全文検索で *:* を検索してみてください。 正しく設定できている場合、何らかの文書がヒットします。

## サイト内検索の設定
Rails コンソールから以下のコマンドを実行し、サイト内検索を有効にします。 以下の例では「シラサギ市」のサイト内検索を有効にしています。

```ruby
site = Cms::Site.find_by(host: 'www')
site.elasticsearch_hosts = ["127.0.0.1:9200"]
site.save
```
「シラサギ市」のサイト内検索を初期化するため、以下のコマンドを実行します。

```
$ bin/rake cms:es:ingest:init site=www
$ bin/rake cms:es:create_indexes site=www
$ bin/rake cms:es:feed_all site=www
```

定期処理で検索インデックスを更新します。

```shell
[crontab]
0 * * * * /bin/bash -l -c 'cd /var/www/shirasagi && bundle exec rake cms:es:feed_releases site=w
```
