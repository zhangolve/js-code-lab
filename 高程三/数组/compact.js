//  拍平数组
// 递归

//其实总结一下，我自己有时候很难想到的问题的解决方案，
//大概两类，一个是递归的处理，一个是使用动态规划
/*
let  arr=[function(){console.log(1)},"1333",2,3,{"a":"3ijf3i","b":"fieeie"},[1,2,[1,2]] ,[1,[1,2,[1,2,[3,4]]]] ];
     var newArr=[];
		 function compact(arr)
		 {
		 	
	   for(var i=0;i<arr.length;i++)
	   {
	   	if(!Array.isArray(arr[i]))
	   	{
	   		newArr.push(arr[i]);
	   	}
	   	else{
	   		compact(arr[i]);
	   	}
	   }
	 }

compact(arr);

console.log(newArr);
*/
//typeof arr[0]  function
// arr[0].length 1

// arr[1].length 4

//typeof arr[4]  object

//console.log(Object.prototype.toString.apply(arr[4]));  // [object Object]



let arr = [function() { console.log(1) }, "1333", 2, 3, { "a": "3ijf3i", "b": "fieeie" },
    [1, 2, [1, 2]],
    [1, [1, 2, [1, 2, [3, 4]]]]
];




//compact(arr);

//console.log(newArr);
//这个时候，又是巧用this的时候了。


Array.prototype.compact = function() {
    var newArr = [];

    function compact(arr) {

        for (var i = 0; i < arr.length; i++) {
            if (!Array.isArray(arr[i])) {
                newArr.push(arr[i]);
            } else {
                compact(arr[i]);
            }
        }
    }
    compact(this);
    return newArr;
}

let comArr = arr.compact();
console.log( comArr);

//不改变原来的数组

