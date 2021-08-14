---
sortNo: 25
title: Tailwind CSSのJust-in-Time Mode専用の機能（14個）をまとめてみた
description: 'Just-in-Time Mode を、さらに活用したいと考えている方へ！'
eyecatchImage: ['/images/posts/tailwindcss-logo.png', 872, 533]
thumbnailImage: ['/images/posts/sm/tailwindcss-logo.png', 872, 533]
tags: ['CSS', 'Tailwind CSS']
---
Tailwind CSS v2.1.0 で、 Just-in-Time Mode が新しく導入されました。

今回、v2.2.0 にビルド時間やファイルサイズの問題で、今まで Tailwind CSS には導入されなかった便利な機能が Just-in-Time Mode 専用で追加されたので、 v2.1.0 で使える記述も含めて、ご紹介しようと思います。

## 環境

- macOS Big Sur
- Node.js v14.15.1

## 利用したライブラリの紹介

### [Tailwind CSS](https://tailwindcss.com/) とは

ユーティリティ・ファーストの低レベルな CSS ライブラリです。

Bootstrap や Vuetify、 ElementUI の様に決まった UI ではなく
オリジナルの UI を爆速で作れます。

設定ファイルを変更することで、 Tailwind CSS のほぼ全てをカスタマイズできます。

### [Just-in-Time Mode](https://tailwindcss.com/docs/just-in-time-mode) とは

