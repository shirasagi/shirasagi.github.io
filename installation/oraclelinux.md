---
layout: default
title: インストールマニュアル - OracleLinux
---

## 検証環境

以下の OracleLinux で動作を確認しています。

- Oracle Linux Server release 8.10

上記以外のバージョンでも動作可能だとは思いますが、自己責任でインストールしてください。

## パッケージのダウンロード

```
$ sudo dnf -y install oracle-epel-release-el8 wget
$ sudo dnf -y groupinstall "Development tools"
$ sudo dnf --enablerepo=ol8_codeready_builder install -y libyaml-devel ImageMagick ImageMagick-devel openssl-devel
```

---

その他のインストール手順は [AlmaLinux](almalinux.html) を参考にしてください。
