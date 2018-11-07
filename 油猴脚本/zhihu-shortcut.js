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
搜索快捷键
按住ESC,退出当前光标聚集
按住Ｉ键，向下滚动 一点点
按住Ｏ键，向上滚动　一点点

无须快捷键　空格键，向下滚动，但是是滚动一屏的距离，我希望的并不是滚动一屏啊！

快捷键 说明
j / k 上一个/下一个答案
g/G 第一个/最后一个答案
/ 搜索
o 显示评论
v 赞同
d 反对
t 感谢
sc 收藏
fx 分享
w 阅读全文/收起
1/2/3 切换 推荐/关注/热榜
可以做成chrome ex，？呼出快捷键说明栏
*/ 

(function() {
    'use strict';
    let selectId = 0;
    let gFlag = false, scFlag = false, fxFlag = false;
    const observer = new MutationObserver(setAnswersitems);
    let listItems;
    let mainTag; // 问题列表
    let answerClass;
    document.onkeydown = hotkey;
    // add hotkey event
    addEvent();

    function addEvent() {
      answerClass = getAnswerClass();
      if (mainTag) {
        mainTag.removeEventListener('mouseover', mouseoverEvent, true);
        observer.disconnect();
      }
      var href = window.location.href;
      if(/^(http|https):\/\/www.zhihu.com(\/)?$/.test(href)) { // 匹配主页
        mainTag = document.querySelector('.Topstory-content');
      } else if (/^(http|https):\/\/www.zhihu.com\/question\/(\d)+\/answer\/*/.test(href)) { //匹配单个问题页面
        mainTag = document.querySelector('.List-item');
      } else if(/^(http|https):\/\/www.zhihu.com\/question\/*/.test(href)) {
        mainTag = document.querySelector('.List-item').parentElement;
      } else if(/^(http|https):\/\/www.zhihu.com\/follow/.test(href)) {
        mainTag = document.querySelector('.Topstory-content');
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

    // 还应该匹配search页面！！
    function getAnswerClass() {
      if(/^(http|https):\/\/www.zhihu.com(\/)?$/.test(window.location.href)) { // 匹配主页
        return 'TopstoryItem';
      }
      else if (/^(http|https):\/\/www.zhihu.com\/question\/*/.test(window.location.href)) { //匹配问题页面
        return 'List-item';
      }
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

    function setBorderStyle(currentId, previousId) {
        let currentElement = findAnswers(currentId);
        currentElement.style.border = '3px solid #3284ff';
        let previousItem = findAnswers(previousId);
        previousItem.style.border = '';
    }

    function nextItem() {
      let length = answersCount();
      if(selectId !== length){
        setBorderStyle(selectId + 1, selectId)
        setSelectId(selectId + 1);
      }
      setLocation(selectId);
    }

    function previousItem() {
      if(selectId !== 0){
        setBorderStyle(selectId - 1, selectId)
        setSelectId(selectId - 1);
      }
      setLocation(selectId);
    }


    function moreOrFold() {
        let answers = findAnswers(selectId);
        let contentMoreBtn = answers.querySelector('.ContentItem-more');
        let contentFoldBtn =answers.querySelector('.ContentItem-rightButton');
        let actionBtn = contentMoreBtn || contentFoldBtn;
        actionBtn.click();   
    }
    
    function firstItem()
    {
      if(gFlag){
        gFlag = false;
        setBorderStyle(0, selectId)
        setSelectId(0);
        setLocation(selectId);
      }
      gFlag = true;
    }

    function lastItem(){
      setBorderStyle(answersCount(), selectId)
      setSelectId(answersCount());
      setLocation(selectId);
    }

    function voteButtonUp() {
      let answers = findAnswers(selectId);
      let voteButton = answers.getElementsByClassName('VoteButton--up')[0];
      voteButton.click();
    }

    function voteButtonDown() {
      let answers = findAnswers(selectId);
      let voteButton = answers.getElementsByClassName('VoteButton--down')[0];
      voteButton.click();
    }

    function search()
    {
      const searchInput = document.querySelector('.SearchBar-input input');
      searchInput.focus();
    }

    function openComment()
    {
      let answers = findAnswers(selectId);
      let comment = answers.getElementsByClassName('ContentItem-actions')[0].childNodes[1];
      comment.click();
    }

    function thank()
    {
      let answers = findAnswers(selectId);
      let thinkButton = answers.getElementsByClassName('ContentItem-actions')[0].childNodes[4];
      thinkButton.click();
    }

    function collection()
    {
      let answers = findAnswers(selectId);
      let thinkButton = answers.getElementsByClassName('ContentItem-actions')[0].childNodes[3];
      thinkButton.click();
    }

    function share()
    {
      let answers = findAnswers(selectId);
      let share = answers.getElementsByClassName('ContentItem-actions')[0].childNodes[2];
      let button = share.getElementsByTagName('button')[0];
      button.click();
    }

    function switchTab(index) {
        var tabs = document.querySelector('.Tabs').children;
        tabs[index].firstChild.click()
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

      if(event.key =='s') {
        scFlag = true;
      } else if(event.key =='f') {
        fxFlag = true;
      } else if(scFlag && event.key=='c') {
        scFlag = fxFlag = false;
        collection();
        return;
      } else if(fxFlag && event.key=='x') {
        scFlag = fxFlag = false;
        share();
        return;
      }
      else {
        scFlag = fxFlag = 0;
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
        case 'g':
          firstItem();
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
        case 'G':
          lastItem();
          break;
        default:

      }
    }
})();

