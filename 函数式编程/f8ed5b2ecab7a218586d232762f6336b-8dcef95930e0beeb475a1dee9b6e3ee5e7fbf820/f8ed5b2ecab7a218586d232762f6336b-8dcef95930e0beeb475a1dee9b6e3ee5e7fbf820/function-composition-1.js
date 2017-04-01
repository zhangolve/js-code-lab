const toSlug = input => encodeURIComponent( 
	 input.split(' ') 
	 .map(str => str.toLowerCase()) 
	 .join('-') 
	 ); 
console.log(toSlug('JS Cheerleader')) //js-cheerleader
