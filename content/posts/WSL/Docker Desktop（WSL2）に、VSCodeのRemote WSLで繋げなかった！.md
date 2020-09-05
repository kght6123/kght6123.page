---
sortNo: 6
title: 'Docker Desktop（WSL2）に、VSCodeのRemote WSLで繋げなかった！'
description: 'Remote WSLが対応してない？直近、Alpine上のDocker使うため困ってないので放置中'
eyecatchImage: ['/images/posts/remote-wsl-and-wsl2-and-docker-desktop.jpg',800,533]
thumbnailImage: ['/images/posts/remote-wsl-and-wsl2-and-docker-desktop.jpg',800,533]
tags: ['Windows', 'WSL', 'Linux', 'WSL2', 'Remote WSL', 'Docker Desktop', 'Alpine Linux']
---

おそらく、Remote WSLがDocker Desktopに対応してない？バグ？(2020/06/04現在)があるみたい

代替案として、UbuntuやAlpine Linuxを使う方法も含めて紹介します。

## Docker Desktopの仮想マシン（WSL2）に、Remote WSLでつなぐ

1. Insider Previewにアップデート。

 - Windows10の設定の更新とセキュリティのWindows Insider Programを有効化して、Windows Updateを行う。

（この時はBuild 19635にアップデートされた）

2. WSL2を有効化

 - PowerShellを開いて、下記のコマンドを打つ

```bat
dism.exe /online /enable-feature /featurename:Microsoft-Windows-Subsystem-Linux /all /norestart
dism.exe /online /enable-feature /featurename:VirtualMachinePlatform /all /norestart
wsl --set-default-version 2
```

3. Docker Desktopをインストール

 - 通知領域のDocker DesktopのSettingsの「GeneralのUse the WSL2 based Engine」と「ResourcesのWSL Integration」を有効にする

4. VSCode Insidersをインストール、Remote WSL拡張機能をインストール

5. VSCodeの左下の緑色の＞＜をクリックして、「Remote-WSL：New Window」をクリック

6. 新しいVSCodeが開く

 - Docker Desktopにつながった、新しいVSCodeが開くはずだった！けこ、下記のエラーが発生する。

```sh
[2020-06-04 12:53:03.031] /root/.vscode-server-insiders/bin/595d2b9b916d063aadfc2c1a8c8f6df5b45572a8/server.sh: line 12: /root/.vscode-server-insiders/bin/595d2b9b916d063aadfc2c1a8c8f6df5b45572a8/node: not found
[2020-06-04 12:53:03.033] VS Code Server for WSL closed unexpectedly.
[2020-06-04 12:53:03.033] For help with startup problems, go to
[2020-06-04 12:53:03.033] https://code.visualstudio.com/docs/remote/troubleshooting#_wsl-tips
[2020-06-04 12:53:07.756] WSL Daemon exited with code 0
```

VSCodeをアップデートしたり、Docker Desktopを再起動や再インストールしたけどうまくいかず。

## WSL2のUbuntuを入れて、Remote WSLでつなぐ（Ubuntu内のDockerは、Docker DesktopのWSL Integrationを使う）

先にストアからUbuntuをインストールして、起動して、初期設定をしておく

（起動しないときは、https://aka.ms/wsl2kernel のカーネルのアップデートを試してみる！）

通知領域のDocker DesktopのSettingsの「ResourcesのWSL Integration」の「Ubuntu」を有効にする

下記のコマンドでVSCodeをWSL2のubuntuにつないだ状態で起動する

```bat
wsl -d ubuntu code-insiders .
```

お好みで、ubuntuをWSL2のデフォルトに変更する

```bat
rem wslのリストを表示する
wsl --list
rem ubuntuをWSL2のデフォルトに変更する
wsl -s ubuntu
rem VSCodeをWSL2のデフォルトにつないだ状態で起動する
wsl code-insiders .
```

Windows側にアクセスするのは、WSL1より遅いから、Linuxのディスク上にプロジェクトをつくること
（Windowsに置くと`yarn install`に12分近くかかって、びっくりする）

vmmem.exeがメモリをめちゃくちゃ食い始めた場合は.wslconfigをWindowsのユーザディレクトリの配下につくる

```ini
[wsl2]
memory=3GB
swap=0
```

WSL2を再起動する

```bat
wsl -l
wsl -t ubuntu
wsl -t docker-desktop
wsl -t docker-desktop-data
```

## Alpine WSLをWSL2に変換して、Remote WSLでつなぐ（同じくWSL Integrationを使う）

Alpine Linuxを使うとWSL2のリソースが抑えられそうなので、Storeからダウンロードして試しに使ってみる

```sh
# Microsoft Storeから「Alpine WSL」をダウンロードする。起動してデフォルトユーザと、ルート兼デフォルトユーザのパスワードを設定する！
wsl -l -v # WSLのリストを表示
wsl --set-version Alpine 2 # WSL2に変換
wsl -l -v # WSL2に変換を確認
wsl -s Alpine # WSLのデフォルトを「Alpine Linux」にする
wsl # WSL起動
su - # 「Alpine Linux」にrootでログインする
apk update && apk add libstdc++ && apk add openrc docker docker-compose # 必要パッケージのインストール
# あとは、Docker Desktopの設定の「ResourcesのWSL Integration」と「Alpine」を有効にして
# VSCodeのRemoteWSLから普通につなげるだけ！
```

## 【メモ】WSLの停止と開始（WSLの再起動）

メモリが8GBしかないマシンで、WSL使いつつ、メモリをたくさん使うアプリを開くとWindowsが不安定になるので、
サービスをあらかじめ停止しておく

```bat
net stop LxssManager # サービスを停止
wsl -l -v # 停止を確認
wsl -t Alpine # 起動してたら停止
net start LxssManager # サービスを起動
```
