---
layout: default
title: RSpec
---

## RSpecとは

RSpecはRubyプログラマーのためのビヘイビア駆動開発ツールであり、ビヘイビアを記述するためのドメイン特化言語(DomainSpecific Language:DSL)を提供するフレームワークです。

### ビヘイビア

ビヘイビアとはプログラムの振る舞いです。モジュールやクラス、メソッドに対してどのような動作を実行してほしいか、記述します。

### ドメイン特化言語

ドメイン特化言語(DomainSpecific Language:DSL)とは特定の領域(ドメイン)を記述するために作られた言語です。そのうち、DSLを定義する言語とDSLを実行する言語(SHIRASAGIの場合、Rubyのことを示す)が同じであるDSLを言語内DSLと呼びます。RSpecはRubyを拡張した言語内DSLとしてプログラムの振る舞いを記述します。

## インストール

RSpecはgemパッケージが用意されており、bundlerを使用してインストールします。SHIRASAGIのディレクトリに移動してbundlerを実行することでインストールできます。

~~~bash
$ cd /var/www/shirasagi
$ bundle install
~~~

RSpecのバージョンを確認するには`--version`オプションを記述します。インストールに成功している場合、正しくバージョンが表示されます。`--version`の代わりに-vを使用できます。

~~~bash
$ rspec --version
$ rspec -v
~~~

RSpecの使い方を確認するには`--help`オプションを記述します。`--help`の代わりに-hを使用できます。

~~~bash
$ rspec --help
$ rspec -h
~~~

## 実行方法

RSpecを実行することで、specディレクトリ以下の_specと付く.rbファイルを実行します。

~~~bash
$ rspec
~~~

specディレクトリ以下のすべてのテストを実行すると、時間がかかります。特定のディレクトリ、ファイルのみ実行するには、パスを記述します。

~~~bash
$ rspec spec/features
$ rspec spec/features/ads/access_logs_spec.rb
~~~

ファイルの特定行のみテストしたい場合、ファイルパスの後に行番号を記述します。

~~~bash
$ rspec spec/features/ads/access_logs_spec.rb:13
~~~

### 実行オプション

RSpecの実行時、`--color`オプションを記述することで実行結果に色付けされます。また、`--format`オプションを記述することで形式フォーマットの変更が可能です。.rspecファイルを用意することで、コマンドを入力せずに実行することが可能です。

~~~ruby
# .rspec

--color
--format Fuubar
~~~

## 基本構造

specファイルは複数のグループと複数のexampleで構成されます。exampleは検証項目であり、期待する動作が実行されているかテストします。グループはテストする対象であり、1つ以上の検証で構成されます。テスト対象はdescribe、検証項目はitを使用します。1グループ、1 exampleの場合、以下のように記述します。

~~~ruby
RSpec.describe "something" do
  it "does something" do
  end
end
~~~

ネストした検証グループを記述する場合、テスト状況を記述するためにcontextを使用します。

~~~ruby
RSpec.describe "something" do
  context "in one context" do
    it "does one thing" do
    end
  end
  context "in another context" do
    it "does another thing" do
    end
  end
end
~~~

### exampleの共有

contextを複数記述するなどの状況の場合、context間に共通の検証が出現することがあります。このような検証は冗長であり、リファクタリングすべきです。shared_examplesを使用することで共通の検証を記述できます。共通の検証が記述されていた箇所にit_behaves_likeを使用することでshared_examplesに記述した検証を実行します。以下に2つのグループで検証を共有している例を記述します。

~~~ruby
require "set"

RSpec.shared_examples "a collection object" do
  describe "<<" do
    it "adds objects to the end of the collection" do
      collection << 1
      collection << 2
      expect(collection.to_a).to match_array([1, 2])
    end
  end
end

RSpec.describe Array do
  it_behaves_like "a collection object" do
    let(:collection) { Array.new }
  end
end

RSpec.describe Set do
  it_behaves_like "a collection object" do
    let(:collection) { Set.new }
  end
end
~~~

it_should_behave_likeを使用することでshared_examplesを使用したパラメータの検証が可能となります。it_has_behaviorはit_should_behave_likeのエイリアスであり、同じように使用できます。以下にit_should_behave_likeの使用例を記述します。subjectのsize, lengthに対して検証を実行するshared_examplesを共有していることがわかります。

~~~ruby
RSpec.shared_examples "a measurable object" do |measurement, measurement_methods|
  measurement_methods.each do |measurement_method|
    it "should return #{measurement} from ##{measurement_method}" do
      expect(subject.send(measurement_method)).to eq(measurement)
    end
  end
end

RSpec.describe Array, "with 3 items" do
  subject { [1, 2, 3] }
  it_should_behave_like "a measurable object", 3, [:size, :length]
end

RSpec.describe String, "of 6 characters" do
  subject { "FooBar" }
  it_should_behave_like "a measurable object", 6, [:size, :length]
end
~~~

## before, after, around

before, afterはフックであり、exampleなどの前後に実行したいコードを記述します。例えば、before(:example)を記述した場合、検証前の時点でコードが実行されます。before(:context)を記述した場合、グループ内の検証前にコードが一度だけ実行されます。beforeはbefore(:example)と同じ動作を実行します。before(:suite)に記述した場合、RSpecの実行前にコードが一度だけ実行されます。:exampleは:eachのエイリアス、:contextは:allのエイリアスです。使用例を以下に記述します。

~~~ruby
# example_spec.rb

require "rspec/expectations"

RSpec.configure do |config|
  config.before(:suite) do
    puts "before suite"
  end

  config.before(:context) do
    puts "before context"
  end

  config.before(:example) do
    puts "before example"
  end

  config.after(:example) do
    puts "after example"
  end

  config.after(:context) do
    puts "after context"
  end

  config.after(:suite) do
    puts "after suite"
  end
end

RSpec.describe "ignore" do
  example "ignore" do
  end
end
~~~

実行すると、以下の結果を返します。

~~~bash
$ rspec -fd example_spec.rb
before suite
before context
before example
after example
.after context
after suite
~~~

aroundはbefore, afterを合わせたようなフックです。使用例を以下に記述します。

~~~ruby
# example_spec.rb

RSpec.describe "if there are around hooks in an outer scope" do
  around(:example) do |example|
    puts "first outermost around hook before"
    example.run
    puts "first outermost around hook after"
  end

  around(:example) do |example|
    puts "second outermost around hook before"
    example.run
    puts "second outermost around hook after"
  end

  describe "outer scope" do
    around(:example) do |example|
      puts "first outer around hook before"
      example.run
      puts "first outer around hook after"
    end

    around(:example) do |example|
      puts "second outer around hook before"
      example.run
      puts "second outer around hook after"
    end

    describe "inner scope" do
      around(:example) do |example|
        puts "first inner around hook before"
        example.run
        puts "first inner around hook after"
      end

      around(:example) do |example|
        puts "second inner around hook before"
        example.run
        puts "second inner around hook after"
      end

      it "they should all be run" do
        puts "in the example"
      end
    end
  end
