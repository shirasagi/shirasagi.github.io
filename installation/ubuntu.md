---
layout: default
title: インストールマニュアル - Ubuntu
---

## 検証環境

以下の Ubuntu で動作を確認しています。

- Ubuntu Server 20.04 LTS/64bit

上記以外のバージョンでも動作可能だとは思いますが、自己責任でインストールしてください。

## パッケージのダウンロード

```
$ sudo apt -y install imagemagick libmagickcore-dev libmagickwand-dev gnupg2 git wget
```

## MongoDB のインストール

```
$ wget -qO - https://www.mongodb.org/static/pgp/server-4.4.asc | sudo apt-key add -
$ echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu focal/mongodb-org/4.4 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-4.4.list
$ sudo apt update
$ sudo apt install -y mongodb-org
```

### 上記以外のバージョンをご利用の方

MongoDB の [Official installation](https://docs.mongodb.com/manual/tutorial/install-mongodb-on-ubuntu/) を参照してください。

### MongoDB の推奨設定

MongoDB を起動する前に [MongoDB の推奨設定を適用する方法](/installation/mongodb-settings.html) を参照の上、追加の設定を適用してください。

---

その他のインストール手順は [CentOS](manual.html) を参考にしてください。
