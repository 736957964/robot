
const { AvailableIntentsEventsEnum, createOpenAPI, createWebsocket } = require('qq-guild-bot');
// const { play } = require('./data/elona')
const { play } = require('./sqlData/elona')
const Available = AvailableIntentsEventsEnum.PUBLIC_GUILD_MESSAGES
const botConfig = {
    appID: '102008517', // 申请机器人时获取到的机器人 BotAppID
    token: "BqFsI5Mebc0mBFk9mKpGnJa81k4asyGt", // 申请机器人时获取到的机器人 BotToken
    intents: [Available], // 事件订阅,用于开启可接收的消息类型
    sandbox: true, // 沙箱支持，可选，默认false. v2.7.0+
};

// 创建 client
const client = createOpenAPI(botConfig);
// 创建 websocket 连接
const ws = createWebsocket(botConfig);

// 注册用户 at 机器人消息事件
ws.on(Available, (data) => {
    play(client,data)
});