end
~~~

実行すると、以下の結果を返します。

~~~bash
$ rspec -fd example_spec.rb
first outermost around hook before
second outermost around hook before
first outer around hook before
second outer around hook before
first inner around hook before
second inner around hook before
in the example
second inner around hook after
first inner around hook after
second outer around hook after
first outer around hook after
second outermost around hook after
first outermost around hook after
~~~

## subject

### 非明示的なsubject

グループの一番外側の最初の引数がクラスの場合、各検証ごとにsubjectによってインスタンスが定義されます。使用例を以下に記述します。

~~~ruby
class ArrayWithOneElement < Array
  def initialize(*)
    super
    unshift "first element"
  end
end

RSpec.describe Array do
  describe ArrayWithOneElement do
    context "referenced as subject" do
      it "contains one element" do
        expect(subject).to include("first element")
      end
    end
  end
end
~~~

### 明示的なsubject

グループスコープの中で定義されたsubjectメソッドは検証スコープのsubjectメソッドに値を返します。使用例を以下に記述します。

~~~ruby
$count = 0

RSpec.describe "named subject" do
  subject(:global_count) { $count += 1 }

  it "is memoized across calls (i.e. the block is invoked once)" do
    expect {
      2.times { global_count }
    }.not_to change{ global_count }.from(1)
  end

  it "is not cached across examples" do
    expect(global_count).to eq(2)
  end

  it "is still available using the subject method" do
    expect(subject).to eq(3)
  end

  it "works with the one-liner syntax" do
    is_expected.to eq(4)
  end

  it "the subject and named helpers return the same object" do
    expect(global_count).to be(subject)
  end

  it "is set to the block return value (i.e. the global $count)" do
    expect(global_count).to be($count)
  end
end
~~~

### 一行の構文

RSpecはsubjectで一行の構文を可能にしています。検証でis_expectedを使用することにより、省略した記述が可能です。

~~~ruby
RSpec.describe Array do
  describe "when first created" do
    # Rather than:
    # it "should be empty" do
    #   subject.should be_empty
    # end

    it { should be_empty }
    # or
    it { is_expected.to be_empty }
  end
end
~~~

## ヘルパーメソッド

### let

letは同じ検証内で同じ値を持つmemorizedなヘルパーメソッドです。異なる検証ではletの値は変更されます。使用例を以下に記述します。

~~~ruby
$count = 0
RSpec.describe "let" do
  let(:count) { $count += 1 }

  it "memoizes the value" do
    expect(count).to eq(1)
    expect(count).to eq(1)
  end

  it "is not cached across examples" do
    expect(count).to eq(2)
  end
end
~~~

### 任意のヘルパーメソッド

Rubyのdefキーワードまたはdefine_methodメソッドを使用することで任意のヘルパーメソッドを定義できます。使用例を以下に記述します。

~~~ruby
RSpec.describe "an example" do
  def help
    :available
  end

  it "has access to methods defined in its group" do
    expect(help).to be(:available)
  end

  describe "in a nested group" do
    it "has access to methods defined in its parent group" do
      expect(help).to be(:available)
    end
  end
end
~~~

### モジュール内のヘルパーメソッド

モジュール内で定義したヘルパーメソッドはconfig.includeを使用することで検証内で使用可能です。また、config.extendを使用することでグループで使用可能です。使用例を以下に記述します。

~~~ruby
# helpers.rb

module Helpers
  def help
    :available
  end
end
~~~
~~~ruby
require './helpers'

RSpec.configure do |c|
  c.include Helpers, :include_helpers
  c.extend  Helpers, :extend_helpers
end

RSpec.describe "an example group with matching include metadata", :include_helpers do
  puts "In a group not matching the extend filter, help is #{help rescue 'not available'}"

  it "has access to the helper methods defined in the module" do
    expect(help).to be(:available)
  end
end

RSpec.describe "an example group with matching extend metadata", :extend_helpers do
  puts "In a group matching the extend filter, help is #{help}"

  it "does not have access to the helper methods defined in the module" do
    expect { help }.to raise_error(NameError)
  end
end
~~~

実行すると、以下の結果を返します。

~~~bash
In a group not matching the extend filter, help is not available
In a group matching the extend filter, help is available
~~~

## メタデータ

### Current example

ブロックの引数としてexampleオブジェクトを使用することで、メタデータを使用できます。exampleはit, subject, let, before, after, aroundに対応しています。使用例を以下に記述します。

~~~ruby
RSpec.describe "example as block arg to it, before, and after" do
  before do |example|
    expect(example.description).to eq("is the example object")
  end

  after do |example|
    expect(example.description).to eq("is the example object")
  end

  it "is the example object" do |example|
    expect(example.description).to eq("is the example object")
  end
end

RSpec.describe "example as block arg to let" do
  let(:the_description) do |example|
    example.description
  end

  it "is the example object" do |example|
    expect(the_description).to eq("is the example object")
  end
end

RSpec.describe "example as block arg to subject" do
  subject do |example|
    example.description
  end

  it "is the example object" do |example|
    expect(subject).to eq("is the example object")
  end
end

RSpec.describe "example as block arg to subject with a name" do
  subject(:the_subject) do |example|
    example.description
  end

  it "is the example object" do |example|
    expect(the_subject).to eq("is the example object")
    expect(subject).to eq("is the example object")
  end
end
~~~

### described_class

グループの一番外側がクラスの場合、検証内でdescribed_class()メソッドとして使用できます。使用例を以下に記述します。

~~~ruby
RSpec.describe Fixnum do
  it "is available as described_class" do
    expect(described_class).to eq(Fixnum)
  end
end
~~~

### ユーザー定義のメタデータ

describe, context, itのブロックの前にハッシュを記述することでメタデータとして使用することができます。使用例を以下に記述します。

~~~ruby
RSpec.describe "a group with user-defined metadata", :foo => 'bar' do
  it 'can be overridden by an example', :foo => 'bazz' do |example|
    expect(example.metadata[:foo]).to eq('bazz')
  end

  describe "a sub-group with an override", :foo => 'goo' do
    it 'can be overridden by a sub-group' do |example|
      expect(example.metadata[:foo]).to eq('goo')
    end
  end
end
~~~

<!--
## フィルター
-->

## 設定

### ファイルからRSpecのオプションを読み込む

RSpecは3箇所のファイルからオプションを読み込みます。

