---
title: "AntのJavaタスクでCLASSPATHを引き継ぐ"
date: "2018-09-20"
categories: 
  - "java"
tags: 
  - "ant"
  - "java"
---

baseDirを変えて、外部のAntスクリプトを呼び出したい事があったので

javaタスクで新しいAntプロセスを起動し、build.xmlを実行することにしました。

その際に欠点があり、Ant実行時に指定したCLASSPATHが引き継がれません。  

Antのドキュメントを調べてみると、VM引数に**"-Dbuild.sysclasspath=last"**を追加すると良さそうです。

因みに、javaタスクの**cloneVm="true"**も目的を達成できそうでしたが、

対象のビルドファイル指定(**\-buildFile**)が無効になってしまったので、

別のbuild.xmlを呼ぶことには使えなさそうです。

これで、長々とJavaタスクのclasspathを書く必要がなくなりました。

```xml
<!-- build.xml -->
<macrodef name="single-task">
  <attribute name="application.name" default="AntTask" />
  <attribute name="vm.dir"/>
  <attribute name="build.file"/>
  <element name="build.tasks" />
  <sequential>
    <echo message="start @{application.name}."/>
    
    <!-- デバッグ情報の出力 -->
    <property name="ant-class-path" refid="ant.class.path" />
    <echo message="classpath = ${ant-class-path}" />
    <echo message="tomcat.home = ${tomcat.home}" />
    
    <!-- javaタスクで、build.xmlを実行 -->
    <java classname="org.apache.tools.ant.launch.Launcher" fork="true" dir="@{vm.dir}" failonerror="true">
      <sysproperty key="ant.home" value="${ant.home}"/>
      <arg value="-buildfile" />
      <arg value="@{build.file}" />
      <build.tasks />
      <env key="TOMCAT_HOME" value="${tomcat.home}" />
      <!-- <java cloneVm="true" /> cloneVmは、"-buildfile"オプションが無効になる -->
      <classpath refid="ant.class.path"/>
    </java>
    <echo message="complete @{application.name}."/>
  </sequential>
</macrodef>
```
