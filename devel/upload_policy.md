---
layout: default
title: 無害化処理
---

ファイルを操作する機能を開発した時に必要になることがあります。

## 無害化処理

sanitizer_input/ に設置したファイルは無害化され sanitizer_output/ に移動します。<br>
下記はファイル名を変更するだけの開発用スクリプトです。

```ruby
#!/usr/bin/env ruby

require 'fileutils'
Dir.glob("/var/share/shirasagi/sanitizer_input/*").each do |f|
  file = "#{File.basename(f, '.*')}_#{rand(1_000)}_marked#{File.extname(f)}"
  file = "/var/share/shirasagi/sanitizer_output/#{file}"
  print "#{file}\n"
  ::FileUtils.mv(f, file)
end
```

## SS::UploadPolicy &lt;Module&gt;

### private sanitizer_save_file()

in_file にオブジェクトが設定されている場合、自動的に sanitizer_input/ にコピーします。

- タイミングは `before_save :save_file`
- save は実行しない

### public sanitizer_copy_file()

in_file にオブジェクトを設定しない場合は明示的なコールが必要です。

- File モデルを複製するような処理
- create_empty! で直接ファイルを指定している処理

### public sanitizer_skip()

無害化する必要のないファイルは明示的にスキップします。

- 取り込む際にもう一度生成されるサムネイル画像
- セカンダリサーバ運用で取り込む必要のないもの


## Restore

無害化済みファイルの取り込みは下記コマンドです。

```sh
$  ss:sanitizer_restore
```

取り込んだファイルが公開中ステータスの場合 public に書き出します。

```ruby
try(:generate_public_file)
```

取り込み処理が完了したファイルは削除されます。<br>
取り込みが失敗したファイルも、ドキュメントが存在しないと判断して削除されます。
