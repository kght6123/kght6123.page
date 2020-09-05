---
sortNo: 5
title: WSLでrootのパスワード忘れたとき
description: 'WSLでrootのパスワード忘れたときに、再設定するためのコマンドをしょうかいします！'
eyecatchImage: ['/images/posts/lost-root-password-for-wsl.jpg',799,534]
thumbnailImage: ['/images/posts/lost-root-password-for-wsl.jpg',799,534]
tags: ['Windows', 'WSL', 'Linux']
---

こんな感じ

```ps
PS> wsl -u root -d Alpine
```

```sh
$ passwd                # rootのパスワードを変更
$ passwd [WSLのユーザ名] # 指定ユーザのパスワードを変更
```
