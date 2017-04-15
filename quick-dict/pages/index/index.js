//index.js
//获取应用实例
var app = getApp()
var inputContent={}
Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    translation:[]
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  bindChange: function(e) {
    inputContent[e.currentTarget.id] = e.detail.value
    console.log(inputContent);
  },
  search:function(){
    console.log('success');
    var that=this;
    wx.request({
  url: 'https://fanyi.youdao.com/openapi.do?keyfrom=quick-dict&key=1633006486&type=data&doctype=json&version=1.1&q='+inputContent.myInput,
  header: {
      'content-type': 'application/json'
  },
  success: function(res) {
    if(res.data){
      that.setData({
        translation:res.data.translation
      })
      
    }
  }
})
  },
  onLoad: function () {
    console.log('onLoad');
    
    var that = this
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function(userInfo){
      //更新数据
      that.setData({
        userInfo:userInfo
      })
    })
  }
})


/*
wx.request({
  url: 'https://fanyi.youdao.com/openapi.do?keyfrom=quick-dict&key=1633006486&type=data&doctype=json&version=1.1&q=good',
  header: {
      'content-type': 'application/json'
  },
  success: function(res) {
    console.log(res.data)
  }
})



*/