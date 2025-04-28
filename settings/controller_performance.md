---
layout: default
title: コントローラーの性能計測と監視
---

本設定は v1.19 以降のシラサギで利用できます。

## シラサギの設定

Webサーバーのアクセスログから、そのリクエストを処理したシラサギのコントローラーとアクションを特定するのは困難です。

特に、"PUT" も "DELETE" も Web サーバーのアクセスログには "POST" として記録され、
同一のURLに "POST" と "DELETE" とに対応するアクションが登録されている場合、
Webサーバーのアクセスログからシラサギのコントローラーとアクションを特定するのは不可能になります。

そこで `config/environment.yml`（存在しない場合は config/defaults/environment.yml をコピー）の `set_received_by` を true にセットすると、以下の情報がシラサギのレスポンスヘッダーに追加されます。

| ヘッダー          | 説明             |
|------------------|------------------|
| X-SS-Received-At | リクエストを受信した日時を unixtime 形式で出力します。 |
| X-SS-Received-By | リクエストを処理したコントローラーとアクションを "GET sns/mypage#index" のような形式で出力します。 |

もともと Rails が X-Runtime というレスポンスヘッダーにコントローラーでの処理時間を出力していますので、X-Runtime と X-SS-Received-By とを利用することで、コントローラーの性能を計測したり性能を監視したりすることができるようになります。

## nginxの設定

### "X-SS-Received-At" と "X-SS-Received-By" との非公開

`set_received_by` を true に設定するとリクエストを処理したコントローラーとアクションがレスポンスヘッダーに出力されるようになります。
このままでは実害はないとはいえ世界中にコントローラーとアクションが垂れ流されてしまいますので、nginx の設定を変更して、"X-SS-Received-At" と "X-SS-Received-By" とを非公開にします。

"X-SS-Received-At" と "X-SS-Received-By" とを非公開にするには、以下の設定を nginx の設定に追加してやります。

~~~
proxy_hide_header x-ss-received-at;
proxy_hide_header x-ss-received-by;
~~~

シラサギをシラサギの標準的な構成でインストールしている場合 `/etc/nginx/conf.d/header.conf` に追記してください。

### "X-Runtime" と "X-SS-Received-By" とをログへ出力

次に X-Runtime と X-SS-Received-By をアクセスログに出力するように nginx の設定を変更します。
コントローラーの性能の集計には jq コマンドを利用するので、アクセスログを JSON 形式で出力するように設定します。

> jq コマンドはJSONから簡単に値を抜き出したり、集計したり、整形して表示したりできるJSON用のコマンドです。

X-Runtime と X-SS-Received-By をJSON形式でアクセスログに出力するには、以下の設定を nginx の設定に追加してやります。

~~~
    log_format json escape=json '{'
                                ' "body_bytes_sent": "$body_bytes_sent",'
                                ' "host": "$host",'
                                ' "referer": "$http_referer",'
                                ' "remote_addr": "$remote_addr",'
                                ' "remote_user": "$remote_user",'
                                ' "request_length": "$request_length",'
                                ' "request_method": "$request_method",'
                                ' "request_uri": "$request_uri",'
                                ' "request_time": "$request_time",'
                                ' "server_protocol": "$server_protocol",'
                                ' "session_id": "$cookie__ss_session",'
                                ' "status": "$status",'
                                ' "time": "$time_iso8601",'
                                ' "time_unix": "$msec",'
                                ' "upstream_response_time": "$upstream_response_time",'
                                ' "user_agent": "$http_user_agent",'
                                ' "x_forwarded_for": "$http_x_forwarded_for",'
                                ' "x_forwarded_host": "$http_x_forwarded_host",'
                                ' "x_forwarded_proto": "$http_x_forwarded_proto",'
                                ' "x_request_id": "$upstream_http_x_request_id",'
                                ' "x_runtime": "$upstream_http_x_runtime",'
                                ' "x_ss_received_by": "$upstream_http_x_ss_received_by",'
                                ' "ch_ua": "$http_sec_ch_ua",'
                                ' "ch_ua_arch": "$http_sec_ch_ua_arch",'
                                ' "ch_ua_bitness": "$http_sec_ch_ua_bitness",'
                                ' "ch_ua_form_factors": "$http_sec_ch_ua_form_factors",'
                                ' "ch_ua_full_version": "$http_sec_ch_ua_full_version",'
                                ' "ch_ua_full_version_list": "$http_sec_ch_ua_full_version_list",'
                                ' "ch_ua_mobile": "$http_sec_ch_ua_mobile",'
                                ' "ch_ua_model": "$http_sec_ch_ua_model",'
                                ' "ch_ua_platform": "$http_sec_ch_ua_platform",'
                                ' "ch_ua_platform_version": "$http_sec_ch_ua_platform_version",'
                                ' "ch_ua_wow64": "$http_sec_ch_ua_wow64"'
                                '}';

    access_log  /var/log/nginx/access.json  json;
