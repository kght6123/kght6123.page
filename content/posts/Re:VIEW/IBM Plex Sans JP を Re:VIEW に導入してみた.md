---
sortNo: 26
title: IBM Plex Sans JP を Re:VIEW に導入してみた
description: 'いい感じのカスタムフォントを使ってみたいと考えている方へ！'
eyecatchImage: ['/images/posts/tailwindcss-logo.png', 872, 533]
thumbnailImage: ['/images/posts/sm/tailwindcss-logo.png', 872, 533]
tags: ['RE:VIEW']
---
IBM 社から、Plex フォントの日本語対応版の IBM Plex Sans JP が公開されました。

このフォントを試しに作成中の同人誌（Re:VIEW 環境）へ適用したところ、読みやすく、綺麗だったので、導入する方法をご紹介しようと思います。

## 環境

- macOS Big Sur (M1)

## 利用したライブラリの紹介

### [Re:VIEW](https://reviewml.org/ja/) とは

公式ページ（ https://reviewml.org/ja/ ）より引用

> Re:VIEW は電子書籍と紙書籍のための、簡潔かつ強力なデジタル出版ツールです。コンピュータ書等の技術書籍（紙・電子）の商業出版や同人出版に利用されています。

## 前提条件

Re:VIEW がすでに導入されていることが前提です。
[公式ページ](https://reviewml.org/ja/)を参考に導入をお願いします。

## 手順

### 1. MacTeX.pkg のダウンロード＆インストール

[MacTex 公式ページ](http://tug.org/mactex/) または、[ミラーサイト](http://tug.org/mactex/mirrorpage.html) からダウンロードします。

ファイルサイズは、4.7GB あり、ミラーサイトからのダウンロードが無難です。（本家は、ダウンロードにとても時間がかかります。）

ダウンロードできたら、インストールしておきます。（これも、かなり時間がかかります。）

### 2. フォントをダウンロードする

OpenType.zip を、下記の GitHub のリリースタグからダウンロードします。

https://github.com/IBM/plex/releases/tag/v5.2.1

ダウンロードした OpenType.zip はダウンロードフォルダ内で解凍しておきます。

### 3. TeX にフォントを認識させる

```sh
# フォントを格納するパスの一覧が表示される（下記で作成するディレクトリが含まれていることを確認する）
$ kpsewhich -show-path="opentype fonts"
.:/Users/${ユーザ名}/Library/texlive/2021/texmf-config/fonts/opentype//:/Users/${ユーザ名}/Library/texlive/2021/texmf-var/fonts/opentype//:/Users/${ユーザ名}/Library/texmf/fonts/opentype//:!!/usr/local/texlive/texmf-local/fonts/opentype//:!!/usr/local/texlive/2021/texmf-config/fonts/opentype//:!!/usr/local/texlive/2021/texmf-var/fonts/opentype//:!!/usr/local/texlive/2021/texmf-dist/fonts/opentype//:/Users/${ユーザ名}/Library/texlive/2021/texmf-config/fonts/truetype//:/Users/${ユーザ名}/Library/texlive/2021/texmf-var/fonts/truetype//:/Users/${ユーザ名}/Library/texmf/fonts/truetype//:!!/usr/local/texlive/texmf-local/fonts/truetype//:!!/usr/local/texlive/2021/texmf-config/fonts/truetype//:!!/usr/local/texlive/2021/texmf-var/fonts/truetype//:!!/usr/local/texlive/2021/texmf-dist/fonts/truetype//:/please/set/osfontdir/in/the/environment//
# ディレクトリを作成する
$ mkdir -p /Users/${ユーザ名}/Library/texmf/fonts/opentype/
# フォントをコピーする
$ cp /Users/kght6123/Downloads/OpenType/IBM-Plex-Sans-JP/hinted/IBM* /Users/${ユーザ名}/Library/texmf/fonts/opentype/
# ファイルデータベースを更新する
$ mktexlsr /Users/${ユーザ名}/Library/texmf/fonts/opentype/
# フォントが認識しているか、確認する
$ kpsewhich IBMPlexSansJP-Bold.otf
/Users/${ユーザ名}/Library/texmf/fonts/opentype/IBMPlexSansJP-Bold.otf
```

### 4. Re:VIEW で使えるようにする

Re:VIEW で IBM Plex Sans JP が使えるように設定をします。
今回は、細身のフォントを中心に使いたかったので、下記のような設定にしています。

```sty
%% sty/review-custom.sty
%% IBM Plex Sans JP を利用する設定をする
\usepackage[alphabet,unicode,usecmapforalphabet]{pxchfon}
\setminchofont{IBMPlexSansJP-ExtraLight.otf}%
\setlightminchofont{IBMPlexSansJP-Thin.otf}%
\setmediumminchofont{IBMPlexSansJP-Light.otf}%
\setboldminchofont{IBMPlexSansJP-SemiBold.otf}%
\setgothicfont{IBMPlexSansJP-ExtraLight.otf}%
\setmediumgothicfont{IBMPlexSansJP-Light.otf}%
\setboldgothicfont{IBMPlexSansJP-SemiBold.otf}%
\setxboldgothicfont{IBMPlexSansJP-Bold.otf}%
\setmarugothicfont{IBMPlexSansJP-Thin.otf}%

%% 等倍フォント（ソースコード等）のデフォルトを Plex Mono にする
\usepackage{plex-mono}
```

### 5. 著作権表示を追加し、PDF 出力する

PDF にフォントが埋め込まれるため、著作権の表示を分かりやすいところに入れましょう。

```re
<!-- intro.re -->
== 本書のフォントについて
本書では表示フォントに「IBM Plex®typeface」(https://github.com/IBM/plex/) を使用しています。

Licensed under SIL Open Font License 1.1 (http://scripts.sil.org/OFL)

Copyright © 2017 IBM Corp. with Reserved Font Name "Plex"
```

これで、完了です。

下記のコマンドで、PDF を作成すると、IBM Plex Sans JP で作成されます。

```shell
$ rake pdf ## PDFを生成(LaTeX利用)
```

## 試しに表示してみた結果

今、プライベートで Pages から Re:VIEW に書き換え途中の同人誌に IBM Plex Sans JP を適用してみました。

無事、日本語の書体を IBM Plex Sans JP にすることができました。

等倍フォント（ソースコード）は IBM Plex Mono になっています。

<amp-img src="/images/posts/IBM-Plex-Sans-JP-Preview1.png" layout="intrinsic" width="1410" height="1464" class="block"></amp-img>

<amp-img src="/images/posts/IBM-Plex-Sans-JP-Preview2.png" layout="intrinsic" width="1410" height="1464" class="block"></amp-img>

<amp-img src="/images/posts/IBM-Plex-Sans-JP-Preview3.png" layout="intrinsic" width="1410" height="1464" class="block"></amp-img>

## まとめ

IBM Plex Sans JP を利用して、Re：VIEW で、技術同人誌の執筆を行う設定を行なってみました。

ダウンロードするファイルサイズが大きくて時間が掛かりますが、

綺麗で読みやすいフォントなので、ぜひ、一度、お試しください 🙏

最後まで読んでいただき、ありがとうございました。

## 参考文献

https://review-knowledge-ja.readthedocs.io/ja/latest/latex/uptex-fonts.html#ec4b712528b4f41c68c7991a5a68052a

https://ctan.org/pkg/plex
