---
layout: default
title: CMSのサイト内検索
---

## 検索範囲・検索対象の限定

### 使用方法

グローバルナビなど全ページにわたって繰り返し出現する部分が検索にヒットすると、ノイズだと感じるかもしれません。
シラサギのCMSのサイト内検索には、検索範囲・検索対象の限定する機能が搭載されており、この機能を用いてグローバルナビのような検索するうえでノイズとなるような部分を除外することで、検索の精度を向上させることができます。

シラサギの既定の設定では HTML コメント `<!-- use-site-search -->` と `<!-- end-use-site-search -->` とで囲まれた範囲を検索範囲・検索対象とします。
シラサギの管理画面にログインし、レイアウトの編集から本文部分を `<!-- use-site-search -->` と `<!-- end-use-site-search -->` とで囲んでやることで、検索の精度を向上させることができます。

例:

{% raw %}
~~~html
  <div class="cms-sns_share-wrap">
    {{ part "sns" }}
    <div class="released">
      #{time.page_released.long}
    </div>
  </div><!-- .cms-sns_share-wrap -->

  <!-- use-site-search -->
  <div class="yield-wrap">
    {{ yield }}
  </div>
  <!-- end-use-site-search -->
  <div class="copy-wrap">
    {{ part "copy" }}
    {{ part "print" }}
  </div><!-- /.copy-wrap -->
~~~
{% endraw %}

### 設定

HTML コメント `<!-- use-site-search -->` と `<!-- end-use-site-search -->` とは、config/cms.yml（存在しない場合は config/defaults/cms.yml をコピー）で変更することができ、cms.yml にある以下の設定を変更することで、検索範囲・検索対象を限定する HTML コメントを変更することができます。

~~~
  elasticsearch:
    site-search-marks: [ "use-site-search", "end-use-site-search" ]
~~~
