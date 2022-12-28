const React = require('react');
const Logo = require('../assets/brut-ipa-logo.jpg');
const { PageWrapper } = require('styles/global-components.js');
const { Typography } = require('@material-ui/core');
const Classes = require('./styles.scss');

module.exports = () => (

    <PageWrapper className={Classes.pageContainer}>
        <img
            alt='Juicy Brut IPA'
            src={Logo}
        />
        <Typography variant='display2'>Juicy Brut IPA</Typography>
        <p>5.5%<br />37 IBUs</p>
        <p>Juicy Brut IPA has a pronounced dry character with almost no malt sweetness, setting the stage for the Mosaic, Amarillo® and Citra hops to be on full display. Leaning heavily on whirlpool and post fermentation additions, the tropical flavor of these hops come bursting forth with aromas of lemon, orange, grapefruit, passionfruit and mango. We can offer only one piece of advice. Bend the knee and swear fealty to the Juicy Brut!</p>
    </PageWrapper>

);
