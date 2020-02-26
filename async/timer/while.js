const arr = [];

const delay = (value)=> {
    doingDelay = true;
    return new Promise((resolve, reject)=> {
        
    setTimeout(()=> {
        doingDelay = false;
        resolve();
    }, (10-value>0? 10-value : 3) * 1000)
    })
}


async function doWork (value, initArr) {
    // await interval();
    await delay(value);
    initArr.shift();
    doingDelay = false;

    arr.push(value)
    clearTimeout(this.timer);
    clearInterval(global.intervalTimer)
    global.intervalTimer = null;
    this.timer =null;
    console.log(arr);
}



const a =[];
let count=0;


const update = async (count)=>{
    if(a.length===0) {
        a.push(count)
        allDoWork(a);
    } else {
        a.push(count);
    }
}

const allDoWork = async (arr=[1,2,3,4,5]) => {
    console.log('all do work', arr)
    while(arr.length>0) {
        await doWork(arr[0], arr);
    }

    // what is different with for loop
    // for(var i=0;i<5;i++) {
    //     var value=a.shift();
    //     await doWork(value);
    // }
}

// allDoWork();

// while(a.length>0) {
//     // while(Math.random()>0.5) {
//         allDoWork();
//     // }
// }
// for(let i=0;i<5;i++) {
//     var value = a.shift();
//     allDoWork(value);
// }
setInterval(()=>{
    count+=1;
    update(count);
},1000)

// allDoWork();
    // [ 5, 4, 3, 2, 1 ]


    // allDoWork();
