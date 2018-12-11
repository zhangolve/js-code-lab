const { exec } = require('child_process');
const mkdirp = require('mkdirp');
const yougetBase = 'you-get ';
const pathBase = './videos';  
const bilibiliBase = 'https://www.bilibili.com/video'

function direct(arr, playListName) {
    const some = arr.splice(0,5);
    const exPath = `${pathBase}/${playListName}`;
    mkdirp(exPath, function(err) { 
        if(err) {
            console.log(err); //null
        }
        function execCommand(aid) {
            const cmd = `${yougetBase} -o ${exPath} ${bilibiliBase}/av${aid} `;
            console.log(cmd);
            let tryCount = 0;
            exec(cmd, {maxBuffer: 1024 * 500 }, (error, stdout, stderr) => {
                if (error) {
                    console.error(`exec error: ${error}`);
                    if(tryCount<10) {
                        tryCount++;
                        execCommand(aid);
                    } else {
                        return ;
                    }
                } else {
                    console.info(`exec stdout: ${stdout}`);
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
    });
}



exports.download = direct;

