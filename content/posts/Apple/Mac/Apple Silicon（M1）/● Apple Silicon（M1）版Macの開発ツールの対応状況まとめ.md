---
sortNo: 19
title: 'Apple Silicon（M1）版Macの開発ツールの対応状況まとめ'
description: 'Macでよく使っている開発ツールの対応状況をまとめました'
eyecatchImage: ['/images/posts/helloworld.jpg',1600,1066]
thumbnailImage: ['/images/posts/sm/helloworld.jpg',1600,1066]
tags: ['Mac','作成中']
---

11/18(水)現在、手元にM1版のMacは届いてないですが、

（11/24(水)現在、まだ届かない・・・・）

届き次第、自分がよく使う開発環境が整えられる様に備忘録的にまとめました。

（注文後にスペックを変えて再注文したため、発売日にM1版のMacが届かずにしょんぼりしています・・・

まだ、届いてないので実際に検証はできてません。（届き次第、確認してく予定です。）

あと、私がフロントエンドエンジニア寄りなので、フロント成分が多めです。

## Homebrew

Homebrew自体は、下記の手順でインストール可能みたいです。（未検証）

https://github.com/Homebrew/brew/issues/7857#issuecomment-729341938

インストールできるアプリが動くか？については、下記のGithubのIssueにまとめられています。

https://github.com/Homebrew/brew/issues/7857

Issueの「Status of core formulae」にあるアイコンの意味はこんな感じです。

```
🥇は、Apple Silicon版でネイティブに動くもの

🥈は、Rosetta2（互換）経由で動くもの

🥉は、一部の機能が動かないもの

🚫は、Intel版のみで動くもの

⚠️は、分析に時間がかかって未検証中？なもの
```

node.jsが🥇で動くみたいなので一安心💦

gitは⚠️なので、全く使えないわけではなさそう。

## VS Code

Insider版ならネイティブで動く様です。 https://code.visualstudio.com/docs/?dv=darwinarm64&build=insiders

## IntelliJ Idea

今は、Rosetta2（互換）で動く様です。

Apple Silicon版でネイティブも開発中らしいです。

## Atom / Deno / Docker

現時点では動かない様です。残念。

## OpenJDK

Microsoft版のOpenJDKのEarlyBuildなら動く見たいです。

https://github.com/microsoft/openjdk-aarch64/releases/tag/16-ea%2B10-macos

## Affinity Designer / ffinity Photo

Apple Silicon版でネイティブに動く様です。すばら。

## Bear

Markdownのメモ帳アプリです。現時点では動かず、次期バージョンで対応予定とのこと。残念。

## Slack

現時点で安定版は動かず、Beta版ならRosetta2（互換）で動く様です。

https://slack.com/intl/ja-jp/beta/mac?geocode=ja-jp

## Spark

愛用しているInbox風のメールアプリです。探してみたけど動くかどうか全く不明。

## Android Studio

IntelliJ Ideaベースなので、IntelliJ Ideaと同じくRosetta2（互換）で動く・・・はず。

## その他

この他にも、下記のGithubでまとめてくださって随時更新されている方がいます！ありがたや・・・ありがたや・・・

https://github.com/ThatGuySam/doesitarm


