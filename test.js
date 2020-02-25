const arr = [];
const doWork =(value)=> {
console.log(value,'value');
this.intervalTimer = setInterval(()=>{
    if (this.timer) {
        return;
    } else {
        this.timer = setTimeout(() => {
            arr.push(value)
            clearTimeout(this.timer);
        }, Math.random() * 10000);
        clearInterval(this.intervalTimer)
    }
},100)

}

const allDoWork = () => {
    for(const i=0;i<5;i++) {
        doWork(i);
    }
}