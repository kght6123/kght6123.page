---
title: "HDRタイムラプス動画とHDR静止画で過去と現在の愛兎の様子を監視する（その４） #RaspberryPi #PiCamera #Python #rclone"
date: "2018-08-17"
categories: 
  - "python"
  - "raspberrypi"
tags: 
  - "picamera"
  - "python"
  - "raspberrypi"
---

前回はHDR画像とタイムラプス動画を作成しましたが、今回はOneDriveへ作成した画像や動画をアップロードします。

アップロードには、よく使われているLinuxでよく使われているrcloneを利用します。

あらかじめ、Microsoftアカウントへの登録をしておき、OneDriveへログインをしておくとスムーズです。  

Amazonプライム会員だと、Amazon Cloud Driveへの静止画のアップロードは無制限で、他のバックアップ用途にも流用できそうだったので、事前に検討していましたが、

acd\_cliというCLIでAmazon Cloud Driveを扱うツールが開発停止しており、  
さらに、rcloneのAmazon Cloud Drive機能も開発停止していたので、契約している容量が一番大きい、OneDriveにしました。  

2018/08/19 定期削除の処理を加筆しました。

rcloneをRaspberryPiとMacにインストールします。

今回は、RaspberryPiにSSHで接続して操作しており、Webブラウザを利用した認証が出来ないので、Mac側で認証だけ実施し、RaspberryPi側に認証情報を渡す方法を実施するため、Macにもインストールが必要です。

MacとRaspberryPiで、rcloneをインストールする方法は同じです。

下記のコマンドを実行します。

```sh
curl https://rclone.org/install.sh | sudo bash
```

下記のメッセージが最後に表示されれば、OKです。

> rclone v1.42 has successfully installed.  
> Now run "rclone config" for setup. Check https://rclone.org/docs/ for more details.

rcloneのリモート接続先の設定を行います。

インストール完了時のメッセージの通りに、”rclone config”コマンドをRaspberryPi側のみに実行します。

Mac側は認証の為に利用するだけなので、接続先の登録は不要です。

対話式でリモート接続先の作成が行われるので、下記の様に回答します。

1. リモートを作る必要があると言われます、**n**（New remote）を入力し、Enterキーを押下
2. 名前（name）を聞かれます。適当な名前（**onedrive**）などを入力し、Enterキーを押下
3. リモート接続先の種別を聞かれます。番号で**16（Microsoft OneDrive）**を入力し、Enterキーを押下
4. Client IdとClient Secretを聞かれますが、今回は不要なので、何も入力せずにEnterキーを押下
5. OneDriveのアカウント種別を聞かれます。普通はp（Personal）と思いますので、**p**を入力して、Enterキーを押下
6. 今回、SSH（リモート）でRaspberryPiに接続してセットアップを行うので、**n（No）**を入力して、Enterキーを押下
7. Mac側のターミナルで”**rclone authorize "onedrive"**”コマンドを実行して、認証を行います。  
    一旦、RaspberryPiの操作はそのまま現状維持しておきます。
8. Mac側でOneDriveのアカウント種別を再度、聞かれます。RaspberryPi側と同じ**p**（Personal）を入力して、Enterキーを押下
9. Mac側でデフォルトブラウザ（おそらくSafari）が開きます。事前に作成したMicrosoftアカウントでログインを行い、rcloneへアクセス権を許可します。
10. 無事にアクセス権が付与されれば、Mac側のターミナルに認証情報が表示されるので、Mac側の”Paste the following into your remote machine --->”の末尾から、”<---End paste”の先頭までのJSON文字列を、RaspberryPiの”result>”以降に貼り付けて、Enterキーを押下  
    （認証情報の取り扱いには十分に注意すること！）
11. RaspberryPi側で、**y**（Yes this is OK）を入力し、Enterキーを押下
12. ”Current remotes:”以降にOneDriveへの接続情報が表示されます。**q**（Quit config）を入力し、Enterキーを押下

Mac側とRaspberryPi側を行き来した為、手順がかなり複雑ですが、OneDriveへの接続先の登録が出来ました。

事前に、Mac側で認証情報を取得しておき、JSONだけどこかに残しておいても良いと思いますが、JSONの取り扱いには十分に注意しください。  

