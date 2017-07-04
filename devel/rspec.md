---
layout: default
title: RSpecの運用
---

# RSpecの運用

## Specフォルダ

シラサギのRSpecは以下のフォルダで構成されています。

- factories
- features
- fixtures
- helpers
- jobs
- lib
- mailers
- models
- requests
- support
- validators

このうち、スペックを配置しているのは以下のフォルダです。

- features
- helpers
- jobs
- lib
- mailers
- models
- requests
- validators

シラサギではモデルのテストをmodels、コントローラー、ビューのテストをfeaturesに記述しています。その他のテストはそれぞれ対応したフォルダに記述しています。rspec-railsにはcontrollers, viewsのフォルダ、exampleが用意されていますが、シラサギでは使用しません。

### features

featuresは統合テストのスペックのフォルダです。featureスペックではdescribe以下にletを使用してインスタンスを定義しています。インスタンスにはファクトリー、ヘルパー、パスなどを使用します。

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

シラサギではJavaScriptを使用した箇所があります。JavaScriptのテストのために処理を待つ必要があります。シラサギではヘルパーを使用してJavaScriptの処理のテストを可能にしています。

featureスペックではステータスコードやcssの有無などを検証しています。

~~~ruby
expect(status_code).to eq 200
expect(page).to have_css(".article-pages")
expect(page).to have_selector(".article-pages article")
~~~

### models

modelsはモデルのスペックのフォルダです。モデルを検証するために使用しています。正しい値を入れたときの動作、不正な値を入れたときの動作、モデルの値の検証を実行します。

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

## factories

factoriesはRSpecのテストデータを作成するファクトリーのフォルダです。以下は`:cms_test_user`というファクトリーを作成する例です。

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

## fixtures

fixturesは画像やcsvといった非データベースのデータのフォルダです。シラサギではインポート、エクスポートのテストなどに使用しています。featureスペックでファイルを添付する場合、以下のように記述します。

~~~ruby
attach_file "item[in_file]", "#{Rails.root}/spec/fixtures/cms/user/cms_users_1.csv"
~~~

## support

supportはRSpecで使用するヘルパーメソッドのフォルダです。login_cms_userなどの多用する動作などを記述します。

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
