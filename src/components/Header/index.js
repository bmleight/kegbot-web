const React = require('react');
const T = require('prop-types');
const NavLink = require('react-router-dom').NavLink;
const Classes = require('./styles.scss');
const { AppBar, Typography, Toolbar, Button, CircularProgress, SvgIcon } = require('@material-ui/core');
const { default: IconButton } = require('@material-ui/core/IconButton');
const { default: CheckCircle } = require('@material-ui/icons/CheckCircle');
const { default: BatteryFull } = require('@material-ui/icons/BatteryFull');
const { default: BatteryAlert } = require('@material-ui/icons/BatteryAlert');
const { default: BatteryUnknown } = require('@material-ui/icons/BatteryUnknown');
const { default: Battery90 } = require('@material-ui/icons/Battery90');
const { default: Battery80 } = require('@material-ui/icons/Battery80');
const { default: Battery60 } = require('@material-ui/icons/Battery60');
const { default: Battery50 } = require('@material-ui/icons/Battery50');
const { default: Battery30 } = require('@material-ui/icons/Battery30');
const { default: Battery20 } = require('@material-ui/icons/Battery20');
const BeerIcon = require('./beer-icon.svg');

module.exports = class Header extends React.Component {

    static propTypes = {
        logout: T.func.isRequired,
        connect: T.func.isRequired,
        disconnect: T.func.isRequired,
        isAuthenticated: T.bool.isRequired,
        isConnected: T.bool.isRequired,
        connectionPending: T.bool.isRequired,
        battery: T.number
    };

    constructor(props) {

        super(props);

        this.renderNotAuthenticated = this._renderNotAuthenticated.bind(this);
        this.renderAuthenticated = this._renderAuthenticated.bind(this);

    }

    _renderNotAuthenticated() {

        return (
            <React.Fragment>
                <Button
                    style={{ whiteSpace: 'nowrap' }}
                    color='inherit'
                    component={(props) => <NavLink to='/sign-up' {...props} />}
                    activeClassName={Classes.activeRoute}
                >
                    Sign Up
                </Button>
                <Button
                    style={{ whiteSpace: 'nowrap' }}
                    color='inherit'
                    component={(props) => <NavLink to='/login' {...props} />}
                    activeClassName={Classes.activeRoute}
                >
                    Log In
                </Button>
            </React.Fragment>
        );
    }

    _renderAuthenticated() {

        return (
            <React.Fragment>
                <Button
                    style={{ whiteSpace: 'nowrap' }}
                    color='inherit'
                    onClick={this.props.logout}
                >
                    Log Out
                </Button>
            </React.Fragment>
        );
    }

    render() {

        const { battery } = this.props;

        let icon;
        if (this.props.connectionPending) {
            icon = <CircularProgress style={{ color: 'white' }} size='24px' />;
        }
        else {
            let color = 'green';

            if (!this.props.isConnected) {
                color = 'red';
            }
            icon = <CheckCircle style={{ color }} onClick={this.props.isConnected ? this.props.disconnect : this.props.connect} />;
        }

        let BatteryIcon = BatteryUnknown;

        if (battery > 27) {
            BatteryIcon = BatteryFull;
        }
        else if (battery > 26.5) {
            BatteryIcon = Battery90;
        }
        else if (battery > 25.5) {
            BatteryIcon = Battery80;
        }
        else if (battery > 24.5) {
            BatteryIcon = Battery60;
        }
        else if (battery > 24) {
            BatteryIcon = Battery50;
        }
        else if (battery > 23) {
            BatteryIcon = Battery30;
        }
        else if (battery > 22) {
            BatteryIcon = Battery20;
        }
        else if (battery !== null && battery <= 22) {
            BatteryIcon = BatteryAlert;
        }

        return (

            <AppBar
                style={{ position: 'relative' }}
                color='primary'
            >
                <Toolbar>
                    <Typography
                        noWrap
                        variant='title'
                        color='inherit'
                        style={{ flex: 1 }}
                    >
                        Kegbot
                    </Typography>
                    <Button
                        color='inherit'
                        component={(props) => <NavLink exact to='/' {...props} />}
                        activeClassName={Classes.activeRoute}
                    >
                        Home
                    </Button>
                    <Button
                        color='inherit'
                        component={(props) => <NavLink to='/drive' {...props} />}
                        activeClassName={Classes.activeRoute}
                    >
                        Drive
                    </Button>
                    <IconButton>
                        {icon}
                    </IconButton>
                    <IconButton>
                        <BatteryIcon style={{ color: 'white' }} />
                    </IconButton>
                </Toolbar>
            </AppBar>
        );
    }
};
