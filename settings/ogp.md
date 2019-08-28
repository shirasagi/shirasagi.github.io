---
layout: default
title: OGP と Twitter Card 設定
---

シラサギは標準で OGP タグおよび Twitter Card タグを出力することができますが、
既定では両方とも off になっています。

ここでは、シラサギの OGP タグおよび Twitter Card タグを出力する方法を解説します。


## OGP

OGP タグの出力を有効にするには、シラサギの管理画面にログインし、左のナビメニューから「サイト設定」 - 「サイト情報」とたどり、「編集する」をクリックします。
設定画面の「Facebook 設定」のうち、次の項目を適切に設定します。

| 設定項目    | 必須 | 解説 | 
|-----------|-----|-----|
| OpenGraph | yes | 「記事」を選択すると OGP タグが出力されるようになります。「なし」とすると、OGP タグは出力されません。既定値は「なし」です。
| App ID    | no  | Facebook のアプリケーション ID を設定します。省略することができ、設定すると、トラフィックを分析することができる [Facebook インサイト](https://www.facebook.com/help/794890670645072) を利用することができるようになります。
| ページURL  | no  | Facebook ページの URL を設定します。設定すると "article:author" と "article:publisher" とが出力されるようになります。
| 既定の画像URL | no  | コンテンツに画像が含まれていない場合に og:image に出力する画像を設定します。

OGP タグの出力を有効にすると、次の OGP タグが出力されるようになります。

| OGP タグ   | 解説 |
|-----------|-----|
| fb:app_id | サイト情報の Facebook 設定の App ID が設定されていれば、その内容を出力します。App ID が未設定の場合、このタグを出力しません。
| article:author | サイト情報の Facebook 設定のページ URL が設定されていれば、その内容を出力します。ページ URL が未設定の場合、このタグを出力しません。
| article:publisher | article:author と同じものを出力します。
| og:type | サイト情報の Facebook 設定の OpenGraph が「記事」の場合、"article" を出力します（現在のシラサギでは「記事」のみが選択可能な種別のため、常に "article" を出力します）。
| og:url | コンテンツの URL を出力します。
| og:site_name | サイト情報の基本情報のサイト名を出力します。
| og:title | コンテンツが一覧ページの場合（index.html の場合）は、og:site_name と同じものを、それ以外の場合は、ページのタイトルとサイト名とをハイフンで連結したものを出力します。
| og:description | コンテンツの本文（先頭から最大 200 文字）を出力します。
| og:image | 次の順番で出力します。<br><br>1. コンテンツのサムネイル<br>2. コンテンツの本文に含まれる画像を上から順に<br><br>コンテンツに複数の画像が設定されている場合は、その全てを出力します。<br><br>1 でも 2 でも画像が見つからず、サイト情報の Facebook 設定の「既定の画像URL」が設定されている場合、既定の画像URLを出力します。

Facebook 上での見え方を確認するには facebook for developers のシェアデバッガーが利用できます。

- facebook for developers のシェアデバッガー<br><https://developers.facebook.com/tools/debug/>


## Twitter Card

Twitter Card タグの出力を有効にするには、シラサギの管理画面にログインし、左のナビメニューから「サイト設定」 - 「サイト情報」とたどり、「編集する」をクリックします。
設定画面の「Twitter 設定」のうち、次の項目を適切に設定します。

| 設定項目    | 必須 | 解説 | 
|-----------|-----|-----|
| カード形式  | yes  | 「サマリー形式」か「大きな画像形式」を選択すると Twitter Card タグが出力されるようになります。「なし」とすると、Twitter Card タグは出力されません。既定値は「なし」です。
| ユーザー名 | no  | 設定すると "twitter:site" に設定内容を出力します。
| 既定の画像URL | no  | コンテンツに画像が含まれていない場合に twitter:image に出力する画像を設定します。

Twitter Card タグの出力を有効にすると、次の Twitter Card タグが出力されるようになります。

| Twitter Card タグ | 解説 |
|------------------|-----|
| twitter:card     | サイト情報の Twitter 設定のカード形式が「サマリー形式」の場合 "summary" を、「大きな画像形式」の場合 "summary_large_image" を出力します。
| twitter:site     | サイト情報の Twitter 設定のユーザー名が設定されていれば、その内容を出力します。ユーザー名が未設定の場合、このタグを出力しません。
| twitter:url      | コンテンツの URL を出力します。
| twitter:title    | コンテンツが一覧ページの場合（index.html の場合）は、サイト情報の基本情報のサイト名を、それ以外の場合は、ページのタイトルとサイト名とをハイフンで連結したものを出力します。
| twitter:description | コンテンツの本文（先頭から最大 200 文字）を出力します。
| twitter:image    | 次の順番で画像を検索し、最初に見つけた画像を出力します。<br><br>1. コンテンツのサムネイル<br>2. コンテンツの本文に含まれる画像<br><br>1 でも 2 でも画像が見つからず、サイト情報の Twitter 設定の「既定の画像URL」が設定されている場合、既定の画像URLを出力します。
| og:url           | OGP タグが無効で、Twitter Card 形式が有効の場合 "og:url" を出力します。

Twitter 上での見え方を確認するには Twitter Card Validator というツールが利用できます。

- Twitter Card Validator<br><https://cards-dev.twitter.com/validator>
