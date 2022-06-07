---
title: "#Java でナノ秒を扱う最善の方法を探る（Timestamp型とString型の相互変換）"
date: "2018-07-02"
categories: 
  - "java"
  - "プログラミング"
tags: 
  - "java"
---

MessageFormatを利用して、**秒まではDate、ミリ秒以降はNumberで扱う**ことを考えました。

よく利用する日付フォーマットのパターンはenum化しています。

ついでに**JavaとDBの現在のシステム日時をナノ秒まで取得**する関数も追加しました。

```java
// TimestampUtil.java
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Timestamp;
import java.text.MessageFormat;
import java.text.ParseException;
import java.util.Date;

import org.apache.commons.lang.StringUtils;
import org.apache.log4j.Logger;

public class TimestampUtil {
	
	/**
	 * 数字のみフォーマット
	 */
	private static final ThreadLocal<MessageFormat> NUMBER_ONLY_FORMAT = new ThreadLocal<MessageFormat>() {
		@Override protected MessageFormat initialValue() {
			// 間に何か記号がないとparseでエラーに、URLの予約文字を避けて-か_にする。
			return new MessageFormat("{0,date,yyyyMMddHHmmss}-{1,number,000000000}");
		}
	};
	
	/**
	 * 標準フォーマット
	 */
	private static final ThreadLocal<MessageFormat> TIMESTAMP_FORMAT = new ThreadLocal<MessageFormat>() {
		@Override protected MessageFormat initialValue() {
			return new MessageFormat("{0,date,yyyy/MM/dd HH:mm.ss}.{1,number,000000000}");
		}
	};
	
	/**
	 * 対応する日付フォーマット一覧
	 */
	public enum TimestampFormat {
		NUMBER_ONLY(NUMBER_ONLY_FORMAT),
		NORMAL(TIMESTAMP_FORMAT),
		;
		private final ThreadLocal<MessageFormat> mftl;
		private TimestampFormat(final ThreadLocal<MessageFormat> mftl) {
			this.mftl = mftl;
		}
		public MessageFormat getMessageFormat() {
			return mftl.get();
		}
	}
	
	/**
	 * Timestampを文字列に変換する（null, ナノ秒考慮）
	 * 
	 * @param ts
	 * @param tf
	 * @return
	 */
	public static String toString(final Timestamp ts, final TimestampFormat tf) {
		if(ts == null)
			return "";
		
		return tf.getMessageFormat().format(new Object[] { ts, ts.getNanos() });
	}
	
	/**
	 * 文字列をTimestampに変換する（null, ナノ秒考慮）
	 * 
	 * @param str
	 * @param tf
	 * @return
	 * @throws ParseException
	 */
	public static Timestamp toTimestamp(final String str, final TimestampFormat tf) throws ParseException {
		if(StringUtils.isEmpty(str))
			return new Timestamp(0L);
		
		final Object[] objects = tf.getMessageFormat().parse(str);
		final Timestamp ts = new Timestamp(((Date)objects[0]).getTime());
		
		if(objects[1] instanceof Long)
			ts.setNanos(((Long)objects[1]).intValue());
		else if(objects[1] instanceof Integer)
			ts.setNanos((Integer)objects[1]);
		
		return ts;
	}
	
	/**
	 * 文字列を別のTimestampFormatに変換する（ナノ秒考慮）
	 * 
	 * @param str
	 * @param fromTf
	 * @param toTf
	 * @return
	 * @throws ParseException
	 */
	public static String toTimestampFormat(final String str, final TimestampFormat fromTf, final TimestampFormat toTf) throws ParseException {
		
		return toString(toTimestamp(str, fromTf), toTf);
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
	 * Javaの現在時刻をTimestamp型で取得する（どこまでのナノ秒をサポートしているかはOSによる）
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
