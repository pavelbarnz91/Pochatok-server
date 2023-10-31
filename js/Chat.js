class Chat {
    constructor() {
        this.user = null;
    }

    connectUser(user, clientsOnline, actualMessages, id) {
        this.user = user;

        actualMessages.push({
            tag: 'system message', 
            text: `Пользователь ${user.nickname} вошел в чат ${user.date}`
        });

        clientsOnline[user.nickname] = user;
        clientsOnline[user.nickname].id = id;

        return {
            text: `Пользователь ${user.nickname} вошел в чат ${user.date}`,
            clientsOnline,
            tag: 'user connect',
            actualMessages,
        };
    }

    setDate() {
        const date = new Date();
        const hours = date.getHours().toString().padStart(2, '0');
        const minutes = date.getMinutes().toString().padStart(2, '0');
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const year = date.getFullYear().toString();
        return `${hours}:${minutes} ${day}.${month}.${year}`;
    }
}

module.exports = Chat;