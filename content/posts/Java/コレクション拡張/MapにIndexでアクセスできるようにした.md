---
sortNo: 11
title: MapにIndexでアクセスできるようにした
eyecatchImage: ['/images/posts/java-logo.jpg',800,533]
thumbnailImage: ['/images/posts/sm/java-logo.jpg',800,533]
tags: ['Java']
---

## 解説

IndexでもKeyでもアクセスできる`LinkedIndexMap`クラスを作りました。

Mapですが、Iterableを継承しているので、そのままforで値を調べたりできます。

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
import java.util.ListIterator;
import java.util.Map;
import java.util.Set;

public class LinkedIndexMap<K, V> implements Map<K, V>, Iterable<V>, Serializable {
	
	private final ArrayList<K> keyList = new ArrayList<K>();
	private final Map<K, V> tableMap = new HashMap<K, V>();
	
	@Override
	public boolean containsKey(Object key) {
		return this.tableMap.containsKey(key);
	}
	
	@Override
	public boolean containsValue(Object value) {
		return this.tableMap.containsValue(value);
	}
	
	@Override
	public Set<Entry<K, V>> entrySet() {
		final LinkedHashSet<Entry<K, V>> entrySet = new LinkedHashSet<>();
		for (final K key : this.keyList) {
			entrySet.add(new EntryImpl(key));
		}
		return entrySet;
	}
	
	public ListImpl entryList() {
		return new ListImpl();
	}
	
	public class EntryImpl implements Map.Entry<K, V> {
		
		private K key;
		
		public EntryImpl(K key) {
			super();
			this.key = key;
		}
		
		@Override
		public K getKey() {
			return key;
		}
		
		@Override
		public V getValue() {
			return tableMap.get(key);
		}
		
		@Override
		public V setValue(V value) {
			return tableMap.put(key, value);
		}
	}
	
	@Override
	public V put(K key, V value) {
		
		if(this.keyList.contains(key)) {
			this.keyList.remove(key);
			this.keyList.add(key);// move last
		}
		else
			this.keyList.add(key);
		
		return this.tableMap.put(key, value);
	}
	
	public V put(int index, K key, V value) {
		
		if(this.keyList.contains(key)) {
			this.keyList.remove(key);
			this.keyList.add(index, key);// move index
		}
		else
			this.keyList.add(index, key);
		
		return this.tableMap.put(key, value);
	}

	@Override
	public void putAll(Map<? extends K, ? extends V> m) {
		
		for (final Entry<? extends K, ? extends V> entry : m.entrySet()) {
			put(entry.getKey(), entry.getValue());
		}
	}
	
	@Override
	public List<V> values() {
		
		final ArrayList<V> valueList = new ArrayList<>();
		for (final K key : keyList) {
			valueList.add(this.tableMap.get(key));
		}
		return valueList;
	}
	
	public V get(int index) {
		return this.tableMap.get(keyList.get(index));
	}
	
	@Override
	public V get(Object key) {
		return this.tableMap.get(key);
	}
	
