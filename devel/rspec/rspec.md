---
layout: default
title: RSpec
---

## RSpecとは

RSpecはRubyプログラマーのためのビヘイビア駆動開発ツールであり、ビヘイビアを記述するためのドメイン特化言語(Domain Specific Language : DSL)を提供するフレームワークです。

### ビヘイビア

ビヘイビアとはプログラムの振る舞いです。モジュールやクラス、メソッドに対してどのような動作を実行してほしいか、記述します。

### ドメイン特化言語

ドメイン特化言語(Domain Specific Language : DSL)とは特定の領域(ドメイン)を記述するために作られた言語です。そのうち、DSLを定義する言語とDSLを実行する言語(SHIRASAGIの場合、Rubyのことを示す)が同じであるDSLを言語内DSLと呼びます。RSpecはRubyを拡張した言語内DSLとしてプログラムの振る舞いを記述します。

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

### described_class

グループの一番外側がクラスの場合、検証内でdescribed_class()メソッドとして使用できます。使用例を以下に記述します。

~~~ruby
RSpec.describe Fixnum do
  it "is available as described_class" do
    expect(described_class).to eq(Fixnum)
  end
end
~~~

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

## FactoryGirl

複数のテストケースで同じデータを使いたい場合、FactoryGirlを使用することで一か所にテストデータを定義できます。定義したデータをファクトリーと呼びます。ファクトリーはspec/factoriesの下に配置します。テストデータを使用したい箇所でcreateを使用することでテスト用のデータベースに登録されます。

## support

SHIRASAGIではspec/support配下にヘルパーメソッドを定義しています。これにより、ヘルパーメソッドを一か所に定義しています。

## WebMock

WebMockは、外部へのHTTPリクエストをスタブ化します。WebMock.stub_requestを使用することでスタブの登録ができます。WebMock.allow_net_connect!を使用することでstub登録したホスト以外へのアクセスは許可します。
