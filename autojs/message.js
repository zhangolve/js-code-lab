// sudo ls -s /mnt/c/Users/13823/Documents/leidian/Misc/message.js  ./message.js
// test soft 
// 配合腾讯qq邮箱处理

let sendEmailFunc = (text)=> {
    log(text)
    sleep(2000)
    app.sendEmail({
        email: ["1262010981@qq.com"],
        subject: "闲鱼提醒",
        text: text
    });

    sleep(5000)
    press(168, 1687, 200)

    sleep(1000)

    press(972, 139, 200)
    sleep(200)
    Home();
}



events.observeNotification();
events.on("notification", function(n){
    if(n.getPackageName()=="com.taobao.idlefish") {
        n.click();
        sleep(1000)
        id("iv_order").findOne().click()
        sleep(1000)
        let text = bounds(0,204,1080,404).findOne().text();
        back();
        
        var a= className('android.widget.EditText').findOne();

        let copy =()=> {
            a.click();
            KeyCode("KEYCODE_SPACE")
            const desc ='看图一\n联系';
            setClip(desc);
            sleep(300);
            a.paste();
        }

        copy();
        press(982, 1836, 200);
        sleep(300)
        Home();
        sendEmailFunc(text)
    }
});

