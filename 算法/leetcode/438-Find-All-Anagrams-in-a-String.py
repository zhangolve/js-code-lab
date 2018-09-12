class Solution(object):
    def findAnagrams(self, s, p):
        """
        :type s: str
        :type p: str
        :rtype: List[int]
        """
        ls, lp = len(s), len(p)  # 'abcdefgabc','abc'
        cp = collections.Counter(p) # 分拆成单个字母后，每个字母出现次数的统计 
        cs = collections.Counter() #空的计数器
        ans = [] # 最后结果的返回列表
        for i in range(ls):
            cs[s[i]] += 1 #开始计数 cs.a= 1 cs.b = 1 cs.c = 1
            if i >= lp: # 如果超过p的长度，则截取cs的长度
                cs[s[i - lp]] -= 1 # 3-3 一定要记住，表示的是出现次数。
                if cs[s[i - lp]] == 0: #为什么是等于0？ 与这条呼应 cs[s[i]] += 1，还是起到截取的作用
                    del cs[s[i - lp]]
            if cs == cp: # 相等了。此时i=2 2-3+1=0
                ans.append(i - lp + 1)
        return ans