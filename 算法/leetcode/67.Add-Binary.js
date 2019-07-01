// https://leetcode.com/problems/add-binary/

/**
 * @param {string} a
 * @param {string} b
 * @return {string}
 */
var addBinary_false = function(a, b) {
    return (parseInt(a,2) + parseInt(b,2)).toString(2)  
  };


  //Details 
// Input
// "10100000100100110110010000010101111011011001101110111111111101000000101111001110001111100001101"
// "110101001011101110001111100110001010100001101011101010000011011011001011101111001100000011011110011"
// Output
// "110111101100010011000101110110100000011101000101011000000000000000000000000000000000000000000000000"
// Expected
// "110111101100010011000101110110100000011101000101011001000011011000001100011110011010010011000000000"


// 这个问题，出题人的本意肯定不是说，要让你去用怎么使用 toString 方法。但是的确发现，原来并不太清楚toString方法，可以用于十进制转二进制这样的形势。

// 可能是受限于JavaScript中的最大安全数字，最后得到的结果，并不能解答这道题。要想解释，还是要从0和1上面入手，不要想着用api。。


// 也就是这件事情的本来，从后往前，进位的这么个工作。

var addBinary = function(a, b) {
  const arr_a = a.split('').reverse();
  const arr_b = b.split('').reverse();
  const arr_sum = [];
  const maxLoop = arr_a.length > arr_b.length ? arr_a.length :  arr_b.length;
  let jinwei = 0;
  for(let i=0;i<maxLoop;i++) {
    let ai = arr_a[i] ? parseInt(arr_a[i]) : 0;
    let bi = arr_b[i] ? parseInt(arr_b[i]): 0;
    let value = 0;
    if(ai+bi+jinwei>=2) {
      value=ai+bi+jinwei-2;
      jinwei=1;
    } else {
      value = ai+bi+jinwei;
      jinwei=0;

    }
    arr_sum.push(value);
  }
  if(jinwei>0) {
      arr_sum.push(jinwei);
  }
  return arr_sum.reverse().join('')
};

addBinary("1010","1011")
  // 1110 100