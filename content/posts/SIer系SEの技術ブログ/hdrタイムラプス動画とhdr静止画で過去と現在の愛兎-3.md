---
title: "HDRタイムラプス動画とHDR静止画で過去と現在の愛兎の様子を監視する（その３） #RaspberryPi #PiCamera #Python"
date: "2018-08-15"
categories: 
  - "python"
  - "raspberrypi"
tags: 
  - "picamera"
  - "python"
  - "raspberrypi"
---

前回は明るさの異なる５枚の写真を撮影しましたが、今回はHDR画像とタイムラプス動画を作成します。

タイムラプス動画の作成には、ffmpegを利用します。

ffmpegは出来れば、ハードウェアエンコーダ（h264\_omx）が使える方がより良いです。  

OpenCVのHDRの作成方法には「Debvec」「Robertson」「Mertenes」の３パターンがあります。

今回は、露光時間が不要な「Mertenes」を利用します。

出来れば、露光時間を与えた方がより良い結果になるそうですが、十分、綺麗だったので、今回は露光時間は渡していません。

HDR合成した結果は、ffmpegでタイムラプス動画を作成する際に必要な、4桁の連番を付与してファイル出力します。

基本的に[OpenCVの公式サイト](http://lang.sist.chukyo-u.ac.jp/classes/OpenCV/py_tutorials/py_photo/py_hdr/py_hdr.html)のそのままですが、コントラスト・彩度・露出のパラメータを設定できる余地を残しています。

07_create_hdr.py

```py
print('[' + str(i) + '] create HDR start.')

# HDR(Mertens)の初期化
merge_mertens = cv2.createMergeMertens(contrast_weight=1.0, saturation_weight=1.0, exposure_weight=0.0)

# Mertensを用いて露光を統合
res_mertens = merge_mertens.process(img_list)

print('[' + str(i) + '] create HDR MergeMertens complete.')

# データ型を8ビットに変換
res_mertens_8bit = np.clip(res_mertens * 255, 0, 255).astype('uint8')

print('[' + str(i) + '] create HDR encode 8bit complete.')

# ファイルに書き出し（ffmpegに渡すために4桁の連番をファイル名に付与）
hdr_file = "fusion_mertens_" + '{0:04d}'.format(i + 1) + ".jpg"
cv2.imwrite(hdr_file, res_mertens_8bit)

print('[' + str(i) + '] create HDR end. file = ' + hdr_file)
```

ffmpegで、タイムラプス動画を作成します。

ビデオコーデックはハードウェアエンコーダ（h264\_omx）を使い、ビットレート（-b:v）は「4M」を明示的に指定します。

出力は開始日時（start\_dt）ごとに行いたいので、あらかじめ、プログラムの先頭でシステム日時を取得しておきます。

08_create_timelapse.py

```py
# タイムラプス動画作成
cmd = 'ffmpeg -f image2 -r 3 -i fusion_mertens_%04d.jpg' + \
  ' -an -vcodec h264_omx -pix_fmt yuv420p' + \
  ' -b:v 4M -profile:v 100 timelapse_' + start_dt + '.mp4'

print('create Timelapse start. cmd = ' + cmd)
sp.check_output([cmd], shell=True)
print('create Timelapse end.')
```

この一連の処理で、HDR画像とタイムラプスを作ることができます。

前回の明るさを変えて撮影した、５枚の画像をHDR合成すると、HDRっぽい白飛びや黒つぶれが少なく、コントラストが低い感じになります。

今回は、愛兎の監視に利用しますが、HDR合成しているので風景などコントラストが高いものの長時間撮影に利用すると、綺麗かもしれません。

<amp-img src="/images/posts/sier-se/fusion_mertens_0001.jpg" layout="intrinsic" width="2511" height="1137" class="block"></amp-img>

HDR合成した画像

<amp-img src="/images/posts/sier-se/picture0-1.jpg" layout="intrinsic" width="2511" height="1137" class="block"></amp-img>
    
<amp-img src="/images/posts/sier-se/picture1.jpg" layout="intrinsic" width="2511" height="1137" class="block"></amp-img>
    
<amp-img src="/images/posts/sier-se/picture2.jpg" layout="intrinsic" width="2511" height="1137" class="block"></amp-img>
    
<amp-img src="/images/posts/sier-se/picture3.jpg" layout="intrinsic" width="2511" height="1137" class="block"></amp-img>
    
<amp-img src="/images/posts/sier-se/picture4.jpg" layout="intrinsic" width="2511" height="1137" class="block"></amp-img>
    

次回は、Microsoft Onedriveに作成したHDR静止画と、タイムラプス動画をアップロードします。
