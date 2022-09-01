---
marp: true
title: "Next.js を使った静的ブログへ移行を検討した話"
description: "資料の概要を書く"
theme: gaia
class: lead
backgroundColor: #efefef
backgroundImage: url(./images/rrrainbow.png)
color: #334155
header: "Next.js を使った静的ブログへ移行を検討した話"
footer: "2022.09.01"
style: |
  section {
    font-family: "Rounded Mplus 1c";
  }
  h1, h2, h3, h4, h5, p, li {
    text-shadow: 3px 3px 0 #FFF, -3px -3px 0 #FFF,
              -3px 3px 0 #FFF, 3px -3px 0 #FFF,
              0px 3px 0 #FFF,  0 -3px 0 #FFF,
              -3px 0 0 #FFF, 3px 0 0 #FFF;
  }
  code {
    text-shadow: none;
  }
---

<!-- https://fffuel.co/rrrainbow/ -> SVG -> PNG -->

<!-- 
  section {
    font-family: "Rounded Mplus 1c";
    background: linear-gradient(-45deg, #f5d0fe, #fbcfe8, #fda4af, #fbcfe8);
    background-size: 400% 400%;
    animation: gradient 15s ease infinite;
  }
  @keyframes gradient {
    0% {
      background-position: 0% 50%;
    }
    50% {
      background-position: 100% 50%;
    }
    100% {
      background-position: 0% 50%;
    }
  }
 -->

<!-- _header: - -->

# Next.js を使った静的ブログへ移行を検討した話

現在の[個人ブログ（Nuxt.js＋AMP）](https://kght6123.page/)をNext.jsを使った静的ブログへの移行を試した話です。

<!--
古くなってきたので、最新技術を気軽に試せるために作っているため移行を検討しました。
-->

---

## この参考文献をもとにすすめました

ただし、JavaScriptだったのでTypeScriptの勉強のために、jsxやjsをtsx、tsへ書き換えながら進めました
https://reffect.co.jp/react/nextjs-markdown-blog

---

## 目次(1/2)

0. この資料について
1. ハマったところ
2. 工夫したところ
3. 気になったところ
4. まとめ

---

## ハマったところ

---

### TypeScript で Next.js をつくるとき

```sh
npx create-next-app kght6123.page --ts
```

`--ts` を忘れると面倒、結局、作り直しました。

---

### TypeScript の型ガード

`gray-matter`はMarkdownのメタ情報の部分を取り込むライブラリです。
ここにブログの基本情報を書きたい。

```md
---
title: "Next.jsでmarkdownブログを構築"
date: "2022-07-13"
description: "Next.jsでmarkdownファイルを利用したブログの構築手順を解説しています。"
image: nextjs.png
categories: ['react']
---

## 目次
```

---

`gray-matter`からは下記のような型で返ってくる。

```ts
const data: {
    [key: string]: any;
}
```
anyを使うときに毎回、型判定が必要で面倒なので、型ガードでstringまたはstring[]にして、またオブジェクトに戻す。

---

最初につくったのがこれ

```ts
const frontMatter = Object.entries(data).filter(
  (entry): entry is [string, string] => typeof entry[1] === "string"
  ).map(entry => {
    return {[entry[0]]: entry[1]}
  });
return {
  frontMatter,
  slug,
};
```

型定義のあった方が明確に型がわかるかな・・・？

---

結果、dataをtypeとして定義したFrontMatterにするユーティリティを作りました

```ts
export type FrontMatter = {
  [key: string]: string | string[];
};
export const convertFrontMatter = (data: { [key: string]: unknown }) => {
  const frontMatter = Object.entries(data)
    .filter((entry): entry is [string, string|string[]] => typeof entry[1] === "string" || typeof entry[1] === "object")
    .reduce((p, cv) => {
      p[cv[0]] = cv[1];
      return p;
    }, {} as FrontMatter);
  return frontMatter;
};
```

---

## 工夫したところ

---

### TypeScriptの型のインポート

---

最初に作ったコード、propsの型を独自で定義していた

```ts
const CustomLink = ({
  children,
  href,
}: {
  children: string;
  href: string;
}): JSX.Element =>
  href.startsWith('/') || href === '' ? (
    <Link href={href}>
      <a>{children}</a>
    </Link>
  ) : (
    <a href={href} target="_blank" rel="noopener noreferrer">
      {children}
    </a>
  );
```

---

```ts
const CustomImage = ({
  src,
  alt,
}: {
  src: string;
  alt?: string | undefined;
}): JSX.Element =>
  <Image src={src} alt={alt} width="1200" height="700" />;
```

毎回、ImageとかLinkカスタムタグのpropsの型を定義していくのはめんどい

---

元々用意されている、ImagePropsやLinkPropsの型を使うように

```ts
const CustomImage = ({
  src,
  alt,
}: ImageProps): JSX.Element =>
  <Image src={src} alt={alt} width="1200" height="700" />;
```

---

LinkのPropsは交差型を使うように

```ts
const CustomLink = ({
  children,
  href,
}: LinkProps & {
  children?: React.ReactNode; // next/linkのコードを見ると交差型で定義されているのでここも同じように
}): JSX.Element =>
  href.toString().startsWith('/') || href === '' ? (
    <Link href={href}>
      <a>{children}</a>
    </Link>
  ) : (
    <a href={href.toString()} target="_blank" rel="noopener noreferrer">
      {children}
    </a>
  );
```

---

ImagePropsやLinkPropsの型を使うことで、コードはスッキリ
↓
> 明示的にどのPropsの属性をコンポーネントでつかってるか、コードを見ないとわからない

↓
業務での開発は元の方が良いと感じました。

---

### Prettier でフォーマットしたい

```sh
npx prettier --write . --ignore-path \".gitignore\" #手軽に最新でフォーマット（npmのscriptsにいれる）
```

個人開発なので、まぁ常に最新でよいかなと。

---

## 気になったところ

---

next.config.js

↓ js なのに型補完が IDE で効く

```js
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
};

module.exports = nextConfig;
```

---

tailwind.config.js（`npx tailwindcss init -p`で生成される）

↓ js なのに型補完が IDE で効く

```js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [],
  theme: {
    extend: {},
  },
  plugins: [],
};
```

jsですが、@typeでIDEに型を教えてあげている。

---

#### @typeが必要なのは、、、

Tailwind CSSの場合は、設定ファイルがTypeScriptに未対応のライブラリ（PostCSS）があるためtsではないようです。

使える場面では、効率が上がるので使っていきたいなと思いました。

※ Node.jsはtsをトランスパイルしないと使えないのも原因のひとつ？

---

## まとめ

すんなり、Next.jsでブログが移行できそうな状態になりました。
 - あとはデザインを整えて、
 - Nuxt.jsのブログとURLをあわせたり
 - gray-matterの属性をあわせたり

ただ、最新技術的にはあまり面白くなかったので、Solid.jsとかで試したいなと思いました。

---

# ありがとうございました！！