	@Override
	public Set<K> keySet() {
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
	public V remove(Object key) {
		this.keyList.remove(key);
		return this.tableMap.remove(key);
	}
	
	@Override
	public int size() {
		return this.keyList.size();
	}
	
	@Override
	public ValueIterator iterator() {
		return new ValueIterator();
	}
	
	public Map.Entry<K, V> set(int index, Map.Entry<K, V> e) {
		keyList.set(index, e.getKey());
		tableMap.put(e.getKey(), e.getValue());
		return e;
	}
	
	public class ValueIterator implements Iterator<V> {
		
		private final EntryListIterator ite = new EntryListIterator(0);
		
		public int getIndex() {
			return ite.getIndex();
		}
		public void setIndex(int index) {
			ite.setIndex(index);
		}
		
		@Override
		public boolean hasNext() {
			return ite.hasNext();
		}
		
		@Override
		public V next() {
			final EntryImpl entry = ite.next();
			
			if (entry != null)
				return entry.getValue();
			else
				return null;
		}
		
		@Override
		public void remove() {
			ite.remove();
		}
	}
	
	public class EntryListIterator implements ListIterator<Map.Entry<K, V>> {
		
		private int index;
		
		public EntryListIterator(final int index) {
			super();
			this.index = index;
		}
		
		public int getIndex() {
			return index;
		}
		public void setIndex(int index) {
			this.index = index;
		}
		
		@Override
		public boolean hasNext() {
			return LinkedIndexMap.this.keyList.size() > index;
		}
		
		@Override
		public EntryImpl next() {
			if (LinkedIndexMap.this.keyList.size() > index) {
				return new EntryImpl(LinkedIndexMap.this.keyList.get(index++));
			}
			else
				return null;
		}
		
		@Override
		public void remove() {
			LinkedIndexMap.this.remove(LinkedIndexMap.this.keyList.get(index));
		}
		
		@Override
		public void add(final Map.Entry<K, V> e) {
			put(e.getKey(), e.getValue());
		}
		@Override
		public boolean hasPrevious() {
			return 0 < this.index;
		}
		@Override
		public int nextIndex() {
			return this.index + 1;
		}
		@Override
		public Map.Entry<K, V> previous() {
			if(hasPrevious())
				return new EntryImpl(LinkedIndexMap.this.keyList.get(index-1));
			else
				return null;
		}
		@Override
		public int previousIndex() {
			return this.index - 1;
		}
		@Override
		public void set(final Map.Entry<K, V> e) {
			LinkedIndexMap.this.set(index, e);
		}
	}
	
	public class ListImpl implements List<Map.Entry<K, V>> {
		
		@Override
		public boolean add(Map.Entry<K, V> e) {
			return put(e.getKey(), e.getValue()) != null;
		}
		@Override
		public void add(int index, Map.Entry<K, V> e) {
			put(index, e.getKey(), e.getValue());
		}
		@Override
		public boolean addAll(Collection<? extends Map.Entry<K, V>> c) {
			for (final Map.Entry<K, V> e : c) {
				put(e.getKey(), e.getValue());
			}
			return false;
		}
		@Override
		public boolean addAll(int index, Collection<? extends Map.Entry<K, V>> c) {
			
			final ArrayList<Map.Entry<K, V>> l = new ArrayList<>(c);
			for (int i = l.size() - 1; i < 0; i--) { // last start
				final Map.Entry<K, V> e = l.get(i);
				put(index, e.getKey(), e.getValue());
			}
			return false;
		}
		@Override
		public void clear() {
			clear();
		}
		@Override
		public boolean contains(Object o) {
			return containsValue(o);
		}
		@Override
		public boolean containsAll(Collection<?> c) {
			return tableMap.values().containsAll(c);
		}
		@Override
		public Map.Entry<K, V> get(int index) {
			return new EntryImpl(keyList.get(index));
		}
		@Override
		public int indexOf(Object o) {
			for(final K key : keyList) {// first start
				if(tableMap.get(key).equals(o))
					return keyList.indexOf(key);
			}
			return -1;
		}
		@Override
		public boolean isEmpty() {
			return isEmpty();
		}
		@Override
		public Iterator<Map.Entry<K, V>> iterator() {
			return new EntryListIterator(0);
		}
		@Override
		public int lastIndexOf(Object o) {
			for (int i = keyList.size() - 1; i < 0; i--) { // last start
				final K key = keyList.get(i);
				if(tableMap.get(key).equals(o))
					return keyList.indexOf(key);
			}
			return -1;
		}
		@Override
		public ListIterator<Map.Entry<K, V>> listIterator() {
			return new EntryListIterator(0);
		}
		@Override
		public ListIterator<Map.Entry<K, V>> listIterator(int index) {
			return new EntryListIterator(index);
		}
		@Override
		public boolean remove(Object o) {
			return LinkedIndexMap.this.remove(o) != null;
		}
		@Override
		public Map.Entry<K, V> remove(int index) {
			final EntryImpl entry = new EntryImpl(keyList.get(index));
			remove(entry.getValue());
			return entry;
		}
		@Override
		public boolean removeAll(Collection<?> c) {
			boolean result = false;
			
			for (final Object o : c) {
				result = remove(o);
			}
			return result;
		}
		@Override
		public boolean retainAll(Collection<?> c) {
			boolean result = false;
			
			for(final K key : keyList) {
				if(!c.contains(tableMap.get(key))) {
					result = remove(key);
				}
			}
			return result;
		}
		@Override
		public Map.Entry<K, V> set(final int index, Map.Entry<K, V> e) {
			return set(index, e);
		}
		@Override
		public int size() {
			return size();
		}
		@Override
		public List<Map.Entry<K, V>> subList(int fromIndex, int toIndex) {
			
			final ArrayList<Map.Entry<K, V>> l = new ArrayList<>();
			for (final K key : keyList.subList(fromIndex, toIndex)) {
				l.add(new EntryImpl(key));
			}
			return l;
		}
		@Override
		public Object[] toArray() {
			return tableMap.values().toArray();
		}
		@Override
		public <T> T[] toArray(T[] a) {
			return tableMap.values().toArray(a);
		}
	}
}
```
