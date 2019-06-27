
const quickSort = (array) => {
	const sort = (arr, left = 0, right = arr.length - 1) => {
	 if (left >= right) {//如果左边的索引大于等于右边的索引说明整理完毕
	  return
	 }
	let i = left
	let j = right
	const baseVal = arr[j] // 取无序数组最后一个数为基准值
	while (i < j) {//把所有比基准值小的数放在左边大的数放在右边
	 while (i < j && arr[i] <= baseVal) { //找到一个比基准值大的数交换
	  i++
	 }
	 arr[j] = arr[i] // 将较大的值放在右边如果没有比基准值大的数就是将自己赋值给自己（i 等于 j）
	 while (j > i && arr[j] >= baseVal) { //找到一个比基准值小的数交换
	  j--
	}
	 arr[i] = arr[j] // 将较小的值放在左边如果没有找到比基准值小的数就是将自己赋值给自己（i 等于 j）
	}
	arr[j] = baseVal // 将基准值放至中央位置完成一次循环（这时候 j 等于 i ）
	sort(arr, left, j-1) // 将左边的无序数组重复上面的操作
	sort(arr, j+1, right) // 将右边的无序数组重复上面的操作
	}
	const newArr = array.concat() // 为了保证这个函数是纯函数拷贝一次数组
	sort(newArr)
	return newArr
   }
   









   function quickSort(arr) {
	   function sort(arr, start=0, end=arr.length-1) {
			if(start>=end) {
				return;
			} else {
				// 去做查找
				const k = arr[end];
				while(i<j) {
					while(arr[start]<k) {
						start++
					}
					while(arr[end]>k)  {
						end--;
					}
				}
			}

	   }
	   sort(arr)

   }


   [1,2,8,7,5,3,4]  // base =4;

   i=2  value=8 // 要比base大
   j=5 value=3  //要比base小 

   交换位置
[1,2,3,7,5,8,4]
i=3 value=7
j=4 value=5

交换位置

[1,2,3,5,7,8,4]

i=j=3 将base 与key=3 交换位置
 
[1,2,3,4,7,8,5]

[1,2] =》 i=j
[4,7,8,5] base = 5

// 7 碰不了头

// i=j=1

[4,5,8,7]

[8,7]

[7,8]

排列完成。。



[1,3, 6,5,7,2]


[1,2,6,5,7,3]

[6,5,7,3]

[6,5,7]

[6,5]
[5,6]


function quickSort_2(arr) {
	function swap(arr, i, j) {
		let middle = arr[i];
		arr[i] = arr[j]
		arr[j] = middle;
	}
	function sort(arr, i=0,j=arr.length-1) {
		if(i>=j) {
			return arr;
		}
		else {
			let base = arr[j];
			while(i<j) {
				while(arr[i]<base) {
					i++;
				}
				while(arr[j]>base) {
					j--;	
				}
				swap(arr, i, j)
			}
			sort(arr, 0, i-1)
			sort(arr, j+1, arr.length-1)
		}
	}
}

console.log(quickSort_2([1,3, 6,5,7,2]));





