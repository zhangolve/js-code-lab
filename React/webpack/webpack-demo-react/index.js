import React, { Component } from 'react'
import {Header} from './Header.js';
import {a,isIncluedes} from './utils'

import './index.css';


console.log(a);
console.log(isIncluedes(3));
export default class Home extends Component {

    /*
    this is comment
    88888888888
    this should be moved when webpack build
    */
  render() {
    return (
      <div className="book">
        <Header>
            hello world
        </Header>
        <div>
            content 
        </div>
      </div>
    )
  }
}
