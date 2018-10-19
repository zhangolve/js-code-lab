
// ==UserScript==
// @name             腾讯视频h5
// @version          0.5.1
// @include          *://v.qq.com/*
// @include          *://lol.qq.com/v/*
// @include          *://film.qq.com/*
// @include          *://view.inews.qq.com/*
// @include          *://news.qq.com/*
// @description   腾讯视频html5播放器
// @grant             none
// @run-at           document-start
// @namespace https://greasyfork.org/users/60675
// ==/UserScript==
Object.defineProperty(navigator, 'plugins', {
  get: function () {
    return { length: 0 };
  }
});
//方位plugins时，结果会得到{length: 0}

'use strict';
Object.defineProperty(navigator,"userAgent",{value:"Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10;  rv:48.0) Gecko/20100101 Firefox/48.0",writable:false,configurable:false,enumerable:true});


/*
知识点

１.　腾讯视频在mac版本里是不支持flash的，因此只需要通过伪装userAgent的方式就能够实现这些。

2 . defineProperty 对对象进行修改，优化。　set ,get ,value 等是它的属性。

3 . 由于flash是浏览器的一个插件，所以为了更好地实现伪装，还应该在插件这里做判断。因为很有可能，腾讯的代码还要去判断当前这个浏览器是否
支持flash，而判断的依据就是navigator.plugins,这个时候，我们伪装后告诉他没有flash插件，他就只好去使用h5播放器了。

含有flash播放器的浏览器，未经过改造之前会有这样一个信息：
MimeType {type: "application/x-shockwave-flash", suffixes: "swf", description: "Shockwave Flash", enabledPlugin: Plugin}
description: "Shockwave Flash"
enabledPlugin: Plugin {0: MimeType, 1: MimeType, application/x-shockwave-flash: MimeType, application/futuresplash: MimeType, name: "Shockwave Flash", filename: "libpepflashplayer.so", description: "Shockwave Flash 31.0 r0", …}
suffixes: "swf"
type: "application/x-shockwave-flash"
__proto__: MimeType


 it's returned by the window.navigator.plugins property. The PluginArray is not a JavaScript array, but has the length property and supports accessing individual items using bracket notation (plugins[2]), as well as via item(index) and namedItem("name") methods.

 https://developer.mozilla.org/en-US/docs/Web/API/PluginArray

 
*/