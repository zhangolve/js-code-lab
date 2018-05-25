import React, { Component } from 'react'
import {Header} from './Header.js';
import {a} from './utils'

console.log(a);

export default class Home extends Component {
    /*
    this is comment
    88888888888
    this should be moved when webpack build
    */
  render() {
    return (
      <div>
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
