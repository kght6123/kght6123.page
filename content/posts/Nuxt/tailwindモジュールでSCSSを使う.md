---
sortNo: 9
title: 'nuxt/tailwindモジュールでSCSSを使ってBEM記法を楽に書く'
description: 'TailwindでBEM記法を使ったCSSを書くことが多いので、SCSSを使って楽にしました'
eyecatchImage: ['/images/posts/nuxt-tailwind-logo.png',1280,640]
thumbnailImage: ['/images/posts/nuxt-tailwind-logo.png',1280,640]
tags: ['Nuxt.js', 'Tailwind.css', 'BEM', 'SCSS']
---

BEMの記法でCSSを書くときに、SCSSが使えるとコードを書く量が少なくなるので

nuxt/tailwindモジュールでSCSSを使う方法を備忘録代わりにまとめました。

（2児が産まれたてで忙しいので、深夜に目を擦りながら書いてます、、、間違ってたらごめんなさい）

## assets\css\tailwind.css ファイルの拡張子を scss に変える

そのままの意味です、ファイルの拡張子を scss に変えます。

## nuxt.config.js nuxt/tailwindモジュールの設定を追加する

下記のような設定を、nuxt.config.jsに追記します。

```json
/*
	** nuxt-tailwindcss config
	*/
tailwindcss: {
	cssPath: '~/assets/css/tailwind.scss',
	configPath: 'tailwind.config.js',
	exposeConfig: false,
	config: {},
},
```

## node-sass sass-loader を dev でインストールする

```sh
npm install -S -D node-sass sass-loader # npmのとき
or
yarn add -D node-sass sass-loader # yarnのとき
```

## assets\css\tailwind.scss の中にBEM記法で、cssを書く

こんな感じで書きます。

`Element`や`Modifier`を追加するときに、親の`Element`や`Modifier`を書かなくてよいので、

コードを書く量が少なくなる。

```scss
.block { /* block */
  color: #fff;
  width: 100%;
  &__element1 { /* element */
    width: 30px;
    &_modifier1 { /* modifier */
      background-color: #ccc;
    }
    &_modifier2 { /* modifier */
      background-color: #111;
      &_modifier3 { /* modifier */
        color: #ddd;
      }
      &_modifier4 { /* modifier */
        color: #ccc;
      }
    }
  }
  &__element2 { /* element */
      width: 60px;
  }
}
```

## 参考サイト

- [nuxt/tailwind Options](https://tailwindcss.nuxtjs.org/options#csspath)

- [Nuxt.js The css Property](https://nuxtjs.org/guides/configuration-glossary/configuration-css)

