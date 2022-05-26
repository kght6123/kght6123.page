---
title: "#RaspberryPi を据え置きのタブレットPCに"
date: "2018-07-23"
categories: 
  - "raspberrypi"
tags: 
  - "raspberrypi"
---

RaspberryPi3 B+と一緒に色々と購入して、据え置きの**タブレットPC風**にしました！

まだ、用途は考えていません。。。。笑

後々で、電光掲示板がわりに室温とか表示したり、

家庭内の機器をコントロールするマクロボタンを表示したり、

SDカード内の写真と動画を家庭内のNASに自動転送したり、、、したいですね。

また、何かアプリを作ったらご紹介したいと思います。汗

## Quattro（クアトロ）ケースにSSD内蔵

赤いQuattro（クアトロ）という2.5inchのHDDが内蔵できるPiケースを購入して、

古めの東芝SSDを、一番下の段に内蔵しました。

![](images/IMG_0690_mini-1024x768.jpg)

Amazonで購入した[SATA⇒USB3.0変換](https://amzn.to/2oa43fP)で、RaspberryPiに接続しましたが、

消費電力高すぎて他のUSB機器が認識不可。。。

RaspberryPi3 B+ の問題かも？？

別のUASP対応の[SATA⇒USB3.0変換](https://amzn.to/2NifxbV)もAmazonで購入しましたが、、、、

ケースに干渉して使えません。

仕方ないので、必要な時にSATA⇒USB3.0変換を差して運用してます。汗

SSDの消費電力次第だと思いますが、ACアダプタが必須っぽいですね、、、、

## 意外と便利、ミニキーボード

Amazonで買った、[Ewinミニキーボード](https://amzn.to/2obGfYY)も追加して

こんな感じで利用してます。

![](images/IMG_0701_mini-1024x768.jpg)

後ろから見たら、こんな感じ。

![](images/IMG_0697_mini-1024x768.jpg)

このミニキーボードは、ちょっとGUIでRaspberryPiを操作したい時に捗ります。

狭いスペースでも置きっぱなしにできるので、**邪魔になりません。**

最近、上海問屋でも同じ？？と思われるものを販売されてますが

AmazonでEwinミニキーボードを買った方が安いです。

![](images/IMG_0705_mini-1024x768.jpg)

## タッチパネルのセットアップについて

7インチのタッチパネルはドライバーのインストールは不要で、タッチパネルも認識しますが、

念のため、`config.txt`を書き換えました。

https://gist.github.com/kght6123/2227b712b1530b1f8a6aeb7c7a82871c

* * *

## 今回、買ったものリスト

リンク先はKSYです。

 [![](images/7inch_hdmi_lcd_h_with_case_.jpg) ディスプレイ 7" タッチパネル 1024×600 HDMI+USB for Pi (KSY)](https://raspberry-pi.ksyic.com/main/index/pdp.id/440/pdp.open/440)

 [![](images/Quattro_red.jpg) Piケース Quattro（クアトロ） 赤 for 3B+/3/2/B+ (KSY)](https://raspberry-pi.ksyic.com/main/index/pdp.id/421/pdp.open/421)

 [![](images/RaspberryPi3_B_plus_min.jpg) Raspberry Pi 3 Model B+ (KSY)](https://raspberry-pi.ksyic.com/main/index/pdp.id/435/pdp.open/435)

[USB電源アダプター 5V/3A 1.5m microUSBコネクター (KSY)](https://raspberry-pi.ksyic.com/main/index/pdp.id/436/pdp.open/436)
