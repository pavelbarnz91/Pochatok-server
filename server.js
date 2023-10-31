const http = require('http');
const path = require('path');
const Koa = require('koa');
const app = new Koa();
const Chat = require('./js/Chat.js');
const chat = new Chat();
const static = require('koa-static');
const { koaBody } = require('koa-body');
const cors = require('@koa/cors');
const router = require('./routes/index.js');
const {v4: uuidv4} = require('uuid');
const WS = require('ws');
const clientsOnline = {};
const actualMessages = [];

app.use(cors());

app.use(static(path.join(__dirname, './db/avatars/')));

app.use(koaBody({
    multipart: true,
    json: true,
    formidable: true,
    urlencoded: true,
    multiples: true,
}));

app.use(router());

const server = http.createServer(app.callback()).listen(9090);
const wsServer = new WS.Server({
    server
});

wsServer.on('connection', (ws) => {
    let userId = uuidv4();

    ws.on('message', e => {
        const message = JSON.parse(e.toString());

        if(message.tag === 'user connect') {
            const result = chat.connectUser(message, clientsOnline, actualMessages, userId);

            Array.from(wsServer.clients)
                .filter(client => client.readyState === WS.OPEN)
                .forEach(client => client.send(JSON.stringify(result)));
        } else if(message.tag === 'user message') {
            actualMessages.push(message);

            Array.from(wsServer.clients)
                .filter(client => client.readyState === WS.OPEN)
                .forEach(client => client.send(JSON.stringify(message)));

            if(actualMessages.length > 1000) actualMessages = [];
        }
    })

    ws.on('close', function () {
        let userDisconect = null;

        for(let key in clientsOnline) {
            if(clientsOnline[key].id === userId) {
                userDisconect = clientsOnline[key];
                delete clientsOnline[key];
            }
        }

        actualMessages.push({
            tag: 'system message', 
            text: `Пользователь ${userDisconect.nickname} покинул чат ${chat.setDate()}`,
        });
        
        const answer = {
            userOut: userDisconect,
            tag: 'user disconect',
        };

        Array.from(wsServer.clients)
            .filter(client => client.readyState === WS.OPEN)
            .forEach(client => client.send(JSON.stringify(answer)));
    })
})