// Just the modules necessary for initial render!
const CoreLayout = require('../layouts/CoreLayout');
const Home = require('./home');
const Drive = require('./drive');
const LoginRoute = require('./login');
const DashboardRoute = require('./dashboard');
const SignupRoute = require('./signup');
const ForgotPasswordRoute = require('./forgot-password');
const ResetPasswordRoute = require('./reset-password');
const SettingsRoute = require('./settings');

// Create routes
module.exports = (store) => ([{
    path: '/',
    component: CoreLayout,
    childRoutes: [
        Home,
        Drive,
        LoginRoute,
        DashboardRoute,
        SignupRoute,
        ForgotPasswordRoute,
        ResetPasswordRoute,
        SettingsRoute
    ]
}]);
