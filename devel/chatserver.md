---
layout: default
title: チャットサーバーの導入
---

本章ではシラサギデスクトップで利用するチャットサーバの導入方法を解説します。

## 構築手順

以下のサービスを設定します。

- IRC サーバーとして InspIRCd

対象 OS は CentOS7 です。他の OS をご利用の方は適時読み替えてください。


## InspIRCd

### インストール

開発ツールを導入し、実行ユーザを作成します。

~~~shell
# yum -y groupinstall "Development tools" 
# useradd -s /sbin/nologin -d /dev/null irc
~~~

InspIRCdを導入します。ここでは全てのチャットログを記録する為、サードパーティーのログモジュールも同時に導入します。

~~~shell
# cd /usr/local/src
# git clone -b insp20 git://github.com/inspircd/inspircd.git
# cd inspircd
# wget -O src/modules/extra/m_chatlog.cpp https://raw.github.com/joshenders/inspircd-m_chatlog/master/m_chatlog.cpp
# ./configure --uid=irc --prefix=/opt/inspircd
# ./configure --enable-extras=m_chatlog.cpp
# make
# make install
~~~

## 設定

InspIRCd の設定ファイルを編集します。

~~~shell
# cd /opt/inspircd/conf
# cp examples/inspircd.conf.example inspircd.conf
# echo '<module name="m_chatlog.so">' >> modules.conf
~~~

#### /opt/inspircd/conf/inspircd.conf

~~~diff
--- inspircd.conf.orig	2019-06-17 17:25:51.249760524 +0900
+++ inspircd.conf	2019-06-17 16:59:59.645071449 +0900
@@ -79,23 +79,9 @@
 #                                                                     #
 
 <server
-        # name: Hostname of your server. Does not need to resolve, but
-        # does need to be correct syntax (something.somethingelse.tld).
-        name="penguin.omega.example.org"
-
-        # description: Server description. Spaces are allowed.
-        description="Waddle World"
-
-        # id: The SID to use for this server. This should not be uncommented
-        # unless there is a SID conflict. This must be three characters long.
-        # The first character must be a digit [0-9], the remaining two chars
-        # may be letters [A-Z] or digits.
-        #id="97K"
-
-        # network: Network name given on connect to clients.
-        # Should be the same on all servers on the network and
-        # not contain spaces.
-        network="Omega">
+      name="irc1.example.com"
+      description="InspIRCd IRC Server 01"
+      network="SSIrcNet">
 
 
 #-#-#-#-#-#-#-#-#-#-#-#-   ADMIN INFORMATION   -#-#-#-#-#-#-#-#-#-#-#-#
@@ -105,15 +91,9 @@
 #                                                                     #
 
 <admin
-       # name: Real Name
-       name="Johnny English"
-
-       # nick: Nickname (preferably what you use on the network)
-       nick="MI5"
-
-       # email: email address. Does not have to be valid
-       # but should be for the users to be able to contact you.
-       email="MI5@the.best.secret.agent">
+      name="ssadmin"
+      nick="ssadmin"
+      email="ssadmin@example.com">
 
 
 #-#-#-#-#-#-#-#-#-#-#-#-   PORT CONFIGURATION   -#-#-#-#-#-#-#-#-#-#-#-
@@ -132,40 +112,8 @@
 #  information on how to load this module! If you do not load this    #
 #  module, server ports will NOT work!                                #
 
-<bind
-      # address: IP address to bind to if the box that you are hosting
-      # on has more than one IP, else the ircd will try to bind to all
-      # IP's on the box if this is not defined.
-      address=""
-
-      # port: Port for users or servers to be able to connect to.
-      # you can select multiple ports by separating them
-      # with a - character like the example below.
-      port="6697"
-
-      # type: Type of bind block this is. It can either be clients or
-      # servers. Whichever you select will be the only type able to connect
-      # to this bind section.
-      type="clients"
-
-      # ssl: If you want the port(s) in this bind tag to use SSL, set this
-      # to either "gnutls" or "openssl". The appropriate SSL module must be
-      # loaded for SSL to work. If you do not want the port(s) in this bind
-      # tag to support SSL, just remove or comment out this option.
-      ssl="gnutls"
->
-
-<bind address="" port="6660-6669" type="clients">
-
-# When linking servers, the OpenSSL and GnuTLS implementations are completely
-# link-compatible and can be used alongside each other
-# on each end of the link without any significant issues.
-# Supported SSL types are: "openssl" and "gnutls".
-# You must load m_ssl_openssl for OpenSSL or m_ssl_gnutls for GnuTLS.
-
-<bind address="" port="7000,7001" type="servers">
-<bind address="1.2.3.4" port="7005" type="servers" ssl="openssl">
-
+<bind address="" port="6667" type="clients">
+<bind address="" port="7000" type="servers">
 
 #-#-#-#-#-#-#-#-#-#-  DIE/RESTART CONFIGURATION   -#-#-#-#-#-#-#-#-#-#-
 #                                                                     #
