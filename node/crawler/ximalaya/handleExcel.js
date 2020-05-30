const XLSX = require("xlsx");
const _ = require('lodash');
var workbook = XLSX.readFile('output.xlsx');
var worksheet = workbook.Sheets['mySheet'];

const data = XLSX.utils.sheet_to_json(worksheet).reverse();

const filteredData = _.uniqWith(data, (a,b)=> {
    return parseInt(a.id)===parseInt(b.id)
})

worksheet = XLSX.utils.json_to_sheet(filteredData);

var wb = {
    SheetNames: ['mySheet'],
    Sheets: {
        'mySheet': worksheet
    }
};
  XLSX.writeFile(wb, 'output.xlsx', function(err, res) {
    if(!err) {
        console.log('write to excel successfully')
    }
});