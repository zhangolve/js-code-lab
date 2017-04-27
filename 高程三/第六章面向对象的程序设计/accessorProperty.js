// 2017.04.26 访问器属性的设置

var book={
	_year:2004,
	edition:1
}

//注意这里是 defineProperty 而不是Objcet.defineProperties
Object.defineProperty(book,"year",{
	get:function(){
		return this._year;
	},
	set:function(newValue){
		if(newValue>2004){
			this._year=newValue;
			this.edition+=this._year-2004;
		}
	}
});
book.year=2008;
// console.log(book._year);  //2008
// console.log(book.edition); //5

book._year=2009;
console.log(book._year); //2009

var common={
	
	edition:1,
	_year:2004
}

// common.year=2008;
// console.log(common.year);
// common._year=2008;
// console.log(common._year);
//这个时候common.year是可以改变的了



//下面这个例子，当year>2017当前年份的时候，显示的是负数，差多少年。
// Object.defineProperty(common,"year",{
// 	get:function(){
// 		return this._year;
// 	},
// 	set:function(newValue){
// 		console.log("set",newValue);
// 		if(newValue>2017){
// 			this._year=2017-newValue;

// 		}
// 		else{
// 		this._year=newValue;
// 	}
	
// 	}
// });

// common._year=2008;
// console.log(common._year);
// common._year=2080;
// console.log(common._year);


//  例子三 P142

var people={
	name:'zhangolve'
}

Object.defineProperties(people,{
	name:{
		writable:false  //这个时候是不可写状态只能够读取
		//value:"tom" //如果加上这一行的话，又会改变初始值，尽管他是不可读取的，但这个时候people.name已经变成了tom   
	}
});

people.name="tom";
console.log("name",people.name);//zhangolve

