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

https://gist.github.com/kght6123/bbe6c2e102f9a3b8f7eab19ab8c9a87a
