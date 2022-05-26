---
title: "avahi-daemonのIPv4の警告を消す #mDNS #RaspberryPi #Tinkerboard"
date: "2018-07-25"
categories: 
  - "homebridge"
  - "raspberrypi"
  - "tinkerboard"
tags: 
  - "homebridge"
  - "raspberrypi"
  - "tinkerboard"
---

我が家では、ホスト名を設定するのがめんどくさいので、mDNSを多用してますが、

avahiのステータスを見るコマンドを知って

HomebridgeをインストールしているRaspberryPiでステータスを確認して見ましたが、

見覚えのない警告が出力されてました。

`$ sudo service avahi-daemon status # avahiのステータスを見る`

`Jul 25 12:59:29 pi3j avahi-daemon[29347]: *** WARNING: Detected another IPv4 mDNS stack running on this host. This makes mDNS unreliable and is thus not recommended. ***`

なんか、別のIPv4 mDNSスタックがいるそうです、、、デフォルトで入ってるんですか・・・？？

Tinkerboardではこの警告、出てないんです。

とりあえず、デフォルトで入っているmDNSの正体が不明なので、

avahiのIPv4を無効にします。

`sudo vi /etc/avahi/avahi-daemon.conf`

`# use-ipv4=yes` ↓ `# use-ipv4=no`

一応、警告は出なくなりました。

デフォルトで入っているものの正体がわかったら、また記事にします。。。

[参考](https://linux.die.net/man/5/avahi-daemon.conf)
