---
title: "GalaxyNote8のSideSyncをリモートデバッグに使う"
date: "2018-02-05"
categories: 
  - "it系"
tags: 
  - "android"
  - "galaxy"
  - "mac"
---

GalaxyNote8のSideSyncをリモートデバッグに使います。

## 準備

Qi対応の無線充電器（おすすめ）

1. WiFiは充電時のみ常時接続 設定⇨接続⇨WiFi⇨詳細設定⇨スリープ中にWi-Fi接続を維持⇨「充電時」にする
    
2. IPは静的取得とし、固定する。（もしくはルータ側でMacアドレス指定のIP固定にする） 設定⇨接続⇨WiFi⇨接続中のWiFiネットワークをロングタップ⇨ネットワーク設定を管理⇨IP設置を「静的」にして任意のIPアドレスを入力 （デートウェイやDNSはそのままで良いはず）
    
3. SideSyncをNote8とMac（PC）にインストール Mac版のインストールには癖がある、システム環境設定⇨セキュリティとプライパイシー⇨プライバシー⇨アクセシビリティ⇨鍵をクリック⇨SideSyncを許可
    
4. PCとNote8のSideSyncを起動し接続設定をすませておく
    
5. ADBのリモートデバッグ設定をUSBで接続して行う
    

```
$ export PATH=$PATH:_Users_kogahirotaka_Library_Android_sdk_platform-tools # AndroidSDKのツールをパスに追加
$ adb tcpip 5555 # PCのポート待機を設定、5555〜5585まで？
$ adb connect 192.168.10.88:5555 # Note8に5555で接続
```

1. USBを抜いて、下記のコマンドで端末が存在するか確認

```
$ adb devices # デバック端末リスト表示（確認用）
```

## 接続方法

1. Qiの上にNote8を置く（WiFi接続）
    
2. MacのSideSync起動（基本的に自動起動）
    
3. adb tcpipとadb connectで接続
    

```
$ adb tcpip 5555
$ adb connect 192.168.10.88:5555
```

1. adb shellでNote8のSideSync起動

```
$ adb shell monkey -p com.sec.android.sidesync30 -c android.intent.category.LAUNCHER 1 # SideSync起動
```

1. 使い終わったら、adb disconnectで切断

```
$ adb disconnect # PCポート切断
$ adb usb # USBモードへ
```
