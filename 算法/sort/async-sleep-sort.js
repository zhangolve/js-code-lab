// 睡眠排序

// https://mp.weixin.qq.com/s?__biz=MzI2NjA3NTc4Ng==&mid=2652080602&idx=1&sn=7315cef4dd97fc8c1e3247b992e98f1f&chksm=f174823fc6030b29863f4dfb48ad23ac0511fda8a45a95b76b52879080434f30646dd0b47a29&scene=0&xtrack=1#rd

// async await 

//
// nums = [1,2,5,4,3,8,100,6];
// const result = [];
// // for(var i=0;i<nums.length;i++) {
    //　这里只会是undefined 
// //     setTimeout(function(){
// //         console.log(nums[i]);
// //     },nums[i])
// // }

// nums.forEach(function(element){
//     setTimeout(function(){
//         result.push(element);
//     },element*10) 
// })


function x(nums) {
    var promise = new Promise(function(resolve, reject) {
        var result = [];        
        nums.forEach(function(element){
            setTimeout(function(){
                result.push(element);
                if(result.length===nums.length) {
                    resolve(result);
                }
            },element*10) 
        })

    });
    return promise;
 }
  
 async function sleepSort_v2(nums) {
   const result = await x(nums);
   console.log(result); // --> 'done!';
 }

 sleepSort_v2([1,2,5,4,3,100,8]);
