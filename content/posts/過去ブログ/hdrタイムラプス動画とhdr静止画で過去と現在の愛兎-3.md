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

https://gist.github.com/kght6123/29f85cdbdd99880e84be1a0f425c65b6?file=07\_create\_hdr.py

ffmpegで、タイムラプス動画を作成します。

ビデオコーデックはハードウェアエンコーダ（h264\_omx）を使い、ビットレート（-b:v）は「4M」を明示的に指定します。

出力は開始日時（start\_dt）ごとに行いたいので、あらかじめ、プログラムの先頭でシステム日時を取得しておきます。

https://gist.github.com/kght6123/29f85cdbdd99880e84be1a0f425c65b6?file=08\_create\_timelapse.py

この一連の処理で、HDR画像とタイムラプスを作ることができます。

前回の明るさを変えて撮影した、５枚の画像をHDR合成すると、HDRっぽい白飛びや黒つぶれが少なく、コントラストが低い感じになります。

今回は、愛兎の監視に利用しますが、HDR合成しているので風景などコントラストが高いものの長時間撮影に利用すると、綺麗かもしれません。

![](images/fusion_mertens_0001.jpg)

HDR合成した画像

- ![](images/picture0-1.jpg)
    
- ![](images/picture1.jpg)
    
- ![](images/picture2.jpg)
    
- ![](images/picture3.jpg)
    
- ![](images/picture4.jpg)
    

次回は、Microsoft Onedriveに作成したHDR静止画と、タイムラプス動画をアップロードします。
