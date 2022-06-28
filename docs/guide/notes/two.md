---
title: mock教程
date: 2021-03-16
---

#### 创建mock文件夹

```js
const Mock = require('mockjs')
let id = Mock.mock('@id')
console.log(id)
```

- 产生字符串    在新创建的mock文件夹下集成终端打开

  ```js
  node testMock.js
  ```

  产生一串随机数即可

  

- 对象形式

  - 建立json5和js格式文件，在js文件中将js转换

    json5文件如下：

    ```
    {
        id: "@id()", //得到随机的id,对象
        username: "@cname()", //随机生成中文名
        date: "@data()", //随机生成日期
        avater: "@image('20*20','red','#fff','avatar')", //生成图片，参数:size,background,color,
        description: "@email()", //描述
        ip: "@ip()", //IP地址
        email: "@email()" //email
    }
    ```

    js文件如下：

    ```js
    const fs = require('fs')
    const path = require('path')
    const JSON5 = require('json5')
    var json = fs.readFileSync(path.join(__dirname, './userInfo.json5'), 'utf-8')
    var obj = JSON5.parse(json)
    console.log(obj)
    ```

  - 在控制台中输出

    ```
    PS F:\vs code\mock\mock-demo\mock> node testJSON5.js
    {
      id: '@id()',
      username: '@cname()',
      date: '@data()',
      avater: "@image('20*20','red','#fff','avatar')",
      description: '@email()',
      ip: '@ip()',
      email: '@email()'
    }
    ```

    