一連の流れは下記の様になります。

RaspberryPi側
```sh
> rclone config

2018/08/14 14:54:22 NOTICE: Config file "/home/pi/.config/rclone/rclone.conf" not found - using defaults
No remotes found - make a new one
n) New remote
s) Set configuration password
q) Quit config
n/s/q> n
name> onedrive
Type of storage to configure.
Choose a number from below, or type in your own value
 1 / Alias for a existing remote
   \ "alias"
 2 / Amazon Drive
   \ "amazon cloud drive"
 3 / Amazon S3 Compliant Storage Providers (AWS, Ceph, Dreamhost, IBM COS, Minio)
   \ "s3"
 4 / Backblaze B2
   \ "b2"
 5 / Box
   \ "box"
 6 / Cache a remote
   \ "cache"
 7 / Dropbox
   \ "dropbox"
 8 / Encrypt/Decrypt a remote
   \ "crypt"
 9 / FTP Connection
   \ "ftp"
10 / Google Cloud Storage (this is not Google Drive)
   \ "google cloud storage"
11 / Google Drive
   \ "drive"
12 / Hubic
   \ "hubic"
13 / Local Disk
   \ "local"
14 / Mega
   \ "mega"
15 / Microsoft Azure Blob Storage
   \ "azureblob"
16 / Microsoft OneDrive
   \ "onedrive"
17 / OpenDrive
   \ "opendrive"
18 / Openstack Swift (Rackspace Cloud Files, Memset Memstore, OVH)
   \ "swift"
19 / Pcloud
   \ "pcloud"
20 / QingCloud Object Storage
   \ "qingstor"
21 / SSH/SFTP Connection
   \ "sftp"
22 / Webdav
   \ "webdav"
23 / Yandex Disk
   \ "yandex"
24 / http Connection
   \ "http"
Storage> 16
Microsoft App Client Id - leave blank normally.
client_id> 
Microsoft App Client Secret - leave blank normally.
client_secret> 
Remote config
Choose OneDrive account type?
 * Say b for a OneDrive business account
 * Say p for a personal OneDrive account
b) Business
p) Personal
b/p> p
Use auto config?
 * Say Y if not sure
 * Say N if you are working on a remote or headless machine
y) Yes
n) No
y/n> n
For this to work, you will need rclone available on a machine that has a web browser available.
Execute the following on your machine:
	rclone authorize "onedrive"
Then paste the result below:
result> {"access_token":"", "token_type":"", "refresh_token":"", "expiry":""}
--------------------
y) Yes this is OK
e) Edit this remote
d) Delete this remote
y/e/d> y
Current remotes:

Name                 Type
====                 ====
onedrive             onedrive

e) Edit existing remote
n) New remote
d) Delete remote
r) Rename remote
c) Copy remote
s) Set configuration password
q) Quit config
e/n/d/r/c/s/q> q
```

Mac側
```sh
% rclone authorize "onedrive"
2018/08/14 15:01:48 NOTICE: Config file "/Users/kogahirotaka/.config/rclone/rclone.conf" not found - using defaults
Choose OneDrive account type?
 * Say b for a OneDrive business account
 * Say p for a personal OneDrive account
b) Business
p) Personal
b/p> p
If your browser doesn't open automatically go to the following link: http://127.0.0.1:53682/auth
Log in and authorize rclone for access
Waiting for code...
Got code
Paste the following into your remote machine --->
{"access_token":"","token_type":"","refresh_token":"","expiry":""}
<---End paste2018/08/14 15:02:55 http: panic serving 127.0.0.1:49212: send on closed channel
goroutine 65 [running]:
net/http.(*conn).serve.func1(0xc42039b180)
	/opt/go/go1.10/src/net/http/server.go:1726 +0xd0
panic(0x1aff680, 0x1d869d0)
	/opt/go/go1.10/src/runtime/panic.go:502 +0x229
github.com/ncw/rclone/lib/oauthutil.(*authServer).Start.func3(0x1d93840, 0xc4203d62a0, 0xc4200d1a00)
	/home/ncw/go/src/github.com/ncw/rclone/lib/oauthutil/oauthutil.go:529 +0x439
net/http.HandlerFunc.ServeHTTP(0xc420249420, 0x1d93840, 0xc4203d62a0, 0xc4200d1a00)
	/opt/go/go1.10/src/net/http/server.go:1947 +0x44
net/http.(*ServeMux).ServeHTTP(0xc420310de0, 0x1d93840, 0xc4203d62a0, 0xc4200d1a00)
	/opt/go/go1.10/src/net/http/server.go:2337 +0x130
net/http.serverHandler.ServeHTTP(0xc4203345b0, 0x1d93840, 0xc4203d62a0, 0xc4200d1a00)
	/opt/go/go1.10/src/net/http/server.go:2694 +0xbc
net/http.(*conn).serve(0xc42039b180, 0x1d94180, 0xc42003cec0)
	/opt/go/go1.10/src/net/http/server.go:1830 +0x651
created by net/http.(*Server).Serve
	/opt/go/go1.10/src/net/http/server.go:2795 +0x27b
```

