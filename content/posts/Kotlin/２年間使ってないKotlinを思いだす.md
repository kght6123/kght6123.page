---
sortNo: 17
title: ２年間使ってないKotlinを思いだしたい！
description: 'KotlinでAndroidアプリ作ったり、Ktor触ったりしてたので思いだしたい！'
eyecatchImage: ['/images/posts/kotori.jpg',1600,1066]
thumbnailImage: ['/images/posts/sm/kotori.jpg',1600,1066]
tags: ['Kotlin']
---

昔（２年ぐらい前に）、よく使っていたKotlinとJavaの記法をすっかり忘れているので

どちらも効率よく思いだすために、よく使っていたJavaとKotlinの記法をいろいろ比べてみました！

（ついでに、昔、触っていたKotlinやKtorの現状、今はやっているっぽいフレームワークをまとめてみました！）

JavaとKotlinが少しわからないと読めないかも。よろしければ、参考まで・・・

## 定数と変数

Kotlinは、変数の宣言時に`var`と書くと変数、`val`と書くと定数になり記述量が少ないです。

Javaのように、毎回毎回、定数にするときに`final`と書かなくてよいです。

## Null安全

### Kotlinの場合

Kotlinは、変数の宣言時にnullが入る可能性があるかを予め決めておくことで

その変数の参照時にはnullチェックを強制（nullチェックがないとコンパイルエラーになる）して、

極力、NullPointerExceptionを起こさないようにコーディングすることができます。

```kotlin
val value: String?          // nullの代入が可能
val value: String = "hello" // nullの代入が不可能（宣言時に、何らかの値を代入する必要がある）
```

さらに、nullチェックと関数の呼び出しを簡単に記述することができます。

```kotlin
value?.let(this::add) // valueがnullならば、letを呼び出さない
```

### Javaの場合

一応、Javaでも`java.util.Optional`を使うことで、null安全に参照できますが

Kotlinのような手軽さはありません。

```java
public Optional<String> getValue() {
	//
	// nullの可能性をOptionalでラップする
	//
	//  -> 空：「Optional.empty()」
	//  -> nullの可能性有：「Optional.ofNullable()」
	//  -> nullの可能性無：「Optional.of()」
	//
	return Optional.ofNullable(value);
}
```

```java
// null以外のとき、addメソッドが呼ばれる
getValue().ifPresent(this::add);
```

## クラスとコンストラクタの書き方

### Kotlinの場合

Javaと違って、ファイル名とクラス名を合わせる必要はないです

関数のように引数のデフォルト値が設定できる

```kotlin
class Hello(val value: String?, val text: String?) {
```

親クラス（例だと、`World`）への引数は下記のように書く

```kotlin
class Hello(val value: String?, val text: String?) : World(text) {
```

もし、複数のコンストラクタが必要な場合は、下記のように書く

```kotlin
class Hello {
    constructor(val value: String?, val text: String?) {
        // 一つ目
    }
    constructor(val hello: Hello) {
        // 二つ目
    }
}
```

### Javaの場合

```java
public class Hello {
	private final String value;
	private final String text;

	public Hello(final String value, final String text) {
		super();
		this.value = value;
		this.text = text;
	}

	public Hello(final Hello hello) {
		super();
		this.value = hello.value;
		this.text = hello.text;
	}
```

#### 内部クラス

Javaはクラスの中に、内部クラスが書ける。内部クラスはstaticにすることもできる。

```java
public class Main {

	public static class Hello {
```

## クラス変数の初期化の遅延（Kotlinのみ）

Kotlinは、後からクラス変数の初期化をしてもnot nullで行うことができます。

Kotlinはnot null変数（?なし）の宣言時に、何らかの値を代入する必要がありますが、

lateinitを使うと代入を遅らせつつ、not nullな初期化済みの変数としてアクセスできます。

（初期化がされていないと、コンパイルエラーになります！）

```kotlin
class Hello {
	lateinit var afterInitValue : String

	fun init(): Hello {
		afterInitValue = "Init!!!"
		return this
	}
}
```



作成中・・・
