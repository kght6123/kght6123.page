---
sortNo: 4
title: Hello World!!!
description: 'Test post'
eyecatchImage: ['/images/posts/helloworld.jpg',799,534]
thumbnailImage: ['/images/posts/sm/helloworld.jpg',799,534]
tags: ['helloworld']
---

Sample

```js{1,3-5}[server.js]
const http = require('http')
const bodyParser = require('body-parser')

http.createServer((req, res) => {
  bodyParser.parse(req, (error, body) => {
    res.end(body)
  })
}).listen(3000)
```

<amp-img src="/images/posts/helloworld.jpg" layout="intrinsic" width="799" height="534" class="block"></amp-img>

Here's a simple footnote,[^1] and here's a longer one.[^bignote]

[^1]: This is the first footnote.

[^bignote]: Here's one with multiple paragraphs and code.

    Indent paragraphs to include them in the footnote.

    `{ my code }`

    Add as many paragraphs as you like.
