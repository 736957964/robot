// eval('if(true){console.log("我是傻逼")}')
const playGames = async (client,data,commandData)=>{
  let {content,channel_id } = data.msg;//content内容,channel_id 频道id
  const user_id = data.msg.author.id
  let reg = /<@![0-9]+>/g
  content = content.replace(reg,'')
  console.log(content)
  for(let i=0;i<commandData.length;i++) {
      const data = commandData[i]
      const { mode,command,imageUrl,selectFunction,QUERY_TABLE} = data
      let condition = content.split(' ').filter((res) => { return res !==''})
      if (condition[0] === command){
        let msg = null
        switch (mode){ // 1为普通模式 2为特殊模式 3为高级模式
          case '1':msg = data.successTextDescription;break
          case '2':
            let returns = null
            // selectFunction
            // eval(jsEval)
            // console.log(returns)
            returns ? msg = data.successTextDescription : msg = data.errTextDescription
            break
          default: msg = '错误的type'
        }
        const msgData = {
          content: `<@${user_id}> ${msg}`,
          ...(data.imageUrl && {image:data.imageUrl})
        }
        client.messageApi.postMessage(channel_id, msgData)

        return
      }
    }
}

module.exports = playGames