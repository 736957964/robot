// eval('if(true){console.log("我是傻逼")}')
const playGames = async (client,data,commandData)=>{
  let {content,channel_id } = data.msg;//content内容,channel_id 频道id
  const user_id = data.msg.author.id
  let reg = /<@![0-9]+>/g
  content = content.replace(reg,'')
  console.log(content)
  for(let i=0;i<commandData.length;i++) {
      const data = commandData[i]
      console.log(i,JSON.stringify(data))
      const { mode,command,imageUrl} = data
      let condition = content.split(' ').filter((res) => { return res !==''})
      if (condition[0] === command){
        let msg = null
        switch (mode){
          case '1':msg = data.textDescription;break
          case '2':msg = data.textDescription;break
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