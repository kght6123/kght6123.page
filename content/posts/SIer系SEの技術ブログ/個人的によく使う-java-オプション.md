---
title: "個人的によく使う #Java オプション"
date: "2018-07-05"
categories: 
  - "java"
tags: 
  - "java"
---

1. 簡単に主要なオプションを解説させていただくと、

- 　常駐型のプログラムでは-serverを明示的に指定
- 　メモリサイズ（New・Old・Perm領域）を際限なく拡がらない様に固定
    - メモリサイズはプログラムによって最適な値をあらかじめ決める
- 　コンカレントGCとパラレルGCを明示的に有効化
- 　GCログとJMX設定は管理・運用の為に必須。

実際のオプションは下記になります。

 -server
 -verbose:gc
 -Xms368M
 -Xmx368M
 -XX:NewSize=340M
 -XX:MaxNewSize=340M
 -XX:PermSize=24M
 -XX:MaxPermSize=32M
 -XX:SurvivorRatio=1
 -XX:TargetSurvivorRatio=90
 -XX:InitialTenuringThreshold=150
 -XX:MaxTenuringThreshold=150
 -XX:+AggressiveOpts
 -XX:+ScavengeBeforeFullGC
 -XX:+UseConcMarkSweepGC
 -XX:+CMSParallelRemarkEnabled
 -XX:+UseParNewGC
 -XX:+UseLWPSynchronization
 -XX:+UseCompilerSafepoints
 -XX:+UseOnStackReplacement
 -Xloggc:jvm.gc.log
 -XX:+PrintGCDetails
 -XX:+PrintGCApplicationStoppedTime
 -XX:+PrintGCApplicationConcurrentTime
 -XX:+PrintGCTimeStamps
 -XX:+PrintTenuringDistribution
 -XX:+TraceGen0Time
 -XX:+TraceGen1Time
 -XX:+PrintHeapAtGC
 -XX:+PrintGCTimeStamps
 -Dcom.sun.management.jmxremote=true
 -Dcom.sun.management.jmxremote.port=54003
 -Dcom.sun.management.jmxremote.authenticate=false
 -Dcom.sun.management.jmxremote.ssl=false
