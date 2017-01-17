---
layout: top
title: Job の開発
---

## 基底クラス

シラサギの Job は、Rails 標準の ActiveJob をほぼそのまま利用しますが、
一部、機能を拡張しています。

ActiveJob では次のようなジョブ・クラスを作成し、

~~~ruby
class ExampleJob < ApplicationJob
  def perform(param)
    puts "hello #{param}"
  end
end
~~~

次のように実行します。

~~~ruby
ExampleJob.perform_later('world')
~~~

シラサギで Job を開発する際、開発する機能に応じて継承する基底クラスが次のようになります。

モジュール名 | 基底クラス |
-----------|---------------------|
システム    | SS::ApplicationJob  |
CMS        | Cms::ApplicationJob |
GWS        | Gws::ApplicationJob |

## 実行コンテキスト

シラサギでジョブを実行する際、どのサイトをターゲットにしているのか、どのノードをターゲットとしているのかという実行コンテキストを把握することが重要です。
シラサギの Job では、実行コンテキストを指定する専用のメソッド `bind` を提供し、意味をわかりやすくしています。

サイトとノードを `bind` メソッドを使ってジョブに関連付けるには、次のようにします。

~~~ruby
ExampleJob.bind(site_id: @cur_site, node_id: @cur_node).perform_later('world')
~~~

関連付けられたサイトやノードは、`self.site` や `self.node` で取得することができます。
ジョブの実装例を下に示します。

~~~ruby
class ExampleJob < Cms::ApplicationJob
  def perform(param)
    puts "hello #{param} @ #{self.site.domain}, #{self.node.name}"
  end
end
~~~

`bind` に指定できるコンテキストはモジュールによって異なり、各モジュールでは、次のようなコンテキストを設定できます。

モジュール名 | site | group | user | node | page | member |
-----------|:-----:|:-----:|:----:|:----:|:----:|:------:|
システム    |  X    |   X   |  X   |      |      |        |
CMS        |  X    |   X   |  X   |  X   |  X   |   X    |
GWS        |  X    |       |  X   |      |      |        |

## ログの確認

Job 内から `Rails.logger` により出力したログは自動的に保存され、ジョブの実行履歴から確認することができます。

- [システム](http://demo.ss-proj.org/.sys/job/logs)
- [CMS](http://demo.ss-proj.org/.s1/job/logs)
- [GWS](http://demo.ss-proj.org/.g1/job/logs)

CMS や GWS で実行履歴を確認するには、ジョブの実行時にサイトをジョブに関連付けなければなりません。
サイトがジョブに関連付けられていない場合、システムのジョブ実行履歴から確認することができます。

    > ログレベルの設定は config/job.yml（ファイルが存在しない場合 config/defaults/job.yml をコピー） の log_level にあります。
    > ここで設定しているレベル以上のログが記録されます。

## 動作確認方法

画面から実行しログを確認（画面で確認できる）してもいいですし、
動作確認ついでに RSpec を書いてもいいですしが、お勧めは、次のように Rails コンソールでジョブを実行する方法です。

~~~ruby
ExampleJob.bind(site_id: Cms::Site.find(1), node_id: Cms::Node.find(138)).perform_later('world')
~~~

問題ある場合、ソースコードを修正し、Rails コンソールで `reload!` を実行すると修正が即座に読み込まれます。

    > どうせ検証するんだから最初から RSpec 書けよ！という意見はごもっともだと思います。
    > 好きなスタイルで開発してください。