- Local: ./.rspec-local (gitignoreされるRSpec設定ファイル)
- Project: ./.rspec (gitignoreされないRSpec設定ファイル)
- Global: ~/.rspec (ユーザーのホームディレクトリのRSpec設定ファイル)

SPEC_OPTSオプションにRSpec設定ファイルのパスを入力することでそのオプションのみを使用できます。RSpec設定ファイルはERB形式でも使用できます。使用例を以下に記述します。

~~~ruby
# .rspec

--color
--format Fuubar
~~~
~~~ruby
RSpec.describe "color_enabled?" do
  context "when set with RSpec.configure" do
    before do
      # color is disabled for non-tty output, so stub the output stream
      # to say it is tty, even though we're running this with cucumber
      allow(RSpec.configuration.output_stream).to receive(:tty?) { true }
    end

    it "is true" do
      expect(RSpec.configuration).to be_color_enabled
    end
  end
end

RSpec.describe "formatter" do
  it "is set to documentation" do
    expect(RSpec.configuration.formatters.first).to be_an(Fuubar)
  end
end
~~~

<!--
### fail_fast
-->

### add_setting

add_settingを使用することで、設定項目を追加することができます。defaultを使用することで初期値を設定できます。使用例を以下に記述します。

~~~ruby
RSpec.configure do |c|
  c.add_setting :custom_setting
end

RSpec.configure do |c|
  c.custom_setting = true
end

RSpec.describe "custom setting" do
  it "returns the value set in the last cofigure block to get eval'd" do
    expect(RSpec.configuration.custom_setting).to be_truthy
  end

  it "is exposed as a predicate" do
    expect(RSpec.configuration.custom_setting?).to be_truthy
  end
end
~~~

<!--
### alias_example_to
### --default-path
### deprecation_stream
### output_stream
### --exclude-pattern
### filter_gems_from_backtrace
### failure_exit_code
### expose_dsl_globally
### register_ordering
### pattern
### profile_examples
### run_all_when_everything_filtered
### monkey_patching
## expectation framework
### be_a_multiple_of
### expect_with
## aggregate_failures
## Formatters
## Arbitrary file suffix
## pending
-->

## スキップ

期待する動作が定まっていない場合、スキップ機能を使用します。スキップ機能は以下の方法で使用可能です。

- 検証が記述されていない
- skipを使用する
- xit, xspecify, xexampleを使用する
- :skipを使用する

使用例を以下に記述します。

~~~ruby
RSpec.describe "an example" do
  xit "is skipped using xit" do
  end

  xspecify "is skipped using xspecify" do
  end

  xexample "is skipped using xexample" do
  end
end
~~~

<!--
## clear_examples
-->

## RSpec Expectations

rspec-expectationsは期待する成果を定義するために使用します。基本的に以下のように記述します。

~~~ruby
expect(actual).to matcher(expected)
expect(actual).not_to matcher(expected)
~~~

expect(..).not_toの代わりにexpect(..).to_notが使用できます。

## Matcher

マッチャーとは、メソッドに応答するオブジェクトです。

## ビルトインマッチャー

rspec-expectationsにはいくつかのマッチャーが組み込まれています。

### 等価マッチャー

Rubyには同等性を扱ういくつかの異なるメソッドを公開しています。

~~~ruby
a.equal?(b) # object identity - a and b refer to the same object
a.eql?(b)   # object equivalence - a and b have the same value
a == b      # object equivalence - a and b have the same value with type conversions
~~~

rspec-expectationsでは、これらのメソッドに合わせた等価マッチャーが組み込まれています。

~~~ruby
expect(a).to equal(b) # passes if a.equal?(b)
expect(a).to eql(b)   # passes if a.eql?(b)
expect(a).to be == b  # passes if a == b
expect(a).to be(b) # passes if a.equal?(b)
expect(a).to eq(b) # passes if a == b
~~~

### 比較マッチャー

<, >, <=, >=を使用することで値を比較することができます。使用例を以下に記述します。

~~~ruby
RSpec.describe "Strawberry" do
  it { is_expected.to be < "Tomato" }
  it { is_expected.to be > "Apple" }
  it { is_expected.to be <= "Turnip" }
  it { is_expected.to be >= "Banana" }

  # deliberate failures
  it { is_expected.to be < "Cranberry" }
  it { is_expected.to be > "Zuchini" }
  it { is_expected.to be <= "Potato" }
  it { is_expected.to be >= "Tomato" }
end
~~~

### 述語マッチャー

Rubyにはいくつかの述語メソッドがあります。

~~~ruby
7.zero?                  # => false
0.zero?                  # => true
[1].empty?               # => false
[].empty?                # => true
{ :a => 5 }.has_key?(:b) # => false
{ :b => 5 }.has_key?(:b) # => true
~~~

rspec-expectationsでは、これらのメソッドに合わせた述語マッチャーが組み込まれています。

~~~ruby
expect(7).not_to be_zero       # calls 7.zero?
expect([]).to be_empty         # calls [].empty?
expect(x).to be_multiple_of(3) # calls x.multiple_of?(3)
expect(hash).to have_key(:foo)       # calls hash.has_key?(:foo)
expect(array).not_to have_odd_values # calls array.has_odd_values?
~~~

### タイプマッチャー

rspec-expectationsにはオブジェクトのタイプを特定する2つのマッチャーが組み込まれています。

- expect(obj).to be_kind_of(type)     # obj.kind_of?(type)
- expect(obj).to be_instance_of(type) # obj.instance_of?(type)

これらのマッチャーはいくつかのエイリアスが使用できます。

~~~ruby
expect(obj).to be_a_kind_of(type)      # same as expect(obj).to be_kind_of(type)
expect(obj).to be_a(type)              # same as expect(obj).to be_kind_of(type)
expect(obj).to be_an(type)             # same as expect(obj).to be_kind_of(type)
expect(obj).to be_an_instance_of(type) # same as expect(obj).to be_instance_of(type)
~~~

使用例を以下に記述します。

~~~ruby
module MyModule; end

class Fixnum
  include MyModule
end

