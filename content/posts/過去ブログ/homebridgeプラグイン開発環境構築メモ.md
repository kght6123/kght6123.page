---
title: "Homebridgeプラグイン開発環境構築メモ"
date: "2018-02-05"
categories: 
  - "it系"
tags: 
  - "homebridge"
  - "mac"
  - "nodejs"
  - "vscode"
---

Homebridgeのプラグインを作成するために、開発環境を構築した時のメモです。 Macにhomebridgeをインストールし、VSCode-InsidersをIDEとして使います。

プラグインのプログラム手法に関しては別途、公開予定ですが、 この時に作成したプラグインは下記のGitHubに公開しているので、参考にしてみてください。

- [kght6123/homebridge-temper](https://github.com/kght6123/homebridge-temper)

## 環境設定

### Macにデバッグ用にhomebridgeをグローバルにインストール

```
$ sudo npm install -g --unsafe-perm homebridge
$ homebridge # 起動確認、Ctrl+Cで停止
$ mkdir ~/.homebridge; cd ~/.homebridge
$ curl -L -o ~/.homebridge/config.json https://raw.githubusercontent.com/nfarina/homebridge/master/config-sample.json
$ cp config.json config.json.org; code-insiders config.json
# usernameを修正（英小文字は英大文字にする）、MACアドレスの形式なのでMacのWiFiのアドレスを入力するが、被らなければ良い。
# accessoriesとplatformsの中身は空に
$ homebridge # 再度、起動確認
```

### homebridgeの開発・デバッグ用設定を作成

```
$ cp -R .homebridge .homebridge-dev # 既存設定をコピー
$ cd .homebridge-dev; rm -R accessories; rm -R persist # 前回起動時のキャッシュを削除
$ code-insiders config.json # username,port番号を変更、開発したPluginの設定を追加
$ homebridge -D -U ~/.homebridge-dev -P ~/develop/nodejs/homebridge-sample/ # 開発用に起動する時のコマンド例、-Uは設定、-Pは読み込むPluginフォルダ指定
```

## プラグインプロジェクト作成

プラグインプロジェクトのフォルダを作成

```
$ mkdir ~/develop/nodejs/homebridge-temper; cd ~/develop/nodejs/homebridge-temper
$ typings init # 型定義一覧を初期化
$ typings install dt~node --global --save # nodeの型定義を追加

# 型定義をGithubからインストール（正常）、homebridgeの基礎となるライブラリの型定義。型定義はhomebrideとだいたい同じ。
$ typings install github:KhaosT/HAP-NodeJS/index.d.ts --global --save # hap-nodesの型定義を追加

```

## VSCodeのデバッグ設定

### jsconfig.json修正

プロジェクトフォルダのjsconfig.jsonに、allowSyntheticDefaultImportsをtrueで追加

```
{
    "compilerOptions": {
        "target": "es6",
        "module": "commonjs",
        "allowSyntheticDefaultImports": true
    }
}
```

### homebridge設定のconfig.jsonをデバッグ用にコピー

```
$ mkdir config; cp ~/.homebridge-dev/config.json config/config.json
$ code-insiders config/config.json # homebridge用のデバッグ設定追加
```

### プロジェクトフォルダの.vscode/launch.jsonを下記の様に修正

```
{
    "version": "0.2.0",
    "configurations": [
        {
            "type": "node",
            "request": "launch",
            "name": "Launch Program",
            "program": "homebridge",
            "stopOnEntry": false,
            "args": [
                "-D",
                "-P",
                "${workspaceRoot}",
                "-U",
                "${workspaceRoot}/config"
            ],
            "cwd": "${workspaceRoot}",
            "preLaunchTask": null,
            "runtimeExecutable": null,
            "runtimeArgs": [
                "--nolazy"
            ],
            "env": {
                "NODE_ENV": "development"
            },
            "console": "internalConsole",
            "sourceMaps": false,
            "outFiles": []
        },
        {
            "name": "Attach",
            "type": "node",
            "request": "attach",
            "port": 5858,
            "address": "localhost",
            "restart": false,
            "sourceMaps": false,
            "outFiles": [],
            "localRoot": "${workspaceRoot}",
            "remoteRoot": null
        },
        {
            "name": "Attach to Process",
            "type": "node",
            "request": "attach",
            "processId": "${command:PickProcess}",
            "port": 5858,
            "sourceMaps": false,
            "outFiles": []
        }
    ]
}
```
