---
layout: default
title: ウェブメール開発環境の構築
---

本章ではシラサギのウェブメール開発環境の構築方法を解説します。

## 構築手順

以下のサービスを設定します。

- IMAP サーバーとして Dovecot
- MTA として Postfix

シラサギのユーザーが既定で `example.jp` ドメインに所属するので、
`example.jp` ドメインでメールの送受信が可能となるように Postfix と Dovecot を設定します。

さらに、開発サーバーですので外部にメールが誤って送られないように設定します。

最後にシラサギのウェブメールを設定します。

対象 OS は CentOS7 です。他の OS をご利用の方は適時読み替えてください。

## Dovecot

###  インストール

次のコマンドを実行し Dovecot をインストールします。

~~~shell
$ sudo yum install dovecot
~~~

### 設定

Dovecot の次の設定ファイルを編集します。

- `/etc/dovecot/conf.d/10-auth.conf`
- `/etc/dovecot/conf.d/10-mail.conf`
- `/etc/dovecot/conf.d/10-master.conf`
- `/etc/dovecot/conf.d/10-ssl.conf`
- `/etc/dovecot/conf.d/20-imap.conf`
- `/etc/dovecot/conf.d/90-quota.conf`
- `/etc/dovecot/conf.d/auth-static.conf.ext`
- `/etc/dovecot/users`

それぞれのファイルの差分を以下に掲載するので適時修正してください。

#### /etc/dovecot/conf.d/10-auth.conf

~~~diff
--- 10-auth.conf.orig	2013-04-17 22:59:47.000000000 +0900
+++ 10-auth.conf	2017-10-18 11:31:05.818193658 +0900
@@ -97,7 +97,7 @@
 #   plain login digest-md5 cram-md5 ntlm rpa apop anonymous gssapi otp skey
 #   gss-spnego
 # NOTE: See also disable_plaintext_auth setting.
-auth_mechanisms = plain
+auth_mechanisms = cram-md5
 
 ##
 ## Password and user databases
@@ -119,10 +119,10 @@
 #!include auth-deny.conf.ext
 #!include auth-master.conf.ext
 
-!include auth-system.conf.ext
+#!include auth-system.conf.ext
 #!include auth-sql.conf.ext
 #!include auth-ldap.conf.ext
-#!include auth-passwdfile.conf.ext
+!include auth-passwdfile.conf.ext
 #!include auth-checkpassword.conf.ext
 #!include auth-vpopmail.conf.ext
-#!include auth-static.conf.ext
+!include auth-static.conf.ext
~~~

次の設定を変更しています。　

- CRAMD-MD5 で認証するように設定
- 既定の auth-system.conf.ext の include を無効化
- auth-passwdfile.conf.ext と auth-static.conf.ext の include を有効化

#### /etc/dovecot/conf.d/10-mail.conf

~~~diff
--- 10-mail.conf.orig	2017-08-03 15:50:49.000000000 +0900
+++ 10-mail.conf	2017-10-20 16:37:14.173826076 +0900
@@ -28,6 +28,7 @@
 # <doc/wiki/MailLocation.txt>
 #
 #mail_location = 
+mail_location = maildir:/var/spool/virtual/%d/%n/Maildir
 
 # If you need to set multiple mailbox locations or want to change default
 # namespace settings, you can do it by defining namespace sections.
@@ -206,6 +207,7 @@
 # Space separated list of plugins to load for all services. Plugins specific to
 # IMAP, LDA, etc. are added to this list in their own .conf files.
 #mail_plugins = 
+mail_plugins = quota
 
 ##
 ## Mailbox handling optimizations
~~~

次の設定を変更しています。　

- メールの保存場所を設定
  - これを設定することで、メールの保存場所が存在しない場合自動で作成されるようになります。
- quota プラグインの有効化

#### /etc/dovecot/conf.d/10-master.conf

~~~diff
--- 10-master.conf.orig	2013-03-14 22:28:31.000000000 +0900
+++ 10-master.conf	2017-10-17 20:50:01.176512404 +0900
@@ -86,16 +86,18 @@
   # To give the caller full permissions to lookup all users, set the mode to
   # something else than 0666 and Dovecot lets the kernel enforce the
   # permissions (e.g. 0777 allows everyone full permissions).
-  unix_listener auth-userdb {
-    #mode = 0666
-    #user = 
-    #group = 
-  }
+  #unix_listener auth-userdb {
+  #  #mode = 0666
+  #  #user = 
+  #  #group = 
+  #}
 
   # Postfix smtp-auth
-  #unix_listener /var/spool/postfix/private/auth {
-  #  mode = 0666
-  #}
+  unix_listener /var/spool/postfix/private/auth {
+    mode = 0666
+    user = postfix
+    group = postfix
+  }
 
   # Auth process is run as this user.
   #user = $default_internal_user
