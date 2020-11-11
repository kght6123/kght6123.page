---
sortNo: 15
title: 文字列とTimestamp型を相互変換する
eyecatchImage: ['/images/posts/java-logo.jpg',800,533]
thumbnailImage: ['/images/posts/sm/java-logo.jpg',800,533]
tags: ['Java']
---

## 解説

文字列からTimestamp型への変換は、Javaの`MessageFormat`を使って、

文字列の年〜秒までの部分を日付（Date型）で取得し、ミリ秒〜マイクロ秒は、数値（Int型）で取得して

その取得した値を、新しく作ったTimestamp型に適用することで実現しています。


Timestamp型から文字列への変換にも、Javaの`MessageFormat`を使って、上記と逆のことをして変換しています。

（Javaの`MessageFormat`はめちゃくちゃ便利！）

あと、おまけにJavaの現在時刻をTimestampで取得する関数と、DB（Oracle）の現在時刻をTimestampで取得する関数も準備しています。

## ソースコード

```java
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Timestamp;
import java.text.MessageFormat;
import java.text.ParseException;
import java.util.Date;

public class TimestampUtil {
	
	/**
	 * Timestampを文字列に変換する（マイクロ秒考慮）
	 * 
	 * @param ts
	 * @return
	 */
	public static String toString(final Timestamp ts) {
		final MessageFormat mf = 
				new MessageFormat("{0,date,yyyy-MM-dd-HH.mm.ss}.{1,number,000000}");
		return mf.format(new Object[] { ts, (long)ts.getNanos() / (long)1000});
	}
	
	/**
	 * 文字列をTimestampに変換する（マイクロ秒考慮）
	 * 
	 * @param str
	 * @return
	 * @throws ParseException
	 */
	public static Timestamp toTimestamp(final String str) throws ParseException {
		final MessageFormat mf = 
				new MessageFormat("{0,date,yyyy-MM-dd-HH.mm.ss}.{1,number,000000}");
		final Object[] objects = mf.parse(str);
		
		final Timestamp ts = new Timestamp(((Date)objects[0]).getTime());
		ts.setNanos(long2int((long)objects[1]) * 1000);
		return ts;
	}
	
	private static int long2int(long l) {
		return Integer.parseInt(Long.toString(l));
	}
	
	/**
	 * Databaseの現在時刻をTimestamp型で取得する
	 * 
	 * @param conn
	 * @param logger
	 * @return
	 * @throws SQLException
	 */
	public static Timestamp getNowTimestampForDatabase(final Connection conn, final Logger logger) throws SQLException
	{
		
		try (final PreparedStatement stmt = conn.prepareStatement("select systimestamp as ts from dual");
				final ResultSet rs = stmt.executeQuery();)
		{
			if(rs.next())
				return rs.getTimestamp(1);
			else
				throw new SQLException("SYSTIMESTAMPが取得できません");
		}
	}
	
	/**
	 * Javaの現在時刻をTimestamp型で取得する
	 * 
	 * @return
	 */
	public static Timestamp getNowTimestampForJava()
	{
		final long timeInMillis = System.currentTimeMillis();
		final long timeInNanos = System.nanoTime();
		final Timestamp timestamp = new Timestamp(timeInMillis);
		timestamp.setNanos((int)(timeInNanos % 1000000000));
		return timestamp;
	}
}
```