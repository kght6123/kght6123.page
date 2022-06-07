---
title: "WordPressにダークテーマのGistを埋め込む（子テーマ）"
date: "2018-07-01"
categories: 
  - "github"
  - "wordpress"
tags: 
  - "github"
  - "wordpress"
---

巷でダークテーマが流行しそうなので・・・

子テーマを使って、WordPress公式の「Twenty Sixteen」テーマのレイアウト微調整と、**Gistのダークテーマ化**を行いました。

適用はwordpressのplugins直下に、twentysixteen-childフォルダーを作成し、下記の2つのファイルを配置します。 その後、ダッシュボードでテーマを「Twenty Sixteen Child」に変更してください。

```php
// functions.php
<?php

function theme_enqueue_styles() {
	// 親CSSの読み込み
	wp_enqueue_style('parent-style', get_template_directory_uri() . '/style.css' );
	// 親CSSを継承して、子CSSの読み込み
	wp_enqueue_style('child-style', get_stylesheet_directory_uri() . '/style.css', array('parent-style'));
}
// テーマスタイル読み込みアクションをスクリプトキューに追加
add_action('wp_enqueue_scripts', 'theme_enqueue_styles');

// wordpressにインストールされているjqueryを無効にする関数
add_filter('init',function(){
	if (!is_admin()){
		wp_deregister_script('jquery');
	}
});
?>
<?php
	// GistのURLを貼り付けた時のハンドラーを登録
	wp_embed_register_handler( 'gist', '/https?:\/\/gist\.github\.com\/([a-z0-9]+)\/([a-z0-9]+)(\?file=.*)?/i', function( $matches, $attr, $url, $rawattr ) {
		// GistのScriptタグを埋め込む
		$embed = sprintf(
			'<script src="https://gist.github.com/%1$s/%2$s.js%3$s"></script>',
			esc_attr( $matches[1] ),
			esc_attr( $matches[2] ),
			esc_attr( $matches[3] )
			);
		// タグ（embed_gist）に付与されたコールバック関数を更に呼び出し
		return apply_filters( 'embed_gist', $embed, $matches, $attr, $url, $rawattr );
	});
?>
```

```css
/* style.css */
/*
Theme Name: Twenty Sixteen Child
Theme URI: https://wordpress.org/themes/twentysixteen/
Author: kght6123
Author URI: https://github.com/kght6123/
Description: Twenty Sixteen Child Theme.
Version: 1.0.0
License: GNU General Public License v2 or later
License URI: http://www.gnu.org/licenses/gpl-2.0.html
Text Domain: twentysixteen-child
Tags: 
Template: twentysixteen
Twenty Sixteen Child Theme. Ballon include and Gist OK.
*/

body {
	background-color: #111 !important;
	background: #111 !important;
}
.site {
	background-color: #2C2C2C !important;
}
.widget {
	border-top: 0 !important;
	margin-bottom: 0 !important;
	padding: 0.5em !important;
}
.widget-title {
	margin: 0 0 0.5em 0 !important;
}
.widget-area {
	background-color: rgba(0, 0, 0, 0) !important;
}
.site-header {
	padding: .5em 7.6923% 3.5em !important;
}
.site-footer {
	padding: 0 0 .25em 2em !important;
}
/* FooterのタイトルとWordpressを消す 
footer .site-info {
	display: none;
}*/
.post-navigation {
	border-top: 0;
	border-bottom: 0;
	margin: 0 7.6923% 0;
}

.widget-area ul li {
	position: relative;
	list-style: none;
	padding-bottom: .25em;
}
.widget-area ul li::after {
	display: block;
	content: '';
	position: absolute;
	top: .45em;
	left: -1.25em;
	width: 9px;
	height: 9px;
	border-right: 3px solid #666;
	border-bottom: 3px solid #666;
	-webkit-transform: rotate(-45deg);
	transform: rotate(-45deg);
}

/* コメントエリア */
.comments-title, .comment-reply-title,
.comment-list + .comment-respond, .comment-navigation + .comment-respond,
.comment-form {
	border-top: 0 !important;
	padding-top: 0em;
}
.site-main {
	margin-bottom: 2.5em;
}
article {
	margin-bottom: 2.5em !important;
}

/* Gist Bootstrapとの競合対策
.gist .file {
	height: auto;
} */

/* Gistダークテーマ */
/* Line Numbers */
.gist-data tbody td:nth-of-type(1) {
	color: #666 !important;
}
/* Code */
.gist-data tbody td:nth-of-type(2){
	color: #ddd !important;
	left: 1.5em;
}
/* All & Footer & body */
.gist-data, .gist-data table, .gist-data tbody {
	background-color: #333 !important;
	color: #ccc !important;
}
.gist-meta, .gist-meta * {
	background-color: #393939 !important;
	color: #ccc !important;
}
.gist {
	background-color: rgba(0, 0, 0, 0) !important;
	color: #ccc !important;
}
.gist, .gist-data, .gist-data table td, .gist-file, .gist-meta {
	border: 1px solid rgba(0, 0, 0, 0) !important;
}
.gist-data {
	border-radius: 7px 7px 0 0 !important;
}
.gist-meta {
	border-radius: 0 0 7px 7px !important;
}
/* Comments */
.pl-c
{
	color: #57A64A !important;
}
/* Function */
.pl-k
{
	color: rgb(229, 173, 255) !important;
}
/* Function Name */
.pl-en
{
	color: rgb(255, 173, 230) !important;
}
/* Function Method */
.pl-c1
{
	color: rgb(255, 196, 196) !important;
}
/* "'s around Strings */
.pl-pds
{
	color: rgb(204, 173, 255)  !important;
}
/* Strings */
.pl-s
{
	color: rgb(204, 173, 255)  !important;
}
/* val */
.pl-smi
{
	color: rgb(159, 193, 255) !important;
}

/* PC表示時のコンテンツの表示領域を調整 */
@media screen and (min-width: 61.5625em) {
	.entry-content {
		margin-right: 15% !important;
		margin-left: 15% !important;
		width: 70% !important;
		float: none !important;
	}
	.entry-footer {
		margin-top: 1em !important;
		margin-right: 15% !important;
		margin-left: 15% !important;
		display: block !important;
		float: none !important;
		width: auto !important;
	}
	.entry-footer span {
		display: inline !important;
	}
	.entry-footer > span:not(:last-child):after {
		content: "\002f" !important;
		display: inline-block !important;
		opacity: 0.7 !important;
		padding: 0 0.538461538em !important;
	}
	.avatar {
		width: 21px !important;
		height: 21px !important;
		display: inline-block !important;
		margin-right: 7px !important;
	}
}
@media screen and (min-width: 56.875em) {
	.entry-header {
		margin-right: 15% !important;
		margin-left: 15% !important;
	}
}
```
