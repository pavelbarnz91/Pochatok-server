const combineRouters = require('koa-combine-routers');

const modalWindows = require('./modalWindows/modalWindows.js');
const registration = require('./users/registration.js');
const login = require('./users/login.js');

const router = combineRouters(
    modalWindows,
    registration,
    login,
);

module.exports = router;