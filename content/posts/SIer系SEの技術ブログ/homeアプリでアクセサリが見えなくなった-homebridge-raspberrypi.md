---
title: "Homeアプリでアクセサリが見えなくなった #Homebridge #RaspberryPi"
date: "2018-07-08"
categories: 
  - "homebridge"
  - "raspberrypi"
tags: 
  - "homebridge"
  - "raspberrypi"
---

我が家ではRaspberryPiにHomebridgeをインストールして、**iPhoneやiPadからペットの様子や室内の温湿度を外出先から見える**ようにしています。

ある日、突然、Homebridgeを再起動しても、アクセサリが見えなくなりました。。。

その際に行なった**「キャッシュを全て削除して、最新へアップデート」**する手順です。

```sh
# RaspberryPiにsshログイン

# キャッシュを全て削除
$ rm -R .homebridge/accessories/
$ rm -R .homebridge/persist/
$ rm -R .homebridge/plugin-persist/

# ついでに最新バージョンを確認
$ sudo npm outdated -g
Package     Current  Wanted  Latest  Location
homebridge   0.4.43  0.4.44  0.4.44
npm           5.6.0  5.10.0   6.1.0

# 最新へアップデート
$ sudo npm install -g npm
$ sudo npm install -g homebridge hap-nodejs node-gyp

# もう一度、起動
$ sudo homebridge
```

我が家ではそれで復旧しました。汗 

この手順を行なった後は、Homeアプリから全てのアクセサリを消去して、もう一度、アクセサリを追加してください。。。