RSpec.describe 17 do
  # the actual class
  it { is_expected.to be_kind_of(Fixnum) }
  it { is_expected.to be_a_kind_of(Fixnum) }
  it { is_expected.to be_a(Fixnum) }

  # the superclass
  it { is_expected.to be_kind_of(Integer) }
  it { is_expected.to be_a_kind_of(Integer) }
  it { is_expected.to be_an(Integer) }

  # an included module
  it { is_expected.to be_kind_of(MyModule) }
  it { is_expected.to be_a_kind_of(MyModule) }
  it { is_expected.to be_a(MyModule) }

  # negative passing case
  it { is_expected.not_to be_kind_of(String) }
  it { is_expected.not_to be_a_kind_of(String) }
  it { is_expected.not_to be_a(String) }

  # deliberate failures
  it { is_expected.not_to be_kind_of(Fixnum) }
  it { is_expected.not_to be_a_kind_of(Fixnum) }
  it { is_expected.not_to be_a(Fixnum) }
  it { is_expected.not_to be_kind_of(Integer) }
  it { is_expected.not_to be_a_kind_of(Integer) }
  it { is_expected.not_to be_an(Integer) }
  it { is_expected.not_to be_kind_of(MyModule) }
  it { is_expected.not_to be_a_kind_of(MyModule) }
  it { is_expected.not_to be_a(MyModule) }
  it { is_expected.to be_kind_of(String) }
  it { is_expected.to be_a_kind_of(String) }
  it { is_expected.to be_a(String) }
end
~~~
~~~ruby
module MyModule; end

class Fixnum
  include MyModule
end

RSpec.describe 17 do
  # the actual class
  it { is_expected.to be_instance_of(Fixnum) }
  it { is_expected.to be_an_instance_of(Fixnum) }

  # the superclass
  it { is_expected.not_to be_instance_of(Integer) }
  it { is_expected.not_to be_an_instance_of(Integer) }

  # an included module
  it { is_expected.not_to be_instance_of(MyModule) }
  it { is_expected.not_to be_an_instance_of(MyModule) }

  # another class with no relation to the subject's hierarchy
  it { is_expected.not_to be_instance_of(String) }
  it { is_expected.not_to be_an_instance_of(String) }

  # deliberate failures
  it { is_expected.not_to be_instance_of(Fixnum) }
  it { is_expected.not_to be_an_instance_of(Fixnum) }
  it { is_expected.to be_instance_of(Integer) }
  it { is_expected.to be_an_instance_of(Integer) }
  it { is_expected.to be_instance_of(MyModule) }
  it { is_expected.to be_an_instance_of(MyModule) }
  it { is_expected.to be_instance_of(String) }
  it { is_expected.to be_an_instance_of(String) }
end
~~~

<!--
### allマッチャー

allマッチャーは複数の値すべてを特定するマッチャーです。使用例を以下に記述します。

~~~
RSpec.describe ['anything', 'everything', 'something'] do
  it { is_expected.to all( be_a(String).and include("thing") ) }
  it { is_expected.to all( be_a(String).and end_with("g") ) }
  it { is_expected.to all( start_with("s").or include("y") ) }

  # deliberate failures
  it { is_expected.to all( include("foo").and include("bar") ) }
  it { is_expected.to all( be_a(String).and start_with("a") ) }
  it { is_expected.to all( start_with("a").or include("z") ) }
end
~~~
-->

### beマッチャー

以下のマッチャーはbeマッチャーと呼ばれています。

~~~ruby
expect(obj).to be_truthy  # passes if obj is truthy (not nil or false)
expect(obj).to be_falsey  # passes if obj is falsy (nil or false)
expect(obj).to be_nil     # passes if obj is nil
expect(obj).to be         # passes if obj is truthy (not nil or false)
~~~

使用例を以下に記述します。

~~~ruby
RSpec.describe "be_truthy matcher" do
  specify { expect(true).to be_truthy }
  specify { expect(7).to be_truthy }
  specify { expect("foo").to be_truthy }
  specify { expect(nil).not_to be_truthy }
  specify { expect(false).not_to be_truthy }

  # deliberate failures
  specify { expect(true).not_to be_truthy }
  specify { expect(7).not_to be_truthy }
  specify { expect("foo").not_to be_truthy }
  specify { expect(nil).to be_truthy }
  specify { expect(false).to be_truthy }
end

RSpec.describe "be_falsey matcher" do
  specify { expect(nil).to be_falsey }
  specify { expect(false).to be_falsey }
  specify { expect(true).not_to be_falsey }
  specify { expect(7).not_to be_falsey }
  specify { expect("foo").not_to be_falsey }

  # deliberate failures
  specify { expect(nil).not_to be_falsey }
  specify { expect(false).not_to be_falsey }
  specify { expect(true).to be_falsey }
  specify { expect(7).to be_falsey }
  specify { expect("foo").to be_falsey }
end

RSpec.describe "be_nil matcher" do
  specify { expect(nil).to be_nil }
  specify { expect(false).not_to be_nil }
  specify { expect(true).not_to be_nil }
  specify { expect(7).not_to be_nil }
  specify { expect("foo").not_to be_nil }

  # deliberate failures
  specify { expect(nil).not_to be_nil }
  specify { expect(false).to be_nil }
  specify { expect(true).to be_nil }
  specify { expect(7).to be_nil }
  specify { expect("foo").to be_nil }
end

RSpec.describe "be_matcher" do
  specify { expect(true).to be }
  specify { expect(7).to be }
  specify { expect("foo").to be }
  specify { expect(nil).not_to be }
  specify { expect(false).not_to be }

  # deliberate failures
  specify { expect(true).not_to be }
  specify { expect(7).not_to be }
  specify { expect("foo").not_to be }
  specify { expect(nil).to be }
  specify { expect(false).to be }
end
~~~

### be_withinマッチャー

be_withinマッチャーは範囲内に収まっているか確認するマッチャーです。be_withinマッチャーは以下のように記述します。

~~~
expect(3.0).to be_within(0.2).of(3.14)
expect(3.0).to be_within(0.1).of(3.14) # failure
~~~

3.0は3.04 - 3.24の中に含まれていないため、failureを返します。使用例を以下に記述します。

~~~ruby
RSpec.describe 27.5 do
  it { is_expected.to be_within(0.5).of(27.9) }
  it { is_expected.to be_within(0.5).of(28.0) }
  it { is_expected.to be_within(0.5).of(27.1) }
  it { is_expected.to be_within(0.5).of(27.0) }

  it { is_expected.not_to be_within(0.5).of(28.1) }
  it { is_expected.not_to be_within(0.5).of(26.9) }

  # deliberate failures
  it { is_expected.not_to be_within(0.5).of(28) }
  it { is_expected.not_to be_within(0.5).of(27) }
  it { is_expected.to be_within(0.5).of(28.1) }
  it { is_expected.to be_within(0.5).of(26.9) }
end
~~~

### changeマッチャー

changeマッチャーは要素の変化に関するマッチャーです。changeマッチャーには2つの記述方法があります。

- expect { do_something }.to change(object, :attribute)
- expect { do_something }.to change { object.attribute }

使用例を以下に記述します。

~~~ruby
# lib/counter.rb

class Counter
  class << self
    def increment
      @count ||= 0
      @count += 1
    end

    def count
      @count ||= 0
    end
  end
