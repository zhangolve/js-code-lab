import React, { Component } from 'react';
import PropTypes from 'prop-types';


class UpdateBlocker extends React.PureComponent {
    static displayName = 'UpdateBlocker';
    static propTypes = {
        children: PropTypes.oneOfType([
            PropTypes.arrayOf(PropTypes.node),
            PropTypes.node
        ]).isRequired
    };
    render() {
        return this.props.children;
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
            this is footer
        </footer>
      </div>
      </UpdateBlocker>
    );
  }
}

export default BaseLayout;
