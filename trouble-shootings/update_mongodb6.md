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
        self.with_scope(self.unscoped) do
          item.restore!(opts)
        end
      end
    end
~~~
