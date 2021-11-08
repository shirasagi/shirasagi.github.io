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

### SHIRASAGI の environment.yml

SHIRASAGI v1.15.0 以降では、管理画面に Nginx の制限値を表示するようになりました。
Nginx の設定値を自動的に取得する仕組みが備わっていますが、自動取得が成功するかどうかは環境依存のため動作が不安定です。
そのため SHIRASAGI の `config/environment.yml` の `nginx_client_max_body_size` に Nginx に設定したのと同じ値を設定するようにしてください。

## SHIRASAGI の environment.yml

`config/environment.yml` の `max_filesize` が 100 MiB に設定されており、
100 MiB より大きなファイルをアップロードできません。

100 MiB より大きなファイルをアップロードしたい場合 `max_filesize` の値を変更します。

`config/environment.yml` が存在しない場合 `config/defaults/environment.yml` を `config/environment.yml` にコピーし、
`max_filesize` の値を変更します。

## SHIRASAGI のファイルサイズ制限

SHIRASAGI のシステム設定で、ファイル拡張子ごとに最大ファイルサイズを設定することができます。

参考: <http://demo.ss-proj.org/.sys/max_file_sizes> (`sys` / `pass` でログイン)

100 MiB より大きなファイルをアップロードしたい場合、適切なファイル拡張子のファイルサイズ制限を変更し
100 MiB より大きな値を設定します。

この設定は SHIRASAGI の `config/environment.yml` の `max_filesize` より優先しますが、Nginx の `client_max_body_size` を超えることはできません。

ファイル拡張子が定義されていない場合 SHIRASAGI の `config/environment.yml` の設定値が適用されます。

## 設定例

### 例1

| 項目名                          | 設定値 |
|---------------------------------|------|
| Nginx の `client_max_body_size` | 300M |
| `config/environment.yml` の `max_filesize` | 100M |
| ファイル拡張子 `PDF` の制限サイズ | 200M |

PDF の制限サイズはファイル拡張子ごとの設定値が適用されるため 200M となり、PDF 以外のファイルの制限サイズは `config/environment.yml` の `max_filesize` に設定した設定値が適用されるため 100M となります。


### 例2

| 項目名                          | 設定値 |
|---------------------------------|------|
| Nginx の `client_max_body_size` | 100M |
| `config/environment.yml` の `max_filesize` | 200M |
| 拡張子 `PDF` の制限サイズ | 300M |

Nginx の `client_max_body_size` を超えることはできないため、PDF の制限サイズもPDF 以外のファイルの制限サイズも 100M になります。
