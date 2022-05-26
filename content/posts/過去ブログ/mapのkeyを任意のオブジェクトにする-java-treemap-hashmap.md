---
title: "MapのKeyを任意のオブジェクトにする #Java #TreeMap #HashMap"
date: "2018-07-16"
categories: 
  - "java"
tags: 
  - "java"
---

JavaのMapでKeyを任意のオブジェクトにします。

HashMapでは`equals`、`hashCode`の対応、

TreeMapでは`compareTo`の対応が必要です。

下記のサンプルでは、`compareTo`を再利用してます。

https://gist.github.com/kght6123/25299f2682b3fa781fe41f87f95840f6?file=Main.java

`compareTo`の結果は等しい時は`0`、異なる時は`0以外`を表すので

`equals`の結果にも再利用しています。

https://gist.github.com/kght6123/25299f2682b3fa781fe41f87f95840f6?file=KeyInfo.java

複数のシステムをまたがるデータを合わせ込む場合に、よく使うにゃー・・・
