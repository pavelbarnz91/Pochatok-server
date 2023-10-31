const Router = require('koa-router');
const router = new Router();
const path = require('path');
const fs = require('fs');
const dbUsers = path.join(__dirname, '../../db/users.json');


router.post('/login', async ctx => {
    const user = ctx.request.body;

    const db = JSON.parse(fs.readFileSync(dbUsers, 'utf-8'));

    if(db[user.email] === undefined) {
        user.status = {
            text: 'Почта не зарегистрирована!',
            result: false,
        };

        ctx.response.body = {status: false, text: 'Почта не зарегистрирована!'};
    } else if(db[user.email].password !== user.password) {
        user.status = {
            text: 'Не верный пароль!',
            result: false,
        };

        ctx.response.body = {status: false, text: 'Не верный пароль!'};
    } else {
        ctx.response.body = {status: true, user: db[user.email]};
    }
})

module.exports = router;