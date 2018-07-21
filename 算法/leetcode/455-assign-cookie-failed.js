/**
 * @param {number[]} g
 * @param {number[]} s
 * @return {number}
 */
var findContentChildren = function(g, s) {
    gmin = 0;
    smin = 0;
    sminIndex = -1;
    os = s;
    count =0;
    
    var popgMin = function(g) {
        gmin = Math.min(...g)
        var goalIndex = g.indexOf(gmin)
        return g.filter((item,index)=>index!==goalIndex)
    }
    var popsMin = function(s) {
        smin = Math.min(...s)
        sminIndex = s.indexOf(smin);
        return s.filter((item,index)=>index!==sminIndex)
    }
    
    while(g.length>0) {
        g = popgMin(g);
        while(s.length>0) {
        s = popsMin(s);    
        if(smin>=gmin) {
            //　这里不应该用filter
           s = os.filter( (item,index)=>index!=sminIndex);
           os=s;
            count++;
            break;
        } else if(s.length==0) {
            s=os;
            break;
            //从来没有匹配上
        }
            
        }
    }
    return count;
    
};

//https://leetcode.com/problems/assign-cookies/description/

//　看别人的解法，我失败的原因是没有先排序，而是做了min　pop这样的动作。

var findContentChildren = function(g, s) {
    var compare = function(a, b) {return b - a};
    g.sort(compare);
    s.sort(compare);
    var j = 0;
    for (var i = 0; i < g.length; i++) {
        if (g[i] <= s[j]) j++;
    }
    return j;
};

// 先排序，因为要求　s[j]>g[i]因此,只要找到最小的j，就可以顺带着连pop的工作都做了。
//　如果连j==0都通不过，也就表示ｇ的最大值都比ｓ的最小值小，就也无须再比较了。
//　说到底，还是始终要拿s的最小值去跟ｇ的最小值比较

// [7,8,9,10]   [5,6,7,8]
// 注意是降序排序
// [10,9.8,7]  [8,7,6,5]
// 先把最大的给最大的
