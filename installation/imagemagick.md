---
layout: default
title: インストールマニュアル - ImageMagic のバージョン確認
---

## ImageMagick のバージョン確認

shirasagi v1.14.0 からは ImageMagick のバージョンが 6.9 以上である必要があります。  
次のコマンドを実行して ImageMagick のバージョンを確認してください。

```
$ convert --version | grep Version
```

```
Version: ImageMagick 6.9.12-19 Q16 x86_64 2021-07-18 https://imagemagick.org
```

## ImageMagick のポリシー修正<br>

> ※ImageMagick のバージョンによっては /etc/ImageMagick ディレクトリが存在しない場合があります。<br>
> その場合は下記 policy.xml の変更は必要ありません。

```
$ sudo vi /etc/ImageMagick-6/policy.xml
```

```
<policymap>
  <!-- <policy domain="system" name="precision" value="6"/> -->
  <!-- <policy domain="resource" name="temporary-path" value="/tmp"/> -->
  <!-- <policy domain="resource" name="memory" value="2GiB"/> -->
  <!-- <policy domain="resource" name="map" value="4GiB"/> -->
  <!-- <policy domain="resource" name="area" value="1GB"/> -->
  <!-- <policy domain="resource" name="disk" value="16EB"/> -->
  <!-- <policy domain="resource" name="file" value="768"/> -->
  <!-- <policy domain="resource" name="thread" value="4"/> -->
  <!-- <policy domain="resource" name="throttle" value="0"/> -->
  <!-- <policy domain="resource" name="time" value="3600"/> -->
  <policy domain="coder" rights="none" pattern="EPHEMERAL" />
  <policy domain="coder" rights="read" pattern="HTTPS" />
  <policy domain="coder" rights="none" pattern="HTTP" />
  <policy domain="coder" rights="none" pattern="URL" />
  <policy domain="coder" rights="none" pattern="FTP" />
  <policy domain="coder" rights="none" pattern="MVG" />
  <policy domain="coder" rights="none" pattern="MSL" />
  <policy domain="coder" rights="none" pattern="TEXT" />
  <!--policy domain="coder" rights="read | write" pattern="LABEL" /-->
  <policy domain="path" rights="none" pattern="@*" />
  <policy domain="coder" rights="read | write" pattern="JPEG" />
  <policy domain="coder" rights="read | write" pattern="PNG" />
</policymap>
```

参考: <https://github.com/diaspora/diaspora/issues/6828>

## ImageMagick の動作確認（画像認証の動作確認）

次のコマンドを実行してみます。

```
$ convert -fill darkblue -background white -size 100x28 -wave 0x88 -gravity Center -pointsize 22 -implode 0.2 label:3407 jpeg:/dev/null
```

ただしく設定できている場合、上記のコマンドを実行しても何も出力されません。何も出力されない場合、シラサギで画像認証を利用可能です。

しかし、エラーが出力される場合、このままではシラサギで画像認証を利用することはできません。
利用している OS などの情報を検索し、エラーを修正する必要があります。

参考: <https://github.com/shirasagi/shirasagi/issues/3200>

## ImageMagick のフォント設定

認証画像は表示できているが、画像が見切れているなどの理由で convert コマンドのフォント指定を変更したい場合 cms.yml にて設定できます。

注）この設定は v1.14.0 にて導入されました。

```
$ cd /var/www/shirasagi
$ cp config/defaults/cms.yml config （既に cms.yml をコピーしている場合は不要です。）
$ vi config/cms.yml

### captchaのfontの値を変更 ###
  captcha:
    font: NimbusSans-Bold
```

なお ImageMagick の場合、以下のコマンドで、設定可能なフォント一覧を確認できます。

```
$ convert -list font
```

