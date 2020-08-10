---
title: WSLでrootのパスワード忘れたとき
description: 'WSLでrootのパスワード忘れたときに、再設定するためのコマンドをしょうかいします！'
eyecatchImageUrl: https://www.pakutaso.com/shared/img/thumb/paku1181702_TP_V4.jpg
thumbnailImageUrl: https://www.pakutaso.com/shared/img/thumb/paku1181702_TP_V4.jpg
---

こんな感じ

```ps
PS> wsl -u root -d Alpine
```

```sh
$ passwd                # rootのパスワードを変更
$ passwd [WSLのユーザ名] # 指定ユーザのパスワードを変更
```
