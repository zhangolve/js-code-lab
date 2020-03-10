const arr = [];

const delay = (value)=> {
    return new Promise((resolve, reject)=> {
        
    setTimeout(()=> {
        resolve();
    }, (10-value>0? 10-value : 3) * 1000)
    })
}


async function doWork (value, initArr) {
    await delay(value);
    initArr.shift();
    arr.push(value)
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

const allDoWork = async (initArr=[1,2,3,4,5]) => {
    while(initArr.length>0) {
        await delay(initArr[0]);
        const value = initArr.shift();
        arr.push(value)
        console.log(arr)
    }
}

setInterval(()=>{
    count+=1;
    update(count);
},1000);
