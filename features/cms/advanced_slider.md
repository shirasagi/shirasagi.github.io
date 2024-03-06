---
layout: default
title: 高度なスライダーの利用
---

本ページに記載の機能はSHIRASAGI v1.19以降で利用できます。

## はじめに

標準のスライドパーツでは制作時に発生する細かな要望・要件に対応できない場合があります。

シラサギには[Swiper Element (WebComponent)](https://swiperjs.com/element)が組み込まれており、これと記事リストパーツなどと組み合わせて、標準のスライドパーツでは実現できないようなスライドを制作することができます。

本ページでは、作例をいくつか紹介します。本ページで紹介する作例を正しく動作させるために、レイアウトに次の2行を設定する必要があります。

~~~html
<link rel="stylesheet" media="all" href="/assets/swiper.css">
<script src="/assets/swiper.js" defer="defer"></script>
~~~

ここで紹介した作成以外にも様々な作例が[Swiperのデモページ](https://swiperjs.com/demos)に照会されているので参考にしてください。

## 作例1

### 使用コンテンツ

- フォルダー: 記事リスト
- ページ: 標準の記事ページ
- パーツ: 記事リスト

### 準備

スライド表示したい画像を記事ページのサムネイルに設定しておきます。

### 例

パーツのループHTML形式を「Liquid」へ変更し、ループHTMLに次のように設定します。

{% highlight HTML %}
{% raw %}
<swiper-container id="slider-157" navigation="true" pagination="true"
    pagination-clickable="true" slides-per-view="auto" centered-slides="true"
    space-between="30" speed="500" loop="true" autoplay-delay="3000"
    style="width: 100%; height: 280px; position: relative;">
  {% for page in pages %}
    <swiper-slide style="width: 520px">
      <img alt="{{ page.name }}" src="{{ page.thumb.url }}" width="520" height="240" />
    </swiper-slide>
  {% endfor %}
  
  <div slot="container-end">
    <button type="button" name="pause-or-resume" style="position: absolute; bottom: 8px; right: 380px; z-index: 100">
      <span class="resume">再生</span>
      <span class="pause">停止</span>
    </button>
  </div>
</swiper-container>

<script>
  document.addEventListener("DOMContentLoaded", () => {
    const swiperContainer = document.getElementById("slider-157");
    const buttonElement = swiperContainer.querySelector("[name='pause-or-resume']");
    
    const updateButton = () => {
      if (swiperContainer.swiper.autoplay.running) {
        buttonElement.querySelector(".resume").style.display = "none";
        buttonElement.querySelector(".pause").style.display = "";
      } else {
        buttonElement.querySelector(".resume").style.display = "";
        buttonElement.querySelector(".pause").style.display = "none";
      }
    };
    
    buttonElement.addEventListener("click", () => {
      if (swiperContainer.swiper.autoplay.running) {
        swiperContainer.swiper.autoplay.stop();
      } else {
        swiperContainer.swiper.autoplay.start();
      }
      updateButton();
    });
    
    updateButton();
  });
</script>
{% endraw %}
{% endhighlight %}

### 作例1のイメージ

![作例1](/features/cms/advanced-slider-example-1.png)

## 作例2

### 使用コンテンツ

- フォルダー: 記事リスト
- ページ: 定型フォーム「インタビュー」の記事ページ
- パーツ: 記事リスト

### 準備

スライド表示したい画像を定型フォーム「インタビュー」の項目「画像」に設定しておきます。

### 例

パーツのループHTML形式を「Liquid」へ変更し、ループHTMLに次のように設定します。

{% highlight HTML %}
{% raw %}
<swiper-container id="slider-158" slides-per-view="auto" centered-slides="true"
    space-between="30" speed="500" autoplay-delay="3000" loop="true">
  {% for page in pages %}
    <swiper-slide style="width: 280px">
      <a href="{{ page.url }}"
          style="display: flex; flex-direction: column; gap: 10px; padding: 20px; border-radius: 10px; background-color: #fff; text-decoration: none;">
        <img alt="{{ page.name }}" src="{{ page.values["画像"].file.url }}"
            width="240" height="176" style="border-radius: 10px;" />
        <div>{{ page.name }}</div>
        <div>
          {% for category in page.categories %}
          <span style="padding: 5px; border-radius: 10px; font-size: 80%; color: #555; background-color: #bbb">{{ category.name }}</span>
          {% endfor %}
        </div>
      </a>
    </swiper-slide>
  {% endfor %}
</swiper-container>
{% endraw %}
{% endhighlight %}

### 作例2のイメージ

![作例2](/features/cms/advanced-slider-example-2.png)
