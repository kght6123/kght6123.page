---
title: "HDRタイムラプス動画とHDR静止画で過去と現在の愛兎の様子を監視する（アンチノイズ） #RaspberryPi #PiCamera #Python #rclone"
date: "2018-08-23"
categories: 
  - "python"
  - "raspberrypi"
tags: 
  - "picamera"
  - "python"
  - "raspberrypi"
---

前回、アップロードまで完了しましたが、画像の暗い部分などでノイズが目立つことがあります。

OpenCVにはアンチノイズリダクションに使えるAPIが用意されているので、試しに使って見たいと思います。

結果としては、少し精細感を欠き、処理時間が２倍ぐらい掛かってしまいますが、ノイズを軽減することが出来ました。

アンチノイズ処理は、**cv2.imwrite**の手前に、下記の処理を追記することで、実現します。

https://gist.github.com/kght6123/29f85cdbdd99880e84be1a0f425c65b6?file=picapture\_denoising.py

簡単に処理を解説させていただくと、

まず、先に**cv2.fastNlMeansDenoisingColored**で、ノイズを除去します。

あまり、効果を高くすると、詳細が潰れてしまうので、適度な設定で実施します。

次に**cv2.edgePreservingFilter**で、残った細かいノイズも除去します。

このフィルタは、エッジ以外の部分を塗り潰したような効果が得られます。

これも、あまり効果を高くすると、処理が大幅に遅くなり、アニメ絵みたいになるので、適度な設定で実施します。

最後に、**cv2.detailEnhance**で細部を強調します。

ノイズ除去処理で潰れてしまった細部を、可能な限り復元します。

これもやり過ぎると、絵画調みたいな感じになってしまうので、注意します。

* * *

今回は、３つの処理を兼ね合わせてノイズ除去を試みました。

**cv2.fastNlMeansDenoisingColored**や**cv2.edgePreservingFilter**の単体でも、そこそこ効果があったので、

処理の時間を考慮しつつ、好みに合わせて調整して利用していただければ・・・・と思います。
