---
layout: default
title: RSpec w/ Google Chrome
---

Google Chrome (Headless モード)を使った Feature Spec を実行する方法を説明します。

## Google Chrome のインストール

最新版の Google Chrome をインストールします。

### CentOS 6/7

次のようなファイル `/etc/yum.repos.d/google-chrome.repo` を作成します。

~~~
[google-chrome]
name=google-chrome
baseurl=http://dl.google.com/linux/chrome/rpm/stable/x86_64
enabled=1
gpgcheck=1
gpgkey=https://dl.google.com/linux/linux_signing_key.pub
~~~

`yum` コマンドで Google Chrome をインストールします。

~~~
$ sudo yum install google-chrome-stable
~~~

お好みで日本語フォントもインストールします。

~~~
$ sudo yum install google-noto-sans-cjk-fonts
~~~

### Mac

[公式サイト](https://www.google.com/chrome/browser/desktop/index.html) からダウンロードし、インストールします。

## Google Chrome Driver のインストール

最新版の Google Chrome Driver をパスの通った所にインストールします。

### CentOS 6/7

[公式サイト](https://sites.google.com/a/chromium.org/chromedriver/downloads) からダウンロードし、
パスの通ったところ（例: `/usr/local/bin/`）へインストールします。

### Mac

[公式サイト](https://sites.google.com/a/chromium.org/chromedriver/downloads) からダウンロードし、
パスの通ったところへインストールします。


## RSpec の実行

Google Chrome / Google Chrome Driver がインストールされているかを検出し、
自動で Google Chrome を用いて Feature Spec を実行します。

Poltergeist / PhantomJS と Google Chrome / Google Chrome Driver の両方がインストールされている場合、
Google Chrome / Google Chrome Driver を優先して使用します。

### 実行オプション

RSpec を実行する際、幾つかのオプションを環境変数に指定することができます。

| オプション | 説明                                                |
|-----------|----------------------------------------------------|
| driver    | 利用するドライバーを指定します。既定値は 'auto' です。<br><br>例: Google Chrome / Google Chrome Driver を使う<br>driver=chrome bundle exec rspec<br><br>例: Poltergeist / PhantomJS を使う<br>driver=phantomjs bundle exec rspec |
| headless  | ヘッドレスモードを有効にするかどうかを指定します。既定値は '1' で、headless モードが有効になります。<br><br>例: Headless モードでテストを実行<br>headless=1 bundle exec rspec<br><br>例: ヘッドありモードでテストを実行<br>headless=0 bundle exec rspec<br><br>ヘッドありモードでテストを実行すると、どのような操作が行われているかが視覚的にわかりやすく表示され、テスト失敗の原因が分かりやすくなります。 |
