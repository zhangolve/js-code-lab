// Equal Sides Of An Array

function findEvenIndex(arr)
{
  //Code goes here!
  const left = [];
  let right = [];
  let sum=0;
  for(let i=0;i<arr.length;i++) {
      sum +=arr[i];
      left.push(sum);
  }
  sum=0;
  revArr = arr.reverse();
  for(let i=0;i<revArr.length;i++) {
      sum +=arr[i];
      right.push(sum);
  }
  right = right.reverse();
  for(let i=0;i<arr.length-2;i++) {
      if(left[i]==right[i+2]) {
          return i+1;
      }
  }
  return -1;
}

console.log(findEvenIndex([1,2,3,4,3,2,1]));

// 关键点: 左右进行处理.找到规律.