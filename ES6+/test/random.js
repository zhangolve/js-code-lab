// import { isNumber } from "util";
const readline = require('readline');
// input 
function random(x,y) {
    if(!x || !y) {
        console.log('please input INT numbers !!');
    } else if ( (x-y)>0){
        console.log('x must smaller or equal with y')
    }else {
        return Math.random() * (y-x) + x;
    }
}

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });
  
  rl.question( 'input two int numbers, split using ,', (answer) => {
    // TODO: Log the answer in a database
    const numbers= answer.split(',').map(x=>parseInt(x));
    console.log(numbers)
    const randomNumber = Math.round(random(numbers[0], numbers[1]));
    console.log(randomNumber)
    rl.close();
  });


