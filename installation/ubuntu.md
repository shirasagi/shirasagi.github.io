---
layout: default
title: インストールマニュアル - Ubuntu
---

## 検証環境

以下の Ubuntu で動作を確認しています。

- Ubuntu Server 22.04 LTS/64bit

上記以外のバージョンでも動作可能だとは思いますが、自己責任でインストールしてください。

## パッケージのダウンロード

```
$ sudo apt -y install build-essential libssl-dev imagemagick libmagickcore-dev libmagickwand-dev gnupg2 git wget software-properties-common ca-certificates lsb-release libyaml-dev
```

## MongoDB のインストール

```
$ sudo apt install wget gnupg software-properties-common ca-certificates lsb-release
$ suod wget -qO - https://www.mongodb.org/static/pgp/server-6.0.asc |sudo gpg --dearmor -o /etc/apt/trusted.gpg.d/mongodb-6.gpg
$ sudo echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu $(lsb_release -cs)/mongodb-org/7.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-7.0.list
# sudo apt update
# sudo apt install -y mongodb-org
```

### 上記以外のバージョンをご利用の方

MongoDB の [Official installation](https://docs.mongodb.com/manual/tutorial/install-mongodb-on-ubuntu/) を参照してください。

### MongoDB の推奨設定

MongoDB を起動する前に [MongoDB の推奨設定を適用する方法](/installation/mongodb-settings.html) を参照の上、追加の設定を適用してください。

---

その他のインストール手順は [AlmaLinux](almalinux.html) を参考にしてください。