end
~~~
~~~ruby
require "counter"

RSpec.describe Counter, "#increment" do
  it "should increment the count" do
    expect { Counter.increment }.to change{Counter.count}.from(0).to(1)
  end

  # deliberate failure
  it "should increment the count by 2" do
    expect { Counter.increment }.to change{Counter.count}.by(2)
  end
end
~~~
~~~ruby
require "counter"

RSpec.describe Counter, "#increment" do
  it "should not increment the count by 1 (using not_to)" do
    expect { Counter.increment }.not_to change{Counter.count}
  end

  it "should not increment the count by 1 (using to_not)" do
    expect { Counter.increment }.to_not change{Counter.count}
  end
end
~~~

<!--
### contain_exactly
### cover
-->

### end_withマッチャー

end_withマッチャーは文字列か配列の末尾を特定するマッチャーです。使用例を以下に記述します。

~~~ruby
RSpec.describe "this string" do
  it { is_expected.to end_with "string" }
  it { is_expected.not_to end_with "stringy" }

  # deliberate failures
  it { is_expected.not_to end_with "string" }
  it { is_expected.to end_with "stringy" }
end

RSpec.describe [0, 1, 2, 3, 4] do
  it { is_expected.to end_with 4 }
  it { is_expected.to end_with 3, 4 }
  it { is_expected.not_to end_with 3 }
  it { is_expected.not_to end_with 0, 1, 2, 3, 4, 5 }

  # deliberate failures
  it { is_expected.not_to end_with 4 }
  it { is_expected.to end_with 3 }
end
~~~

<!--
### exist
### have_attributes
-->

### includeマッチャー

includeマッチャーは期待するオブジェクトが含まれる要素を特定するマッチャーです。使用例を以下に記述します。

~~~ruby
RSpec.describe [1, 3, 7] do
  it { is_expected.to include(1) }
  it { is_expected.to include(3) }
  it { is_expected.to include(7) }
  it { is_expected.to include(1, 7) }
  it { is_expected.to include(1, 3, 7) }
  it { is_expected.to include(a_kind_of(Integer)) }
  it { is_expected.to include(be_odd.and be < 10) }
  it { is_expected.to include(be_odd) }
  it { is_expected.not_to include(be_even) }
  it { is_expected.not_to include(17) }
  it { is_expected.not_to include(43, 100) }

  # deliberate failures
  it { is_expected.to include(4) }
  it { is_expected.to include(be_even) }
  it { is_expected.not_to include(1) }
  it { is_expected.not_to include(3) }
  it { is_expected.not_to include(7) }
  it { is_expected.not_to include(1, 3, 7) }

  # both of these should fail since it includes 1 but not 9
  it { is_expected.to include(1, 9) }
  it { is_expected.not_to include(1, 9) }
end

RSpec.describe "a string" do
  it { is_expected.to include("str") }
  it { is_expected.to include("a", "str", "ng") }
  it { is_expected.not_to include("foo") }
  it { is_expected.not_to include("foo", "bar") }

  # deliberate failures
  it { is_expected.to include("foo") }
  it { is_expected.not_to include("str") }
  it { is_expected.to include("str", "foo") }
  it { is_expected.not_to include("str", "foo") }
end

RSpec.describe :a => 7, :b => 5 do
  it { is_expected.to include(:a) }
  it { is_expected.to include(:b, :a) }
  it { is_expected.to include(:a => 7) }
  it { is_expected.to include(:b => 5, :a => 7) }
  it { is_expected.not_to include(:c) }
  it { is_expected.not_to include(:c, :d) }
  it { is_expected.not_to include(:d => 2) }
  it { is_expected.not_to include(:a => 5) }
  it { is_expected.not_to include(:b => 7, :a => 5) }

  # deliberate failures
  it { is_expected.not_to include(:a) }
  it { is_expected.not_to include(:b, :a) }
  it { is_expected.not_to include(:a => 7) }
  it { is_expected.not_to include(:a => 7, :b => 5) }
  it { is_expected.to include(:c) }
  it { is_expected.to include(:c, :d) }
  it { is_expected.to include(:d => 2) }
  it { is_expected.to include(:a => 5) }
  it { is_expected.to include(:a => 5, :b => 7) }

  # Mixed cases--the hash includes one but not the other.
  # All 4 of these cases should fail.
  it { is_expected.to include(:a, :d) }
  it { is_expected.not_to include(:a, :d) }
  it { is_expected.to include(:a => 7, :d => 3) }
  it { is_expected.not_to include(:a => 7, :d => 3) }
end
~~~

### matchマッチャー

matchマッチャーは文字列と正規表現がマッチするかを特定するマッチャーです。使用例を以下に記述します。

~~~ruby
RSpec.describe "a string" do
  it { is_expected.to match(/str/) }
  it { is_expected.not_to match(/foo/) }

  # deliberate failures
  it { is_expected.not_to match(/str/) }
  it { is_expected.to match(/foo/) }
end

RSpec.describe /foo/ do
  it { is_expected.to match("food") }
  it { is_expected.not_to match("drinks") }

  # deliberate failures
  it { is_expected.not_to match("food") }
  it { is_expected.to match("drinks") }
end
~~~

### raise_errorマッチャー

raise_errorマッチャーはブロックが例外を返した場合を特定するマッチャーです。raise_errorマッチャーは以下の記述方法があります。

- expect { raise "oops" }.to raise_error
- expect { raise "oops" }.to raise_error(RuntimeError)
- expect { raise "oops" }.to raise_error("oops")
- expect { raise "oops" }.to raise_error(/op/)
- expect { raise "oops" }.to raise_error(RuntimeError, "oops")
- expect { raise "oops" }.to raise_error(RuntimeError, /op/)

raise_errorの代わりにraise_exceptionを使用することができます。使用例を以下に記述します。

~~~ruby
RSpec.describe "#foo" do
  it "raises NameError" do
    expect { Object.new.foo }.to raise_error { |error|
      expect(error).to be_a(NameError)
    }
  end
end
~~~

<!--
### respond_to
-->

### satisfyマッチャー

satisfyマッチャーはブロックの要素を特定するマッチャーです。使用例を以下に記述します。

~~~ruby
RSpec.describe 10 do
  it { is_expected.to satisfy { |v| v > 5 } }
  it { is_expected.not_to satisfy { |v| v > 15 } }

  # deliberate failures
  it { is_expected.not_to satisfy { |v| v > 5 } }
  it { is_expected.to satisfy { |v| v > 15 } }
  it { is_expected.to_not satisfy("be greater than 5") { |v| v > 5 } }
  it { is_expected.to satisfy("be greater than 15") { |v| v > 15 } }
end
~~~

### start_withマッチャー

