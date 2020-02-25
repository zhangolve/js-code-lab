const arr = [];
const abc =(value)=> {
console.log(value,'value');

// global.intervalTimer = setInterval(()=>{
//     if (this.timer) {
//         return;
//     } else {
//         this.timer = setTimeout(() => {
//             arr.push(value)
//             clearTimeout(this.timer);
//             console.log(this.intervalTimer)
//             clearInterval(global.intervalTimer)
//             global.intervalTimer = null;
//             this.timer =null;
//             console.log(arr);
//         }, Math.random() * 10000);
//     }
// },100)




// this.timer = setTimeout(() => {
//     arr.push(value)
//     clearTimeout(this.timer);
//     // clearInterval(intervalTimer)
//     // this.timer =null;
//     console.log(arr);
// }, Math.random() * 10000);
}


let doingDelay = false;
let interalTimer = null;
const delay = ()=> {
    return new Promise((resolve, reject)=> {
        
    setTimeout(()=> {
        doingDelay = false;
        clearInterval(interalTimer)
        resolve();
    },Math.random() * 3000)
    })
}

async function doWork (value) {

    await delay()
    doingDelay = false;
    arr.push(value)
    clearTimeout(this.timer);
    console.log(this.intervalTimer)
    clearInterval(global.intervalTimer)
    global.intervalTimer = null;
    this.timer =null;
    console.log(arr);
}


const allDoWork = async () => {
    for(let i=0;i<5;i++) {
        await doWork(i);
    }
}

allDoWork();