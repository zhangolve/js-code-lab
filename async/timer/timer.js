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
const delay = (value)=> {
    doingDelay = true;
    console.log(doingDelay,'doing delay');
    return new Promise((resolve, reject)=> {
        
    setTimeout(()=> {
        doingDelay = false;
        clearInterval(interalTimer)
        resolve();
    }, (10-value) * 1000)
    })
}



const interval = () => {
    return new Promise((resolve, reject)=> {
        this.interval = setInterval(()=> {
            if(doingDelay) {
                return;
            } else {
                clearInterval(this.interval);
                resolve();
            }
        },100)
    })
}

async function doWork (value) {
    // await interval();
    await delay(value);
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
    while(a.length>0) {
        var value = a.shift();
        await doWork(value);
    }
}


const a =[1,2,3,4,5];

allDoWork();

// while(a.length>0) {
//     while(Math.random()>0.5) {
//         allDoWork();
//     }

// }

//     for(let i=0;i<5;i++) {
//         var value = a.shift();
//         allDoWork(value);
//     }
// for(var )
// for i [1,2,3]

// 