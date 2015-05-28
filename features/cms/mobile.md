---
layout: default
title: 端末別表示
---

## 仕様

- CSS によるレスポンシブデザインを前提としている。
- スマートフォン端末でも PC 画面を利用することができる。
- フィーチャーフォン端末には専用のURLが用意される。

## スマートフォン端末でのPC画面表示

- 特定の属性を持つ HTML を記述しておくことで、端末別に切り替えリンクが自動的に表示される。
- 切り替え情報はクッキーに保存されるため、ページ遷移後も表示は持続する。

HTML 記述例

```
<footer id="ss-pc" style="display: none">PC View</footer>
<footer id="ss-mb" style="display: none">Mobile View</footer>
```

### ソースコード

- https://github.com/shirasagi/shirasagi/blob/master/app/assets/javascripts/ss/lib/mobile.coffee

## フィーチャーフォン端末での表示

- `/mobile/` にアクセスすることで端末専用の画面が表示される。
- 元の HTML が端末用に自動変換処理されて表示される。
- `/mobile.css` を設置することでデザインを変更することができる。

### 自動変換処理

- 使用できないタグは自動変換される。`<article>` → `<div class="tag-article">`
- 特定の画像(`<img>`)はリンクに置換される。

### 設定

`config/mobile.yml`

```
location: /mobile
```

### ソースコード

- https://github.com/shirasagi/shirasagi/blob/master/config/samples/mobile.yml
- https://github.com/shirasagi/shirasagi/blob/master/app/controllers/concerns/mobile/public_filter.rb
- https://github.com/shirasagi/shirasagi/blob/master/lib/mobile/converter.rb

