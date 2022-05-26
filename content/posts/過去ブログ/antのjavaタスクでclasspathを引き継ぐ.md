---
title: "AntのJavaタスクでCLASSPATHを引き継ぐ"
date: "2018-09-20"
categories: 
  - "java"
tags: 
  - "ant"
  - "java"
---

baseDirを変えて、外部のAntスクリプトを呼び出したい事があったので

javaタスクで新しいAntプロセスを起動し、build.xmlを実行することにしました。

その際に欠点があり、Ant実行時に指定したCLASSPATHが引き継がれません。  

Antのドキュメントを調べてみると、VM引数に**"-Dbuild.sysclasspath=last"**を追加すると良さそうです。

因みに、javaタスクの**cloneVm="true"**も目的を達成できそうでしたが、

対象のビルドファイル指定(**\-buildFile**)が無効になってしまったので、

別のbuild.xmlを呼ぶことには使えなさそうです。

これで、長々とJavaタスクのclasspathを書く必要がなくなりました。

https://gist.github.com/kght6123/cf6b881011bd15b779df22c3c6aea13d
