---
title: "BroadLink RM3 Mini 初期設定メモ"
date: "2018-02-05"
categories: 
  - "it系"
tags: 
  - "broadlink-rm-3-mini"
  - "デバイス"
---

通称、黒豆。miniintheboxから激安で購入。 国内で販売されている「eRemote mini」と本体は同じ、国内版は値段が高いし、標準アプリは全く使わないので、回避。汗

初期設定する環境はTinkerBoard（TinkerOS）とする。Debian系ならほぼ同じ？と思われる。

1. **Python control for Broadlink RM2 IR controllers (python-broadlink)のインストール**

- Git clone

```
$ sudo apt-get install git
$ git clone https://github.com/mjg59/python-broadlink.git
$ cd python-broadlink
```

1. **Command line interface for python-broadlinkの設定**

- Python2.7系が既にインストール済みなので、OK（3系は動かないっぽい）

```
$ python
Python 2.7.13 (default, Nov 24 2017, 17:33:09)
[GCC 6.3.0 20170516] on linux2
Type "help", "copyright", "credits" or "license" for more information.
>>>
```

- 2系を明示的に呼ぶコマンドもある

```
$ python2
Python 2.7.13 (default, Nov 24 2017, 17:33:09)
[GCC 6.3.0 20170516] on linux2
Type "help", "copyright", "credits" or "license" for more information.
>>>
```

- 2系のdev版が必要なのでインストール

```
$ sudo apt-get install python2.7-dev
```

- PIPのインストール

```
$ curl -kL https://bootstrap.pypa.io/get-pip.py | python
$ sudo python -m pip install --upgrade pip # pip自身の更新
```

- 外部ライブラリのインストール(devel版のインストール後に行うこと)

```
$ sudo python2 -m pip install configparser
$ sudo python2 -m pip install netaddr
$ sudo python2 -m pip install pycrypto
```

- PIPでbroadlinkモジュールを追加

```
$ sudo pip install broadlink
```

これで、CLIツール（python-broadlink/cli）が使える

1. **RM3 miniのネットワーク接続設定**

下記、GitHubのREADMEを拙い英語力で翻訳したもの。この翻訳結果を元に黒豆のネットワーク接続設定を行う。

> Setup a new device on your local wireless network: ローカルワイヤレスネットワークで新しいデバイスをセットアップする
> 
> 1. Long press the reset button until the blue LED is blinking quickly.
> 2. 青色のLEDがすばやく点滅するまでリセットボタンを長押しします。
> 3. Long press again until blue LED is blinking slowly.
> 4. 青色のLEDがゆっくりと点滅するまでもう一度長押ししてください。（なる）
> 5. Manually connect to the WiFi SSID named BroadlinkProv.
> 6. BroadlinkProvという名前のWiFi SSIDに手動で接続します。
> 7. Run setup() and provide your ssid, network password (if secured), and set the security mode.
> 8. setupを実行し、ssid、ネットワークパスワード（保護されている場合）、およびセキュリティモードを設定します
> 9. Security mode options are (0 = none, 1 = WEP, 2 = WPA1, 3 = WPA2, 4 = WPA1/2)
> 10. セキュリティモードのオプションは、（0=なし, 1=WEP, 2=WPA1, 3= WPA2, 4=WPA1 / 2）

- 2~3. 黒豆を電源に接続しリセットボタンを押して、APモードに設定。（1は省略）
    
- 4.はBroadlinkProvという名前のSSIDにWifi接続して設定。
    

```
$ sudo iwconfig wlan0 essid BroadlinkProv # WiFiのBroadlinkProvに接続
$ sudo iwconfig # WiFiの接続状況を表示
```

- 5~6. は下記のPythonスクリプトを実行。（有線LANを抜いて、TinkerBoardのターミナルで直接実行）

```
$ cd python-broadlink # git cloneしたpython-broadlinkに移動
$ python2 # Python2を対話モードで実行。下記を入力する。
>>> import broadlink
>>> broadlink.setup('ASUS_RT-AC88U_24G', 'lovesaorihime', 3)
>>> exit()
```

1. **黒豆のデバイス情報を表示して保存** broadlink\_discoveryを実行し、ローカルネットワーク上の黒豆のデバイス情報を表示し、ファイルに保存する。

- デバイス情報の表示

```
$ cd python-broadlink/cli # git cloneしたpython-broadlink/cliに移動
$ ./broadlink_discovery
discover
###########################################
RM2
# broadlink_cli --type 0x2712 --host 192.168.10.166 --mac ecda5834ea34
Device file data (to be used with --device @filename in broadlink_cli) :
0x2712 192.168.10.166 ecda5834ea34 ## この部分をファイルに保存
temperature = 0.0
```

- デバイス情報の`0x2712 192.168.10.166 ecda5834ea34`をファイルに保存する

```
$ mkdir ~/bb/device # 任意の場所へ移動
$ echo "0x2712 192.168.10.166 ecda5834ea34" &gt; ~/bb/device/2FBedRoom
```

1. **赤外線リモコンの信号を送受信**

- LIGHT\_ONファイルに信号を保存。 下記のコマンド実行後に黒豆に向けて保存したいリモコン操作をする。
    
- 保存したデバイスファイル指定
    

```
$ ./broadlink_cli --device @/home/linaro/bb/device/2FBedRoom --learnfile ~/bb/ir/LIGHT_ON_OFF
```

- デバイス情報（type,host,mac）指定

```
$ ./broadlink_cli --type 0x2712 --host 192.168.10.166 --mac ecda5834ea34 --learnfile /home/linaro/bb/ir/LIGHT_ON_OFF
```

- LIGHT\_ONファイルの信号を送信。 送信したい信号を保存したファイルを指定する。
    
- 保存したデバイスファイル指定
    

```
$ ./broadlink_cli --device @/home/linaro/bb/device/2FBedRoom --send @~/bb/ir/LIGHT_ON_OFF # 対象の黒豆をデバイスファイル指定
```

- デバイス情報（type,host,mac）指定

```
$ ./broadlink_cli --type 0x2712 --host 192.168.10.166 --mac ecda5834ea34 --send @/home/linaro/bb/ir/LIGHT_ON_OFF # 対象の黒豆をtype,host,mac指定
```
