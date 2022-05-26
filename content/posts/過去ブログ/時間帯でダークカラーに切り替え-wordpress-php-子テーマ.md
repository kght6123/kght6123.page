---
title: "時間帯でダークカラーに切り替え #Wordpress #PHP #子テーマ"
date: "2018-08-01"
categories: 
  - "wordpress"
tags: 
  - "php"
  - "wordpress"
  - "ダークカラー"
  - "ライトカラー"
  - "子テーマ"
---

[前回の記事](https://kght6123.jp/blog/2018/07/02/wordpress%e3%81%ae%e5%ad%90%e3%83%86%e3%83%bc%e3%83%9e%ef%bc%8bgist%ef%bc%8b%e3%83%80%e3%83%bc%e3%82%af%e3%83%86%e3%83%bc%e3%83%9e/)でも紹介させて頂きましたが、

このブログはWorkpressのデフォルトテーマを親テーマとし、

子テーマでレイアウトをカスタマイズして、全体的にダークカラーに変更しています。

単純に目に優しいのと、黒ベースの方が写真が映えると思い採用しました。汗

かなり、ダークな雰囲気で、個人的にはすごく気に入っていますが、

日中はライトカラーの方が文字が見やすくて、朝ならそんなに目は疲れてないし

ダークカラーじゃないパターンがあっても良いなーと思って、

時間帯で、ダークカラーとライトカラーが切り替わるようにしました。

下記はそのPHP側のコードです。

CSSは[Gist](https://gist.github.com/kght6123/d8975c0dd4ee2dcbc9df9e390d1db8d5)に貼り付けているので、よろしければ参考にしてください。

https://gist.github.com/kght6123/d8975c0dd4ee2dcbc9df9e390d1db8d5?file=functions.php

適用すると、時間帯でカラーが変わりますが、

下記の様にリクエストパラメータで、強制的にカラーを切り替えることもできます。

[ダークカラーへ](https://kght6123.jp/blog/?kght_style_mode=dark)

[ライトカラーへ](https://kght6123.jp/blog/?kght_style_mode=light)