start_withマッチャーは文字列か配列の接頭辞を特定するマッチャーです。使用例を以下に記述します。

~~~ruby
RSpec.describe "this string" do
  it { is_expected.to start_with "this" }
  it { is_expected.not_to start_with "that" }

  # deliberate failures
  it { is_expected.not_to start_with "this" }
  it { is_expected.to start_with "that" }
end

RSpec.describe [0, 1, 2, 3, 4] do
  it { is_expected.to start_with 0 }
  it { is_expected.to start_with(0, 1)}
  it { is_expected.not_to start_with(2) }
  it { is_expected.not_to start_with(0, 1, 2, 3, 4, 5) }

  # deliberate failures
  it { is_expected.not_to start_with 0 }
  it { is_expected.to start_with 3 }
end
~~~

<!--
### throw_symbol
### yield
### output
-->

## カスタムマッチャーの定義

RSpec::Matchers.defineを使用することでカスタムマッチャーを定義できます。カスタムマッチャーはexpect().toとexpect().not_toの動作をmatchとmatch_when_negatedによって分けることができます。values_match?を使用することでfizzy-matchを作成することができます。alias_matcherを使用することでカスタムマッチャーのエイリアスを作成することができます。使用例を以下に記述します。

~~~ruby
RSpec::Matchers.define :contain do |*expected|
  match do |actual|
    expected.all? { |e| actual.include?(e) }
  end

  match_when_negated do |actual|
    expected.none? { |e| actual.include?(e) }
  end
end

RSpec.describe [1, 2, 3] do
  it { is_expected.to contain(1, 2) }
  it { is_expected.not_to contain(4, 5, 6) }

  # deliberate failures
  it { is_expected.to contain(1, 4) }
  it { is_expected.not_to contain(1, 4) }
end

RSpec::Matchers.define :have_content do |expected|
  match do |actual|
    # The order of arguments is important for values_match?, e.g.
    # especially if your matcher should handle Regexp-objects
    # (/regex/): First comes the expected value, second the actual
    # one.
    values_match? expected, actual
  end
end

RSpec.describe 'a' do
  it { is_expected.to have_content 'a' }
end

RSpec.describe 'a' do
  it { is_expected.to have_content /a/ }
end

RSpec.describe 'a' do
  it { is_expected.to have_content a_string_starting_with('a') }
end

RSpec::Matchers.define :be_a_multiple_of do |expected|
  match do |actual|
    actual % expected == 0
  end
end

RSpec::Matchers.alias_matcher :be_n_of , :be_a_multiple_of

RSpec.describe 9 do
  it { is_expected.to be_n_of(3) }
end
~~~

<!--
### diffable

diffableを使用することでDiffを出力させることができます。使用例を以下に記述します。

~~~ruby
# example_spec.rb

RSpec::Matchers.define :be_just_like do |expected|
  match do |actual|
    actual == expected
  end

  diffable
end

RSpec.describe "two\nlines" do
  it { is_expected.to be_just_like("three\nlines") }
end
~~~
~~~bash
Diff:
@@ -1,3 +1,3 @@
-three
+two
  lines
~~~
-->

<!--
### chain

chainを使用することで、fluentインターフェースを実現できます。include_chain_clauses_in_custom_matcher_descriptionsを使用することで、chainメソッドを出力することができます。使用例を以下に記述します。

~~~ruby
RSpec.configure do |config|
  config.expect_with :rspec do |c|
    c.include_chain_clauses_in_custom_matcher_descriptions = true
  end
end

RSpec::Matchers.define :be_bigger_than do |first|
  match do |actual|
    (actual > first) && (actual < @second)
  end

  chain :and_smaller_than do |second|
    @second = second
  end
end

RSpec.describe 5 do
  it { is_expected.to be_bigger_than(4).and_smaller_than(6) }
end
~~~
-->

<!--
### Access running example
### Define matcher outside rspec
### Define a matcher supporting block expectations
## aggregate_failures
-->

## 構成マッチャー

RSpecのマッチャーは組み立てできるように作成されています。そのようなマッチャーを構成マッチャーと呼びます。構成マッチャーは以下のような値を許可しています。

- change { }.by(matcher)
- change { }.from(matcher).to(matcher)
- contain_exactly(matcher, matcher, matcher)
- end_with(matcher, matcher)
- include(matcher, matcher)
- include(:key => matcher, :other => matcher)
- match(arbitrary_nested_structure_with_matchers)
- output(matcher).to_stdout
- output(matcher).to_stderr
- raise_error(ErrorClass, matcher)
- start_with(matcher, matcher)
- throw_symbol(:sym, matcher)
- yield_with_args(matcher, matcher)
- yield_successive_args(matcher, matcher)

いくつかの構成マッチャーは以下のようなエイリアスがあります。

- be < 2 => a_value < 2
- be > 2 => a_value > 2
- be_an_instance_of => an_instance_of
- be_within => a_value_within
- contain_exactly => a_collection_containing_exactly
- end_with => a_string_ending_with, ending_with
- match => a_string_matching
- start_with => a_string_starting_with

使用例を以下に記述します。

~~~ruby
RSpec.describe "Passing matchers to change" do
  specify "you can pass a matcher to by" do
    k = 0
    expect { k += 1.05 }.to change { k }.
      by( a_value_within(0.1).of(1.0) )
  end

  specify "you can pass matchers to from and to" do
    s = "food"
    expect { s = "barn" }.to change { s }.
      from( a_string_matching(/foo/) ).
      to( a_string_matching(/bar/) )
  end
end
~~~

## expectの組み合わせ

マッチャーはand, orを組み合わせることで、組み合わせたexpectが使用できます。使用例を以下に記述します。

~~~ruby
RSpec.describe "A compound and matcher" do
  let(:string) { "foo bar bazz" }

  it "passes when both are true" do
    expect(string).to start_with("foo").and end_with("bazz")
  end

  it "passes when using boolean AND & alias" do
    expect(string).to start_with("foo") & end_with("bazz")
  end

  it "fails when the first matcher fails" do
    expect(string).to start_with("bar").and end_with("bazz")
  end

  it "fails when the second matcher fails" do
    expect(string).to start_with("foo").and end_with("bar")
  end
end

class StopLight
  def color
    %w[ green yellow red ].shuffle.first
  end
end

RSpec.describe StopLight, "#color" do
  let(:light) { StopLight.new }
  it "is green, yellow or red" do
    expect(light.color).to eq("green").or eq("yellow").or eq("red")
  end

  it "passes when using boolean OR | alias" do
    expect(light.color).to eq("green") | eq("yellow") | eq("red")
  end
end
~~~

<!--
## define_negated_matcher
## Customized message
-->

## 差分

failureメッセージには自動的に差分が含まれます。使用例を以下に記述します。

