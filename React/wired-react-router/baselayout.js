import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import MobileUtils from 'Common/Utils';
import {BrowserRouter, Route, Switch, Redirect} from 'react-router-dom';
import { Link } from 'react-router-dom';
import Login from './Login';
import {Search} from './SearchResult';
import ScanCode from './ScanCode';
import { ReturnTop } from './Common/Components';
import FlashMessage from './FlashMessage';
import ServiceQrCode from './ServiceQrCode';
import {CustomerService} from './CustomerService';
import ProductDetail from './ProductDetailPage/ProductDetail';
import asyncComponent from './helper/AsyncComponent';

const RouteWithLayout = ({loader, component = null, hideHeader = null, hideFooter = null, hideReturnTop = null, ...rest}) => {
    const Component = component || asyncComponent(loader);
    if (hideFooter) hideFooter();
    if (hideHeader) hideHeader();
    return (
        <Route {...rest} render={matchProps => (
                <Component {...matchProps} />
            )}
        />
    );
};
RouteWithLayout.displayName = 'RouteWithLayout';
RouteWithLayout.propTypes = {
    hideHeader: PropTypes.func,
    hideFooter: PropTypes.func,
    hideReturnTop: PropTypes.func,
    component: PropTypes.element,
    loader: PropTypes.func.isRequired
};
const RouteWithHeaderFooterLayout = ({loader, hideReturnTop = false, ...rest}) => RouteWithLayout({loader, hideReturnTop, ...rest});
const RouteWithFooterLayout = ({loader, hideReturnTop = false, ...rest}) => RouteWithLayout({loader, hideReturnTop, hideHeader: true, ...rest});
const RouteWithEmptyLayout = ({loader, hideReturnTop = false, ...rest}) => RouteWithLayout({loader, hideReturnTop, hideHeader: true, hideFooter: true, ...rest});
const RouteWithEmptyHideRTLayout = ({loader, hideReturnTop = true, ...rest}) => RouteWithLayout({loader, hideReturnTop, hideHeader: true, hideFooter: true, ...rest});

class BaseLayoutHeader extends React.Component {
    constructor(props) {
        super(props);
        this.state = {messagesHaveBeenRead: true};
    }

    fetchMessageState = () => {
        return veil.resource.get({
            url: '/messages/state',
            onSuccess: result => {
                this.setState({messagesHaveBeenRead: result.state});
            }
        });
    };

    componentDidMount() {
        this.request = this.fetchMessageState();
    }

    componentWillUnmount() {
        this.request.abort();
    }

    render() {
        return (
            <header className="main-header">
                <div className="scan-code-or-logo">{(MobileUtils.isApp || MobileUtils.isWeixin) ? <ScanCode /> : <i className="logo" />}</div>
                <div className="search"><Search searchKeyword={this.props.searchKeyword} {...this.props} /></div>
                <div className="message">
                    <a to="/messages">
                        <i className="icon-message">
                            <i className="messages-state" style={this.state.messagesHaveBeenRead ? {display: 'none'} : {display: 'block'}} />
                        </i>
                        <p className="icon-text">消息</p>
                    </a>
                </div>
            </header>
        );
    }
}
BaseLayoutHeader.displayName = 'BaseLayoutHeader';
BaseLayoutHeader.propTypes = {
    hide: PropTypes.string,
    searchKeyword: PropTypes.string
};


BaseLayoutFooter.displayName = 'BaseLayoutFooter';
BaseLayoutFooter.propTypes = {
    pathName: PropTypes.string.isRequired
};
function BaseLayoutFooter({pathName}) {
        return (
            <footer className="footer">
                <a to="/" className={pathName === '/' ? 'active home' : 'home'}>
                    <img src={pathName === '/' ? require('static/fonts/home-fill.svg') : require('static/fonts/home.svg')} />
                    <p>首页</p>
                </a>
                <a to="/category" className={pathName === '/category' ? 'active' : ''}><i className="fa fa-list-ul fa-2x" /> <p>分类</p></a>
                <a href="https://mp.weixin.qq.com/mp/homepage?__biz=MzA3Mjk0OTkyMA==&hid=4&sn=0628c633013b0ea21781c9b8dfe52fa0#wechat_redirect">
                    <img src={require('static/fonts/icon-news.svg')} style={{ 'height': '1rem' }} />
                </a>
                <a to="/shopping-cart" className={pathName === '/shopping-cart' ? 'active' : ''}><i className="fa fa-shopping-cart fa-2x" /><p>购物车</p></a>
                <a to="/shopper-center" className={pathName === '/shopper-center' ? 'active' : ''}><i className="fa fa-user fa-2x" /><p>我的丽家</p>
                </a>
            </footer>
        );
}


