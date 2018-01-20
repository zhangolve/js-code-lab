// ==UserScript==
// @name         百度搜索 - 优化
// @namespace    http://tampermonkey.net/
// @home-url     https://greasyfork.org/zh-CN/scripts/31642
// @description  1、屏蔽百度推广 2、关闭百度广告联盟信息收集 3、绑定快捷键 4、布局调整 5、居中单列(可选) 6、居中双列(可选)
// @version      2.3.6
// @author       浮生未歇
// @include      http://www.baidu.com/*
// @include      https://www.baidu.com/*
// @require      https://cdn.bootcss.com/jquery/3.2.1/jquery.min.js
// @resource     baiduIndexStyle   https://gitee.com/sshin/Tampermonkey/raw/master/Baidu-2017-12-5/baiduIndexStyle.css
// @resource     baiduCommonStyle  https://gitee.com/sshin/Tampermonkey/raw/master/Baidu-2017-12-5/commonStyle.css
// @resource     baiduMyMenuStyle  https://gitee.com/sshin/Tampermonkey/raw/master/Baidu-2017-12-5/customMenuStyle.css
// @resource     baiduOnePageStyle https://gitee.com/sshin/Tampermonkey/raw/master/Baidu-2017-12-5/onePageCenterStyle.css
// @resource     baiduTwoPageStyle https://gitee.com/sshin/Tampermonkey/raw/master/Baidu-2017-12-5/twoPageCenterStyle.css
// @run-at       document-body
// @grant        GM_addStyle
// @grant        GM_getResourceText
// @grant        GM_setValue
// @grant        GM_getValue
// ==/UserScript==

