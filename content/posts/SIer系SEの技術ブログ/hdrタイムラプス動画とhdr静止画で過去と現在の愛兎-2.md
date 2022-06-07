---
title: "HDRタイムラプス動画とHDR静止画で過去と現在の愛兎の様子を監視する（その２） #RaspberryPi #PiCamera #Python"
date: "2018-08-13"
categories: 
  - "python"
  - "raspberrypi"
tags: 
  - "picamera"
  - "python"
  - "raspberrypi"
---

前回から間が空いてしまいましたが、露出を変えて連続で撮影する処理を作成します。

Pythonのfor文でループしつつ、露出を変えて何度も撮影するプログラムを、試作しましたが、

思った様に明るさが変わらないので、試行錯誤した結果、撮影だけのプログラムを別途作成し、別のPythonプログラムからパラメータを変えて連続で呼び出して、

明るさの異なる写真を５枚、取得する様にしました。

明るさが変わらない理由は不明で、シャッター速度・ISO感度を変更してsleep（2〜10秒）しても、２回目以降のループで明るさが変わらなくなります。

しかも、露出補正レベル（exposure\_compensation）に関しては、1回目のループでも全く効果がありません。。。。

[公式のドキュメント](https://picamera.readthedocs.io/en/release-1.13/api_camera.html)も確認しましたが、露出補正レベル、シャッター速度、ISO感度の使い方は間違っていない様です。

気持ち悪いですが、前述の様にPythonのプロセスを別にすれば、シャッター速度・ISO感度の変更が効いていたので、

撮影とプロセスを別にしました。

Pythonの撮影処理を別プロセスにするにあたって、前回のプログラムを、引数で撮影設定を変更できる様に修正しました。

画像サイズとISO感度、露出モード、シャッタスピード、露出補正レベル、出力ファイル名を指定できる様にしました。

05_capture_picamera_2.py
```py
import sys
import io

import cv2
import numpy as np

from time import sleep
import picamera

# execute command
#  python3 picapture.py 1296 972 1600 'sports' 10000 -25 photo90.jpg
#  python3 picapture.py 1296 972 1600 'sports' 20000   0 photo91.jpg
#  python3 picapture.py 1296 972 1600 'sports' 30000  25 photo92.jpg

# 引数を取得
args = sys.argv

# 撮影に関するパラメータを取得
width = int(sys.argv[1])
height = int(sys.argv[2])
iso = int(sys.argv[3])
exposure_mode = sys.argv[4]
shutter_speed = int(sys.argv[5])
exposure = int(sys.argv[6])
out_file_name = sys.argv[7]

sleep_time = 0.1

# Create the in-memory stream
stream = io.BytesIO()

with picamera.PiCamera(resolution=(width, height)) as camera:
  camera.drc_strength = 'high'
  camera.exposure_mode = exposure_mode
  camera.iso = iso
  camera.shutter_speed = shutter_speed
  camera.exposure_compensation = exposure # 露出補正レベル -25～25
  camera.sharpness = 100
  camera.awb_mode = 'auto'

  # Wait
  sleep(sleep_time)

  camera.capture(stream, use_video_port=False, format='jpeg', quality=85, bayer=True, thumbnail=(64, 48, 35))

  # to OpenCV
  # Construct a numpy array from the stream
  data = np.fromstring(stream.getvalue(), dtype=np.uint8)
  # "Decode" the image from the array, preserving colour
  image = cv2.imdecode(data, 1) # 0=gray,
  # OpenCV returns an array with data in BGR order. If you want RGB instead
  # use the following...
  #image = image[:, :, ::-1]
  cv2.imwrite(out_file_name, image)
  
  print ('ok. file='+out_file_name+',exposure='+str(camera.exposure_compensation)+',exposure_speed='+str(camera.exposure_speed))
pass
```

シャッタースピード、ISO感度を変更しながら、撮影するPythonプログラムを呼び出すプログラムを作成しました。

露光補正（exposure\_list）は私の環境では効きませんが、一応、指定できる様にしています。

後は、cronで回す際の参考に、大まかな処理時間が知りたかったので、処理時間の計測のための処理を入れています。

だいたい、５枚の撮影処理に10秒ぐらいかかってます。

06_call_capture_picamera_2.py
```py
import io
import time

import cv2
import subprocess as sp
import numpy as np

from datetime import datetime as dt

# execute command
#  python3 picapture_hdr.py

start_t = time.time()

# 撮影パラメータ（5回分）
resolution = [1296, 972]
exposure_list = [0, 0, 0, 0, 0]
shutter_speed_list = [25000, 20000, 15000, 10000, 5000]
exposure_mode = ['sports', 'auto', 'auto', 'auto', 'auto']
iso_list = [1600, 800, 640, 500, 400]
file_name = 'picture'
ext_name = '.jpg'

timelapse_frame_count = 1

for i in range(timelapse_frame_count):
  img_list = []
  for j, exposure in enumerate(exposure_list):
    # jpgファイル名を作成
    file = file_name + str(j) + ext_name
    # 撮影プログラムを呼び出すコマンドを作成
    cmd = 'python3 05_capture_picamera_2.py ' + str(resolution[0]) + ' ' + str(resolution[1]) + ' ' \
          + str(iso_list[j]) + ' ' \
          + exposure_mode[j] + ' ' \
          + str(shutter_speed_list[j]) + ' ' \
          + str(exposure_list[j]) + ' ' \
          + file
    print('[' + str(i) + '][' + str(j) + '] = ' + cmd)
    # 撮影プログラムを実行
    sp.check_output([cmd], shell=True)
    # 撮影された画像ファイルを読みんで、追加
    img_list.append(cv2.imread(file))

# 全体処理時間を出力
proc_t = time.time() - start_t
print ("finish time. {0}".format(proc_t) + "[sec]")
```

これで、HDR静止画を作るために必要な、明るさの異なる画像ファイルが撮影できる様になりました。

撮影の設定について説明させていただくと、基本的に薄暗い室内を撮影することを想定しています。

シャッタースピード（shutter\_speed\_list）とISO感度（iso\_list）で明るさを調整し、明るさの異なる５枚の写真が撮れる様にしています。

露光モードはISO1600の時だけ、sportsにしています。（カメラの制限）

最後にこんな感じの５枚の明るさの異なる画像が撮れます。（写真に色々見えますが気にしない）

<amp-img src="/images/posts/sier-se/picture0-1.jpg" layout="intrinsic" width="2511" height="1137" class="block"></amp-img>
    
<amp-img src="/images/posts/sier-se/picture1.jpg" layout="intrinsic" width="2511" height="1137" class="block"></amp-img>
    
<amp-img src="/images/posts/sier-se/picture2.jpg" layout="intrinsic" width="2511" height="1137" class="block"></amp-img>
    
<amp-img src="/images/posts/sier-se/picture3.jpg" layout="intrinsic" width="2511" height="1137" class="block"></amp-img>
    
<amp-img src="/images/posts/sier-se/picture4.jpg" layout="intrinsic" width="2511" height="1137" class="block"></amp-img>
    

次は、OpenCVでHDR合成を行い、ffmpegでタイムラプス動画を作成します。