@@ -223,101 +171,6 @@
 # This can be done by using <connect registered="no">                 #
 
 <connect
-         # deny: Will not let people connect if they have specified host/IP.
-         deny="192.0.2.*">
-
-# connect:reason is the message that users will see if they match a deny block
-<connect deny="3ffe::0/32" reason="The 6bone address space is deprecated">
-
-<connect
-         # name: Name to use for this connect block. Mainly used for
-         # connect class inheriting.
-         name="secret"
-
-         # parent: This setting is to specify if this connect class
-         # inherits settings from any other. Put the other class's name
-         # in here to use its settings as a template - for example,  if
-         # you only want to adjust sendq and a password
-         parent="main"
-
-         # allow: The IP address or hostname of clients that can use this
-         # class. You can specify either an exact match, a glob match, or
-         # a CIDR range here.
-         allow="203.0.113.*"
-
-         # hash: what hash this password is hashed with. requires the module
-         # for selected hash (m_md5.so, m_sha256.so or m_ripemd160.so) be
-         # loaded and the password hashing module (m_password_hash.so)
-         # loaded. Options here are: "md5", "sha256" and "ripemd160".
-         # Optional, but recommended. Create hashed passwords with:
-         # /mkpasswd <hash> <password>
-         #hash="sha256"
-
-         # password: Password to use for this block/user(s)
-         password="secret"
-
-         # maxchans: Maximum number of channels a user in this class
-         # be in at one time. This overrides every other maxchans setting.
-         #maxchans="30"
-
-         # timeout: How long (in seconds) the server will wait before
-         # disconnecting a user if they do not do anything on connect.
-         # (Note, this is a client-side thing, if the client does not
-         # send /nick, /user or /pass)
-         timeout="10"
-
-         # localmax: Maximum local connections per IP (or CIDR mask, see below).
-         localmax="3"
-
-         # globalmax: Maximum global (network-wide) connections per IP (or CIDR mask, see below).
-         globalmax="3"
-
-         # maxconnwarn: Enable warnings when localmax or globalmax are reached (defaults to on)
-         maxconnwarn="off"
-
-         # usednsbl: Defines whether or not users in this class are subject to DNSBL. Default is yes.
-         # This setting only has effect when m_dnsbl is loaded.
-         #usednsbl="yes"
-
-         # useident: Defines if users in this class MUST respond to a ident query or not.
-         useident="no"
-
-         # limit: How many users are allowed in this class
-         limit="5000"
-
-         # modes: Usermodes that are set on users in this block on connect.
-         # Enabling this option requires that the m_conn_umodes module be loaded.
-         # This entry is highly recommended to use for/with IP Cloaking/masking.
-         # For the example to work, this also requires that the m_cloaking
-         # module be loaded as well.
-         modes="+x"
-
-         # requireident, requiressl, requireaccount: require that users of this
-         # block have a valid ident response, use SSL, or have authenticated.
-         # Requires m_ident, m_sslinfo, or m_services_account respectively.
-         requiressl="on"
-         # NOTE: For requireaccount, you must complete the signon prior to full
-         # connection. Currently, this is only possible by using SASL
-         # authentication; passforward and PRIVMSG NickServ happen after
-         # your final connect block has been found.
-
-         # Alternate MOTD file for this connect class. The contents of this file are
-         # specified using <files secretmotd="filename"> or <execfiles ...>
-         motd="secretmotd"
-
-         # Allow color codes to be processed in the message of the day file.
-         # the following characters are valid color code escapes:
-         #   \002 or \b = Bold
-         #   \037 or \u = Underline
-         #   \003 or \c = Color (with a code postfixed to this char)
-         #   \017 or \x = Stop all color sequences
-         allowmotdcolors="false"
-
-         # port: What port this user is allowed to connect on. (optional)
-         # The port MUST be set to listen in the bind blocks above.
-         port="6697">
-
-<connect
          # name: Name to use for this connect block. Mainly used for
          # connect class inheriting.
          name="main"
