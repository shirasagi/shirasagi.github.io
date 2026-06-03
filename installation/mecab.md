---
layout: default
title: インストールマニュアル - Mecab のソースコンパイル
---

## Mecab ソースファイルのダウンドードおよびインストール

```
$ sudo chmod 777 /usr/local/src
$ cd /usr/local/src
$ wget -O mecab-0.996.tar.gz "https://github.com/katayama-webtips/mecab/raw/refs/heads/main/mecab-0.996.tar.gz"
$ wget -O mecab-ipadic-2.7.0-20070801.tar.gz "https://github.com/katayama-webtips/mecab/raw/refs/heads/main/mecab-ipadic-2.7.0-20070801.tar.gz"
$ wget -O mecab-ruby-0.996.tar.gz "https://github.com/katayama-webtips/mecab/raw/refs/heads/main/mecab-ruby-0.996.tar.gz"
$ wget https://raw.githubusercontent.com/shirasagi/shirasagi/stable/vendor/mecab/mecab-ipadic-2.7.0-20070801.patch

$ cd /usr/local/src
$ tar xvzf mecab-0.996.tar.gz && cd mecab-0.996
$ ./configure --enable-utf8-only && make && make install

$ cd /usr/local/src
$ tar xvzf mecab-ipadic-2.7.0-20070801.tar.gz && cd mecab-ipadic-2.7.0-20070801
$ patch -p1 < ../mecab-ipadic-2.7.0-20070801.patch
$ ./configure --with-charset=UTF-8 && make && make install

$ cd /usr/local/src
$ tar xvzf mecab-ruby-0.996.tar.gz && cd mecab-ruby-0.996
$ ruby extconf.rb && make && make install

$ echo "/usr/local/lib" >> /etc/ld.so.conf
$ ldconfig
```
