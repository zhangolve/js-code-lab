var launched = app.launch("com.taobao.idlefish");
events.observeToast();

if( launched) {
    
    let submitProduct = (count, movie) => {
    
    let enterStart = ()=>{
    var first = [212, 245];

    sleep(3000)
    
    press(541, 1824, 200)

    sleep(2000)


    press(527, 1549, 200)

    for(let order=0;order<count;order++) {
    let i = order % 4 ; 
    let j = Math.floor(order / 4); 
    sleep(2000)
    
    scrollUp()
    sleep(1000)
    
    press(first[0]+266*i, first[1]+266*j, 200)
    sleep(1000);
    }
    
    textContains('下一步').click();
    sleep(1000)
    text('下一步').click();
    sleep(300)
    }

    let enterDetail =()=> {
    
        var a= packageName('com.taobao.idlefish').className('android.widget.EditText').depth(11).findOne();

        let copy =()=> {
            a.click();
            KeyCode("KEYCODE_SPACE")
            const desc = '脐橙  '+ movie+' \n脐橙'+movie+'。音频 脐橙包邮\n脐橙包邮脐橙， 脐橙包邮，看图一!图二！oh，mygod。脐橙包邮！脐橙包邮！脐橙包邮！脐橙包邮！\n精选一级果，产地直销，现摘现发，甜脆多汁，皮薄肉厚，果香浓郁，果园直发，新鲜到家！\n这个脐橙也太好吃了吧。\n答应我，买它！买它！\n感兴趣的给我留言吧！\n感兴趣的给我留言吧！\n本交易仅支持自提、当面交易、邮寄';
            setClip(desc);
            sleep(300);
            a.paste();
        }

        copy();
        sleep(2000);
        copy();
    }

    let enterPrice = ()=> {
        textContains('开个价').click();
        sleep(500)
        text('3').click();
        // sleep(200)
        // text('.').click();
        // sleep(200)
        // text('6').click();
        // sleep(200)
        // text('6').click();
        sleep(200)
        text('确定').click();
    }
    
    // 脚本

    let enterMoreInfo =()=> {
    console.log(555)
    sleep(200)


    let categoryAll = (triedTimes)=> {
        console.log(textContains("更多信息").exists(), textContains("补充").exists())
    if(textContains("更多信息").exists() && !textContains("补充").exists()) {
        Tap(833, 1625)

        sleep(2000)
        if(triedTimes ===0) {
            Tap(312, 416)
        }
        if(triedTimes === 1) {
            Tap(234, 412)
        }
        Tap(917, 136)
        sleep(3000)
        if(triedTimes>3) {
            return;
        } 
        categoryAll(triedTimes+1);
    }
    }
    categoryAll(0);
}

let enterSubmit = () => {
    sleep(200)
    Tap(940, 150)
    sleep(5000)
    back();
}

enterStart();
enterDetail();
enterPrice();
enterMoreInfo();
enterSubmit();
}

    
let caliangAll = () => {
    let caliang = () => {
        desc('擦亮').find().each(function(w){
            w.click();
            sleep(2000)
        })
    }
    textContains('我发布的').click();
    sleep(2000);
    let scrollable = true;
    while (scrollable ) {
        caliang();
        scrollable = scrollDown()
        sleep(2000)
    }       
}

    var movieListFile = open('/sdcard/Misc/audio_list.txt');
    if(movieListFile) {
        var movieList =  movieListFile.readlines()
        for(let i=0;i<movieList.length;i++ ) {
            submitProduct(5, movieList[i])
            sleep(2000);
        }
    }
    caliangAll()
}

// desc("擦亮")

// todo
// 异常处理，点击发布失败，提醒不能发布违禁产品的处理。