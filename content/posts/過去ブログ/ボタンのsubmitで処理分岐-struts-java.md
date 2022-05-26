---
title: "ボタンのSubmitで処理分岐 #Struts #Java"
date: "2018-07-16"
categories: 
  - "java"
  - "struts"
tags: 
  - "java"
  - "struts"
---

`input type="submit"`は、`value`が表示と値(value)を兼ねているので、

表示される日本語を含む文字が、サーバ側に送信されます。

そのため、日本語でどのボタンが押下されたか判別する必要がありました。

（別途、非表示の値をJavaScriptで修正してSubmitする方法もあります。）

最近のブラウザの`button`タグでは、サーバへ送信する値(value)とラベルの定義(タグの内容)が完全に別けられており、

ボタンの定義だけで、日本語を含む文字の判定が不要になります。

![](images/21687766_1971012336478872_8492298609952628292_n1.jpg)

はっぴ

Strutsは昔のフレームワークですが、まだ一部で広く使われています。。。

https://gist.github.com/kght6123/7bbd58dc178afd40e0e3139f46f5a947?file=test.jsp https://gist.github.com/kght6123/7bbd58dc178afd40e0e3139f46f5a947?file=TestForm.java https://gist.github.com/kght6123/7bbd58dc178afd40e0e3139f46f5a947?file=TestAction.java
