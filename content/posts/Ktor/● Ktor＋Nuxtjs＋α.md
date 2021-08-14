---
sortNo: 21
title: モダンなKtorアプリ開発のススメ！
description: '仕事で必要そうなのでメモメモです！'
eyecatchImage: ['/images/posts/tailwindcss-logo.png',872,533]
thumbnailImage: ['/images/posts/sm/tailwindcss-logo.png',872,533]
tags: ['Ktor','Tailwind CSS']
disabled: true
---

## Swaggerファイルの作成

[Swagger Editor](https://editor.swagger.io/#) で適当に作る

```yaml
swagger: "2.0"
info:
  description: "Hello World."
  version: "1.0.0"
  title: "Hello World for Ktor"
  termsOfService: "https://kght6123.page/privacy-policy/"
  contact:
    email: "admin@kght6123.work"
  license:
    name: "Apache 2.0"
    url: "http://www.apache.org/licenses/LICENSE-2.0.html"
host: "localhost"
basePath: "/v1"
tags:
- name: "hello"
  description: "hello api."
  externalDocs:
    description: "My Blog."
    url: "https://kght6123.page"
schemes:
- "https"
- "http"
paths:
  /hello:
    post:
      tags:
      - "hello"
      summary: "Add a new hello to the store"
      description: ""
      operationId: "addHello"
      consumes:
      - "application/json"
      - "application/xml"
      produces:
      - "application/xml"
      - "application/json"
      parameters:
      - in: "body"
        name: "body"
        description: "hello object that needs to be added to the store"
        required: true
        schema:
          $ref: "#/definitions/Hello"
      responses:
        "405":
          description: "Invalid input"
definitions:
  Category:
    type: "object"
    properties:
      id:
        type: "integer"
        format: "int64"
      name:
        type: "string"
    xml:
      name: "Category"
  Tag:
    type: "object"
    properties:
      id:
        type: "integer"
        format: "int64"
      name:
        type: "string"
    xml:
      name: "Tag"
  Hello:
    type: "object"
    required:
    - "name"
    - "photoUrls"
    properties:
      id:
        type: "integer"
        format: "int64"
      category:
        $ref: "#/definitions/Category"
      name:
        type: "string"
        example: "doggie"
      photoUrls:
        type: "array"
        xml:
          name: "photoUrl"
          wrapped: true
        items:
          type: "string"
      tags:
        type: "array"
        xml:
          name: "tag"
          wrapped: true
        items:
          $ref: "#/definitions/Tag"
      status:
        type: "string"
        description: "pet status in the store"
        enum:
        - "available"
        - "pending"
        - "sold"
    xml:
      name: "Hello"
```

## Ktor

[Ktor Project Generator](https://start.ktor.io/#) でプロジェクトを作る

[参考の設定](https://start.ktor.io/#ktor-engine=tomcat&artifact-group=jp.kght6123.ktor.helloworld&artifact-name=ktor-helloworld)

ポイントは必ず、Swagger（Optional）を選択して、swagger.yamlをアップロードすること

そのあとは、InttelljIdeaで開いて、下記のコマンドを入力する

```sh
./gradlew run
```

## Nuxt.js



