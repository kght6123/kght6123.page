---
title: "マルチキャストDNS（mDNS）の活用 #RaspberryPi #Avahi #Mac #Bonjour"
date: "2018-07-10"
categories: 
  - "mac"
  - "raspberrypi"
tags: 
  - "mac"
  - "mdns"
  - "raspberrypi"
---

IPアドレス、DNSサーバ管理を止めて、**マルチキャストDNS（mDNS）を使う**ようにしました。

毎回、RaspberryPiを増やす度に、192.168.0.xxは1号機とか、192.168.0.yyは2号機とか、

192.168.0.zzはTinkerboard、、、、非常にめんどくさくなりました。

さらに、最近、RaspberryPi3 Model B+も増えましたし、、、

毎回、Macアドレスを調べて、ルータのDNSサーバに設定するのもめんどくさい、、、、

RaspberryPiにDNSサーバ入れるのも、めんどくさい、、、

なので、半自動的にDNSっぽい動きをしてくれる、mDNSを活用してみる事にしました！

以下、設定の方法です。

まず、**Macでコマンドを実行してraspberrypiのIPを探します**

（別のraspberrypiがあると複数該当するので注意）

```sh
# 初期のraspberrypiホスト名のIPを検索
% dns-sd -q raspberrypi.local
DATE: ---Sat 16 Jun 2018---
15:19:44.773 ...STARTING...
Timestamp A/R Flags if Name Type Class Rdata
15:19:44.940 Add 2 12 raspberrypi.local. Addr IN 192.168.10.106

% rm ~/.ssh/known_hosts # 過去の認証ファイルを削除（稀に問題が出る）

# とりあえず、検索したIPまたはホスト名でログイン
% ssh pi@192.168.10.106 
```

次にhostnameとhostsファイルを開いて、**ホスト名を`raspberrypi`から`pi3j`など、任意****のホスト名に置き換え**ます。

ホスト名は短くて区別がつく方が色々と便利なので、私はそうしてます。

```sh
$ sudo vi /etc/hostname # raspberrypi から 任意のホスト名に変更
$ sudo vi /etc/hosts # raspberrypi から 任意のホスト名に変更
$ sudo reboot # 再起動
```

もう一度、SSHで接続して、**avahi-daemonをインストールし、起動**します。

```sh
# 必要モジュールのインストール
$ sudo apt-get install git make g++
$ sudo apt-get install libavahi-compat-libdnssd-dev
$ sudo apt-get install avahi-daemon avahi-discover libnss-mdns

# avahiのインストール
$ sudo service dbus start
$ sudo service avahi-daemon start
```

ってすると、次からこんな感じで、sshログインできます。

```sh
% hostname # 事前にMacのホスト名を調べる
macbook.local

# 他の端末からMacへSSH
$ ssh kght@macbook.local
```

Macには、**標準でマルチキャストDNS（Bonjour）がインストール**されており、

こんな感じの名前で、他の端末からアクセスできます。

（IP探す時に、**Bonjour使ってます**）

```sh
% ssh pi@pi3j.local # 末尾に.localをつける
```

簡単です！

これで、めんどくさいIPとDNSから解放されます。
