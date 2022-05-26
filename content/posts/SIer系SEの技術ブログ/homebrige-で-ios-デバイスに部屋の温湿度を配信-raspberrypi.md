---
title: "#Homebrige で #iOS デバイスに部屋の温湿度を配信 #RaspberryPi"
date: "2018-07-09"
categories: 
  - "homebridge"
  - "node-js"
  - "raspberrypi"
  - "プログラミング"
tags: 
  - "homebridge"
  - "ipad"
  - "iphone"
  - "mojave"
  - "raspberrypi"
---

Homebridgeを使って、**Homekit（iPhone、iPad）上で温湿度を表示できる**プラグイン（homebridge-temper）を作成しました。

Mojaveからは、Macでも表示できるので、楽しみです！

今までは、**Homebridgeのカメラで温度計を写して、外出先から確認したりしてた**ので、

すごく、確認に手間が掛かりますし、見づらいし面倒です。。。

温湿度計は、電子工作する暇と場所が無いので、USBのものを使います！

・[Temper](https://amzn.to/2o8DxTV) ・[EasyLog (LASCAR L-USB-RT)](https://amzn.to/2MRTUSW) 

EasyLogはAmazonは高いので、RS-Onlineで買いました。

ぶっちゃけ、**電子工作できれば作った方が安くすみます**。

**お金が掛かっても良いので、手短に構築したいひと向け**です。

まず、**TemperまたはEasyLogのCLIプログラムのコンパイルとインストール**します。

下記はTinkerboardでの手順ですが、RaspberryPiでも同様と思います。（たぶん）

（ライセンス的に問題なければ、バイナリを置こうかな・・・）

**Homebridgeは既にインストール済み**であることが前提です。

https://gist.github.com/kght6123/b6dc512497cccf762611fc1014ee09d9#file-check-usb-easylog-sh

再起動後、下記のように温度・湿度が表示されれば成功です！

最後まで閲覧いただき、ありがとうございます！

<amp-img src="/images/posts/sier-se/screen-01-169x300.png" layout="intrinsic" width="2511" height="1137" class="block"></amp-img>

[ソースコード](https://github.com/kght6123/homebridge-temper)  [npm](https://www.npmjs.com/package/homebridge-temper)
