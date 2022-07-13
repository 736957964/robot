const playGames = async (client,data,commandData)=>{
  let {content,channel_id } = data.msg;//content内容,channel_id 频道id
  const user_id = data.msg.author.id
  let reg = /<@![0-9]+>/g
  content = content.replace(reg,'')
  for(let i=0;i<commandData.length;i++) {
    const data = commandData[i]
    console.log(i,JSON.stringify(data))
    if (content.includes('开始游戏'+i)){
      const msg = data.textDescription
      client.messageApi.postMessage(channel_id, {
        content: `<@${user_id}> ${msg}`
      }).then((res) => {
        // console.log(res.data);
      }).catch((err) => {
        // console.log(err);
      });
    }
  }
}

module.exports = playGames