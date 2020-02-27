import React, { Component, Fragment, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import PropTypes from 'prop-types';
import _ from 'lodash';
import { selectMessage, selectAccountId } from './selector';
import * as actions from './action';
import { matchRule, addedResourceIdResources, needRefreshByPubnub } from './utils';


const PubnubReceiveWrapper = (
    {
        alertCondition,
        resourceTypes,
        refreshData,
        receivedResourceIds,
        children
    }) => {
    const message = useSelector(selectMessage);
    const accountId = useSelector(selectAccountId);
    const dispatch = useDispatch();

    const timer = null;
    useEffect(() => {
        if (!message) {
            return;
        }
        console.log(message);
        const { message: messageBody, timetoken } = message;
        if (!messageBody) {
            return;
        }
        const messageHandler = (msg, msgSentTime) => {
            // setAlertMessage(msg);
            dispatch(actions.setAlertMessage(msg));
            const data = JSON.parse(msg.currentData || null);
            refreshData(data, needRefreshByPubnub(msg, msgSentTime), msg);
        };
        messageHandler(messageBody, timetoken);
    }, [message]);
    useEffect(() => () => {
        console.log('will unmount');
        if (timer) {
            clearTimeout(timer);
        }
    }, []);

    return (
        <Fragment>
            { children }
        </Fragment>
    );
};
PubnubReceiveWrapper.propTypes = {
    message: PropTypes.shape().isRequired,
    children: PropTypes.node.isRequired,
    alertCondition: PropTypes.func,
    resourceTypes: PropTypes.arrayOf(PropTypes.shape()),
    refreshData: PropTypes.func,
    receivedResourceIds: PropTypes.arrayOf(PropTypes.string),
    setAlertMessage: PropTypes.func.isRequired,
    accountId: PropTypes.number.isRequired,
};
PubnubReceiveWrapper.defaultProps = {
    alertCondition: () => true,
    resourceTypes: [],
    refreshData: () => {},
    receivedResourceIds: null,
};

export default React.memo(PubnubReceiveWrapper);
