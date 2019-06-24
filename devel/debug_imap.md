---
layout: default
title: IMAP のデバッグ
---

本章ではシラサギのウェブメール開発時に IMAP をデバッグする方法を解説します。

## デバッグの有効化

`webmail.yml` の `disable_imap_debug` を false にします。

~~~
$ cd /var/www/shirasagi
$ cp -pn config/defaults/webmail.yml config/webmail.yml
~~~

~~~
$ vi config/webmail.yml
~~~

~~~
  # Disable IMAP debug
  disable_imap_debug: false
~~~

`disable_imap_debug` を false にすると、IMAP サーバとのやり取りを標準出力に出力するようになります。以下にサーバーとのやり取りのサンプルを示します。

~~~
C: RUBY0001 AUTHENTICATE CRAM-MD5
S: + PDI0MjY2MTM4MDA3OTEyNTMuMTU2MTM3MDQ3MkAyMmIzZjgxYjE4NTA+
C: dXNlcjVAZXhhbXBsZS5qcCAxZTNlNDZiNzcyYWEzZjY2YTkwMDc2MTZiNWUzYTVlYw==
S: RUBY0001 OK [CAPABILITY IMAP4rev1 LITERAL+ SASL-IR LOGIN-REFERRALS ID ENABLE IDLE SORT SORT=DISPLAY THREAD=REFERENCES THREAD=REFS THREAD=ORDEREDSUBJECT MULTIAPPEND URL-PARTIAL CATENATE UNSELECT CHILDREN NAMESPACE UIDPLUS LIST-EXTENDED I18NLEVEL=1 CONDSTORE QRESYNC ESEARCH ESORT SEARCHRES WITHIN CONTEXT=SEARCH LIST-STATUS BINARY MOVE SNIPPET=FUZZY SPECIAL-USE QUOTA] Logged in
C: RUBY0002 EXAMINE INBOX
S: * FLAGS (\Answered \Flagged \Deleted \Seen \Draft)
S: * OK [PERMANENTFLAGS ()] Read-only mailbox.
S: * 1 EXISTS
S: * 0 RECENT
S: * OK [UIDVALIDITY 1561367401] UIDs valid
S: * OK [UIDNEXT 49] Predicted next UID
S: RUBY0002 OK [READ-ONLY] Examine completed (0.001 + 0.000 secs).
~~~

IMAP プロトコルはテキストベースのプロトコルですので、上記のようにクライアント側から発信したコマンドとそれに対するサーバー側のレスポンスとを確認することができます。

