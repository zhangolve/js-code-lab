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

// 其时间复杂度为 O(N^2)。


// 2019.06.19

// 快速排序


// 分治的思想。。 有一个数， 在第一次排列之后，这个数的左边的数都比他小，这个数右边的数都比它大

/**
 * 
 * @param {*} arr
 *  例如一个数组[1,3,9,8,6,4]
 * 	第一次 i=0,j=5, k=4，k为基准值
 *  想要以k为分界，k的左边比它小，k的右边比它大。可以等于。
 *  由于快速排序是修改自冒泡排序，所以可以应用一些冒泡排序的思想
 * 	i=2的时候，arr[i] =9,这个值比4要大，所以交换位置。
 * 	此时数组变为[1,3,4,8,6,9]
 * 	这个时候再将j的值从后往前找，找比k小的。
 *  此时发现，j=2的时候，这个值等于小于4，成立了。
 *  因此第一轮排序结束，i=j=2，它的左边都比它小，它的右边都比它大。
 * 	然后将左右两边分开，分治的思想，分别来看。
 *  左边是index 0，1
 * 	右边是index 3，4，5 
 * 	左边i=0，j=1, k=3,
 * 	右边i=3, j=5,k=9, 这部分数组为[8,6,9],经过一次之后，这部分数组不变，此时减j，排序[8,6],关键点是要做到i=j
 */

function quickSort(arr) {

	function _quickSort(arr, i=0, j=arr.length-1) {
		// 给定一个默认的初始值
		let left = i;
		let right = j;
		if(i==j) {
			return 
		}
		k=arr[j];
		while(i<j && arr[i]<=k) {
			i++
		}
		//直到加到arr[i]>=k
		arr[j]=arr[i];
		arr[i]=arr[j]; // k?
		
		while(i<j && arr[j]>=k) {
			j--
		}
		arr[j]=k;
		console.log(arr);
		_quickSort(arr, left+1,right) // 为啥这里是left，right，不是i，j
		_quickSort(arr, left, right-1)
	}
	_quickSort(arr);
	return arr;
}

// console.log(quickSort([1,3,9,8,6,4]));



function quickSort_2(arr) {
	function swap(arr, i, j) {
		let middle = arr[i];
		arr[i] = arr[j]
		arr[j] = middle;
	}
	function sort(arr, i=0,j=arr.length-1) {
		if(i==j) {
			console.log(i,j)
			console.log(arr);
			return arr;
		}
		else {
			console.log(i,j)
			let base = arr[j];
			let originJ = j;
			while(i<j&&arr[i]<base) {
				i++;
			}
			while(i<j&&arr[j]>=base) {
				console.log('j',j)
				j--;	
			}
			if(i==j) {
				swap(arr, i, originJ)
			}else {
				swap(arr, i, j)
			}	
		}
		sort(arr, 0, i-1)
		sort(arr, j+1, arr.length-1)
	}
	sort(arr);
	return arr;
}

console.log(quickSort_2([1,3, 8,7,4,6,5,7,2]));


