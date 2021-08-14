---
sortNo: 22
title: Nuxt.js と ElementUI、 Tailwind CSS、 StoryBook、Jest で新規プロダクトの開発を始めてみた
description: 'Tailwind CSS を、他の UI フレームワークと連携して導入したいと考えている方へ！'
eyecatchImage: ['/images/posts/tailwindcss-logo.png', 872, 533]
thumbnailImage: ['/images/posts/sm/tailwindcss-logo.png', 872, 533]
tags: ['CSS', 'Tailwind CSS', 'Nuxt.js', 'ElementUI','StoryBook','Jest']
---

最近、仕事で新規プロダクトのフロントエンドを、タイトルの構成で構築しましたが、

その際に、色々と設定を変えたりしたので、その部分をご紹介しようと思います。

## 環境

- macOS Big Sur
- Node.js v14.15.1

## 利用したライブラリの紹介

### [Tailwind CSS](https://tailwindcss.com/) とは

ユーティリティ・ファーストの低レベルな CSS ライブラリです。

Bootstrap や Vuetify、ElementUI の様に決まった UI ではなく
オリジナルの UI を爆速で作れます。

設定ファイルを変更することで、 Tailwind CSS のほぼ全てをカスタマイズできます。

今回は、ElementUI の CSS を微調整するために利用しています。

### [ElementUI](https://element.eleme.io/#/en-US) とは

Vue.js 2.0 ベースのデスクトップ（管理画面）向けの UI コンポーネントライブラリです。

Vue.js 3.0 ベースの ElementPlus も存在します。

### [StoryBook](https://storybook.js.org/) とは

サンドボックスの中で、コンポーネントの仕様をテストできます。
また、コンポーネントの仕様を一覧できるドキュメントにも使えます。

昔は、 Nuxt.js で利用するための設定が大変でしたが、 nuxt/storybook の登場により、簡単に使える様になりました。

### [Jest](https://jestjs.io/ja/) とは

シンプルさを重視した JavaScript のテストフレームワークです。

Nuxt.js のインストール時に、手軽に追加できるため、今回、利用しています。

## 前提条件

Tailwind CSS は v2.1 以降の JIT (Just-in-Time) モードで動かします。

StoryBook は postcss@8 のバグにより、下記のような警告をたくさん吐きます。
（今回、試す内容に影響はありませんでした）

```log
Though the "loose" option was set to "false" in your @babel/preset-env config, it will not be used for @babel/plugin-proposal-private-property-in-object since the "loose" mode option was set to "true" for @babel/plugin-proposal-private-methods.
The "loose" option must be the same for @babel/plugin-proposal-class-properties, @babel/plugin-proposal-private-methods and @babel/plugin-proposal-private-property-in-object (when they are enabled): you can silence this warning by explicitly adding
        ["@babel/plugin-proposal-private-property-in-object", { "loose": true }]
to the "plugins" section of your Babel config.
```

この問題は、 postcss@7 を使用すれば解決しますが、 Tailwind CSS が postcss@8 を要求するため、そのまま利用しています。

## 1. Nuxt.js のインストール＆プロジェクト作成

下記のコマンドを実行します。

```sh
npx create-nuxt-app new-product-frontend
```

インストール時の UI フレームワークは Tailwind CSS ではなく ElementUI を選択します。

また、テストフレームワークは、 Jest を選択します。

他の選択項目は、お好みで選択してください。

## 2. StroyBook のインストールと設定について

StroyBook を nuxt.js で使用するために nuxt/storybook をインストールします。

```sh
npm install --save-dev @nuxtjs/storybook postcss@latest
```

.gitignore に追記します。

```
.nuxt-storybook
storybook-static
```

nuxt.config.js にも追記します。

```js
// nuxt.config.js
  storybook: { // 追加
    stories: [
      '~/components/**/*.stories.mdx'
    ],
    addons: [
      '@storybook/addon-controls',
      '@storybook/addon-docs'
    ]
  }
```

起動を楽にするために、 package.json にも追記します。

```json
// package.json
  "scripts": {
    "storybook": "npx nuxt storybook",
  }
```

## 3. Tailwind CSS のインストールと設定について

Tailwind CSS をインストールします

```sh
npm install --save-dev @nuxtjs/tailwindcss tailwindcss autoprefixer postcss@latest
```

nuxt.config.js の buildModules に追記します。

```js
  buildModules: [
    // https://tailwindcss.com/docs/guides/nuxtjs
    '@nuxtjs/tailwindcss'
  ],
```

tailwind.css ファイルを作成します。

```css
/* assets/css/tailwind.css */
@tailwind base;
@tailwind components;
@tailwind utilities;
```

tailwind.config.js ファイルを作成します。

その際に、下記の設定を意図的に変えています。

- JIT (Just-in-Time) モードを有効化（メリット・デメリットは後述）
- element と競合を防ぐため、class 名の先頭に `tw-` を追加

