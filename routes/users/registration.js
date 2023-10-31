const Router = require('koa-router');
const router = new Router();
const path = require('path');
const fs = require('fs');
const dbUsers = path.join(__dirname, '../../db/users.json');
const db = JSON.parse(fs.readFileSync(dbUsers, 'utf-8'));
const nicknamesPath = path.join(__dirname, '../../db/nicknames.json');
const nicknames = JSON.parse(fs.readFileSync(nicknamesPath, 'utf-8'));

router.post('/registration', async ctx => {
    const newUser = ctx.request.body;
    const userAvatar = ctx.request.files.avatar;

    if(db[newUser.email]) {
        newUser.status = {
            text: 'Почта уже используется!',
            result: false,
        };

        ctx.response.body = newUser;
        return;
    } else if(nicknames[newUser.nickname]) {
        newUser.status = {
            text: 'Имя уже используется!',
            result: false,
        };

        ctx.response.body = newUser;
        return;
    } else {
        nicknames[newUser.nickname] = true;
        fs.writeFileSync(nicknamesPath, JSON.stringify(nicknames, null, " "));
    };

    if(userAvatar === undefined) {
        newUser.gender === 'male' ? newUser.avatar = `${ctx.protocol}://${ctx.host}/avatar-default-man.png` : newUser.avatar = `${ctx.protocol}://${ctx.host}/avatar-default-woman.png`;
    } else {
            /*********Сохраняем картинку***********/
        userAvatar.newFilename = newUser.email + '.jpg'; //Присвоели новове имя картинке. Оно будте такое-же как почта пользователя.

        const data = fs.readFileSync(userAvatar.filepath); //Перевели файл в buffer.
        const picPath = path.join(__dirname, '../../db/avatars', userAvatar.newFilename); //Указали путь для сохранения и файл с именем.
        fs.writeFileSync(picPath, data); //Сохранили файл.
        newUser.avatar = `${ctx.protocol}://${ctx.host}/${newUser.email}.jpg`;
            /**************************************/
    }

    db[newUser.email] = newUser;
    fs.writeFileSync(dbUsers, JSON.stringify(db, null, " "));
    // newUser.status = {
    //     result: true,
    // };

    ctx.response.body = {
        newUser,
        status: {
            result: true,
        }
    };


})

module.exports = router;