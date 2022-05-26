---
title: "#IE11 で #CSS グリッドは難しくない"
date: "2018-07-08"
categories: 
  - "css"
---

今回、この記事でAutoPrefixerは利用しません。

IE11は`[x]`で`repeat`を指定できます https://gist.github.com/kght6123/d6c073388916a9eb67684deb5fcf7c1f

`minmax()`は、IE11で利用できますが、`auto-fit`と`auto-fill`は利用できません。

`fit-content()`も、IE11で利用できませんが代替の手段があります。

グリッドの列/行に`minmax(min-content, max-content)`を適用し、子要素に`max-width: [value]`を設定します。

IE11以外のブラウザでは、`fit-content`の代わりに`auto`を指定しても同じです。

https://gist.github.com/kght6123/cab5ebb8f597fd67572bf79fdb86f929

ちなみに、IE11の`auto`の動きは他のブラウザと異なります。

IE11で他のブラウザのautoを再現しようと試みましたが、`minmax(min-content, 1fr)`は、横幅がコンテンツの量に対応せず、 `minmax(min-content, 100%)`、`minmax(min-content, auto)`は使用することができません。

その場合は、`minmax(min-content, max-content)`が一番、最適だと思われます。

[コード全体](https://github.com/kght6123/kght6123.github.io/blob/master/ie11/ie11-friendly-grid.html)　[プレビュー](https://kght6123.github.io/ie11/ie11-friendly-grid.html)

[ソース](https://css-tricks.com/css-grid-in-ie-debunking-common-ie-grid-misconceptions/ )
