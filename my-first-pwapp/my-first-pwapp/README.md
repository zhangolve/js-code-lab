# Your first Progressive Web App Code Lab

These are the resource files needed for the [Your first Progressive Web App](https://codelabs.developers.google.com/codelabs/your-first-pwapp/)
code lab from Google.

This is a work in progress, if you find a mistake, please [file an issue](https://github.com/googlecodelabs/your-first-pwapp/issues). Thanks!

## What you’ll learn
* How to design and construct an app using the “app shell” method
* How to make your app work offline
* How to store data for use offline later

## What you’ll need
* Chrome 52 or above, though any browser that supports service workers and `cache.addAll()` will work
* [Web Server for Chrome](https://chrome.google.com/webstore/detail/web-server-for-chrome/ofhbbkphhbklhfoeikjpcbhemlocgigb), or use your own web server of choice.
* The [sample code](https://github.com/googlecodelabs/your-first-pwapp/archive/master.zip)
* A text editor
* Basic knowledge of HTML, CSS and JavaScript
* (Optional) Node is required in the last step to deploy to Firebase

# 个人笔记

* 我的测试目录是work文件夹
* service-worker有他的使用场景，从这次测试来看，由于优先加载的缓存，因此当本地文件发生改变的时候，仍然会加载缓存中的模块，app shell，这一点并不友好。但是尽管如此，即便是普通的web app 也会出现由于缓存造成的问题，需要清除缓存才能有效。




