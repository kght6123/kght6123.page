---
title: "RaspberryPiのmDNS(avahi-daemon)のIPv4が無効になってた"
date: "2018-10-07"
categories: 
  - "mac"
  - "raspberrypi"
tags: 
  - "avahi"
  - "ipv4"
  - "ipv6"
  - "macos"
  - "mdns"
  - "raspberrypi"
---

ルータをASUSからAirMacに変更したところ、mDNS名で接続できなくなった。

同時に有線LANから、無線LANに接続方法を変更したが、あまり関係ない気がする。

（ASUSのルータは早々に売ったので、詳細は確認不可）

最近、インストールしたRaspberryPi3 B+は大丈夫だったので、

avahiのバージョンか初期設定の問題があるかもしれない。

とりあえず、avahiの設定でIPv4を有効にしたら解決したのですが、

そこに辿り着くまでの試行錯誤の記録です。

最初は、とりあえずSSH接続したいので、Macで下記のコマンドを実行して、

IPを探そうとしました。

```
% arp -a

? (192.168.10.4) at 0:25:dc:5a:9:78 on en0 ifscope [ethernet]

% nslookup 192.168.10.4
Server:		240b:251:d660:6f10:1e36:bbff:fe03:6da9
Address:	240b:251:d660:6f10:1e36:bbff:fe03:6da9#53

** server can't find 4.10.168.192.in-addr.arpa: NXDOMAIN
```

nslookupでホスト名が取得できず、何れがRaspberryPiかわからない

（DNSサーバに登録されてないから、、、、ホスト名は取得不可）

仕方ないので、AirMacユーティリティで対象のルータを右クリックし、

ワイヤレスクライアントから対象のRaspberryPiを探し、

マウスカーソルを合わせて接続されているホスト名とIPを確認する

IPは分かったので、IPでSSHアクセス

avahiの動作を中心に疑ってみる

## RaspberryPiのavahiで登録情報の確認

```
$ sudo apt-get -y install avahi-utils
$ avahi-browse -at # mDNS一覧表示

# 対象のRaspberryPiが一覧にない

$ avahi-resolve -n pi3j.local
pi3j.local	240b:251:d660:6f10:eb9b:d106:f4ef:98dd
```

avahiの登録情報が、Ipv6になってる？？

- あとで分かったが、これは正常。（"-4"オプションをつけないと、IPv6優先）
- IPv6のみ有効になっている考察は合っていた。

次は、IPv6での接続確認を行なった

### Macのping6でIPv6接続を確認

```
~% ping6 pi3j.local           
240b:251:d660:6f10:eb9b:d106:f4ef:98dd, icmp_seq=3 hlim=64 time=5.850 ms
^C
--- pi3j.local ping6 statistics ---
4 packets transmitted, 4 packets received, 0.0% packet loss
round-trip min/avg/max/std-dev = 5.850/7.028/8.428/1.023 ms
# Ping6はOK

~% ping pi3j.local       
ping: cannot resolve pi3j.local: Unknown host
# PingはNG
```

avahiのIPv4が有効になってない？かもしれない。

有効になっているか、確認する。

### RaspberryPiでIPv4が有効か確認

```
$ avahi-resolve -n -4 pi3p.local
Failed to resolve host name 'pi3p.local': Timeout reached
```

IPv4はNG。

他の正常なRaspberryPiへの接続も、このRaspberryPiからのIPv4接続は、NG。

このRaspberryPiのIPv4設定が怪しい。

### MacのmDNS情報もIPv4が有効か確認

```
~% dns-sd -q pi3j.local
DATE: ---Sun 07 Oct 2018---
14:30:45.395  ...STARTING...
^C
# IPv4 NG (dns-sdはIPv4が優先)

~% dns-sd -G v4v6 pi3j.local      
DATE: ---Sun 07 Oct 2018---
20:11:16.614  ...STARTING...
Timestamp     A/R    Flags if Hostname                               Address                                      TTL
20:11:16.884  Add        2  8 pi3j.local.                            240B:0251:D660:6F10:EB9B:D106:F4EF:98DD%<0>  120
^C
# IPv4 NG, IPv6 OK
```

dns-sdもIPv4だけNG、IPv6はOK

やっぱり、RaspberryPiのAvahiのIPv4設定が怪しい。

### RaspberryPiのavahi-daemonのIPv4を有効にする

```
# 設定ファイルを編集
$ sudo vi /etc/avahi/avahi-daemon.conf

# 変更前
use-ipv4=no
use-ipv6=yes

# 変更後（use-ipv4 を yes に変える）
use-ipv4=yes
use-ipv6=yes

# 再起動＆リロード
$ sudo service avahi-daemon restart
$ sudo service avahi-daemon force-reload
```

use-ipv4がnoになっていた。

（いつ変えた？？どこで変わった？？）

覚えてないので詳細は不明、、、、、気を取り直して、動作確認する。

### MacのmDNS情報を確認

```
~% dns-sd -G v4v6 pi3j.local
DATE: ---Sun 07 Oct 2018---
22:30:50.100  ...STARTING...
Timestamp     A/R    Flags if Hostname                               Address                                      TTL
22:30:50.101  Add        3  8 pi3j.local.                            240B:0251:D660:6F10:EB9B:D106:F4EF:98DD%<0>  120
22:30:50.101  Add        2  8 pi3j.local.                            192.168.10.21                                120
^C
# IPv4,v6 OK

~% ssh pi@pi3j.local   
pi@pi3j.local password:

# mDNSでSSH接続が可能になった
```

IPv4もOKになり、SSH接続も可能になった。

疲れた。。。
