const { connect } = require('react-redux');
const { withRouter } = require('react-router-dom');
const Header = require('components/Header');
const AuthActions = require('actions/auth');
const MqttActions = require('actions/mqtt');
const KegbotActions = require('actions/kegbot');

// Update blocking happens when shouldComponentUpdate() blocks a downstream non-route component from updating
// In our case, using connect() blocks the Header component from updating when location changes (and therefore
// can cause things like activeClassName to not work). We can wrap connect() with withRouter()
// to counter blocked updates. More info: https://github.com/ReactTraining/react-router/blob/master/packages/react-router/docs/guides/blocked-updates.md#the-solution

module.exports = withRouter(connect(
    (state) => ({
        isAuthenticated: state.auth.isAuthenticated,
        isConnected: state.mqtt.connected,
        connectionPending: state.mqtt.connectionPending,
        battery: state.kegbot.battery
    }),
    {
        logout: AuthActions.logout,
        connect: MqttActions.connect,
        disconnect: MqttActions.disconnect,
        speak: KegbotActions.speak
    }
)(Header));