~~~ruby
RSpec.describe "a multiline string" do
  it "is like another string" do
    expected = /expected/m
    actual = <<-ACTUAL
this is the
  actual
    string
ACTUAL
    expect(actual).to match expected
  end
end
~~~
~~~bash
Diff:
@@ -1,2 +1,4 @@
-/expected/m
+this is the
+  actual
+    string
~~~

<!--
## Implicit docstrings
-->

<!--
## 構文設定

rspec-expectationsではexpectメソッドを使用することを推奨しており、shouldメソッドは非推奨です。expect_withとmock_withを設定することで、どちらの構文を使用するか設定することができます。shouldで統一したい場合、使用例は以下に記述します。

~~~ruby
RSpec.configure do |config|
  config.expect_with :rspec do |c|
    c.syntax = :should
  end
  config.mock_with :rspec do |c|
    c.syntax = :should
  end
end
~~~
-->

<!--
## minitest_integration
-->

## rspec-mocks

rspec-mocksはテスト対象からの間接的な出力を検証するために使うモックオブジェクトを使用することを可能にします。doubleメソッドを使用することでモックオブジェクトを作成できます。instance_double, class_double, object_doubleを使用することで、それぞれに対応したモックの作成が可能です。モックはメソッドスタブによって命令を理解できるようになります。

### テストダブル

テストダブルは基本的なダブルです。メッセージや返り値の許可を定義するためにハッシュを使用することができます。使用例を以下に記述します。

~~~ruby
RSpec.describe "A test double" do
  it "returns canned responses from the methods named in the provided hash" do
    dbl = double("Some Collaborator", :foo => 3, :bar => 4)
    expect(dbl.foo).to eq(3)
    expect(dbl.bar).to eq(4)
  end
end
~~~

### allow

テストダブルはallow(...).to receive(...), allow(...).to receive_messages(...)を使用することで値を受け取ることを許可します。使用例を以下に記述します。

~~~ruby
RSpec.describe "allow" do
  it "returns nil from allowed messages" do
    dbl = double("Some Collaborator")
    allow(dbl).to receive(:foo)
    expect(dbl.foo).to be_nil
  end
end

RSpec.describe "receive_messages" do
  it "configures return values for the provided messages" do
    dbl = double("Some Collaborator")
    allow(dbl).to receive_messages(:foo => 2, :bar => 3)
    expect(dbl.foo).to eq(2)
    expect(dbl.bar).to eq(3)
  end
end
~~~

<!--
### 期待するメッセージ

テストダブルにexpect(...).to receive(...)を使用することでメッセージを期待することができます。使用例を以下に記述します。

~~~ruby
RSpec.describe "A fulfilled positive message expectation" do
  it "passes" do
    dbl = double("Some Collaborator")
    expect(dbl).to receive(:foo)
    dbl.foo
  end
end

RSpec.describe "A negative message expectation" do
  it "passes if the message is never received" do
    dbl = double("Some Collaborator").as_null_object
    expect(dbl).not_to receive(:foo)
  end
end
~~~
-->

### 部分的テストダブル

部分的テストダブルは本物のオブジェクトの拡張です。使用例を以下に記述します。

~~~ruby
class User
  def self.find(id)
    :original_return_value
  end
end

RSpec.describe "A partial double" do
  it "redefines a method" do
    allow(User).to receive(:find).and_return(:redefined)
    expect(User.find(3)).to eq(:redefined)
  end

  it "restores the redefined method after the example completes" do
    expect(User.find(3)).to eq(:original_return_value)
  end
end
~~~

<!--
### as_null_object

モックオブジェクトに対してスタブ定義していないメソッドを呼ぶMockExpectationErrorが発生します。as_null_objectを使用することで特定のメソッド以外の呼び出しを無視します。使用例を以下に記述します。

~~~ruby
RSpec.describe "as_null_object" do
  it "returns itself" do
    dbl = double("Some Collaborator").as_null_object
    expect(dbl.foo.bar.bazz).to be(dbl)
  end
end
~~~
-->

### スコープ

rspec-mocksの構文はexampleごとに使用されます。before(:example)フックを使用することでより良い記述となります。with_temporary_scopeを使用することで一時的なスコープを作成することができます。使用例を以下に記述します。

~~~ruby
RSpec.describe "Creating a double in a before(:context) hook" do
  before(:context) do
    RSpec::Mocks.with_temporary_scope do
      dbl = double(:foo => 13)
      @result = dbl.foo
    end
  end

  it "allows a double to be created and used from within a with_temporary_scope block" do
    expect(@result).to eq(13)
  end
end
~~~

## 検証ダブル

instance_double, class_double, object_doubleなどは検証ダブルと呼ばれます。検証ダブルは条件を満たさないときに例外を返します。

<!--
### verify_partial_doubles
-->

## レスポンス設定

メッセージを許可、期待したとき初期設定ではnilを返します。いくつかのメソッドはテストダブルの返り値を設定できます。

### and_return

and_returnを使用することで返り値を設定することができます。使用例を以下に記述します。

~~~ruby
RSpec.describe "When the method is called multiple times" do
  it "returns the specified values in order, then keeps returning the last value" do
    dbl = double
    allow(dbl).to receive(:foo).and_return(1, 2, 3)

    expect(dbl.foo).to eq(1)
    expect(dbl.foo).to eq(2)
    expect(dbl.foo).to eq(3)
    expect(dbl.foo).to eq(3)
    expect(dbl.foo).to eq(3)
  end
end
~~~

### and_raise

and_raiseを使用することで例外を返すことができます。使用例を以下に記述します。

~~~ruby
RSpec.describe "Making it raise an error" do
  it "raises the provided exception" do
    dbl = double
    allow(dbl).to receive(:foo).and_raise("boom")
    dbl.foo
  end
end
~~~

<!--
### and_throw
### and_yield
### and_call_original
-->

### and_wrap_original

and_wrap_originalを使用することでメソッドをラップすることができます。使用例を以下に記述します。

~~~ruby
class API
  def self.solve_for(x)
    (1..x).to_a
  end
end

RSpec.describe "and_wrap_original" do
  it "can be overriden for specific arguments using #with" do
    allow(API).to receive(:solve_for).and_wrap_original { |m, *args| m.call(*args).first(5) }
    allow(API).to receive(:solve_for).with(2).and_return([3])

    expect(API.solve_for(20)).to eq [1,2,3,4,5]
    expect(API.solve_for(2)).to eq [3]
  end
end
~~~

<!--
### Block implementation
-->

## 設定制約

### with

withを使用することでマッチングした値のみを使用することができます。使用例を以下に記述します。

