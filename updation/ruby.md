---
layout: default
title: Rubyの更新
---

#### Ruby(asdf)

v1.17.0 から ruby のバージョン管理ツールが asdf に変更になりました。
ruby を asdf でインストールした場合は以下のような手順で変更してください。

```
# asdf install ruby VERSION
# asdf global ruby VERSION
```

> `VERSION`: ruby のバージョンは[README.md](https://github.com/shirasagi/shirasagi/blob/stable/README.md)をご参照ください。

#### Ruby(rvm)

v1.17.0 から ruby のバージョン管理ツールが asdf に変更になりました。
従来通り rvm で管理する場合は、以下のような手順で変更してください。

```
# rvm get stable
# rvm install VERSION --disable-binary
# rvm use VERSION --default
```

> `VERSION`: ruby のバージョンは[README.md](https://github.com/shirasagi/shirasagi/blob/stable/README.md)をご参照ください。

`rvm get stable` を実行した際に `Warning, RVM 1.26.0 introduces signed releases and automated check of signatures ...` のようなエラーが表示された場合、次のコマンドを実行し、適切な GPG キーをインポートしてください。

```
command curl -sSL https://rvm.io/pkuczynski.asc | gpg --import -
```

参考: <https://github.com/rvm/rvm/issues/4533>

何もエラーが表示されない場合は GPG キーのインポートは不要です。

## Mecab Ruby

```
$ cd /usr/local/src/mecab-ruby-0.996
$ su -
# ruby extconf.rb
# make clean
# make
# make install
```

## 関連項目

Rubyのバージョンアップと合わせて、MongoDBのバージョンアップも必要になる場合があります。
MongoDBのバージョンアップについては以下のドキュメントを参照してください。

- [MongoDBの更新](mongodb.html)
- [MongoDB 6.0へのアップグレード](v4.4tov6.0.html)
- [MongoDB 7.0へのアップグレード](v6.0tov7.0.html)
- [MongoDB 8.0へのアップグレード](v7.0tov8.0.html)
