---
sortNo: 27
title: uhyo様の「Tailwind考」に関する私なりの考え
description: 'uhyo様の「Tailwind考」に関する私なりの考え'
eyecatchImage: ['/images/posts/sm/8GjuBNnF.jpeg', 872, 533]
thumbnailImage: ['/images/posts/sm/8GjuBNnF.jpeg', 872, 533]
tags: ['CSS', 'Tailwind CSS']
---

uhyo様の「[Tailwind考](https://blog.uhy.ooo/entry/2022-10-01/tailwind/)」を拝見させていただいて、概ね賛成ですが

今までTailwind CSSのv1.0が公開されてから、業務や個人でTailwind CSSを使ってきた私なりの考えや感想、意見を特に私が異なると思った部分を中心に一部引用させていただきながら、まとめました。

内容がかなり長くなってしまい、Twitterやはてブのコメントでは収まらなくなったので大変恐縮ですが、個人ブログで公開します。

引用させていただいた、uhyo様のブログは「[こちら](https://blog.uhy.ooo/entry/2022-10-01/tailwind/)」です。

## 「Tailwind CSSとは」より

> デザインシステムを表現することがTailwindの主要なユースケースです。
> 引用元：https://blog.uhy.ooo/entry/2022-10-01/tailwind/#tailwind-cssとは

こちらは同意で、デザインシステムを表現するためにTailwind CSSは膨大なユーティリティによって、労力を減らしてくれます。

`text-xs`が`font-size: 0.75rem; line-height: 1rem;`に、`w-10`が`width: 2.5rem;`のルールに制限されるところはデザインシステムを作る際に、UIのデザインを合わせる際にとても役に立ちます。

## 「Tailwindは何でないか」より

> TailwindはCSSの代わりではないし、CSSの学習コストを減らさない
> 引用元：https://blog.uhy.ooo/entry/2022-10-01/tailwind/#tailwindは何でないか

こちらも同意します。Tailwind CSSはCSSの学習コストはそのまま掛かります。それに加えてTailwind CSS自体の学習コストも加わることで、フロントエンドやCSSに詳しくないエンジニアが使うと、学習コストが非常に高くなってしまうと私も思っています。

Tailwind CSSはCSSのフレームワークなので、確かにCSSの代わりにはなりません。

> すでにCSSを理解している人が享受できるものであって、まだCSSを知らない人にとっては特に恩恵はありません。
> 引用元：https://blog.uhy.ooo/entry/2022-10-01/tailwind/#tailwindは何でないか

まだ、CSSを詳しく知らないが、HTMLやCSSを触るフロントエンジニアだとしたらCSSを理解するのは必須の技能と考えます。
Tailwind CSSを触らなくても、他のCSS派生のStylusやCSS Modules、Styled Componentsを触るとしてもCSSの知識は必要になってくるので、CSSを理解するのは必須の技能というのは、Tailwind CSSを語るにあたっての大きな欠点ではないと考えます。

CSSを日頃触らないエンジニアがTailwind CSSを使うとしたら、前述していますが学習コストが高く恐怖だろうな、、、と想像します。
そのような体制の場合は、Tailwind CSSを使うべきではなく、BootstrapなどのUIフレームワークを検討するべきと思います。

> すでにCSSを十分理解している人から見ると、Tailwindの（core pluginsによる）クラス名が短くて簡潔だからといって特に嬉しいわけではありません。
> エディタによる入力補完などが十分発達した現在では、Tailwindを使っても使わなくてもCSSの開発効率の差は正直ありません。
> 引用元：https://blog.uhy.ooo/entry/2022-10-01/tailwind/#tailwindは何でないか

クラス名が短くて簡潔なのは、私は良い点も悪い点もあると考えます。
Tailwind CSSのユーティリティに慣れた人は短いので早く書けますが、知らない人は書くのに時間がかかりますし、どのCSSを表しているのか後から分かりにくくなります。

ただ、この悪い点は他のCSSフレームワークやBootstrapなどのUIフレームワークを使うにあたっては当然かかる学習コストで、Tailwind CSS以外のフレームワークを使ったからといって、慣れる必要があることはあまり変わりません。
StylusやCSS Modules、Styled Componentsなどと比べたとしたら、確かにJavaScriptやCSSを知っていてTailwind CSSを知らない人は書くのに時間がかるので、人にはよりますが慣れるまで多かれ少なかれ学習コストは掛かると思います。

完全な解決策ではないですが、Tailwind CSSの公式の入力補完が可能な拡張機能があって、こちらで少し軽減できます。Tailwind CSSはフレームワークでCSSではないので、この辺りの追加の学習コストに私は違和感はないです。

> それと同じく、Tailwindのクラス名はやや短くしすぎで、いわゆる「SimpleではなくEasy」なものになってしまっている印象を受けます。
> 引用元：https://blog.uhy.ooo/entry/2022-10-01/tailwind/#tailwindは何でないか

確かにTailwind CSSにはそのような側面もあり、私も短くしすぎて分かりにくいと感じることはあります。
人によるとは思いますが、私は特にflexboxのオプション周りのユーティリティの命名は慣れませんが、それ以外で特に気になるユーティリティはほぼありません。

ただ、Tailwind CSSのユーティリティの命名は慣れれば推測しやすい名前となっていると私自身は感じていて、慣れると離れられなくなる魅力があります。

## 「Tailwindは命名の苦しみからあなたを解放しない」より

> Tailwind開発者による記事「CSS Utility Classes and "Separation of Concerns"」においても、ユーティリティファーストの良いところは「責務の分離」が達成できる点にあり、コンポーネントの概念は依然として必要であるとされています。
> 引用元：https://blog.uhy.ooo/entry/2022-10-01/tailwind/#tailwindは命名の苦しみからあなたを解放しない

私も、React.jsやVue.jsのJSXやテンプレートでのコンポーネントの概念はとても重要である思っています。
むしろ、Tailwind CSSを使うなら、HTMLの定義がclassの肥大化により見づらくなってしまうため、コンポーネント設計などの概念はほぼ必須であると考えます。

ただ、規模の大きいまたは複雑なシステムならば、この辺りのコンポーネント設計などの概念はTailwind CSSが無くても必須であると私は思っていて、この辺りのコストは気になりません。
また、規模が小さく簡単なシステムなら、コンポーネントが大きくなったところを分割で十分と私は考えています。

> ReactなどのUIライブラリを使っている時点ですでにクラス名の命名からはわれわれは解放されています。コンポーネントに対するCSSを書く場合、クラス名の名前空間はそのコンポーネントに制限されるのが一般的です。
> 引用元：https://blog.uhy.ooo/entry/2022-10-01/tailwind/#tailwindは命名の苦しみからあなたを解放しない

私はチーム開発であれば些細なCSSクラスの命名も他人が後から見ても分かるようにしたり、グローバルなCSSを定義することもあると思っていて、その命名を考える必要や命名に関する議論をTailwind CSSは無くしてくれます。
（場合によっては、BEMやFLOCSSなどのCSS設計に即して記述することもあると思います。）

> そのため、クラス名は wrapper とかそういう適当な名前でも大きな問題にはなりません。
> 引用元：https://blog.uhy.ooo/entry/2022-10-01/tailwind/#tailwindは命名の苦しみからあなたを解放しない

例えば、コンポーネントに含まれるDOMの階層は単一ではないためwrapperがもう一段階増えた時にどのような名称にすればよいか、私は迷いますが迷わない人もいます。そのあたりの個人の価値観も絡んでくるかもしれない議論の余地をTailwind CSSは無くしてくれて、CSSによるレイアウトに集中できます。

```jsx
<div className="wrapper">
	<div className="???"><!-- 追加、class名をsub-wrapperとwrapper-wrapper、wrapper2のどちらにするか？など -->
		<button
			disabled={disabled}
			onClick={onClick}
			className="btn"
		>
			{children}
		</button>
	</div>
</div>
```

> Tailwindを使っていたとしてもコンポーネント分割はしっかり行なったほうがよいと筆者は考えています。1つのコンポーネントに属するマークアップの塊がでかいというのは1つの関数がでかいのと同じ状態であり、通常それは望ましくありません。
> 引用元：https://blog.uhy.ooo/entry/2022-10-01/tailwind/#tailwindは命名の苦しみからあなたを解放しない

これは私も同意です。ただし、これはTailwind CSSの欠点といえば欠点ですが、前述の通り大規模や複雑なシステムの場合はコンポーネント分割をしっかり行うのは私は当然のことなので、あまり欠点とは思っていません。

同様に規模が小さく簡単なシステムなら、コンポーネントが大きくなったところを分割で十分と私は考えています。

## 「vanilla-extractとの比較」より

> vanilla-extractとの比較
> この領域においては、vanilla-extractという競合がいることは指摘するに値します。
> 引用元：https://blog.uhy.ooo/entry/2022-10-01/tailwind/#vanilla-extractとの比較

私はvanilla-extractについて知らなかったので、とても参考になりました。

CSSのクラス名の命名が不要なのでvanilla-extractを利用するパターンも有りと感じますが、私はvanilla-extractの方はCSSがHTML（JSXやテンプレート）と分離してしまうため見づらい点もあると感じます。
（これは生のCSSなどにも言えることですが、、、）

Tailwind CSSの利点として、HTMLとCSSの定義が分離しないことがあると思っていて、Tailwind CSSに慣れてくればUIの修正や調査の際にHTMLとCSSのふたつを見比べなくてよくなります。

また、uhyo様は利点を感じないとおっしゃられていましたが、短いTailwind CSSのクラス名に利点が感じられる場合も、vanilla-extractに比べてTailwind CSSを使うのも有りと感じます。

## 「Tailwindとデザインシステム」より

> 我々は普段から、ESLintなどを用いて嬉々としてプログラムに制限をかけています。デザインの場合、使える色を特定のパレットに制限するとか、長さを8pxの倍数に制限するとかして、統一感のないデザインが作られてUXの一貫性が崩れてしまうことを防ぐことができます。
> これは、まさにデザインシステムが目指すところです（筆者のデザインシステムに対する理解では）。
> 引用元：https://blog.uhy.ooo/entry/2022-10-01/tailwind/#tailwindとデザインシステム

Tailwind CSSは確かにESLintのようなものだと私も思います。私も良いTailwind CSSの例えがなかなか思い浮かばず、すごい分かりやすい例えと目から鱗で感激しました。

通常のCSSやStylusやCSS Modules、Styled Componentsなどは、例えるとESLintなしのJavaScriptで何もルールに縛られず自由に書くことができますが、統一感のないデザインやCSSの値を生み出してしまいます。
Tailwind CSSならば、ESLintの様にルールを設定して統一感のないデザインやCSSが生み出されないようにtailwind.config.jsで制御することができます。

> Tailwindの恩恵を受けられるようなデザインシステムというのは、アプリケーションの隅から隅まで、コンポーネントの色や大きさからコンポーネント間の隙間に至るまで、あらゆるスタイルがルールに縛られているようなものです。
> 引用元：https://blog.uhy.ooo/entry/2022-10-01/tailwind/#tailwindとデザインシステム

こちらは任意の値で、ルールに縛られないものを指定することができます。
任意の値はuhyo様も後述されているように、乱用するようなものでは有りません。私はこの任意の値の部分は主にチーム開発であればTailwind CSSというフレームワークやデザインシステムのルールから逸脱しても良いか、コードやUIのレビューなどで議論されるものと考えます。

レビューも通常のCSSであれば、全ての値が逸脱されていないかチェックする必要がありますが、Tailwind CSSでルールを縛ってしまえば人間のチェックをpxやrem単位から、Tailwind CSSのフレームワークやデザインシステムの範疇まで減らすことができますし、任意の値やプロパティが使われていれば、重点的にチェックする対象が分かりやすくなりますので、Tailwind CSSの任意の値は有用と考えています。

また、この任意の値は、uhyo様の例えを拝借させていただくと私はESLintの除外設定のようなものという認識です。
確かにTypeScriptでいうasのようなものは無いので意図は分かりづらくなりますが、そのような場合が気になる場合は原始的ですがHTMLのコメントやStoryBookの仕様などに残しておくと良いと思います。

もし、コメントの頻度が多い場合はtailwind.config.jsにそのユーティリティの追加を検討するべきと思います。

## 「tailwind.config.jsという砦」より

> tailwind.config.jsに変更を加えることにはすべからく慎重になるべきです。
> ESLintに置き換えて考えてみれば、誰でも自由に設定を変更できるというのはおかしいということが分かるはずです。
> 引用元：https://blog.uhy.ooo/entry/2022-10-01/tailwind/#tailwindconfigjsという砦

私も確かにそう思います。tailwind.config.jsへ追加や変更を加える場合、特に開発が進んでからの変更はなおさら慎重になるべきと思います。
（StoryBookなどでスナップショットによるリグレッションテストなどがある場合は、多少、慎重さは軽減されると思います。）

## 「まとめ」より

> 結論として、Tailwindの採用を検討してもいいと筆者が考える場合を再掲します。
> 引用元：https://blog.uhy.ooo/entry/2022-10-01/tailwind/#まとめ

この結論は、ほとんどのパターンでTailwind CSSが使えるということではないか？と思いました。

指定されたデザインがあるかないかのパターンだけなので、何かしらのデザイン指定があればそのデザイン（例えば文字の装飾や文字背景の色、角丸の角度、余白の大きさ、ボタン等の大きさなどなど）から外れることをルールで制限するために使えると考えます。

また、指定されたデザインがない場合にも、記載されている通り最低限を整えるためにTailwind CSSは使えると思います。

もし、指定のデザインがなく後からデザインが適用されることも無い場合はTailwind CSSではなく、BootstrapなどのUIフレームワークの方が効率が良いと私は感じます。UIフレームワークはTailwind CSSに詳しいならTailwind CSSベースのコンポーネントライブラリ、例えば[daisyUI](https://daisyui.com)や[Tailwind Elements](https://tailwind-elements.com)なども選択肢には入ると思いますが、現状は国内ではあまり一般的ではないので、採用は慎重になるべきと考えています。

## まとめ

私の説明が至らない部分も多いと思いますが、うまく伝わっていれば幸いです。

Tailwind CSSはそのままのCSSを自由に使ってしまう場合に比べれば、特にチーム開発においてはESLintの役割と同じようにフレームワークのルールで制限してUIを開発しやすくしてくれると感じます。
その結果、今までのCSSの苦しかった部分を解決してくれて、CSSに集中できるのでCSSを楽しくしてくれていると感じます。

[GitHubで記事を見る](https://github.com/kght6123/kght6123.page/blob/master/content/posts/TailwindCSS/uhyo様のTailwind考に関する私の考え.md)

## 引用元させていただいたブログ

「Tailwind考」
https://blog.uhy.ooo/entry/2022-10-01/tailwind/
