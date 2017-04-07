/* DP way 
https://lh3.googleusercontent.com/ntvC2fad1pomoEbm4jkODxIEBdPpzvtZL4vSxH20pQuSQDZ8HiWHD7pSZxUxasrGJjyU8ZDVnfGjBo69wTG2efs5u3cLh4FsUzzCV0ESjvYprAcI9LokEjQjeJzqPd6deLVLkahL8RujyNzT0fvpnuIQCX0J5RAbdTP9SoYrglI3QkU4ZZOvu6jLVcy1nnNlBnPzL5n6oFL0eDA1Dh4zaCB9l6-EqmSfNMgUoy-AAf5iJ1YOImDxivD0EgctVvI6xVWYqBAHU0Mw22q8tBEYsZn1TbXuW735ZrDjJwg5U-Sk5clutCTFrGvm4t0lNd10W5EnFhJfZAb-5rFpxvVHnt2hSJKEVHUhSZLnujgitVyBYGc1w7IPYTGvWqkvAMTtc8Kz2ts9VWodcOuhg0S7UC7VKr13VqrROx0zI8lJZtb9H_kR2FNMzlUU1KyNNvQ7eQ8eaB8KtDc6upLZ-wztrZU9pxDpDq0OCezUKwNEzIlW9RsQHIhIenxKvgDPlMa04mt5_0ATrEBB6vFRWCJzw1ZAr2vXGuO8pblvfqyU6cSAhs3M51_vRpm0DyaB8nPie-psA86PDs5Y3jMzBc8RX8F_2OqZirlPIIIB-523y2QtG_ihkIh4ug=w851-h638-no
仍然不能解决，可能时候没有到把
2017/04/07
*/





var numDecodings = function(s) {
    if (s.length) {
        let arr = s.split('');
        let combinedArr = arr[0] + "" + arr[1];

    }
};


console.log(numDecodings('103'));


function decodeway(length,combinedArr) {
	  let comNum = Number(combinedArr);
     /*长度为1的情况*/
    if(length==1)
    {
    	if(comNum)
    	{
    		return 0;
    	}
    	else{
    		return 1;
    	}
    }
	  /*长度为2的情况*/
    if (length == 2) {
        
        if (comNum < 10) {
            return 0;
        }
        if (10 < comNum && comNum < 27) {
            return 2;
        }
        if (comNum == 10 || comNum > 26) {
            return 1;
        }
    }


}
