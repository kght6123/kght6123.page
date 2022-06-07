---
title: "exists, notExists関数を #JQuery に追加 #JavaScript"
date: "2018-07-02"
categories: 
  - "javascript"
  - "プログラミング"
tags: 
  - "javascript"
---

毎回、lengthでオブジェクトの有無の判定するのは冗長なので、専用の関数をJQueryに追加します。

```js
// jquery-exists.js

/**
 * jQueryのSelector実行結果が存在するか判定する
 * 	[例] 
 * 		if ($("#id").exists()) {
 * 		  // #idが存在するとき
 * 		}
 */
jQuery.fn.exists = function(){return Boolean(this.size() > 0);}
jQuery.fn.notExists = function(){return !this.exists();}
```
