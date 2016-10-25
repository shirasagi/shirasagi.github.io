---
layout: default
title: ファイルサイズ制限
---

## 概要

SHIRASAGI では 3 つのレイヤーで、ファイルサイズを制限しており、標準では 100 MiB より大きなファイルをアップロードできません。

低レベルなレイヤーから順に、次の 3 つのレイヤーで制限しています。

1. Nginx
2. SHIRASAGI の environment.yml
3. SHIRASAGI のシステム設定 - ファイルサイズ制限

それぞれのレイヤーでファイルサイズ制限を緩和する方法を説明します。

## Nginx

SHIRASAGI 標準の Nginx の設定では、`client_max_body_size` パラメータが 100 MiB に設定されており、
100 MiB より大きなファイルをアップロードできません。

100 MiB より大きなファイルをアップロードしたい場合 `client_max_body_size` の値を変更します。

参考 [Nginx のインストール](/installation/nginx.html)

## SHIRASAGI の environment.yml

`config/environment.yml` の `max_filesize` が 100 MiB に設定されており、
100 MiB より大きなファイルをアップロードできません。

100 MiB より大きなファイルをアップロードしたい場合 `max_filesize` の値を変更します。

`config/environment.yml` が存在しない場合 `config/defaults/environment.yml` を `config/environment.yml` にコピーし、
`max_filesize` の値を変更します。

## SHIRASAGI のファイルサイズ制限

SHIRASAGI のシステム設定で、ファイル拡張しごとに最大ファイルサイズを設定することができます。

参考: <http://demo.ss-proj.org/.sys/max_file_sizes> (`sys` / `pass` でログイン)

標準では、どのような拡張子に対しても 100 MiB に設定されており、
100 MiB より大きなファイルをアップロードできません。

100 MiB より大きなファイルをアップロードしたい場合、適切なファイル拡張子のファイルサイズ制限を変更し
100 MiB より大きな値を設定します。
