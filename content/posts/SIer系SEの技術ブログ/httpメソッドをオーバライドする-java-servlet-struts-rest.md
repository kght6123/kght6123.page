---
title: "HTTPメソッドをオーバライドする #Java #Servlet #Struts #REST"
date: "2018-08-26"
categories: 
  - "java"
  - "struts"
---

strutsのアクション内の処理分岐を、REST APIの様にHTTPメソッドで行えないか悩んでいたところ、

下記の様にHttpServletRequestをラップする事で上手くいきました。

```java
public class HttpMethodOverrideServletRequest extends HttpServletRequestWrapper
{
  private final static String _METHOD = "_method";
  private final static String X_METHOD_OVERRIDE = "X-Method-Override";
  private final static String X_HTTP_METHOD_OVERRIDE = "X-HTTP-Method-Override";
  
  public HttpMethodOverrideServletRequest(final HttpServletRequest request)
  {
    super(request);
  }
  @Override
  public String getMethod() {
    
    final String[] methodOverrideValues = 
        new String[]{
          getParameter(_METHOD),
          getParameter(_METHOD.toUpperCase()),
          getParameter(X_METHOD_OVERRIDE.toLowerCase()),
          getParameter(X_METHOD_OVERRIDE.toUpperCase()),
          getParameter(X_HTTP_METHOD_OVERRIDE.toLowerCase()),
          getParameter(X_HTTP_METHOD_OVERRIDE.toUpperCase()),
          getHeader(X_METHOD_OVERRIDE),
          getHeader(X_METHOD_OVERRIDE.toUpperCase()),
          getHeader(X_HTTP_METHOD_OVERRIDE),
          getHeader(X_HTTP_METHOD_OVERRIDE.toUpperCase()),
    };
    
    for(final String methodOverrideValue : methodOverrideValues) {
      if (StringUtils.isNotEmpty(methodOverrideValue))
        return methodOverrideValue;
    }
    return super.getMethod();
  }
}
```

HTTPメソッドのオーバライドの仕様に乗っ取り、

リクエストパラメーターやリクエストヘッダーに"\_method" "X-Method-Override" "X-HTTP-Method-Override"のパラメーターがあれば、

本来、HttpServletRequest#getMethod()で返しているHTTPメソッドより、優先します。

HttpServletRequestのラップは、下記の様にFilterで行います。

```java
@WebFilter(filterName="HttpMethodOverrideFilter", urlPatterns="/*", servletNames="action")
public class HttpMethodOverrideFilter
  implements Filter
{
  public HttpMethodOverrideFilter(){}
  
  public void init(final FilterConfig config) throws ServletException {}
  public void destroy(){}

  public void doFilter(final ServletRequest request, final ServletResponse response, final FilterChain chain) throws IOException, ServletException
  {
    if(request instanceof HttpServletRequest)
      chain.doFilter(new HttpMethodOverrideServletRequest((HttpServletRequest)request), response);
    else
      chain.doFilter(request, response);
  }
}
```

Struts1系の場合は、ActionServletがHttpServletのdoPut、doDeleteに対応していないので

下記の様に、ActionServletをオーバライドして、doPut、doDeleteの時にActionServlet#doPostが実行される様にします。

```java
public class ActionServlet extends org.apache.struts.action.ActionServlet {
  
  /**
   * 削除
   */
  @Override
  protected void doDelete(
      final HttpServletRequest req,
      final HttpServletResponse resp) throws ServletException, IOException {
    super.doPost(req, resp);// doPostへ
  }
  
  /**
   * 作成＆更新
   */
  @Override
  protected void doPut(
      final HttpServletRequest req,
      final HttpServletResponse resp) throws ServletException, IOException {
    super.doPost(req, resp);// doPostへ
  }
  
  /**
   * 読込
   */
  @Override
  public void doGet(
      final HttpServletRequest req,
      final HttpServletResponse resp) throws IOException, ServletException {
    super.doGet(req, resp);
  }
  
  /**
   * 作成
   */
  @Override
  public void doPost(
      final HttpServletRequest req,
      final HttpServletResponse resp) throws IOException, ServletException {
    super.doPost(req, resp);
  }
}
```

これで、HTTPメソッドがオーバーライドされ、HttpServletRequest#getMethod()の結果が、PUTやDELETEに変わる様になります。  

* * *

今、Struts1.2.9 SP3をコアに、今の新しいライブラリや概念を組み合わせて

アレンジして使いやすくするとしたら、、、という試みを行ってます。

主にThymeleaf、REST APIの思想などを組み入れ、素のstrutsより開発に手間が掛からなくなる様な仕組みを入れようと模索しています。

GitHubで公開しているので、よろしければご覧ください。

**[https://github.com/kght6123/smart-struts1](https://github.com/kght6123/smart-struts1)**

以　上
