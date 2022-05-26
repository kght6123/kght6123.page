---
title: "Windows on ARMを開発者目線で試す（ツール編） #ASUS #NovaGo #NP370QL #Snapdragon"
date: "2018-07-29"
categories: 
  - "雑談"
tags: 
  - "arm-on-windows"
  - "novago"
---

前回、[開梱と外観をレビュー](https://kght6123.work/blog/2018/07/29/windows-on-arm%e3%82%92%e9%96%8b%e7%99%ba%e8%80%85%e7%9b%ae%e7%b7%9a%e3%81%a7%e8%a9%a6%e3%81%99%ef%bc%88%e9%96%8b%e6%a2%b1%e3%81%a8%e5%a4%96%e8%a6%b3%e7%b7%a8%ef%bc%89-asus-novago-np370ql-snapdrag/)させて頂きましたが、

今回は開発環境の構築です！

x86のエミュレートが出来るので、多少、動作が遅くてもそこそこ動くだろうと思ってましたが、

今はx86\_64が普及していて、**x86の存在が無い**ことを実感させられました、、、

救済で、x86\_64もエミュレートして貰えませんか、、、

私がよく使っているアプリだけで、まだまだ少ないですが、ご参考になれば。。。。

| アプリ名 | 結果 |
| --- | --- |
| VSCode insider x86 | ○ |
| Brackets | ○ |
| Windows Subsystem for Linux(Ubuntu 18.0.4 ARM) | ○ |
| git for windows x86 | ○ |
| Oracle JDK8 x86 | ○ |
| Oracle JDK9 | x86\_64のみ |
| Oracle JDK10 | x86\_64のみ |
| eclipse 4.8.0 photon (zip版) | ○ |
| Intellij IDEA Community 2018.2 (zip版) | ○ |
| [android studio Canary3 (zip版)](https://developer.android.com/studio/archive) | △（重い） |
| dropbox | × |
| boost note | x86\_64のみ |
| 7-zip x86 | ○ |
| Office 2016 x86 | ○ |
| CLIP STUDIO PAINT PRO 1.7.8 | ○ |

Javaは、特に**Orqcle JDK8**が2020年の終わりまでのサポートのため、**Oracle JDK10**が使えないと将来的に痛いと思います。

個人的には、メインのマークダウンエディタの**boost note**と、その保管先の**dropbox**が使えないのも痛い、、、

**boost note**と**OpenJDK10**は、困ったらARM向けにビルドしてみようかな、、、

**Android Studio**は、重すぎてなかなか起動しませんでした、**Intellij IDEA**はあっさり起動したので、こちらを利用した方が良いと思います。

後は、x86版のエミュレートなので、2GB以上のメモリ領域を一つのアプリケーションで使えないと思います。

やはり、メインPCとしては微妙で、バッテリー持ちと携帯性やLTEを武器にする感じですね。

**Windows RT**よりは、だいぶマシかな？

### 2018/8/1追記

残り時間が思ったより、かなり長いです。

<amp-img src="/images/posts/sier-se/20180731_buttery-time-300x143.png" layout="intrinsic" width="2511" height="1137" class="block"></amp-img>

やはり動画22時間再生は伊達じゃなかった。。。

これで、エミュレートがばっちりだったらよかったのに。
