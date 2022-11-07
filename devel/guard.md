---
layout: default
title: Guard
---

## Guard とは

ファイルの変更を検出して任意のタスクを実行する仕組みのことです。

Rails の開発では、よく Guard と RuboCop を組み合わせ、即座にコーディング規約違反がないか検出することができます。

Guard は、コマンドですので、Guard 実行用のターミナルを起動しておき、そのターミナルのフォアグラウンドで Guard を実行するようにします。

## シラサギの Guard

まず最初に、(シラサギの Guard の設定ファイル)[https://github.com/shirasagi/shirasagi/blob/master/Guardfile] は複雑ではないので、設定ファイルをチェックした方が、プログラムに素養のある方ならわかりやすいと思います。

シラサギの Guard には、次のタスクが組み込まれています。

- RSpec
- RuboCop
- brakeman
- scss lint
- stylelint
- eslint

これらのタスクは、既定では無効で、Guard コマンド実行時に環境変数を設定することで有効化します。例えば、RuboCop を有効にして Guard を実行するには以下のコマンドを実行します。

~~~
GUARD_RUBOCOP=1 bundle exec guard
~~~

各タスクを有効化する環境変数は以下のとおりです。

|----|---|
| タスク | 環境変数 |
|----|---|
| RSpec の有効化 | GUARD_RSPEC=1 |
| RuboCop の有効化 | GUARD_RUBOCOP=1 |
| breakeman の有効化 | GUARD_BRAKEMAN=1 |
| scss lint の有効化 | GUARD_SCSS_LINT=1 |
| stylelint の有効化 | GUARD_STYLELINT=1 |
| eslint の有効化 | GUARD_ESLINT=1 |

## 普段使い

RSpec は遅く、brakeman は差分のみに適用できないため普段使いには向いていないと感じています。
普段使いには RuboCop, stylelint そして eslint のみを有効化する以下の Guard コマンドを推奨します。

~~~
GUARD_RUBOCOP=1 GUARD_STYLELINT=1 GUARD_ESLINT=1 bundle exec guard
~~~

## scss lint について

sass コアチームが Rust へ移行したため、現在では scss lint はメンテナンスされておらず、非推奨となっています。しかしながら、stylelint よりエラーメッセージはわかりやすいので、適時、有効にしてください。
