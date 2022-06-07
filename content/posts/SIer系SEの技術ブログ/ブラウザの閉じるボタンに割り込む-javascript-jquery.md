---
title: "ブラウザの閉じるボタンに割り込む #JavaScript #JQuery"
date: "2018-08-29"
categories: 
  - "javascript"
  - "jquery"
tags: 
  - "javascript"
  - "jquery"
---

## 経緯

過去に、間違ってブラウザを閉じない為の対策の一つとして、調べた内容になります。

## onbeforeunloadイベントを使う  

onbeforeunloadイベントで、画面遷移の前に特定の処理を実行できるイベントです。

returnで、trueまたは文字列を返すと、ブラウザ標準の確認ダイアログが表示され、確認を促せます。

JQueryは.unload()イベントになります。

## 制約

名前の通り、画面がアンロードされる前に発火するイベントなので、基本的にすべての画面遷移で発火するイベントになります。

1.  Aタグのlink、onclickに反応する
2. window.location.hrefの書き換えに反応する
3. formのsubmitでも反応する

用途として、閉じるボタンの対策だけではない・・・ということ。

## 対策

ボタンやハイパーリンクでは、onbeforeunloadイベントの警告をスキップし、

ブックマークでの移動や、URL変更、画面を閉じるなど、想定しない画面遷移のみ反応させる場合は、

一時的にフラグなどで、onbeforeunloadイベント内のチェック処理の有効・無効を切り替える必要がある。

## 影響

既存で大量に画面やボタンがあるアプリに全体的にこの処理を入れようと思うと、それなりに大変です。

新規アプリで、最初から設計思想として入れておくなどはありだと思う。

既存は、エラー画面だけとか、安易に閉じて欲しくない画面だけ対応とか、部分的な対応は有りだと思います。  

## コード

下記に、試しにコーディングしたソースと、コツを記載しています。  
よろしければ、参考にしてください。

```html
<html>
  <head>
    <script>
    var disabled_flag = false;
    
    function doBeforeUnload(e){
      if (disabled_flag == true)
        return null;// 無効にする
      
      // NG -> returnValueは設定しても何も表示されない。
      //e.returnValue = 'test';

      // NG -> confirmは使えない。
      //if(confirm("とじるよ！！"))
      //  return true;
      //else
      //  return false;

      // OK -> デフォルトメッセージ
      //return true;

      // OK -> 指定メッセージ表示 (IEのみ)
      return "ほんとうにいいの？";
    }

    window.onbeforeunload = doBeforeUnload;

    function doGoogle(){
      window.location.href='http://google.co.jp/';
      return true;
    }

    function doGoogle2(){
      disabled_flag = true;// 無効化
      window.location.href='http://google.co.jp/';
      window.onbeforeunload = doBeforeUnload;
      return true;
    }

    function doWarikomiDame(){
      disabled_flag = true;// 無効化
      return true;
    }
    function doWarikomiDameScriptSubmit(){
      disabled_flag = true;// 無効化
      document.forms[0].submit();
      return true;
    }
    </script>
  </head>
  <body>
    <form action="http://google.co.jp/">
      <a href="http://google.co.jp/">割り込みあり、Googleへ行く（href移動）</a>
      <br/>
      <a href="http://google.co.jp/" onclick="return doWarikomiDame();">割り込みなし、Googleへ行く（href移動）</a>
      <br/>
      <a href="#" onclick="return doGoogle2();">割り込みなし、Googleへ行く（href=#, onclick移動）</a>
      <br/>
      <a onclick="return doGoogle2();">割り込みなし、Googleへ行く（onclick移動）</a>
      <br/>
      <br/>
      <input type="button" value="アラート" onclick="alert('画面移動がないJavaScriptは大丈夫。');" /><br/>
      <br/>
      <input type="button" value="割り込みあり移動" onclick="return doGoogle();" /><br/>
      <input type="button" value="割り込みなし移動" onclick="return doGoogle2();" /><br/>
      <br/>
      <input type="submit" value="割り込みありサブミット" />
      <input type="submit" value="割り込みなしサブミット" onclick="return doWarikomiDame();" /><br/>
      <br/>
      <input type="button" value="割り込みありScriptサブミット" onclick="document.forms[0].submit();" /><br/>
      <input type="button" value="割り込みなしScriptサブミット" onclick="return doWarikomiDameScriptSubmit();" /><br/>
    </form>
  </body>
</html>
```

## JQueryプラグイン

下記の様な閉じるボタンに割り込む、JQueryのプラグインを作りました。  
有効・無効が簡単に切り替えられます。  

よろしければ、ご利用ください。

```js
// jquery.interruptUnload-1.0.0.js
/**
 * ページの画面遷移前にonFuncの処理を実施し、messageに指定されたメッセージを表示します。
 * 
 * 【サンプルコード】
 * // 初期化（有効にする）
 * $.interruptUnload({
 * 	on : true,
 * 	onFunc : function() {
 * 	    
 * 	},
 * 	message : "ブラウザの閉じる／更新などの操作は推奨されていません。\r\n「ページに留まる」を選択してください。"}
 * );
 * 
 * // 初期化後に無効にする
 * $.offInterruptUnload();
 * 
 * // 初期化後に有効にする
 * $.onInterruptUnload();
 *
 * // 初期化後に有効にしつつ、onFuncの処理とメッセージを変える
 * $.onInterruptUnload(function() {
 *     // onFuncの処理
 * }, "新しいアンロード前メッセージを渡す");
 **/
;(function() {
	
	function setup($) {
		
		$.offFuncInterruptUnload = function(){
			return true;
		};
		
		$.offInterruptUnloadReload = function(_url){
			return $.interruptUnload({ on : false, offFunc : function(){
				window.location.href=_url;
				return true;
			}});
		};
		
        $.onInterruptUnload = function(){
			return $.interruptUnload({ on : true });
		}
        $.onInterruptUnloadFunc = function(_onFunc, _message){
			return $.interruptUnload({ on : true, onFunc : _onFunc, message : _message });
		}
        
		$.offInterruptUnload = function(){
			return $.interruptUnload({ on : false });
		}
		$.offInterruptUnloadFunc = function(_offFunc){
			return $.interruptUnload({ on : false, offFunc : _offFunc });
		}
		
		$.interruptUnload = function(opts) {
			
			if(opts.on != undefined) {
				if(opts.on == true) {
					install();
				} else {
					uninstall();
				}
			}
			
			if(opts.onFunc != undefined) {
				$.onFuncInterruptUnload = opts.onFunc;
			}
			
			if(opts.offFunc != undefined) {
				$.offFuncInterruptUnload = opts.offFunc;
			}
			
			if(opts.message != undefined) {
				$.interruptMessage = opts.message;
			}
			
			if(opts.on != true && typeof $.offFuncInterruptUnload === 'function') {
				return $.offFuncInterruptUnload();
			}
		};
		
		install();
	}
	
	function install() {
		$(window).off(".interruptUnload");
		
		$(window).on("beforeunload.interruptUnload",function(e){
			
			if(typeof $.onFuncInterruptUnload === 'function') {
				$.onFuncInterruptUnload();
			}
			
			if($.interruptMessage != undefined)
				return $.interruptMessage;
			else
				return "本当に離れますか？";
		});
	}
	
	function uninstall() {
		$(window).off(".interruptUnload");
	}
	
	/*global define:true */
	if (typeof define === 'function' && define.amd && define.amd.jQuery) {
		define(['jquery'], setup);
	} else {
		setup(jQuery);
	}
})();
```
