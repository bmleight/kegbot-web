const Connect = require('react-redux').connect;
const Drive = require('../components/Drive');
const KegbotAct = require('actions/kegbot');

const internals = {};

internals.connect = Connect(
    null,
    {
        setMotors: KegbotAct.setMotors
    }
);

module.exports = internals.connect(Drive);
