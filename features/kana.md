---
layout: default
title: ふりがな
---

## 仕様

- `/kana` にアクセスすることでページにふりがなが振られる。
- 形態素解析には `Mecab` を使用している。
- ふりがなページは動的に表示される。
- ページを遷移するとふりがなは解除される。

## 設定

`config/kana.yml`

~~~
disable: false
location: /kana
mecab_indexer: /usr/local/libexec/mecab/mecab-dict-index
mecab_dicdir: /usr/local/lib/mecab/dic/ipadic
converter:
  kana-marks: [ "write-kana", "end-write-kana" ]
  skip-marks: [ "skip-kana", "end-skip-kana" ]
~~~

## ふりがなの範囲指定

`<!-- write-kana -->` と `<!-- end-write-kana -->` で囲むと、ふりがなを使用する範囲を設定できます。
`<!-- skip-kana -->` と `<!-- end-skip-kana -->` で囲むと、ふりがなを使用しない範囲を設定できます。
ふりがなの範囲指定に使用する文字は `config/kana.yml` から変更できます。

~~~
<!-- write-kana -->
  <p>ふりがなを使用する</p>
<!-- skip-kana -->
  <p>ふりがなを使用しない</p>
<!-- end-skip-kana -->
<!-- end-write-kana -->
~~~

## ソースコード

- <https://github.com/shirasagi/shirasagi/blob/master/config/defaults/kana.yml>
- <https://github.com/shirasagi/shirasagi/blob/master/app/controllers/concerns/kana/public_filter.rb>
