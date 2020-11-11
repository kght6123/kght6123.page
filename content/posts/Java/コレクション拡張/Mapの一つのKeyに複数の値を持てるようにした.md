---
sortNo: 12
title: Mapの一つのKeyに複数の値を持てるようにした
eyecatchImage: ['/images/posts/java-logo.jpg',800,533]
thumbnailImage: ['/images/posts/sm/java-logo.jpg',800,533]
tags: ['Java']
---

## 解説

一つのKeyに複数の値を持てる`LinkedMultiMap`クラスを作りました。

Mapですが、Iterableを継承しているので、そのままforで値を調べたりもできます。

何の目的で作ったのか、あまり覚えてないですが、、、、

実装している全部の関数やクラスを全てちゃんとテストしているわけではないので、

使用にあたっては、十分テストをしてください！

## ソースコード

```java
import java.io.Serializable;
import java.util.ArrayList;
import java.util.Collection;
import java.util.HashMap;
import java.util.Iterator;
import java.util.LinkedHashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;

public class LinkedMultiMap<K, V> implements Map<K, List<V>>, Iterable<V>, Serializable {

	private final ArrayList<K> keyList = new ArrayList<K>();
	private final Map<K, Map<Integer,V>> tableMap = new HashMap<K, Map<Integer,V>>();
	
	@Override
	public boolean containsKey(Object key) {
		return this.tableMap.containsKey(key);
	}

	@Override
	public boolean containsValue(Object value) {
		return this.tableMap.containsValue(value);
	}

	@Override
	public Set<Entry<K, List<V>>> entrySet() {
		
		final LinkedHashSet<Entry<K, List<V>>> entrySet = new LinkedHashSet<>();
		for (final K key : this.tableMap.keySet()) {
			entrySet.add(new EntryListValue(key));
		}
		return entrySet;
	}
	
	/**
	 * 
	 * @return
	 */
	public List<Entry<K, V>> entryList() {
		// FIXME テスト必須
		final ArrayList<Entry<K, V>> entryList = new ArrayList<>();
		for (int index=0; index < keyList.size(); index++) {
			entryList.add(new IndexEntry(keyList.get(index), index));
		}
		return entryList;
	}
	
	public class EntryListValue implements Entry<K, List<V>> {
		
		private K key;
		
		public EntryListValue(K key) {
			super();
			this.key = key;
		}

		@Override
		public K getKey() {
			return key;
		}

		@Override
		public List<V> getValue() {
			return new ArrayList<V>(tableMap.get(key).values());
		}

		@Override
		public List<V> setValue(List<V> value) {
			throw new UnsupportedOperationException("Unsupported Entry.setValue().");
		}
	}
	
	public class IndexEntry implements Entry<K, V> {
		
		private K key;
		private int index;

		public IndexEntry(K key, int index) {
			super();
			this.key = key;
			this.index = index;
		}

		@Override
		public K getKey() {
			return key;
		}

		@Override
		public V getValue() {
			return tableMap.get(key).get(index);
		}

		@Override
		public V setValue(V value) {
			return tableMap.get(key).put(index, value);
		}
	}
	
	/**
	 * 
	 * @param key
	 * @param value
	 * @return
	 */
	public V add(K key, V value) {
		// FIXME テスト必須
		this.keyList.add(key);
		
		Map<Integer, V> map = this.tableMap.get(key);
		if(map == null) {
			map = new HashMap<Integer, V>();
			this.tableMap.put(key, map);
		}
		return map.put(this.keyList.size()-1, value);
	}
	
	@Override
	public List<V> put(K key, List<V> values) {
		
		for(final V value : values) {
			add(key, value);
		}
		return values;
	}

	public void addAll(Map<? extends K, ? extends V> m) {
		
		for (final Entry<? extends K, ? extends V> entry : m.entrySet()) {
			add(entry.getKey(), entry.getValue());
		}
	}

	@Override
	public void putAll(Map<? extends K, ? extends List<V>> m) {
		
		for (final Entry<? extends K, ? extends List<V>> entry : m.entrySet()) {
			put(entry.getKey(), entry.getValue());
		}
	}

	/**
	 * 
	 * @return
	 */
	public List<V> valueList() {
		// FIXME テスト必須
		final ArrayList<V> valueList = new ArrayList<>();
		for (int index=0; index < keyList.size(); index++) {
			valueList.add(this.tableMap.get(keyList.get(index)).get(index));
		}
		return valueList;
	}

	@Override
	public Collection<List<V>> values() {
		
		final ArrayList<List<V>> values = new ArrayList<>();
		for (Map<Integer,V> value : this.tableMap.values()) {
			values.add(new ArrayList<V>(value.values()));
		}
		return values;
	}

	public V get(int index) {
		return this.tableMap.get(keyList.get(index)).get(index);
	}
	
	/**
	 * 
	 */
	@Override
	public List<V> get(Object key) {
		// FIXME テスト必須
		final Map<Integer, V> value = this.tableMap.get(key);
		if(value == null)
			return null;
		else
			return new ArrayList<V>(value.values());
	}

	/**
	 * 
	 */
	@Override
	public Set<K> keySet() {
		// FIXME テスト必須
		return new LinkedHashSet<K>(this.keyList);
	}

	@Override
	public void clear() {
		this.keyList.clear();
		this.tableMap.clear();
	}

	@Override
	public boolean isEmpty() {
		return this.tableMap.isEmpty();
	}

	@Override
	public List<V> remove(Object key) {
		// tableMapから削除対象を除去
		final Map<Integer, V> removedMap = this.tableMap.remove(key);
		
		// 削除対象毎に、keyListとindexMapを更新
		for(final Entry<Integer, V> removedEntry : removedMap.entrySet()) {
			
			final Integer removeKey = removedEntry.getKey();
			
			// keyListから対象を除去
			this.keyList.remove(removeKey);
			
			// keyListから削除対象以降のindexMap更新対象を取得
			final List<K> updateKeyList = 
					this.keyList.subList(removeKey, this.keyList.size());
			
			// indexMapのindexを更新
			for (int index = 0; index < updateKeyList.size(); index++) {
				final K updateKey = updateKeyList.get(index);
				
				// indexMapで保持しているIndexを更新
				final Map<Integer, V> indexMap = this.tableMap.get(updateKey);
				
				// 古いIndex情報を削除
				final V updateValue = indexMap.remove(new Integer(removeKey.intValue() + index + 1));
				
				// 新しいIndex情報を設定
				indexMap.put(new Integer(removeKey.intValue() + index), updateValue);
			}
		}
		return new ArrayList<V>(removedMap.values());
		// throw new UnsupportedOperationException("Unsupported LinkedMultiMap.remove().");
	}

	@Override
	public int size() {
		return this.keyList.size();
	}

	@Override
	public Iterator<V> iterator() {
		return new LinkedMultiMapIterator();
	}
	
	public class LinkedMultiMapIterator implements Iterator<V> {
		
		private int index = 0;
		
		@Override
		public boolean hasNext() {
			return LinkedMultiMap.this.keyList.size() > index;
		}
		
		@Override
		public V next() {
			if (LinkedMultiMap.this.keyList.size() > index) {
				final int indexTmp = index++;
				return LinkedMultiMap.this.tableMap.get(LinkedMultiMap.this.keyList.get(indexTmp)).get(indexTmp);
			}
			else
				return null;
		}
		
		@Override
		public void remove() {
			LinkedMultiMap.this.remove(LinkedMultiMap.this.keyList.get(index));
			//throw new UnsupportedOperationException("Unsupported Iterator.remove().");
		}
	}
}
```