これで、アップロードする準備ができました。

OneDrive上にディレクトリを作成します。

rcloneの検証もかねて、rcloneコマンドでディレクトリを作成します。

```sh
# OneDrive上のファイルの一覧を表示
rclone ls onedrive:

# 今回の保存用ディレクトリの作成
rclone mkdir "onedrive:画像/カメラ ロール/picamera"

# 作成したディレクトリを確認
rclone ls "onedrive:画像/カメラ ロール/picamera"
```

アップロードの検証とテスト実行を行います

コマンドのミスがあった場合、データが無慈悲に全消去される恐れもある為、検証時には”**\--dry-run”**オプションを必ず付与してください。

```sh
# 検証
> rclone sync ~/python/opencv "onedrive:画像/カメラ ロール/picamera" --dry-run
2018/08/14 15:24:55 NOTICE: fusion_mertens_0001.jpg: Not copying as --dry-run
2018/08/14 15:24:55 NOTICE: picture1.jpg: Not copying as --dry-run
2018/08/14 15:24:55 NOTICE: picture3.jpg: Not copying as --dry-run
2018/08/14 15:24:55 NOTICE: picture4.jpg: Not copying as --dry-run
2018/08/14 15:24:55 NOTICE: timelapse_20180813202452.mp4: Not copying as --dry-run
2018/08/14 15:24:55 NOTICE: timelapse_20180813214022.mp4: Not copying as --dry-run
2018/08/14 15:24:55 NOTICE: timelapse_20180813214209.mp4: Not copying as --dry-run
2018/08/14 15:24:55 NOTICE: picture0.jpg: Not copying as --dry-run
2018/08/14 15:24:55 NOTICE: picture2.jpg: Not copying as --dry-run
2018/08/14 15:24:55 NOTICE: timelapse_20180813213116.mp4: Not copying as --dry-run

# テスト実行
> rclone sync ~/python/opencv "onedrive:画像/カメラ ロール/picamera"
```

HDR撮影とタイムラプス動画作成、アップロードのClone設定を行います。

デフォルトのPATH変数も定義し、SSHログインした時と環境変数があまり変わらない様にします。

