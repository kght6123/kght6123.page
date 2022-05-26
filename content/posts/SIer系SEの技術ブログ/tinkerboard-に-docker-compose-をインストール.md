---
title: "#Tinkerboard に #docker-compose をインストール"
date: "2018-07-23"
categories: 
  - "docker"
  - "raspberrypi"
  - "tinkerboard"
tags: 
  - "docker"
  - "raspberrypi"
  - "tinkerboard"
---

TinkerboardでDokcerをインストールした時に

いつも使っているdocker-composeが使えたら便利だなと思い

インストールを試みましたが、少し苦労したので備忘録です。

Githubからソースコードをチェックアウトし、docker上でビルドします。

https://gist.github.com/kght6123/d9ae1ee2cb4276a8316ed4a4b7f2954c?file=02\_install\_docker-compose.sh

docker-compose.ymlを作って起動します。

下記はARM向けのイメージではないので、起動しません。

公式のイメージは対応しているものが多いらしいです。

https://gist.github.com/kght6123/d9ae1ee2cb4276a8316ed4a4b7f2954c?file=03\_install\_docker\_on\_che.sh
