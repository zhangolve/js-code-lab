https://github.com/wojtekmaj/react-pdf/blob/master/README.md

使用该库进行集成，发现如下问题

1 需要额外写样式，才能保持pdf全屏展示
2 pdf中非拉丁字母不能正常展示，需要cmaps的集成，但是集成遇到了问题。
3 考虑到实际上，如果最终是想要下载pdf，而集成该库的方案实际上是要将pdf转成canvas，并不能够实现这一目的，所以即便是解决了2的问题，也无助于事。说到底，还是需要那个壳app来做一些工作。



