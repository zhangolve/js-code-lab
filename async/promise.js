
let WebformBuilder = 0;

// console.log('999')
// setTimeout( ()=>{
//     console.log('timeout finally');
//     WebformBuilder=1000
// },3000)


// while (!WebformBuilder) {
//     setInterval(() => {
//         console.log('333')
//     }, 100);
// }

const getBiggerThanHalf = ()=> {

return new Promise((resolve,reject)=>{
    let doloop = (resolve,reject) => {
     const value = Math.random()
    if(value>0.5) {
        resolve(value);
    } else {
        console.log('do loop oce')
        doloop(resolve, reject);
    }
    }
    console.log(resolve,'ee')
    doloop(resolve,reject);
})
}


async function getHalf() {
    console.log('888')
    const value = await getBiggerThanHalf();
    console.log(value)
}

getHalf();

