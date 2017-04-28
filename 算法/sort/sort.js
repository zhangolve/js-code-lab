// 2017.4.28


var arr=[1,2,4,6,5,8,3,7,10,9];
// 例子一 ：js原生的api, Array.prototype.sort


//冒泡排序
// //arr=arr.sort((i,j)=>i>j);
// arr.sort((i,j)=>i>j);
// console.log(arr);

//交换两个数的位置
function swap(i,j){
var middle=arr[i];
		arr[i]=arr[j];
		arr[j]=middle;
}

function bubble(){

for(var i=0;i<arr.length;i++){
	for(var j=i+1;j<arr.length;j++)
	{
		if(arr[j]<arr[i])
		{
			swap(i,j)
		}
	}
}
}
// bubble();
// console.log(arr);


//  例子二  选择排序

// 特点 找出最小的元素，放到最前面

function selection(){
	for(var i=0;i<arr.length;i++)
	{
	var min=arr[i];
	var index=i;
	for(var j=i+1;j<arr.length;j++){
		// 找出最小的值	
		if(min>arr[j]){
			min=arr[j];
			index=j;
		}
	}
swap(index,i);	

}
}

// selection();
// console.log(arr);