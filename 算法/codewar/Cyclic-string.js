// function cyclicString(s) {
//   //coding and coding..
//   console.log(s.substr(1, 2));
//   console.log(s);
  
// }
// cyclicString("thisjfief");

/*
重复的字符串

abcab  返回3 因为abc ab 接下来可能接上c，然后就构成了重复

aba  这样的话，返回2 ，因为可能接上b，然后构成重复，不过不要想接上 cabac 构成abacabac这样的字符串了
ccccccccccc 返回1
abaca  返回4
*/


/*
分情况
1 这里面没有重复的子字符串，找到与第一位的字母一致的最后一位，得出总数

2 如果是有重复的字符串，则可以得到这个重复字符串的长度，第二种情况更加复杂一点


*/


