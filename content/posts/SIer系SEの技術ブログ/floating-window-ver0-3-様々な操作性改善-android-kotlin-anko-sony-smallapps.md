---
title: "#floating-window ver0.3 様々な操作性改善 #Android #Kotlin #anko #Sony #Smallapps"
date: "2018-08-20"
categories: 
  - "floating-window開発"
---

去年の5月ぐらいから、Sonyの_SmallApps_の代替にできるフレームワークを目指して、Kotlin＋ankoで細々と作っています。

過去、SmallAppViewerというアプリを公開しておりましたが、Smallappsのサポート終了のため、無謀にも自分で作ろうと思い立ちました。

まだまだ、α版にも届いていなく開発も遅いですが、下記を直近の主な目標にしています。

- Xperia以外の端末で動き、ルート権限不要
- プラグイン的にアプリを追加できる
- 一つのアプリを複数ウィンドウで開ける  
    

今回、ver0.3で加えた修正を紹介させて頂きます。

#### [1\. BrowserとCalcアプリをSampleからCoreへ移動](https://github.com/kght6123/floating-window-android/commit/623a6bef30b12e970b0eb96e41550803b34f6b93?diff=split)

Coreのapkだけインストールすれば、計算機とブラウザアプリが動作するようにしました。

Sampleのapkはフレームワークを実装するためのサンプルの役割だけになります。  

#### [2\. apk作成と、mavenリポジトリの更新手順の見直し](https://github.com/kght6123/floating-window-android/commit/62b967cc86382f922c676fcd329c7e76c29e3b71?diff=split)

apkを作成するためのmakeapk.shと、リポジトリを更新するためのupdatemaven.shを追加しました。

今まで、READMEを見ながら実施してましたが、めんどうだったので。。。

READMEも一部、修正しています。

#### [3\. シングルタップ以外でも、ウィンドウを非活性に出来る様に改善。](https://github.com/kght6123/floating-window-android/commit/02e643adce99762d8eec78146f43913ca927d195?diff=split)

ウィンドウの背面を動かしたいときに、ウィンドウの外側をシングルタップして明示的に非活性にする必要がありました。

シングルタップ以外（スクロールなど）でも非活性になるようになりました。

#### [4\. 新規ウィンドウ表示時に、新規ウィンドウを優先して活性になる様に改善。](https://github.com/kght6123/floating-window-android/commit/02e643adce99762d8eec78146f43913ca927d195?diff=split)

今まで、新しくウィンドウを開いたときに、既存で開いているウィンドウが一番前面に表示され、新しく開いたウィンドウは最背面でしたが、

今後は新しく開いたウィンドウが、最前面に表示されます。

#### [5\. バージョンをモジュール間で統一](https://github.com/kght6123/floating-window-android/commit/f8d145aedb3966d108ce73c447629c2904d61c30?diff=split)

２つのCoreとFrameworkのモジュールで、それぞれ異なるバージョンでプロジェクトが構成されてましたが、

毎回、それぞれのバージョンを上げるのが大変なので、修正が多い間は統一としました。

プロジェクトのbuild.gradleでバージョンを定数で定義し、各モジュールで利用しています。

以上
