---
sortNo: 16
title: 総称型に対応したLazyListクラスを作った
eyecatchImage: ['/images/posts/java-logo.jpg',800,533]
thumbnailImage: ['/images/posts/java-logo.jpg',800,533]
tags: ['Java']
---

## 解説

JavaのListでインデックスの範囲外にaddしたり、setしてもエラー（IndexOutOfBoundsException）にならないListクラスを作りました。

apacheのcommons-collectionsの1.0系に含まれる、LazyListを総称型に対応したようなイメージです。

（今、最新のcommons-collectionsの4.0系で総称型に対応しているので、このコードは不要です。）

## ソースコード

```java
// 自作のLazyList（ジェネリクス対応版）
public interface Factory<T> extends Serializable
{
	public T create();
}

import java.util.ArrayList;
import java.util.Collection;

public class LazyList<T> extends ArrayList<T>
{
	private static final long serialVersionUID = 1L;
	
	private final Factory<T> factory;
	
	public LazyList(Collection<T> o, Factory<T> factory)
	{
		super(o);
		this.factory = factory;
	}
	
	@Override
	public T get(int index)
	{
		while(super.size() <= index)
		{
			super.add(factory.create());
		}
		return super.get(index);
	}
	
	@Override
	public T set(int index, T element)
	{
		while(super.size() <= index)
		{
			super.add(factory.create());
		}
		return super.set(index, element);
	}
}
```
