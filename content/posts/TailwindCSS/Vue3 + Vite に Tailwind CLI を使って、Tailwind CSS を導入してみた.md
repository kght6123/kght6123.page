---
sortNo: 23
title: Vue3 + Vite に Tailwind CLI を使って、Tailwind CSS を導入してみた
description: 'Vue3 に、爆速の Tailwind CSS を導入したいと考えている方へ！'
eyecatchImage: ['/images/posts/tailwindcss-logo.png', 872, 533]
thumbnailImage: ['/images/posts/sm/tailwindcss-logo.png', 872, 533]
tags: ['CSS', 'Tailwind CSS', 'Vue3', 'Vite']
---
Tailwind CSS v2.2.0 で、 Tailwind CLI が新しく導入されました。

その CLI ツールを使って、Vue3 ＋ Vite の環境に Tailwind CSS （JIT モード） を導入する部分をご紹介しようと思います。

## 環境

- macOS Big Sur
- Node.js v14.15.1

## 利用したライブラリの紹介

### [Tailwind CSS](https://tailwindcss.com/) とは

ユーティリティ・ファーストの低レベルな CSS ライブラリです。

Bootstrap や Vuetify、ElementUI の様に決まった UI ではなく
オリジナルの UI を爆速で作れます。

設定ファイルを変更することで、 Tailwind CSS のほぼ全てをカスタマイズできます。

### [Tailwind CLI](https://tailwindcss.com/docs/installation#using-tailwind-cli) とは

Tailwind CSS [v2.2.0](https://github.com/tailwindlabs/tailwindcss/releases/tag/v2.2.0#all-new-improved-tailwind-cli) から新たに追加されたツールです。

Tailwind CLI のビルド機能を利用することで、
プロジェクトに Tailwind.css をインストールして設定しなくても Tailwind.css をビルドして利用できます。

また、今までの postcss コマンドよりパフォーマンスが最適化された JIT モードを利用できます。

## 前提条件

Tailwind CSS は v2.2.0 以降が必要です。

## 注意事項

- vite には postcss が組み込まれています。
  - postcss.config.js に tailwindcss が 含まれている場合、 vite の postcss も tailwindcss をビルドしてしまい、2 重ビルドになるため注意！してください。

## 1. Vue3 + Vite のインストール

```sh
$ npm init @vitejs/app sample-application
✔ *Select a framework:* › vue
✔ *Select a variant:* › vue
$ cd sample-application
$ npm install
```

## 2. Tailwind CSS のインストール

```sh
$ npm install -D tailwindcss@latest postcss@latest autoprefixer@latest
```

## 3. npm-run-all のインストール

```sh
$ npm install -D npm-run-all
```

## 4. Tailwind CSS に必要なファイルを作成し、修正する

### 4-1. tailwind.config.js を作成します

```sh
$ npx tailwindcss init
```

### 4-2. tailwind.config.js のモードとパージの設定を変更します

```js
// tailwind.config.js
+ mode: 'jit',
- purge: [],
+ purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
```

### 4-3. Taiwind CSS をカスタマイズするための tailwind.css を新しく作成します

```css
/* src/assets/css/tailwind.css */
@tailwind base;
@tailwind components;
@tailwind utilities;
```

### 4-4. Tailwind CLI で生成した tailwind.dist.css を読み込む import を追加します

```js
// src/main.js
+ import "./tailwind.dist.css";
```

### 4-5. Tailwind CLI を実行する scripts に書き換えます

npm-run-all を利用して、 dev: で始まる全ての scripts を並列で実行します。

```json
// package.json
"scripts": {
  "dev": "npm-run-all --parallel dev:*",
  "dev:server": "vite",
  "dev:css": "tailwindcss -i src/assets/css/tailwind.css -o src/tailwind.dist.css -w",
  "build": "tailwindcss -i src/assets/css/tailwind.css -o src/tailwind.dist.css && vite build",
  "build:prod": "NODE_ENV=production npx tailwindcss -i src/
assets/css/tailwind.css -o src/tailwind.dist.css --minify &&
vite build",
  "serve": "vite preview",
  "clean": "npx clear-npx-cache"
},
```

clean コマンドは、npx コマンドの cache 削除用です。
古いバージョンの Tailwind CSS が実行されてしまい、エラーになる場合に実行してください。

### 4-6. Tailwind CSS の動作を確認する Vue に書き換えます

HelloWorld.vue の class を書き換えます。

```vue
<!-- src/components/HelloWorld.vue -->
<template>
  <h1 class="bg-red-400">{{ msg }}</h1>

  <p class="bg-[#1da1f1]">
    <a href="https://vitejs.dev/guide/features.html" target="_blank">
      Vite Documentation
    </a>
    |
    <a href="https://v3.vuejs.org/" target="_blank">Vue 3 Documentation</a>
  </p>

  <button type="button" class="bg-yellow-500" @click="state.count++">
    count is: {{ state.count }}
  </button>
  <p>
    Edit
    <code>components/HelloWorld.vue</code> to test hot module replacement.
  </p>
</template>

<script setup>
import { defineProps, reactive } from "vue";

defineProps({
  msg: String,
});

const state = reactive({ count: 0 });
</script>

<style scoped>
a {
  color: #42b983;
}
</style>
```

### 4-7. dev サーバを起動します

爆速（1〜2 秒ほど）で、dev サーバが立ち上がります。

```sh
$ npm run dev
# http://localhost:3000/
# Ctrl + C で停止
```

### 4-8. 動作を確認します

下記のように、Hello World の画面が表示されば、OK です。

<amp-img src="/images/posts/vite-vue3-tailwindcss.png" layout="intrinsic" width="1712" height="822" class="block"></amp-img>

## 5. 既存の Vue3 ＋ Vite プロジェクトに Tailwind CLI を組み込むとき

下記のコマンドで、tailwindcss や vite をアップデートしてください。

```sh
# 既存のvue3を対応するとき
$ npm update tailwindcss # v2.2.2以降へ
$ npm update vite # v2.3.8以降へ
```

その後、手順の 3 から、実行してください。

すでにファイルを作成したり、修正している箇所は読み飛ばしてください。

## まとめ

Tailwind CLI を利用して、新しく Vue3 のプロジェクトを作成してみました。

驚くほど、爆速で開発環境が立ち上がり、とても快適に開発が可能なので、ぜひ、一度、お試しください 🙏

最後まで読んでいただき、ありがとうございました。

## 参考文献

https://github.com/tailwindlabs/tailwindcss/releases/tag/v2.2.0

https://github.com/tailwindlabs/tailwindcss/releases/tag/v2.1.0
