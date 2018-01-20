/*
20170604 

本例也是仿照此repo高程三13章有关拖动部分用react的实现
*/
import React, {Component} from 'react';

class SortNumber extends Component {
    constructor(props) {
        super(props);
        this.state = {
            numArr: []
        };
    }

    
    componentWillMount() {
    this.createRandomNumList();

    }
    
/*
如果写成createRandomNumList () 这样的形式，当然也是可行的。但是，如果是eventhandler的话，就不行了。
这里的createRandomNumList 是放到了原型上面，他内部的this并不指向当前这个实例。

*/
    createRandomNumList ()  {
        var numArr = [];

        while (true) {
            var ranNum = Math.round(Math.random() * 10);
            if (numArr.indexOf(ranNum) === -1 && ranNum !== 0) {
                numArr.push(ranNum);
            }
            if (numArr.length ===10) {
                console.log(numArr);
                break;
            }

        }
         this.setState({numArr});
        
    }

    render() {
        console.log(this);
        console.log('this is here ')
        var liHTML="";
        var {numArr}=this.state;
        liHTML=  numArr.map( (num,index)=><li key={index}  >{num}</li>  );
        return (
            <div>
                hello world
                <ul>
                {liHTML}
                </ul>
            <button onClick={()=>this.createRandomNumList() }  >refresh</button>

            </div>
        );
    }
}

export default SortNumber;