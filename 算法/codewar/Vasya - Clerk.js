// The new "Avengers" movie has just been released! There are a lot of people at the cinema box office standing in a huge line. Each of them has a single 100, 50 or 25 dollars bill. An "Avengers" ticket costs 25 dollars.

// Vasya is currently working as a clerk. He wants to sell a ticket to every single person in this line.

// Can Vasya sell a ticket to each person and give the change if he initially has no money and sells the tickets strictly in the order people follow in the line?

// Return YES, if Vasya can sell a ticket to each person and give the change with the bills he has at hand at that moment. Otherwise return NO.

// Examples:
// tickets([25, 25, 50]) // => YES 
// tickets([25, 100]) // => NO. Vasya will not have enough money to give change to 100 dollars
// tickets([25, 25, 50, 50, 100]) // => NO. Vasya will not have the right bills to give 75 dollars of change (you can't make two bills of 25 from one of 50)


function tickets(peopleInLine){
    const changeMap = {
        100: [[50,25],[25,25,25]],
        50: [[25]],
        25: []
    }

    let current = [];
    for(let i=0;i<peopleInLine.length;i++) {
        change = changeMap[peopleInLine[i]];
        if(change.length===0) {
            // 无须找零，直接放入零钱里
            current.push(peopleInLine[i])
            console.log(current)
        } else{
            for(let z=0;z<change.length;z++) {
            for(let j=0;j<change.length;j++) {
                //　从当前零钱里找出来拿走
                    index=current[z].findIndex(v=>v==change[z][j])
                    console.log(index);
                    if(index===-1) {
                        return 'NO'
                    } else {
                        current = current.filter((v,i)=>i!=index);
                    }
            }
            // 两种可能啊！
            current.push(peopleInLine[i])
            console.log(current);
            }
        }
    }
    return 'YES'
  }

  tickets([25,25,25,100,25,25,25,100,25,50,25,100])
//   [25,25,25,100,25,25,25,100,25,50,25,100]
// [25,25,50,100,25,25,25,100,25,50,25,100]
    // 本质上应该还是一个数学问题。
    // index =0 第一个人 收入是25　找零是 sum(0) -25 == 0 current_money = [25]
    // index =1 第二个人　收入是25*2 找零是 sum(0+1) -25*2 = 25 *1 或０　第二个人只能是　[25] [50]    [25 25] 或　[50] 基于current_money找零
    // index =2 第三个人　收入是25*3 找零是 sum(0+1+2) -25*3 = 25 50 * something  [25 25] 或　[50]　基于current_money找零

  /*
// 1  [25]
// 2  [25,25] current [25,25]
// 2  [25,50] current [50]

// 3 [25,25,25] current [25,25,25]
// 3 [25,25,50] current [25,50]
// 3 [25,50,25] current [50,25]

// 4 [25,25,25,25] current [25,25,25,25]
// 4 [25,25,25,50] current [25,25,50]
// 4 [25,25,25,100] current [100]
// 4 [25,25,50,25] current [25,50, 25]
// 4 [25,25,50,50] current [50, 50]
// 4 [25,25,50,100] current [100]

[25, 25, 50, 50, 100]

25 +50

25

25


*/