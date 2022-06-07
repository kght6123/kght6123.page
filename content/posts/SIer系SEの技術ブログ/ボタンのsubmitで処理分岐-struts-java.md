---
title: "ボタンのSubmitで処理分岐 #Struts #Java"
date: "2018-07-16"
categories: 
  - "java"
  - "struts"
tags: 
  - "java"
  - "struts"
---

`input type="submit"`は、`value`が表示と値(value)を兼ねているので、

表示される日本語を含む文字が、サーバ側に送信されます。

そのため、日本語でどのボタンが押下されたか判別する必要がありました。

（別途、非表示の値をJavaScriptで修正してSubmitする方法もあります。）

最近のブラウザの`button`タグでは、サーバへ送信する値(value)とラベルの定義(タグの内容)が完全に別けられており、

ボタンの定義だけで、日本語を含む文字の判定が不要になります。

Strutsは昔のフレームワークですが、まだ一部で広く使われています。。。

```jsp
<%-- test.jsp --%>
<html:form action="/test">
  <!-- buttonタグでsubmitボタンを記述 -->
  <button type='submit' name='action' value='send'>送信</button>
  <button type='submit' name='action' value='save'>下書き保存</button>
  
  <!-- inputタグでsubmitボタンを記述 -->
  <input type='submit' name='oldAction' value='下書き保存(旧)' />
  
  <html:hidden property="forwardTo" value="xxx"/>
</form>
```

```java
// TestForm.java
public class TestForm extends ActionForm {
  public String action;
  public String forwardTo;
  
  public String oldAction;
  // --- getter/setterは省略する ---
}
```

```java
// TestAction.java
public class TestAction extends Action {
  public ActionForward execute(
      final ActionMapping mapping,
      final ActionForm form,
      final HttpServletRequest request,
      final HttpServletResponse response
  ) throws Exception {
    final TestForm testForm = (TestForm)form;
    
    // buttonタグのvalueで判定
    if("send".equals(testForm.getAction())) {
      // 送信ボタンの処理
      // TODO
      return(mapping.findForward(testForm.getForwardTo()));
    } else if("save".equals(testForm.getAction())) {
      // 下書き保存ボタンの処理
      // TODO
      return(mapping.findForward(testForm.getForwardTo()));
    }
    
    // inputのvalueで判定（valueが日本語のとき、日本語で判定する必要がある）
    if("下書き保存(旧)".equals(testForm.getOldAction())) {
      // 下書き保存ボタン(旧)の処理
      // TODO
      return(mapping.findForward(testForm.getForwardTo()));
    }
  }
}
```
