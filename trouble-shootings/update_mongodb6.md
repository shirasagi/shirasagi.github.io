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

## 暗黙的なクエリスコープの引き継ぎ

mongoid 8.0 ではクエリスコープを引き継ぐようになりました。コード例で解説します。

~~~
class << self
  def restore!(opts = {})
    criteria.each do |item|
      item.restore!(opts)
    end
  end
end

def children
  self.class.where('data.filename' => /\A#{::Regexp.escape(data[:filename] + '/')}/, 'data.site_id' => data[:site_id])
end

def restore!
  History::Trash.where(ref_coll: 'ss_files', 'data._id' => file_id).first
end

trash.children.restore!(opts)
~~~

このようなコードがあったとき `#restore!` で実行されている `History::Trash.where(ref_coll: 'ss_files', 'data._id' => file_id).first` に違いがあります。

mongoid 7.3 では、現在のクエリスコープを引き継がないので、`History::Trash.where(ref_coll: 'ss_files', 'data._id' => file_id).first` は、見た目の通りに実行され
`{"find"=>"history_trashes", "filter"=>{"ref_coll"=>"ss_files", "data._id"=>2}, ...` というクエリが発行されます。

mongoid 8.0 では、現在のクエリスコープが引き継がれます。コードをよく読むと `#restore!` は、`#chidren` で作成されるクエリスコープ内で実行されていることがわかるかと思います。
`#chidren` では、`where('data.filename' => /\A#{::Regexp.escape(data[:filename] + '/')}/, 'data.site_id' => data[:site_id])` というクエリスコープが作成されています。
このため mongoid 8.0 では `{"find"=>"history_trashes", "filter"=>{"data.filename"=>/\Anode\-z17c1080ce2\//, "data.site_id"=>1, "ref_coll"=>"ss_files", "data._id"=>1}, ...` というクエリが発行されます。

現在のクエリスコープに影響されないようにするには `.unscoped` を用いて `History::Trash.unscoped.where(ref_coll: 'ss_files', 'data._id' => file_id).first` とします。
