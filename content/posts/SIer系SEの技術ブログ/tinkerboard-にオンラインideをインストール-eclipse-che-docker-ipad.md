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

## ホストOSにeclipse Cheをインストール（＋ARM向けへ修正）

**TinkerboardのホストOSにインストール**します。

途中のsedコマンドが、**最新のeclipse Cheで置き換えに失敗**します。

正しい設定に修正して、正常に置き換えています。

```sh
# che本体をダウンロード
wget https://install.codenvycorp.com/che/eclipse-che-latest.zip
unzip eclipse-che-latest.zip
cd eclipse-che-5.0.0

# dockerイメージをarmfへ変更
#   predefined-stacks.json -> stacks.json
#   codenvy -> eclipse
sed -i 's/eclipse\/ubuntu_jdk8/kartben\/armhf-che-jdk8/g' stacks/stacks.json
sed -i 's/eclipse\/node/kartben\/armhf-che-node/g' stacks/stacks.json

# 低スペック向けに起動時間を調節
#   machine.ws_agent.max_start_time_ms -> che.workspace.agent.dev.max_start_time_ms
sed -i 's/che.workspace.agent.dev.max_start_time_ms=180000/che.workspace.agent.dev.max_start_time_ms=240000/g' conf/che.properties

# OpenJDK8をインストール
sudo apt-get install openjdk-8-jdk # エラー
# serverフォルダを作る（エラー回避）
sudo ln -s /usr/lib/jvm/java-8-openjdk-armhf/jre/lib/arm/client /usr/lib/jvm/java-8-openjdk-armhf/jre/lib/arm/server
# リトライ
sudo apt-get install openjdk-8-jdk
# 確認
java -version

#   Picked up JAVA_TOOL_OPTIONS: -Dgnu.io.rxtx.SerialPorts=/dev/tty96B0
#   openjdk version "1.8.0_171"
#   OpenJDK Runtime Environment (build 1.8.0_171-8u171-b11-1~deb9u1-b11)
#   OpenJDK Client VM (build 25.171-b11, mixed mode)

export CHE_IP=tkb.local
export JAVA_HOME=/usr/lib/jvm/java-8-openjdk-armhf

# sudo実行ユーザの環境変数を引き継いで起動！
sudo -E ./bin/che.sh run
```

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
