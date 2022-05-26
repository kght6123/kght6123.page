---
title: "ダウンロード開始の検出 #Java #JQuery"
date: "2018-07-06"
categories: 
  - "java"
  - "javascript"
  - "jquery"
tags: 
  - "java"
  - "javascript"
  - "jquery"
---

サーバサイドで、巨大なExcelファイル（Apache POI利用）を長時間作成するので、 **ダウンロードの開始を画面で検知**し、**処理中の状態を表示**できるようにしました。

ServletとJQueryでCookieをやり取りするレガシーな処理です。 **Cookieはダウンロードするファイルと一緒に、レスポンス（Header）として返す事ができます。**

ダウンロード中に表示されるプログレスボタンは、JQuery-UIのプログレスを想定しています。

https://gist.github.com/kght6123/544a3a71525435c425adf6141795d684
