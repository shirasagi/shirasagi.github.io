---
layout: default
title: RSpec実行時に指定できる環境変数
---

[全文検索機能の開発とテスト](/devel/rspec_elasticsearch.html)では、起動済みの Elasticsearch コンテナのIDを環境変数 `ES_CONTAINER_ID` に設定することで、テスト実行を効率よく行うことができると説明しました。

SHIRASAGIのRSpecには環境変数 `ES_CONTAINER_ID` 以外にも有用な環境変数があります。本書ではRSpec実行時に用いることができる有用な環境変数一覧を提示します。

| 環境変数名       | 説明
|------------------|--------------------------------------------------------------
| allow_open_jtalk | '0' を指定すると、OpenJTalk を用いたテストが無効になります。既定値は '1' で、OpenJTalk を用いたテストは有効です。
| ES_CONTAINER_ID  | 起動済みの Elasticsearch コンテナのIDを指定します。指定することでテスト実行の効率を上げることができます。詳細は[全文検索機能の開発とテスト](/devel/rspec_elasticsearch.html)を参照してください。
| headless         | 既定値は 1 でヘッドレスモードでブラウザを用います。0 を指定するとブラウザの画面が実際に表示されるようになり、テスト実行中にどの様に操作しているのかを確認することができます。
| LDAP_TEST        | 'enable' を指定すると LDAP に関するテストが有効になります。既定値は 'disable' です。
| logs_on_failure  | '1' を指定すると、テスト失敗時にテストログをコンソールへ出力します。'0' を指定するとコンソールへ出力しません。既定値は '1' です。
| RSPEC_LOCALE     | RSpec実行時の言語を指定します。既定値は ja か en のどちらかがランダムで選択されます。
| TEST_LOG_LEVEL   | RSpec実行時のログレベルを 'debug', 'info', 'warn', 'error' の中から指定します。 既定値は 'debug' です。

## 補足: OpenJTalk を用いたテスト

環境変数 `allow_open_jtalk` を '1' に設定するだけでは有効にならず、OpenJTalk や lame などをインストールし、インストールしたパスを config/voice.yml に適切に設定する必要があります。

## 補足: LDAP_TEST

環境変数 `LDAP_TEST` を 'enable' に設定するだけでは有効にならず、事前に Docker コンテナ "osixia/openldap" を入手しておく必要があります。
入手していれば、テスト開始時に自動的にコンテナを起動するようになっています。
