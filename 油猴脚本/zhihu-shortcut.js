// ==UserScript==
// @name         知乎新版添加快捷键1024
// @namespace    zhangolve@gmail.com
// @version      1.41
// @description  为新版知乎添加快捷键
// @author       zhangolve
// @match        *://www.zhihu.com/*
// @license      MIT
// ==/UserScript==

/*
todo 
单个问题页面，查看更多
按住Ｉ键，向下滚动 一点点
按住Ｏ键，向上滚动　一点点
收起评论
无须快捷键　空格键，向下滚动，但是是滚动一屏的距离，我希望的并不是滚动一屏啊！
ENTER 当前项目打开看详情

快捷键 说明
ESC 从写评论状态切换为继续浏览其他答案
j / k 上一个/下一个答案
/ 搜索
c 显示评论
v 赞同
d 反对
t 感谢
w 阅读全文/收起
g+n 查看通知/关闭通知
g+p 查看个人首页
g+s 去往设置页面
1/2/3 切换 推荐/关注/热榜

可以做成chrome ex，？呼出快捷键说明栏
*/ 

(function() {
    'use strict';
    let selectId = 0;
    let gFlag = false;
    const observer = new MutationObserver(setAnswersitems);
    let listItems;
    let mainTag; // 问题列表
    let answerClass;
    document.onkeydown = hotkey;
    // add hotkey event
    addEvent();

    function addEvent() {
      if (mainTag) {
        mainTag.removeEventListener('mouseover', mouseoverEvent, true);
        observer.disconnect();
      }
      var href = window.location.href;
      if(/^(http|https):\/\/www.zhihu.com(\/|\/follow)?$/.test(href)) { // 匹配主页
        mainTag = document.querySelector('.Topstory-content');
        answerClass = 'TopstoryItem';
      } else if (/^(http|https):\/\/www.zhihu.com\/question\/(\d)+\/answer\/*/.test(href)) { //匹配单个问题页面
        mainTag = document.querySelector('.MoreAnswers');
        answerClass = 'List-item';
      } else if(/^(http|https):\/\/www.zhihu.com\/search\/*/.test(href)) { // 匹配搜索页面
        mainTag = document.querySelector('.SearchMain').parentElement;
        answerClass = 'List-item';
      }
      if(mainTag) {
        mainTag.addEventListener('mouseover', mouseoverEvent, true);
        observer.observe(mainTag, { attributes: true, childList: true, subtree: true });
      }
    }

    function setAnswersitems() {
      let items;
      items = document.querySelectorAll('.' + answerClass);
      if(!items) return -1;
      listItems = items;
    }

    function setSelectId(value){
      const newId = Number(value);
      if (isNaN(newId)) return;
      selectId = newId;
    }

    function mouseoverEvent(e){
      mainTag.removeEventListener('mouseover', mouseoverEvent, true);
      let element = e.target;
      setSelectId(parents(element));
      setTimeout(function() {
        mainTag.addEventListener('mouseover', mouseoverEvent, true);
      }, 500);
    }

    function parents(element){
      let parent = element.parentNode;
      if(!parent || !listItems) {
        return NaN;
      }
      if(!parent.className || !parent.className.includes(answerClass)){
        return parents(parent);
      }
      const id =  Array.from(listItems).findIndex(elm=>elm === parent
      );
      if (id === -1) {
        return NaN;
      } else {
        return id;
      }
    }

    function findAnswers(count) {
      if(!listItems) {
        setAnswersitems();
      }
      return listItems[count];
    }

    function answersCount() {
      if(!listItems) {
        setAnswersitems();
      }
      return listItems.length-1;
    }

　　function getElementTop(element){
      let actualTop = element.offsetTop;
      let current = element.offsetParent;
      while (current !== null){
        actualTop += current.offsetTop;
        current = current.offsetParent;
      }
      return actualTop;
　　}
    // 设置位置
    function setLocation(id) {
      let element = findAnswers(id);
      const elementTop = getElementTop(element);
      window.scrollTo(0, elementTop-70);
    }

    // 设置边框样式
    function setBorderStyle(currentId, previousId) {
        let currentElement = findAnswers(currentId);
        let previousItem = findAnswers(previousId);
        if(currentElement) {
          currentElement.style.border = '3px solid #3284ff';
        }
        if(previousItem) {
          previousItem.style.border = '';
        }
    }

    //到下一个项目
    function nextItem() {
      let length = answersCount();
      if(selectId !== length){
        setBorderStyle(selectId + 1, selectId)
        setSelectId(selectId + 1);
      }
      setLocation(selectId);
    }

    //到上一个项目
    function previousItem() {
      if(selectId !== 0){
        setBorderStyle(selectId - 1, selectId)
        setSelectId(selectId - 1);
      }
      setLocation(selectId);
    }

    //查看答案详情或者折叠详情
    function moreOrFold() {
        let answers = findAnswers(selectId);
        let contentMoreBtn = answers.querySelector('.ContentItem-more');
        let contentFoldBtn =answers.querySelector('.ContentItem-rightButton');
        let actionBtn = contentMoreBtn || contentFoldBtn;
        actionBtn.click();   
    }
    
    // 赞同
    function voteButtonUp() {
      let answers = findAnswers(selectId);
      let voteButton = answers.getElementsByClassName('VoteButton--up')[0];
      voteButton.click();
    }

    //　反对
    function voteButtonDown() {
      let answers = findAnswers(selectId);
      let voteButton = answers.getElementsByClassName('VoteButton--down')[0];
      voteButton.click();
    }

    //搜索
    function search()
    {
      const searchInput = document.querySelector('.SearchBar-input input');
      searchInput.focus();
    }

    //打开评论
    function openComment()
    {
      let answers = findAnswers(selectId);
      let comment = answers.getElementsByClassName('ContentItem-actions')[0].childNodes[1];
      comment.click();
    }

    //感谢
    function thank()
    {
      let answers = findAnswers(selectId);
      let thinkButton = answers.getElementsByClassName('ContentItem-actions')[0].childNodes[4];
      thinkButton.click();
    }

    //切换tab
    function switchTab(index) {
        var tabs = document.querySelector('.Tabs').children;
        tabs[index].firstChild.click()
        selectId = 0;
    }

    //gohome 返回首页
    function goHome() {
      window.location.href = '/';
    }

    // 查看最新提醒通知
    function seeNotification() {
      // 如果有关闭通知的按钮，则点击之,使通知关闭。否则，创建之。
      var closeNoti= document.querySelector('#closeNoti');
      if(closeNoti) {
        closeNoti.click();
        setTimeout(function(){
          document.body.removeChild(closeNoti);
        },300)
      } else {
        closeNoti = document.createElement('button');
        closeNoti.setAttribute('id','closeNoti');
        closeNoti.style.position= 'fixed';
        closeNoti.style.top = '-1000px';        
        document.body.appendChild(closeNoti);
        var PushNotifications = document.querySelector('.PushNotifications-icon');
        PushNotifications.click();
      }
    }

    //去往设置页面
    function goSetting() {
      window.location.href = '/settings/account';
    };

    function escapeHandler() {
        if(document.hasFocus) {
          var focusTab = document.createElement('div');
          focusTab.setAttribute('tabindex','0');
          focusTab.style.position= 'fixed';
          focusTab.style.top = '-1000px';
          document.body.appendChild(focusTab);
          focusTab.focus();
        }
    }

    function hotkey(event)
    {
      if(event.altKey || event.ctrlKey) return;

      const element = event.target;
      if(element.tagName === 'INPUT' || 
        element.tagName === 'TEXTAREA' || 
        element.className === 'public-DraftEditor-content'){
        return;
      }

      if(event.key=='g') {
        gFlag = true;
      } else if(gFlag) {
        switch (event.key) {
          case 'n':
            seeNotification();
            break;
          case 'h':
            goHome();
            break;
          case 's':
            goSetting();
            break;
        }
      } else {
        gFlag = false;
      }

      if(event.keyCode==27) {
        event.preventDefault();
        escapeHandler();
        return;
      }
      switch (event.key) {
        case '1':
          switchTab(0)
          break;
        case '2':
          switchTab(1)
          break;
        case '3':
          switchTab(2)
          break;
        case 'j':
          nextItem();
          break;
        case 'k':
          previousItem();
          break;
        case '/':
          search();
          break;
        case '?':
          break;
        case 'o':
          break;
        case 'c':
          openComment();
          break;
        case 'v':
          voteButtonUp();
          break;
        case 'd':
          voteButtonDown();
          break;
        case 't':
          thank();
          break;
        case 'w':
          moreOrFold();
          break;
      }
    }
})();