~~~

この設定では X-Runtime と X-SS-Received-By 以外に性能監視に役立ちそうな情報を出力するようにしています。

シラサギをシラサギの標準的な構成でインストールしている場合 `/etc/nginx/nginx.conf` に追記してください。

設定できたら nginx を reload してください。
そして、シラサギにアクセスし、以下のコマンドを実行し設定が正しいかどうか確認してください。

~~~
jq . < /var/log/nginx/access.json
~~~

> jq コマンドのインストールについては、適時インターネットなどを参照し、利用しているOSに適した方法でインストールしてください。

## apache httpdの設定

### "X-SS-Received-At" と "X-SS-Received-By" との非公開

`set_received_by` を true に設定するとリクエストを処理したコントローラーとアクションがレスポンスヘッダーに出力されるようになります。
このままでは実害はないとはいえ世界中にコントローラーとアクションが垂れ流されてしまいますので、apache httpd の設定を変更して、"X-SS-Received-At" と "X-SS-Received-By" とを非公開にします。

"X-SS-Received-At" と "X-SS-Received-By" とを非公開にするには、以下の設定を apache httpd の設定に追加してやります。

~~~
  Header note X-Ss-Received-At Note-Ss-Received-At
  Header note X-Ss-Received-By Note-Ss-Received-By
  Header unset X-Ss-Received-At
  Header unset X-Ss-Received-By
~~~

シラサギをシラサギの標準的な構成でインストールしている場合 `/etc/httpd/conf.d/shirasagi.conf` に追記してください。

### "X-Runtime" と "X-SS-Received-By" とをログへ出力

次に X-Runtime と X-SS-Received-By をアクセスログに出力するように apache httpd の設定を変更します。
コントローラーの性能の集計には jq コマンドを利用するので、アクセスログを JSON 形式で出力するように設定します。

> jq コマンドはJSONから簡単に値を抜き出したり、集計したり、整形して表示したりできるJSON用のコマンドです。

X-Runtime と X-SS-Received-By をJSON形式でアクセスログに出力するには、以下の設定を apache httpd の設定に追加してやります。

{% raw %}
    LogFormat '{"body_bytes_sent":"%b","host":"%v","referer":"%{Referer}i","remote_addr":"%a","remote_user":"%u","request_length":"%I","request_method":"%m","request_uri":"%U%q","request_time_micro":"%D","server_protocol":"%H","session_id":"%{_ss_session}C","status":"%>s","time":"%{%FT%T}t.%{msec_frac}t%{%z}t","time_unix":"%{%s}t.%{msec_frac}t","user_agent":"%{User-Agent}i","x_forwarded_for":"%{X-Forwarded-For}i","x_forwarded_host":"%{X-Forwarded-Host}i","x_forwarded_proto":"%{X-Forwarded-Proto}i","x_request_id":"%{X-Request-Id}o","x_runtime":"%{X-Runtime}o","x_ss_received_by":"%{Note-SS-Received-By}n","ch_ua":"%{Sec-CH-UA}i","ch_ua_arch":"%{Sec-CH-UA-Arch}i","ch_ua_bitness":"%{Sec-CH-UA-Bitness}i","ch_ua_form_factors":"%{Sec-CH-UA-Form-Factors}i","ch_ua_full_version":"%{Sec-CH-UA-Full-Version}i","ch_ua_full_version_list":"%{Sec-CH-UA-Full-Version-List}i","ch_ua_mobile":"%{Sec-CH-UA-Mobile}i","ch_ua_model":"%{Sec-CH-UA-Model}i","ch_ua_platform":"%{Sec-CH-UA-Platform}i","ch_ua_platform_version":"%{Sec-CH-UA-Platform-Version}i","ch_ua_wow64":"%{Sec-CH-UA-WoW64}i"}' json

    CustomLog "logs/access_json" json
{% endraw %}

この設定では X-Runtime と X-SS-Received-By 以外に性能監視に役立ちそうな情報を出力するようにしています。

シラサギをシラサギの標準的な構成でインストールしている場合 `/etc/httpd/conf/httpd.conf` に追記してください。

設定できたら apache httpd を reload してください。
そして、シラサギにアクセスし、以下のコマンドを実行し設定が正しいかどうか確認してください。

