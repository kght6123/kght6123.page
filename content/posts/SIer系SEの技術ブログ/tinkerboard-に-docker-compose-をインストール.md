---
title: "#Tinkerboard に #docker-compose をインストール"
date: "2018-07-23"
categories: 
  - "docker"
  - "raspberrypi"
  - "tinkerboard"
tags: 
  - "docker"
  - "raspberrypi"
  - "tinkerboard"
---

TinkerboardでDokcerをインストールした時に

いつも使っているdocker-composeが使えたら便利だなと思い

インストールを試みましたが、少し苦労したので備忘録です。

Githubからソースコードをチェックアウトし、docker上でビルドします。

```sh
# 今回の作業ディレクトリ作成
mkdir work;cd work

# ソースコードの取得
git clone https://github.com/docker/compose.git;cd compose;git checkout release

# dockerビルド
sudo docker build -t docker-compose:armhf -f Dockerfile.armhf .

# docker起動
sudo docker run --rm --entrypoint="script/build/linux-entrypoint" -v $(pwd)/dist:/code/dist -v $(pwd)/.git:/code/.git "docker-compose:armhf"

# dockerから実行ファイルをコピー
sudo cp dist/docker-compose-Linux-armv7l /usr/local/bin/docker-compose

# オーナー設定
sudo chown root:root /usr/local/bin/docker-compose
# 実行の権限付与
sudo chmod 0755 /usr/local/bin/docker-compose

# バージョン確認
docker-compose version

# docker-compose version 1.22.0, build e20d808
# docker-py version: 3.4.1
# CPython version: 3.6.4
# OpenSSL version: OpenSSL 1.0.1t  3 May 2016

# bashのオートコンプリートを有効に
sudo curl -L https://raw.githubusercontent.com/docker/compose/$(docker-compose version --short)/contrib/completion/bash/docker-compose -o /etc/bash_completion.d/docker-compose

# 即時に適用
source ~/.bashrc
```

docker-compose.ymlを作って起動します。

下記はARM向けのイメージではないので、起動しません。

公式のイメージは対応しているものが多いらしいです。残年。

```sh
# 作業ディレクトリの作成
mkdir -p ~/docker/che;cd ~/docker/che

# docker-compose.ymlの作成
# ヒアドキュメントを利用、''で囲んで変数を解釈しない
cat << 'EOS' > docker-compose.yml
version: '3'
services:
  che:
    image: eclipse/che-server:latest
    ports:
      - 10000:9500
#    restart: always
    volumes:
      - /var/run/docker.sock:/var/run/docker.sock
      - ~/docker/che/data:/data
    environment:
      - CHE_HOST=tkb.local
      - CHE_PORT=9500
    container_name: che
EOS

# データフォルダの作成
mkdir ./data

# dockerユーザ作ると、下記のsudoは不要。
# 初回はダウンロードがあるので、少し時間かかる

# ビルド
sudo docker-compose build

# Up
sudo docker-compose up -d

# Down
sudo docker-compose down

# ログを確認
sudo docker logs che
 # standard_init_linux.go:190: exec user process caused "exec format error"

## ARMのイメージではないと思われるエラー
```
