---
layout: default
title: ファイル機能（SS::File）
---

シラサギのページ添付ファイルに利用されているファイル機能について解説します。

### SS::File

ページに添付ファイルをアップロードすると、アップロードしたファイルのパス、サイズ等の属性をデータベースに格納し、
対応する物理ファイルとの紐づけを保持します。これらは以下の標準クラスにより実装されています。

要素 | 標準クラス | 抽象モジュール | mongo collection
-----------|---------------------|-----
ファイル | SS::File  | SS::Model::File | ss_files

次のような特徴があります。

- 物理ファイルとデータベースに格納されたドキュメントは1対1で対応する。
- 物理ファイルは [private ディレクトリ](/devel/directories.html#a-nameprivatea-private) 配下に保存される。
- 書き出されていない場合、ファイルの閲覧はコントローラーを介した動的処理となる。

なお、アップローダー機能は公開側ディレクトリへのファイル直接アップロードとなる為、本稿とは設計が異なります。

### ファイルの閲覧（URL）

CMSやGWS、WEBメールを含むシラサギの画面より `SS::File` を閲覧する為、次の形式のURLが提供されています。

- 例
- `/fs/1/2/3/_/filename.jpg`
  - `1/2/3` : ID `/` 区切り
  - `filename.jpg` : 物理ファイル名（`SS::File` の filename 属性）

補足として、古いシラサギでは以下の形式になります。

- 例（deprecated）
- `/fs/123/filename.jpg`
  - `123` : ID

### ファイルの閲覧（Fs::FilesController）

ファイル閲覧に対応するコントローラは以下になります。

- `Fs::FilesController`

コントローラーを介しファイルを動的に応答することで、
権限による閲覧の可否、画像リサイズといった機能を有します。

次のような動作を行います。

- 物理ファイルを動的に応答します。
  - `send_file`, `send_data`
- CMSの公開画面と管理画面にてファイル閲覧のアクセス制限を行います。(セッションによる動的判定)
  - `SS::File` の `state` が `public` であれば制限なく閲覧可能
  - `SS::File` の `state` が `closed` であれば管理画面にログインしている場合、閲覧可能
- CMSのメンバー機能にてログイン中のメンバーのみ、ファイル閲覧可能とするアクセス制限を行います。(セッションによる動的判定)
  - ファイルが `SS::File` の派生クラス `Member::File` のインスタンスであるとき
  - `Member::File` の `state` が `public` であれば制限なく閲覧可能
  - `Member::File` の `state` が `closed` である場合、`SS::File` の `member_id` がログイン中のメンバーIDと同一であれば、閲覧可能
- `width` と `height` の `QueryString` を付与し画像にアクセスすることでリサイズされます。
  - 書き出されているファイルがフロントにある場合は、動的に応答されないので無効

※このURL、コントローラーの他にも、個別の機能として `SS::File` を応答する箇所は存在します。

### ページ側の実装

ページに `SS::File` を紐づけて保存する為のモジュールを紹介します。

- `Cms::Addon::File`
  - 記事ページの添付ファイルアドオンです。
  - ページ側に `include` することで添付ファイルアドオンが表示されます。
  - 複数ファイルを一つのページに添付することができます。
  - `embeds_ids :files, class_name: "SS::File"` にてリレーションを定義しています。<br>
  - コールバック `save_files` でページ保存時に `SS::File` を保存します。
    - 添付元ページの公開状態と連動する為、`SS::File` の `state` と添付元ページの `state` を同一にして保存します。
  - コールバック `destroy_files` で添付元ページが削除された際に `SS::File` を削除します。

- `SS::Relation::File`
  - 単一の `SS::File` へのリレーション `belongs_to_file` をサポートするためのモジュールです。
  - 広告バナー、キービジュアル等、1ページに対して1つのファイルを持つ場合、よく利用されます。
  - `belongs_to_file :file` のように定義をおこなうことで `in_file` のようなアクセサが定義されます。
  - 定義されたアクセサにファイルインスタンス　(`ActionDispatch::Http::UploadedFile`）を入れることで `SS::File` として保存されます。

### ファイル書き出し

ファイル書き出しのコールバックが実装されているページについては、ページ公開保存時にファイルが公開ディレクトリに書き出されます。

- `Cms::Addon::File` : `after_generate_file :generate_public_files`
- `Cms::Addon::File` : `after_remove_file :remove_public_files`

次のような動作を行います。

- private 配下にあるファイルを公開側ディレクトリにコピーします。
- 書き出されるファイルパスは public ディレクトリ配下の閲覧URLに対応したパスになります。
  - 例
  - `public/sites/w/w/w/_/fs/1/2/3/_/filename.jpg`
- ページ非公開時に書き出したファイルを削除します。
- [ページの定期書き出し](/settings/cmd.html#cms---) に `attachments=1` オプションを付与することでページ書き出し時に添付のファイルも書き出します。

### サムネイル（SS::Relation::Thumb）

ファイルクラスに以下のモジュールを `include` することでサムネイルが生成されるようになります。

- `SS::Relation::Thumb`

`include` した際の動作について記載します。

- コールバックが追加され保存時に `SS::ThumbFile` を生成しリレーションとして保持するようになります。
- デフォルトのサムネイルサイズは `120x90` となります。
- 標準クラス `SS::File` に `include` されており画像ファイルについて標準でサムネイルが作成されます。
- サムネイルサイズが異なるファイルを作成する場合、対応するクラスを作成しサムネイルサイズを定義する必要があります。
  - `320×240`：`thumb_size [320, 240]`

### サムネイル（URL）

`SS::ThumbFile` は標準クラス `SS::File` の派生となりますが、専用のURLを提供しています。<br>
対応するコントローラは `Fs::FilesController` です。

- 例
- `/fs/1/2/3/_/thumb/filename.jpg`
  - `1/2/3` : オリジナルファイルのID `/` 区切り
  - `filename.jpg` : オリジナルファイルの物理ファイル名（`SS::File` の filename 属性）

### 画像リサイズ

`SS::File` には `resizing` というアクセサが定義されています。<br>
このアクセサに `[320, 240]` といった幅,高さの数値の配列を入力することで、保存時に画像のリサイズされます。<br>
リサイズ処理は `ImageMagick` の `resize_to_fit` が実行されます。

### model 属性

`SS::File` には `model` があり、添付元のクラスを識別するための値を保持しています。

- 記事ページ：`article/page`

サムネイルについては以下の値を格納しています。

- サムネイル：`ss/thumb_file`

他、特殊な利用方法として、CMSメンバーの閲覧判定を行う際 `SS::File` を `Member::File` のインスタンスに変更する為、`model` 属性を使っています。

- `becomes_with_model`

### File storage 設定

物理ファイルの保存先について２つのモードがあり、`environment.yml` の `storage:` に設定できます。

- `file`
  - 標準の設定
  - 物理ファイルを [private ディレクトリ](/devel/directories.html#a-nameprivatea-private) 配下に保存

- `grid_fs`
  - `MongoDB` の `GridFS` を使用し、物理ファイルを `BSON` 形式でデータベースに保存

標準的には `file` モードでの運用となる為、 `grid_fs` は機能によってサポートがされていない箇所があります。
