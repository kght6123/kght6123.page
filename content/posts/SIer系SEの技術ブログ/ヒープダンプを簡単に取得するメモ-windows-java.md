---
title: "ヒープダンプを簡単に取得するメモ #Windows #Java"
date: "2018-09-01"
categories: 
  - "java"
  - "windows"
tags: 
  - "java"
  - "windows"
---

## 経緯

過去に、タスクマネージャやJconsoleで負荷を見つつ、

ヒープダンプを随時取得しメモリーリークの証拠を得たいことがあり、調べた内容のメモになります。

JVMベースの言語は多いので、参考になれば・・・？と思います

## ヒープダンプの取得方法

主に、VMオプションを指定し、OutOfMemoryエラーが発生した際に取得する方法と、

jmapコマンドを使って取得する方法の二つがあります。

今回は随時、取得したいので、VMオプションとjmapコマンドを組み合わせました。

1. OutOfMemoryError発生時に取得するオプション  
    **\-XX:+HeapDumpOnOutOfMemoryError -XX:HeapDumpPath=./dump-oome.hprof**
2. jmapコマンドで取得する  
    **%JAVA\_HOME%/bin/jmap -dump:format=b,file=heapdump\_manual.hprof %PID%**

毎回、コマンドプロンプト開いて実行するのは、面倒ですよね。。。

## バッチファイル化

そこで、バッチファイルを実行して、PIDと名称を入力すれば、

カレントフォルダに名称＋PID付きのダンプファイルを取得するバッチファイルを作りました。

デスクトップや、作業フォルダに置いておくと、実行したい時にすぐ実行できるので便利です。

バッチファイルの内容はこんな感じです。

```bat
rem heapdump.bat
@echo off

SET /P "NAME=名前を入力してください>"
SET /P "PID=PIDを入力してください>"

set TIME_TMP=%time: =0%
set NOW=%date:/=%%TIME_TMP:~0,2%%TIME_TMP:~3,2%%TIME_TMP:~6,2%

%JAVA_HOME%\bin\jmap.exe "-dump:format=b,file=%~dp0\heapdump-%PID%-%NAME%-%NOW%.hprof" %PID%

rem -Fを付けると強制
rem %JAVA_HOME%\bin\jmap.exe "-F" "-dump:format=b,file=%~dp0\heapdump-%PID%-%NAME%-%NOW%.hprof" %PID%

@echo on
```

簡単で申し訳ない。。。。

## バッチファイルの解説

まず、**SET /P** でファイル名とPIDの標準入力できる様にします。

PIDはjconsoleや、タスクマネージャでわかり、名前は適当に分かりやすい名前にしてください。

次に、NOW変数にファイル名の為の現在日時を格納します。  
ファイル名にしたいので、記号や空白文字を空文字に置き換えて、数字だけにします。

最後に、jmapコマンドで、ヒープダンプを取得します。  
**format=b**のオプションは、**Eclipse Memory Analyzer**で分析する為に付与しています。

ちなみに**jmap**コマンドのオプションに、**\-F**を付与すると、強制でヒープダンプを取得します。

#### 以上