```js
// tailwind.config.js
module.exports = {
  mode: 'jit', // JIT(Just-in-Time)モード有効
  prefix: 'tw-', // `tw-`を追加
  important: false,
  purge: [
    './components/**/*.{vue,js}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './plugins/**/*.{js,ts}',
    './nuxt.config.{js,ts}',
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
```

### 3-1. JIT (Just-in-Time) モードのメリット

- ビルド時間が 3 〜 5 秒から 1 秒未満に短縮
- 開発、本番の両方で、ビルド結果のファイルサイズが自動的に最小になる
- `w-[100px]` や `m-[10px]` などの微妙な位置調整の指定ができる
- 先頭に `!` をつける（ `!w-1` ）で `!important` の指定ができる

### 3-2. JIT (Just-in-Time) モードのデメリット

- `@apply` に自分で作成した css を使う時は、 [`@layer` が必要になる](https://tailwindcss.com/docs/functions-and-directives#layer)

### 3-3. 全てのデフォルト設定の記載がある tailwind.config.full.js を作成する

カスタマイズが捗るので、おすすめです。

```sh
npx tailwindcss init --full tailwind.config.full.js
```

### 3-4. Tailwind CSS の注意事項

この注意事項は、私が所属するチーム全体で共有して進めています。

- css クラスの利用の優先順位について

  1. ElementUI
  2. Tailwind CSS
  3. css（ `@apply` で可能な限り Tailwind CSS を使う）

- 無闇に `!` を付与しない
  - Tailwind CSS の class が効かない場合のみ、`!` を先頭に付与する

## 4. Tailwind CSS と ElementUI の動作確認をする

動作確認に使用するコンポーネントは、 Atomic Design 　で実装しています。

### 4-1. ElementUI の el-input を実装した atom コンポーネント

```vue
<!-- components/atoms/el/Input.vue -->
<template>
  <el-input
    :name="name"
    :value="value"
    :type="type"
    :placeholder="placeholder"
    :disabled="disabled"
    :maxlength="maxlength"
    :minlength="minlength"
    :show-word-limit="showWordLimit"
    @input="input"
  ></el-input>
</template>

<script>
export default {
  props: {
    name: { type: String, required: false, default: '' },
    type: { type: String, required: false, default: 'text' },
    value: { type: String, required: false, default: '' },
    placeholder: { type: String, required: false, default: '' },
    disabled: { type: Boolean, required: false, default: false },
    maxlength: { type: Number, required: false, default: null },
    minlength: { type: Number, required: false, default: null },
    showWordLimit: { type: Boolean, required: false, default: null },
  },
  methods: {
    input(value) {
      this.$emit('input', value)
    },
  },
}
</script>
```

### 4-2. 上記の atom を実装した molcule コンポーネント

Tailwind CSS でスタイルを微調整し、追加テキスト（ `additional` ）を追加

```vue
<!-- components/molcules/el/InputLabel.vue -->
<template>
  <atoms-el-col :span="span">
    <div class="tw-text-xs tw-text-gray-600">
      <slot></slot
      ><span class="tw-text-xxxs tw-text-gray-400"
        ><slot name="additional"></slot
      ></span>
    </div>
    <atoms-el-input
      :name="name"
      :value="value"
      :type="type"
      :placeholder="placeholder"
      :disabled="disabled"
      :maxlength="maxlength"
      :minlength="minlength"
      :show-word-limit="showWordLimit"
      @input="input"
    ></atoms-el-input>
  </atoms-el-col>
</template>

<script>
export default {
  props: {
    name: { type: String, required: false, default: '' },
    type: { type: String, required: false, default: 'text' },
    value: { type: String, required: false, default: '' },
    placeholder: { type: String, required: false, default: '' },
    disabled: { type: Boolean, required: false, default: false },
    maxlength: { type: Number, required: false, default: null },
    minlength: { type: Number, required: false, default: null },
    showWordLimit: { type: Boolean, required: false, default: null },
    span: { type: Number, required: false, default: null },
  },
  methods: {
    input(value) {
      this.$emit('input', value)
    },
  },
}
</script>
```

## 5. StoryBook の動作確認をする

下記の 2 ファイルを作って、markdown で molcule コンポーネントの仕様を記述できることを確認します。

```js
// components/molcules/el/InputLabel.stories.js
export default {
  title: 'molcules/el/InputLabel',
}
// eslint-disable-next-line no-empty-pattern
export const Basic = ({}) => ({
  template:
    '<molcules-el-input-label :type="type" :value="value">Basic</molcules-el-input-label>',
  props: {},
})
Basic.argTypes = {}
```

````md
<!-- components/molcules/el/InputLabel.stories.mdx -->
import { Meta, Story, Props } from '@storybook/addon-docs/blocks'
import { action } from '@storybook/addon-actions'

import InputLabel from './InputLabel'

<Meta title="molcules/el/InputLabel" component={InputLabel} argTypes={{}} />

# 概要

概要を マークダウン で書けます

## サンプル

サンプルを Markdown に埋め込みできます

<Story name="Basic" args={{ type: 'text', value: 'Basic' }}>
  {{
    template:
      '<molcules-el-input-label :type="type" :value="value">Basic</molcules-el-input-label>',
    props: {
      type: {
        default: 'text',
      },
      value: {
        default: 'Basic',
      },
    },
  }}
</Story>

使用例

\```html
<molcules-el-input-label
  v-model="プロパティの名前"
  :span="8"
  :maxlength="12"
  :minlength="0"
  show-word-limit
>
  名前
  <template #additional>追加テキスト</template>
</molcules-el-input-label>
\```

## Props

<Props of={InputLabel} />

````

この StoryBook のイメージは下記のようになります。

<amp-img src="/images/posts/storybook-markdown.png" layout="intrinsic" width="1120" height="1105" class="block"></amp-img>

## 6. Jest の動作確認をする

テストケースを作成して、作成したコンポーネントが正常に動くことを確認します。

```js:test/components/molcules/el/InputLabel.spec.js
import ElementUI from 'element-ui'
import Vuex from 'vuex'
import { mount, createLocalVue } from '@vue/test-utils'
import InputLabel from '@/components/molcules/el/InputLabel.vue'
import { createStore } from '../../../../.nuxt/store.js'

const localVue = createLocalVue()
localVue.use(Vuex)
localVue.use(ElementUI)

describe('components/modules/el/InputLabel.vue', () => {
  let wrapper, store
  beforeEach(() => {
    store = createStore()
    wrapper = mount(InputLabel, {
      store,
      localVue,
    })
  })
  describe('template', () => {
    test('入力フォームが存在すること', () => {
      const label = wrapper.find('div')
      expect(label.element.tagName).toBe('DIV')
      const input = wrapper.find('input[type="text"]')
      expect(input.element.tagName).toBe('INPUT')
    })
  })
  describe('props', () => {
    test('propsへ値を設定 ➡︎ 入力フォーム操作 ➡︎ emitで値を受け取れること', async () => {
      await wrapper.setProps({
        value: 'テストデータ',
      })
      expect(wrapper.vm.value).toBe('テストデータ')
      wrapper.find('input[type="text"]').setValue('テストデータ2')
      expect(wrapper.emitted('input')[0][0]).toBe('テストデータ2')
      // storeの値をテストしたい場合に追記する
      // expect(store.getters['organisms/ストアのファイル名/Getterの名前']).toBe(
      //   'テストしたい値'
      // )
    })
  })
})
```

テストを実行したところ、無事、 PASS になりました！

```log
 PASS  test/components/molcules/el/InputLabel.spec.js
```

### 6-1. Jest で苦労したところ

下記の Nuxt.js 特有の 2 点の問題で、苦労してしまいました。

#### 6-1-1. Nuxt.js で自動生成された store が取得できない

力技ですが、`.nuxt/store.js` を、テストケース内で import して `createStore` 関数を実行して store を作成することで解決します。

```js
// test/components/molcules/el/InputLabel.spec.js
import { createStore } from '../../../../.nuxt/store.js'
// 省略
  beforeEach(() => {
    store = createStore()
    wrapper = mount(InputLabel, {
      store,
      localVue,
    })
  })
// 省略
```

見た目は悪いですが、 store をテストケースに一から書かなくて良くなります。

#### 6-1-2. Nuxt.js で自動インポートされるコンポーネントが、インポートされない

同じく、力技ですが `.nuxt/plugin.js` を、テスト実行前に import することで解決します。

```js
// jest.setup.js
import './.nuxt/components/plugin.js' // 追加
```

```js
// jest.config.js
module.exports = {
  setupFilesAfterEnv: ['./jest.setup.js'] // 追加
}
```

こちらも、テストケースでコンポーネントをインポートする手間がなくなります。

## 7. 使用感・雑感

### よかったところ

- Tailwind CSS のビルド時間が早く、ブラウザの開発者モードも動作が軽い（JIT モードのおかげ）

- ElementUI を、Tailwind CSS の`w-[100px]`や`m-[10px]`などを使って、微妙な位置調整が簡単にシンプルにできる

- 先頭に!をつける（`!w-1`）だけで`!important`の指定ができる

### 気になったところ

- StoryBook のビルド＆起動が遅い

- StoryBook と Tailwind CSS の postcss が競合しているので、 StoryBook のビルドで警告がたくさん出る

## 8. まとめ

今、この構成の新規システムを開発中ですが、開発がかなり捗っているので、

今後も、既存プロダクトのリニューアルなどで使用してみたいなと考えています。

最後まで記事を見ていただき、ありがとうございました！！

## 参考文献

https://github.com/tailwindlabs/tailwindcss/releases/tag/v2.2.0

https://github.com/tailwindlabs/tailwindcss/releases/tag/v2.1.0

https://element.eleme.io/#/en-US

https://storybook.nuxtjs.org/

https://jestjs.io/ja/
