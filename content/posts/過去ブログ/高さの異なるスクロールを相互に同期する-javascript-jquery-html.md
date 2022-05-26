---
title: "高さの異なるスクロールを相互に同期する #JavaScript #JQuery #HTML"
date: "2018-10-08"
categories: 
  - "javascript"
  - "jquery"
tags: 
  - "html"
  - "javascript"
  - "jquery"
  - "スクロール"
---

高さが異なるスクロール領域を、スクロール領域の割合を基準に同期します。

相互のスクロール領域のスクロール位置を同期する為、

同期対象のスクロールイベントが、スクロール位置の同期時に発火してしまうと、

スクロールの操作がスムーズにならなくなるので

JQueryのon・off関数 を使って、一時的にscrollイベントを無効にしています。

https://gist.github.com/kght6123/afbd39f271e87934dba7b07fdede3e35
