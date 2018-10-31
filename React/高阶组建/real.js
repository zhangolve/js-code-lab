import React from 'react';
import DownloadBanner from '../DownloadBanner';


export default function withBannerHeader(WrappedComponent) {
    return class extends React.Component {
        state = {
            contentHeight: '2.7rem'
        };

        static displayName = 'withBannerHeader';

        componentDidMount() {
            this.setContentHeight();
        }

        componentDidUpdate() {
            this.setContentHeight();
        }

        setContentHeight = () => {
            const headers = document.getElementById('headers');
            if (this.state.contentHeight != headers.offsetHeight) {
                this.setState({
                    contentHeight: headers.offsetHeight
                });
            }
        }

        render() {
            return (
                <div className="with-banner-headers">
                    <div className="headers" id="headers">
                        <DownloadBanner />
                        <WrappedComponent {...this.props} />
                    </div>
                    <div id="content-placeholder" style = {{height: `${this.state.contentHeight}px`}} />
                </div>);
        }
    };
}
withBannerHeader.displayName = 'withBannerHeader';
