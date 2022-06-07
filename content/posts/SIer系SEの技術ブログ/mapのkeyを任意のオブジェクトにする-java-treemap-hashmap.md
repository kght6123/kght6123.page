---
title: "MapのKeyを任意のオブジェクトにする #Java #TreeMap #HashMap"
date: "2018-07-16"
categories: 
  - "java"
tags: 
  - "java"
---

JavaのMapでKeyを任意のオブジェクトにします。

HashMapでは`equals`、`hashCode`の対応、

TreeMapでは`compareTo`の対応が必要です。

下記のサンプルでは、`compareTo`を再利用してます。

```java
public class Main {
  public static void main(final String... args) {
    // 利用例
    final Map<KeyInfo,String> map = new HashMap<>();
    map.put(new KeyInfo("ID1", 1), "value1");
    map.put(new KeyInfo("ID2", 2), "value2");
    System.out.println(map.get(new KeyInfo("ID2", 2))); // value2
  }
}
```

`compareTo`の結果は等しい時は`0`、異なる時は`0以外`を表すので

`equals`の結果にも再利用しています。

```java
public class KeyInfo implements Comparable<KeyInfo> {
  private final String id;
  private final int type;
  
  // --- コンストラクタ、Getter/Setterは省略 ---
  
  @Override
  public int compareTo(final KeyInfo info) {
    // TreeMap向け メソッド
    if(StringUtils.equals(info.id, this.id)
        && info.type == this.type)
      return 0;
    else
      return -1;
  }
  @Override
  public boolean equals(Object arg0) {
    // HashMap向け メソッド
    if(arg0 instanceof KeyInfo && compareTo((KeyInfo)arg0) == 0) {
      return true;
    }
    return super.equals(arg0);
  }
  @Override
  public int hashCode() {
    // HashMap向け メソッド
    return HashCodeBuilder.reflectionHashCode(this, new String[]{}/*exclude*/);
  }
}
```

複数のシステムをまたがるデータを合わせ込む場合に、よく使うにゃー・・・
