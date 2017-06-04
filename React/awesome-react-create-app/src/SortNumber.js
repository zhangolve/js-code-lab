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
    

    createRandomNumList = () => {
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