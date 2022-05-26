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

https://gist.github.com/kght6123/1355c75b8906d9c8778f288f7d8c7f2a?file=ip-search.sh

次にhostnameとhostsファイルを開いて、**ホスト名を`raspberrypi`から`pi3j`など、任意****のホスト名に置き換え**ます。

ホスト名は短くて区別がつく方が色々と便利なので、私はそうしてます。

https://gist.github.com/kght6123/1355c75b8906d9c8778f288f7d8c7f2a?file=change-hostname.sh

もう一度、SSHで接続して、**avahi-daemonをインストールし、起動**します。

https://gist.github.com/kght6123/1355c75b8906d9c8778f288f7d8c7f2a?file=install-avahi.sh

ってすると、次からこんな感じで、sshログインできます。

https://gist.github.com/kght6123/1355c75b8906d9c8778f288f7d8c7f2a?file=ssh-login-hostname.sh

Macには、**標準でマルチキャストDNS（Bonjour）がインストール**されており、

こんな感じの名前で、他の端末からアクセスできます。

（IP探す時に、**Bonjour使ってます**）

https://gist.github.com/kght6123/1355c75b8906d9c8778f288f7d8c7f2a?file=ssh-login-hostname-mac.sh

簡単です！

これで、めんどくさいIPとDNSから解放されます。
