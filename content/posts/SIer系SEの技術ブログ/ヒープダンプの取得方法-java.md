---
title: "ヒープダンプの取得方法 #Java"
date: "2018-07-05"
categories: 
  - "java"
tags: 
  - "java"
---

1. OutOfMemoryError時取得（VMオプション指定）
    
    \-XX:+HeapDumpOnOutOfMemoryError -XX:HeapDumpPath=./dump.hprof
    
2. 手動取得（PID指定）
    
    \-XX:+HeapDumpOnOutOfMemoryError -XX:HeapDumpPath=./dump.hprof
    
3. 手動取得を簡単に行う（Windows）Javaのパスとか環境に合わせて適宜変えてください。

```bat
rem jheapdump.bat
@echo off
SET /P "NAME=名前を入力してください>"
SET /P "PID=PIDを入力してください>"
C:\java\7\jdk1.7.0_67\bin\jmap.exe "-dump:format=b,file=%~dp0\heapdump-%PID%-%NAME%.hprof" %PID%
rem C:\java\7\jdk1.7.0_67\bin\jmap.exe "-F" "-dump:format=b,file=%~dp0\heapdump-%PID%-%NAME%.hprof" %PID%
@echo on
```