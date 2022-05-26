---
title: "忙しい人のためのJavaの近況とOpenJDKについて #Corretto #Zulu #Adopt"
date: "2018-09-26"
categories: 
  - "it系"
  - "java"
tags: 
  - "java"
  - "openjdk"
---

OracleからJava11がリリースされましたが

私自身、色々と誤解していた部分があったので、まとめてみました。

まとめてみると、今後はAdoptかZuluのOpenJDKがサポート期間も長く主流になるかも？と思えます。

OracleのOpenJDKも、LTSで3年サポートされれば、、、Oracle嫌いだけど。

（個人的には、流れ的にOracleのOpenJDKもLTSで3年サポートされるでしょーって思います。）

因みにサポートとは、バグフィックスやセキュリティパッチを入手できるか？ということです。

11/15 Correttoを追記。OpenJDKの戦国時代になりそうな、選択肢の豊富さになってきました。

- **Oracle JDK11**
    - OracleのJDK、今までのJDKといえばほぼコレ。
    - Java12が出るまで（6ヶ月）のサポートは無償（開発・テストやプロトタイプ、デモ用途に限定）。Java12が出てからのサポートや実運用は有償。

- **Oracle OpenJDK11**
    - OracleがOpenJDKをビルドして提供
    - Java12が出るまで（6ヶ月）のサポートは無償。Java12が出てからのサポート（LTS期間の3年）はチーフアーキテクトのMark Reinhold氏が宣言しているが、公式発表はなし。jdk.java.netで提供。

- **Adopt OpenJDK**
    - AdoptOpenJDKコミュニティがOpenJDKをビルドして提供
    - **Java8は2023年9月**まで、**Java11は2022年9月**まで（最低4年間）サポート。
        - IBMやMS？がスポンサー
    - AdoptOpenJDK＋HotspotVMと、AdoptOpenJDK＋OpenJ9がある
        - Linux、AIX、Windows向けに提供されている。
        - HotspotVMのみ、MacOSとLinux ARM向けが提供されている。
    - [DockerHub](https://hub.docker.com/u/adoptopenjdk/)でも配信。 
    - IBMが、AdoptOpenJDKを4年間サポートする意向を示している。

- **RedHat OpenJDK11**
    - RedHatがOpenJDKをビルドして提供
    - OpenJDK8をRed Hatが**2020年10月まで**サポート、OpenJDK11はRed Hatが独自のサポート期間を設ける
        - Red Hat Linuxのエンタープライズ版で利用する事ができる。

- **IBM JDK ＋ OpenJ9**
    - IBMのJDK。ランタイムのOpenJ9が最近OSS化された。
    - **Java8は2022年4月まで**サポート
        - Windows向けのバイナリは単体で提供されていない。
        - LinuxやAIX向けは単体提供あり。
        - [DockerStore](https://store.docker.com/search?q=IBM&type=image&source=verified)で無料配信されているが、実運用は有償。  
            

- **Zulu OpenJDK**
    - AZUL SystemsがOpenJDKをビルドして提供
    - 商用サポートは8年のLTSサポートで、セキュリティとバグ修正を迅速に入手できる
    - 非商用の提供は明確にされていない。
        - JDK10、JDK9の32bit版があり、JDK6u113、JDK7u191、JDK8u181がある。
            - 非商用もサポート長いかもしれない？
        - [ダウンロードページ](https://jp.azul.com/downloads/zulu/)
    - カスタマーにMicrosoft
    - 元OracleのSimon Ritter氏が所属している

- **Amazon Corretto**
    - AmazonがOpenJDKをビルドして無償提供、今はプレビュー版。正式は2019年1月を予定。
    - **JDK8は2023年6月**(4年半)、**JDK11は2024年6月**(4年半)、セキュリティとバグ修正を入手できる？
    - 現在、Amazon Linux、Windows7～10、MacOSのインストーラ、Docker版が提供中、Windowsの32bit版の有無は不明。
        - 正式リリース時には、UbuntuやRed Hat Enterprise Linuxが含まれる
        - 個人的には、zip版も欲しい、、、
        - [ダウンロードページ](https://docs.aws.amazon.com/ja_jp/corretto/latest/corretto-8-ug/downloads-list.html) 
        - AWSにJavaの神様と言われているJames Gosling氏が所属している

以上