@@ -327,6 +180,8 @@
          # a CIDR range here.
          allow="*"
 
+         password="ssirc#pass"
+
          # maxchans: Maximum number of channels a user in this class
          # be in at one time. This overrides every other maxchans setting.
          #maxchans="30"
@@ -379,10 +234,10 @@
          fakelag="on"
 
          # localmax: Maximum local connections per IP.
-         localmax="3"
+         localmax="30"
 
          # globalmax: Maximum global (network-wide) connections per IP.
-         globalmax="3"
+         globalmax="30"
 
          # useident: Defines if users in this class must respond to a ident query or not.
          useident="no"
@@ -395,7 +250,8 @@
          # This entry is highly recommended to use for/with IP Cloaking/masking.
          # For the example to work, this also requires that the m_cloaking
          # module be loaded as well.
-         modes="+x">
+         #modes="+x">
+         modes="">
 
 
 #-#-#-#-#-#-#-#-#-#-#-#-  CIDR CONFIGURATION   -#-#-#-#-#-#-#-#-#-#-#-
@@ -485,7 +341,7 @@
 # the default of 'inspircd.pid' is used.                              #
 #                                                                     #
 
-#<pid file="/path/to/inspircd.pid">
+<pid file="/opt/inspircd/inspircd.pid">
 
 #-#-#-#-#-#-#-#-#-#-#-#-#- BANLIST LIMITS #-#-#-#-#-#-#-#-#-#-#-#-#-#-#
 #                                                                     #
@@ -525,7 +381,7 @@
 #   Just remove this... Its here to make you read ALL of the config   #
 #   file options ;)                                                   #
 
-<die value="You should probably edit your config *PROPERLY* and try again.">
+#<die value="You should probably edit your config *PROPERLY* and try again.">
 
 
 
@@ -877,6 +733,7 @@
 # sort out your own log tags. This is just here so you get some output.
 
 <log method="file" type="* -USERINPUT -USEROUTPUT" level="default" target="logs/ircd.log">
+<log method="file" type="m_chatlog" level="default" target="logs/chat.log">
 
 #-#-#-#-#-#-#-#-#-#-#-#-#-  WHOWAS OPTIONS   -#-#-#-#-#-#-#-#-#-#-#-#-#
 #                                                                     #
@@ -978,7 +835,7 @@
 #                                                                     #
 #   You should already know what to do here :)                        #
 
-<die value="User error. You didn't edit your config properly. Go back and try again.">
+#<die value="User error. You didn't edit your config properly. Go back and try again.">
 
 #-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-# MODULES #-#-#-#-#-#-#-#-#-#-#-#-#-#-#
 #    ____                _   _____ _     _       ____  _ _   _        #
@@ -994,7 +851,8 @@
 # provide almost all the features of InspIRCd. :)                     #
 #                                                                     #
 # The default does nothing -- we include it for simplicity for you.   #
-<include file="conf/examples/modules.conf.example">
+#<include file="conf/examples/modules.conf.example">
+<include file="/opt/inspircd/conf/modules.conf">
 
 # Here are some pre-built modules.conf files that closely match the
 # default configurations of some popular IRCd's. You still may want to
~~~

InspIRCd 実行ディレクトリのユーザとパーミッションを変更します。

~~~shell
# chown -R irc:irc /opt/inspircd
# chmod -R u+rwx,g+rwx,o-rwx /opt/inspircd
~~~


自動起動の設定を行います。

~~~shell
# vi /etc/systemd/system/inspircd.service
~~~

~~~shell
[Unit]
After=network.target
Description=InspIRCd - Internet Relay Chat Daemon
Requires=network.target
 
[Service]
ExecReload=/opt/inspircd/inspircd rehash
ExecStart=/opt/inspircd/inspircd start
ExecStop=/opt/inspircd/inspircd stop
Restart=on-failure
Type=forking
User=irc
Group=irc
 
[Install]
WantedBy=multi-user.target
~~~

~~~shell
# systemctl start  inspircd.service
# systemctl enable inspircd.service
~~~

チャットログとシステムログは次のディレクトリに保存されます。

/opt/inspircd/logs
