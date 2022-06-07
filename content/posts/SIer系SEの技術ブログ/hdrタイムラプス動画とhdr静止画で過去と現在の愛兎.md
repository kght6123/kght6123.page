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

```sh
# Python3のバージョン確認
sudo apt-cache show python3
 Package: python3
 Source: python3-defaults
 Version: 3.5.3-1

python3 -V
 Python 3.5.3

# OpenCVのバージョン確認
sudo apt-cache show libopencv3
 N: Unable to locate package libopencv
 E: No packages found

sudo apt-cache show python-opencv
 Package: python-opencv
 Source: opencv
 Version: 2.4.9.1+dfsg1-2

sudo apt-cache show libopencv-dev
 Package: libopencv-dev
 Source: opencv
 Version: 2.4.9.1+dfsg1-2

sudo apt search opencv

sudo apt search libopencv3
 Sorting... Done
 Full Text Search... Done

sudo apt-cache show libopencv3
 N: Unable to locate package libopencv3
 E: No packages found

sudo apt-cache show libopencv
 N: Unable to locate package libopencv
 E: No packages found
```

今回は、なるべく新しいバージョンで開発したいと思っていますが、特にOpenCVがちょっと古いバージョンだったので、既存のOpenCVを削除して新たに3.4.2をインストールしました。

さらに、Python3のnumpyのバージョンが古かったので、pip3もインストールしてnumpyを更新しました。

Python2とPython3で新しいOpenCVがimportできるところまで確認しました。

```sh
# 削除
sudo apt-get autoremove libopencv-dev python-opencv
# パッケージリストを更新
sudo apt-get update

# OpenCV3をインストール
wget https://github.com/mt08xx/files/raw/master/opencv-rpi/libopencv3_3.4.2-20180709.1_armhf.deb
sudo apt install -y ./libopencv3_3.4.2-20180709.1_armhf.deb
sudo ldconfig

# python2で確認
python2 -c 'import cv2; print(cv2.__version__)'
 3.4.2

# python3のnumpyをインストール
sudo apt-get install python3-pip
pip3 -V
 pip 9.0.1 from /usr/lib/python3/dist-packages (python 3.5)

pip3 install numpy --upgrade # 10分ぐらいかかる
 Successfully installed numpy-1.15.0

# python3で確認
python3 -c 'import cv2; print(cv2.__version__)'
 3.4.2
```

次に、pipを使ってpicameraをインストールします。

インストール前にファームウェアのバージョンを確認します。

```sh
uname -a
 Linux pi3j 4.14.50-v7+ #1122 SMP Tue Jun 19 12:26:26 BST 2018 armv7l GNU/Linux
# #707以上を確認

pip3 install picamera # picamera-1.13がインストールされた
python3 -c 'import picamera;' # importを確認
```

これで、必要モジュールのインストールは完了です。

ffmpegでタイムラプス動画を作る見込みなので、ffmpeg（できればハードウェアエンコーダー含む）も事前に入れておきます。

あとはこんな感じで、PiCameraがPythonからコントロールと撮影できることを確認します。

```sh
import io

import cv2
import numpy as np

from time import sleep
from fractions import Fraction
import picamera

# execute command
#  python3 save_pi_hdr.py

# Create the in-memory stream
stream = io.BytesIO()

with picamera.PiCamera() as camera:
  camera.resolution = (1280, 720)
  camera.awb_mode = 'auto'
  camera.drc_strength = 'high'
  sleep(0.5)
  camera.capture(stream, use_video_port=False, format='jpeg', quality=85, bayer=True, thumbnail=(64, 48, 35))
  
  # to OpenCV
  # Construct a numpy array from the stream
  data = np.fromstring(stream.getvalue(), dtype=np.uint8)
  # "Decode" the image from the array, preserving colour
  image = cv2.imdecode(data, 1) # 0=gray,
  cv2.imwrite('photo9.jpg', image)
  pass
```

次はHDR写真を作るために、露出を変えて何回も撮影します。
