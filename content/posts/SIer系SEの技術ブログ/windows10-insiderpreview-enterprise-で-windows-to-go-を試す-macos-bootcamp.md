---
title: "#Windows10 InsiderPreview Enterprise で Windows To Go を試す #macOS #Bootcamp"
date: "2018-08-19"
categories: 
  - "mac"
  - "windows"
tags: 
  - "bootcamp"
  - "macos"
  - "windows"
  - "windows-to-go"
---

Macで手軽にWindows環境が欲しいけど、Bootcampで本運用できるほどSSDの容量はあまり大きくないし、

かといって、VirtualBoxなど仮想環境を入れるのも、SSDの容量を圧迫するし動作が重いのでしたくない・・・と思っていましたが、

Windows To Goという機能があるのを知り、自分でWindows To GoをUSBにインストール出来ないか・・・試してみました。

きっかけは「SuperSpeedBlazer」というガジェット？です。

> Windows To Goを利用しMacに接続するだけでWindowsを利用できるUSB 3.1 Gen2対応デバイス「SuperSpeedBlazer」
> 
> https://applech2.com/archives/20180808-superspeedblazer-mac-into-windows.html

Windows To Goをインストールするには、「Windows 10 Enterprise」が必要です。

これは、企業向けのボリュームライセンスしかないので、普通は手に入れることが出来ないのですが、

新しいビルドへ更新し続けていれば、Preview版を使い続けることが可能な、開発者向けのバージョン（Insider Preview）があります。

ビルドに有効期限があるので、マイクロソフトがいつ止めるかわかりませんので怖いですが、試して見ることは出来そうなので、試してみました。

注意事項や必要機器など

初回、Windows To Goで起動した時に、**最初はMacのキーボードやタッチパッド、WiFiが使えない**ので、

私は、USB-Cのドックにキーボードとマウスを繋げ、有線LANを使うことで回避しました。

Windows To GoはUSBメモリにインストールできないので、今回はUSB-C to USB3.1＋USB3.0 to SATA＋余っていたSSD（128GB）を利用します。

あと、Windows To Goをインストールしたり、Mac用のドライバを入手するために、一時的にBootcamp領域を作成するので、

初回だけMac側にBootcamp可能な、空き領域が必要です。

Windows To Go作成に使うISOイメージや、Bootcamp用のドライバを一時的に格納しておくために、別のUSBメモリか、NASなども必要です。

