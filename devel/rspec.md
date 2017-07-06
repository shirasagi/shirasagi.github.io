---
layout: default
title: RSpecの運用
---

# RSpecの運用

## Specディレクトリ

シラサギのRSpecは以下のディレクトリで構成されています。

|ディレクトリ|説明|
|---|---|
|[factories](#factories)|ファクトリー|
|[features](#features)|統合テストスペック|
|[fixtures](#fixtures)|非データベースのデータ|
|helpers|ヘルパースペック|
|jobs|ジョブスペック|
|lib|ライブラリスペック|
|mailers|メーラースペック|
|[models](#models)|モデルスペック|
|requests|リクエストスペック|
|[support](#support)|ヘルパーメソッド|
|validators|バリデータスペック|

このうち、スペックを配置しているのは以下のディレクトリです。

|ディレクトリ|説明|
|---|---|
|[features](#features)|統合テストスペック|
|helpers|ヘルパースペック|
|jobs|ジョブスペック|
|lib|ライブラリスペック|
|mailers|メーラースペック|
|[models](#models)|モデルスペック|
|requests|リクエストスペック|
|validators|バリデータスペック|

シラサギではモデルのテストをmodels、コントローラー、ビューのテストをfeaturesに記述しています。その他のテストはそれぞれ対応したディレクトリに記述しています。[rspec-rails](http://www.rubydoc.info/gems/rspec-rails/frames)にはcontrollers, viewsなどのディレクトリ、exampleが用意されていますが、シラサギでは使用しません。

### <a name="features"></a> features

featuresは統合テストのスペックのディレクトリです。featureスペックではdescribe以下にletを使用してインスタンスを定義しています。インスタンスにはファクトリー、ヘルパー、パスなどを使用します。特定のパラメータを使用してテストしたい場合、ファクトリーを使用します。特別なパラメータを使用しない場合ヘルパーを使用します。

~~~ruby
let(:site) { cms_site }
let(:group) { cms_group }
let(:item) { create(:cms_test_user, group: group) }
let(:index_path) { cms_users_path site.id }
let(:new_path) { new_cms_user_path site.id }
let(:show_path) { cms_user_path site.id, item }
let(:edit_path) { edit_cms_user_path site.id, item }
let(:delete_path) { delete_cms_user_path site.id, item }
let(:import_path) { import_cms_users_path site.id }
~~~

シラサギを使用するにはログインが必要です。テストを実行するためにはログインの動作を記述する必要があります。

~~~ruby
it "#index" do
  login_cms_user
  visit index_path
  expect(current_path).not_to eq sns_login_path
end
~~~

ログインにはlogin_cms_userというヘルパーを使用します。ログイン後、visitで目的のパスに移動します。

JavaScriptのテストのために処理を待つ必要がある場合があります。
その場合、Capybara の機能を利用して、JavaScript の実行により作成される要素が
存在するかどうかをスペックに書きます。 

~~~ruby
visit new_path
click_on "グループを選択する"
click_on group.name
~~~

"グループを選択する"をクリックするとJavaScriptが実行され、ダイアログが表示されます。Capybaraは自動的に、ダイアログ内にgroup.nameというテキストを持つリンクまたはボタンが出現するまで待機します。Capybaraの機能で待てない場合、`sleep 10`などをやむなく使用する場合があります。

featureスペックではステータスコードやcssの有無などを検証しています。

~~~ruby
expect(status_code).to eq 200
expect(page).to have_css(".article-pages")
expect(page).to have_selector(".article-pages article")
~~~

### <a name="models"></a> models

modelsはモデルのスペックのディレクトリです。モデルを検証するために使用しています。正しい値を入れたときの動作、不正な値を入れたときの動作、モデルの値の検証を実行します。featureスペック同様にdescribe以下にletを使用してインスタンスを定義しています。インスタンスにはファクトリー、ヘルパー、モデルなどを使用します。

~~~ruby
let(:model) { Cms::User }
let(:group1) { create(:cms_group, name: unique_id) }
let(:group2) { create(:cms_group, name: unique_id) }
let(:site1) { create(:cms_site, host: unique_id, domains: "#{unique_id}.example.jp", group_ids: [ group1.id ]) }
let(:site2) { create(:cms_site, host: unique_id, domains: "#{unique_id}.example.jp", group_ids: [ group2.id ]) }
~~~

以下にモデルの検証の使用例を記述します。

~~~ruby
it "save and find successfully" do
  expect { model.new(subject).save! }.not_to raise_error
  expect(model.where(email: subject[:email]).first).not_to be_nil
  # uid can be nil if email.presents
  expect(model.where(email: subject[:email]).first.uid).to be_nil
  expect(model.where(email: subject[:email]).first.has_attribute?(:uid)).to be_falsey
end
~~~
~~~ruby
it "save failed" do
  expect { model.new(subject).save! }.to raise_error Mongoid::Errors::Validations
end
~~~

## <a name="factories"></a> factories

factoriesはRSpecのテストデータを作成するファクトリーのディレクトリです。以下は`:cms_test_user`というファクトリーを作成する例です。

~~~ruby
factory :cms_test_user, traits: [:cms_user_rand_name, :cms_user_uid, :cms_user_email]
~~~

作成したファクトリーは以下のように使用します。

~~~ruby
let(:item) { create(:cms_test_user, group: group) }
~~~

ファクトリーはヘルパーメソッドを定義する際に使用できます。

~~~ruby
def cms_user
  cms_user = Cms::User.where(email: build(:cms_user).email).first
  cms_user ||= create(:cms_user, group: cms_group, role: cms_role)
  cms_user.in_password ||= "pass"
  cms_user
end
~~~

## <a name="fixtures"></a> fixtures

fixturesは画像やcsvといった非データベースのデータのディレクトリです。シラサギではインポート、エクスポートのテストなどに使用しています。featureスペックでファイルを添付する場合、以下のように記述します。

~~~ruby
attach_file "item[in_file]", "#{Rails.root}/spec/fixtures/cms/user/cms_users_1.csv"
~~~

## <a name="support"></a> support

supportはRSpecで使用するヘルパーメソッドのディレクトリです。login_cms_userなどの多用する動作などを記述します。

~~~ruby
def login_cms_user
  login_user cms_user
end

def login_user(user)
  visit sns_login_path
  within "form" do
    fill_in "item[email]", with: user.email
    fill_in "item[password]", with: "pass"
    click_button "ログイン"
  end
end
~~~

シラサギで使用している主なヘルパーメソッドを以下に記述します。

|ヘルパーメソッド|説明|
|---|---|
|create_cms_layout|:cms_layoutを作成します。|
|cms_member|:cms_memberを作成します。|
|login_member|Cms::Memberを使用してログインします。|
|logout_member|メンバーをログアウトします。|
|cms_user|:cms_userを作成します。|
|cms_group|:cms_groupを作成します。|
|cms_site|:cms_siteを作成します。|
|cms_role|:cms_role_adminを作成します。|
|login_cms_user|cms_userを使用してログインします。|
|create_gws_users|Gws::Userを作成します。|
|gws_site|Gws::Groupを返します。|
|gws_user|Gws::Userを返します。|
|login_gws_user|gws_userを使用してログインします。|
|replace_at|ハッシュを置換します。|
|replace_value_at|ハッシュの値を置換します。|
|build_config|OpenStructかどうかを判定します。|
|ss_user|:ss_userを作成します。|
|ss_group|:ss_groupを作成します。|
|ss_site|:ss_siteを作成します。|
|login_user|Userを使用してログインします。|
|login_ss_user|ss_userを使用してログインします。|
|sys_user|:sys_userを作成します。|
|sys_role|:sys_role_adminを作成します。|
|login_sys_user|sys_userを使用してログインします。|
|unique_id|Time.zone.nowからidを生成します。|

## メタデータ

シラサギではいくつかのメタデータを使用しています。以下に使用例を記述します。

~~~ruby
describe "cms_users", type: :feature, dbscope: :example do
~~~

### :type

:typeは[rspec-rails](http://www.rubydoc.info/gems/rspec-rails/frames)で用意された特定のマッチャーが使用できるようになるメタデータです。`type: feature`と記述することで統合テスト用のマッチャーが使用できます。

### :descope

:dbscopeはデータベースを初期化するヘルパーメソッドの実行タイミングを設定できます。:dbscopeのオプションを以下に記述します。

|オプション|説明|
|---|---|
|example|テストを実行する毎にデータベースを初期化します。|
|context|spec ファイル毎にデータベースを初期化します。context が規定値です。|

### フィルター

シラサギではメタデータをフィルターとして記述しています。以下に使用例を記述します。

~~~ruby
describe "article_pages", dbscope: :example, js: true do
~~~
~~~ruby
config.filter_run_excluding(js: true)
~~~

`config.filter_run_excluding(js: true)`を記述することで、`js: true`が含まれる箇所を無視するようになります。シラサギでは特定のソフトウェアがインストールされていない場合などにフィルターを使用しています。シラサギで使用しているフィルターを以下に記述します。

|フィルター|説明|
|---|---|
|:fragile|外部CIサービスで実行したくないテストに記述します。|
|:imap|IMAPサーバを使用するテストに記述します。|
|:js|JavaScriptを使用するテストに記述します。|
|:ldap|LDAPを使用するテストに記述します。|
|:mecab|MeCabを使用するテストに記述します。|
|:open_jtalk|Open JTalkを使用するテストに記述します。|
