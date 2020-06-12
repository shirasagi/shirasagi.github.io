---
layout: default
title: 音声読み上げ
---

## 読み上げの Basic 認証

読み上げ機能では、リクエストされた URL にアクセスするため、
アクセス先が Basic 認証で保護されていると読み上げることができません。
この場合、Basic 認証のアカウントを設定することでアクセスできるようになります。

[Basic 認証環境での設定](/settings/basic_auth.html)

## 読み上げの設定

`config/voice.yml`（存在しない場合は `config/defaults/voice.yml` をコピー）で設定することができます。

SHIRASAGI の読み上げ機能は、内部では OpenJTalk を使っており、OpenJTalk に対してオプションを設定することで、
速度、トーンなどを調整することができます。

- 読み上げ速度を速くしたい場合、"-r 1.5" を追加（標準の 1.5 倍の速度で読み上げます）

  ~~~
  openjtalk:
    bin: /usr/local/bin/open_jtalk
    dic: /usr/local/dic
    voice: config/voices/mei_normal/mei_normal.htsvoice
    opts: "-s 48000 -p 200 -u 0.5 -jm 0.5 -jf 0.5 -r 1.5"
    max_length: 1024
    sox: /usr/local/bin/sox
  ~~~

- 読み上げ速度を遅くしたい場合、"-r 0.8" を追加（標準の 0.8 倍の速度で読み上げます）

  ~~~
  openjtalk:
    bin: /usr/local/bin/open_jtalk
    dic: /usr/local/dic
    voice: config/voices/mei_normal/mei_normal.htsvoice
    opts: "-s 48000 -p 200 -u 0.5 -jm 0.5 -jf 0.5 -r 0.8"
    max_length: 1024
    sox: /usr/local/bin/sox
  ~~~

上で取り上げた以外の代表的な OpenJtalk のオプションは次のとおりです。

| オプション | 意味 | 指定できる値 |
|------------|------|--------------|
| -p         | 速度 | 1 以上の整数 |
| -a         | 音質 | 0.0 ～ 1.0 |
| -r         | 話速 | 0.0 以上の小数点数 |
| -jf        | 抑揚 | 0.0 以上の小数点数 |


参考: <http://moblog.absgexp.net/openjtalk/>

## 読み上げの範囲指定

`<!-- read-voice -->` と `<!-- end-read-voice -->` で囲むと、音声読み上げを使用する範囲を設定できます。
`<!-- skip-voice -->` と `<!-- end-skip-voice -->` で囲むと、音声読み上げを使用しない範囲を設定できます。
`delete-tags` を編集することで読み上げないタグを設定できます。
`kuten-tags` を編集することで文字列を区切るタグを設定できます。
音声読み上げの範囲指定に使用する文字は `config/voice.yml` から変更できます。

~~~
scraper:
  voice-marks: [ "read-voice", "end-read-voice" ]
  skip-marks: [ "skip-voice", "end-skip-voice" ]
  delete-tags:
    - style
    - script
    - noscript
    - iframe
    - rb
    - rp
  kuten-tags:
    - h1
    - h2
    - h3
    - h4
    - h5
    - p
    - br
    - div
    - pre
    - blockquote
    - ul
    - ol
    - table
~~~

~~~
<!-- read-voice -->
  <p>読み上げる</p>
<!-- skip-voice -->
  <p>読み上げない</p>
<!-- end-skip-voice -->
<!-- end-read-voice -->
~~~

## 読み上げ使用時の Rack サーバの注意点

読み上げをご利用になる場合、必ず Rack サーバが 2 多重以上でリクエストを処理できることを確認して下さい。
Unicorn をご利用の場合 `config/unicorn.rb` を確認し、ワーカープロセス数を 2 以上に設定してください。

~~~
vi config/unicorn.rb
~~~

~~~
# 初期値は2
worker_processes Integer(ENV["WEB_CONCURRENCY"] || 2)
~~~
