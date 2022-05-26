---
title: "#Java でナノ秒を扱う最善の方法を探る（Timestamp型とString型の相互変換）"
date: "2018-07-02"
categories: 
  - "java"
  - "プログラミング"
tags: 
  - "java"
---

MessageFormatを利用して、**秒まではDate、ミリ秒以降はNumberで扱う**ことを考えました。

よく利用する日付フォーマットのパターンはenum化しています。

ついでに**JavaとDBの現在のシステム日時をナノ秒まで取得**する関数も追加しました。

https://gist.github.com/kght6123/3b60983973620dde3eef47df6fc805d9