```sh
# PATH情報を保持しておく
> echo $PATH
/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin:/usr/local/games:/usr/games

# cron定義を編集
> crontab -e
no crontab for pi - using an empty one

# 初回だけ、デフォルトのエディタを選ぶ（慣れたものを選ぶ）
Select an editor.  To change later, run 'select-editor'.
  1. /bin/ed
  2. /bin/nano        <---- easiest
  3. /usr/bin/vim.tiny

Choose 1-3 [2]: 3

# SHELLはデフォルトの/bin/bashにする
# PATHには、"echo $PATH"した結果を入れる

SHELL=/bin/bash
PATH=/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin:/usr/local/games:/usr/games
# Example of job definition:
# .---------------- minute (0 - 59)
# |  .------------- hour (0 - 23)
# |  |  .---------- day of month (1 - 31)
# |  |  |  .------- month (1 - 12) OR jan,feb,mar,apr ...
# |  |  |  |  .---- day of week (0 - 6) (Sunday=0 or 7) OR sun,mon,tue,wed,thu,fri,sat
# |  |  |  |  |
# *  *  *  *  * user-name command to be executed
  *  *  *  *  * env > /tmp/env.log
  *  *  *  *  * rclone sync /home/pi/python/opencv "onedrive:画像/カメラ ロール/picamera"
 30  *  *  *  * cd /home/pi/python/opencv && python3 delete_file.py 0 .jpg; python3 picapture_hdr.py 59; python3 delete_file.py 3 .mp4 "onedrive:画像/カメラ ロール/picamera"

# cron定義を確認
> crontab -l
SHELL=/bin/bash
PATH=/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin:/usr/local/games:/usr/games
# Example of job definition:
# .---------------- minute (0 - 59)
# |  .------------- hour (0 - 23)
# |  |  .---------- day of month (1 - 31)
# |  |  |  .------- month (1 - 12) OR jan,feb,mar,apr ...
# |  |  |  |  .---- day of week (0 - 6) (Sunday=0 or 7) OR sun,mon,tue,wed,thu,fri,sat
# |  |  |  |  |
# *  *  *  *  * user-name command to be executed
  *  *  *  *  * env > /tmp/env.log
  *  *  *  *  * rclone sync /home/pi/python/opencv "onedrive:画像/カメラ ロール/picamera"
 30  *  *  *  * cd /home/pi/python/opencv && python3 delete_file.py 0 .jpg; python3 picapture_hdr.py 59; python3 delete_file.py 3 .mp4 "onedrive:画像/カメラ ロール/picamera"

# ついでに時間を合わせる
> sudo timedatectl set-timezone Asia/Tokyo
> date
Tue 14 Aug 15:57:01 JST 2018
> sudo shutdown -r now # 再起動
```

これで完了です。  
長々と、お付き合い頂きありがとうございます！！

Pythonのソースコード全体は、Gistに貼り付けました。

簡単に解説させていただくと、”**picapture.py”はpicameraモジュールを使って撮影するだけ**のプログラムで、

**”picapture\_hdr.py”は、撮影設定を変えて”picapture.py”を呼び出し、HDR合成とffmpegでタイムラプス動画作成を行う**プログラムです。  
  
**timelapse\_max\_time**（秒）または、**timelapse\_frame\_count**（撮影回数）を上限に、HDR合成とタイムラプス動画作成を行います。

撮影の設定は薄暗い部屋向けになっているので、ちょっとノイジーです。

picapture.py
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

