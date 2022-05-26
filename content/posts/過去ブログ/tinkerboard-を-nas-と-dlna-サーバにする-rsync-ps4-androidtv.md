---
title: "#Tinkerboard を #NAS と #DLNA サーバにする #rsync #PS4 #AndroidTV"
date: "2018-07-24"
categories: 
  - "tinkerboard"
tags: 
  - "tinkerboard"
---

RaspberryPiより高速な有線LAN、USB、CPUを搭載しているTinkerboardで、

宅内にSamba・DLNAサーバを立ち上げて、重要なファイルとマルチメディアの配信と

Rsyncで外部ディスクにバックアップを行いました！

ついでに、PS4・AndroidTVで動画や写真、音楽の再生ができます。

## 1\. SwapとSyslogの無効化

SwapやSyslogが利用されていると、SDカードの寿命が短くなります。

ファイルサーバとして常時稼働するので無効にしました。

https://gist.github.com/kght6123/31af2a480559e0b70735fbcf13a7fac0?file=01\_disabled\_swap\_syslog.sh

## 2\. ホスト名を変更して、Avahiのインストール

気軽にホスト名で、SambaやSSHでアクセスしたいので、設定します。

https://gist.github.com/kght6123/31af2a480559e0b70735fbcf13a7fac0?file=02\_change\_hostname\_install\_avahi.sh

`ホスト名＋.local`で接続できるようになります。

`ssh linaro@tkb.local`

## 3\. ディスク初期化

Samba・DLNAとして公開する外部ディスクを、フォーマット（初期化）してマウントします。

USB経由で４つのディスクを接続しているので、それぞれに実行します。

https://gist.github.com/kght6123/31af2a480559e0b70735fbcf13a7fac0?file=03\_format\_mount\_disk.sh

## 4\. minidlnaのインストール＆設定

Android TVやPS4から写真や動画が見たいので、

DLNAをインストールして設定します。

バックアップに利用するdisk1と3には設定しません。

https://gist.github.com/kght6123/31af2a480559e0b70735fbcf13a7fac0?file=04\_install\_dlna.sh

https://gist.github.com/kght6123/31af2a480559e0b70735fbcf13a7fac0?file=minidlna

https://gist.github.com/kght6123/31af2a480559e0b70735fbcf13a7fac0?file=minidlna.conf

DLNAで設定したメディアフォルダを作成し、権限を付与します。

https://gist.github.com/kght6123/31af2a480559e0b70735fbcf13a7fac0?file=05\_mkdir\_chmod.sh

## 5\. Sambaのインストール＆設定

普通にインストールして設定します。

https://gist.github.com/kght6123/31af2a480559e0b70735fbcf13a7fac0?file=06\_install\_samba.sh

https://gist.github.com/kght6123/31af2a480559e0b70735fbcf13a7fac0?file=smb.conf

## 6\. cronにrsyncコマンドでバックアップ設定

ディスクが４台あるので、それぞれで同期して、深夜にバックアップします。

https://gist.github.com/kght6123/31af2a480559e0b70735fbcf13a7fac0?file=07\_backup\_rsync\_cron.sh

## 7\. 日時を合わせる

Sambaで作成したファイルの日時がズレていたので、日時を合わせました。

https://gist.github.com/kght6123/31af2a480559e0b70735fbcf13a7fac0?file=08\_timezone.sh

## 8\. 接続

Macから下記のような感じで、アクセスできます。

![](images/6a5e12bab63dfa08270030cb97be328c-1024x832.png)

### 2018/7/29 追記

Windows 10からSamba3で接続するには、Guest認証を有効（レジストリを修正）する必要があります。

レジストリを修正するので、慎重に作業してください。

1\. レジストリエディタを開いて、下記のパスのキー値を編集します。

`HKEY_LOCAL_MACHINE\SYSTEM\CurrentControlSet\Services\LanmanWorkstation\Parameters`

`AllowInsecureGuestAuth`の値を、０から１に修正してください。

2\. コマンドプロンプトを開いて、認証情報を保存します。

`net use z: \\tkb.local\share00 /USER:linaro "linaro"`

後は、エクスプローラのアドレスバーに`\\tkb.local`など入力すれば、

Sambaにアクセスできます。
