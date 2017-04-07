/*能够被3或者5整除的所有数的和*/

function devide3or5(num)
{
	var x=0;
	for(var i=1;i<num+1;i++)
	{
		if(i%3==0||i%5==0)
		{
			x+=i;
			console.log(i);
		}
	}

	return x;
}

console.log(devide3or5(10));