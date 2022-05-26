---
title: "HDRタイムラプス動画とHDR静止画で過去と現在の愛兎の様子を監視する（その１） #RaspberryPi #PiCamera #Python"
date: "2018-08-08"
categories: 
  - "homebridge"
  - "python"
  - "raspberrypi"
tags: 
  - "picamera"
  - "python"
  - "raspberrypi"
---

我が家では、RaspberryPiにHomebridgeをインストールし、PiCameraを使って愛兎の様子を外出先でも見れる様にしています。

この方法は欠点があって、何故かHomebridgeが高頻度で「応答なし」になりますし、過去の様子が見れません。

（嫁のiPhoneはあまり応答なしにならないそうです、、、）

それに画質もあまり良く無いので、小さい生き物の様子をみるにはちょっと不十分ですし、たまたま部屋の暗いところに愛兎がいると、画質が悪いのと相乗効果であまり良く見えません。

そこで、ちょっと前からiPhoneなどスマートフォンで、白飛びや黒つぶれが少ないHDRの写真が撮れますが、

OpenCVでも簡単にHDR写真が作れるそうなので、試してみました。

今回は「その１」ということで、PythonにOpenCVやpicameraなど、必要モジュールのインストールと静止画の撮影を行いました。

まず、RaspberryPiにデフォルトでインストールされている、PythonとOpenCVのバージョンを調べ、aptでパッケージの有無を確認しました。

https://gist.github.com/kght6123/29f85cdbdd99880e84be1a0f425c65b6?file=01\_version\_check.sh

今回は、なるべく新しいバージョンで開発したいと思っていますが、特にOpenCVがちょっと古いバージョンだったので、既存のOpenCVを削除して新たに3.4.2をインストールしました。

さらに、Python3のnumpyのバージョンが古かったので、pip3もインストールしてnumpyを更新しました。

Python2とPython3で新しいOpenCVがimportできるところまで確認しました。

https://gist.github.com/kght6123/29f85cdbdd99880e84be1a0f425c65b6?file=02\_install\_opencv\_python.sh

次に、pipを使ってpicameraをインストールします。

インストール前にファームウェアのバージョンを確認します。

https://gist.github.com/kght6123/29f85cdbdd99880e84be1a0f425c65b6?file=03\_install\_picamera.sh

これで、必要モジュールのインストールは完了です。

ffmpegでタイムラプス動画を作る見込みなので、ffmpeg（できればハードウェアエンコーダー含む）も事前に入れておきます。

あとはこんな感じで、PiCameraがPythonからコントロールと撮影できることを確認します。

https://gist.github.com/kght6123/29f85cdbdd99880e84be1a0f425c65b6?file=04\_capture\_picamera.py

次はHDR写真を作るために、露出を変えて何回も撮影します。
