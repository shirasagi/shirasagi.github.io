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

```
location: /kana
```

## ソースコード

- https://github.com/shirasagi/shirasagi/blob/master/config/samples/kana.yml
- https://github.com/shirasagi/shirasagi/blob/master/app/controllers/concerns/kana/public_filter.rb