~~~
jq . < /var/log/httpd/access_json
~~~

> jq コマンドのインストールについては、適時インターネットなどを参照し、利用しているOSに適した方法でインストールしてください。

## logrotateの設定

本書通りに設定すると新しいログファイル `/var/log/httpd/access_json` が作成されるようになります。
通常ではログ・ローテーションの対象になっていないので、お使いのOSのログローテート設定ファイルを確認してください。

なお、通常は logrotate コマンドによるログ・ローテーション処理が定期的に実行されてされており、
logrotate コマンドの設定ファイルが `/etc/logrotate.conf` や `/etc/logrotate.d/` に見つかります。

### nginxの場合

AlmaLinux 8 であれば nginx 用のログ・ローテーション設定ファイルが `/etc/logrotate.d/` にあるので、
このファイルを以下のように変更します。

~~~
/var/log/nginx/*.log
/var/log/nginx/*.json {
        monthly
        missingok
        rotate 12
        compress
        delaycompress
        notifempty
        create 640 nginx adm
        sharedscripts
        postrotate
                [ -f /var/run/nginx.pid ] && kill -USR1 `cat /var/run/nginx.pid`
        endscript
}
~~~

### apache httpdの場合

AlmaLinux 8 であれば apache httpd 用のログ・ローテーション設定ファイルが `/etc/logrotate.d/httpd` にあるので、
このファイルを以下のように変更します。

~~~
/var/log/httpd/*log
/var/log/httpd/*json {
    monthly
    rotate 12
    compress
    missingok
    notifempty
    sharedscripts
    delaycompress
    postrotate
        /bin/systemctl reload httpd.service > /dev/null 2>/dev/null || true
    endscript
}
~~~

## jq コマンドによる集計例

静的ファイルの応答など一部のリクエストについては nginx のみで完結し、シラサギにリクエストが送られることはありません。この場合、`x_ss_received_by` が空文字列になりますので、集計の前に jq コマンドを用いて `x_ss_received_by` が入っているログだけを抽出します。

~~~
cat /var/log/nginx/access.json | jq -c 'select(.x_ss_received_by != "")'
~~~

> jq コマンドでは、文字列はダブルクォーテーションで囲まなければなりません。シングルクォーテーションで囲むと syntax error が発生します。

jq コマンドの `select` を用いると他の条件でも抽出することができます。
昨日のアクセスログ（昨日の0時～23時59分59秒）を抽出する例です。

~~~
cat /var/log/nginx/access.json | jq -c "select(.time | startswith(\"$(date --date '1 day ago' +%Y-%m-%d)T\"))"
~~~

1時間前のアクセスログを抽出する例です。

~~~
cat /var/log/nginx/access.json | jq -c "select(.time | startswith(\"$(date --date '1 hour ago' +%Y-%m-%dT%H\:)T\"))"
~~~

jq コマンドの `group_by`, `reduce` や `sort_by` を用いることで集計することができます。
動作の遅いコントローラー Top 5 を出力する例です。

~~~
cat /var/log/nginx/access.json |\
  jq -c 'select(.x_ss_received_by != "") | { x_ss_received_by: .x_ss_received_by, x_runtime: .x_runtime | tonumber, count: 1 }' |\
  jq -s 'group_by(.x_ss_received_by)' |\
  jq -c '.[] | reduce .[] as {$x_ss_received_by,$x_runtime,$count} (null; .x_ss_received_by = $x_ss_received_by | .x_runtime += $x_runtime | .count += $count)' |\
  jq -s -c 'sort_by(.x_runtime) | reverse | .[0:5] | .[]' |\
  jq -r '[ .x_ss_received_by, .x_runtime, .count ] | join(" ")'
~~~

アクセス数の多いコントローラー Top 5 を出力する例です。

~~~
cat /var/log/nginx/access.json |\
  jq -c 'select(.x_ss_received_by != "") | { x_ss_received_by: .x_ss_received_by, x_runtime: .x_runtime | tonumber, count: 1 }' |\
  jq -s 'group_by(.x_ss_received_by)' |\
  jq -c '.[] | reduce .[] as {$x_ss_received_by,$x_runtime,$count} (null; .x_ss_received_by = $x_ss_received_by | .x_runtime += $x_runtime | .count += $count)' |\
  jq -s -c 'sort_by(.count) | reverse | .[0:5] | .[]' |\
  jq -r '[ .x_ss_received_by, .x_runtime, .count ] | join(" ")'
~~~

これらを組み合わせてコントローラーの性能計測したり監視したりしてください。
