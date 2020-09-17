// https: //www.ximalaya.com/revision/rank/v2/element/code?typeCode=paid&clusterCode=
const Path = require('path')

const axios = require("axios");
const {downloadAlbum} = require('./index');
let basePath = '/mnt/c/Users/13823/Music/audios/'
const mkdirp = require('mkdirp');
const headers = require("./headers");
const albumIds = [20654769,
    18546258,
    19232895
];
    // 'lishi': '历史',
    // 'shangye': '商业',

const category = {
    // 'youshengshu': '有声书',
    'renwen': '人文',
    'jiaoyu': '教育',
    'ertong': '儿童',
    // 'xiangsheng': '相声评书',
    'gongqingtuan': '艺术',
    // 'youshengshu': '有声书',
};

const getRankUrl = (cate) => `https://www.ximalaya.com/revision/rank/v2/element/code?typeCode=paid&clusterCode=${cate}`


const cates = Object.keys(category);
// 目录结构，判断是否已经下载过了。

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
            await downloadAlbum(id);
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
        await getOneRank(cate)
    }
    process.exit(0)
}

init();



// 未完结 =》 完结 下载过的文件