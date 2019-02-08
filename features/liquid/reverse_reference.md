---
layout: default
title: 逆引きリファレンス
---

SHIRASAGI 形式から Liquid 形式への変換表です。

| SHIRASAGI 形式       | Liquid 形式
|---------------------|--------------|
| #{class}            | {% raw %}{{ page.css_class }}{% endraw %} |
| #{class_categories} | {% raw %}{{ page.categories \| map: "basename" \| ss_prepend: "item-" \| join: " " }}{% endraw %}
| #{date}             | {% raw %}{{ page.date \| ss_date }}{% endraw %}
| #{date.default}     | {% raw %}{{ page.date \| ss_date: "default" }}{% endraw %}
| #{date.iso}         | {% raw %}{{ page.date \| ss_date: "iso" }}{% endraw %}
| #{date.long}        | {% raw %}{{ page.date \| ss_date: "long" }}{% endraw %}
| #{date.short}       | {% raw %}{{ page.date \| ss_date: "short" }}{% endraw %}
| #{time}             | {% raw %}{{ page.date \| ss_time }}{% endraw %}
| #{time.default}     | {% raw %}{{ page.date \| ss_time: "default" }}{% endraw %}
| #{time.iso}         | {% raw %}{{ page.date \| ss_time: "iso" }}{% endraw %}
| #{time.long}        | {% raw %}{{ page.date \| ss_time: "long" }}{% endraw %}
| #{time.short}       | {% raw %}{{ page.date \| ss_time: "short" }}{% endraw %}
| #{url}              | {% raw %}{{ page.url }}{% endraw %}
| #{name}             | {% raw %}{{ page.index_name \| default: page.name }}{% endraw %}
| #{summary}          | {% raw %}{{ page.summary }}{% endraw %}
| #{html}             | {% raw %}{{ page.html }}{% endraw %}
| #{current}          | {% raw %}{% if page.current? %}current{% endif %}{% endraw %}
| #{new}              | {% raw %}{% if page.new? %}new{% endif %}{% endraw %}
| #{id}               | {% raw %}{{ page.id }}{% endraw %}
| #{group}            | {% raw %}{{ page.groups[0].last_name }}{% endraw %}
| #{groups}           | {% raw %}{{ page.groups \| map: "last_name" \| join: ", " }}{% endraw %}
| #{img.src}          | {% raw %}{% assign img_src = page.html \| ss_img_src \| expand_path: page.parent.url %}<br />{{ img_src \| default: "/assets/img/dummy.png" }}{% endraw %}
| #{thumb.src}        | {% raw %}{% assign thumb_src = page.thumb.thumb_url %}<br />{% assign img_src = page.html \| ss_img_src \| expand_path: page.parent.url %}<br />{{ thumb_src \| default: img_src \| default: "/assets/img/dummy.png" }}{% endraw %}
| #{categories}       | {% raw %}{% for category in page.categories %}<br/>&lt;span class="{{ category.filename \| replace: "/", "-" }}><br />  &lt;a href="{{ category.url }}>{{ category.name }}&lt;/a><br />&lt;/span><br />{% endfor %}{% endraw %}
| #{pages.count}      | {% raw %}{{ node.pages \| size }}{% endraw %}
| #{tags}             | {% raw %}{{ page.tags \| join: " " }}{% endraw %}
| #{event_dates}      | {% raw %}{% for event_date_range in page.event_dates %}<br />  {% if event_date_range.size == 1 %}<br />    &lt;time datetime="{{ event_date_range.first }}">{{ event_date_range.first \| ss_date }}&lt;/time><br />  {% else %}<br />    &lt;time datetime="{{ event_date_range.first }}">{{ event_date_range.first \| ss_date }}&lt;/time><br />〜<br />&lt;time datetime="{{ event_date_range.last }}">{{ event_date_range.last \| ss_date }}&lt;/time><br />  {% endif %}<br />{% endfor %}{% endraw %}
| #{event_dates.default} | 上記の `ss_date` の箇所を `ss_date: "default"` へ変更 |
| #{event_dates.default_full} | 上記の `ss_date` の箇所を `ss_date: "default_full"` へ変更 |
| #{event_dates.iso} | 上記の `ss_date` の箇所を `ss_date: "iso"` へ変更 |
| #{event_dates.iso_full} | 上記の `ss_date` の箇所を `ss_date: "iso_full"` へ変更 |
| #{event_dates.long} | 上記の `ss_date` の箇所を `ss_date: "long"` へ変更 |
| #{event_dates.full} | 上記の `ss_date` の箇所を `ss_date: "full"` へ変更 |
| #{event_deadline}  | {% raw %}{{ page.event_deadline \| ss_date }}{% endraw %}
| #{event_deadline.default} | {% raw %}{{ page.event_deadline \| ss_date: "default" }}{% endraw %}
| #{event_deadline.iso} | {% raw %}{{ page.event_deadline \| ss_date: "iso" }}{% endraw %}
| #{event_deadline.long} | {% raw %}{{ page.event_deadline \| ss_date: "long" }}{% endraw %}
| #{event_deadline.short} | {% raw %}{{ page.event_deadline \| ss_date: "short" }}{% endraw %}
