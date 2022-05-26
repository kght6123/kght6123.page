---
title: "HTTPメソッドをオーバライドする #Java #Servlet #Struts #REST"
date: "2018-08-26"
categories: 
  - "java"
  - "struts"
---

strutsのアクション内の処理分岐を、REST APIの様にHTTPメソッドで行えないか悩んでいたところ、

下記の様にHttpServletRequestをラップする事で上手くいきました。

https://gist.github.com/kght6123/9de09f78b1f1246183ad5ac44244b47b?file=HttpMethodOverrideServletRequest.java

HTTPメソッドのオーバライドの仕様に乗っ取り、

リクエストパラメータやリクエストヘッダーに"\_method" "X-Method-Override" "X-HTTP-Method-Override"のパラメータがあれば、

本来、HttpServletRequest#getMethod()で返しているHTTPメソッドより、優先します。

HttpServletRequestのラップは、下記の様にFilterで行います。

https://gist.github.com/kght6123/9de09f78b1f1246183ad5ac44244b47b?file=HttpMethodOverrideFilter.java

Struts1系の場合は、ActionServletがHttpServletのdoPut、doDeleteに対応していないので

下記の様に、ActionServletをオーバライドして、doPut、doDeleteの時にActionServlet#doPostが実行される様にします。

https://gist.github.com/kght6123/9de09f78b1f1246183ad5ac44244b47b?file=ActionServlet.java

これで、HTTPメソッドがオーバーライドされ、HttpServletRequest#getMethod()の結果が、PUTやDELETEに変わる様になります。  

* * *

今、Struts1.2.9 SP3をコアに、今の新しいライブラリや概念を組み合わせて

アレンジして使いやすくするとしたら、、、という試みを行ってます。

主にThymeleaf、REST APIの思想などを組み入れ、素のstrutsより開発に手間が掛からなくなる様な仕組みを入れようと模索しています。

GitHubで公開しているので、よろしければご覧ください。

**[https://github.com/kght6123/smart-struts1](https://github.com/kght6123/smart-struts1)**

以　上