picapture_hdr.py
```py
import sys
import io
import time

import cv2
import subprocess as sp
import numpy as np

from datetime import datetime as dt

# Sample
#  python3 picapture_hdr.py

# Downloads
#  scp pi@pi3j.local:/home/pi/python/opencv/picture0.jpg /Users/kogahirotaka/Downloads
#  scp pi@pi3j.local:/home/pi/python/opencv/fusion_mertens_0001.jpg /Users/kogahirotaka/Downloads
#  scp pi@pi3j.local:/home/pi/python/opencv/timelapse_20180813162324.mp4 /Users/kogahirotaka/Downloads

start_dt = dt.now().strftime('%Y%m%d%H%M%S')
start_t = time.time()

resolution = [1296, 972]#[3280, 2464] #[1920, 1080] #[1296, 972]
exposure_list = [0, 0, 0, 0, 0] # -25〜25
shutter_speed_list = [25000, 20000, 15000, 10000, 5000]
exposure_mode = ['sports', 'auto', 'auto', 'auto', 'auto']
iso_list = [1600, 800, 640, 500, 400] # 100, 200, 320,
file_name = 'picture'
ext_name = '.jpg'

timelapse_frame_count = 1000 # だいたい、59分で177枚撮影できる
timelapse_max_time = 60 * int(sys.argv[1])

for i in range(timelapse_frame_count):
  img_list = []
  exposure_times = []
  for j, exposure in enumerate(exposure_list):
    # jpgファイル名を作成
    file = file_name + str(j) + ext_name
    # 撮影プログラムを呼び出すコマンドを作成
    cmd = 'python3 picapture.py ' + str(resolution[0]) + ' ' + str(resolution[1]) + ' ' \
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

  print('[' + str(i) + '] create HDR start.')

  # 読み込む
  #exposure_times = np.array(exposure_times, dtype=np.float32)

  # 露出をHDR画像に統合
  #merge_debvec = cv2.createMergeDebevec()
  #hdr_debvec = merge_debvec.process(img_list, times=exposure_times.copy())
  #merge_robertson = cv2.createMergeRobertson()
  #hdr_robertson = merge_robertson.process(img_list, times=exposure_times.copy())

  # トーンマップHDR画像
  #tonemap1 = cv2.createTonemapDurand(gamma=2.2)
  #res_debvec = tonemap1.process(hdr_debvec.copy())
  #tonemap2 = cv2.createTonemapDurand(gamma=1.3)
  #res_robertson = tonemap2.process(hdr_robertson.copy())

  # HDR(Mertens)の初期化
  merge_mertens = cv2.createMergeMertens(contrast_weight=1.0, saturation_weight=1.0, exposure_weight=0.0)

  # Mertensを用いて露光を統合
  res_mertens = merge_mertens.process(img_list)

  print('[' + str(i) + '] create HDR MergeMertens complete.')

  # データ型を8ビットに変換して保存
  #res_debvec_8bit = np.clip(res_debvec*255, 0, 255).astype('uint8')
  #res_robertson_8bit = np.clip(res_robertson*255, 0, 255).astype('uint8')
  res_mertens_8bit = np.clip(res_mertens*255, 0, 255).astype('uint8')

  print('[' + str(i) + '] create HDR encode 8bit complete.')

  hdr_file = "fusion_mertens_" + '{0:04d}'.format(i + 1) + ".jpg"

  #cv2.imwrite("ldr_debvec.jpg", res_debvec_8bit)
  #cv2.imwrite("ldr_robertson.jpg", res_robertson_8bit)
  cv2.imwrite(hdr_file, res_mertens_8bit)

  print('[' + str(i) + '] create HDR end. file = ' + hdr_file)

  proc_t = time.time() - start_t
  if proc_t > timelapse_max_time : # 起動して一定時間経過したら、停止
    print ("capture time. {0}".format(proc_t) + "[sec]")
    break
  

# タイムラプス動画作成
cmd = 'ffmpeg -f image2 -r 3 -i fusion_mertens_%04d.jpg' + \
  ' -an -vcodec h264_omx -pix_fmt yuv420p' + \
  ' -b:v 4M -profile:v 100 timelapse_' + start_dt + '.mp4'

print('create Timelapse start. cmd = ' + cmd)
sp.check_output([cmd], shell=True)
print('create Timelapse end.')

# 全体処理時間を出力
proc_t = time.time() - start_t
print ("finish time. {0}".format(proc_t) + "[sec]")
```

OneDriveの容量をそこそこ圧迫するので、定期削除とかしたいですが、容量が無くなるまではこんな感じで、、、、

定期削除の処理を作成し、cronの記述も追記しました。

削除は先にローカルのファイルを削除し、その後、rcloneでOneDrive上のファイルも削除します。

動画作成後に不要になったHDR合成したファイルの削除も兼ねています。（８／１９）

delete_file.py
```py
import os
import sys
import time
import subprocess as sp
from operator import itemgetter as ig

# execute command
#  python3 delete_file.py 3 .mp4 "onedrive:画像/カメラ ロール/picamera"
#  python3 delete_file.py 0 .jpg

#  30  *  *  *  * cd /home/pi/python/opencv \
#  && python3 delete_file.py 0 .jpg \
#   ; python3 picapture_hdr.py \
#   ; python3 delete_file.py 3 .mp4 "onedrive:画像/カメラ ロール/picamera"

start_t = time.time()

delete_time = 60 * 60 * 24 * int(sys.argv[1]) # 日数指定
delete_ext = sys.argv[2]
delete_rclone_path = sys.argv[3] if len(sys.argv) > 3 else None

# 作成から一定時間以上、経過したファイルを削除
for file in os.listdir() :
  base, ext = os.path.splitext(file)
  if ext == delete_ext:
    exist_t = start_t - os.path.getctime(file) # エポック秒を計算
    if exist_t > delete_time :
      os.remove(file) # ファイル削除
      print("delete file. " + file) # 削除したファイルを表示

      if delete_rclone_path is not None :
        # rcloneパスが指定されている時のみ、削除する
        cmd = 'rclone delete "' + delete_rclone_path + '/' + file + '"'
        print('delete rclone start. cmd = ' + cmd)
        sp.check_output([cmd], shell=True)
        print('delete rclone end.')
```
