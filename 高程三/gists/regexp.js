/* ^匹配开头  */
let reg=/^1/;
reg.test(123);  //true;
reg.test(234); //false;
reg.test('123'); //true;

/* $匹配字符串的结尾  */

let reg=/2$/;
reg.test('123'); //false ;
reg.test('132'); //true;

/* 结合上面两个规则  */
/*匹配1开头，2结尾 */
let reg=/^1.*?2$/;
reg.test('123'); //false;
reg.test('132'); //true;
reg.test('232'); //false;
reg.test('143'); //false;

/* 特殊字符 */
/*\d 结合上面的规则 */
let reg=/^\d+/;
reg.test('2433');//true;
reg.test('a123'); //false;

reg=/^\d.*?\d$/;  //redefine reg
reg.test('2333'); //true;
reg.test('a2333'); //false;
reg.test('2333b'); //false;

/*string.match*/
let reg=/<noscript>.*?<\/noscript>/g;
let reg2=/src='(.*?)'/;
let a="5566<noscript><img data-rawheight='384' data-rawwidth='512' src='https://pic4.zhimg.com/5cb36eebd4f43757024147226aa6c4bf_b.jpg' class='origin_image zh-lightbox-thumb' width='512' data-original='https://pic4.zhimg.com/5cb36eebd4f43757024147226aa6c4bf_r.jpg'></noscript>444efjiefjie<noscript><img data-rawheight='384' data-rawwidth='512' src='https://test2.jpg' class='origin_image zh-lightbox-thumb' width='512' data-original='https://pic4.zhimg.com/5cb36eebd4f43757024147226aa6c4bf_r.jpg'></noscript>";
var  src=a.match(reg)
let imageList=[];
for(let imageNum=0;imageNum<src.length;imageNum++)
{
  imageList.push(`![](${src[imageNum].match(reg2)[1]})`);  //["src='https://pic4.zhimg.com/5cb36eebd4f43757024147226aa6c4bf_b.jpg'", "https://pic4.zhimg.com/5cb36eebd4f43757024147226aa6c4bf_b.jpg"]
}
for(let i=0;i<src.length;i++)
{
	a=a.replace(src[i],imageList[i]);

}
console.log(a);//5566![](https://pic4.zhimg.com/5cb36eebd4f43757024147226aa6c4bf_b.jpg)444efjiefjie![](https://test2.jpg)

/*match china mobilephone number*/
let reg = /^((13[0-9])|(17[0-1,6-8])|(15[^4,\\D])|(18[0-9]))\d{8}$/;

//here we must should know \d{8} means match 8 numbers
// for example 



