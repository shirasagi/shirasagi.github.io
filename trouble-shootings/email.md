---
layout: default
title: トラブルシューティング - メール送信
---

メール送信の原因の切り分け方法につきましては、次の点を確認してみてください。

1. システム設定 - 診断 - MAIL Test（[デモサイトのMAIL TEST](https://demo.ss-proj.org/.sys/diag/mails)）からメールを送信してみて届きますでしょうか。
2. 届かない場合、管理画面より システム設定 - メールログ（[デモサイトのメールログ](https://demo.ss-proj.org/.sys/mail_logs)）にて、メールが送信されているかご確認ください。送信されていなければ、メール送信に関する管理画面での設定や機能などに不備があることが考えられます。
3. メールログが正常に記録されていれば、その中身を確認してみてください。差出人は正しいメールアドレスでしょうか。宛先は正しいメールアドレスでしょうか。差出人は無関係と思われるかもしれませんが、MTAによっては、差出人が存在しない場合、不正なメールだと判断して捨てる場合があります。
4. メールの中身が正常な場合、サーバのメールログを確認してみてください。
  - シラサギは既定では自サーバのMTAを利用してメールを送信しますので、自サーバーの`/var/log/maillog`にログが残っているはずです。
  - メール送信に関して設定を変更(https://shirasagi.github.io/settings/mail.html)し、外部のSMTPなどを利用している場合は、外部SMTPにログインしてログを確認してみてください。
  - ログの確認の結果、正常に送信されているようであれば、受信側でスパムメール設定等確認頂く必要があるかもしれません。