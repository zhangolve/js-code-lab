'use strict';

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/* Component API */
// forceUpdate()

var App = function (_React$Component) {
  _inherits(App, _React$Component);

  function App() {
    _classCallCheck(this, App);

    // this.state={value:''}

    var _this = _possibleConstructorReturn(this, _React$Component.call(this));

    _this.value = '';
    _this.handleInput = _this.handleInput.bind(_this);
    return _this;
  }

  App.prototype.handleInput = function handleInput(e) {
    // this.setState({
    //   value:e.target.value
    // })

    //this.value=e.target.value;
    //console.log(this.value);
  };

  App.prototype.render = function render() {
    return React.createElement(
      'div',
      null,
      React.createElement('input', { value: this.value, onChange: this.handleInput })
    );
  };

  return App;
}(React.Component);

ReactDOM.render(React.createElement(App, null), document.getElementById('app'));
// <input value={this.state.value} onChange={this.handleInput}/>