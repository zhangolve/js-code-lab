import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {  NavLink} from 'react-router-dom';


class UpdateBlocker extends React.PureComponent {
    static displayName = 'UpdateBlocker';
    static propTypes = {
        children: PropTypes.oneOfType([
            PropTypes.arrayOf(PropTypes.node),
            PropTypes.node
        ]).isRequired
    };
    componentDidUpdate() {
        console.log('blocker did update')
    }
    render() {
        return this.props.children;
    }
}


class BaseLayoutFooter extends React.Component {

    componentDidUpdate() {
        console.log('footer did update');
    }
    render(){
        return (
            <React.Fragment>
            <NavLink to='/about'>About</NavLink>
            <NavLink to='/'>INDEX</NavLink>
            </React.Fragment>            
        )
    }
}

class BaseLayout extends Component {
     
  componentDidMount() {
        console.log('baselayout did mount');
   }

   componentDidUpdate() {
     console.log('baselayout did update');
    }
   render() {
    return (
        <UpdateBlocker>
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Welcome to React</h1>
        </header>
        {this.props.children}
        <footer style={{position:'fixed',bottom:'0'}}>
            <UpdateBlocker>
                    <BaseLayoutFooter/>
            </UpdateBlocker>
        </footer>
      </div>
      </UpdateBlocker>
    );
  }
}

export default BaseLayout;
