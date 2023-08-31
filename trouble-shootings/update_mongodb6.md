---
layout: default
title: MongoDB 6.0 / Mongoid 8.0 への更新
---

シラサギ本流を Mongodb 6.0 / Mongoid 8.0 へ更新しました。その際、何点か非互換がありました。
シラサギ本流でどのように更新したのかをメモとして残しておくことで、シラサギをカスタマイズしている方へ向けて、更新の際のトラブルシューティングのヒントとなることを意図したものです。

## Time::EPOCH

Mongoid で提供されていた定数 `Time::EPOCH` が提供されなくなりました。
`SS::EPOCH_TIME` を利用するようにしてください。

## Mongoid::Document.replace_field

`replace_field` でフィールドの型を変更した際、`default` がクリアされるようになりました。
default 値が必要な場合、以下のコード例を参考に default 値を明示的に設定してください。

~~~
field = replace_field "_id", Integer
field.default_val = 0
~~~

## changes と previous_changes

変更されたフィールドをトラッキングするための `changes` と `previous_changes` というフィールドがありました。

| mongoid 7.3 | mongoid 8.0 |
|-------------|-------------|
| dic = Kana::Dictionary.all.first      | dic = Kana::Dictionary.all.first |
| dic.changes                           | dic.changes |
| => {}                                 | => {} |
| dic.previous_changes                  | dic.previous_changes |
| => {}                                 | => {} |
|                                       | |
| dic.name = "テスト 7.3"               | dic.name = "テスト 8.0" |
| => "テスト 7.3"                       | => "テスト 8.0" |
| dic.changes                           | dic.changes |
| => {"name"=>["テスト", "テスト 7.3"]} | => {"name"=>["テスト", "テスト 8.0"]} |
| dic.previous_changes                  | dic.previous_changes |
| => {}                                 |  => {} |
|                                       | |
| dic.save!                             | dic.save! |
| => true                               | => true |
| dic.changes                           | dic.changes |
| => {}                                 | => {} |
| dic.previous_changes                  | dic.previous_changes |
| =>                                    | => |
| {"name"=>["テスト", "テスト 7.3"],    | {"name"=>["テスト", "テスト 8.0"], |
|  "updated"=>[2023-04-10 07:26:17.151 UTC, 2023-04-10 07:30:18.773098 UTC]} | "updated"=>[2023-04-10 02:39:30.817 UTC, 2023-04-10 07:26:17.151524 UTC]} |

`changes` は save する前の変更をトラッキングし、`previous_changes` は save 後の変更をトラッキングします。
外部から利用する上で mongoid 7.3 と 8.0 に差異はありません。

`after_save` コールバック内や `after_destroy` コールバック内で利用する場合、両者に非互換があります。この点に注意が必要です。

| mongoid 7.3 | mongoid 8.0 |
|-------------|-------------|
| Gws::Circular::Post.before_save { model_callback("before", self) } | Gws::Circular::Post.before_save { model_callback("before", self) } |
| Gws::Circular::Post.after_save { model_callback("after", self) }   | Gws::Circular::Post.after_save { model_callback("after", self) }   |
| post = Gws::Circular::Post.first      | post = Gws::Circular::Post.first |
| post.cur_site = post.site             | post.cur_site = post.site |
| post.state                            | post.state |
| => "public                            | => "public" |
| post.state = "closed"                 | post.state = "closed" |
| => "closed"                           | => "closed" |
| post.save!                            | post.save! |
| ==== at: before ===                   | ==== at: before ===  |
| changes={"state"=>["closed", "public"], "groups_hash"=>[{"3"=>"シラサギ市/企画政策部/政策課"}, {3=>"シラサギ市/企画政策部/政策課"}], "users_hash"=>[{"2"=>"サイト管理者 (admin)"}, {2=>"サイト管理者 (admin)"}], "updated"=>[2023-04-10 08:12:53.789 UTC, 2023-04-10 08:16:14.458722 UTC]} | changes={"state"=>["closed", "public"], "groups_hash"=>[{"3"=>"シラサギ市/企画政策部/政策課"}, {3=>"シラサギ市/企画政策部/政策課"}], "users_hash"=>[{"2"=>"サイト管理者 (admin)"}, {2=>"サイト管理者 (admin)"}], "updated"=>[2023-04-10 07:36:57.007 UTC, 2023-04-10 08:12:53.789515 UTC]} |
| previous_changes={} | previous_changes={} |
| ==== at: after === | ==== at: after === |
| changes={"state"=>["closed", "public"], "groups_hash"=>[{"3"=>"シラサギ市/企画政策部/政策課"}, {3=>"シラサギ市/企画政策部/政策課"}], "users_hash"=>[{"2"=>"サイト管理者 (admin)"}, {2=>"サイト管理者 (admin)"}], "updated"=>[2023-04-10 08:12:53.789 UTC, 2023-04-10 08:16:14.458722 UTC]} | changes={} |
| previous_changes={} | previous_changes={"state"=>["closed", "public"], "groups_hash"=>[{"3"=>"シラサギ市/企画政策部/政策課"}, {3=>"シラサギ市/企画政策部/政策課"}], "users_hash"=>[{"2"=>"サイト管理者 (admin)"}, {2=>"サイト管理者 (admin)"}], "updated"=>[2023-04-10 07:36:57.007 UTC, 2023-04-10 08:12:53.789515 UTC]} |
| => true                               |  => true |

