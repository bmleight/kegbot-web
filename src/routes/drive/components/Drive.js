const React = require('react');
const T = require('prop-types');
// const HopImage = require('../assets/hop-orange.png');
// const Classes = require('./HomeView.scss');
const { PageWrapper } = require('styles/global-components.js');
const { Typography } = require('@material-ui/core');
const { default: JoyStick } = require('react-joystick');

const joyOptions = {
    mode: 'static',
    catchDistance: 150,
    color: 'green',
    size: 150,
    position: { left: '50%', top: '50%' }
};

const containerStyle = {
    position: 'relative',
    height: '350px',
    width: '100%'
    // background: 'linear-gradient(to right, #E684AE, #79CBCA, #77A1D3)'
};

// const managerListener = (manager) => {
//
//     /*
//         {
//             identifier: 0,              // the identifier of the touch/mouse that triggered it
//             position: {                 // absolute position of the center in pixels
//                 x: 125,
//                 y: 95
//             },
//             force: 0.2,                 // strength in %
//             distance: 25.4,             // distance from center in pixels
//             pressure: 0.1,              // the pressure applied by the touch
//             angle: {
//                 radian: 1.5707963268,   // angle in radian
//                 degree: 90
//             },
//             instance: Nipple            // the nipple instance that triggered the event
//         }
//     */
//     manager.on('move', (ignoreErr, stick) => {
//
//         console.log(ignoreErr);
//         console.log(stick);
//         console.log('I moved!');
//     });
//
//     manager.on('end', (data) => {
//
//         console.log('I ended!');
//     });
// };

// const React = require('react');

// const { CardItem } = require('native-base');
// const { ScrollView, FooterNav, Container, Card, Text, Image } = require('styles');

module.exports = class Drive extends React.PureComponent {

    static propTypes = {
        setMotors: T.func.isRequired
    };

    constructor() {

        super();
        this.managerListener = this.managerListener.bind(this);
    }

    managerListener(manager) {

        let cx = 0;
        let cy = 0;

        manager.on('start', (ev, payload) => {

            console.log(ev);
            console.log(payload);
            console.log(payload.position);
            console.log('I started!');


            cx = payload.position.x;
            cy = payload.position.y;
        });

        manager.on('move', (ev, stick) => {

            console.log(ev);
            console.log(stick);
            this.props.setMotors(stick.position.x - cx, stick.position.y - cy);
            console.log('I moved!');
        });

        manager.on('end', () => {

            this.props.setMotors(0, 0);
            console.log('I ended!');
        });
    }

    render() {

        return (

            <PageWrapper>
                <Typography variant='display2'>Drive</Typography>
                <JoyStick options={joyOptions} containerStyle={containerStyle} managerListener={this.managerListener} />
            </PageWrapper>
        );
    }
};
