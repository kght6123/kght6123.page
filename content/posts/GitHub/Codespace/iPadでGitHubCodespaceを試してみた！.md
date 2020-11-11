---
sortNo: 8
title: iPadでGitHub Codespaceを試してみた！
description: 'iPadでフロントエンドの開発をするために、Github Codespaceを使ってみたので紹介します！'
eyecatchImage: ['/images/posts/github-codespace-ipad.png',2732,2048]
thumbnailImage: ['/images/posts/sm/github-codespace-ipad.png',2732,2048]
tags: ['GitHub', 'GitHub Codespace', 'iPad']
---

Azureの`Visual Studio Codespaces`がサービス終了するということで

代替サービスとして、`GitHub Codespaces`の招待がやっと！届いたので

どこでも、iPadで、フロントエンドのプログラミングができる環境を作るために、使ってみました。

`Visual Studio Codespaces`と比べて良かったところと、気になることをまとめました。

使いたいと思っている人の参考になれば。。。と思います。


## よかったところ

### 使い方が簡単！

GitHubのリポジトリを開いて、緑色の「Code」のボタンを押して、開いたメニューの「Open with Codespace」を押すだけです。

これで、いつもの見慣れた「Visual Studio Code」の画面が開きます。

<amp-img src="/images/posts/github-codespace-ipad_open-codespace.png" layout="intrinsic" width="2511" height="1137" class="block"></amp-img>

### ２つのインスタンスまで、無料で使える

公開リポジトリなら、２つのインスタンスまで無料で使えます。

３つ以上のインスタンスを開こうとすると、どのインスタンスを削除してよいか、尋ねられます。

### 最初からいろいろ揃ってる

ターミナルのbashの設定が最初から見やすいように設定されており、

iPadでも非常に見やすいです。

あと、nodeやnpm、yarnなどのコマンドもそろっていて、インストールする必要はありませんでした。

<amp-img src="/images/posts/github-codespace-ipad_open-terminal.png" layout="intrinsic" width="1861" height="423" class="block"></amp-img>

### いつもの設定ですぐに使える

Visual Studio Codeで、GitHubアカウントでログインして拡張機能や設定を同期していれば、

いつもの拡張機能や設定が復元され、すぐに使えます。

さすがに、拡張機能や設定が復元されると思わず、びっくりしました💦

### プライベートモードで開かなくてもよい

Auzreの`Visual Studio Codespaces`のとき、iPadのSafariの非プライベートモードだとMicrosoftログインされない不具合？があって、

私も、その不具合で困ってました。

`GitHub Codespaces`は、Microsoftログイン無しで使えるので、プライベートモードでわざわざ開かなくても良くなりました。

### iPadでコピー＆ペーストができる

ちゃんと、iPadの「CMD＋C」と「CMD＋V」でテキストのコピー＆ペーストができます。

ターミナル上でも同様です。


## 気になるところ

### プライベートリポジトリでは使えない

おそらく、有料プラン的なものが出てきたら使えるようになると思いますが、

今はプライベートリポジトリでは使えません。

### スペックが低いので動作が遅い

これも、有料プランでスペックを選べるようになれば解決すると思いますが、

今はスペックを上げることはできません。

### ３つ以上のインスタンスが作れない

これも、有料プランでスペックを選べるようになれば解決すると思いますが、

（以下、略）

## まとめ

GitHubのリポジトリを開いたら、設定や拡張機能が同期され、

すぐに使える状態になるので、びっくりしました。

基本、パブリックリポジトリを使って、iPadで快適に使えそうです。

（有料プランが待ち遠しい。。。）