mongoid 7.3 では、`after_save` コールバック内で `changes` で変更前の値を取得することができましたが、mongoid 8.0 では `previous_changes` を利用して変更前の値を取得しなければなりません。
`xxx_was` というフィールドを利用する場合も同様で、mongoid 8.0 以降では `xxx_previously_was` というフィールドを利用しなければならなくなりました。
（例: `state_was` ではなく `state_previously_was` を利用しなければならない）

なお、上記の例で使用した `model_callback` は以下のようなメソッドである。

~~~ruby
def model_callback(at, item)
  puts "==== at: #{at} ==="
  puts "changes=#{item.changes}"
  puts "previous_changes=#{item.previous_changes}"
end
~~~

最後に修正例をいくつか掲載する。

修正例1:

~~~
  after_save :new_size_input, if: ->{ @db_changes }
~~~

    ↓↓↓↓

~~~
  after_save :new_size_input, if: ->{ changes.present? || previous_changes.present? }
~~~

修正例2:

~~~
    def rename_file_in_web
      return unless @db_changes["filename"]
      return unless @db_changes["filename"][0]

      src = "#{site.path}/#{@db_changes['filename'][0]}"
      src = src.delete_prefix("#{Rails.root}/")
      run_callbacks :rename_file do
        Uploader::JobFile.new_job(site_id: site.id).bind_rm([src]).save_job
        Cms::PageRelease.close(self, @db_changes['filename'][0])
      end
    end
~~~

    ↓↓↓↓

~~~
    def rename_file_in_web
      filename_changes = changes['filename'].presence || previous_changes['filename']
      return unless filename_changes
      return unless filename_changes[0]

      src = "#{site.path}/#{filename_changes[0]}"
      src = src.delete_prefix("#{Rails.root}/")
      run_callbacks :rename_file do
        Uploader::JobFile.new_job(site_id: site.id).bind_rm([src]).save_job
        Cms::PageRelease.close(self, filename_changes[0])
      end
    end
~~~

修正例3:

~~~
    after_save :do_soft_or_undo_delete_with_repeat_plans, if: -> { deleted_changed? }
~~~

    ↓↓↓↓

~~~
    after_save :do_soft_or_undo_delete_with_repeat_plans, if: -> { deleted_changed? || deleted_previously_changed? }
~~~

修正例4:

~~~
      if state_was == 'draft'
        # just published
        added_member_ids = cur_member_ids
        removed_member_ids = []
      else
        added_member_ids = cur_member_ids - prev_member_ids
        removed_member_ids = prev_member_ids - cur_member_ids
      end
~~~

    ↓↓↓↓

~~~
      if state_previously_was == 'draft'
        # just published
        added_member_ids = cur_member_ids
        removed_member_ids = []
      else
        added_member_ids = cur_member_ids - prev_member_ids
        removed_member_ids = prev_member_ids - cur_member_ids
      end
~~~

## Mongoid::Document#to_a

メソッド `Mongoid::Document#to_a` が削除されました。以下のコードは mongoid 7.3 では成功していましたが、mongoid 8.0 では失敗します。

~~~ruby
Cms::Group.first.to_a
~~~

mongoid 7.3 では:

