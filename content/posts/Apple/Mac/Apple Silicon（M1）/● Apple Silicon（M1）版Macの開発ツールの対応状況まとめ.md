---
sortNo: 19
title: 'Apple Silicon（M1）搭載 Macの開発ツールの対応状況と、インストール方法のまとめ'
description: 'よく使っている開発ツールのM1の対応状況と、インストール方法をまとめました'
eyecatchImage: ['/images/posts/helloworld.jpg',1600,1066]
thumbnailImage: ['/images/posts/sm/helloworld.jpg',1600,1066]
tags: ['Mac','作成中']
---

Homebrewのユニバーサル版が出るまでは、Homebrewやportsは使わない！

なるべく、ARMネイティブを使う！その方がHomebrewに戻しやすいから！

・・・という方針でまとめました。

フロントエンドエンジニアなので、フロント成分多めです。

## インストール＆設定方法

### システム環境設定（おすすめ）

早速、M1関係ないけど、スマートダッシュで検索して、二重引用符と一重引用符を`""`や`’’`に変えるといい感じ。

勝手に、引用符がプログラムで認識しないものに変わるのを防げる

### Bear メモ帳

App Storeからインストールすれば、ARMネイティブ版でインストールされている

iPhoneやiPadとの同期も問題なさそう

### Slack

安定版はIntel版で動くので、ベータ版をインストールした（11/29現在）

[Mac | ベータ版をダウンロード | Slack](https://slack.com/intl/ja-jp/beta/mac)

大きな問題は起きていない

### VSCode コードエディタ

試験的バージョンなら、ARMネイティブで動く

[Documentation for Visual Studio Code](https://code.visualstudio.com/docs/?dv=darwinarm64&build=insiders)

プロジェクトを開いたり、Githubとの設定の同期もうまくいった。

```sh
# お好みでcodeコマンドのエイリアスを登録
# 事前にVSCodeで、 ⌘ + Shift + P して shell と入力して、「Shell Command: install 'code-exploration' comannd in PATH」を選ぶ
code-exploration -v # 1.52.0-exploration arm64
echo "alias code=code-exploration" >> ~/.zshrc
source ~/.zshrc
code -v # 1.52.0-exploration arm64
```

### NVM Node.jsバージョン管理

nvmをインストールして、nodeのv15のソースからのARMビルドをインストールする
（installにそこそこ時間がかかります。）

```sh
touch ~/.zshrc
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.37.2/install.sh | zsh
source ~/.zshrc
nvm -v
nvm install v15 # v15以外はARMネイティブで動かない（11/29現在）
node -v # v15.3.0
npm -v # 7.0.14
```

### IntellJ Idea 統合開発環境

[早期アクセスプログラム（EAP）- IntelliJ IDEA](https://www.jetbrains.com/ja-jp/idea/nextversion/#section=mac)

EAP版もIntelで動く、ARM版は無さそうです

### Yarn パッケージマネージャ

npmのグローバルインストールでインストールする。homebrewが使えないため。

```sh
npm install -g yarn
yarn -v # 1.22.10
```

### Firebase Tools（Yarn）

先ほど、インストールした`yarn`でグローバルインストールする。

loginまでOK

```sh
# yarnでインストール
yarn global add firebase-tools
# yarnのbinをPATHに追加して直ちに反映（zshの場合）
echo "export PATH=\"\$PATH:\`yarn global bin\`\"" >> ~/.zshrc
source ~/.zshrc
firebase -V # 8.16.2
# firebaseにログイン
firebase login
```

### Gitコマンド

もともと、デフォルトで入っているので、それを使う

```sh
git --version # git version 2.24.3 (Apple Git-128)
git clone https://github.com/kght6123/kght6123.page.git
```

### OpenJDK Java開発キット

Zulu BuildのOpen JDKが対応しているので、それを使う。

https://jp.azul.com/downloads/zulu-community/?os=macos&architecture=arm-64-bit&package=jdk#download-bundles

JDK8（LTS）、JDK11（LTS）、JDK13（MTS）、JDK16（EA）がARMに対応している（12/2現在）

### Windowsのインストール

まだ、試せていない。いずれ公式にできるようになりそう。

https://gigazine.net/news/20201128-windows-m1-mac-virtualization-demonstrated/

## まとめ

`Node`や`vscode`の起動が早すぎ！npmのバッケージの追加もビルドも早すぎぃ！

これは、Airで十分。私はProいらない。

（Touchバーが無いのが寂しい）
