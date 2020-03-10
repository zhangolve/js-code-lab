var launched = app.launch("com.jifen.qukan");
events.observeToast();

const backHomePage = () => {
    // !text("任务").findOne() ||!
    while(!text("赚钱").findOne())
    {
        back();
        sleep(2000);
    }
}
if( launched) {
    sleep(3000)
    //var d=press(967, 1845, 200); // press fabu 我的
    
    press(107, 1834, 200)


    const getRenwuCoin = () => {
        console.log('333')
        var abc = text("abc").findOne();
        console.log('abc', abc);

        var renwuBtn = text("赚钱").findOne();

        console.log(renwuBtn)
        if(renwuBtn) {
            press(750, 1830, 200); // clickable false
            console.log('clicked')
            sleep('2000');
            var shipinBtn = text("看视频领金币").findOne();
            if(shipinBtn) {
                shipinBtn.click();
                sleep(65* 1000);
                backHomePage();
            } else {
                backHomePage();
            }
            console.log('888')
            getRightCoin();
        }
    }

    function getRightCoin () {
        sleep(3000)
        press(970, 142, 200); // 右上角领币
        sleep(3000)
        // alert(currentActivity())
        // 如果观看完成可以直接返回，否则会有弹窗。
        // events.onToast(function(toast){
        //     back();
        //     // log("Toast内容: " + toast.getText() + " 包名: " + toast.getPackageName());
        // });
        var notTheGetPage = text("下载领金币").findOne();
        console.log(notTheGetPage,'not')
        if(notTheGetPage) {
            back();
            getRenwuCoin();
        } else {
            sleep(60*1000); // 看视频, 或直接领取
            back();
            getRightCoin();
            // press(501, 130, 200); // 关闭弹窗
        }
    }

    const getCoins = ()=> {
        // getRightCoin();
        getRenwuCoin();
    }

    getCoins();
    //com.jifen.qkbase.main.MainActivity

}


// 获得了一次看视频的机会。 toast 监听。

// 2020-03-11 系统判定我作弊，无法提取。