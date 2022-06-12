
const {playJSON} = require('../../../../json/elona/index')
//引入文件模块
const fs = require('fs');
//定义json文件路径
let path = "././././json/elona/data/user.json"
const playGames = async (client,data)=>{
    const {content,channel_id } = data.msg;
    // console.log(data)
    const user_id = data.msg.author.id
    if (content.includes('1')) {
        let msg = ''
        await fs.readFile(path, 'utf8',function (err, json){
            if(!err) {
                let user = JSON.parse(json.toString())
                if(!user.data[user_id]){
                    user.data[user_id] = {}
                    let str = JSON.stringify(user)  // 把json对象转换为字符串
                    fs.writeFile(path, str, function (err) {})
                    msg = `${playJSON.enterTheWorld(['未创建','未创建'])}`
                } else {
                    msg = `你已开始游戏,请创建角色和职业,如已创建可输入 【/帮助】 查看内容`
                }
            } else {
                console.log(err)
            }
        })

        console.log(msg)
        await client.messageApi.postMessage(channel_id, {
            content: `<@${user_id}> ${msg}`
        }).then((res) => {
            console.log(res.data);
        }).catch((err) => {
            console.log(err);
        });
    }
}
const play = {
    playGames
}
module.exports = play