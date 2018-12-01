const { exec } = require('child_process');
const yougetBase = 'you-get -o ./videos https://www.bilibili.com/video';  

function waitYou(aid) {
    return new Promise((resolve,reject)=>{
        const cmd = `${yougetBase}/av${aid} --debug`
        console.log(cmd)
        exec(cmd, (error, stdout, stderr) => {
            if (error) {
              console.error(`exec error: ${error}`);
              reject(error)
            }
            resolve(stdout)
            console.log(stdout);
        })
    })
}


function direct(aid) {
    exec(`${yougetBase}/av${aid} --debug`,{shell: true}, (error, stdout, stderr) => {
        if (error) {
          console.error(`exec error: ${error}`);
        //   reject(error)
        }
        // resolve(stdout)
        console.log(stdout);
    });
}
 // waitYou(36931079);

//  direct(36931079)

const arr = ['36426489', '36931079', '24868082'];

go = async function(aid) {
    let tryCount = 0;
    try { 
        await waitYou(aid)
    } catch (error) {
        if(tryCount<10) {
            go();
        } 
        console.log('ignore error');
    }
}

function part(some) {
    return new Promise((resolve,reject) => {
        for(var i=0; i<some.length; i++) {
            go(some[i]);
        }
        resolve(true);
    });
}

// 线程控制,每次只同时下载两个视频 

// 还是没有很好地处理好异步


async function doit() {
    const some = arr.splice(0,2);
    console.log(some,'some');
    a = await part(some);
    if(a) {
        if(arr.length>0){
            doit();
        } else {
            console.log('success');
        }
    }
}

doit();