import React from 'react';
import PropTypes from 'prop-types';

export default class Loading extends React.Component {
    static displayName = 'Loading';
    static propTypes = {
        content: PropTypes.string.isRequired,
        onHide : PropTypes.func.isRequired
    };

    componentWillUnmount() {
        if (typeof this.props.onHide === 'function') {
            setTimeout(this.props.onHide, 10);
        }
    };

    render() {
        var content = this.props.content || '正在加载中...';
            return (
                <div className="ui-loading-block show">
                    <div className="ui-loading-cnt">
                        <i className="ui-loading-bright" />
                        <p>{content}</p>
                    </div>
                </div>
        );
    }
}
