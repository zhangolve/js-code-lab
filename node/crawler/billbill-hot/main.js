 var fs = require('fs')
var YT = require('./ytupload')
var config = require('./config.json')
var currentFile = 0
var useProxy = false;
// process.env.HTTPS_PROXY = 'http://127.0.0.1:8123';

if (process.argv.find(a => a == 'clear' || a == '-clear' || a == '--clear')) {
    let file = 'google-apis-nodejs-quickstart.json'
    fs.unlink(file, (err) => {
        if (err)
            console.log(`Failed deleting '${file}':\n${err}`)
        else
            console.log(`Successfully deleted '${file}'`)
        process.exit()
    })
}


function getTime() {
    function btf(inp) {
    	if (inp < 10)
	    return "0" + inp;
    	return inp;
    }
    var date = new Date(),
        y = date.getFullYear(),
        m = btf(date.getMonth()),
	d = btf(date.getDate()),
	h = btf(date.getHours()),
	min = btf(date.getMinutes()),
    s = btf(date.getSeconds());
    return {
        d, m, y, h, min, s
    }
}

// 这里的判断也有问题，一个文件名可能包含.
var files = fs.readdirSync(config.vidpath)
    .filter(f => { 
        var ext = f.split('.')[f.length-1]
        return ext == 'mp4' ||
               ext == 'flv'
    })

if (files.length == 0) {
    console.log(`Please place some video files into '${config.vidpath}' before starting the script.`)
    process.exit()
} 

var time = getTime()
YT.upload({
    title: `${files[0].split('.')[0]}`,
    file: config.vidpath + '/' + files[0],
    privacy: 'public',
    description: `转载自billbill`
})

YT.event.on('progress', () => {
    time = getTime()
    console.log(`

  [${time.d}.${time.m}.${time.y} - ${time.h}:${time.min}:${time.s}]

  Uploading video file '${files[currentFile]}'...
    `)
})

YT.event.on('finished', () => {
    if (++currentFile < files.length) {
        let f = files[currentFile]
        YT.upload({
            title: `${f.split('.')[0]}`,
            file: config.vidpath + '/' + f,
            privacy: 'public'
        })
    } else {
        process.exit()
    }
    console.log(`Finished uploading ${currentFile} video files.`)
})