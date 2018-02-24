var countAndSay = function(n) {
    if(n<=1) return '1';
    var countSay = '1';
    for(var i=2;i<=n;i++) {
        var count=1;
        var temp = countSay.split('');
        var cursor =0;
        countSay = '';
        for(var j=1;j<temp.length;j++) {
               if(temp[j]=== temp[cursor]) {
                   count++;
                   cursor++;
               } else {
                 countSay += count;
                 countSay += temp[cursor]
                 count=1;
                 cursor++;
               }
        }
        countSay += count;
        countSay += temp[cursor]
    }
    return countSay;
};

console.log(countAndSay(6));


/*

注意这里的：        
当temp.length=1的时候
for(var j=1;j<temp.length;j++) {
               
 }
这个时候，不会进入for循环内部。
我一开始有点不知如何是好的，也是当‘1’这样的情况，该如何处理。实际上，这个时候直接进入跳过for循环，进入了
        countSay += count;
        countSay += temp[cursor]
        就比较好了。

总体来说，有一些参考：https://skyyen999.gitbooks.io/-leetcode-with-javascript/content/questions/38md.html

在这里总的思想还是用到了两重for 循环，第一层用来遍历n，第二层用来查找每一个n-1的值。

我在这里用到了cursor，一个光标，指定当前查找到了哪个index。
*/