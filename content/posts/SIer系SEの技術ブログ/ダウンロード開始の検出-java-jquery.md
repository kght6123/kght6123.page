---
title: "ダウンロード開始の検出 #Java #JQuery"
date: "2018-07-06"
categories: 
  - "java"
  - "javascript"
  - "jquery"
tags: 
  - "java"
  - "javascript"
  - "jquery"
---

サーバサイドで、巨大なExcelファイル（Apache POI利用）を長時間作成するので、 **ダウンロードの開始を画面で検知**し、**処理中の状態を表示**できるようにしました。

ServletとJQueryでCookieをやり取りするレガシーな処理です。 **Cookieはダウンロードするファイルと一緒に、レスポンス（Header）として返す事ができます。**

ダウンロード中に表示されるプログレスボタンは、JQuery-UIのプログレスを想定しています。


```js
// file-download.js

// セッションIDから、ファイル作成処理毎の一意のキーを作る
var downloaded_key = "downloaded@"+"<%=session.getId() %>";
var downloading = false;

// clickイベント設定（"id="は同じIDが複数存在した場合、通常は"#"で良い）
$("[id=btn-excel]",parent.document).click(function() {
	
	downloading = true;
	
	// 通常ボタンを非表示に
	$('[id=btn-excel]',parent.document).hide();
	
	// プログレスボタンを表示に
	$('[id=progress-excel]',parent.document).show();
	
	// 前回のキーをリセット（消去）
	$.removeCookie(downloaded_key, { path: "/" });
	
	// ファイル作成処理をリクエスト（サブミット）
	$('#excel-form').submit();
});


$("#excel-form").submit(function() {
	// ダウンロードキーがCookieに保存された（ファイル作成処理完了）か、1秒毎にチェックする
	var timerId = setInterval(function() {
			if($.cookie(downloaded_key))
			{
				// キーをリセット（消去）
				$.removeCookie(downloaded_key, { path: "/" });
				
				// プログレスボタンを非表示に
				$('[id=progress-excel]', parent.document).hide();
				
				// 通常ボタンを表示に
				$('[id=btn-excel]', parent.document).show();
				
				downloading = false;
				
				// チェックをやめる
				clearInterval(timerId);
			}
		}, 1000
	);
});
```

```jsp
file-download.jsp
<button id="progress-excel" />
<button id="btn-excel" />
```

```java
// ダウンロード完了をCookieで保存
CookieUtil.saveCookie("downloaded@"+structure.getSession().getId(), "true", -1, structure.getResponse(), structure.getLogger());
```


```java
// CookieUtil.java

/**
 * Cookieへ値を保存する
 * 
 * @param key
 * @param value
 * @param response
 * @param logger
 */
public static void saveCookie
(
	final String key,
	final String value,
	final int maxAge,
	final HttpServletResponse response,
	final Logger logger
)
{
	if(StringUtils.isEmpty(value))
		return;
	
	final Cookie cookie = new Cookie(key, value);
	cookie.setMaxAge(maxAge);
	cookie.setPath("/");
	response.addCookie(cookie);
}
```