(function() {
    'use strict';
    // Your code here...
    /*
    模块:配置
    */
    var Config = {
        //计数器
        count:0,

        //是否开启DEBUG。true:表示开启，false:表示关闭
        debug:false,

        //Run刷新名称,
        runResetElementName:"#isRunReset",

        //Run缓存
        runCache:[],

        //样式缓存
        styleCache:[],

        //功能选择页。0:表示普通页，1:表示居中单页，2:表示居中双页
        option:0,

        //监测点元素默认高度。监测到点的高度小于该值时，触发脚本
        testDefinedHight:50,

        //监测点元素
        testElementName:"#form",

        //样式集
        styles:[{
            //百度首页
            indexStyle:"baiduIndexStyle",

            //普通样式
            commonStyle:"baiduCommonStyle",

            //自定义菜单样式
            menuStyle:"baiduMyMenuStyle",

            //单页样式
            onePageStyle:"baiduOnePageStyle",

            //双页样式
            towPageStyle:"baiduTwoPageStyle",
        }],

        //需要安装重置Run的选择器
        resetSelectors:[
            "#page a",
            "#su",
            "#result_logo",
            "#s_kw_wrap",
        ],
        ads:[
            "#content_left>div[style*='display:block !important;']",
            "#content_left>div[id^='30']",
            "#content_left>div:not([id])",
            "#content_left>#clone",

        ],
        isImportIndexStyple:false,


    };
    /*
    模块:Debug
    */
    var Debug = {
        printDebugInfo:function(name,message){
            if(Config.debug){
                console[name](message);
            }
        },
        group:function(message){
            this.printDebugInfo("group",message);
        },
        groupEnd:function(message){
            this.printDebugInfo("groupEnd",message);
        },
        log:function(message){
            this.printDebugInfo("log",message);
        },
        info:function(message){
            this.printDebugInfo("info",message);
        },
        error:function(message){
            this.printDebugInfo("error",message);
        },
        count:function(message){
            this.printDebugInfo("count",message);
        }
    };

    /*
    模块:Run运行
    */
    var Run = {
        _isCache:function(value){
            return Config.runCache.indexOf(value) < 0 ? true : false;
        },
        _addCache:function(value){
            Config.runCache.push(value);
        },
        _removeCache:function(value){
            if(Run._isCache()){
                var index = Config.runCache.indexOf(value);
                Config.runCache.splice(index,1);
            }
        },
        _one:function(name,callback){
            return function(){
                var value = name + callback;
                if(Run._isCache(value)){
                    try{
                        Run._addCache(value);
                        callback();
                    }catch(e){
                        Run._removeCache(value);
                        Debug.error("Run.one()函数出现问题:" + callback);
                        Debug.error("原因:" + e);
                    }
                }
            };
        },
        _ready:function(callback){
            return function(){
                $(document).ready(callback);
            };
        },
        one:function(callback){
            this._one("one",callback)();
        },
        ready:function(callback){
            this._ready(callback)();
        },
        readyOne:function(callback){
            this._ready(this._one("readyOne",callback))();
        }

    };
    /*
    模块:样式
    */
    var Style ={
        //导入样式
        import:function(){
            var styles = Config.styleCache;
            var style = null;
            for(var i in styles){
                style += GM_getResourceText (styles[i]);
                Debug.log("导入" + styles[i] + "样式……" );
            }
            GM_addStyle(style);
            Config.styleCache = [];
            Debug.log("样式导入成功");
        },

        //加入样式队列
        addQueue:function(style){
            Config.styleCache.push(style);
        },
    };
    /*
    模块:节点
    */
    var Node = {
        append:function($fatherNode,$childNode){
            $fatherNode.append($childNode);
        },

    };
    /*
    模块:数据
    */
    var Data={
        getGmValue(name){
            return GM_getValue(name,Config[name]);
        },
        setGmValue(name,value){
            GM_setValue(name,value);
        },
        resetCount(){
            Config.count = 0;
        },
        resetRun(){
            Config.runCache = [];
        },
        resetAll(){
            Data.resetCount();
            Data.resetRun();

        }
    };

    /*
    模块:检查
    */
    var Check = {
        isOffsetHight:function(){
            var offsetTopHight = $(Config.testElementName).offset().top;
            if(Config.count >0){
                return false;
            }else{
                if(offsetTopHight < Config.testDefinedHight){
                    Config.count++;
                    return true;
                }else{
                    return false;
                }
            }

        },

    };
    /********************************************************/
    /********************** 执行代码 ************************/
    /********************************************************/
    /*
    启动
    */
    var Launch = {

        //导入样式
        importIndexStyles:function(){
            //获取样式集
            var styles = Config.styles[0];
            //添加样式到队列
            try{
                Style.addQueue(styles.indexStyle);

            }catch(e){
                Debug.error("Style.addQueue()函数执行出现问题:" + e);
            }
            //执行添加的样式集
            try{
                Style.import();
            } catch(e){
                Debug.error("Style.importStyles()函数执行出现问题:" + e);
            }


        },
        //导入样式
        importStyles:function(){
            //获取样式集
            var styles = Config.styles[0];
            //获取option
            var option = Data.getGmValue("option");
            Debug.log("option:"+option);
            //添加样式到队列
            try{
                Style.addQueue(styles.commonStyle);
                Style.addQueue(styles.menuStyle);
                switch(option){
                    case 1:Style.addQueue(styles.onePageStyle);break;
                    case 2:Style.addQueue(styles.towPageStyle);break;
                }
            }catch(e){
                Debug.error("Style.addQueue()函数执行出现问题:" + e);
            }
            //执行添加的样式集
            try{
                Run.one(Style.import);
            } catch(e){
                Debug.error("Style.importStyles()函数执行出现问题:" + e);
            }


        },
        //安装重置配置功能
        setClickResetRun:function(){
            Debug.log("安装重置……");
            //click 事件
            var $selector = $(Config.resetSelectors.join());
            $selector.each(function(){
                $(this).one('click',function(){
                    Data.resetAll();
                });
            });
            Debug.log("安装重置成功");
        },
        //屏蔽广告
        removeAds:function(){
            $( Config.ads.join()).remove();
        },
        //屏蔽再次出现的广告
        hideLaterAds:function(){
            var $selector = $("#content_left>div[id='1']");
            var $result =  $selector.next().attr('id') == 2;
            if($result){
                $selector.attr("id","a1");
            }
            GM_addStyle("#content_left > div[id='1'],#content_left .result~div[id='1'] {display: none!important;}");
        },
        //屏蔽广告联盟
        closeAdsCookie:function(){
            var cpro_url = "http://help.wangmeng.baidu.com/cpro.php";
            var img = document.createElement("img");
            img.src = cpro_url + "?pry=" + 1 + "&_t=" + (new Date()).getTime();
        },
        //插入自定义菜单
        inserCustomMenu:function(){
            //文档加载完成再运行
            if($("#CustomMenu").length <1){
                var $parent = $("#u");
                var $div=$("<a id='CustomMenu'><ol class='button'> <li>自定义</li> </ol> <ol class='menu'> <li>普通样式</li> <li>居中单列</li> <li>居中双列</li> </ol></a>");
                $div.prependTo($parent);
            }
        },
        //绑定自定义菜单事件
        bindCustomMenuEvent:function(){
            var $menu = $("#CustomMenu .menu");
            var $lis  =  $("#CustomMenu .menu li");
            //自定义菜单点击
            $("#CustomMenu").click(function() {
                $menu.css("display", "block");
            });
            //关闭自定义菜单
            $(document).mouseup(function(e) {
                var _con = $menu;
                if(!_con.is(e.target) && _con.has(e.target).length === 0) { // Mark 1
                    $menu.css("display", "none");
                }
            });
            //自定义菜单选择
            $lis .each(function(index){
                $(this).click(function(){
                    Data.setGmValue("option",index);
                    location.href = location.href;
                });
            });

        },
        twoPageDisplay:function(){
            var option =Data.getGmValue("option");
            if(option === 2){
                var $div = $("<div id='double'></div>");
                var $double = null;
                var $parent = null;
                var $selector = null;

                if($("#content_left>#double").length < 1){
                    $parent = $("#content_left");
                    $selector = $("#content_left>.c-container:odd");
                    $div.prependTo($parent);
                    $selector.prependTo($("#double"));
                }

            }
        },
         //绑定快捷键
        bindQuickHotkey:function(){
            $(document).keydown(function(event) {
                //上一页  Ctrl + <-
                if(event.keyCode == 37 && event.ctrlKey) {
                    $(".n:first").click();
                }
                //下一页  Ctrl + ->
                if(event.keyCode == 39 && event.ctrlKey) {
                    $(".n:last").click();
                }
                //搜索框  Ctrl + Enter
                if(event.keyCode == 13 && event.ctrlKey ) {
                    $("#kw").select();
                }
            });
        },

    };

    /*
    兼容自动翻页*/
    function autoLoadPage(){
        var option = Data.getGmValue("option");
        if(option != 2){
            return;
        }
        var count = 0;
        var num = 0;
        var isRun = false;
        //滚动运行
        $(window).scroll(function() {
            num++;
            if(num % 10 ===0 && isRun===false ){
                isRun=true;
                num = 0;
                //兼容自动翻页脚本
                if($("#content_left>.sp-separator").length > count){
                    count++;
                    var $parent = $("#content_left>.sp-separator:not(.used)");
                    var $selector = $("#content_left>.sp-separator:not(.used)~.c-container:odd");
                    $parent.addClass("used");
                    $selector.appendTo($("#double"));
                }
                 isRun=false;
            }

        });
    }


    /*
    动态函数
    */
    function  mutationfunc(){
        if(Check.isOffsetHight()){
            try{
                Debug.count("multationfunc执行的次数");
                Launch.importStyles();
                Run.readyOne(Launch.inserCustomMenu);
                Run.readyOne(Launch.bindCustomMenuEvent);
                Run.readyOne(Launch.setClickResetRun);
                Run.readyOne(Launch.closeAdsCookie);
                Run.readyOne(Launch.bindQuickHotkey);
                Run.ready(Launch.removeAds);
                Run.ready(Launch.hideLaterAds);
                Run.ready(Launch.twoPageDisplay);
                Run.ready(autoLoadPage);
                Run.ready(Data.resetAll);

            }catch(e){
                Debug.error("mutationfunc()函数出现问题:" + e);
            }
        }else{
            if(!Config.isImportIndexStyple){

                //导入百度首页样式
                 Launch.importIndexStyles();
                //设置成已经导入
                Config.isImportIndexStyple = true;
            }
        }

    }

    try{
        //动态监视DOM树的变化
        var MutationObserver = window.MutationObserver || window.WebKitMutationObserver || window.MozMutationObserver;
        if(MutationObserver){
            var observer = new MutationObserver(mutationfunc);
            var wrapper = document.querySelector("#wrapper");
            observer.observe(wrapper, {
                'childList': true,
                //"attributes": true,
                //"subtree":true,
                //"characterData":true,
                //"attributesFilter": ["class"],
            });
            // 动态加载函数
            mutationfunc();


        }else{
            setInterval(function(){
                // 动态加载函数
                mutationfunc();
            },500);
        }
    }catch(e){

    }



})();
