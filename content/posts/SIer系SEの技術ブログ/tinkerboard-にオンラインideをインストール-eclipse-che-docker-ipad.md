---
title: "#Tinkerboard にオンラインIDEをインストール #eclipse #Che #Docker #iPad"
date: "2018-07-22"
categories: 
  - "docker"
  - "eclipse"
  - "java"
  - "node-js"
  - "raspberrypi"
  - "tinkerboard"
tags: 
  - "docker"
  - "eclipse"
  - "raspberrypi"
  - "tinkerboard"
---

**iPad上でIDEを使ったプログラミングがしたい**！人向けです。

Docker版のeclipse Cheが公開されてますが、 armに非対応で、Tinkerboardへのインストールに失敗します。

今回は仕方がないので、**eclipse Cheの本体をそのままインストール**しました。

（Dockerfileをforkして修正しようか悩みましたが、お手軽に試したいので、、、、）

Tinkerboardは、**台湾ASUSのRaspberryPi**の様なものです。

RaspberryPi3 B+が登場しましたが、**2GB**のRAMは魅力的です。

しかし、**PiCamera V2非対応**や、**HDMI-CEC非対応**、**WiFiが2.4Ghzのみ**など、機能や互換性の面で劣る部分もありますが、

Tinkerboardは、[eclipse Cheの最小の要求スペック](https://www.eclipse.org/che/docs/docker-single-user.html)を一応、満たしています。

下記の手順で、Tinkerboardのホスト名は**「tkb.local」**です。

適宜、正しいIPやホスト名に読みかえをお願い致します。

## Dockerのインストール

警告（dockerユーザ作れとか）出ますが、お試しなので無視します。

https://gist.github.com/kght6123/d9ae1ee2cb4276a8316ed4a4b7f2954c?file=01\_install\_docker.sh

## ホストOSにeclipse Cheをインストール（＋ARM向けへ修正）

Docker上での起動を諦めて、**TinkerboardのホストOSにインストール**します。

途中のsedコマンドが、**最新のeclipse Cheで置き換えに失敗**します。

正しい設定に修正して、正常に置き換えています。

https://gist.github.com/kght6123/d9ae1ee2cb4276a8316ed4a4b7f2954c?file=04\_install\_che.sh

[参考：\[Running Eclipse Che on a Raspberry Pi | Eclipse Foundation\]](https://blogs.eclipse.org/post/benjamin-cabé/running-eclipse-che-raspberry-pi)

下記のアドレスをMacやiPadで開くと、Workspaceの新規作成画面が表示されます。

http://tkb.local:8080/che/

Workspaceの作成の画面は開きますが、iPad側ではボタンの反応がなく**実行できません**でした。

Mac側で、Workspaceだけ作成します。

Workspace作成にも時間がかかりますので、気長に待ちましょう。

<amp-img src="/images/posts/sier-se/0abcb2fd3f68ae8f964d33ee0e3fac9d-1024x823.png" layout="intrinsic" width="2511" height="1137" class="block"></amp-img>

iPadとMacの両方の画面が**リアルタイムに更新**されます！

とりあえず、**「Hello world」**が動きましたー！

<amp-img src="/images/posts/sier-se/0f2fe697ec4dc5f7c3bdef6317da3e07-1024x802.png" layout="intrinsic" width="2511" height="1137" class="block"></amp-img>

これで、完了です！

お疲れ様でした。
