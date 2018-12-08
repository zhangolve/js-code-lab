const { exec } = require('child_process');
const yougetBase = 'you-get -o ./videos/001 https://www.bilibili.com/video';  

function direct(arr) {
    // const arr = ['36426489', '36931079', '24868082'];
    const some = arr.splice(0,2);
    function execCommand(aid) {
        const cmd = `${yougetBase}/av${aid} --debug`;
        console.log(cmd);
        let tryCount = 0;
        exec(cmd, (error, stdout, stderr) => {
            if (error) {
                console.error(`exec error: ${error}`);
                if(tryCount<10) {
                    tryCount++;
                    execCommand(aid);
                } else {
                    return ;
                }
            } else {
                console.info(`exec staut: ${stdout}`);
                tryCount = 0 ;
                if(arr.length>0) {
                    execCommand(arr.shift());
                } else {
                    console.log('finish load');
                }
            }
        });
    }
    for(var i=0;i<some.length;i++) {
        const aid = some[i];
        execCommand(aid);
    }
}

// direct();


exports.download = direct;

