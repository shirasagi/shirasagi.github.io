---
layout: default
title: Fuseki のインストールとオープンデータプラグインの設定
---

## Fuseki

- [Official Site](https://jena.apache.org/download/)

Fuseki は Apache Jena Project によって提供されています。

Fuseki とは、RDF ファイルを永続化し、RDF クエリで検索することができる RDF データベースサービスです。

オープンデータプラグインは、データストアに [RDF](http://ja.wikipedia.org/wiki/Resource_Description_Framework) ファイルが登録されると、
事前に設定された Fuseki に RDF ファイルを登録し、Fuseki による RDF クエリの検索機能を提供しています。

Fuseki が実行できる RDF クエリは [SPARQL1.1](http://ja.wikipedia.org/wiki/SPARQL) 形式で、
オープンデータプラグインは [Turtle](http://www.w3.org/TR/turtle/) 形式の RDF ファイルをサポートしています。

## Install

Fuseki のインストールの前に Java をインストールします。

~~~
$ su -
# yum install java-1.8.0-openjdk
~~~

Fuseki をダウンロードします。

~~~
$ cd /tmp
$ wget http://ftp.jaist.ac.jp/pub/apache/jena/binaries/jena-fuseki1-1.1.2-distribution.tar.gz
~~~

Fuseki を /var/lib の下に展開します。

~~~
$ su -
# cd /var/lib
# tar zxvf /tmp/jena-fuseki1-1.1.2-distribution.tar.gz
~~~

Fuseki を設定します。

~~~
$ su -
# ln -s /var/lib/jena-fuseki1-1.1.2 /var/lib/fuseki
# cd /var/lib/fuseki
# cp -p config-tdb.ttl config-opendata.ttl
# mkdir -p DB/opendata
# vi config-opendata.ttl
~~~

次の diff を参考に config-opendata.ttl を適切に設定してください。

~~~
--- config-tdb.ttl      2015-03-08 18:49:16.000000000 +0900
+++ config-opendata.ttl 2015-05-29 13:38:26.595464858 +0900
@@ -18,8 +18,7 @@
    # ja:loadClass "your.code.Class" ;

    fuseki:services (
-     <#service_tdb_read_only>
-     <#service_tdb_all>
+     <#service_tdb_opendata>
    ) .

 # TDB
@@ -28,6 +27,27 @@
 tdb:GraphTDB    rdfs:subClassOf  ja:Model .

 ## ---------------------------------------------------------------
+## OpenData dataset.
+
+<#service_tdb_opendata> rdf:type fuseki:Service ;
+    rdfs:label                      "TDB Service (RW)" ;
+    fuseki:name                     "opendata" ;
+    fuseki:serviceQuery             "query" ;
+    fuseki:serviceQuery             "sparql" ;
+    fuseki:serviceUpdate            "update" ;
+    fuseki:serviceUpload            "upload" ;
+    fuseki:serviceReadWriteGraphStore      "data" ;
+    # A separate read-only graph store endpoint:
+    fuseki:serviceReadGraphStore       "get" ;
+    fuseki:dataset           <#tdb_dataset_opendata> ;
+    .
+
+    <#tdb_dataset_opendata> rdf:type      tdb:DatasetTDB ;
+    tdb:location "DB/opendata" ;
+    tdb:unionDefaultGraph true ;
+    .
+
+## ---------------------------------------------------------------
 ## Read-only TDB dataset (only read services enabled).

 <#service_tdb_read_only> rdf:type fuseki:Service ;
 ~~~

 config-opendata.ttl は[ここ](./config-opendata.ttl)からダウンロードすることもできます。

次のコマンドを実行し fuseki を起動します。

~~~
# ./fuseki-server -v --update --config=config-opendata.ttl
~~~

ブラウザで、http://localhost:3030/ にアクセスしてみてください。
fuseki が正常に起動していれば、fuseki の管理コンソールが表示されます。

## オープンデータプラグインの設定

`config/opendata.yml` をテキストエディタで開きます。

~~~
$ vi config/opendata.yml
~~~

`disable: false` となっている箇所を、`disable: true` に変更し、
SHIRASAGI を再起動します（以下を参考に）。

~~~
# Fuseki Server

production: &production
  # SPARQL Endpoint
  fuseki:
    disable: true   → ここを false に変更
    host: 127.0.0.1
    port: 3030
    dataset: opendata
~~~

## オープンデータプラグインと Fuseki の連携確認

オープンデータプラグインに適当なデータセットを作成し、TTL ファイルをリソースとして登録します。

ブラウザで http://localhost:3000/sparql にアクセスし、「Run Query」ボタンをクリックしてください。
正しく連携できていれば、上で登録した TTL ファイルが検索結果として得られます。
