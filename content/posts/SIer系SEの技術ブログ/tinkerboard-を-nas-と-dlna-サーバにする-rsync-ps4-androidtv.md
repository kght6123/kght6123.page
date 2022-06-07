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

```sh
# 01_disabled_swap_syslog.sh
## Swap無効
sudo swapoff --all
sudo apt-get purge -y --auto-remove dphys-swapfile # 失敗した場合はもう一度
sudo rm -rf /var/swap
free -mh

#              total        used        free      shared  buff/cache   available
#Mem:           976M         29M        779M         12M        167M        884M
#Swap:            0B          0B          0B

## Syslog無効
sudo vi /etc/rsyslog.conf

# #### RULES #### 以下で，必要のないログ設定をコメントアウト
```

## 2\. ホスト名を変更して、Avahiのインストール

気軽にホスト名で、SambaやSSHでアクセスしたいので、設定します。

```sh
# 02_change_hostname_install_avahi.sh
# host名の変更
sudo vi /etc/hostname # tinkerboard -> tkbにする
sudo vi /etc/hosts # tinkerboard -> tkbにする
sudo reboot # 再起動

# avahi-daemonのインストールと起動
sudo apt-get install libavahi-compat-libdnssd-dev
sudo apt-get install avahi-daemon avahi-discover libnss-mdns
sudo service dbus start
sudo service avahi-daemon start
```

`ホスト名＋.local`で接続できるようになります。

`ssh linaro@tkb.local`

## 3\. ディスク初期化

Samba・DLNAとして公開する外部ディスクを、フォーマット（初期化）してマウントします。

USB経由で４つのディスクを接続しているので、それぞれに実行します。

```sh
# 03_format_mount_disk.sh
# フォーマット
sudo mkfs -t ext4 /dev/sda \
&& sudo mkfs -t ext4 /dev/sdb \
&& sudo mkfs -t ext4 /dev/sdc \
&& sudo mkfs -t ext4 /dev/sdd

# マウントポイント作成
sudo mkdir /mnt/diskbox0 \
&& sudo mkdir /mnt/diskbox0/disk0 \
&& sudo mkdir /mnt/diskbox0/disk1 \
&& sudo mkdir /mnt/diskbox0/disk2 \
&& sudo mkdir /mnt/diskbox0/disk3

# マウント
sudo mount -t ext4 -o defaults /dev/sda /mnt/diskbox0/disk0 \
&& sudo mount -t ext4 -o defaults /dev/sdb /mnt/diskbox0/disk1 \
&& sudo mount -t ext4 -o defaults /dev/sdc /mnt/diskbox0/disk2 \
&& sudo mount -t ext4 -o defaults /dev/sdd /mnt/diskbox0/disk3 \
&& df -h

# アンマウント（取り外す時に実行）
sudo umount /mnt/diskbox0/disk0 \
&& sudo umount /mnt/diskbox0/disk1 \
&& sudo umount /mnt/diskbox0/disk2 \
&& sudo umount /mnt/diskbox0/disk3
```

## 4\. minidlnaのインストール＆設定

Android TVやPS4から写真や動画が見たいので、

DLNAをインストールして設定します。

バックアップに利用するdisk1と3には設定しません。

```sh
# 04_install_dlna.sh
# インストール
sudo apt-get install -y minidlna

# ユーザ、設定ファイルのパスを変更
sudo nano /etc/default/minidlna
# DLNAの設定を変更
sudo nano /etc/minidlna.conf

# サービスを再起動
sudo systemctl restart minidlna
```

minidlnaの変更例
```
CONFIGFILE="/etc/minidlna.conf"
USER="root"
```

minidlna.confの変更例
```
user=root
media_dir=A,/mnt/diskbox0/disk0/music
media_dir=P,/mnt/diskbox0/disk2/picture
media_dir=V,/mnt/diskbox0/disk0/video
media_dir=PV,/mnt/diskbox0/disk2/camera
db_dir=/tmp/minidlna
friendly_name=linaro
inotify=yes
# サイズが大きいJPEGをサーバ側でダウンスケーリングしない（strict_dlna=no）
strict_dlna=no
# シンボリックリンクを無効
wide_links=no
```

DLNAで設定したメディアフォルダーを作成し、権限を付与します。

