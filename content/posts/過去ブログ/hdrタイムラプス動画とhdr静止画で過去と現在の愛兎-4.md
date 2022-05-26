---
title: "HDRタイムラプス動画とHDR静止画で過去と現在の愛兎の様子を監視する（その４） #RaspberryPi #PiCamera #Python #rclone"
date: "2018-08-17"
categories: 
  - "python"
  - "raspberrypi"
tags: 
  - "picamera"
  - "python"
  - "raspberrypi"
---

前回はHDR画像とタイムラプス動画を作成しましたが、今回はOneDriveへ作成した画像や動画をアップロードします。

アップロードには、よく使われているLinuxでよく使われているrcloneを利用します。

あらかじめ、Microsoftアカウントへの登録をしておき、OneDriveへログインをしておくとスムーズです。  

Amazonプライム会員だと、Amazon Cloud Driveへの静止画のアップロードは無制限で、他のバックアップ用途にも流用できそうだったので、事前に検討していましたが、

acd\_cliというCLIでAmazon Cloud Driveを扱うツールが開発停止しており、  
さらに、rcloneのAmazon Cloud Drive機能も開発停止していたので、契約している容量が一番大きい、OneDriveにしました。  

2018/08/19 定期削除の処理を加筆しました。

rcloneをRaspberryPiとMacにインストールします。

今回は、RaspberryPiにSSHで接続して操作しており、Webブラウザを利用した認証が出来ないので、Mac側で認証だけ実施し、RaspberryPi側に認証情報を渡す方法を実施するため、Macにもインストールが必要です。

MacとRaspberryPiで、rcloneをインストールする方法は同じです。

下記のコマンドを実行します。

https://gist.github.com/kght6123/29f85cdbdd99880e84be1a0f425c65b6?file=09\_install\_rclone.sh

下記のメッセージが最後に表示されれば、OKです。

> rclone v1.42 has successfully installed.  
> Now run "rclone config" for setup. Check https://rclone.org/docs/ for more details.

rcloneのリモート接続先の設定を行います。

インストール完了時のメッセージの通りに、”rclone config”コマンドをRaspberryPi側のみに実行します。

Mac側は認証の為に利用するだけなので、接続先の登録は不要です。

対話式でリモート接続先の作成が行われるので、下記の様に回答します。

1. リモートを作る必要があると言われます、**n**（New remote）を入力し、Enterキーを押下
2. 名前（name）を聞かれます。適当な名前（**onedrive**）などを入力し、Enterキーを押下
3. リモート接続先の種別を聞かれます。番号で**16（Microsoft OneDrive）**を入力し、Enterキーを押下
4. Client IdとClient Secretを聞かれますが、今回は不要なので、何も入力せずにEnterキーを押下
5. OneDriveのアカウント種別を聞かれます。普通はp（Personal）と思いますので、**p**を入力して、Enterキーを押下
6. 今回、SSH（リモート）でRaspberryPiに接続してセットアップを行うので、**n（No）**を入力して、Enterキーを押下
7. Mac側のターミナルで”**rclone authorize "onedrive"**”コマンドを実行して、認証を行います。  
    一旦、RaspberryPiの操作はそのまま現状維持しておきます。
8. Mac側でOneDriveのアカウント種別を再度、聞かれます。RaspberryPi側と同じ**p**（Personal）を入力して、Enterキーを押下
9. Mac側でデフォルトブラウザ（おそらくSafari）が開きます。事前に作成したMicrosoftアカウントでログインを行い、rcloneへアクセス権を許可します。
10. 無事にアクセス権が付与されれば、Mac側のターミナルに認証情報が表示されるので、Mac側の”Paste the following into your remote machine --->”の末尾から、”<---End paste”の先頭までのJSON文字列を、RaspberryPiの”result>”以降に貼り付けて、Enterキーを押下  
    （認証情報の取り扱いには十分に注意すること！）
11. RaspberryPi側で、**y**（Yes this is OK）を入力し、Enterキーを押下
12. ”Current remotes:”以降にOneDriveへの接続情報が表示されます。**q**（Quit config）を入力し、Enterキーを押下

Mac側とRaspberryPi側を行き来した為、手順がかなり複雑ですが、OneDriveへの接続先の登録が出来ました。

事前に、Mac側で認証情報を取得しておき、JSONだけどこかに残しておいても良いと思いますが、JSONの取り扱いには十分に注意しください。  

一連の流れは下記の様になります。

https://gist.github.com/kght6123/29f85cdbdd99880e84be1a0f425c65b6?file=10\_rclone\_new\_remote.sh

https://gist.github.com/kght6123/29f85cdbdd99880e84be1a0f425c65b6?file=11\_rclone\_authorize\_mac.sh

これで、アップロードする準備ができました。

OneDrive上にディレクトリを作成します。

rcloneの検証もかねて、rcloneコマンドでディレクトリを作成します。

https://gist.github.com/kght6123/29f85cdbdd99880e84be1a0f425c65b6?file=12\_rclone\_mkdir.sh

アップロードの検証とテスト実行を行います

コマンドのミスがあった場合、データが無慈悲に全消去される恐れもある為、検証時には”**\--dry-run”**オプションを必ず付与してください。

https://gist.github.com/kght6123/29f85cdbdd99880e84be1a0f425c65b6?file=13\_rclone\_test-run.sh

HDR撮影とタイムラプス動画作成、アップロードのClone設定を行います。

デフォルトのPATH変数も定義し、SSHログインした時と環境変数があまり変わらない様にします。

https://gist.github.com/kght6123/29f85cdbdd99880e84be1a0f425c65b6?file=14\_cron\_regist.sh

これで完了です。  
長々と、お付き合い頂きありがとうございます！！

Pythonのソースコード全体は、Gistに貼り付けました。

簡単に解説させていただくと、”**picapture.py”はpicameraモジュールを使って撮影するだけ**のプログラムで、

**”picapture\_hdr.py”は、撮影設定を変えて”picapture.py”を呼び出し、HDR合成とffmpegでタイムラプス動画作成を行う**プログラムです。  
  
**timelapse\_max\_time**（秒）または、**timelapse\_frame\_count**（撮影回数）を上限に、HDR合成とタイムラプス動画作成を行います。

撮影の設定は薄暗い部屋向けになっているので、ちょっとノイジーです。

https://gist.github.com/kght6123/29f85cdbdd99880e84be1a0f425c65b6?file=picapture.py

https://gist.github.com/kght6123/29f85cdbdd99880e84be1a0f425c65b6?file=picapture\_hdr.py

OneDriveの容量をそこそこ圧迫するので、定期削除とかしたいですが、容量が無くなるまではこんな感じで、、、、

定期削除の処理を作成し、cronの記述も追記しました。

削除は先にローカルのファイルを削除し、その後、rcloneでOneDrive上のファイルも削除します。

動画作成後に不要になったHDR合成したファイルの削除も兼ねています。（８／１９）

https://gist.github.com/kght6123/29f85cdbdd99880e84be1a0f425c65b6?file=delete\_file.py
