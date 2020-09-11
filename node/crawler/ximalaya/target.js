const fs = require('fs')
const {downloadAlbum} = require('./index');

const readFile = require("util").promisify(fs.readFile);

const extraFilePath = './extra.txt';

async function run(filePath) {
  try {
      const fr = await readFile(filePath,"utf-8");
      console.log(fr)
      const ids = fr.split('\n')
      for (var id of ids) {
        await downloadAlbum(id);
        }
        process.exit(0)
      return 'finished';
   } catch (err) {
      console.log('Error', err);
      await run(extraFilePath)
   }    
}

run(extraFilePath)