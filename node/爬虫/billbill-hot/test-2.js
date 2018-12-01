const { exec } = require('child_process');
const yougetBase = 'you-get -o ./videos https://www.bilibili.com/video';  

function direct() {
    const arr = ['36426489', '36931079', '24868082'];
    const some = arr.splice(0,2);
    function execCommand(aid) {
        const cmd = `${yougetBase}/av${aid} --debug`;
        console.log(cmd);
        exec(cmd, (error, stdout, stderr) => {
            if (error) {
                console.error(`exec error: ${error}`);
                if(tryCount<10) {
                    execCommand(aid);
                } else {
                    return ;
                }
            } else {
                console.info(`exec staut: ${stdout}`);
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

direct();


