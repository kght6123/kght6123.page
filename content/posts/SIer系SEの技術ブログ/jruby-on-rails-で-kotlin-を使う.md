---
title: "JRuby on Rails で #Kotlin を使う #JRuby #Rails"
date: "2018-09-02"
categories: 
  - "プログラミング"
tags: 
  - "kotlin"
  - "rails"
---

## 経緯

KotlinでWebアプリを作りたいと思い、一つの選択肢として調査した内容になります。

SpringBoot3.0がKotlinに対応してますし、Ktorもありますが、

RailsのREST-APIに適した、生産性の高いMVCフレームワークに魅力を感じて、Kotlinとの組み合わせを試して見ました。

## 制約

今の所、Kotlin側はデバッグやホットリロードができてません。

さらに、GradleとRailsを組み合わせて使うため、少し複雑になってます。

本格的に使う場合は、プラグインを作ってシンプルにしたいです。

また、Rails周りの経験が浅く、今はやり方が分からないのですが、デバッグ周りは出来る様にしたいと思っています。

対象OSは、macOSです。

## インストール

GradleとJRubyを、brewでインストールして、動作確認を行います。

```
brew install gradle
brew install jruby
jruby -v
```

## Kotlinプロジェクト作成

GradleのプロジェクトフォルダをJavaアプリケーションで作成します。

```
mkdir kotlin-rails/kotlin
cd kotlin-rails/kotlin
gradle init --type java-application
```

Kotlin向けに修正します。

```
rm -rf src/main/java/
rm -rf src/test/java/
mkdir src/main/kotlin
mkdir src/test/kotlin
```

build.gradleを下記の様に修正します

```
buildscript {
  repositories {
    maven { url 'https://plugins.gradle.org/m2/' }
    maven { url 'http://repository.jetbrains.com/all' }
  }
  dependencies {
    classpath 'com.github.jruby-gradle:jruby-gradle-plugin:1.6.0'
    classpath 'org.jetbrains.kotlin:kotlin-gradle-plugin:1.2.61'
  }
}
apply plugin: 'kotlin'
apply plugin: 'application'
apply plugin: "com.github.jruby-gradle.base"
dependencies {
  gems 'rubygems:rails:5.2.1'
  compile 'org.jetbrains.kotlin:kotlin-stdlib:1.2.61'
  testCompile 'org.jetbrains.kotlin:kotlin-test-junit:1.2.61'
}
mainClassName = 'hello.HelloKt'
```

src/main/kotlin/hello フォルダを作成し、Hello.ktファイルを作成します。

```
package hello

fun main(args: Array<String>) {
  test()
}
fun test() {
  println("Test, RailsKotlin!!!")
}
```

kotlin側の動作確認を行います。

`build/classes/kotlin/main` に `*.class` が作られます。  

```
gradle run
```

Rails側から参照するjarの作成を行います。

`build/libs` に `*.jar` が作られる

```
gradle jar
```

## Railsプロジェクト作成

Gradleで、Gems（Rails）をインストールします。

`build/gems/bin`に、`rails`コマンドがインストールされます。

```
gradle -q jrubyPrepare
```

Railsの動作確認を行います。

```
cd ..
export GEM_HOME=`pwd`/kotlin/build/gems
export PATH="$GEM_HOME/bin:$PATH"
rails -v
```

毎回、`GEM_HOME`と`PATH`を設定するのは面倒なので、rails.sh、rake.sh、bundle.sh を作りました。

次に、Railsプロジェクトを作成します。

```
./rails.sh new . 
```

gemからlistenなどが抜けており、serverが起動できないので追加します。

Genfileに下記を追記します。

```
# Add development
group :development do
  gem 'listen', '~> 3.1.5'
  gem 'spring'
  gem 'spring-watcher-listen', '~> 2.0.0'
end
```

bundleコマンドでインストールします。

```
./bundle.sh install
```

Railsサーバを起動し、`http://localhost:3000/` にアクセスして、動作を確認します。

```
./rails.sh server
```

## Railsサンプルアプリケーション作成

database.ymlに設定されたデータベースを作成します。

```
./rake.sh db:create
```

アプリケーションの雛形（scaffold）を作成します。

必要なモデルやコントローラ、ビュー、マイグレーションファイルなど、自動で作成されます。

```
./rails.sh generate scaffold Article title:string content:text
```

自動生成された`db\migrate\〜_create_articles.rb`を利用して、マイグレーション（テーブル作成）を行います。

```
./rake.sh db:migrate
```

マイグレーションなので、DBのバージョン管理ができるっぽいです。

## Kotlin呼び出し処理を作成

コントローラ (`kotlin-rails/app/controllers/articles_controller.rb`) に下記の処理を追記します。

```
# 先頭にrequireとimportを追記
require 'java'
require './kotlin/build/libs/kotlin.jar'
import 'hello.HelloKt'

# before_actionメソッド内に呼び出し処理を追記
HelloKt.test()
```

もう一度、rails serverを起動し、http://localhost:3000/articles/にアクセスして、

標準出力に「Test, RailsKotlin!!!」と表示されることを確認します。

## 最後に

Railsの知識があまりないので、最小限にも届かない感じになりました、、、

コマンドベースでMVCに必要な最小限のファイルを作ってくれるので、

短い時間で開発が出来そうで、とても便利そうで、使って見たいと思えました。

次は、Ktorも試して見たいと考えています。

RubyMineや、Intellj ideaあたりで対応してくれないかな？

以上
