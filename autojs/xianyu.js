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