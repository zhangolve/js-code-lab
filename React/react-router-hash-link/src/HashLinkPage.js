import React from 'react';
import PropTypes from 'prop-types';
import Interactive from 'react-interactive';
import { HashLink as Link } from 'react-router-hash-link';
import objectAssign from 'object-assign';
import { Li, linkStyle } from './style';

const propTypes = {
  location: PropTypes.object.isRequired,
};

function HashLinkPage({ location }) {
  const sectionStyle = {
    padding: '2.5vw 3.5vw 12vh 3.5vw',
    boxSizing: 'border-box',
    height: '100vh',
  };
  const h2Style = { fontSize: '22px' };
  const h3Style = { fontSize: '18px', marginTop: '2.5vh' };

  return (
    <div>
      <section style={objectAssign({ backgroundColor: '#E0E0E0' }, sectionStyle)} id="section-one">
        <h2 style={h2Style}>Section One</h2>
        <h3 style={h3Style}>Go to:</h3>
        <ul>
          <Li><Interactive as={Link} {...linkStyle} to="/">Home</Interactive></Li>
          <Li><Interactive as={Link} {...linkStyle} to={`${location.pathname}#section-two`}>Section Two</Interactive></Li>
          <Li><Interactive as={Link} {...linkStyle} to={`${location.pathname}#section-three`}>Section Three</Interactive></Li>
        </ul>
      </section>
      <section style={objectAssign({ backgroundColor: '#D0D0D0' }, sectionStyle)} id="section-two">
        <h2 style={h2Style}>Section Two</h2>
        <h3 style={h3Style}>Go to:</h3>
        <ul>
          <Li><Interactive as={Link} {...linkStyle} to="/">Home</Interactive></Li>
          <Li><Interactive as={Link} {...linkStyle} to={`${location.pathname}#section-one`}>Section One</Interactive></Li>
          <Li><Interactive as={Link} {...linkStyle} to={`${location.pathname}#section-three`}>Section Three</Interactive></Li>
        </ul>
      </section>
      <section style={objectAssign({ backgroundColor: '#C0C0C0' }, sectionStyle)} id="section-three">
        <h2 style={h2Style}>Section Three</h2>
        <h3 style={h3Style}>Go to:</h3>
        <ul>
          <Li><Interactive as={Link} {...linkStyle} to="/">Home</Interactive></Li>
          <Li><Interactive as={Link} {...linkStyle} to={`${location.pathname}#section-one`}>Section One</Interactive></Li>
          <Li><Interactive as={Link} {...linkStyle} to={`${location.pathname}#section-two`}>Section Two</Interactive></Li>
        </ul>
      </section>
    </div>
  );
}

HashLinkPage.propTypes = propTypes;

export default HashLinkPage;

/**
 * 
 在li 元素上设置路由规则，指向上含有＃
 Interative 组件中的as属性定义了这个组件将要渲染成为何种元素
 <Interactive
  as="div" // what the Interactive component is rendered as, can be anything

  hover={{ color: 'green' }} // style object, can use any styles you'd like

  active={{ color: 'blue' }}
  // OR
  hoverActive={{ color: 'red' }}
  touchActive={{ color: 'blue' }}
  keyActive={{ color: 'orange' }}

  focus={{ outline: '2px solid green' }}
  // OR
  focusFromTab={{ outline: '2px solid orange' }}
  focusFromMouse={{ outline: '2px solid green' }}
  focusFromTouch={{ outline: '2px solid blue' }}

  // hook called on every state change, receives prevState and nextState objects
  onStateChange={this.handleInteractiveStateChange}
  onClick={this.handleClick}
  style={{ fontSize: '16px', padding: '3px', color: 'black' }}
>This is an interactive and focusable div</Interactive>


 */