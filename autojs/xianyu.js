var launched = app.launch("com.taobao.idlefish");
events.observeToast();

if( launched) {
    
    let submitProduct = (order, movie) => {
    
    let enterStart = ()=>{
    var first = [212, 245];

    sleep(3000)
    
    press(541, 1824, 200)

    sleep(2000)


    press(527, 1549, 200)
    let i = order % 4 ; 
    let j = Math.floor(order / 4); 
    sleep(2000)
    
    scrollUp()
    sleep(1000)
    press(first[0]+266*i, first[1]+266*j, 200)
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
            const desc = movie + '电影票\n电影dvd\n#摆渡望潘\n感兴趣的给我留言吧';
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
        text('0').click();
        sleep(200)
        text('.').click();
        sleep(200)
        text('6').click();
        sleep(200)
        text('6').click();
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
        categoryAll(triedTimes+1);
    }
    }
    categoryAll(0);
}

let enterSubmit = () => {
    sleep(200)
    Tap(933, 136)
    sleep(200)
    back();
}

enterStart();
enterDetail();
enterPrice();
enterMoreInfo();
enterSubmit();
}

    var movieListFile = open('/sdcard/Misc/movie_list.txt');
    if(movieListFile) {
        var movieList =  movieListFile.readlines()
        for(let i=0;i<movieList.length;i++ ) {
            submitProduct(i, movieList[i])
            sleep(2000);
            break;
        }
    }
}

// desc("擦亮")