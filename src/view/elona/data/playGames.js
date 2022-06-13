
const {playJSON} = require('../../../../json/elona/index')
//引入文件模块
const fs = require('fs');
//定义json文件路径
let data_user = "././././json/elona/data/user.json"
const playGames = async (client,data)=>{
    let {content,channel_id } = data.msg;
    const user_id = data.msg.author.id
    let reg = /<@![0-9]+>/g
    content = content.replace(reg,'')
    if (content.includes('开始游戏')) {
        fs.readFile(data_user, (err, json)=>{
            let msg = ''
            if(!err) {
                let user = JSON.parse(json.toString())
                if(!user.data[user_id]){
                    // exp 经验 力量(物理伤害) 体质(血量) 灵巧（闪避率） 感知（抗爆率） 意志（暴击率） 魔力(魔法伤害) 生命成长(影响hp) 法力成长(影响mp) 运气（影响爆率） 速度（谁先攻击）
                    user.data[user_id] = { exp:0,ll:1,tz:1,yz:1,ml:1,lq:1,gz:1,smcz:10,flcz:10,yq:2,sd:5 }
                    let str = JSON.stringify(user)  // 把json对象转换为字符串
                    fs.writeFile(data_user, str,  (err) =>{})
                    msg = `${playJSON.enterTheWorld()}`
                } else {
                    msg = `你已开始游戏,请创建角色和职业,如已创建可输入 【/帮助】(未实装) 查看内容`
                }
            } else {
                console.log(err)
            }
            client.messageApi.postMessage(channel_id, {
                content: `<@${user_id}> ${msg}`
            }).then((res) => {
                console.log(res.data);
            }).catch((err) => {
                console.log(err);
            });
        })

    }

    if (content.includes('查种族职业')) {
        playJSON.getRaceVocation((data)=>{
            let msg = '\n种族：'
            data.race && data.race.forEach((res) => {
                msg+=  `${res} `
            })
            msg+= '\n职业：'
            data.vocation && data.vocation.forEach((res) => {
                msg+=  `${res} `
            })
            msg += '\n查询种族职业特性 输入【查种族 名称】【查职业 名称】(未实装)'
            client.messageApi.postMessage(channel_id, {
                content: `<@${user_id}> ${msg}`
            }).then((res) => {
                console.log(res.data);
            }).catch((err) => {
                console.log(err);
            });
        })
    }

    if(content.includes('创建种族')){
        const user_msg = content.replace(/创建种族/g,"").replace(/\s+/g,"")
        let msg = ''
        new Promise((setMsg)=>{
            playJSON.getRaceVocation((data)=>{
                if(data.race.includes(user_msg)){
                    playJSON.getUserData((user)=>{
                        if(!user.data[user_id]) {
                            msg = '无游戏记录请先【开始游戏】'
                        } else if (user.data[user_id].race){
                            msg = `您已创建种族,无法再次创建 当前种族：${user.data[user_id].vocation} \n 【查看人物信息】 查看数据`
                        }else {
                            user.data[user_id].race = user_msg
                            msg = `你昏昏沉沉的，想起了关于自己的记忆，你是：${user.data[user_id].race}人`
                            playJSON.setUserData(user)
                        }
                        setMsg(msg)
                    })
                }else {
                    msg = '没有该种族,无法创建,请输入 【查种族职业】 查看'
                    setMsg(msg)
                }
            })
        })
          .then(()=>{
               client.messageApi.postMessage(channel_id, {
                  content: `<@${user_id}> ${msg}`
              }).then((res) => {
                  console.log(res.data);
              }).catch((err) => {
                  console.log(err);
              });
          })
    }

    if(content.includes('创建职业')){
        const user_msg = content.replace(/创建职业/g,"").replace(/\s+/g,"")
        let msg = ''
        new Promise((setMsg)=>{
            playJSON.getRaceVocation((data)=>{
                if(data.vocation.includes(user_msg)){
                    playJSON.getUserData((user)=>{
                        if(!user.data[user_id]) {
                            msg = '无游戏记录请先【开始游戏】'
                        } else if (user.data[user_id].vocation){
                            msg = `您已创建职业,无法再次创建 当前职业：${user.data[user_id].vocation} \n 【查看人物信息】 查看数据`
                        }else {
                            user.data[user_id].vocation = user_msg
                            msg = `完全醒来后，你的身体记忆愈发鲜明，你想起来了自己的职业 原来是：【${user.data[user_id].vocation}】`
                            playJSON.setUserData(user)
                        }
                        setMsg(msg)
                    })
                }else {
                    msg = '没有该职业,无法创建,请输入 【查种族职业】 查看'
                    setMsg(msg)
                }
            })
        })
          .then(()=>{
              client.messageApi.postMessage(channel_id, {
                  content: `<@${user_id}> ${msg}`
              }).then((res) => {
                  console.log(res.data);
              }).catch((err) => {
                  console.log(err);
              });
          })
    }

    if(content.includes('查看人物信息')){
        new Promise((setMsg)=>{
            playJSON.getUserData((user)=>{
                const { exp,ll,tz,yz,ml,lq,gz,yq,smcz,flcz,sd,race,vocation } = user.data[user_id]
                if(user.data[user_id]) {
                    setMsg(`\n种族：${race}  职业：${vocation}\n经验：${exp}\n力量：${ll} 体质：${tz} 灵巧：${lq}\n感知：${gz} 魔力：${ml} 意志：${yz}\n生命成长：${smcz} 运气：${yq}\n法力成长：${flcz} 速度：${sd}`)
                }else {
                    setMsg('无游戏记录请先【开始游戏】')
                }
            })
        })
          .then((msg)=>{
              client.messageApi.postMessage(channel_id, {
                  content: `<@${user_id}> ${msg}`
              }).then((res) => {
                  console.log(res.data);
              }).catch((err) => {
                  console.log(err);
              });
          })
    }
}
const play = {
    playGames
}
module.exports = play