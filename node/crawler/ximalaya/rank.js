https: //www.ximalaya.com/revision/rank/v2/element/code?typeCode=paid&clusterCode=

    const axios = require("axios");

const albumIds = [20654769,
    18546258,
    19232895
];

const category = {
    'youshengshu': '有声书',
    'renwen': '人文',
    'jiaoyu': '教育',
    'shangye': '商业',
    'lishi': '历史',
    'ertong': '儿童',
    'xiangsheng': '相声评书',
    'gongqingtuan': '艺术'
};

const getRankUrl = (cate) => `https://www.ximalaya.com/revision/rank/v2/element/code?typeCode=paid&clusterCode=${cate}`


const cates = Object.keys(category);
// 目录结构，判断是否已经下载过了。


const getOneRank = () => {
    try {
        const trackResponse = await axios.get(getTrackUrl(trackId), {
            params: {
                method: 'GET',
                gzip: true,
                headers,
                timeout: 3000,
            }
        });
    } catch (e) {
        console.log('e')
    }

}