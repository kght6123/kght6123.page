---
marp: true
title: "Next.js を使った静的ブログへの移行とか"
description: "資料の概要を書く"
theme: gaia
class: lead
backgroundColor: #efefef
backgroundImage: url(../images/.jpg)
color: #334155
header: "Next.js を使った静的ブログへの移行とか"
footer: "...."
style: |
  section {
    font-family: "PlemolJP";
  }
  ul, ol {
    display: table;
    text-align: left;
    margin-left: auto;
    margin-right: auto;
    padding: 0;
  }
  header, footer {
    color: #334155;
  }
  header {
    font-weight: 900;
    font-size: 0.6rem;
  }
  footer {
    font-weight: 900;
    font-size: 0.5rem;
    text-align: right;
  }
---

<!-- _header: - -->

# Next.js を使った静的ブログへの移行とか

資料の概要を書く

###### kght6123

<!--
参考文献：https://reffect.co.jp/react/nextjs-markdown-blog
-->

---

## 参考文献のメモ

続きはここから↓
https://reffect.co.jp/react/nextjs-markdown-blog#Pagination

---

## 目次(1/2)

0. この資料について
1.

---

## ハマったところ

TypeScript で Next.js をつくるとき

```sh
npx create-next-app kght6123.page --ts
```

TypeScript の型ガード

```
const data: {
    [key: string]: any;
}
// これのanyを型ガードでstringにして、またオブジェクトに戻す。

↓

const frontMatter = Object.entries(data).filter(
  (entry): entry is [string, string] => typeof entry[1] === "string"
  ).map(entry => {
    return {[entry[0]]: entry[1]}
  });
return {
  frontMatter,
  slug,
};

↓

type FrontMatter = {
  [key: string]: string;
}
const frontMatter = Object.entries(data).filter(
  (entry): entry is [string, string] => typeof entry[1] === "string"
  ).reduce((p, cv) => {
    p[cv[0]] = cv[1];
    return p;
  }, {} as FrontMatter);
```

TypeScriptの型のインポート

もともとのサンプルコード、propsの型を独自で定義していた
```
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

const CustomImage = ({
  src,
  alt,
}: {
  src: string;
  alt?: string | undefined;
}): JSX.Element =>
  <Image src={src} alt={alt} width="1200" height="700" />;
```

用意されている、ImagePropsやLinkPropsの型を使うように

```
const CustomImage = ({
  src,
  alt,
}: ImageProps): JSX.Element =>
  <Image src={src} alt={alt} width="1200" height="700" />;
```

```
const CustomLink = ({
  children,
  href,
}: LinkProps & {
  children?: React.ReactNode; // next/linkのコードを見ると交差型で定義されているのでここもそんな感じに
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

交差型でLinkPropsを使うように

---

## 工夫したところ

Prettier でフォーマットしたい

```sh
npx prettier --write . --ignore-path \".gitignore\" #手軽に最新でフォーマット（npmのscriptsにいれる）
```

FIXME: Promise.all で効率化できそう

---

## 気になったところ

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