作業で利用した機器は、[ページ下部](#last)で紹介させて頂いております。

よろしければ、ご覧ください。

Bootcampアシスタントで「Windows 10 Enterprise Insider Preview」をインストール

Microsoftアカウントに登録し、[Insider Previewのページ](https://www.microsoft.com/en-us/software-download/windowsinsiderpreviewadvanced)からISOファイルをダウンロードしてください。

エディションと言語は下記の様に選択して、Comfirmボタンを押下するとダウンロードが始まります。

このISOファイルはWindows To Goをインストールする際にも利用するので、

DVDに焼くか、別のUSBメモリやディスク、NASに置いておくと、再ダウンロードの手間が省けます。

<amp-img src="/images/posts/sier-se/12.png" layout="intrinsic" width="2511" height="1137" class="block"></amp-img>

あとは、Bootcampアシスタント（⌘＋スペースで検索）を起動し、下記の様にウィザードの指示に従います。

- <amp-img src="/images/posts/sier-se/6103f1da6d7959e978b1c9fb127a2171.jpg" layout="intrinsic" width="2511" height="1137" class="block"></amp-img>
    
- <amp-img src="/images/posts/sier-se/afa1371af4fa7380aeef4f52a36e4c96.jpg" layout="intrinsic" width="2511" height="1137" class="block"></amp-img>
    
- <amp-img src="/images/posts/sier-se/a2c47bc8c4524532f10eeb81f666588d.jpg" layout="intrinsic" width="2511" height="1137" class="block"></amp-img>
    

インストールが完了すると、Windowsが起動するので、初期設定を済ませて、デスクトップを表示させてください。

Windows サポートソフトウェアのインストーラが表示された時、**「OSXRESERVED」**というディスクがマウントされています。

この**「OSXRESERVED」**の中の**「$WinPEDriver$」**と**「Bootcamp」**フォルダだけ、別のUSBメモリやディスク、NASにコピーして、退避します。

Windows To Goのインストール（ワークスペースの作成）

まず、「Windows 10 Enterprise Insider Preview」のインストールディスク（ISO）をマウントします。

焼いたDVDを入れるか、別のUSBメモリやディスク、NAS上のISOファイルを右クリックして、「マウント」を選択します。

<amp-img src="/images/posts/sier-se/03.png" layout="intrinsic" width="2511" height="1137" class="block"></amp-img>

ISOのマウントがWindowsで出来る

コントロールパネルを開き、大きいアイコンに表示を変えて、「Windows To Go」を選択します。

<amp-img src="/images/posts/sier-se/01.jpg" layout="intrinsic" width="2511" height="1137" class="block"></amp-img>

大きいアイコンにしないと表示されない

Windows To Go ワークスペースの作成ウィザードが開くので、ウィザードに従って必要事項を入力します。

<amp-img src="/images/posts/sier-se/02.png" layout="intrinsic" width="2511" height="1137" class="block"></amp-img>

使用するドライブを選ぶ

<amp-img src="/images/posts/sier-se/04.png" layout="intrinsic" width="2511" height="1137" class="block"></amp-img>

Windows 10 Enterpriseを選択する

<amp-img src="/images/posts/sier-se/05.png" layout="intrinsic" width="2511" height="1137" class="block"></amp-img>

今回はBitLockerを使用しない（スキップを押下）

<amp-img src="/images/posts/sier-se/06.png" layout="intrinsic" width="2511" height="1137" class="block"></amp-img>

作成を押下  
（フォーマットを試みるとエラーが出ることがある、気にしない）

<amp-img src="/images/posts/sier-se/08.png" layout="intrinsic" width="2511" height="1137" class="block"></amp-img>

作成（インストール）が終わるまで待つ

<amp-img src="/images/posts/sier-se/11.png" layout="intrinsic" width="2511" height="1137" class="block"></amp-img>

作成が完了すると、最後にブートオプションの選択があるが、「いいえ」を選ぶ

Windows To Goのインストールが終わったら、シャットダウンしておきます。

Windows To Goを起動

電源ボタンを押して、すぐにキーボードのOptionsキーを押し続けて、ブートディスクの選択を表示させます。

Windows（Bootcamp）ではなく、EFI Bootを選択します。

<amp-img src="/images/posts/sier-se/IMG_0774.jpg" layout="intrinsic" width="2511" height="1137" class="block"></amp-img>

Windows To GoでWindows 10が起動するので、セットアップを行いますが、ドライバーがインストールされていないため、

キーボードやタッチパッドが反応しません。

このままではセットアップできない為、USB-Cのドックにキーボードとマウスを繋げ、有線LANを接続することで、セットアップを行いました。

Windows サポートソフトウェアのインストール

デスクトップが表示されたら、退避しておいた**「$WinPEDriver$」**と**「Bootcamp」**フォルダを適当な場所（同じフォルダ階層）にコピーします。

**「Bootcamp」**フォルダ内の「setup.exe」を実行して、Windows サポートソフトウェア（ドライバ含む）を、ウィザードの指示通りにインストールします。

後は、再起動して完了です。

Windows To Go側が使いたいときは、USB-SSDを挿して、Macをシャットダウンし、

電源ボタンを押して、すぐにOptionsを押し続けて、ブートディスクの選択を表示させ、「EFI Boot」を選択します。

起動したらこんな感じ

<amp-img src="/images/posts/sier-se/99.jpg" layout="intrinsic" width="2511" height="1137" class="block"></amp-img>

<amp-img src="/images/posts/sier-se/IMG_0776.jpg" layout="intrinsic" width="2511" height="1137" class="block"></amp-img>

最後に利用した機器のAmazonへのリンクを貼っておきます。

EwinやInateckのものはプライムデーで安く手に入れました。

Ewin ミニ キーボード
https://www.amazon.co.jp/dp/B079KCS2X7/

Inateck SATA-USB 3.0 変換アダプタケーブル
https://www.amazon.co.jp/dp/B01I4H2M42/

Apple USB-C - USBアダプタ
https://www.amazon.co.jp/dp/B00ZA1L67U/

後、ライセンス認証がうまく行われない場合は、[Microsoftアカウントの関連付け](https://insider.windows.com/ja-jp/getting-started/)や、

管理者権限のコマンドプロンプトで、下記のコマンドの実行を試してみてください。

```
slmgr /ipk CKFK9-QNGF2-D34FM-99QX2-8XC4K
```

これで、完了です。  
ご覧いただき、ありがとうございます。
