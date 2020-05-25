const Path = require('path')

const axios = require("axios");
const {getAlbum} = require('./index');
let basePath = '/mnt/c/Users/13823/Music/audios/'
const mkdirp = require('mkdirp');
XLSX = require("xlsx");
const headers = require("./headers");

const category = {
    'renwen': '人文',
    'jiaoyu': '教育',
    'shangye': '商业',
    'lishi': '历史',
    'ertong': '儿童',
    'xiangsheng': '相声评书',
    'gongqingtuan': '艺术',
    'youshengshu': '有声书'
};

const getRankUrl = (cate) => `https://www.ximalaya.com/revision/rank/v2/element/code?typeCode=paid&clusterCode=${cate}`


const cates = Object.keys(category);
// 目录结构，判断是否已经下载过了。


const _data = [];
const getOneRank = async (cate) => {
    console.log(cate)
    try {
        const response = await axios.get(getRankUrl(cate), {
            params: {
                method: 'GET',
                gzip: true,
                headers,
                timeout: 30000,
            }
        });
        const res = response.data;
        const rankList = res.data.rankList[0];
        const {
            ids
        } = rankList;
        for (var id of ids) {
            const res = await getAlbum(id);
            const {data} = res;
            const isFinished = data.mainInfo.isFinished ===2 ? '是' : '否';
            const isJingPin = data.mainInfo.vipType === 0 ? '是' :'否';
            const {crumbs} = res.data.mainInfo;
            const {categoryTitle} =crumbs;
            // albumId 名称 是否完结 基数 分类 是否精品
            const {albumId} = data;
            const trackTotalCount = data.tracksInfo.trackTotalCount;
            const title = data.recommendKw.sourceKw

            _data.push({
                'id': albumId,
                 '专辑名':title , 
                 '是否完结':isFinished , 
                 '集数':trackTotalCount ,
                  '分类': categoryTitle,
                  '是否是精品': isJingPin 
            })
            console.log(_data.length)
        }
        return 'finished';
    } catch (e) {
        console.log(e);
        await getOneRank(cate);
    }
}

async function init() {
    for (var cate of cates) {
        // async of sync
        console.log('123')
        await getOneRank(cate)
    }
}

// init();


const exportReport = async () => {
await init();
var _headers = ['id', '专辑名', '是否完结', '集数', '分类','是否是精品']
// var _data = [ { id: '1',
//                 name: 'test1',
//                 age: '30',
//                 country: 'China',
//                 remark: 'hello' },
//               { id: '2',
//                 name: 'test2',
//                 age: '20',
//                 country: 'America',
//                 remark: 'world' },
//               { id: '3',
//                 name: 'test3',
//                 age: '18',
//                 country: 'Unkonw',
//                 remark: '???' } ];

var header = _headers
                .map((v, i) => Object.assign({}, {v: v, position: String.fromCharCode(65+i) + 1 }))
                .reduce((prev, next) => Object.assign({}, prev, {[next.position]: {v: next.v}}), {});

var data = _data
              .map((v, i) => _headers.map((k, j) => Object.assign({}, { v: v[k], position: String.fromCharCode(65+j) + (i+2) })))
              .reduce((prev, next) => prev.concat(next))
              .reduce((prev, next) => Object.assign({}, prev, {[next.position]: {v: next.v}}), {});

// 合并 headers 和 data
var output = Object.assign({}, header, data);
// 获取所有单元格的位置
var outputPos = Object.keys(output);
// 计算出范围
var ref = outputPos[0] + ':' + outputPos[outputPos.length - 1];

// 构建 workbook 对象
var wb = {
    SheetNames: ['mySheet'],
    Sheets: {
        'mySheet': Object.assign({}, output, { '!ref': ref })
    }
};

// 导出 Excel
const s=XLSX.writeFile(wb, 'output.xlsx', function(err, res) {
    console.log(err,res)
});
console.log(s)

}


// =IF(COUNTIF($A$2:A2,A2)=COUNTIF(A:A,A2),"保留","删除")
// worksheet.addRow({id: 1, name: 'John Doe', dob: new Date(1970,1,1)});


exportReport();