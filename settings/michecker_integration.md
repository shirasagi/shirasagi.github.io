---
layout: default
title: miChecker との連携
---

[みんなのアクセシビリティ評価ツール：miChecker (エムアイチェッカー)Ver.2.0](https://www.soumu.go.jp/main_sosiki/joho_tsusin/b_free/michecker.html)（以下 miChecker と省略）とシラサギを連携させることができます。

ここでは、miChecker のインストール方法およびシラサギでの設定方法を解説します。

## miChecker のインストール

「みんなのアクセシビリティ評価ツール：miChecker (エムアイチェッカー)Ver.2.0」を Linux 上で動作するように改変したバージョンをインストールします。
オリジナルの Windows 版の miChecker とシラサギとは連携できないので注意してください。

シラサギでは [Docker 版の miChecker](https://github.com/shirasagi/docker-michecker) を提供しています。
これをインストールするのがもっとも手っ取り早いですが、Docker のコンテナ内からシラサギの管理画面へアクセス可能でなければなりません。
この制約が満たせない場合は、以下を参考に手動でインストールしてください。

手動でインストールされる方は、次の手順でインストールしてください。

1. Java 8 64bit 版をインストール（JRE で構いません）
2. Google Chrome ブラウザか Chronium ブラウザをインストール
3. Noto CJK フォントをインストール（Web フォントは不可）
4. [miChecker のバイナリーをダウンロード](https://github.com/shirasagi/docker-michecker/raw/main/assets/michecker.tar.bz2) し /opt 以下に展開

3 の手順は省略可能で、別のフォント（IPA など）を利用することも可能です。要件に応じて適切なフォントをインストールしてください。

> Noto CJK フォントでも異体字はサポートされているようですが、おそらく異体字に関しては IPA フォントの方が実績があるかと思います。
> 異体字を正しく正確に表示しなければならない要件で、安心が欲しい場合は IPA フォントをお勧めします。

4 のインストール場所は /opt 以外でも動作するかと思います。

詳細は <https://github.com/shirasagi/docker-michecker/blob/main/Dockerfile> を参考に、
お使いの OS に応じてインストールしてください。

## miChecker のテスト

Docker 版をご利用の方は以下のコマンドを実行、

~~~
docker run --rm --name michecker -v "$PWD":/home -w /home shirasagi/michecker \
  /opt/michecker/bin/michecker --no-interactive --no-sandbox --lang=ja-JP \
  --html-checker-output-report=hc-report.json \
  --lowvision-output-report=lv-report.json \
  --lowvision-source-image=lv-source.png \
  --lowvision-output-image=lv-output.png \
  "https://www.ss-proj.org/"
~~~

手動でインストールされた方は以下のコマンドを実行してみてください（/opt 以外の場所にインストールされた方は適時実行コマンドを変更）。

~~~
/opt/michecker/bin/michecker --no-interactive --no-sandbox --lang=ja-JP \
  --html-checker-output-report=hc-report.json \
  --lowvision-output-report=lv-report.json \
  --lowvision-source-image=lv-source.png \
  --lowvision-output-image=lv-output.png \
  "https://www.ss-proj.org/"
~~~

カレントディレクトリに `hc-report.json`, `lv-report.json`, `lv-source.png`, `lv-output.png` の 4 つのファイルが作成されていれば正しくインストールされています。
念のため、各ファイルの中身を確認してみてください。

## シラサギと miChecker の連携

### 設定ファイル

シラサギの設定ファイル `config/michecker.yml` （存在しない場合は `config/defaults/michecker.yml` をコピー）をテキストエディタで開きます。
設定ファイルの先頭部分を次のように変更します。

Docker 版 miChecker をご利用の方:

~~~
production: &production
  disable: false
  command: [ "bin/docker-michecker.sh" ]
~~~

手動でインストールされた方（/opt 以外の場所にインストールされた方は適時実行コマンドを変更）:

~~~
production: &production
  disable: false
  command: [ "/opt/michecker/bin/michecker", "--no-sandbox", "--lang=ja-JP" ]
~~~

設定を変更したらシラサギを再起動します。

#### タイムアウト設定

安定して運用するため、あるいは不測の事態に備えて、miChecker を実行する際にタイムアウトを設定することをお勧めします。
タイムアウトを設定するには次の様に設定ファイルを変更します。

Docker 版 miChecker をご利用の方:

~~~
production: &production
  disable: false
  command: [ "/usr/bin/timeout", "10m", "bin/docker-michecker.sh" ]
~~~

手動でインストールされた方（/opt 以外の場所にインストールされた方は適時実行コマンドを変更）:

~~~
production: &production
  disable: false
  command: [ "/usr/bin/timeout", "10m", "/opt/michecker/bin/michecker", "--no-sandbox", "--lang=ja-JP" ]
~~~

ここでは 10 分（10m）のタイムアウト設定しています。ご利用の CPU やネットワークの性能によって、適時変更してください。

> Mac をご利用の方は、brew で coreutils をインストール後、"/usr/bin/timeout" ではなく "/usr/local/bin/timeout" を設定してください。

### 権限

シラサギの管理画面へログインし、サイト設定 - 権限/ロールの編集画面から権限「micheckerの利用」にチェックをつけて保存してください。
権限「micheckerの利用」が見つからない場合は、設定ファイルが正しいかどうか確認してください。

### 動作確認

権限を設定したユーザーでシラサギの管理画面へログインし、適当な記事ページを作成してください。
作成すると上部に「miChecker で確認する」というメニューがあるのでクリックします。
「miChecker で確認する」というメニューが表示されない場合は、権限が適切に設定されているかどうかを確認してください。

別タブが開き miChecker 実行画面が表示されます。
miChecker 実行画面の下部にある「miChecker を実行し結果を確認する」ボタンをクリックしてください。

miChecker がバックグラウンドで実行され、2〜3 分すると結果が表示されます。

### 管理とトラブルシューティング

miChecker はバックグラウンドで実行されるため実行の詳細は サイト設定 - ジョブ - 実行履歴で確認することができます。
動作に支障がある場合は、まず実行履歴を確認するようにしてください。

miChecker は実行結果を保存し、再アクセスの際には保存した結果を表示することで利便性を向上させています。
miChecker の実行結果は サイト設定 - ジョブ - miChecker結果 で確認することができます。
動作に支障がある場合は、miChecker結果を削除することで改善する可能性があります。

Docker 版 miChecker をご利用の方向けの注意事項として、miChecker はシラサギの管理画面のページプレビューへアクセスし DOM ツリーを取得したり、スクリーンショットを取得したりする都合上、Docker コンテナ内からシラサギの管理画面へアクセス可能でなければなりません。
Docker コンテナ内からシラサギの管理画面へアクセスできない場合は "No resource with given URL found" のようなエラーが発生します。