~~~

次の設定を変更しています。　

- 標準の unix_listener を無効化
- Postfix の SMTP を Dovecot で認証するための設定を追加

#### /etc/dovecot/conf.d/10-ssl.conf

~~~
--- 10-ssl.conf.orig	2017-08-03 15:51:20.000000000 +0900
+++ 10-ssl.conf	2017-10-20 12:17:06.801631069 +0900
@@ -5,7 +5,8 @@
 # SSL/TLS support: yes, no, required. <doc/wiki/SSL.txt>
 # disable plain pop3 and imap, allowed are only pop3+TLS, pop3s, imap+TLS and imaps
 # plain imap and pop3 are still allowed for local connections
-ssl = required
+#ssl = required
+ssl = no
 
 # PEM encoded X.509 SSL/TLS certificate and private key. They're opened before
 # dropping root privileges, so keep the key file unreadable by anyone but
~~~

次の設定を変更しています。　

- SSL/TLS の無効化

#### /etc/dovecot/conf.d/20-imap.conf

~~~diff
--- 20-imap.conf.orig	2013-05-20 05:18:00.000000000 +0900
+++ 20-imap.conf	2017-10-18 11:59:13.175050143 +0900
@@ -53,7 +53,7 @@
 
 protocol imap {
   # Space separated list of plugins to load (default is global mail_plugins).
-  #mail_plugins = $mail_plugins
+  mail_plugins = $mail_plugins imap_quota
 
   # Maximum number of IMAP connections allowed for a user from each IP address.
   # NOTE: The username is compared case-sensitively.
~~~

次の設定を変更しています。　

- IMAP 利用時の quota プラグインの有効化

#### /etc/dovecot/conf.d/90-quota.conf

~~~diff
--- 90-quota.conf.orig	2013-04-17 22:59:47.000000000 +0900
+++ 90-quota.conf	2017-10-18 12:02:31.762633631 +0900
@@ -15,13 +15,13 @@
 # to give additional 100 MB when saving to Trash:
 
 plugin {
-  #quota_rule = *:storage=1G
-  #quota_rule2 = Trash:storage=+100M
+  quota_rule = *:storage=1G
+  quota_rule2 = Trash:storage=+100M
 
   # LDA/LMTP allows saving the last mail to bring user from under quota to
   # over quota, if the quota doesn't grow too high. Default is to allow as
   # long as quota will stay under 10% above the limit. Also allowed e.g. 10M.
-  #quota_grace = 10%%
+  quota_grace = 10%%
 }
 
 ##
@@ -65,7 +65,7 @@
 
 plugin {
   #quota = dirsize:User quota
-  #quota = maildir:User quota
+  quota = maildir:User quota
   #quota = dict:User quota::proxy::quota
   #quota = fs:User quota
 }
~~~

次の設定を変更しています。　

- quota の有効化

#### /etc/dovecot/conf.d/auth-static.conf.ext

~~~diff
--- auth-static.conf.ext.orig	2013-05-20 05:18:00.000000000 +0900
+++ auth-static.conf.ext	2017-10-17 20:28:20.423883735 +0900
@@ -22,3 +22,8 @@
 #  driver = static
 #  args = uid=vmail gid=vmail home=/home/%u
 #}
+
+userdb {
+  driver = static
+  args = uid=10000 gid=10000 home=/var/spool/virtual/%d/%n
+}
~~~

次の設定を変更しています。　

- IMAP 利用時にディレクトリ `/var/spool/virtual` 以下に保存したメールを参照するように設定

#### /etc/dovecot/users

このファイルには IMAP の利用ユーザーとそのパスワードを登録します。
まず `doveadm` コマンドを実行し、ハッシュ化されたパスワードを生成します。

~~~shell
$ doveadm pw
Enter new password: pass
Retype new password: pass
{CRAM-MD5}ff5d74b19e3cb9b2b9f4fcb548fe023aeb44f67f231a5a89714d08b5fec22b78
~~~

上の実行例ではパスワード `pass` をハッシュ化しています。
次のような内容を持つテキストを `/etc/dovecot/users` に設定します。

~~~
sys@example.jp:{CRAM-MD5}ff5d74b19e3cb9b2b9f4fcb548fe023aeb44f67f231a5a89714d08b5fec22b78
admin@example.jp:{CRAM-MD5}ff5d74b19e3cb9b2b9f4fcb548fe023aeb44f67f231a5a89714d08b5fec22b78
user1@example.jp:{CRAM-MD5}ff5d74b19e3cb9b2b9f4fcb548fe023aeb44f67f231a5a89714d08b5fec22b78
user2@example.jp:{CRAM-MD5}ff5d74b19e3cb9b2b9f4fcb548fe023aeb44f67f231a5a89714d08b5fec22b78
user3@example.jp:{CRAM-MD5}ff5d74b19e3cb9b2b9f4fcb548fe023aeb44f67f231a5a89714d08b5fec22b78
~~~

この例では `sys@example.jp`, `admin@example.jp`, `user1@example.jp`, `user2@example.jp`, `user3@example.jp` の 5 ユーザーを登録し、全ユーザーのパスワードが `pass` であることを前提としています。
シラサギに設定しているユーザー / パスワードに応じて適時読み替えてください。

### 有効化と起動

次のコマンドを実行し dovecot を有効化し起動します。

~~~shell
$ sudo systemctl enable dovecot
$ sudo systemctl start dovecot
~~~

## Postfix

### 設定

CentOS7 であれば Postfix は標準でインストールされているのでインストールは不要です。
設定の変更点だけ説明します。
次の Postfix の設定ファイルを編集します。

- `/etc/postfix/master.cf`
- `/etc/postfix/main.cf`
- `/etc/postfix/header_checks`

それぞれのファイルの差分を以下に掲載するので適時修正してください。

#### /etc/postfix/master.cf

~~~diff
--- master.cf.orig	2014-06-10 10:39:23.000000000 +0900
+++ master.cf	2017-10-17 20:32:20.048020986 +0900
@@ -13,7 +13,7 @@
 #smtpd     pass  -       -       n       -       -       smtpd
 #dnsblog   unix  -       -       n       -       0       dnsblog
 #tlsproxy  unix  -       -       n       -       0       tlsproxy
-#submission inet n       -       n       -       -       smtpd
+submission inet n       -       n       -       -       smtpd
 #  -o syslog_name=postfix/submission
 #  -o smtpd_tls_security_level=encrypt
 #  -o smtpd_sasl_auth_enable=yes
~~~

次の設定を変更しています。　

- サブミッションポート（587）の有効化

#### /etc/postfix/main.cf

~~~diff
--- main.cf.orig	2014-06-10 10:39:24.000000000 +0900
+++ main.cf	2017-10-25 11:29:54.711718567 +0900
@@ -74,6 +74,7 @@
 #
 #myhostname = host.domain.tld
 #myhostname = virtual.domain.tld
+myhostname = ss001.example.jp
 
 # The mydomain parameter specifies the local internet domain name.
 # The default is to use $myhostname minus the first component.
@@ -81,6 +82,7 @@
 # parameters.
 #
 #mydomain = domain.tld
+mydomain = example.jp
 
 # SENDING MAIL
 # 
@@ -97,6 +99,7 @@
 #
 #myorigin = $myhostname
 #myorigin = $mydomain
+myorigin = $mydomain
 
 # RECEIVING MAIL
 
@@ -113,7 +116,8 @@
 #inet_interfaces = all
 #inet_interfaces = $myhostname
 #inet_interfaces = $myhostname, localhost
-inet_interfaces = localhost
+#inet_interfaces = localhost
+inet_interfaces = all
 
 # Enable IPv4, and IPv6 if supported
 inet_protocols = all
@@ -249,6 +253,7 @@
 #mynetworks_style = class
 #mynetworks_style = subnet
 #mynetworks_style = host
+mynetworks_style = subnet
 
 # Alternatively, you can specify the mynetworks list by hand, in
 # which case Postfix ignores the mynetworks_style setting.
@@ -417,6 +422,7 @@
 #
 #home_mailbox = Mailbox
 #home_mailbox = Maildir/
+home_mailbox = Maildir/
  
 # The mail_spool_directory parameter specifies the directory where
 # UNIX-style mailboxes are kept. The default setting depends on the
@@ -545,7 +551,7 @@
 #
 # For details, see "man header_checks".
 #
-#header_checks = regexp:/etc/postfix/header_checks
+header_checks = regexp:/etc/postfix/header_checks
 
 # FAST ETRN SERVICE
 #
@@ -677,3 +683,17 @@
 # readme_directory: The location of the Postfix README files.
 #
 readme_directory = /usr/share/doc/postfix-2.10.1/README_FILES
+
+#
+virtual_mailbox_domains = example.jp
+virtual_mailbox_base = /var/spool/virtual
+virtual_mailbox_maps = hash:/etc/postfix/vmailbox
+virtual_uid_maps = static:10000
+virtual_gid_maps = static:10000
+
+#
+smtpd_sasl_auth_enable = yes
+smtpd_sasl_type = dovecot
+smtpd_sasl_path = private/auth
+smtpd_client_restrictions = permit_mynetworks, reject_unknown_client, permit
+smtpd_recipient_restrictions = permit_mynetworks, permit_sasl_authenticated, reject_unauth_destination
~~~

#### /etc/postfix/header_checks

次の行をファイルの末尾に追加します。

~~~
/^To:.*@example.jp/ OK
/^To:.*/ REDIRECT sys@example.jp
~~~

この設定は To に `@example.jp` ドメインを持つメールアドレスが設定されていれば送信 OK とし、
それ以外のメールアドレスが設定されていれば `sys@example.jp` へ転送します。

### メールディレクトリの作成

ディレクトリを作成する前に、次のユーザーとグループを作成します。

~~~shell
$ sudo groupadd -g 10000 mailuser
$ sudo useradd -u 10000 -g mailuser -s /sbin/nologin mailuser
~~~

今回は `/var/spool/virtual` ディレクトリにメールを保存するように Postfix を設定したので、
次のコマンドを実行しディレクトリを作成します。

~~~shell
$ sudo mkdir /var/spool/virtual
$ sudo chown -R mailuser:mailuser /var/spool/virtual
~~~

### 仮想ユーザーの作成

Postfix でメールを受信可能なユーザーを作成します。

以下のような内容を持つ `/etc/postfix/vmailbox` を作成します。

~~~
sys@example.jp   example.jp/sys/Maildir/
admin@example.jp example.jp/admin/Maildir/
user1@example.jp example.jp/user1/Maildir/
user2@example.jp example.jp/user2/Maildir/
user3@example.jp example.jp/user3/Maildir/
~~~

`sys@example.jp` 宛に届いたメールは `/var/spool/virtual/example.jp/sys/Maildir/` 以下に格納するように設定しています。

そして次のコマンドを実行しテキストファイルを DB 化します。

~~~shell
$ sudo postmap /etc/postfix/vmailbox
~~~

### 再起動

次のコマンドを実行し Postfix を再起動します。

~~~shell
$ sudo systemctl restart postfix
~~~

### テストメールの送信とメールディレクトリの作成

メールが 1 通もない状態だと、シラサギのウェブメールを表示した際に認証エラーとなります。

上記の設定のテストも兼ねてテストメールを送ってみます。

~~~shell
$ echo 'This is test mail.' | sendmail sys@example.jp
$ echo 'This is test mail.' | sendmail admin@example.jp
$ echo 'This is test mail.' | sendmail user1@example.jp
$ echo 'This is test mail.' | sendmail user2@example.jp
$ echo 'This is test mail.' | sendmail user3@example.jp
~~~

正常に送信できたかどうかは `/var/log/maillog` を確認します。

~~~shell
$ sudo cat /var/log/maillog
~~~

次のような行が表示されていれば送信が成功しています。

~~~
Oct 18 11:46:21 localhost postfix/virtual[15842]: 6BAEA113BE76: to=<user3@example.jp>, relay=virtual, delay=0.01, delays=0/0/0/0, dsn=2.0.0, status=sent (delivered to maildir)
~~~

`status=sent` となっており、送信に成功しています。

それでは、シラサギのウェブメールを設定し、シラサギでテストメールが届いているかどうか確認してみます。

## シラサギのウェブメールの設定

シラサギをインストールしたディレクトリに移動し、次のコマンドを実行します。

~~~shell
$ cp -n config/defaults/webmail.yml config/webmail.yml 
~~~

`config/webmail.yml` の差分を以下に掲載しています。適時修正してください。

~~~diff
--- config/defaults/webmail.yml	2017-10-18 11:37:01.760733167 +0900
+++ config/webmail.yml	2017-10-18 11:54:38.852555338 +0900
@@ -9,11 +9,11 @@
   clients:
     default:
       # host
-      host: localhost
+      host: 127.0.0.1
       options:
         port: 143
       # auth_type: LOGIN, PLAIN, CRAM-MD5, DIGEST-MD5
-      auth_type: LOGIN
+      auth_type: CRAM-MD5
       # account: uid, email
       account: email
~~~

シラサギを起動している場合は次のコマンドを実行しシラサギを停止します。

~~~shell
$ bin/rake unicorn:stop
~~~

そして次のコマンドを実行し、シラサギを起動します。

~~~shell
$ bin/rake unicorn:start
~~~

シラサギの管理画面へアクセスし、ウェブメールが正しく表示されていることを確認してください。


## 新しいユーザーを追加する場合

新しいユーザーを追加するには次のファイルにユーザーを追加します。

- `/etc/dovecot/users`
  - IMAP のパスワードを設定します。
- `/etc/postfix/vmailbox`
  - 受信したメールをどのディレクトリに保存するのかを設定します。
- `echo 'This is test mail.' | sendmail <new-user>@example.jp` コマンドの実行
  - テストメールを送るとともにメールディレクトを作成します。

`/etc/postfix/vmailbox` を編集した後 `sudo postmap /etc/postfix/vmailbox` コマンドを実行する必要があります。