~~~ruby
RSpec.describe "Using #with to constrain responses" do
  specify "its response depends on the arguments" do
    dbl = double

    # Set a default for any unmatched args
    allow(dbl).to receive(:foo).and_return(:default)

    allow(dbl).to receive(:foo).with(1).and_return(1)
    allow(dbl).to receive(:foo).with(2).and_return(2)

    expect(dbl.foo(0)).to eq(:default)
    expect(dbl.foo(1)).to eq(1)
    expect(dbl.foo(2)).to eq(2)
  end
end
~~~

<!--
### Receive Counts
### Message Order
## Mutating constants
## Working with legacy code
-->

<!--
## 古い構文

rspec-mocksはいくつかのモック、スタブを許可するためにモンキーパッチ構文を使用しています。その中の古い構文はバージョンアップ時に削除される予定です。

## Outside rspec
-->

## rspec-rails

rspec-railsはrails用にrspecを拡張するものです。requests, controllers, models, views, helpers, mailers, routingに対応したspecファイルを作成できます。

<!--
## infer_spec_type_from_file_location
-->

## ディレクトリ構造

rspec-railsではrequestのspecファイルはspec/requestsの中に置く、といったディレクトリ構造をしています。また、requestのspecファイルにはメタデータ:typeの値に:requestを入れる、といった記述方法があります。

<!--
## filter_rails_from_backtrace
-->

## モデルスペック

メタデータ:typeの値に:modelを入れた場合、モデル用のexampleが使用できます。モデルのメソッドなどを検証するために使用します。

<!--
### トランザクション検証

use_transactional_examplesを使用することでトランザクション検証を実行するか設定することができます。

### instance_double
## Controller specs
-->

## マッチャー

rspec-railsはいくつかのカスタムマッチャーを提供しています。

<!--
### be_a_new
### render_template
### redirect_to
### have_http_status
-->

### match_array

match_arrayを使用すると要素の個数と同値性を検証します。match_arrayは要素の順番を検証しません。

<!--
### have_enqueued_job
-->

## リクエストスペック

メタデータ:typeの値に:requestを入れた場合、リクエスト用のexampleが使用できます。URLの応答などを検証するために使用します。

## フィーチャースペック

メタデータ:typeの値に:featureを入れた場合、フィーチャー用のexampleが使用できます。End-to-Endテストのような検証を実行するために使用します。

<!--
## View specs
-->

## ヘルパースペック

メタデータ:typeの値に:helperを入れた場合、ヘルパー用のexampleが使用できます。ヘルパーのメソッドなどを検証するために使用します。

## メーラースペック

メタデータ:typeの値に:mailerを入れた場合、メーラー用のexampleが使用できます。メーラーのメソッドなどを検証するために使用します。

<!--
## Routing specs
## libスペック
-->

## ジョブスペック

メタデータ:typeの値に:jobを入れた場合、ジョブ用のexampleが使用できます。ジョブのキューを検証するために使用します。

## バリデータスペック

メタデータ:typeの値に:validatorを入れた場合、バリデータ用のexampleが使用できます。パラメタライズドテストをするために使用します。

### dbscope オプション

SHIRASAGI は RSpec を拡張しており、spec ファイルの先頭の describe に dbscope というオプションを指定できます。dbscope オプションの意味は:

- example: テストを実行する毎にデータベースを初期化します。
- context: spec ファイル毎にデータベースを初期化します。context が規定値です。

~~~ruby
describe Cms::User, dbscope: :example do
  subject(:model) { Cms::User }
  subject(:factory) { :ss_user }

  it_behaves_like "mongoid#save"
  it_behaves_like "mongoid#find"
end
~~~

dbscopeの初期値はspec/spec_helper.rbで定義しています。

~~~ruby
# spec/spec_helper.rb

config.add_setting :default_dbscope, default: :context
~~~

dbscopeの詳細はspec/support/ss/database_cleaner_support.rbに記述されています。

~~~ruby
# spec/support/ss/database_cleaner_support.rb

      dbscope = obj.metadata[:dbscope]
      dbscope ||= RSpec.configuration.default_dbscope
~~~

## Capybara

CapybaraはWebのアクセスをシミュレートするヘルパーです。フィーチャースペックを記述する際に必要なものです。

### ブラウザエンジン

Capybaraはブラウザエンジンを使用して仮想的に画面を操作しています。初期設定ではRack::Testというブラウザエンジンを使用します。SHIRASAGIではブラウザエンジンをPoltergeistに変更しています。

## Poltergeist

Poltergeistはphantomjsを使用するヘッドレスのブラウザエンジンです。Poltergeistを使用することでJavaScriptのテストを実行することが可能となります。js: trueを使用するとJavaScriptのテストが可能です。

~~~ruby
describe "#new", js: true do
  ...
end
~~~

## phantomjs

phantomjsはWebkitベースのヘッドレスブラウザです。Poltergeist内で使用しています。CentOS 64bitでphantomjsコマンドを/usr/local/bin/にインストールする場合、以下のように実行します。

~~~bash
$ cd /usr/local/src
$ sudo wget https://bitbucket.org/ariya/phantomjs/downloads/phantomjs-1.9.7-linux-x86_64.tar.bz2
$ sudo tar jxvf phantomjs-1.9.7-linux-x86_64.tar.bz2
$ cd phantomjs-1.9.7-linux-x86_64
$ sudo cp -p bin/phantomjs /usr/local/bin
~~~

<!--
## スクリーンショット

page.save_screenshotを使用することでスクリーンショットが取れます。
## Java Script の実行
-->

## FactoryGirl

複数のテストケースで同じデータを使いたい場合、FactoryGirlを使用することで一か所にテストデータを定義できます。定義したデータをファクトリーと呼びます。ファクトリーはspec/factoriesの下に配置します。テストデータを使用したい箇所でcreateを使用することでテスト用のデータベースに登録されます。

## support

SHIRASAGIではspec/support配下にヘルパーメソッドを定義しています。これにより、ヘルパーメソッドを一か所に定義しています。

## WebMock

WebMockは、外部へのHTTPリクエストをスタブ化します。WebMock.stub_requestを使用することでスタブの登録ができます。WebMock.allow_net_connect!を使用することでstub登録したホスト以外へのアクセスは許可します。

## Travis CI

Travis CIは継続的インテグレーションのためのサービスです。SHIRASAGIではTravis CIを使用しており、Githubにプッシュ、プルリクエストを実行した際にテストコードを自動的に実行します。Travis CIの設定は.travis.ymlに記述します。

## Coveralls

Coverallsはコードカバレッジと呼ばれるテストのカバー率を計測してくれるサービスです。.coveralls.ymlにサービスを指定することで連動させることができます。SHIRASAGIではTravis CIをサービスに指定しています。
