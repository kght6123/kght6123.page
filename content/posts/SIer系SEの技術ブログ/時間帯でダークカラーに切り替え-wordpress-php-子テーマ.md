---
title: "時間帯でダークカラーに切り替え #Wordpress #PHP #子テーマ"
date: "2018-08-01"
categories: 
  - "wordpress"
tags: 
  - "php"
  - "wordpress"
  - "ダークカラー"
  - "ライトカラー"
  - "子テーマ"
---

移行前のブログはWorkpressのデフォルトテーマを親テーマとし、

子テーマでレイアウトをカスタマイズして、全体的にダークカラーに変更しています。

単純に目に優しいのと、黒ベースの方が写真が映えると思い採用しました。汗

かなり、ダークな雰囲気で、個人的にはすごく気に入っていますが、

日中はライトカラーの方が文字が見やすくて、朝ならそんなに目は疲れてないし

ダークカラーじゃないパターンがあっても良いなーと思って、

時間帯で、ダークカラーとライトカラーが切り替わるようにしました。

下記はそのPHP側のコードです。

CSSは[Gist](https://gist.github.com/kght6123/d8975c0dd4ee2dcbc9df9e390d1db8d5)に貼り付けているので、よろしければ参考にしてください。

```php
<?php
function kght_theme_enqueue_styles() {
	// 親CSSの読み込み
	wp_enqueue_style('parent-style', get_template_directory_uri() . '/style.css' );
  
	// 親CSSを継承して、子CSSの読み込み
	wp_enqueue_style('child-style', get_stylesheet_directory_uri() . '/style.css', array('parent-style'));
  
  // タームゾーンを指定
	date_default_timezone_set('Asia/Tokyo');
  
  // リクエストパラメータの値を取得
	$kght_style_mode = get_query_var('kght_style_mode', 'none');
	// 現在時刻を数値で取得
  $time_hour = idate('H');
  
	if (strcmp($kght_style_mode, 'light') == 0) {
		// ライトカラーが指定されていたとき
		kght_light_enqueue_styles();
	} elseif (strcmp($kght_style_mode, 'dark') == 0) {
		// ダークカラーが指定されていたとき
		kght_dark_enqueue_styles();
	} elseif (5 <= $time_hour && $time_hour <= 17) {
		// ライトカラー（4時～17時）のとき
		kght_light_enqueue_styles();
	} elseif (17 <= $time_hour && $time_hour <= 24) {
		// ダークカラー（17時～24時）のとき
		kght_dark_enqueue_styles();
	} else {
		// デフォルトはダークカラー
		kght_dark_enqueue_styles();
	}
}
function kght_dark_enqueue_styles(){
	// ダークカラー用のCSSの読み込み
	wp_enqueue_style('dark-style', get_stylesheet_directory_uri() . '/dark.css', array('child-style'));
}
function kght_light_enqueue_styles(){
	// ライトカラー用のCSSの読み込み
	wp_enqueue_style('light-style', get_stylesheet_directory_uri() . '/light.css', array('child-style'));
}
function kght_add_query_vars_filter( $vars ){
  // 強制的にダーク・ライトカラーを切り替えるリクエストパラメータを追加
	$vars[] = "kght_style_mode";
	return $vars;
}

// テーマスタイル読み込みアクションをスクリプトキューに追加
add_action('wp_enqueue_scripts', 'kght_theme_enqueue_styles');

// カスタムクエリ変数を追加
add_filter('query_vars', 'kght_add_query_vars_filter');

?>
```

適用すると、時間帯でカラーが変わりますが、

下記の様にリクエストパラメーターで、強制的にカラーを切り替えることもできます。

ダークカラーへ https://Wordpressのアドレス/?kght_style_mode=dark

ライトカラーへ https://Wordpressのアドレス/?kght_style_mode=light
