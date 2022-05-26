---
title: "Ktorのfullstackサンプルを最新にアップデートしてみた #Kotlin"
date: "2018-09-17"
categories: 
  - "kotlin"
tags: 
  - "kotlin"
  - "kotlinjs"
  - "ktor"
---

Ktorを試してみようと思い、Ktor（Backend）＋KotlinJSのサンプルを見つけましたが、

影響しているモジュールが古かったので、最新にバージョンアップして、

ソースコードもバージョンアップに伴い少し修正しました。

その他、かなり自己流に修正してしまったので、PullRequestするかは検討中。。。

とりあえず、GithubでForkして、[Commit](https://github.com/kght6123/kotlin-fullstack-sample/commit/2f97dfbb2f6fd226ada194d1ce7aeb8e9fd0429d)しています。

修正内容の詳細は下記になり、主にバックエンド側です。

- kotlinx.html 0.6.6 -> 0.6.11 それほど変わってません
- ktor 0.3.0 -> 0.9.4 (org.jetbrains -> io.ktor) パッケージ名の変更を伴う修正で、  
    リクエストパラメータを取得する際のクラスが ValuesMapからParametersに変わってました。
- kotlin-frontend-plugin 0.0.23 -> 0.0.37 それほど変わってません
- フロントエンドのサーバを jetty -> netty に変更しました
- Gsonをcom.google.code.gson -> ktor-gsonに変更しました

まだまだ、KtorとKotlinJSに対する理解が追いついていないので、

もう少し深く調べたいと思ってます。
