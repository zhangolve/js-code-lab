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