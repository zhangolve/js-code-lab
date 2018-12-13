# 通过获得响应头（response headers）来获取总的专栏文章书目

要点

- 通过chrome 浏览器 network 抓包分析，专栏总的条目数这个信息是在响应头哦。节点名为X-Result-Count

- 使用request库进行调用的时候，之前获得body内容，使用的是res.body，同理这次为了获得响应头，也就是获得res.headers

- 这是一个演示demo，config.js 中的cookie有误，请自行填入自己的可用cookie，本例以抓取文明之光专栏为例
https://zhuanlan.zhihu.com/wujun