class BaseLayout extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            coverOpen: false,
            coverIndex: 10000,
            showFlashMessage: false,
            showServiceQrCode: false,
            serviceQrCodeTitle: null,
            showCustomerService: false,
            flashMessage: null,
            needLogin: false,
            loginReturnUrl: null,
            hideFooter: false,
            hideHeader: false

        };
        this.alreadyLoggedIn = false;
        // 解决IOS下使用pushState导致微信jsSDK授权失败问题
        if (window.originalUrl) {
            return;
        }
        window.originalUrl = location.href.split('#')[0];
    }

    hideFooter = () => {
        this.setState({
            hideFooter:true
        });
    }

    hideHeader = () => {
        this.setState({
            hideHeader:true
        });
    }

    enableLongTimeTouch = () => {
        let timeout = undefined;
        const handleRecognizeResult = resultStr => {
            veil.resource.create({
                url: '/scan-code',
                data: {
                    code: resultStr
                },
                dataType: 'json',
                onSuccess: result => {
                    if (result.redirect_url) {
                        window.location.href = result.redirect_url;
                    } else if (result.error_message) {
                        veil.event.publish('event-show-flash-message', ['info', result.error_message, 3000]);
                    }
                }
            });
        };
        document.addEventListener('touchstart', e => {
            timeout = setTimeout(() => {
                if (e.target.tagName === 'IMG') {
                    ljapp.init();
                    ljapp.longTimeTouch({'images': e.target.src}, code => {
                        if (code === 0) {
                            veil.event.publish('event-show-flash-message', ['success', '分享成功！', 1500]);
                        } else if (code === 2) {
                            veil.event.publish('event-show-flash-message', ['info', '分享失败！', 2000]);
                        }
                    }, recognizeResult => {
                        handleRecognizeResult(recognizeResult.result);
                    });
                }
            }, 1000);
        }, false);
        document.addEventListener('touchend', () => {
            clearTimeout(timeout);
        }, false);
        document.addEventListener('touchmove', () => {
            clearTimeout(timeout);
        }, false);
    };


    componentWillUpdate(nextProps) {
        const isLoginURI = nextProps.location.pathname === '/login';
        const isRegisterURI = nextProps.location.pathname === '/register';
        if (isLoginURI || isRegisterURI) {
            const query = MobileUtils.parseQuery(this.props.location.search);
            veil.resource.get({
                url: '/check-login',
                data: {
                    is_from_register: isRegisterURI,
                    f: query.f,
                    fr: query.fr,
                    ru: query.ru || '/'
                },
                onSuccess: result => {
                    if (result.is_logged_in) {
                        window.location.replace(result.return_url);
                        this.alreadyLoggedIn = true;
                    }
                }
            });
        }
    }
    componentDidUpdate() {
        if (MobileUtils.isApp) {
            const currentDeviceId = Cookies.get('di');
            if (currentDeviceId) {
                ljapp.init();
                ljapp.getRegistrationID(deviceId => {
                    if (deviceId && deviceId !== currentDeviceId) {
                        veil.resource.create({
                            url: '/app-device-ids',
                            data: {
                                device_id: deviceId
                            },
                            dataFormat: 'json',
                            dataType: 'json'
                        });
                    }
                });
            }
        }
    }
    componentDidMount() {
        window.addEventListener('scroll', () => {
            document.addEventListener('click', this.disableClickDuringScrollHandler, true);
            window.clearTimeout(this.scrollTimer);
            this.scrollTimer = window.setTimeout(() => {
                document.removeEventListener('click', this.disableClickDuringScrollHandler, true);
            }, 300);
        });

        if (MobileUtils.isApp && MobileUtils.appVersion() <= '1.3.3') {
            this.enableLongTimeTouch();
        }

        veil.event.subscribe('event-need-login', this.needLoginHandler);
        veil.event.subscribe('event-cover-open', this.openCover);
        veil.event.subscribe('event-close-cover', this.closeCover);
        veil.event.subscribe('event-show-flash-message', this.showFlashMessageHandler);
        veil.event.subscribe('event-hide-flash-message', this.hideFlashMessageHandler);
        veil.event.subscribe('event-show-service-qr-code', this.showServiceQrCodeHandler);
        veil.event.subscribe('event-show-customer-service', this.showCustomerServiceHandler);
        veil.event.subscribe('event-hide-customer-service', this.hideCustomerServiceHandler);

        this.showServerSideFlashMessage();
        if (MobileUtils.isWeixin) {
            this.weixinShareCheckerTimers = setInterval(() => {
                if (this.title === document.title && this.href === window.location.href) {
                    return;
                }
                MobileUtils.setupWeixinShare(() => {
                    this.title = document.title;
                    this.href = window.location.href;
                });
            }, 1300);
        }
    }

    componentWillUnmount() {
        MobileUtils.isWeixin && clearInterval(this.weixinShareCheckerTimers);
        veil.event.unsubscribe('event-need-login', this.needLoginHandler);
        veil.event.unsubscribe('event-cover-open', this.openCover);
        veil.event.unsubscribe('event-close-cover', this.closeCover);
        veil.event.unsubscribe('event-show-flash-message', this.showFlashMessageHandler);
        veil.event.unsubscribe('event-hide-flash-message', this.hideFlashMessageHandler);
        veil.event.unsubscribe('event-show-service-qr-code', this.showServiceQrCodeHandler);
        veil.event.unsubscribe('event-show-customer-service', this.showCustomerServiceHandler);
    }

    disableClickDuringScrollHandler = e => {
        e.preventDefault();
        e.stopPropagation();
    };

    needLoginHandler = (e, returnUrl) => {
        this.setState({needLogin: true, loginReturnUrl: returnUrl});
    };

    openCover = (e, index) => {
        this.setState({coverOpen: true, coverIndex: index || 10000});
    };
    closeCover = () => {
        this.setState({coverOpen: false}, () => {
            veil.event.publish('event-cover-closed');
        });
    };
    showFlashMessageHandler = (e, type, text, duration) => {
        this.setState({
            showFlashMessage: true,
            flashMessage: {
                type,
                text,
                duration
            }
        });
    };
    hideFlashMessageHandler = () => {
        this.setState({showFlashMessage: false, flashMessage: null});
    };

    showServiceQrCodeHandler = (e, title) => {
        this.setState({showServiceQrCode: true, coverOpen: true, serviceQrCodeTitle: title});
    };

    showCustomerServiceHandler = () => {
        this.setState({showCustomerService: true});
    };

    showServerSideFlashMessage = () => {
        const serverSideFlashMessage = document.body.dataset.serverSideFlashMessage;
        if (serverSideFlashMessage) {
            this.showFlashMessageHandler(undefined, 'info', serverSideFlashMessage, 3000);
            document.body.dataset.serverSideFlashMessage = '';
        }
    };

    handleClickCover = () => {
        this.setState({coverOpen: false, showServiceQrCode: false}, () => {
            veil.event.publish('event-cover-closed');
        });
    };

    hideCustomerService = () => {
        this.setState({showCustomerService: false});
    };

    render() {
        if (this.alreadyLoggedIn) {
            return null;
        }
        //let  mainContent;
        //const { main, header } = this.props;
        //if (!header) {
        let headerContent =null;
        if (!this.state.hideHeader) {
            headerContent = <BaseLayoutHeader searchKeyword={this.props.searchKeyword} {...this.props} />;
        }
        //else {
        //    headerContent = null;
        //}
        //}
        //else {
        //    headerContent = header;
        //}
        //if (!main) {
        //    mainContent = this.props.children;
        //} else {
        //    mainContent = main;
        //}
        let baseLayoutFooterHTML;
        if (!this.state.hideFooter) {
            baseLayoutFooterHTML = <BaseLayoutFooter pathName={'/'} />;
        }
        return (
            <div id="container">
                <Helmet meta={[
                    {name: 'keywords', content: MobileUtils.renderKeywords(['婴儿用品', '奶瓶奶嘴', '婴儿奶粉', '宝宝辅食', '婴儿辅食', '婴儿湿巾', '儿童玩具', '婴儿玩具', '婴儿服装', '婴儿推车', '婴儿床', '儿童餐椅', '宝宝餐椅', '喂养用品', '奶粉', '纸尿裤', '湿巾', '安抚奶嘴', '玩具', '辅食', '如厕训练', '座便器', '儿童安全座椅', '童装', '孕妇装', '防辐射服', '母婴用品', '孕婴用品'])},
                    {name: 'description', content: '丽家宝贝是中国领先的专业化母婴用品零售企业，于2003年成立于北京，拥有70多家直营连锁专卖店，建立了集连锁专卖、网上商城、电话订购和综合育儿服务为一体的新型服务模式，致力于为中国孕婴妈妈提供安全、高品质、高性价比的母婴用品和综合育儿服务！'},
                ]} />
                {headerContent}
                <BrowserRouter>
                    <Switch>
                    <Redirect from="/shoppers/new" to="/register" />
                    <RouteWithLayout exact path="/" loader={() => System.import('./Index').then(c => c.default)} />
                    <RouteWithLayout exact path="/shopping-cart" hideReturnTop={true} loader={() => System.import('./ShoppingCart').then(c => c.default)} />
                    <RouteWithLayout exact path="/category" loader={() => System.import('./Category').then(c => c.default)} />
                    <RouteWithLayout exact path="/collections/:collectionId" loader={() => System.import('./Collection').then(c => c.default)} />
                    <RouteWithLayout exact path="/flash-sales" loader={() => System.import('./FlashSale').then(c => c.default)} />
                    <RouteWithLayout exact path="/flash-sales/:flashSaleId" loader={() => System.import('./FlashSale').then(c => c.FlashSaleProductList)} />
                    <RouteWithLayout exact path="/stores" loader={() => System.import('./Store').then(c => c.default)} />
                    <RouteWithLayout exact path="/stores/:storeId" loader={() => System.import('./Store').then(c => c.StoreDetail)} />
                    <RouteWithLayout exact path="/qrcode" loader={() => System.import('./QRCode').then(c => c.default)} />
                    <RouteWithLayout exact path="/shopper-center" loader={() => System.import('./ShopperCenter').then(c => c.default)} />
                    <RouteWithLayout exact path="/login" loader={() => System.import('./Login').then(c => c.default)} hideFooter={this.hideFooter} hideHeader={this.hideHeader} />
                    <RouteWithLayout exact path="/lotteries/:lotteryId" loader={() => System.import('./Lottery').then(c => c.default)} />
                    <RouteWithLayout exact path="/invoices/new" loader={() => System.import('./InvoiceNew').then(c => c.default)} />
                    <RouteWithLayout path="/products/:productId" component= {ProductDetail} />
                    <RouteWithLayout exact path="/purchases/new" loader={() => System.import('./PurchaseNew').then(c => c.default)} />
                    <RouteWithLayout exact path="/register" loader={() => System.import('./Register').then(c => c.default)} />
                    <RouteWithLayout exact path="/password" loader={() => System.import('./EditPassword').then(c => c.default)} />
                    <RouteWithLayout exact path="/account-management" loader={() => System.import('./AccountManagement').then(c => c.default)} />
                    <RouteWithLayout loader={() => System.import('./Index').then(c => c.Route404)} />
                    </Switch>
                </BrowserRouter>
                {this.state.needLogin && <Login returnUrl={this.state.loginReturnUrl || (this.props.location.pathname + this.props.location.search)}
                                                location={this.props.location}
                                                history={this.props.history} />}
                <div id="alert" className="fade"><i /></div>
                {this.state.coverOpen && <div id="cover" style={{zIndex: this.state.coverIndex}} onClick={this.handleClickCover}></div>}
                {baseLayoutFooterHTML}
                {!this.props.hideReturnTop && <ReturnTop />}
                {this.state.showFlashMessage && <FlashMessage type={this.state.flashMessage.type} text={this.state.flashMessage.text}
                                                              duration={this.state.flashMessage.duration} />}
                {this.state.showServiceQrCode && <ServiceQrCode title={this.state.serviceQrCodeTitle} />}
            </div>
        );
    }
}
BaseLayout.displayName = 'BaseLayout';
BaseLayout.propTypes = {
    main: PropTypes.object,
    header: PropTypes.object,
    children: PropTypes.object,
    searchKeyword: PropTypes.string,
    location: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
    hideHeader: PropTypes.bool.isRequired,
    hideFooter: PropTypes.bool.isRequired,
    hideReturnTop: PropTypes.bool.isRequired
};

export {BaseLayout};
export default BaseLayout;


// 这是一个还不成熟的方案。

// 希望能够用baselayout 作为一个布局基础，同时又不必每次切换路由的时候，都要重新装在一遍baselayout
// 有一个形象的比喻是 如果一辆卡车上面装着苹果，现在要把苹果替换成鸭梨，不用每次都要再把卡车开走，把苹果卸下来，再开回来，再把鸭梨装上去，希望
// 做到的应该是在原地把苹果卸下来，把鸭梨替换上去。

// 但是同时又要考虑上作为layoutheader 和layoutfooter 的history 和location 属性，因为这两个组件与路由系统本身是平行的，那么他们还能不能有这些属性，也是个问题。

