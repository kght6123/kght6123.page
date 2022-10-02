---
sortNo: 24
title: npm install ができなくても Tailwind CSS の全機能が使えるので、試してみた
description: '既存の静的サイトなどに、爆速の Tailwind CSS を導入したいと考えている方へ！'
eyecatchImage: ['/images/posts/8GjuBNnF.jpeg', 872, 533]
thumbnailImage: ['/images/posts/sm/8GjuBNnF.jpeg', 872, 533]
tags: ['CSS', 'Tailwind CSS']
---
Tailwind CSS v2.2.0 で、 Tailwind CLI が新しく導入されました。

その CLI ツールを使って、npm install ができない環境に Tailwind CSS （Just-in-Time Mode モード） を導入して、試しにダークモードの対応を行う方法をご紹介しようと思います。

## 環境

- macOS Big Sur
- Node.js v14.15.1
- Homebrew

## 利用したライブラリの紹介

### [Tailwind CSS](https://tailwindcss.com/) とは

ユーティリティ・ファーストの低レベルな CSS ライブラリです。

Bootstrap や Vuetify、 ElementUI の様に決まった UI ではなく
オリジナルの UI を爆速で作れます。

設定ファイルを変更することで、 Tailwind CSS のほぼ全てをカスタマイズできます。

### [Tailwind CLI](https://tailwindcss.com/docs/installation#using-tailwind-cli) とは

