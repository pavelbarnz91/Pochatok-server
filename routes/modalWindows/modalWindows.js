const Router = require('koa-router');
const router = new Router();
const htmls = require('../../db/htmls.js');

router.get('/get-reg-window', ctx => {
    ctx.response.body = htmls.regWindow();
})

router.get('/get-login-window', ctx => {
    ctx.response.body = htmls.loginWindow();
})

module.exports = router;