```sh
# 05_mkdir_chmod.sh
# ディレクトリ作成＆権限付与
sudo mkdir /mnt/diskbox0/disk0/music \
 && sudo mkdir /mnt/diskbox0/disk2/picture \
 && sudo mkdir /mnt/diskbox0/disk0/video \
 && sudo mkdir /mnt/diskbox0/disk2/camera
 && sudo chmod -R 777 /mnt/diskbox0/disk0 \
 && sudo chmod -R 777 /mnt/diskbox0/disk1 \
 && sudo chmod -R 777 /mnt/diskbox0/disk2 \
 && sudo chmod -R 777 /mnt/diskbox0/disk3 \
 && sudo chown -R linaro:linaro /mnt/diskbox0/disk0 \
 && sudo chown -R linaro:linaro /mnt/diskbox0/disk1 \
 && sudo chown -R linaro:linaro /mnt/diskbox0/disk2 \
 && sudo chown -R linaro:linaro /mnt/diskbox0/disk3
```

## 5\. Sambaのインストール＆設定

普通にインストールして設定します。

```sh
# 06_install_samba.sh
# インストール
sudo apt-get install -y samba

# 起動
sudo smbd -V

# Version 4.5.12-Debian

# 設定変更
sudo vi /etc/samba/smb.conf

# 再起動
sudo systemctl restart smbd
```

```conf
# /etc/samba/smb.conf
[global]
   dos charset = CP932
   unix charset = UTF-8
   guest account = pi
	 min protocol = SMB2
	 
[share00]
  comment = DiskBox0
  path = /mnt/diskbox0/disk0
  read only = no
  browsable = yes
  writable = yes
  guest ok = yes
  guest only = no
  create mask = 0777
  force create mode = 0777
  force directory mode = 0777

[share01]
  comment = DiskBox1
  path = /mnt/diskbox0/disk1
  read only = no
  browsable = yes
  writable = yes
  guest ok = yes
  guest only = no
  create mask = 0777
  force create mode = 0777
  force directory mode = 0777

[share10]
  comment = DiskBox2
  path = /mnt/diskbox0/disk2
  read only = no
  browsable = yes
  writable = yes
  guest ok = yes
  guest only = no
  create mask = 0777
  force create mode = 0777
  force directory mode = 0777

[share11]
  comment = DiskBox3
  path = /mnt/diskbox0/disk3
  read only = no
  browsable = yes
  writable = yes
  guest ok = yes
  guest only = no
  create mask = 0777
  force create mode = 0777
  force directory mode = 0777
```

## 6\. cronにrsyncコマンドでバックアップ設定

ディスクが４台あるので、それぞれで同期して、深夜にバックアップします。

```sh
# 07_backup_rsync_cron.sh
# rsync＆cronのインストール
sudo apt-get update
sudo apt-get install cron
sudo apt-get install rsync

# バックアップのテスト
rsync -avu --stats --backup --suffix=`date +%Y%m%d` /mnt/diskbox0/disk0/ /mnt/diskbox0/disk1/
rsync -avu --stats --backup --suffix=`date +%Y%m%d` /mnt/diskbox0/disk2/ /mnt/diskbox0/disk3/

# cron定義を編集
crontab -e

# SHELLはデフォルトの/bin/bashにする
# PATHには、"echo $PATH"した結果を入れる
SHELL=/bin/bash
PATH=/usr/local/bin:/usr/bin:/bin:/usr/local/games:/usr/games
# Example of job definition:
# .---------------- minute (0 - 59)
# |  .------------- hour (0 - 23)
# |  |  .---------- day of month (1 - 31)
# |  |  |  .------- month (1 - 12) OR jan,feb,mar,apr ...
# |  |  |  |  .---- day of week (0 - 6) (Sunday=0 or 7) OR sun,mon,tue,wed,thu,fri,sat
# |  |  |  |  |
# *  *  *  *  * user-name command to be executed
  *  *  *  *  * env > /tmp/env.log
  0  2  *  *  1 rsync -avu --stats --backup --suffix=`date +%Y%m%d` /mnt/diskbox0/disk0/ /mnt/diskbox0/disk1/
  0  4  *  *  1 rsync -avu --stats --backup --suffix=`date +%Y%m%d` /mnt/diskbox0/disk2/ /mnt/diskbox0/disk3/

# cron定義を確認
crontab -l
```

## 7\. 日時を合わせる

Sambaで作成したファイルの日時がズレていたので、日時を合わせました。

```sh
# 08_timezone.sh
# タイムゾーンを設定
sudo timedatectl set-timezone Asia/Tokyo

# 現在時刻を表示
date
# Mon Jul  9 22:13:20 JST 2018

# 再起動
sudo shutdown -h now
```

## 8\. 接続

Macから下記のような感じで、アクセスできます。

<amp-img src="/images/posts/sier-se/6a5e12bab63dfa08270030cb97be328c-1024x832.png" layout="intrinsic" width="2511" height="1137" class="block"></amp-img>

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