~~~
Cms::Group.first.to_a
=> [#<Cms::Group _id: 22, ...
~~~

mongoid 8.0 では:

~~~
Cms::Group.first.to_a
undefined method `to_a' for #<Cms::Group _id: 22, ...
~~~

修正例は

~~~
      item.group_ids = opts[:cur_group].to_a.pluck(:id)
~~~

↓↓↓↓

~~~
      item.group_ids = opts[:cur_group].try(:id).then { |id| id ? [ id ] : [] }
~~~

## クエリスコープの引き継ぎに関する不具合修正

mongoid 8.0 では常にクエリスコープを引き継ぐようになりました。該当ソースコードは以下の箇所です。

mongoid 7.3: https://github.com/mongodb/mongoid/blob/7.3-stable/lib/mongoid/scopable.rb#L228-L235

~~~ruby
      def with_scope(criteria)
        Threaded.set_current_scope(criteria, self)
        begin
          yield criteria
        ensure
          Threaded.set_current_scope(nil, self)
        end
      end
~~~

mongoid 8.0: https://github.com/mongodb/mongoid/blob/8.0-stable/lib/mongoid/scopable.rb#L207-L219

~~~ruby
      def with_scope(criteria)
        previous = Threaded.current_scope(self)
        Threaded.set_current_scope(criteria, self)
        begin
          yield criteria
        ensure
          if Mongoid.broken_scoping
            Threaded.set_current_scope(nil, self)
          else
            Threaded.set_current_scope(previous, self)
          end
        end
      end
~~~

`ensure` 節で、mongoid 7.3 ではクエリスコープを常に nil クリアしていますが、mongoid 8.0 では直前のクエリスコープを復帰させています。

この修正の実証コードを以下に示します。

~~~ruby
require 'spec_helper'

describe Workflow::Route do
  let!(:route1) { create :workflow_route }
  let!(:route2) { create :workflow_route }

  it do
    class << Workflow::Route
      def say_hello_all
        criteria.each do |item|
          Workflow::Route.where(name: item.name).say_hello
        end
      end

      def say_hello
        @counter ||= 0
        @counter += 1

        puts "##{@counter}: #{self.criteria.try(:selector)}"
      end
    end

    Workflow::Route.where(group_ids: cms_group.id).say_hello_all
  end
end
~~~

`.say_hello_all` の呼び出しでクエリスコープ `{ group_ids: 1 }` がセットされます。`.say_hello` は二回呼びだされます。

| mongoid 7.3 | mongooid 8.0 |
|-------------|--------------|
| #1: {"group_ids"=>1, "name"=>"r666b1da42c"} | #1: {"group_ids"=>1, "name"=>"c97a9ab50fb"} |
| #2: {"name"=>"xc39a134c1b"}                 | #2: {"group_ids"=>1, "name"=>"c97a9ab50fb"} |

違いがわかりますでしょうか？
本来であれば 2 回目の `.say_hello` のクエリスコープも `{"group_ids"=>1, "name"=>"xxxxxxxx"}` となるべきですが、mongoid 7.3 では、クエリスコープが `ensure` 節で常に nil クエリされるため、nil に `{ "name"=>"xxxxxxxx" }` というクエリスコープが足され、単に `{"name"=>"xc39a134c1b"}` というクエリスコープとなります。

シラサギ内では、この不具合を前提とした箇所が何箇所かあります。すべて修正する必要があります。

シラサギ内ではクエリスコープが空であることを前提としているため、主として `unscoped` を用いて、場合によっては `with_default_scope` を用いて修正します。


修正例1:

~~~ruby
    def restore!(opts = {})
      criteria.each do |item|
        item.restore!(opts)
      end
    end
~~~

↓↓↓↓

~~~ruby
    def restore!(opts = {})
      criteria.each do |item|
        self.with_scope(nil) do
          item.restore!(opts)
        end
      end
    end
~~~

## #attributes に関する仕様変更

`#attributes` の型が `BSON::Document` から `Hash` に変わりました。
`BSON::Document` では、文字列でもシンボルでも同じような応答が得られましたが、Hash では文字列でないと期待した応答は得られなくなりました。

|                               | mongoid 7.3          | mongoid 8.0          |
|-------------------------------|----------------------|----------------------|
| item.attributes.class         | BSON::Document       | Hash                 |
| item.attributes["name"]       | "転入届"             | "転入届"             |
| item.attributes[:name]        | "転入届"             | nil                  |
| item.attributes.key?("name")  | true                 | true                 |
| item.attributes.key?(:name)   | true                 | false                |
| item.attributes.slice("name") | { "name"=>"転入届" } | { "name"=>"転入届" } |
| item.attributes.slice(:name)  | { "name"=>"転入届" } | {}                   |

変更があるのは #attributes へ直接アクセスした場合のみで、 `#[]` には変更なし。

|                   | mongoid 7.3    | mongoid 8.0 |
|-------------------|----------------|-------------|
| item["name"]      | "転入届"       | "転入届"    |
| item[:name]       | "転入届"       | "転入届"    |

`#attributes=` にシンボルキーを持つ Hash を代入するのは、これまで通り OK。

|                                                       | mongoid 7.3    | mongoid 8.0 |
|-------------------------------------------------------|----------------|-------------|
| item.attributes = { name: "new name" }; item.name     | "new name"     | "new name"  |
| item.attributes = { "name" => "new name" }; item.name | "new name"     | "new name"  |

## sub document を指定した #pluck

仕様が変わりました。

mongoid 7.3:

~~~ruby
Opendata::Dataset.all.pluck(:id, "resources._id")
=> 
[[141, [{"_id"=>1}]],
 [142, [{"_id"=>2}]],
 [143, [{"_id"=>3}]],
 [144, nil],
 [145, [{"_id"=>4}, {"_id"=>5}]]]
~~~

mongoid 8.0:

~~~ruby
Opendata::Dataset.all.pluck(:id, "resources._id")
=> [[141, [1]], [142, [2]], [143, [3]], [144, nil], [145, [4, 5]]]
~~~

## embeds_many の変更前の値の取得

mongoid 8.0 で仕様が変わり取得できなくなりました。

mongoid 7.3 では #attributes にアクセスすると、変更前の値を取得することができました（下例参照）。

~~~ruby
item = Cms::Page.all.exists(column_values: true).first
item.column_values = []
=> []
item.column_values
=> []
item.attributes["column_values"]
=> 
[{"_id"=>BSON::ObjectId('6390463eaa9107a319e1a70b'),
  ......
~~~

mongoid 8.0 ではこの方法では変更前の値を取得することができません。

~~~ruby
item = Cms::Page.all.exists(column_values: true).first
item.column_values = []
=> []
item.column_values
=> []
item.attributes["column_values"]
=> nil
~~~

mongoid 8.0 のコードを簡単にデバッガで追いかけてみましたが、変更前の値を取得する方法はなさそうでした。
変更前の方法が欲しい場合は、自前で次のようにします。

~~~ruby
item = Cms::Page.all.exists(column_values: true).first
@before_change = item.column_values.map(&:dup)

# 変更処理
item.column_values = []
...

# @before_change を用いた後処理
@before_change ...
~~~

## .demongoize の仕様変更

`.demongoize` の仕様が変わったようで、以前は nil か配列か（つまり database のデータそのまま）が引数に指定されていましたが、
配列の中身（スカラー値）が引数に渡されるようになりました。

## custom field type の xxx_before_type_cast の仕様変更

`#xxx_before_type_cast` の型が custom field type からデータベース型に変わりました（下例参照）。

mongoid 7.3

~~~
item = SS::Site.first
item.elasticsearch_deny.class
=> SS::Extensions::Lines
item.elasticsearch_deny_before_type_cast.class
=> SS::Extensions::Lines
~~~

mongoid 8.0

~~~
item = SS::Site.first
item.domains.class
=> SS::Extensions::Lines
item.elasticsearch_deny_before_type_cast.class
=> Array
~~~

この影響で以下のようなテキストフィールドが動作しなくなりました。

~~~
  <dd><%= f.text_area :elasticsearch_deny %></dd>
~~~

編集用テキストを生成する際、内部では elasticsearch_deny_before_type_cast.to_s を呼び出していますが、
#to_s のレシーバーが SS::Extensions::Lines から Array になることにより、
期待通りの動作をしません。
上記の例ではテキストエリアに配列の中身が直接レンダリングされるようになります。

~~~
["400.html", "404.html", "500.html"]
~~~

修正方法としては、

~~~
  <dd><%= f.text_area :elasticsearch_deny, value: @item.elasticsearch_deny %></dd>
~~~

や

~~~
  <dd><%= f.text_area :elasticsearch_deny, value: @item.elasticsearch_deny.join("\n") %></dd>
~~~

とします。

## .save で書き出されたファイルが更新されなっくなった (changes と previous_changes とに対応した影響)

以下のコードを実行すると Mongoid 7.3 では、内部で generate_file が呼ばれ、書き出されたファイルが更新されましたが、Mongoid 8.0 では更新されなくなりました。

~~~
app = Opendata::App.first
app.save(validate: false)
~~~

この影響で一部のテストが失敗するようになりましたので、テストを修正するようにしてください。
たとえば、`before` で書き出されたファイルを削除し、動的な応答をさせることでテストは成功するようになります。

~~~
  before do
    ::FileUtils.rm_f app.path
  end
~~~

### 詳細な理由

Mongoid 7.3 の `generate_file` の登録処理は以下のようなコードでした。

~~~
after_save :generate_file, if: ->{ @db_changes }
~~~

changes と previous_changes とに対応するため、以下のように変更しました。

~~~
after_save :generate_file, if: ->{ changes.present? || previous_changes.present? }
~~~

Mongoid 7.3 のコードではインスタンス変数 `@db_changes` が存在していれば `generate_file` が呼ばれます。そして `@db_changes` は必ず存在します。
Mongoid 8.0 のコードでは、データベースの変更が存在する場合のみ、`generate_file` が呼ばれるようになります。

`generate_file` 以外に、`rename_file` などもこの影響を受けます。