Tailwind CSS [v2.1.0](https://github.com/tailwindlabs/tailwindcss/releases/tag/v2.2.0#all-new-improved-tailwind-cli) から新たに追加された機能です。

Just-in-Time Mode は、全ての Tailwind CSS のユーティリティを事前にビルドするのではなく、
テンプレート（ HTML や JS、 Vue ）で利用されているユーティリティのみを、Tailwind CSS で検出して事前にビルドして生成するモードです。

#### メリット

- ビルド時間が 3 〜 5 秒から 1 秒未満に短縮
- 開発、本番の両方で、ビルド結果のファイルサイズが自動的に最小になる
- `w-[100px]` や `m-[10px]` などの指定をすることで、カスタム CSS を作成せずに、微妙な調整が Tailwind CSS のみでできる
- 先頭に `!` をつける（ `!w-1` ）ことで `!important` の指定ができる
- 設定を変更しなくても、全ての Tailwind CSS のバリアントが指定できる
  - バリアントは CSS の擬似クラスや、レスポンシブの指定を簡単に指定できる Tailwind CSS の機能です。

#### デメリット

- `@apply` に自分で作成した css を使う時は、 [`@layer` が必要になる](https://tailwindcss.com/docs/functions-and-directives#layer)

## 前提条件

Tailwind CSS は v2.2.0 以降が必須です。

## 1. Just-in-Time Mode の有効化

tailwind.config.js に、`mode: 'jit'` を追記して、`purge` の設定を正しく行うことで有効に出来ます。

Just-in-Time Mode は、`purge` に記載されているテンプレート（ HTML や JS、 Vue ）に記載されている Tailwind CSS のクラスを検出して CSS を生成します。

そのため、下記のように `purge` にすべてのテンプレート（ HTML や JS、 Vue ）のパスを、ワイルドカードで指定する必要があります。

```js
// tailwind.config.js
module.exports = {
  mode: 'jit',
  purge: [
    './public/**/*.html',
    './src/**/*.{js,jsx,ts,tsx,vue}',
  ]
}
```

ちなみに `purge` が未指定の場合は、CSS は空になります。

## 2. Just-in-Time Mode の新機能について

v2.1.0 と v2.2.0 の Just-in-Time Mode のみで使用できる、14 の機能になります。

### 2-1. 任意の値

一部のユーティリティは、新しい角括弧表記を使用して任意の値を指定できます。

```html
<!-- 使用できる任意の値の例 -->
<!-- サイズや位置を任意の値で指定する -->
<img class="absolute w-[762px] h-[918px] top-[-325px] right-[62px] md:top-[-400px] md:right-[80px]" />
<!-- 色を任意の値で指定する -->
<button class="bg-[#1da1f1]">共有する！！</button>
<!-- グリッドを任意の値で指定する -->
<div class="grid-cols-[1fr,700px,2fr]"></div>
```

v2.2 以降は、長さや色、角度、リストも任意の値で指定できます

```html
<!-- 長さや色、角度を任意の値で指定する -->
<div class="col-start-[73] placeholder-[#aabbcc] object-[50%] ..."></div>
```

CSS 変数を指定する場合は、`text-`のようにフォントサイズか色か Tailwind CSS が判別がつかないことがあります。

その場合は、型（`length`、`color`、`angle`、`list`）を指定する必要があります。

```html
<!-- テキストのフォントサイズと色を指定した場合 -->
<div class="text-[length:var(--my-fontsize-var)]">あああ</div>
<div class="text-[color:var(--my-color-var)]">あああ</div>
```

```css
/* CSS変数の指定 */
:root {
  --my-color-var: #aa00cc;
  --my-fontsize-var: 100px;
}
```

### 2-2. important 修飾子

Tailwind CSS クラスの先頭に`!`文字を追加すると、`!important`指定にすることができます。

```html
<!-- important修飾子 -->
<p class="font-bold !font-medium">
吾輩は猫である。名前はまだ無い。どこで生れたかとんと見当がつかぬ。
何でも薄暗いじめじめした所でニャーニャー泣いていた事だけは記憶している。吾輩
</p>
<div class="sm:hover:!tw-font-bold">
```

### 2-3. 最初または最後の子要素の擬似要素（before、after）のサポート

Tailwind CSS クラスの先頭に`before:`や`after:`を指定することで、最初または最後の子要素の擬似要素にユーティリティを指定できます。

before: は要素の最初の子要素、`after:`は要素の最後の子要素です。

```html
<!-- before、after擬似要素の記述例 -->
<div class="before:block before:bg-blue-500 after:flex after:bg-pink-300"></div>
```

`content`で、要素の中のテキストを指定する事もできます。

```html
<!-- contentに'hello'を指定した記述例 -->
<div class="before:content-['hello'] before:block ..."></div>
```

また、`content`は、指定の属性値を要素のテキストを指定する事もできます。

```html
<!-- contentにbefore属性の値を指定した例 -->
<div before="hello world" class="before:content-[attr(before)] before:block ..."></div>
```

### 2-4. 先頭文字/行の擬似要素（first-letter/line）のサポート

Tailwind CSS クラスの先頭に`first-letter:`または、`first-line:`を指定することで、ブロックレベル要素の最初の行や、最初の文字のスタイルを指定できます

よくある、一文字目だけ大きいスタイルを Tailwind CSS のみで指定できます。

```html
<!-- 先頭文字のみ文字サイズを大きくした例 -->
<p class="first-letter:text-4xl first-letter:font-bold first-letter:float-left">
木曾路はすべて山の中である。
あるところは岨づたいに行く崖の道であり、あるところは数十間の深さに臨む
</p>
```

### 2-5. 選択した文章の擬似要素（selection）のサポート

Tailwind CSS クラスの先頭に`selection:`を指定することで、文字を選択した時のスタイルを指定できます。

```html
<!-- 選択した文字の背景色をピンクにした例 -->
<p class="selection:bg-pink-200">
木曾路はすべて山の中である。
あるところは岨づたいに行く崖の道であり、あるところは数十間の深さに臨む
</p>
```

### 2-6. リスト項目の箇条書き記号ボックスの擬似要素（marker）のサポート

Tailwind CSS クラスの先頭に`marker:`を指定することで、リスト項目の箇条書き記号ボックスのスタイルを指定できます。

```html
<!-- 番号付きリスト項目を大きめにした例 -->
<h1>WrestleMania XII Results</h1>
<ol role="list" class="list-decimal list-inside marker:text-gray-500 marker:font-medium marker:text-3xl">
  <li>日本国民は、正当に選挙された国会における代表者を通じて行動し、</li>
  <li>われらとわれらの子孫のために、諸国民との協和による成果と、</li>
  <li>わが国全土にわたつて自由のもたらす恵沢を確保し、</li>
  <li>政府の行為によつて再び戦争の惨禍が起ることのないやうにすることを決意し、</li>
  <li>ここに主権が国民に存することを宣言し、この憲法を確定する。</li>
  <li>そもそも国政は、国民の厳粛な信託によるものであつて、</li>
</ol>
```

### 2-7. 兄弟要素を選択するバリアント（peer）

チェックボックスやラジオボタンなどをチェックしたときに、他の兄弟要素も連動してスタイルを変更できるようになりました。

下記の例では、チェックボックスの`checked`擬似クラスを`peer-`して、`peer-checked`にした例です。

```html
<!-- チェックボックスにチェックを入れると、spanのスタイルも変わる例 -->
<label>
  <input type="checkbox" class="sr-only peer">
  <span class="w-4 h-4 bg-gray-100 peer-checked:bg-blue-500 peer-checked:text-blue-50">チェックボックスだよ！</span>
</label>
```

`checked`になる要素（チェックボックス）には、`peer`クラスを設定しておきます。

`peer`は、`checked`以外の擬似クラスも対応できるため、フォーム部品などのカスタマイズが捗ります。

### 2-8. 擬似クラス（バリアント）の追加

下記の表の擬似クラスが使えるように、バリアントに追加されました。

これで、 Tailwind CSS で擬似クラスが不足している場合に困ることが少なくなると思います。

| 擬似クラス名      | 概要                                                                                                                                                                                                                                                                   |
| ----------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| only              | 兄弟要素がない要素を選択 (only-child)                                                                                                                                                                                                                                |
| first-of-type     | 兄弟要素のグループの中でその種類の最初の要素を選択                                                                                                                                                                                                               |
| last-of-type      | 兄弟要素のグループの中でその種類の最後の要                                                                                                                                                                                                                       |
| only-of-type      | 兄弟要素のグループの中で同じ型の兄弟要素がない要素                                                                                                                                                                                                           |
| target            | URL のフラグメントに一致する id を持つ固有の要素 (対象要素) 、表示し たフラグメントの項目を強調するために利用される                                                                                                                                                |
| default           | デフォルトで選択(selected、checked)されている要素や、規定のフォ ームを送信するボタン(submit、image)の要素                                                                                                                                                        |
| indeterminate     | 1. 未確定の状態にあるフォーム要素 (JavaScript で、チェックボックスの indeterminate プロパティが true に設定されている([ー]表示の)要素) <br>2. フォーム内の同じ name の値を持つすべてのラジオボタンが未選択の要素<br>3. progress 要素で、中間の状態 |
| placeholder-shown | プレイスホルダー文字列が表示されている input または textarea 要 素                                                                                                                                                                                               |
| autofill          | input 要素の値がブラウザーによって自動補完されている場合                                                                                                                                                                                                         |
| required          | input, select, textarea 要素のうち required 属性が設定されてい るものを表します。                                                                                                                                                                                    |
| valid             | 内容の検証に成功した input 要素 や、その他の form 要素                                                                                                                                                                                                                 |
| invalid           | input 要素や form 要素のうち内容が検証に失敗したもの                                                                                                                                                                                                                 |
| in-range          | 現在の値が min および max 属性による制限範囲内にある input 要素                                                                                                                                                                                                    |
| out-of-range      | 現在の値が min および max 属性で指定された範囲を外れている input 要素                                                                                                                                                                                            |

下記は、`placeholder-shown`を使用した例です。

```html
<!-- placeholder-shownを使用した例 -->
<div class="relative">
  <input id="name" class="peer" placeholder="placeholder" />
  <label for="name" class="peer-placeholder-shown:top-0 peer-
focus:top-[-1.75rem] absolute block">プレースフォルダーだよ！</label>
</div>
```

テキストボックスのプレースホルダーが表示されているとき（初期表示）は、テキストボックスのプレースホルダーが重なって見えない位置（`top-0`）にラベルのテキストを表示します。

テキストボックスにフォーカスを合わせると、テキストボックスの真上（`top-[-1.75rem]`）の位置にラベルのテキストを移動します。

### 2-9. 透明度と色の同時指定

透明度と色を、より短い構文（色/透明度）で指定できるようになりました。

```html
<!-- 透明度と色の同時指定を使用しない例 -->
 <div class="bg-red-500 bg-opacity-25">
```

```html
<!-- 透明度と色の同時指定を使用する例 -->
<div class="bg-red-500/25">
```

```html
<!-- グラデーションの色など、色全般に使用できます -->
<div class="bg-gradient-to-r from-red-500/50"></div>
```

```html
<!-- 透明度には小数点も使用できます -->
<div class="bg-red-500/[0.31]"></div>
```

`bg-[#aabbcc]/25`の様に、任意の値と透明度と色の同時指定を併用すると、v2.2.0 では適用されないため、注意してください。

（`bg-[#aabbcc/25]`でも不可でした。）

### 2-10. カーソルの色を指定

`<input>` または `contenteditable`属性のついた要素などの中で、

次に入力された文字が挿入される位置を示す、カーソルの色を指定できる様になりました。

```html
<!-- inputタグのカーソルの色を指定する -->
<input class="caret-red-500" />
```

### 2-11. transform と filter 指定の簡略化

`transform`、`filter`、`backdrop-filter`のクラスは、「有効化」するための指定が不要になりました。

```html
<!-- transformとbackdrop-filterの簡略化を使用しない例 -->
<div class="transform scale-50 filter grayscale backdrop-filter backdrop-blur-sm">
```

```html
<!-- transformとbackdrop-filterの簡略化を使用する例 -->
<div class="scale-50 grayscale backdrop-blur-sm">
```

```html
<!-- transformの簡略化を使用しない例(hoverした時のみ変形する) -->
<div class="scale-105 -translate-y-1 hover:transform">
```

```html
<!-- transformの簡略化を使用する例(hoverした時のみ変形する) -->
<div class="hover:scale-105 hover:-translate-y-1">
```

### 2-12. 片側の境界線の色を指定

片側の境界線の色のサポートが追加されました

```html
<!-- 片側の境界線の色の指定を使用した例 -->
<div class="border-2 border-t-blue-500 border-r-pink-500 border- b-green-500 border-l-yellow-500">
  <!-- ... -->
</div>
```

### 2-13. セーフリストに指定して、purge されないようにする

特定のクラスがデータベースなどの外部のコンテンツで使用されていて、

`purge`によって、Tailwind CSS の CSS が削除されないようにしたい場合に使用します。

```js
// 組み込みのセーフリストを指定する例
// tailwind.config.js
module.exports = {
  purge: {
    content: ['./src/**/*.html'],
    safelist: [
      'bg-blue-500',
      'text-center',
      'hover:opacity-100',
      'lg:text-right',
    ],
  },
}
```

### 2-14. コンテンツを変換して、クラス名を検出する方法

Tailwind CSS がコンテンツをスキャンして潜在的なクラス名を探す前に、そのままではスキャンできないファイル拡張子のコンテンツを変換できます。

これは、Markdown のように HTML にコンパイルされる言語で書かれたテンプレートがある場合に使用します。

```js
// *.mdファイルを、remarkでhtmlに変換する例
// tailwind.config.js
let remark = require('remark')
module.exports = {
  purge: {
    content: ['./src/**/*.{html,md}'],
    transform: {
      md: (content) => {
        return remark().process(content)
      },
},
},
// ... }
```

## まとめ

v2.2.0 で新しく Tailwind CSS に導入された Just-in-Time Mode 専用の便利な機能をご紹介してみました。

生で CSS を使う頻度が下がり、快適な Tailwind CSS ライフが送れるようになりました。

また、爆速でビルドが実行され、生成される CSS も最小限なので快適に開発が可能になります！

ぜひ、一度、お試しください 🙏

最後まで読んでいただき、ありがとうございました。

## 参考文献

https://github.com/tailwindlabs/tailwindcss/releases/tag/v2.2.0

https://github.com/tailwindlabs/tailwindcss/releases/tag/v2.1.0
