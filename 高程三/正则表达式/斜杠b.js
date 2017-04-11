/* 2017/04/11*/
/*
\b 元字符匹配单词边界。
在单词边界匹配的位置，单词字符后面或前面不与另一个单词字符直接相邻。请注意，
匹配的单词边界并不包含在匹配中。换句话说，匹配的单词边界的长度为零。（不要与 [\b] 混淆。）
*/


var str="this is a test";

var newStr=str.replace(/\w/g,"b");
//console.log(newStr);  //bbbb bb b bbbb

//console.log(str);//原字符串不发生改变

newStr=str.replace(/\s.|^./g, function($0){
	console.log($0);  //$0 是一个由一个空格和一个字母组成的字符串
	return $0.toUpperCase();
});

console.log(newStr);

/*.操作符是只匹配一个字符*/
