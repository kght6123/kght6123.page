---
title: "プロセスの優先度と割当コア数を変更する #Windows"
date: "2018-09-02"
categories: 
  - "windows"
tags: 
  - "powershell"
  - "windows"
---

## 経緯

共有で利用しているリモートデスクトップのサーバがあり、

他の利用者に迷惑をかけない様に、常駐している重いプロセスの優先度を下げることにしました。

重いのは、大量のJavaプロセスです。

## 概要

PowerShellで、一括でProcessorAffinityとPriorityClassを変更します。

コードは下記の様な感じです。

```
# 証明書を無効にする(事前にpowershellコマンドで実行しておく)
# powershell "set-executionpolicy remotesigned"

# CPUはコア2のみ使用、優先度は最低にする
Get-Process -Name java | % { $_.ProcessorAffinity=2; $_.PriorityClass="Idle" }

# 
# Example: (8 Core Processor)
# - Core # = Value = BitMask
# - Core 1 =     1 = 00000001
# - Core 2 =     2 = 00000010
# - Core 3 =     4 = 00000100
# - Core 4 =     8 = 00001000
# - Core 5 =    16 = 00010000
# - Core 6 =    32 = 00100000
# - Core 7 =    64 = 01000000
# - Core 8 =   128 = 10000000
# - All    =   255 = 11111111
# 
# Example: PriorityClass
# - Idle
# - BelowNormal
# - Normal
# - AboveNormal
# - High
# - RealTime
# 
```

内容的には一行で済むので、PowerShellを開いて、手で実行しても良いと思います。

以上
