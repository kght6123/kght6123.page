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

```sh
# TEMPerがUSBで認識されていることを確認します。
$ dmesg | grep TEMP
[395909.906434] usb 1-1.2: Product: TEMPerV1.4
[395909.961175] input: RDing TEMPerV1.4 as /devices/platform/ff540000.usb/usb1/1-1/1-1.2/1-1.2:1.0/0003:0C45:7401.0007/input/input5
[395910.023411] hid-generic 0003:0C45:7401.0007: input,hidraw4: USB HID v1.10 Keyboard [RDing TEMPerV1.4] on usb-ff540000.usb-1.2/input0
[395910.051423] hid-generic 0003:0C45:7401.0008: hiddev0,hidraw5: USB HID v1.10 Device [RDing TEMPerV1.4] on usb-ff540000.usb-1.2/input1

# TEMPerの必須ライブラリをインストール
$ sudo apt-get install build-essential libusb-0.1-4 libusb-dev git

# TEMPerのCLIプログラムのコンパイルとインストール
$ mkdir TEMPer;cd TEMPer
$ git clone https://github.com/bitplane/temper.git
$ cd temper;cp temper.c temper.c.org;vi temper.c

# 一部、コンパイルエラーになるコードを修正します
$ diff temper.c.org temper.c
44c44
< utc = gmtime(&t);
---
> utc = localtime(&t);
47c47
< strftime(dt, 80, "%d-%b-%Y %H:%M", utc);
---
> strftime(dt, 80, "%Y-%m-%d %H:%M:%S", utc);

$ make

# ビルドしたバイナリを移動
$ make
$ sudo mv temper /usr/local/bin/
$ sudo chmod u+s /usr/local/bin/temper

# 動作確認
$ sudo temper # カンマ以降が温度です
2018-01-13 12:13:35,23.260157

# EasyLogがUSBで認識されていることを確認します。
$ dmesg | grep LASCAR
[409224.992393] usb 1-1.4: Manufacturer: LASCAR LTD
[409225.007489] hid-generic 0003:1781:0EC4.0009: hiddev0,hidraw4: USB HID v1.10 Device [LASCAR LTD EL USB RT] on usb-ff540000.usb-1.4/input0

# EasyLogの必須ライブラリをインストール
$ sudo apt-get install subversion automake libtool xsltproc docbook docbook-xsl xorg-docs doxygen libusb-0.1-4 libusb-dev

# EasyLogのlibhidのコンパイルとインストール
$ mkdir -p EasyLog/libhid;cd EasyLog/libhid
$ svn co svn://svn.debian.org/libhid/trunk libhid-trunk
$ cd libhid-trunk/
$ ./autogen.sh

# Makefileから"-Werror"を削除
$ cp Makefile Makefile.org;vi Makefile

# 削除を確認
$ diff Makefile.org Makefile
267c267
< CFLAGS = -O2 -Wall -W -Werror
---
> CFLAGS = -O2 -Wall -W 

# configureから"-Werror"を削除
$ cp configure configure.org;vi configure

# 削除を確認
$ diff configure.org configure
13839,13840c13839,13840
<         CFLAGS="$CFLAGS -Werror"
<         CXXFLAGS="$CXXFLAGS -Werror"
---
>         CFLAGS="$CFLAGS"
>         CXXFLAGS="$CXXFLAGS"

# libtoolから"-Werror"を削除
$ cp libtool libtool.org;vi libtool

# 削除を確認
$ diff libtool.org libtool
167c167
< LTCFLAGS="-O2 -Wall -W -Werror"
---
> LTCFLAGS="-O2 -Wall -W"

# config.statusから"-Werror"を削除
$ cp config.status config.status.org;vi config.status

# 削除を確認
$ diff config.status.org config.status
603c603
< CFLAGS='-O2 -Wall -W -Werror'
---
> CFLAGS='-O2 -Wall -W'
905c905
< S["CFLAGS"]="-O2 -Wall -W -Werror"
---
> S["CFLAGS"]="-O2 -Wall -W"

# doc/man/Makefileから"--nonet"を削除
$ cd doc/man
$ cp Makefile Makefile.org;vi Makefile

# 削除を確認
$ diff Makefile.org Makefile
327c327
< XP = xsltproc -''-nonet
---
> XP = xsltproc
$ cd ../..

# コンパイル＆インストールを実行
$ ./configure
$ make
$ sudo make install

# 共有ライブラリの再ロード
$ sudo ldconfig

# EasyLogのCLIプログラムのインストール
$ git clone https://github.com/rca/lascar-usb-thermometer.git
$ cd lascar-usb-thermometer
$ make

# ビルドしたバイナリを移動
$ sudo cp usb_termometer /usr/local/bin/
$ sudo chmod u+s /usr/local/bin/usb_termometer

# 動作確認
$ sudo usb_termometer 
temp: 24.0, hum: 40.5

# プラグインをインストール
$ npm install -g homebridge-temper

# Homebridgeの設定を開く
$ vi ~/homebridge/config.json

# 下記の「config.json」を参考に、config.jsonのplatformsにhomebridge-temperの定義を追加

## accessoriesのtypeは"temper"または"easylog"です、
### accessoriesはUSBに接続している機器のみ記述

## servicesのsubTypeはaccessoriesの中で一意にします。

$ homebridge # homebridgeを起動、場合によっては再起動！
```

config.json
```json
{
    "platforms": [
        {
            "platform": "TemperPlatform",
            "accessories": [
                {
                    "name": "Temper",
                    "type": "temper",
                    "services": [
                        {
                            "name": "Temper",
                            "subType": "bbb",
                            "type": "temp",
                            "command": "sudo",
                            "param": ["temper"]
                        }
                    ]
                },
                {
                    "name": "Easylog",
                    "type": "easylog",
                    "services": [
                        {
                            "name": "Easylog Temp",
                            "subType": "ccc",
                            "type": "temp",
                            "command": "sudo",
                            "param": ["usb_termometer"]
                        },
                        {
                            "name": "Easylog Hum",
                            "subType": "ddd",
                            "type": "hum",
                            "command": "sudo",
                            "param": ["usb_termometer"]
                        }
                    ]
                }
            ]
        }
    ]
}
```

再起動後、下記のように温度・湿度が表示されれば成功です！

最後まで閲覧いただき、ありがとうございます！

<amp-img src="/images/posts/sier-se/screen-01-169x300.png" layout="intrinsic" width="2511" height="1137" class="block"></amp-img>

[ソースコード](https://github.com/kght6123/homebridge-temper)  [npm](https://www.npmjs.com/package/homebridge-temper)
