const fs = require('fs');
const path = process.cwd();

fs.readdirSync(path)
    .forEach((f, index) => { 
        console.log(f,'f', index)
        const splited = f.split('.')
        const ext = splited[splited.length-1]
        const name = splited[splited.length-2]
        console.log(name)
        let newName = name;
        if(name.length==2) {
            newName = '0'+name;
        } 
        if(name.length==1) {
            newName = '00'+name;
        }
        if(name!==newName) {
            fs.renameSync(f, `${newName}.jpg`)
        }
    });