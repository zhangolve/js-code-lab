//https://github.com/getify/You-Dont-Know-JS/blob/master/async%20%26%20performance/ch3.md
function add(xPromise,yPromise) {
    // `Promise.all([ .. ])` takes an array of promises,
    // and returns a new promise that waits on them
    // all to finish
    return Promise.all( [xPromise, yPromise] )

    // when that promise is resolved, let's take the
    // received `X` and `Y` values and add them together.
    .then( function(values){
        // `values` is an array of the messages from the
        // previously resolved promises
        return values[0] + values[1];
    } );
}

// `fetchX()` and `fetchY()` return promises for
// their respective values, which may be ready
// *now* or *later*.
add( fetchX(), fetchY() )

// we get a promise back for the sum of those
// two numbers.
// now we chain-call `then(..)` to wait for the
// resolution of that returned promise.
.then( function(sum){
    console.log( sum ); // that was easier!
} );





/*a practice for it*/


 function fetchX()
{
fetch('http://api.github.com') 
}

function fetchY(){
  fetch('https://jsonplaceholder.typicode.com/posts');
}


function add(xPromise,yPromise) {

    return Promise.all( [xPromise, yPromise] )
    .then( function(values){
        console.log(values);
        //current_user_url
        var res0=values[0].json();
        var res1=values[1].json();
        var data=[res0,res1];
        return data;
    } );
}


add( fetch('http://api.github.com'), fetch('https://jsonplaceholder.typicode.com/posts') )

.then( function(sum){
    //console.log('sum',sum ); // that was easier!
  return sum[0]
} )
.then(
function(data){
  console.log(data);
}
)


/*针对上面的情况，我们需要说明的是，在add()这个function中，两个参数是以function的形式存在的。*/
function add(a,b)
{
console.log(a+b);

}

function a()
{
return 1;
console.log('1')

}

function b()
{
return 2;
console.log('1')
}

add( a(),b() )  //console 3




