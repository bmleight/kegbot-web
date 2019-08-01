const React = require('react');
const T = require('prop-types');
const NavLink = require('react-router-dom').NavLink;
const Classes = require('./styles.scss');
const { default: AppBar } = require('@material-ui/core/AppBar');
const { default: Button } = require('@material-ui/core/Button');
const { default: CircularProgress } = require('@material-ui/core/CircularProgress');
const { default: IconButton } = require('@material-ui/core/IconButton');
const { default: Toolbar } = require('@material-ui/core/Toolbar');
const { default: Typography } = require('@material-ui/core/Typography');
// const { default: SvgIcon } = require('@material-ui/core/SvgIcon');
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
const { default: ChatBubble } = require('@material-ui/icons/ChatBubble');
const { default: Dialog } = require('@material-ui/core/Dialog');
const { default: DialogActions } = require('@material-ui/core/DialogActions');
const { default: DialogContent } = require('@material-ui/core/DialogContent');
const { default: DialogContentText } = require('@material-ui/core/DialogContentText');
const { default: DialogTitle } = require('@material-ui/core/DialogTitle');
const { default: TextField } = require('@material-ui/core/TextField');
// const BeerIcon = require('./beer-icon.svg');

module.exports = class Header extends React.Component {

    static propTypes = {
        logout: T.func.isRequired,
        connect: T.func.isRequired,
        disconnect: T.func.isRequired,
        speak: T.func.isRequired,
        isAuthenticated: T.bool.isRequired,
        isConnected: T.bool.isRequired,
        connectionPending: T.bool.isRequired,
        battery: T.number
    };

    state = {
        isTalkModalOpen: false,
        speach: ''
    };

    constructor(props) {

        super(props);

        this.renderNotAuthenticated = this._renderNotAuthenticated.bind(this);
        this.renderAuthenticated = this._renderAuthenticated.bind(this);
        this.handleTalkClick = this._handleTalkClick.bind(this);
        this.handleClose = this._handleClose.bind(this);
        this.speak = this._speak.bind(this);
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

    _handleTalkClick() {

        this.setState({ isTalkModalOpen: true });
    }

    _handleClose() {

        this.setState({ isTalkModalOpen: false });
    }

    async _speak(speach) {

        await this.props.speak(speach);
        this.handleClose();
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
                    <IconButton onClick={this.handleTalkClick}>
                        <ChatBubble />
                    </IconButton>
                    <IconButton>
                        {icon}
                    </IconButton>
                    <IconButton>
                        <BatteryIcon style={{ color: 'white' }} />
                    </IconButton>
                </Toolbar>
                <Dialog
                    open={this.state.isTalkModalOpen}
                    onClose={this.handleClose}
                    aria-labelledby='form-dialog-title'
                >
                    <DialogTitle id='form-dialog-title'>Text To Speach</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Make kegbot say some shit
                        </DialogContentText>
                        <TextField
                            id='name'
                            label='Text to speech'
                            type='text'
                            value={this.state.speach}
                            onChange={(event) => this.setState({ speach: event.target.value })}
                            fullWidth
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleClose} color='primary'>
                            Cancel
                        </Button>
                        <Button onClick={() => this.speak(this.state.speach)} color='primary'>
                            Speak
                        </Button>
                    </DialogActions>
                </Dialog>
            </AppBar>
        );
    }
};
