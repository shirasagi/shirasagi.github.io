---
layout: top
title: リストノード/パーツとループ HTML 変数の定義と拡張
---

本章では、シラサギのリストノード/パーツの概観を説明した後、
ループ HTML 変数の定義と拡張方法を解説します。

## リストパーツ/ノード

シラサギでは一覧を表示するためのノードとパーツが標準で用意されています。
これらのノードとパーツにはリスト表示アドオンが組み込まれています。

![リスト表示アドオン](/images/page_list_addon.png)

リスト表示アドオンの上部HTML、ループHTML、下部HTMLで一覧の表示を変更することができ、
ループHTML には `#{date.long}` や `#{index_name}` のような変数を埋め込むことができます。

## ループ HTML 変数の定義

### 基本定義

ループ HTML 変数を定義するには、`template_variable_handler` を使います。
具体例として標準の `#{class}` の定義を見てみます。

~~~
module Cms::TemplateVariable
  extend ActiveSupport::Concern

  included do
    template_variable_handler(:class, :template_variable_handler_class)
  end

  private
    def template_variable_handler_class(name, issuer)
      self.basename.sub(/\..*/, "").dasherize
    end
end
~~~

`template_variable_handler` の第1引数には変数名を、第2引数にはループ HTML で変数が使われたときに呼び出されるメソッドをシンボルで指定します。


呼び出されるメソッドの方では 2 つの引数を取り、第1引数 `name` にはループ HTML で使われた変数名が、第2引数 `issuer` には、ノードのループ HTML を展開している場合にはそのノードを、
パーツのループ HTML を展開している場合にはそのパーツがそれぞれ渡されます。

### ブロック渡し

`template_variable_handler` の第2引数は省略することができ、シンボルの代わりにブロックを渡すと、ループ HTML で変数が使われたときに渡したブロックが呼び出されます。
標準の `#{date.long}` は次のようにブロック渡しを用いて定義されています。

~~~
module Cms::TemplateVariable
  extend ActiveSupport::Concern

  included do
    template_variable_handler(:date, :template_variable_handler_date)
    template_variable_handler('date.default') { |name, issuer| template_variable_handler_date(name, issuer, :default) }
    template_variable_handler('date.iso') { |name, issuer| template_variable_handler_date(name, issuer, :iso) }
    template_variable_handler('date.long') { |name, issuer| template_variable_handler_date(name, issuer, :long) }
    template_variable_handler('date.short') { |name, issuer| template_variable_handler_date(name, issuer, :short) }
  end

  private
    def template_variable_handler_date(name, issuer, format = nil)
      if format.nil?
        I18n.l self.date.to_date
      else
        I18n.l self.date.to_date, format: format.to_sym
      end
    end
end
~~~

この定義では、`#{date}` がループ HTML で用いられると、メソッド `template_variable_handler_date` を呼び出し、
`#{date.long}` がループ HTML で用いられると、メソッド `template_variable_handler_date` の第3引数に `:long` を指定して呼び出します。

`template_variable_handler` にはシンボルかブロックのどちらかを渡さなければなりません。

### ハンドラーの第1引数: name

複数のループ HTML 変数を一つのメソッドに関連付ける場合、どの変数が用いられたかを第1引数 `name` を使って判別することができます。
`#{name}` や `#{url}` がループ HTML で用いられると メソッド `template_variable_handler_name` が呼び出されます（以下のコード）。

~~~
module Cms::TemplateVariable
  extend ActiveSupport::Concern

  included do
    template_variable_handler(:name, :template_variable_handler_name)
    template_variable_handler(:url, :template_variable_handler_name)
  end

  private
    def template_variable_handler_name(name, issuer)
      ERB::Util.html_escape self.send(name)
    end
end
~~~

`template_variable_handler_name` では、ループ HTML で用いられた変数名に応じた属性値を取得しています。

### ハンドラーの第2引数 issuer

ノードやパーツの設定値を参照したい場合 `issuer` を使って参照することができます。

リスト表示アドオンには「NEWマーク期間」という設定があります。
`#{new}` というループ HTML 変数は、リスト表示アドオンに設定された「NEWマーク期間」を参照し、ページが新しいかどうかを判定しています（以下のコード）。

~~~
module Cms::TemplateVariable
  extend ActiveSupport::Concern

  included do
    template_variable_handler(:new, :template_variable_handler_new)
  end

  private
    def template_variable_handler_new(name, issuer)
      issuer.respond_to?(:in_new_days?) && issuer.in_new_days?(self.date) ? "new" : nil
    end
end
~~~

`#{new}` がループ HTML 内で用いられると、ノードまたはパーツのメソッド `in_new_days?` を用いてページが新しかどうかをチェックし、新しい場合は "new" を返しています。

メソッド `in_new_days?` の定義はというと:

~~~
module Cms::Addon::List
  module Model
    extend ActiveSupport::Concern

    def in_new_days?(date)
      date + new_days > (@cur_date || Time.zone.now)
    end
  end
end
~~~

NEWマーク期間は `new_days` という属性に設定されています。
引数 `date`（つまりページの日時）と `new_days` とを用いて日付が新しいかどうかを判定しています。


## ループHTML変数の拡張

標準のループ HTML 変数で足りない場合、ループ HTML 変数を増やします。
増やすには Ruby コードを修正する必要があります。

シラサギには本文パーツという機能があります。
具体例として本文パーツをループ HTML で取れるように拡張してみます。

~~~
module Cms::Addon
  module BodyPart
    extend ActiveSupport::Concern

    included do
      template_variable_handler('html.0') { |name, issuer| body_parts[0] }
      template_variable_handler('html.1') { |name, issuer| body_parts[1] }
      template_variable_handler('html.2') { |name, issuer| body_parts[2] }
      template_variable_handler('html.3') { |name, issuer| body_parts[3] }
      template_variable_handler('html.4') { |name, issuer| body_parts[4] }
    end
  end
end
~~~

`#{html.1}` で 2 番目の本文パーツをループ HTML に展開することができるようになります。
