---
sortNo: 8
title: 設定ファイル不要で標準出力にLog4jを使いたい
eyecatchImage: ['/images/posts/java-logo.jpg',800,533]
thumbnailImage: ['/images/posts/java-logo.jpg',800,533]
tags: ['Java', 'Log4j', 'CLI']
---

## 解説

Javaで、さくっとCLIのアプリケーションを作るときに、

他のlog4jを使って実装された古いロジックを流用するために

log4jを使いたいことがあるので

その時によく使う自作のユーティリティを紹介します！

（最近は、SLF4Jを使って実装を統一した方が良いと思う・・・💦）

下記のような感じで、一意のロガーの名前を指定すると、ログ出力に使えるLoggerが作成されます。

```java
final Logger logger = Log4jUtils.newConsoleCsvAllLogger("hello");
```

その後は、こんな感じでログ出力ができます。

```java
logger.debug("world");
```

## ソースコード

```java
import org.apache.log4j.Appender;
import org.apache.log4j.ConsoleAppender;
import org.apache.log4j.Layout;
import org.apache.log4j.Level;
import org.apache.log4j.Logger;
import org.apache.log4j.PatternLayout;
import org.apache.log4j.SimpleLayout;
import org.apache.log4j.TTCCLayout;

public class Log4jUtils {
	
	// 一番基底のLoggerを作るだけのメソッド
	public static Logger newLogger(final String name, final Appender appender, final Level level) {
		final Logger logger = Logger.getLogger(name);
		logger.addAppender(appender);
		logger.setLevel(level);
		return logger;
	}
	
	// SimpleLayoutでログを標準出力するLoggerを作るメソッド
	public static Logger newConsoleSimpleAllLogger(final String name) {
		return newConsoleAllLogger(name, new SimpleLayout());
	}
	
	// TTCCLayoutでログを標準出力するLoggerを作るメソッド
	public static Logger newConsoleTTCCAllLogger(final String name) {
		return newConsoleAllLogger(name, new TTCCLayout());
	}
	
	// PatternLayout（CSV）でログを標準出力するLoggerを作るメソッド
	public static Logger newConsoleCsvAllLogger(final String name) {
		return newConsolePatternAllLogger(name, "%d{yyyy/MM/dd HH:mm:ss.SSS},%x,%r,%t,%-5p,%m%n");
	}
	
	// PatternLayout（パターンは指定する）でログを標準出力するLoggerを作るメソッド
	public static Logger newConsolePatternAllLogger(final String name, final String pattern) {
		return newConsoleAllLogger(name, new PatternLayout(pattern));
	}
	
	// コンソールにログを出力するLoggerを作るだけのメソッド
	public static Logger newConsoleAllLogger(final String name, final Layout layout) {
		return newLogger(name, new ConsoleAppender(layout), Level.ALL);
	}
}
```