Tailwind CSS [v2.2.0](https://github.com/tailwindlabs/tailwindcss/releases/tag/v2.2.0#all-new-improved-tailwind-cli) から新たに追加されたツールです。

Tailwind CLI のビルド機能を利用することで、
プロジェクトに Tailwind CSS をインストールして設定しなくても Tailwind CSS をビルドして利用できる様にするツールです。

そのため npm install や yarn add ができないレガシーな環境でも、ビルドして利用できます。

また、今までの postcss コマンドよりパフォーマンスが最適化された Just-in-Time Mode モードも Tailwind CLI で利用できます。

## 前提条件

Tailwind CSS は v2.2.0 以降が必須です。

## 手順

### 1. Node.js のインストール

最初に npx コマンドを利用するために、Node.js をインストールします。

```sh
$ brew install node
```

### 2. Tailwind CSS の設定ファイルを作る

下記のコマンドを実行して、設定ファイルを作ります。

```sh
$ npx tailwindcss init
Need to install the following packages:
  tailwindcss
Ok to proceed? (y) y

Created Tailwind CSS config file: tailwind.config.js
```

コマンド実行後に npm グローバルに、Tailwind CSS がインストールされます。

### 3. Tailwind CSS の設定ファイルを修正

下記の 3 つの設定を変更しました

1. Just-in-Time Mode モードを正しく動かすための purge の設定
2. 今回利用する darkMode の有効化
3. 既存の CSS クラスと競合を防ぐため、class 名の先頭に tw- を追加

purge には、Tailwind CSS を利用する HTML や JS などを、ワイルドカードで指定します。

```js
// tailwind.config.js
module.exports = {
-  purge: [],
+  purge: ["./cms/**/*.html", "./files/**/*.html"], // (1.)
-  darkMode: false, // or 'media' or 'class'
+  darkMode: 'media', // or 'media' or false // (2.)
+  prefix: "tw-", // (3.)
  theme: {
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
```

### 4. Tailwind CSS をカスタマイズする為の tailwind.css ファイルの作成

Tailwind CSS に追加のクラスなどを追加するための、tailwind.css ファイルを作成します。

```css
/* tailwind.src.css */
/* @tailwind base; 今回は、ノーマライズ CSS が不要なので無効にする */
@tailwind components;
@tailwind utilities;
```

今回は、Tailwind CLI で生成する前のソースファイルであることがわかりやすいように、`src` をファイル名に付与しました。

### 5. Tailwind CLI で生成した CSS を読み込む script タグを追加する

読み込む CSS ファイルは生成したことがわかりやすいように、`dist` をファイル名に付与しました。

#### 5-1. 静的 HTML の場合

通常はこちら

```html
+
<!-- Tailwind CSS -->
+
<link
  rel="stylesheet"
  type="text/css"
  href="/ec/files/exfiles/tailwind.dist.css"
/>
```

#### 5-2. テンプレートエンジン（Thymeleaf）の場合

今回、試したシステムが Thymeleaf を使用していたため、一応、載せておきます。

```html
+
<!--/* Tailwind CSS */-->
+
<link
  rel="stylesheet"
  type="text/css"
  th:href="@{/files/exfiles/tailwind.dist.css}"
/>
```

### 6. HTML にダークモード用の記述を追加する

`dark:`の記述を Tailwind CSS の class の先頭に追加すると、OS やブラウザのテーマが「ダークテーマ」の時に有効なスタイルになります。

```html
-
<body>
  +
  <body class="dark:tw-bg-gray-800 dark:tw-text-gray-50"></body>
</body>
```

### 7. Tailwind CLI で CSS を生成する

下記のコマンドを実行して、 tailwind.dist.css を生成します。

```sh
# 開発用
npx tailwindcss -i ./tailwind.src.css -o ./files/exfiles/tailwind.dist.css --watch --jit
# 本番用
NODE_ENV=production npx tailwindcss -i ./tailwind.src.css -o ./files/exfiles/tailwind.dist.css --jit --minify
```

#### 7-1. 生成コマンドの詳細について

開発用も本番用も、`--jit` オプションによって Just-in-Time Mode モードが有効になり、使用されている Tailwind CSS のクラスのみ生成されます。

- 開発用のコマンドは、 tailwind.src.css や purge で指定した HTML を修正すると自動的に tailwind.dist.css が再生成される開発中向けのコマンドです。

- 本番用のコマンドは、 tailwind.dist.css を一度だけ作成し cssnano によって最小化します。

#### 7-2. 生成にかかる時間について

時間は、HTML のファイル数は 「21,473 個」 ある時、 Mac の負荷が高い時で 「50 秒」、低い時で 「6〜7 秒」 でした。

HTML の CSS 修正のみなら、数十〜数百ミリ秒で完了します。

#### 7-3. 生成された結果

下記の通り、最小限の CSS になっています 🎊

```css
/* @tailwind base; */

@media (prefers-color-scheme: dark) {
  .dark\:tw-bg-gray-800 {
    --tw-bg-opacity: 1;
    background-color: rgba(31, 41, 55, var(--tw-bg-opacity));
  }

  .dark\:tw-text-gray-50 {
    --tw-text-opacity: 1;
    color: rgba(249, 250, 251, var(--tw-text-opacity));
  }
}
```

## 試しに表示してみた結果

試しに body の背景色だけなので、完全ではないですが下記のようになりました。

もし、ちゃんと対応する場合は、 他の要素にも`dark:`で始まる Tailwind CSS のクラスや、 tailwind.css に記述したカスタムのクラスを指定することになると思います。

### システム環境設定で、テーマを「ライト」にしたとき

<amp-img src="/images/posts/toranoana_white.png" layout="intrinsic" width="1136" height="325" class="block"></amp-img>

### システム環境設定で、テーマを「ダーク」にしたとき

<amp-img src="/images/posts/toranoana_black.png" layout="intrinsic" width="1135" height="324" class="block"></amp-img>

## まとめ

Tailwind CLI を利用して、npm install ができない環境に Tailwind CSS （Just-in-Time Mode モード） を導入して、試しにダークモードの対応を行なってみました。

このほかにも Tailwind CSS の膨大なユーティリティをそのまま使えるようになるので、ユーティリティクラスの作成や、管理で悩む必要がかなり少なくなってくるため、導入するメリットがあると思います。

また、HTML のファイル数にしては、爆速でビルドが実行されて快適に開発が可能ですし、生成される CSS も最小限です。

ぜひ、一度、お試しください 🙏

最後まで読んでいただき、ありがとうございました。

## 参考文献

https://github.com/tailwindlabs/tailwindcss/releases/tag/v2.2.0

https://github.com/tailwindlabs/tailwindcss/releases/tag/v2.1.0