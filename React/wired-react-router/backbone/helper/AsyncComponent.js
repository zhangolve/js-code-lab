import React from 'react';
import PropTypes from 'prop-types';

function asyncComponent(getComponent) {
    return class AsyncComponent extends React.Component {
        static Component = null;
        static displayName = 'AsyncComponent';
        static propTypes = {
            location: PropTypes.object.isRequired,
            history: PropTypes.object.isRequired
        };
        state = {Component: AsyncComponent.Component};

        componentWillMount() {
            if (!this.state.Component) {
                getComponent().then(Component => {
                    AsyncComponent.Component = Component;
                    this.setState({Component});
                });
            }
            if (!this.props.location.key) {
                const { href, origin } = window.location;
                this.props.history.replace(href.substring(origin.length));
            }
        }
        render() {
            const { Component } = this.state;
            if (Component) {
                return <Component {...this.props} />;
            }
            return null;
        }
    };
}

export default asyncComponent;
