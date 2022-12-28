const MqttTypes = require('../action-types/mqtt');
const Client = require('../utils/mqtt-client');

const internals = {};

const actions = exports;

exports.connectStart = () => ({
    type: MqttTypes.CONNECT_START
});

exports.connectSuccess = () => ({
    type: MqttTypes.CONNECT_SUCCESS
});

exports.connectFail = () => ({
    type: MqttTypes.CONNECT_FAILURE
});

exports.disconnectStart = () => ({
    type: MqttTypes.DISCONNECT_START
});

exports.disconnectSuccess = () => ({
    type: MqttTypes.DISCONNECT_SUCCESS
});

exports.disconnectFail = () => ({
    type: MqttTypes.DISCONNECT_FAILURE
});

exports.connect = () => {

    return (dispatch) => {

        dispatch(actions.connectStart());

        const onConnect = () => {

            // Client.subscribe('hackbot/*');  // TODO: does this work?
            Client.subscribe('hackbot/orientation');
            Client.subscribe('hackbot/status');
            Client.subscribe('hackbot/faces');
            Client.subscribe('hackbot/flow-start');
            Client.subscribe('hackbot/flow-end');
            Client.subscribe('hackbot/ir-sensors');
            dispatch(actions.connectSuccess());
        };

        Client.connect({ onSuccess: onConnect });

        // .catch((responseObject) => {
        //
        //     dispatch(actions.connectFail());
        // });
    };
};

exports.disconnect = () => {

    return (dispatch) => {

        dispatch(actions.disconnectStart());

        Client
        .disconnect();
    };
};
