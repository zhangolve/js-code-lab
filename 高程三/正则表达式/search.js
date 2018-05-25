// 20180525

const fullStores = [{name:'安贞华联店',full_address:"北京市朝阳区安贞西里五区2、3号楼安贞店三层F3",id:1}, {name:'草桥上品折扣店',full_address:"北京市丰台区草桥东路1号上品折扣三层",id:2}]

filterStore = (value) => {
    const values = value.split(/\s+/g);
    const resultStoresArr =  values.map(value=>fullStores.filter( store=>store.full_address.indexOf(value)!==-1 || store.name.indexOf(value)!==-1));
    const combine = (a, b, p) => a.filter( aa =>   ! b.find ( bb => aa[p] === bb[p])   ).concat(b);
    const resultStores = resultStoresArr.reduce( (i,j)=> combine(i,j,'id')  , []);
    console.log(`search ${value} result is ${JSON.stringify(resultStores)}`);
}


filterStore('朝阳');
filterStore('朝阳 商品');
filterStore('朝阳 上品');
filterStore('草桥');
filterStore('004u3934u9');

//搜索结果取并集