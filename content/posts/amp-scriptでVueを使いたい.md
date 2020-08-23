---
title: amp-scriptでVueを使いたい
description: 'amp-scriptでVueを使うときに、調べたことをしょうかいします！'
eyecatchImage: ['/images/posts/promo-vuejs.jpg',1600,1066]
thumbnailImage: ['/images/posts/promo-vuejs.jpg',1600,1066]
tags: ['Vue.js', 'AMP', 'amp-script']
---

結論としては、制限が多いのでVue.jsは一部で使うことにしました。

下記のampproject/amphtmlのサンプル（[vue-todomvc.amp.html](https://github.com/ampproject/amphtml/blob/master/examples/amp-script/vue-todomvc.amp.html)、[vue-todomvc.js](https://github.com/ampproject/amphtml/blob/master/examples/amp-script/vue-todomvc.js)）を参考に Vue.js で実装できます

（なかなか、見つけるのに苦労しました。汗）

## JavaScriptのサイズ制限とVueランタイムとコンパイラのサイズについて

AMPの場合はJavaScriptのサイズに制限（[1ページあたり150KB](https://amp.dev/ja/documentation/components/amp-script/?format=websites#size-of-javascript-code)）があり、

サンプルに埋め込まれている[vue.min.js（2.6.10）](https://cdn.jsdelivr.net/npm/vue@2.6.10/dist/)は、91.48 KBあるので、残り50KBしか使えません。

1ページ当たりのスクリプトのサイズなので、50KB（約5万文字）はなかなか超えないと思いますが、ちょっと心配です。

ちなみに。Vue.jsの3.0RC7（vue.global.prod.js）は、101.62 KBあるので、残りは更に減って40KBになります。

## amp-scriptでimportが使えない！

Vueを使うすべてのjsファイルでVueのソースコードを埋め込む必要があります、、、ちょっと本番運用で使うのは抵抗ありますね。

[サンプルのココの部分](https://github.com/ampproject/amphtml/blob/40a8c53f2a7fd2fc02f55585ffaaa14d89ab8402/examples/amp-script/vue-todomvc.js#L6)

理想は、importを使ってVue.jsを読み込みたい！ですが、iOSのSafariはServiceWorker上でimportが使えないので、iOSに対応したいときはimportは使えないです。

（amp-scriptはServiceWorker上で動きます。）

## Vue.jsとJavaScriptの使い分け

簡単なDOM操作だけならJavaScriptで実装、複雑なDOM操作が必要ならVue.jsで実装、150KBを超えそうなら最適化するか、AMPを諦めるか、JavaScriptへ切り替えを検討。。。って感じですか

うーん、、、最初からVue.js使わずにJavaScriptで実装した方が良いかも。。。汗
