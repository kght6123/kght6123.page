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

```js
// scroll-sync.js
$(function(){
  var onTimerId;
  // 高さが異なるスクロールの同期（基準のセレクタと、同期対象のセレクタを指定する）
  function syncRaitoScroll(_selector1, _selector2) {
    var $t1 = $(_selector1);
    var $t2 = $(_selector2);
    if($t1.length < 1 || $t2.length < 1)
      return;

    // スクロール量の割合を同期する
    var scrollTop1 = $t1.scrollTop();
    var scrollHeight1 = $t1[0].scrollHeight - $t1.innerHeight();
    var scrollHeight2 = $t2[0].scrollHeight - $t2.innerHeight();
    var scrollTop2 = scrollTop1 / scrollHeight1 * scrollHeight2;

    // 一時的に同期対象のスクロールイベントを無効にする
    $t2.off(".syncraito");
    $t2.scrollTop(scrollTop2);

    // 前回のスクロールイベントの有効化は削除して、新たに設定する
    if (onTimerId) clearTimeout(onTimerId)

    // 同期対象のスクロールイベントの有効化は一定時間後に非同期で実施する
    //（同期対象のスクロールイベントも発火してしまう為）
    onTimerId = setTimeout(function() {
      $t2.on("scroll.syncraito", function (_e) {
        syncRaitoScroll(_selector2, _selector1);
      });
    }, 500); 
  }
  // スクロール１のスクロールイベント設定
  $("#scroll-el1").on("scroll.syncraito", function (_e) {
    syncRaitoScroll("#scroll-el1", "#scroll-el2");
  });
  // スクロール２のスクロールイベント設定
  $("#scroll-el2").on("scroll.syncraito", function (_e) {
    syncRaitoScroll("#scroll-el2", "#scroll-el1");
  });
});
```