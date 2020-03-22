var launched = app.launch("com.taobao.idlefish");
console.log('launched', launched)
if (launched) {
    press(11348, 1350, 200);
    sleep(2000)
    alert('333')
    var d=press(17611, 4395, 200); // press fabu
    console.log(d,'d')
}

// toast(i);
events.observeTouch();
//注册触摸监听器
events.onTouch(function(p){
    //触摸事件发生时, 打印出触摸的点的坐标
    alert(p.x + ", " + p.y);
});


var launched = app.launch("com.taobao.idlefish");
events.observeToast();

const backHomePage = () => {
    // !text("任务").findOne() ||!
    while(text("赚钱").findOne()  )
    {
        back();
        sleep(2000);
    }
}

if( launched) {
    sleep(3000)
    //var d=press(967, 1845, 200); // press fabu 我的
    
    press(541, 1824, 200)

    sleep(2000)


    press(527, 1549, 200)
    
    // bounds = (0,192,266,458)
    var first = [212, 245];
    // for i=10;
    for(var j=0;j<3;j++) {
        for(var i=0;i<4;i++) {
            sleep(1000)
            press(first[0]+266*i, first[0]+266*j, 200)
            if(i*j>8) {
                break;
            }
            }
    }


    // text = 
    // indexInParent = 18
    console.log(className('android.view.View').depth(11).indexInParent(0).findOne().click(), 333);
    console.log(className('android.view.View').depth(11).indexInParent(0).text('').findOne())
    // console.log(className('android.view.View').depth(10).indexInParent(21).findOne().childCount());
    // .forEach(function(child){
    //     console.log(child.className());
    // })
}
